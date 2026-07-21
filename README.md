# kapOS Portfolio — Next.js

A desktop operating system–inspired developer portfolio built with **Next.js 14 App Router**. The portfolio recreates a modern desktop experience with draggable windows, a dock, menu bar, terminal, spotlight search, and interactive applications while showcasing projects, skills, and professional experience.

Designed with a feature-based architecture to provide a scalable, maintainable, and production-ready codebase.

---

## Tech Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Three.js & React Three Fiber
- Lucide React
- ESLint
- Prettier

---

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Visit:

```
http://localhost:3000
```

---

# Project Structure

The project follows a **feature-based architecture** rather than a traditional page-based structure.

```text
src/
├── app/                    # App Router routes, layouts, metadata
├── components/
│   ├── common/             # Shared reusable components
│   └── ui/                 # UI primitives
│
├── constants/              # Global constants
├── hooks/                  # Shared hooks
├── lib/                    # Utility functions
│
├── features/
│   ├── desktop/            # Desktop, wallpaper, dock, menu bar
│   ├── window-manager/     # Window system
│   ├── about/
│   ├── experience/
│   ├── projects/
│   ├── terminal/
│   ├── resume/
│   ├── contact/
│   ├── settings/
│   └── ...
```

Each feature owns its components, hooks, data, and exports through an `index.ts` file to keep module boundaries clean.

---

# Features

- Desktop OS inspired interface
- Multi-window system
- Drag & Resize windows
- Dock navigation
- Menu Bar
- Spotlight Search
- Interactive Terminal
- Responsive Design
- Smooth Animations
- Dark Glassmorphism UI
- Three.js Visual Effects

---

# Architecture

The application is built around a centralized **Window Manager**, which manages:

- Opening applications
- Closing applications
- Window stacking (z-index)
- Window focus
- Dragging
- Resizing
- Minimize / Maximize
- Application state

Instead of manipulating the DOM directly, the UI is rendered declaratively using React state and context, making the application scalable and easier to maintain.

---

# Design Principles

- Feature-first architecture
- Reusable UI components
- Type-safe development
- Responsive layouts
- Production-ready folder structure
- Clean separation of concerns
- Minimal shared state

---

# Future Improvements

- File Explorer
- Browser App
- Music Player
- Theme Engine
- Wallpaper Manager
- Command Palette
- Multiple Desktop Workspaces
- Persistent Window State
- PWA Support
- Internationalization (i18n)

---

# License

This project is intended as a personal portfolio and learning project. Feel free to use the architecture and ideas as inspiration for your own projects.
