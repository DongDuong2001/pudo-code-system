# Example 01: Building a Product Landing Page

> **Complexity:** ⭐ Beginner  
> **Time:** ~2 hours  
> **Key Takeaway:** How Plan prevents scope creep

---

## Context

You need to build a landing page for a new SaaS product. The founder has a vague brief: *"Make it look modern, have a hero section, features, pricing, and a CTA."*

Without PUDO, this turns into 4 hours of back-and-forth with AI, changing fonts, moving sections around, and ending up with something that looks "fine" but took way too long.

With PUDO, you ship in 2 hours with a page that exceeds expectations.

---

## 🟡 Plan

### What You Tell the AI

```
I need to build a product landing page for a SaaS analytics tool called "Insightful."

Scope:
- Hero section with headline, subtitle, CTA button
- 3-column feature grid with icons
- Pricing section with 3 tiers (Free, Pro, Enterprise)
- Footer with links and social icons

Constraints:
- Single-page HTML/CSS/JS (no framework)
- Dark theme with gradient accents
- Mobile-responsive (breakpoints at 768px and 480px)
- Must load in under 2 seconds

Out of scope:
- Backend/API
- User authentication
- Blog section

Create an implementation plan before writing any code.
```

### What the AI Produces

An implementation plan covering:
- File structure (index.html, styles.css, script.js)
- Component breakdown (navbar, hero, features, pricing, footer)
- Color palette and typography choices
- Responsive strategy (mobile-first)
- Animation plan (scroll reveals, hover effects)

### Your Decision

You review the plan, adjust the color palette, and approve. **Total time: 10 minutes.**

> **Why this matters:** Without this step, the AI would have guessed at everything. You'd spend the Develop phase undoing decisions you didn't agree with.

---

## 🔵 Understand

### What You Do

This is a greenfield project, so the Understand phase is lighter. But it's not empty:

```
Before we build, research:
1. Current landing page design trends (2025-2026)
2. Best practices for above-the-fold conversion
3. Accessible color contrast ratios for dark themes
```

### What You Learn

- **Trend:** Bento grid layouts are everywhere; glassmorphism is still going strong
- **Conversion:** CTA should be visible without scrolling, use contrasting color
- **Accessibility:** Dark theme needs minimum 4.5:1 contrast ratio for text

### Your Decision

You update the plan to use a bento grid for features and ensure the CTA button uses a high-contrast accent color. **Total time: 10 minutes.**

---

## 🟢 Develop

### Task Checklist

```
- [x] Set up file structure (index.html, styles.css, script.js)
- [x] Build design system (CSS custom properties: colors, fonts, spacing)
- [x] Hero section with animated gradient background
- [x] Feature grid (bento layout, 3 items)
- [x] Pricing cards (3 tiers with hover effects)
- [x] Footer with social links
- [x] Mobile responsiveness
- [x] Scroll reveal animations
```

### How It Goes

You work through the checklist top-to-bottom. The AI generates each section, you review the code, test it in the browser, and approve or request changes.

**Key moment:** The AI generates a pricing section with a toggle for monthly/annual billing. This wasn't in the plan. You say:

```
Good idea, but that's out of scope for v1. Stick to the plan — 
we can add the toggle in the next cycle.
```

**Total time: 90 minutes.**

> **Why this matters:** The plan gave you a clear boundary to say "no" to scope creep. Without it, you'd have added the toggle, then a testimonials section, then a blog, and shipped at midnight.

---

## 🟣 Optimize

### What You Do

```
Review the implementation:
1. Run a Lighthouse audit — target 90+ on all scores
2. Check accessibility (contrast ratios, alt text, keyboard nav)
3. Compress all images (WebP format)
4. Review CSS for unused rules
5. Write a walkthrough summarizing the build
```

### Results

| Metric | Before | After |
|---|---|---|
| Performance | 82 | 95 |
| Accessibility | 88 | 100 |
| Best Practices | 92 | 100 |
| SEO | 90 | 100 |
| Page Size | 1.2 MB | 340 KB |

**Total time: 20 minutes.**

---

## Retrospective

| Phase | Time | Value |
|---|---|---|
| Plan | 10 min | Prevented 3 scope creep moments |
| Understand | 10 min | Caught accessibility issue early |
| Develop | 90 min | Clean, systematic build |
| Optimize | 20 min | Lighthouse went from 82 → 95 |
| **Total** | **130 min** | **Shipped with confidence** |

**Without PUDO (estimated):** 3–4 hours, lower quality, accumulated scope creep, no documentation.

---

**Key lesson:** The Plan phase doesn't slow you down — it speeds you up by eliminating indecision during development.
