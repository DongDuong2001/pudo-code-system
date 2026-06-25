# Database Design & Optimization Playbook

This playbook covers database schema design, index planning, performance optimization, isolation levels, migration strategy, soft deletion, and auditing.

---

## 1. Schema Design & ERD

### Explanation
Production schema design requires matching business entity structures to appropriate data types. Defining entity-relationship diagrams (ERDs) helps map primary-foreign key linkages and cardinality (1:1, 1:N, N:M).

### Best Practices
- **Use Standardized UUIDs/Sequential IDs:** Use sequential primary keys (bigint auto-increment or ULID) for primary keys to preserve index page locality. Avoid pure UUIDv4 as primary keys on clustered indexes.
- **Normalize to 3NF:** Normalize transaction tables to Third Normal Form to avoid redundancy. Denormalize selectively only for high-performance read views.
- **Enforce Referential Integrity:** Always use foreign key constraints at the database level rather than enforcing relationships solely in application code.

### Common Mistakes
- Storing unstructured JSON blobs in relation tables when columns will be heavily queried.
- Missing cascading delete/restrict directives on foreign key definitions.

---

## 2. Index Strategy & Query Optimization

### Explanation
Indexes speed up database searches. B-Tree is the default index type (supports range queries). Composite indexes cover searches on multiple columns. Query optimization relies on executing query plans (`EXPLAIN ANALYZE`).

### Best Practices
- **Left-Prefix Rule:** For composite indexes `(col_a, col_b)`, queries filtering by `col_a` or `col_a AND col_b` will use the index, but queries filtering by `col_b` alone will not.
- **Avoid Over-Indexing:** Indexes speed up reads but slow down writes (inserts/updates/deletes) as the index tree must be rebuilt.
- **Index Foreign Keys:** PostgreSQL and MySQL do not index foreign keys automatically. Always index them to speed up `JOIN` operations.

### Common Mistakes
- Creating duplicate or overlapping indexes (e.g., index on `(col_a)` and another composite index on `(col_a, col_b)`).
- Writing queries that prevent index usage (e.g., using functions on indexed columns: `WHERE UPPER(email) = 'USER@EXAMPLE.COM'`).

### Example
```sql
-- Composite index creation
CREATE INDEX idx_users_status_created ON users(status, created_at DESC);

-- Query plan analysis command
EXPLAIN ANALYZE SELECT id, name FROM users WHERE status = 'ACTIVE' ORDER BY created_at DESC;
```

---

## 3. Partitioning, Sharding, & Replication

### Explanation
- **Partitioning:** Splitting a single large table into smaller physical pieces (partitions) within the same database instance (e.g., partitioning an events table by month).
- **Sharding:** Distributing database rows horizontally across separate database server instances.
- **Replication:** Copying data from a primary server to replica servers. Primary handles writes; replicas handle read traffic.

### Best Practices
- **Partition by Range/List:** Partition large analytical tables (e.g., logs, ledger entries) by date range to make deletion fast (dropping a partition is instantaneous, unlike deleting millions of rows).
- **Read-Replica Sync:** Account for replication lag in application logic. If a user writes data, route their immediate subsequent read to the primary database to ensure consistency.

---

## 4. Transactions, Isolation Levels, & Locking

### Explanation
SQL databases support different transaction isolation levels defining how changes made by one transaction are visible to others:
- **Read Uncommitted:** Allows dirty reads.
- **Read Committed:** Default in PostgreSQL. Prevents dirty reads.
- **Repeatable Read:** Prevents non-repeatable reads.
- **Serializable:** Highest isolation level; prevents phantom reads by locking ranges.

### Best Practices
- **Avoid Optimistic Locking Conflicts:** Use optimistic locking (version column checks) for low-contention tables and pessimistic locking (`SELECT ... FOR UPDATE`) for high-contention fields like balance updates.
- **Keep Transactions Small:** Do not perform network calls (e.g., sending emails, HTTP requests) inside database transaction blocks.

### Example
```sql
-- Pessimistic locking for balance updates
START TRANSACTION;
SELECT balance FROM bank_accounts WHERE id = 'acc_123' FOR UPDATE;
UPDATE bank_accounts SET balance = balance - 100 WHERE id = 'acc_123';
COMMIT;
```

---

## 5. Migrations & Versioning

### Explanation
Database migrations must be version-controlled and applied sequentially to ensure system stability.

### Best Practices
- **No-Downtime Migrations:** Avoid locking operations in production. In PostgreSQL, create indexes concurrently: `CREATE INDEX CONCURRENTLY`.
- **Backward Compatibility:** Split schema changes into multi-phase deployments:
  1. Add column (nullable/with default).
  2. Update application to write to both old and new columns.
  3. Backfill historic data.
  4. Update application to read/write only from new column.
  5. Drop old column.

---

## 6. Soft Delete & Audit Logging

### Explanation
Soft delete hides rows by setting a flag (e.g., `deleted_at`) rather than executing an SQL `DELETE`. Audit logging tracks all data changes for security and compliance.

### Best Practices
- **Soft Delete Indexes:** If using soft delete, filter active rows with partial indexes to keep queries fast:
  ```sql
  CREATE INDEX idx_users_active ON users(email) WHERE deleted_at IS NULL;
  ```
- **Separate Audit Tables:** Write audit logs to a dedicated, write-only table or system log rather than overloading the main business tables. Use database triggers or application interceptors.

### Example
```sql
-- Audit log table structure
CREATE TABLE audit_logs (
  id BIGSERIAL PRIMARY KEY,
  table_name VARCHAR(100) NOT NULL,
  record_id VARCHAR(50) NOT NULL,
  action VARCHAR(10) CHECK (action IN ('INSERT', 'UPDATE', 'DELETE')),
  old_values JSONB,
  new_values JSONB,
  performed_by VARCHAR(100),
  performed_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```
