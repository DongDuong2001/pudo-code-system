# Next.js 15 (App Router) PUDO Checklist

## 1. PLAN (Architecture & Strategy)
- [ ] **Rendering Strategy:** Define which routes will be Server Components (RSC) and which require Client Components (`use client`).
- [ ] **Data Fetching:** Plan caching strategies using Next.js 15's native `fetch` overrides and `React.cache`.
- [ ] **Routing Tree:** Map out nested layouts, `loading.tsx`, `error.tsx`, and `not-found.tsx` boundaries.
- [ ] **Mutations:** Plan Server Actions for data mutations instead of traditional API routes where possible.

## 2. UNDERSTAND (Context & Auditing)
- [ ] **RSC Boundary:** Ensure `use client` directives are pushed as far down the component tree as possible.
- [ ] **Bundle Analysis:** Audit third-party packages to ensure they are compatible with Server Components.
- [ ] **State Management:** Review where global state (Zustand, Redux) is truly needed versus URL state or server state.

## 3. DEVELOP (Implementation)
- [ ] **Components:** Build Server Components by default. Extract interactivity (hooks, events) into minimal Client Components.
- [ ] **Forms & Mutations:** Use React 19 hooks (`useActionState`, `useFormStatus`) combined with Server Actions.
- [ ] **Streaming:** Wrap slow data-fetching components in `<Suspense>` to stream HTML to the client progressively.
- [ ] **Assets:** Utilize `<Image>`, `<Link>`, and `next/font` for automatic asset optimization.

## 4. OPTIMIZE (Performance & Review)
- [ ] **Caching:** Verify Data Cache, Full Route Cache, and Router Cache behaviors. Configure `revalidate` tags correctly.
- [ ] **SEO & Metadata:** Implement dynamic `generateMetadata` for accurate Open Graph and SEO tags.
- [ ] **Web Vitals:** Check LCP (Largest Contentful Paint) and CLS (Cumulative Layout Shift) metrics.
- [ ] **Edge Compatibility:** Ensure middleware and essential handlers are Edge-runtime compatible if deploying to Vercel/similar.