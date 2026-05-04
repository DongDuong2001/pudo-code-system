# Example 03: Fixing a Production Database Connection Error

> **Complexity:** ⭐⭐⭐ Advanced  
> **Time:** ~3 hours  
> **Key Takeaway:** How the full PUDO cycle prevents regressions when fixing critical bugs

---

## Context

It's 9 AM. Your Next.js app is failing to build in CI. The error:

```
Error: neon() failed: NEON_DATABASE_URL is not set
  at connectToDatabase (src/lib/db.ts:12:9)
  at generateStaticParams (src/app/posts/[slug]/page.tsx:8:24)
```

The app was working yesterday. The build passes locally but fails in CI. Users on the production site are getting intermittent 500 errors.

This is a **production emergency** — and exactly where unstructured debugging spirals into chaos. Developers start changing things randomly, deploying untested fixes, and creating new problems.

---

## 🟡 Plan

### What You Tell the AI

```
Production incident: Our Next.js app fails to build in CI with a database 
connection error. The build passes locally.

Symptoms:
- Error: neon() failed: NEON_DATABASE_URL is not set
- Started this morning, no deploys since yesterday
- Intermittent 500 errors on production
- CI build fails consistently

Goal: Fix the build failure AND the production 500 errors.

Success criteria:
- CI build passes
- No 500 errors on production for 30 minutes after deploy
- Root cause identified and documented

Constraints:
- Minimize production downtime
- No data loss
- Must be backward compatible

Plan the debugging approach — don't start fixing yet.
```

### What the AI Produces

A structured debugging plan:
1. **Verify:** Confirm env vars exist in CI and production environments
2. **Isolate:** Determine if the issue is in code, config, or infrastructure
3. **Identify:** Find the root cause
4. **Fix:** Implement the minimum viable fix
5. **Harden:** Prevent recurrence

**Total time: 5 minutes.** (Short, because production is down. But not zero — even under pressure, a 5-minute plan prevents 30-minute detours.)

---

## 🔵 Understand

### What You Tell the AI

```
Investigate the database connection issue:

1. Show me the code in src/lib/db.ts — how is the connection created?
2. Show me src/app/posts/[slug]/page.tsx — why is it connecting at build time?
3. Check if generateStaticParams is the issue — this runs during `next build`
4. Explain the difference between build-time and runtime env vars in Next.js
```

### What the AI Finds

```typescript
// src/lib/db.ts — THE PROBLEM
import { neon } from '@neondatabase/serverless';

// This runs at IMPORT TIME, not at query time
const sql = neon(process.env.NEON_DATABASE_URL!);

export default sql;
```

**Root cause identified:**

| Layer | Issue |
|---|---|
| **Code** | `neon()` is called at **import time** (module scope), not lazily |
| **Build** | `generateStaticParams` imports `db.ts`, triggering the connection during `next build` |
| **CI** | CI environment doesn't have `NEON_DATABASE_URL` set for the build step |
| **Production 500s** | Likely a separate issue — possibly Neon cold starts or connection pool exhaustion |

### Critical Insight

The 500 errors and the build failure are **two different problems** with the same root cause (eager connection initialization). The build failure is because CI lacks the env var at build time. The 500s are because eager initialization doesn't handle connection failures gracefully.

**Total time: 15 minutes.**

---

## 🟢 Develop

### Task Checklist

```
- [x] Fix 1: Lazy database connection (fix build + improve reliability)
- [x] Fix 2: Add connection error handling with retry logic
- [x] Fix 3: Add env var validation with clear error messages
- [x] Fix 4: Add CI env var for build step
- [x] Test: Verify local build passes
- [x] Test: Verify CI build passes
- [x] Test: Verify no 500 errors
```

### The Fixes

**Fix 1: Lazy connection initialization**

```typescript
// src/lib/db.ts — BEFORE (broken)
import { neon } from '@neondatabase/serverless';
const sql = neon(process.env.NEON_DATABASE_URL!);
export default sql;

// src/lib/db.ts — AFTER (fixed)
import { neon, type NeonQueryFunction } from '@neondatabase/serverless';

let sql: NeonQueryFunction<false, false>;

export function getDb() {
  if (!sql) {
    const url = process.env.NEON_DATABASE_URL;
    if (!url) {
      throw new Error(
        'NEON_DATABASE_URL is not set. ' +
        'Check your environment variables.'
      );
    }
    sql = neon(url);
  }
  return sql;
}
```

**Fix 2: Retry logic for transient failures**

```typescript
export async function queryWithRetry<T>(
  queryFn: () => Promise<T>,
  maxRetries = 3
): Promise<T> {
  for (let attempt = 1; attempt <= maxRetries; attempt++) {
    try {
      return await queryFn();
    } catch (error) {
      if (attempt === maxRetries) throw error;
      await new Promise(r => setTimeout(r, 1000 * attempt)); // Exponential backoff
    }
  }
  throw new Error('Unreachable');
}
```

**Fix 3: Updated generateStaticParams**

```typescript
// src/app/posts/[slug]/page.tsx
export async function generateStaticParams() {
  // Only generate static params if database URL is available
  // (allows build to succeed in environments without DB access)
  if (!process.env.NEON_DATABASE_URL) {
    return [];
  }
  
  const db = getDb();
  const posts = await db`SELECT slug FROM posts WHERE published = true`;
  return posts.map(post => ({ slug: post.slug }));
}
```

**Fix 4: CI configuration**

```yaml
# .github/workflows/build.yml
env:
  NEON_DATABASE_URL: ${{ secrets.NEON_DATABASE_URL }}
```

**Total time: 1.5 hours.**

---

## 🟣 Optimize

### What You Review

```
Review the production fix:

1. Is the lazy initialization pattern consistent with how we handle 
   other services (Redis, Stripe, etc.)?
2. Is the retry logic appropriate — could it mask real failures?
3. Are there other places in the codebase with the same eager 
   initialization pattern?
4. Do we need monitoring/alerting for database connection failures?
5. Write a postmortem document.
```

### Improvements Made

| Issue | Action |
|---|---|
| Redis client has the same eager init pattern | Refactored to lazy init (same pattern as DB fix) |
| Retry logic has no logging | Added structured logging for retry attempts |
| No alerting for DB failures | Added error tracking integration (Sentry) |
| No documentation of the incident | Created postmortem in team wiki |

### Postmortem Summary

```markdown
## Incident: Database Connection Build Failure
**Date:** [today]  
**Duration:** 2.5 hours (9:00 AM → 11:30 AM)  
**Impact:** CI build blocked, intermittent 500 errors on production

### Root Cause
Database connection was initialized eagerly at module import time. 
When CI environment lacked the database URL, the import failed, 
blocking the build. In production, eager init caused failures during 
cold starts and connection pool exhaustion.

### Fix
Switched to lazy initialization with retry logic and graceful 
fallback during build time.

### Prevention
- Audit all service clients for eager initialization patterns
- Add env var validation script to CI pipeline
- Set up Sentry alerting for database connection failures
```

### Final Verification

```bash
# 1. Local build
npm run build  # ✅ Passes without NEON_DATABASE_URL

# 2. Local build with DB
NEON_DATABASE_URL=... npm run build  # ✅ Passes with static generation

# 3. CI build
git push  # ✅ CI pipeline green

# 4. Production monitoring
# → Watch for 500 errors for 30 minutes → ✅ None detected
```

**Total time: 1 hour.**

---

## Retrospective

| Phase | Time | Value |
|---|---|---|
| Plan | 5 min | Structured approach prevented "change random things" debugging |
| Understand | 15 min | Found root cause in 15 min instead of hours of trial-and-error |
| Develop | 1.5 hr | Fixed 2 problems (build + 500s) with 1 root-cause fix |
| Optimize | 1 hr | Found same bug in Redis client, added monitoring, wrote postmortem |
| **Total** | **~3 hr** | **Production stable, root cause fixed, future incidents prevented** |

**Without PUDO (estimated):** 4–6 hours, likely only fixing the symptom (add env var to CI) without addressing the root cause (eager initialization). The 500 errors would have continued.

---

**Key lesson:** Under pressure, PUDO is even more valuable. The 5-minute Plan phase prevents the panicked "try random things" spiral that turns a 3-hour fix into a 6-hour nightmare.
