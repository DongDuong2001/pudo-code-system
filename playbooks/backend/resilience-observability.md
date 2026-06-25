# Resilience & Observability Playbook

This playbook covers transactions in distributed systems, error handling strategies, and observability patterns (logging, monitoring, tracing) to ensure system reliability.

---

## 1. Distributed Transactions & Saga Pattern

### Explanation
In distributed architectures, maintaining ACID transactions across microservices is challenging. Two-Phase Commit (2PC) is a blocking coordinator-driven protocol, while the Saga Pattern is a non-blocking sequence of local transactions where each step publishes an event that triggers the next. If a step fails, the Saga executes compensating transactions to undo the changes.

### Best Practices
- **Use Saga for Long-Running Workflows:** Prefer Saga over 2PC to avoid coordinator blocking and lock contention.
- **Compensating Transactions Must Be Idempotent:** If rollback compensation retries, it must not cause duplicate side effects.
- **Outbox Pattern:** Use the transactional outbox pattern to guarantee event publishing along with database writes.

### Common Mistakes
- Writing nested microservice calls inside a database transaction block (causes database connection pool exhaustion).
- Assuming local transactions will never fail.

### AI Prompt
> "Explain and write an orchestration Saga coordinator in Node.js for an e-commerce checkout flow. Coordinate OrderService, PaymentService, and InventoryService. Implement compensating transactions for inventory restock if payment fails."

### Checklist
- [ ] Distributed transactions avoid blocking protocols (like 2PC) where possible.
- [ ] Saga compensations are designed to run idempotently.
- [ ] Database transactions do not wrap blocking I/O or network requests.

### Example
```javascript
// Orchestrator pseudo-code representing Saga steps and compensation
class CheckoutSagaOrchestrator {
  constructor(paymentClient, inventoryClient) {
    this.paymentClient = paymentClient;
    this.inventoryClient = inventoryClient;
  }

  async execute(order) {
    let inventoryReserved = false;
    try {
      // Step 1: Reserve Inventory
      await this.inventoryClient.reserve(order.id, order.items);
      inventoryReserved = true;

      // Step 2: Charge Payment
      await this.paymentClient.charge(order.id, order.amount);

    } catch (err) {
      console.error('Saga execution failed, triggering compensation...', err);
      if (inventoryReserved) {
        // Compensating step: Release inventory
        await this.inventoryClient.release(order.id, order.items);
      }
      throw err;
    }
  }
}
```

---

## 2. Error Handling & Fault Tolerance

### Explanation
Reliable backends handle failures gracefully. This is achieved using timeouts, retries with exponential backoff, and circuit breakers (which stop sending requests to failing downstream services to allow them to recover).

### Best Practices
- **Exponential Backoff + Jitter:** Add randomized delay (jitter) to retries to prevent thundering herds from overwhelming recovered services.
- **Use Circuit Breakers:** Wrap external HTTP/gRPC requests in a circuit breaker. Default state: Closed; Open on error threshold; Half-Open to test recovery.
- **Graceful Degradation:** Fall back to cached data or default values if external dependencies fail.

### Common Mistakes
- Retrying without limits or delay, which DDOSes your own downstream systems.
- Swallowing errors silently without logging or metric increments.

### AI Prompt
> "Generate a fetch wrapper function in TypeScript that uses the 'opossum' circuit breaker library. Configure a 10-second timeout, 50% error threshold to open the circuit, and exponential backoff retries for failures."

### Checklist
- [ ] Circuit breakers guard all outbound HTTP calls.
- [ ] Retries use exponential backoff and jitter.
- [ ] Graceful fallbacks exist for critical paths.

### Example
```javascript
import CircuitBreaker from 'opossum';

const fetchUserData = async (userId) => {
  const response = await fetch(`https://api.user-service/users/${userId}`);
  if (!response.ok) throw new Error('Service failure');
  return response.json();
};

const options = {
  timeout: 3000, // 3 seconds timeout
  errorThresholdPercentage: 50,
  resetTimeout: 30000 // Retry after 30 seconds
};

const breaker = new CircuitBreaker(fetchUserData, options);
breaker.fallback((userId) => ({ id: userId, name: 'Guest User (Fallback)' }));

// Usage
try {
  const result = await breaker.fire('usr_123');
} catch (err) {
  console.error('Breaker errored out', err);
}
```

---

## 3. Logging, Monitoring, & Tracing (Observability)

### Explanation
Observability relies on three pillars: Logs (structured events), Metrics (numerical aggregations of resource/performance status), and Traces (end-to-end request journeys across distributed services).

### Best Practices
- **Structured Logging:** Emit logs in JSON format. Never log raw strings in production.
- **Correlate Requests:** Inject a unique `Correlation-ID` or `Trace-ID` header into incoming requests and pass it to all downstream microservice calls.
- **OpenTelemetry Standard:** Integrate OpenTelemetry for tracing to avoid vendor lock-in.
- **Prometheus Metrics:** Export RED (Rate, Error, Duration) and USE (Utilization, Saturation, Errors) metrics.

### Common Mistakes
- Logging PII data (credit card numbers, passwords, auth tokens, health info).
- Using console.log inside fast paths instead of standard structured logging libraries.

### AI Prompt
> "Configure Winston logging in Node.js to output structured JSON format logs. Standardize keys including: timestamp, service_name, level, message, trace_id, and correlation_id. Strip sensitive keys like password and credit_card."

### Checklist
- [ ] Logs are structured JSON.
- [ ] PII data is stripped from log outputs.
- [ ] Correlation IDs are propagated across microservice requests.

### Example
```javascript
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'order-service' },
  transports: [
    new winston.transports.Console()
  ]
});

// Middleware to inject Correlation ID
function correlationIdMiddleware(req, res, next) {
  const correlationId = req.headers['x-correlation-id'] || 'gen_' + Math.random().toString(36).substr(2, 9);
  req.correlationId = correlationId;
  res.setHeader('x-correlation-id', correlationId);
  next();
}
```
