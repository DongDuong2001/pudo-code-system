# Rust (Backend) PUDO Checklist

## 1. PLAN (Architecture & Strategy)
- [ ] **Framework Selection:** Choose web framework (Axum, Actix-web) based on performance vs. ecosystem needs.
- [ ] **Crate Ecosystem:** Plan dependencies (e.g., `tokio` for async runtime, `serde` for serialization, `sqlx` or `sea-query` for DB).
- [ ] **Error Handling:** Define a centralized application error type using crates like `thiserror` or `anyhow`.
- [ ] **State Management:** Plan how application state (DB pools, config) will be shared across thread workers.

## 2. UNDERSTAND (Context & Auditing)
- [ ] **Borrow Checker & Lifetimes:** Audit data structures to minimize clones; rely on references where safe across async boundaries.
- [ ] **Async Context:** Ensure types crossing `.await` points implement `Send` and `Sync`.
- [ ] **Safety:** Review `unsafe` blocks if any exist. Justify their existence.

## 3. DEVELOP (Implementation)
- [ ] **Structs & Traits:** Define core domain models. Use `#[derive(Serialize, Deserialize)]` for data transfer objects.
- [ ] **Routes:** Implement handlers with strongly typed extractors (Json, Path, Query).
- [ ] **Database:** Use compile-time checked SQL queries (e.g., `sqlx::query!`) for type safety.
- [ ] **Testing:** Write inline unit tests (`#[test]`) and asynchronous integration tests (`#[tokio::test]`).

## 4. OPTIMIZE (Performance & Review)
- [ ] **Binary Size & Speed:** Review `Cargo.toml` profiles (e.g., strictly `opt-level = 3`, LTO enabled for release).
- [ ] **Memory Allocation:** Profile long-lived objects. Consider `Arc` for shared read-only state instead of cloning.
- [ ] **Compilation Time:** Use `cargo clippy` and `cargo fmt` to enforce idiomatic code and avoid macro bloat where unnecessary.
- [ ] **Logging:** Configure structured async logging using `tracing` and `tracing-subscriber`.