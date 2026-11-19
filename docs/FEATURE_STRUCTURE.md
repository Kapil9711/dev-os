# Feature-Based Architecture (FBA) Guide

This guide explains how feature modules are structured in `kapOS` and why this pattern is critical for codebase maintainability and scalability.

---

## 1. Why Feature-Based Architecture?

Traditional React applications often group files by technical role:
```text
# ❌ Traditional Layer-Based Structure (High coupling across features)
src/
├── components/
│   ├── TerminalLine.tsx
│   ├── MonitorChart.tsx
│   └── BlogCard.tsx
├── hooks/
│   ├── useTerminal.ts
│   └── useMonitorStats.ts
├── data/
│   ├── terminalFiles.ts
│   └── blogs.ts
└── types/
    ├── terminal.ts
    └── blogs.ts
```

In layer-based architectures:
- Modifying a feature requires jumping across 4+ distant folders.
- Deleting or refactoring a feature leaves orphaned files.
- Boundaries between features blur, leading to tangled imports.

In `kapOS`, we organize by **domain feature**:
```text
# ✅ Feature-Based Architecture (High cohesion, low coupling)
src/features/<feature-name>/
├── components/          # Scoped presentational & container components
├── hooks/               # Scoped React hooks & state logic
├── data/                # Scoped static data & mock records
├── types/ or types.ts   # Scoped TypeScript types & interfaces
├── utils/               # Scoped pure helper functions
└── index.ts             # Public API Contract (barrel export)
```

---

## 2. Anatomy of a Feature Folder

| Item | Purpose | Rule |
| :--- | :--- | :--- |
| `components/` | Subcomponents and top-level screen | Break components longer than 150 lines into focused subcomponents. |
| `hooks/` | Custom hooks | Encapsulate lifecycle effects, keyboard listeners, and animation logic. |
| `data/` | Static configuration or data | Type-safe constants and datasets specific to this feature. |
| `types.ts` | Type definitions | Export interfaces, unions, and prop types. |
| `utils/` | Pure helper functions | Deterministic functions without React dependencies. |
| `index.ts` | Feature public contract | **The only file external consumers may import from.** |

---

## 3. Strict Module Boundary Rules

### Rule 1: Always Import via the Feature Barrel (`index.ts`)
```tsx
// ❌ WRONG: Deep-importing breaks feature encapsulation
import { BlogDetail } from "@/features/blogs/components/BlogDetail";
import { useTerminal } from "@/features/terminal/hooks/useTerminal";

// ✅ CORRECT: Import via public feature contract
import { BlogsWindow, type Blog } from "@/features/blogs";
import { Terminal, useTerminal } from "@/features/terminal";
```

### Rule 2: Shared UI Lives in `src/components/ui`
If a component has **no domain knowledge** (e.g., standard Button, Badge, Toggle), it belongs in `src/components/ui/`, not in a specific feature.

### Rule 3: Zero Cross-Feature Component Dependencies
Features should not depend directly on internal components of other features. If two features need to share a component, either:
1. Promote it to `src/components/ui/` or `src/components/common/`.
2. Move shared business logic to a shared utility or hook.

---

## 4. Feature Checklist

When creating or modifying a feature:
- [ ] Folder resides in `src/features/<feature-name>/`
- [ ] Large components are decomposed (< 150 lines target)
- [ ] All props and state have TypeScript interfaces
- [ ] Public components and types are re-exported in `index.ts`
- [ ] App is registered in `src/constants/apps.ts` and `src/features/window-manager/components/WindowLayer.tsx` (if a window app)
- [ ] Passes `npx tsc --noEmit` and `npm run lint`
