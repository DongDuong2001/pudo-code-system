# Python FastAPI PUDO Checklist

## 1. PLAN (Architecture & Strategy)
- [ ] **API Design:** Define RESTful endpoints, path parameters, and query parameters.
- [ ] **Data Validation:** Plan Pydantic models for request (In) and response (Out) schemas.
- [ ] **Database & ORM:** Select the async DB driver and ORM (e.g., SQLAlchemy 2.0 with async engine, SQLModel).
- [ ] **Authentication:** Plan dependency injection for Auth (OAuth2, JWT tokens).

## 2. UNDERSTAND (Context & Auditing)
- [ ] **Dependencies:** Review the existing dependency injection (`Depends()`) tree.
- [ ] **Sync vs Async:** Audit for blocking I/O calls within `async def` endpoints. Ensure CPU-bound tasks use `def` or thread pools.
- [ ] **Middleware:** Review CORS, rate limiting, and custom middleware configurations.

## 3. DEVELOP (Implementation)
- [ ] **Schemas:** Implement strict Pydantic v2 models with `Field` validation constraints.
- [ ] **Endpoints:** Create routers (`APIRouter`) to group related endpoints.
- [ ] **Dependency Injection:** Use `Depends()` for database sessions, current user retrieval, and pagination parameters.
- [ ] **Error Handling:** Implement custom Exception Handlers for consistent JSON error responses.

## 4. OPTIMIZE (Performance & Review)
- [ ] **Concurrency:** Ensure database calls are utilizing `await` properly without deadlocks.
- [ ] **Serialization:** Profile Pydantic serialization speeds; consider `orjson` if JSON parsing is a bottleneck.
- [ ] **Documentation:** Enrich OpenAPI docs with endpoint descriptions, tags, and summary response models.
- [ ] **Security:** Verify that sensitive models do not leak password hashes via `response_model` constraints.