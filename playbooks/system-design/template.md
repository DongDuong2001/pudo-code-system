# System Design Template

This document provides a template framework for designing production-grade distributed systems. Use it to structure your architectural design reviews.

---

## 1. Requirements

### Functional Requirements
*What features must the system support?*
- [ ] Feature 1 (e.g., User can purchase items)
- [ ] Feature 2 (e.g., User receives email receipts)

### Non-Functional Requirements
*What are the system constraints?*
- **Availability:** target SLA (e.g., 99.99% availability).
- **Latency:** target response times (e.g., p99 response < 200ms).
- **Consistency:** Eventual vs Strong consistency expectations.

---

## 2. Capacity Planning

Calculate storage, bandwidth, and CPU constraints. Assume concrete data loads:
- **Write Volume:** e.g., 10,000 requests/sec.
- **Read Volume:** e.g., 100,000 requests/sec.
- **Bandwidth Calculation:**
  $$\text{Throughput} = \text{Requests/sec} \times \text{Average Request Size}$$
- **Storage Calculation:**
  $$\text{Daily Storage} = \text{Writes/sec} \times 86400 \times \text{Size per Write}$$

---

## 3. API Design

Define the public interface contract. Prefer REST, gRPC, or GraphQL.

### Endpoints
*Include Method, Path, Request/Response payloads, and error codes.*

#### POST /v1/resource
- **Description:** Creates a new resource.
- **Request Headers:**
  - `Authorization: Bearer <token>`
  - `Idempotency-Key: <UUID>`
- **Request Body:**
  ```json
  {
    "name": "resource_name",
    "metadata": {}
  }
  ```
- **Response (201 Created):**
  ```json
  {
    "id": "res_12345",
    "status": "pending"
  }
  ```

---

## 4. Database Design

### ERD & Schema
Specify SQL tables or NoSQL collections. Include keys, indexes, and data types.

```sql
CREATE TABLE resources (
  id VARCHAR(36) PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_resources_status ON resources(status);
```

### Storage Strategy
- Relational vs NoSQL justification.
- Partition keys and secondary indexes.

---

## 5. Cache Strategy

- **Patterns:** Cache-aside vs Write-through.
- **Eviction & TTL Policies:** How is memory managed?
- **Cache Key Design:** Format structure (e.g., `res:status:<id>`).

---

## 6. Queue Strategy

- **Publishers/Consumers:** Decoupling write-heavy paths.
- **Delivery Guarantee:** At-least-once vs exactly-once.
- **DLQ Handling:** Retry policy and dead-letter routing.

---

## 7. Scaling

- **Horizontal Scaling:** Stateless application servers.
- **Database Scaling:** Read replicas, sharding, and partitioning.
- **Load Balancing:** DNS round-robin vs layer 7 routing.

---

## 8. Failure Recovery & Resilience

- **Fault Tolerance:** Circuit breakers and fallback routines.
- **Data Recovery:** Replication lag handling, backups, and failovers.
- **Rate Limiting:** Guarding against noisy neighbors.

---

## 9. Tradeoffs

Explain chosen design alternatives over other options:
- e.g., Consistent vs Available (CAP theorem).
- e.g., Complex architecture vs simpler MVP approach.

---

## 10. Security

- **Data in Transit:** TLS 1.3 enforcement.
- **Data at Rest:** Transparent Database Encryption (TDE).
- **Authentication/Authorization:** OAuth2 and RBAC controls.

---

## 11. Monitoring & Observability

- **Metrics:** Core CPU, memory, database connection pools, HTTP error rates.
- **Tracing:** Trace propagation endpoints.
- **Dashboards & Alerts:** Alert triggers (e.g., notify if 5xx errors > 1% in 5 minutes).
