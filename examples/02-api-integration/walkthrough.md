# Example 02: Stripe Payment Integration

> **Complexity:** Intermediate  
> **Time:** ~4 hours  
> **Key Takeaway:** How Understand saves hours of debugging

---

## Context

You have a Next.js e-commerce app. The founder says: *"Add Stripe payments. Users need to pay for their cart."*

This is the kind of task where developers burn entire days debugging webhook signatures, wrong API versions, and race conditions — because they jumped straight into code without understanding the existing system.

---

## Plan

### What You Tell the AI

```
I need to add Stripe payment processing to an existing Next.js 14 e-commerce app.

Requirements:
- Checkout flow: cart → payment → confirmation
- Support credit/debit cards via Stripe Checkout (hosted page)
- Handle successful payments via Stripe webhooks
- Store order records in our Supabase database
- Send confirmation email after successful payment

Constraints:
- Next.js 14 App Router (already in use)
- Supabase for database (already configured)
- Must use Stripe Checkout (not custom Elements) for PCI compliance
- Server-side only — no Stripe secret key on the client

Out of scope:
- Subscription billing
- Refund handling
- Multiple payment methods (Apple Pay, Google Pay)

Create an implementation plan with a clear data flow diagram.
```

### What the AI Produces

A plan covering:
- Data flow: Client → Server Action → Stripe API → Webhook → Database
- Files to create/modify
- API endpoint structure
- Database schema changes (orders table)
- Environment variables needed

### Your Decision

You approve the plan but add a constraint: *"Use Stripe API version 2024-12-18 specifically — we've tested against it."* **Total time: 15 minutes.**

---

## Understand

### What You Tell the AI

```
Before implementing, analyze these parts of the codebase:

1. The existing cart system — how is cart state managed?
2. The Supabase client setup — how are we connecting to the database?
3. The existing auth system — how do we identify the current user?
4. The project's API route conventions — how are server actions structured?
5. The existing environment variable setup — where are secrets stored?

Also review the Stripe Checkout documentation for server-side integration.
```

### What the AI Finds

| Area | Finding | Impact |
|---|---|---|
| Cart state | Stored in Zustand (client-side) | Need to pass cart to server action, not read from store server-side |
| Supabase client | Uses `createServerClient()` in server components | Follow same pattern for order creation |
| Auth | Uses Supabase Auth, `getUser()` from cookies | Can link orders to user ID |
| API conventions | Server Actions in `app/actions/` directory | Place Stripe actions here |
| Env vars | `.env.local` for secrets, verified in `next.config.js` | Add `STRIPE_SECRET_KEY` and `STRIPE_WEBHOOK_SECRET` |

### Critical Discovery

The AI discovers that the cart uses **client-side Zustand state** — which means the server action can't just read the cart from the store. The cart items need to be **passed as a parameter** to the checkout action.

Without this phase, you'd have written a server action that tries to read from Zustand on the server side, gotten a cryptic error, and spent 45 minutes debugging.

**Total time: 20 minutes of analysis. Saved: ~45 minutes of debugging.**

---

## Develop

### Task Checklist

```
- [x] Add Stripe dependencies (`stripe`, `@stripe/stripe-js`)
- [x] Create Supabase migration for `orders` table
- [x] Create server action: `createCheckoutSession`
- [x] Create webhook handler: `POST /api/webhooks/stripe`
- [x] Create checkout button component
- [x] Create order confirmation page
- [x] Add environment variables
- [x] Test happy path (successful payment)
- [x] Test edge case (payment failed/cancelled)
- [x] Test webhook signature verification
```

### Key Decisions During Development

**Decision 1: Cart validation**  
The AI suggests validating cart items server-side before creating the Stripe session:

```typescript
// Don't trust client-side prices — re-fetch from database
const validatedItems = await Promise.all(
  cartItems.map(item => db.query.products.findFirst({
    where: eq(products.id, item.productId)
  }))
);
```

You approve. This prevents price manipulation attacks.

**Decision 2: Idempotency**  
The AI flags that Stripe webhooks can fire multiple times. It adds an idempotency check:

```typescript
// Check if order already exists for this Stripe session
const existing = await db.query.orders.findFirst({
  where: eq(orders.stripeSessionId, session.id)
});
if (existing) return; // Already processed
```

You approve. This prevents duplicate orders.

**Total time: 2.5 hours.**

---

## Optimize

### What You Review

```
Review the Stripe integration:
1. Security: Are we leaking any secrets? Is webhook signature verified?
2. Error handling: What happens if Stripe is down?
3. Edge cases: Abandoned carts, expired sessions, network timeouts
4. Performance: Are we making unnecessary API calls?
5. Code quality: Does it match existing patterns?
```

### Improvements Made

| Issue Found | Fix Applied |
|---|---|
| No error boundary on checkout page | Added error.tsx with retry button |
| Missing loading state during redirect | Added skeleton UI while Stripe loads |
| Webhook handler logs full session object | Reduced to logging session ID only (security) |
| No timeout on Stripe API calls | Added 10-second timeout with graceful fallback |
| Missing TypeScript types for order | Created `types/order.ts` with full type definitions |

### Final Verification

```bash
# Test the full flow
npm run dev
# → Add items to cart
# → Click checkout
# → Complete payment with test card 4242 4242 4242 4242
# → Verify redirect to confirmation page
# → Check Supabase for order record
# → Verify webhook fired (Stripe dashboard)
```

**Total time: 45 minutes.**

---

## Retrospective

| Phase | Time | Value |
|---|---|---|
| Plan | 15 min | Clear data flow, explicit scope (no subscription creep) |
| Understand | 20 min | Found Zustand/server mismatch — saved ~45 min of debugging |
| Develop | 2.5 hr | Clean implementation with security-first decisions |
| Optimize | 45 min | Fixed 5 issues that would have been production bugs |
| **Total** | **~4 hr** | **Production-ready payment system** |

**Without PUDO (estimated):** 6–8 hours, at least 2 production bugs related to webhooks and cart state.

---

**Key lesson:** The Understand phase is where PUDO pays the biggest dividends on existing codebases. 20 minutes of analysis saves hours of debugging.
