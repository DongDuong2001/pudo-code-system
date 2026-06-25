# API Design & Security Playbook

This playbook outlines production-ready patterns for API design, secure authentication, authorization, and rate limiting.

---

## 1. API Design

### Explanation
Modern APIs must be predictable, scalable, and versioned. REST, gRPC, and GraphQL represent different trade-offs: REST is simple and ubiquitous, gRPC offers high performance via binary serialization (HTTP/2), and GraphQL minimizes over-fetching.

### Best Practices
- **Strict Versioning:** Version via URL path (e.g., `/v1/`) or accept header. Never release unversioned APIs.
- **Idempotency:** Implement idempotency keys (`Idempotency-Key`) for mutation requests (POST/PATCH) to prevent duplicate runs in distributed systems.
- **Consistent Responses:** Standardize payload envelopes for success and error objects.

### Common Mistakes
- Exposing internal database keys directly to the client (use UUIDv4 or NanoID instead).
- Mixing business logic with HTTP transport layers.

### AI Prompt
> "Generate a Node.js Express route handler for a payment capture endpoint. Implement API versioning (/v1/payments), strict schema validation using Zod, idempotency tracking via Redis, and standard JSON error response envelopes."

### Checklist
- [ ] API is explicitly versioned.
- [ ] Idempotency is enforced for write actions.
- [ ] Sensitive database keys are obfuscated.

### Example
```javascript
// Express Route versioning and schema validation
import express from 'express';
import { z } from 'zod';

const router = express.Router();
const paymentSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().length(3)
});

router.post('/v1/payments', async (req, res, next) => {
  try {
    const data = paymentSchema.parse(req.body);
    const idempotencyKey = req.headers['idempotency-key'];
    if (!idempotencyKey) {
      return res.status(400).json({ error: 'Missing Idempotency-Key header' });
    }
    // Proceed with processing payments...
    res.status(200).json({ success: true, data: { transactionId: 'txn_98765' } });
  } catch (err) {
    next(err);
  }
});
```

---

## 2. Authentication & JWT

### Explanation
Authentication verifies who a user is. JWT (JSON Web Tokens) are stateless tokens signed cryptographically, ideal for microservices. OAuth2 is the industry standard delegation framework.

### Best Practices
- **Short-Lived Access Tokens:** Keep JWT access tokens valid for 15 minutes or less. Use secure, HttpOnly, SameSite cookies for refresh tokens.
- **Rotate Signing Keys:** Automate JWKS key rotation to mitigate compromised key risks.
- **JWT Cryptography:** Use asymmetric signing algorithms like RS256 or EdDSA instead of HS256.

### Common Mistakes
- Storing sensitive data (passwords, PII) in the JWT payload (which is base64 encoded and readable by anyone).
- Accepting `none` algorithm in JWT verification libraries.

### AI Prompt
> "Generate a middleware function to verify incoming RS256 JWT access tokens. Ensure it checks signature validity, expiration ('exp'), issuer ('iss'), audience ('aud'), and rejects the 'none' algorithm."

### Checklist
- [ ] Access token lifespan <= 15 minutes.
- [ ] Refresh tokens stored in HttpOnly, Secure cookies.
- [ ] Algorithm whitelist excludes `none`.

### Example
```javascript
import jwt from 'jsonwebtoken';

function authenticateJWT(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing or malformed Authorization header' });
  }
  const token = authHeader.split(' ')[1];
  jwt.verify(token, process.env.JWT_PUBLIC_KEY, { algorithms: ['RS256'] }, (err, payload) => {
    if (err) return res.status(403).json({ error: 'Invalid or expired token' });
    req.user = payload;
    next();
  });
}
```

---

## 3. Authorization (RBAC)

### Explanation
Role-Based Access Control (RBAC) maps users to roles (e.g., admin, editor, guest), and roles to permissions. This keeps access policies maintainable as systems grow.

### Best Practices
- **Least Privilege:** Default deny all access unless explicitly granted.
- **Fine-Grained Permissions:** Guard resources using granular permissions (e.g., `invoice:write`) rather than raw roles (e.g., `admin`).
- **Contextual Checks:** Validate ownership constraints along with permission checks (e.g., `user.id === invoice.ownerId`).

### Common Mistakes
- Checking raw roles directly in controller routes (e.g., `if (user.role === 'admin')`), which prevents flexible permission updates.
- Failing to validate object-level permissions (ID harvesting attacks / IDOR).

### AI Prompt
> "Design a permission-based RBAC middleware in Node.js. Map users to permissions and verify that the user has the required permission (e.g., 'invoice:read') before resolving the request. Implement owner-override logic."

### Checklist
- [ ] Default deny-all implemented.
- [ ] Authorization checks permissions, not raw roles.
- [ ] IDOR / Resource ownership checks are active on all resource routes.

### Example
```javascript
const checkPermission = (requiredPermission) => {
  return (req, res, next) => {
    const userPermissions = req.user?.permissions || [];
    const hasPerm = userPermissions.includes(requiredPermission);
    if (!hasPerm) {
      return res.status(403).json({ error: 'Forbidden: Insufficient permissions' });
    }
    next();
  };
};
// Route usage
router.get('/v1/invoices/:id', authenticateJWT, checkPermission('invoice:read'), (req, res) => {
  // Business logic here...
});
```

---

## 4. Rate Limiting

### Explanation
Rate limiting protects APIs from abuse, DDoS attacks, brute force attempts, and resource starvation.

### Best Practices
- **Layered Limiting:** Set global limits per IP, alongside strict endpoint-specific limits (e.g., login, payment).
- **Graceful Responses:** Return HTTP status code `429 Too Many Requests` with a `Retry-After` header.
- **Redis Storage:** Use Redis sliding-window counter or token bucket algorithms for accurate distributed rate limiting.

### Common Mistakes
- In-memory rate limiting in horizontal-scaling environments (leads to bypassed limits).
- Not whitelisting internal services or high-priority API keys.

### AI Prompt
> "Create a rate limiter middleware using Redis for Express. Implement a sliding window counter algorithm. Limit POST /v1/login to 5 attempts per 1 minute, and return 429 with a Retry-After header on limit breach."

### Checklist
- [ ] Rate limits stored in distributed cache (Redis).
- [ ] Crucial endpoints (auth, payment) have tighter limits.
- [ ] `Retry-After` headers are correctly returned.

### Example
```javascript
import Redis from 'ioredis';
const redis = new Redis();

async function rateLimiter(req, res, next) {
  const ip = req.ip;
  const key = `rate:${ip}:${req.path}`;
  const now = Date.now();
  const windowMs = 60000;
  const limit = 10; // 10 requests per minute

  try {
    const tx = redis.multi();
    tx.zremrangebyscore(key, 0, now - windowMs);
    tx.zadd(key, now, now);
    tx.zcard(key);
    tx.pexpire(key, windowMs);
    const results = await tx.exec();
    const requestCount = results[2][1];

    if (requestCount > limit) {
      res.setHeader('Retry-After', Math.ceil(windowMs / 1000));
      return res.status(429).json({ error: 'Too Many Requests' });
    }
    next();
  } catch (err) {
    next(err);
  }
}
```
