# KiaraFun

Product-first, anime-native website for an upcoming Solana token launchpad.

## Run & Operate

- Run the website through the managed `artifacts/kiarafun: web` workflow.
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- This phase is frontend-only; the website does not require a database or external integrations.

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/kiarafun/` — complete responsive brand website.
- `artifacts/kiarafun/public/assets/kiara-mascot.png` — official original mascot.
- `attached_assets/Pasted--KIARAFUN-COMPLETE-CREATIVE-REBUILD-Premium-Solana-Laun_1792408632218.txt` — current creative requirements, superseding the initial brief.

## Architecture decisions

- Phase 1 is strictly the brand website. Do not implement token contracts, token creation, trading, wallet connection, registration, or backend services without a new requirement.
- Product differentiators are planned, not live. Never invent fees, release dates, audit claims, token activity, or financial guarantees.

## Product

KiaraFun is a Solana token launchpad in development, intended for creating community tokens, discovering launches, and following creator/community updates. Planned differences are richer token profiles, clearer verifiable launch information, and more expressive discovery. Conceptual interfaces must be explicitly labeled and must not fabricate live activity.

## User preferences

- All visible website content must be in English.
- The supplied Kiara image is the official logo and mascot; use it for brand identity and derived favicon assets. Preserve the original character and background; do not regenerate, redesign, or replace it.
- No emoji in designs or UI. Use official logos when displaying a logo alongside a named brand or service.
- Keep the interface clean and concise, without raw technical details or nonessential information.
- Keep the design product-first, not a generic anime portfolio or storytelling presentation. No decorative chapter/step numbering, public color swatches or hex codes, three-slide scroll presentation, or repeated giant-bold/red-italic headline formula.
- Signature motion must be a single continuous scroll-scrubbed statement paired with a coherent conceptual launch interface, not separate text slides. Mobile uses natural flow; reduced-motion users receive fully readable content.

## Gotchas

_Populate as you build — sharp edges, "always run X before Y" rules._

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
