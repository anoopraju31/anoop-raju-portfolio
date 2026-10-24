# 1. Architecture Plan

## System Architecture

This is a **Next.js 15 App Router** portfolio website with **Sanity CMS** as the headless content backend. The architecture is designed around immersive visual effects, smooth interactions, and server-side content delivery.

---

## High-Level Architecture Diagram

```
┌──────────────────────────────────────────────────────────────────────┐
│                        CLIENT (Browser)                              │
│                                                                      │
│  ┌──────────────────────────────────────────────────────────────┐    │
│  │                     Next.js App Router                       │    │
│  │                                                              │    │
│  │  RootLayout (Bebas Neue font, ReduxProvider)                 │    │
│  │    ├── (portfolio) Layout (Header, Footer, Toaster)          │    │
│  │    │     ├── template.tsx (PageTransitionLoader)              │    │
│  │    │     ├── (home)/page.tsx  ──── SSR ────┐                 │    │
│  │    │     ├── projects/page.tsx              │                 │    │
│  │    │     ├── contact/page.tsx               │                 │    │
│  │    │     ├── blogs/page.tsx    ──── SSR ────┤                 │    │
│  │    │     └── blogs/[slug]/page.tsx ── ISR ──┤                 │    │
│  │    └── studio/[[...tool]]/page.tsx          │                 │    │
│  └─────────────────────────────────────────────┼────────────────┘    │
│                                                │                     │
│  ┌─────────────────────┐  ┌───────────────┐    │                     │
│  │   Redux Store       │  │  Lenis Smooth │    │                     │
│  │   (UI state only)   │  │  Scrolling    │    │                     │
│  │   - navbar          │  └───────────────┘    │                     │
│  │   - textHover       │                       │                     │
│  │   - projectCardHover│  ┌───────────────┐    │                     │
│  │   - accordion       │  │  Framer Motion│    │                     │
│  │   - appState        │  │  (Animations) │    │                     │
│  └─────────────────────┘  └───────────────┘    │                     │
│                                                │                     │
│  ┌─────────────────────┐  ┌───────────────┐    │                     │
│  │  Canvas 2D Particles│  │  OGL WebGL    │    │                     │
│  │  (mouse-reactive)   │  │  FerroFluid   │    │                     │
│  └─────────────────────┘  └───────────────┘    │                     │
│                                                │                     │
└────────────────────────────────────────────────┼─────────────────────┘
                                                 │
                                    ┌────────────▼────────────┐
                                    │    Sanity CMS (Cloud)   │
                                    │                         │
                                    │  ┌───────────────────┐  │
                                    │  │  Content Schemas   │  │
                                    │  │  - post (blogs)    │  │
                                    │  │  - author          │  │
                                    │  │  - tag             │  │
                                    │  │  - contactMe       │  │
                                    │  │  - projects        │  │
                                    │  └───────────────────┘  │
                                    │                         │
                                    │  ┌───────────────────┐  │
                                    │  │  APIs              │  │
                                    │  │  - GROQ queries    │  │
                                    │  │  - Live content    │  │
                                    │  │  - Image CDN       │  │
                                    │  │  - Mutations       │  │
                                    │  └───────────────────┘  │
                                    └─────────────────────────┘
```

---

## Rendering Strategy

| Route                    | Strategy                | Data Source               |
| ------------------------ | ----------------------- | ------------------------- |
| `/` (Home)               | Server Component (SSR)  | Sanity (blogs), constants |
| `/projects`              | Static (client render)  | Hardcoded constants       |
| `/contact`               | Static (client render)  | N/A (form only)           |
| `/blogs`                 | Server Component (SSR)  | Sanity (all blogs)        |
| `/blogs/[slug]`          | ISR (revalidate: 3600)  | Sanity (single post)      |
| `/studio/[[...tool]]`    | Client-only             | Sanity Studio embedded    |

---

## Data Flow Patterns

### Blog Content (Server → Client)
```
Sanity CMS → sanityFetch(GROQ) → page.tsx (Server Component) → props → MaskPage/RegularPage (Client)
```

### Contact Form (Client → Server → Sanity)
```
ContactForm (Client) → submitContactMe() (Server Action) → client.create() → Sanity CMS
```

### UI State (Client-only)
```
User interaction → Redux dispatch → Redux slice → useAppSelector → Component re-render
```

---

## Route Group Architecture

```
src/app/
├── layout.tsx                    # Root: <html>, <body>, font, Redux provider
├── (portfolio)/                  # Route group (no URL segment)
│   ├── layout.tsx                # Shared: Header + Footer + Toaster
│   ├── template.tsx              # Per-navigation: Page transition loader
│   ├── (home)/page.tsx           # / → Home page
│   ├── projects/page.tsx         # /projects
│   ├── contact/page.tsx          # /contact
│   ├── blogs/
│   │   ├── page.tsx              # /blogs
│   │   └── [slug]/page.tsx       # /blogs/:slug
└── studio/                       # Sanity Studio (excluded from portfolio layout)
    ├── layout.tsx                # Minimal layout for studio
    └── [[...tool]]/page.tsx      # Catch-all for studio routes
```

The `(portfolio)` route group ensures that Header/Footer/Toaster are shared across all portfolio pages but NOT the Sanity Studio. The `template.tsx` ensures page transition animations fire on every route change.

---

## Component Composition Pattern

Each major page follows a **dual-layer composition**:

```
Page (Server Component)
├── SmoothScrollLenis
│   └── <main>
│       ├── Particles (fixed background)
│       ├── Ambient glows (fixed decorative divs)
│       ├── MaskPage (absolute positioned)
│       │   └── Mask (mouse-following webkit-mask)
│       │       ├── SectionMask components (inverted colors)
│       │       └── ...
│       └── RegularPage (relative positioned)
│           ├── Section components (normal colors)
│           └── ...
```

---

## Key Dependencies & Their Roles

| Package                   | Purpose                                              |
| ------------------------- | ---------------------------------------------------- |
| `next-sanity`             | Sanity integration, GROQ queries, live content API   |
| `framer-motion`           | Page transitions, mask animations, scroll animations |
| `@reduxjs/toolkit`        | UI state management (5 slices)                       |
| `lenis`                   | Hardware-accelerated smooth scrolling                |
| `ogl`                     | WebGL renderer for FerroFluid shader effect           |
| `sonner`                  | Toast notifications (contact form feedback)          |
| `clsx` + `tailwind-merge` | Conditional className composition                    |
| `date-fns`                | Date formatting in Sanity schema previews            |
| `prismjs`                 | Code syntax highlighting in blog posts               |
| `react-icons`             | Icon library (FontAwesome, Feather, Simple Icons)    |

---

## Build & Deployment

- **Build**: `next build` produces a production-optimized bundle
- **Image optimization**: Sanity CDN images whitelisted via `next.config.js` (`domains: ['cdn.sanity.io']`)
- **ISR**: Blog post pages revalidate every 3600 seconds (1 hour)
- **SEO**: robots.ts disallows `/studio`, sitemap.ts lists all public routes
