# Example 04: Quality Gate Catches a Broken Export Feature

> **Complexity:** Intermediate
> **Time:** ~45 minutes saved
> **Key Takeaway:** A failed gate is useful signal, not wasted work

---

## Context

You add a CSV export button to an admin dashboard. The happy path works: click "Export", download a file, open it in a spreadsheet.

The first implementation looks shippable. But the Quality Gate fails before merge.

---

## Plan

### What You Tell the AI

```
I need to add CSV export for the admin orders table.

Success criteria:
- Admins can export the filtered orders view.
- Export includes order ID, customer email, total, status, and created date.
- Export works for up to 50,000 rows.

Constraints:
- Use existing admin auth.
- Do not expose customer data to non-admin users.
- Keep current table filters unchanged.

Quality gates:
- Server-side authorization must be verified.
- Export must respect active filters.
- Large exports must not block the UI.
- CSV must handle commas, quotes, and newlines safely.

Create an implementation plan before writing code.
```

### Plan Output

The plan includes the endpoint, export button, filter serialization, streaming response, and tests for authorization plus CSV escaping.

---

## Understand

The codebase review finds:

| Area | Finding | Impact |
|---|---|---|
| Admin auth | UI hides admin routes, but API routes still need server checks | Endpoint must verify role |
| Filters | Table stores filters in URL search params | Export should reuse the same params |
| Existing CSV helper | Escapes commas but not embedded quotes or newlines | Helper is unsafe for real customer data |
| Data volume | Current list endpoint paginates at 100 rows | Export needs a separate streaming path |

---

## Develop

The first implementation adds the button and endpoint. Manual happy-path testing passes.

Then the Develop Gate is run:

```
Develop Gate:
- [x] Implementation stays within the approved scope.
- [x] Code follows existing patterns and naming conventions.
- [ ] Happy path, error path, and important edge cases are handled.
- [ ] Relevant tests were added or updated.
- [x] Loading, empty, disabled, and failure states are covered.
- [x] Logs avoid secrets, tokens, raw PII, and noisy debug output.
```

### Gate Failure

The gate fails for two reasons:

1. The endpoint trusts the hidden admin UI and does not re-check admin role server-side.
2. The CSV helper corrupts fields containing quotes or newlines.

This is not ready to ship.

---

## Fix

The implementation is updated:

- Add server-side `requireAdmin()` at the export endpoint boundary.
- Replace the CSV helper with RFC 4180-style escaping.
- Add tests for non-admin access, active filters, commas, quotes, newlines, and empty exports.
- Add a large-export test using a mocked cursor so the response streams instead of loading all rows into memory.

---

## Optimize

The final review passes:

| Gate | Result |
|---|---|
| Plan Gate | Pass |
| Understand Gate | Pass |
| Develop Gate | Pass after fixes |
| Optimize / Ship Gate | Pass |

### Final Verification

```bash
npm test -- csv-export
npm run lint
```

Both checks pass, and the reviewer can trace every risky edge case back to a test or implementation decision.

---

## Retrospective

| Without Quality Gate | With Quality Gate |
|---|---|
| Non-admin users could call the export endpoint directly | Server-side role check blocks access |
| Customer data with quotes/newlines could produce broken CSV rows | CSV escaping is tested |
| Large exports might exhaust memory | Streaming path is verified |
| Review depends on human memory | Review follows explicit gate criteria |

**Key lesson:** The gate did not slow the team down. It stopped a security bug and a data quality bug before release.
