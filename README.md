# vaibOS Portfolio — Next.js

A desktop-OS-styled developer portfolio, converted from a static HTML/vanilla-JS
prototype into a production-shaped Next.js 14 (App Router) application.

Content (name, role, skills, experience, projects) is sourced from the
provided resume — **Kapil Rajput, Software Engineer**.

## Stack

- Next.js 14 (App Router, React Server Components by default)
- TypeScript (strict)
- Tailwind CSS
- Framer-motion-ready (lucide-react icons included)
- ESLint + Prettier (with `prettier-plugin-tailwindcss`)

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Architecture

Feature-based, not page-based:

```
src/
  app/                  # routes, layout, metadata, loading/not-found
  components/
    ui/                 # Button, Badge, Toggle — generic primitives
    common/              # BootScreen, SectionLabel — shared, app-agnostic
  features/
    window-manager/      # the "OS kernel": context, drag/resize hooks, Window shell
    desktop/              # wallpaper, dock, menu bar, mobile shell, widgets
    about/ experience/ projects/ terminal/ resume/ monitor/ contact/ settings/
                          # one folder per "app" that can open in a window
  constants/              # DEV profile + APP_REGISTRY (single source of truth)
  lib/                    # cn(), formatClock(), slugify()
  hooks/                  # cross-feature hooks (useClock, useMediaQuery)
```

Each feature folder holds only what that feature needs (`components/`,
`data/`, `hooks/`) and re-exports its public API via `index.ts`.

## Notes on the conversion

- The window manager was rewritten from imperative DOM manipulation
  (`innerHTML`, manual style mutation) into a React context
  (`WindowManagerContext`) driving declarative `Window` components — this
  was necessary for a maintainable React codebase and changes only the
  implementation, not the visual behavior.
- Almost the entire experience is inherently interactive (drag/resize
  windows, live clock, spotlight search, terminal), so those pieces are
  Client Components. `app/layout.tsx` and `app/page.tsx` remain Server
  Components; per-app content components that don't need state (e.g.
  `Experience`) are Server Components by default.
- The original's embedded base64 photo belonged to a different person, so
  it was replaced with a generated initials placeholder
  (`public/images/profile.svg`). Swap in a real photo at that path any time.
- Original visual design (colors, spacing, glass/blur effects,
  animations, responsive breakpoints) is preserved via Tailwind config
  tokens and the CSS custom properties in `globals.css`.
