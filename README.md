# kapOS Portfolio — Next.js

A desktop operating system–inspired developer portfolio built with **Next.js 14 App Router**. The portfolio recreates a modern desktop experience with draggable windows, a magnified dock, menu bar, interactive terminal, spotlight search (`⌘K`), and full-featured desktop applications while showcasing projects, skills, and professional experience.

Designed with a strict **Feature-Based Architecture (FBA)** to provide a scalable, maintainable, and production-ready codebase.

---

## 📚 Architectural Documentation

Comprehensive documentation is available for reference:

- **[System Architecture & Blueprint (ARCHITECTURE.md)](ARCHITECTURE.md)**: Full architecture diagram, design patterns, window manager lifecycle, and feature specifications.
- **[Feature-Based Architecture Guide (docs/FEATURE_STRUCTURE.md)](docs/FEATURE_STRUCTURE.md)**: Rules for feature folders, public API contracts, and decomposition standards.
- **[Window Manager Deep Dive (docs/WINDOW_MANAGER.md)](docs/WINDOW_MANAGER.md)**: Multi-window state machine, z-index stacking, dragging/resizing mechanics, and mobile responsiveness.

---

## 🛠️ Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS & Glassmorphism design tokens
- **Animations**: Framer Motion
- **3D & Shaders**: Three.js & React Three Fiber (`@react-three/fiber`, `@react-three/drei`)
- **Icons**: Lucide React
- **Markdown & Code Highlighting**: React Markdown, Shiki, Mermaid
- **Code Quality**: ESLint, Prettier

---

## 🚀 Getting Started

### 1. Install Dependencies:
```bash
npm install
# or
yarn install
```

### 2. Start Development Server:
```bash
npm run dev
```

### 3. Build for Production:
```bash
npm run build
```

Visit:
```
http://localhost:3000
```

---

## 📁 Project Structure

The project follows a **feature-based architecture** where each domain capability is self-contained:

```text
src/
├── app/                        # Next.js App Router routes, layouts, metadata
├── components/                 # Global cross-cutting components
│   ├── common/                 # Application-wide UI (BootScreen, SectionLabel)
│   └── ui/                     # Reusable design system primitives (Button, Badge, Toggle, CButton)
│
├── constants/                  # Global immutable configurations (apps registry, developer profile)
├── hooks/                      # Shared global hooks (useClock, useMediaQuery, useMobile)
├── lib/                        # Low-level utilities (cn, clsx)
│
└── features/                   # Autonomous Domain Feature Modules
    ├── about/                  # Developer profile & tabbed explorer
    ├── blogs/                  # Technical articles & blog viewer
    ├── contact/                # Mail composer & social channels
    ├── desktop/                # OS desktop shell, menu bar, dock, widgets, wallpaper
    ├── experience/             # Git-style interactive career log
    ├── markdownPreview/        # Rich Markdown, Shiki syntax highlighter, Mermaid graphs
    ├── monitor/                # System performance & telemetry simulator
    ├── portfolio/              # 3D interactive portfolio showcase
    ├── projects/               # File explorer portfolio showcase
    ├── resume/                 # Dual Markdown/PDF interactive resume viewer
    ├── settings/               # System preference manager (accents, fonts, blur)
    ├── terminal/               # Interactive CLI shell simulator
    ├── theme/                  # Multi-theme engine (Cyberpunk, Skeuomorphism, Neubrutalism)
    ├── thoughtProcess/         # Architectural thought process viewer
    └── window-manager/         # Centralized multi-window state & layer manager
```

Each feature owns its components, custom hooks, data, and types, exporting exclusively through an `index.ts` public contract to keep module boundaries clean.

---

## ✨ Features

- **Cyberpunk HUD Design System**: High-tech netrunner aesthetic with cyan ice luminance glow, neon accents, interactive 3D WebGL Aurora background shader, scanlines, and telemetry widgets.
- **Desktop OS Simulation**: Windowed multitasking desktop with window stacking, drag, resize, minimize, maximize, and restore.
- **Magnified Dock**: Spring physics dock with proximity-based icon magnification.
- **Spotlight Search (`⌘K`)**: Instant keyboard search and app launcher.
- **Interactive Terminal**: CLI simulator with history navigation (Arrow Up/Down), command parsing (`help`, `about`, `skills`, `projects`, `resume`, `neofetch`, `clear`), and typewriter text animations.
- **Developer Monitor**: Simulated workstation telemetry with CPU/memory graphs, tech radar, and 52-week contribution heatmap.
- **Dual Resume Viewer**: Live Markdown resume preview with instant `.md` download, interactive PDF preview, and native browser print hookup.
- **Projects File Explorer**: Interactive file tree with markdown inspection, demo links, and GitHub repository integration.
- **Experience Git Log**: Career timeline styled as an interactive `git log` commit and branch tree.
- **3D Visual Effects**: Procedural aurora wallpaper shader, particle scenes, and responsive glassmorphism.
- **Adaptive Mobile Layout**: Automatic transformation into a touch-optimized mobile home screen and fullscreen apps on screens `<= 720px`.

---

## 📄 License

This project is open-source and intended as a personal portfolio and architectural reference. Feel free to use the architecture and ideas as inspiration for your own projects.
