# KiaraFun rebuild plan (internal)

Audit: old page = numbered 3-scene pinned story (+330% pin), A/B/C feature essays, Journey diagram,
Meet Kiara with palette swatches, "Your story starts here" CTA, global GSAP selectors, red-italic headline formula.

Replace:
- hero.tsx -> product-first sky composition, mascot cropped/masked bottom-right, two anchor CTAs.
- story.tsx -> `sequence.tsx`: one paragraph, per-word scrubbed timeline (single ScrollTrigger-less timeline w/ scrollTrigger, scrub),
  CSS-sticky conceptual launch surface whose zone emphasis follows the active word. No pinning. Mobile: natural flow, all zones visible.
- features/journey/meet-kiara -> `launchpad.tsx` (tabbed conceptual app: create/discover/follow) and `why.tsx` (three differentiators, interactive list + micro diagrams).
- final-cta -> `closing.tsx`. faq/footer/nav simplified. art.tsx trimmed (Cloud/Sparkle removed).
- Keep motion.ts (single Lenis + single ticker), mascot, favicons, config.
- All animation scoped via gsap.context(root). Palette lives in CSS only.
