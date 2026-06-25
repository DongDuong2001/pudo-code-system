# System Design Examples

This document details production-ready system designs following the [System Design Template](template.md).

---

## Example 1: Payments Processing Engine

### 1. Requirements
- **Functional:**
  - Users can make payments using credit cards.
  - Payment status is updated and webhook is dispatched to merchants.
- **Non-Functional:**
  - Latency: p95 response time < 500ms.
  - Consistency: Strong consistency for ledger balances; eventual consistency for webhook dispatches.
  - Security: PCI-DSS compliance.

### 2. Capacity Planning
- **Load:** 100 payment requests/second (p95 peak: 500 requests/sec).
- **Storage:**
  - Average transaction log size: 1 KB.
  - Daily Storage: $500 \text{ writes/sec} \times 86400 \text{ sec/day} \times 1 \text{ KB} = 43.2 \text{ GB/day}$.

### 3. API Design
- `POST /v1/charges`
  - Headers: `Idempotency-Key` (required)
  - Body: `{ "amount": 1000, "currency": "USD", "payment_method": "pm_123" }`
  - Response (202 Accepted): `{ "charge_id": "ch_99", "status": "processing" }`

### 4. Database Design
We use PostgreSQL due to strict ACID requirements for transactional ledgers.

```sql
CREATE TABLE ledger_entries (
  id VARCHAR(36) PRIMARY KEY,
  account_id VARCHAR(36) NOT NULL,
  amount DECIMAL(18, 4) NOT NULL,
  type VARCHAR(10) CHECK (type IN ('DEBIT', 'CREDIT')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX idx_ledger_account ON ledger_entries(account_id);
```

### 5. Caching Strategy
- Redis stores authentication tokens and idempotency keys (`idemp:charge:<key>`) with a 24-hour TTL.

### 6. Queue Strategy
- A RabbitMQ broker is used. Payment requests are accepted, routed to an exchange, and processed by consumers.
- Dead-letter queues handle failed payments.

### 7. Failure Recovery & Resilience
- **Circuit Breaker:** Wraps requests to external banks (e.g., Stripe, Visa gateway).
- **Idempotency:** Enforced via `idempotency_key` unique index in PostgreSQL or locking in Redis.

---

## Example 2: Distributed Notification Service

### 1. Requirements
- **Functional:**
  - Send transactional push notifications, SMS, and emails.
  - Support template rendering.
- **Non-Functional:**
  - High availability: 99.99% notification delivery rate.
  - Latency: Delivery within 5 seconds for critical alerts.

### 2. Capacity Planning
- **Load:** 1,000 notifications/second (peak: 5,000 notifications/sec).
- **Bandwidth:**
  - Average notification payload: 2 KB.
  - Bandwidth: $5000 \times 2 \text{ KB} = 10 \text{ MB/sec}$.

### 3. API Design
- `POST /v1/notifications`
  - Body: `{ "recipient_id": "usr_99", "channel": "SMS", "template_id": "welcome", "vars": { "name": "Alice" } }`
  - Response (202 Accepted): `{ "notification_id": "notif_456" }`

### 4. Database Design
NoSQL (MongoDB or DynamoDB) is selected because notification history is write-heavy and has unstructured metadata.

```json
{
  "_id": "notif_456",
  "recipient_id": "usr_99",
  "channel": "SMS",
  "status": "delivered",
  "payload": {
    "body": "Welcome to PUDO, Alice!"
  },
  "created_at": "2026-06-25T09:31:00Z"
}
```

### 5. Queue Strategy
- Apache Kafka is used for high-volume buffering.
- Separate topics are created per channel (`email-topic`, `sms-topic`, `push-topic`) to prevent slow email providers from delaying SMS alerts.

### 6. Scaling
- Consumers scale horizontally using Kafka consumer groups.
- DB partitioned by `recipient_id`.
