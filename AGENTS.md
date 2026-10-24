# AGENTS.md — Anoop Raju Portfolio

## Project Overview

A high-fidelity, interactive personal portfolio website for **Anoop Raju**, a frontend developer based in Kerala, India. The site is built with **Next.js 15 (App Router)** and **Sanity CMS**, featuring an immersive dark-themed UI with particle effects, SVG mask interactions, Framer Motion animations, and WebGL shaders.

**Live URL:** `https://www.anoopraju.xyz`

---

## Tech Stack

| Layer               | Technology                                                               |
| ------------------- | ------------------------------------------------------------------------ |
| Framework           | Next.js 15 (App Router, React 18)                                        |
| Language            | TypeScript (strict mode)                                                 |
| Styling             | TailwindCSS 3 + CSS Modules (`.module.css`)                              |
| Animations          | Framer Motion 10, custom CSS keyframes                                   |
| CMS                 | Sanity v3 (embedded Studio at `/studio`, GROQ queries, live content API) |
| State Management    | Redux Toolkit (RTK)                                                      |
| Smooth Scrolling    | Lenis (`@studio-freight/lenis`)                                          |
| WebGL / 3D          | OGL (FerroFluid shader), Canvas 2D (Particles), Three.js (types only)    |
| Icons               | React Icons (FontAwesome, Feather, Simple Icons)                         |
| Fonts               | Bebas Neue (root), Gantari (body/pages), PT Sans (blog posts)            |
| Toast Notifications | Sonner                                                                   |
| Utilities           | clsx, tailwind-merge, date-fns                                           |
| Linting/Formatting  | ESLint (Next.js config), Prettier (with Tailwind plugin)                 |

---

## Directory Structure

```
├── public/                      # Static assets (project screenshots, OG image, SVGs)
├── context/                     # AI/agent context documents (this folder)
├── src/
│   ├── app/
│   │   ├── globals.css          # Tailwind directives + CSS custom properties
│   │   ├── layout.tsx           # Root layout (Bebas Neue font, ReduxProvider, metadata/SEO)
│   │   ├── not-found.tsx        # Custom 404 page with particles + mask effect
│   │   ├── robots.ts            # SEO robots.txt generation
│   │   ├── sitemap.ts           # SEO sitemap.xml generation
│   │   ├── (portfolio)/         # Route group for main portfolio pages
│   │   │   ├── layout.tsx       # Portfolio layout (Header, Footer, ScrollToTop, Toaster)
│   │   │   ├── template.tsx     # Page transition loader wrapper
│   │   │   ├── (home)/page.tsx  # Home page (server component, fetches blogs from Sanity)
│   │   │   ├── projects/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   ├── blogs/page.tsx
│   │   │   └── blogs/[slug]/page.tsx  # Dynamic blog post page (ISR, revalidate=3600)
│   │   └── studio/              # Embedded Sanity Studio (catch-all route)
│   ├── components/
│   │   ├── header/              # Animated sticky header with menu toggle
│   │   │   ├── Header.tsx       # Framer Motion header (hide-on-scroll, theme-aware)
│   │   │   ├── Curve.tsx        # SVG curve transition for nav menu
│   │   │   └── navMenu/         # Full-screen navigation overlay
│   │   ├── footer/              # Light-green themed footer (custom cursor, socials, CTA)
│   │   ├── mask/                # SVG mask component (mouse-following spotlight effect)
│   │   ├── pages/               # Page-specific component trees
│   │   │   ├── home/            # Home: MaskPage + RegularPage with 6 sections
│   │   │   │   └── sections/    # hero, projects, about, skills, experience, blogs
│   │   │   ├── projects/        # Projects: Asymmetric grid, project cards
│   │   │   ├── blogs/           # Blogs listing: grid of blog cards
│   │   │   ├── blogPost/        # Individual blog post: PortableText renderer
│   │   │   └── contact/         # Contact: form + info + socials
│   │   ├── blogCard/            # Reusable blog card component
│   │   ├── Particles.tsx        # Canvas 2D particle system (mouse-reactive)
│   │   ├── FerroFuild.tsx       # OGL WebGL ferrofluid shader effect
│   │   ├── MagneticContainer.tsx # Magnetic hover effect wrapper
│   │   ├── ParallaxContainer.tsx # Scroll-based parallax wrapper
│   │   ├── ReduxProvider.tsx    # Client-side Redux store provider
│   │   ├── ScrollToTopOnReload.tsx
│   │   ├── SmoothScrollLenis/   # Lenis smooth scroll wrapper
│   │   ├── AnimateCharacterByCharacter/
│   │   ├── FlipText/            # Text flip animation component
│   │   ├── pageTransitionLoader/ # Route-change animated loader
│   │   └── utils/               # mouse-position utility component
│   ├── constants/
│   │   └── projectsData.ts     # Static project list (5 projects with metadata)
│   ├── hooks/
│   │   ├── useAddDispatch.ts    # Typed Redux useDispatch
│   │   ├── useAppSelector.ts    # Typed Redux useSelector
│   │   ├── useFooterScrollOverViewport.ts  # Detects footer visibility for header theming
│   │   ├── useMousePostion.ts   # Global mouse position tracker (for mask)
│   │   └── useWindowWidth.ts    # Window width tracker
│   ├── redux/
│   │   ├── store.ts             # Redux store with 5 slices
│   │   └── features/
│   │       ├── appSlice.ts      # Lenis scroll root toggle
│   │       ├── navbarSlice.ts   # Menu open/close + hover states
│   │       ├── textHoverSlice.ts # Text hover state for mask expansion
│   │       ├── projectCardSlice.ts # Project card hover with link tracking
│   │       └── accordionSlice.ts  # Experience accordion open/close state
│   ├── sanity/
│   │   ├── env.ts               # Sanity environment variables
│   │   ├── query.ts             # GROQ queries (AllBlogsQuery2, postQuery, moreStoriesQuery)
│   │   ├── structure.ts         # Sanity Studio desk structure
│   │   ├── lib/
│   │   │   ├── client.ts        # Sanity client (CDN-backed)
│   │   │   ├── live.ts          # Sanity live content API (defineLive)
│   │   │   ├── image.ts         # Sanity image URL builder
│   │   │   └── utils.ts         # Sanity utility helpers
│   │   └── schemaTypes/
│   │       ├── index.ts         # Schema registry (author, tag, contactMe, projects, post)
│   │       ├── blogs/           # post, author, tags, blockContent schemas
│   │       ├── contactMe/       # Contact form submission schema
│   │       └── projects/        # Project document schema
│   └── utills/                  # NOTE: directory is misspelled as "utills"
│       ├── index.tsx            # cn() utility (clsx + twMerge), formatDate()
│       ├── constants.ts         # Static data (projects, skills, services, experience)
│       ├── animations.ts        # Framer Motion animation variants
│       ├── actions.ts           # Server actions (submitContactMe → Sanity create)
│       └── SkillLogos.ts        # React Icons icon arrays for skills section
├── sanity.config.ts             # Sanity Studio config (basePath: /studio)
├── sanity.types.ts              # Auto-generated Sanity TypeScript types
├── schema.json                  # Auto-generated Sanity schema JSON
├── types.ts                     # Manual TypeScript interfaces (Blogs, BlogsCoverImage)
├── tailwind.config.ts           # Custom colors (dark-blue, light-green), animations, fonts
└── tsconfig.json                # TS config with @/* path alias → ./src/*
```

---

## Architecture Patterns

### Dual-Layer Rendering (Mask + Regular)

Every major page (Home, Projects, Blogs) renders two parallel layers:

1. **MaskPage** — Identical content with inverted color scheme, revealed through a mouse-following SVG `webkit-mask` spotlight. Positioned absolutely on top.
2. **RegularPage** — Standard content layer underneath.

The `Mask` component (`src/components/mask/`) tracks mouse position via `useMousePosition` hook and applies CSS `webkit-mask-position` / `webkit-mask-size` animations via Framer Motion. When hovering project cards, the mask switches to an arrow-cursor mode.

### Data Flow

- **Blog data**: Fetched server-side via `sanityFetch()` (live content API) using GROQ queries. Pages are server components; data is passed as props to client components.
- **Projects data**: Hardcoded in `src/constants/projectsData.ts` (not fetched from Sanity, despite a Sanity projects schema existing).
- **Contact form**: Client-side form (`useForm` + Zod) → `submitContactMe()` server action → Prisma ORM `prisma.contactMessage.create()` to store submissions in MongoDB.

- **Experience/Skills**: Hardcoded in `src/utills/constants.ts`.

### State Management (Redux)

Redux is used exclusively for **UI state** (not data fetching):

- `appSlice`: Lenis smooth scroll toggle
- `navbarSlice`: Mobile menu open/close, hover tracking
- `textHoverSlice`: Text hover → mask size expansion
- `projectCardSlice`: Active project card → cursor arrow mode
- `accordionSlice`: Experience section accordion toggles

### Smooth Scrolling

Lenis (`@studio-freight/lenis`) wraps all portfolio pages via the `SmoothScrollLenis` component.

### Page Transitions

The `template.tsx` file wraps all portfolio routes in a `PageTransitionLoader` component that provides animated route transitions.

---

## Environment Variables

Required in `.env.local` (see `.env.example`):

```
NEXT_PUBLIC_SANITY_PROJECT_ID=<sanity-project-id>
NEXT_PUBLIC_SANITY_DATASET=<production|development>
NEXT_PUBLIC_SANITY_API_KEY=<sanity-api-token>
DATABASE_URL=<mongodb-uri>
NEXT_PUBLIC_BACKEND_URL=<backend-url>
```

---

## Key Conventions

1. **Path alias**: `@/*` maps to `./src/*` (configured in `tsconfig.json`).
2. **Styling**: Tailwind for utility classes; CSS Modules (`.module.css`) for complex, scoped styles. Both are used together via `cn()` (clsx + tailwind-merge).
3. **Fonts**: Loaded via `next/font/google`. Bebas Neue at root; Gantari on inner pages; PT Sans on blog posts.
4. **Color scheme**: Dark theme (`bg-dark-blue: #090e16`) with accent green (`light-green: rgb(76, 252, 15)`). Footer inverts to light-green background with dark-blue text.
5. **Route groups**: `(portfolio)` wraps all public pages; `(home)` is a pathless group for the index route.
6. **Component pattern**: Server components for data fetching (page.tsx), client components for interactivity (marked with `'use client'`).
7. **Sanity Studio**: Embedded at `/studio` route, excluded from robots.txt.
8. **SEO**: Full OpenGraph metadata, sitemap.xml, robots.txt, structured title templates.

---

## Commands

```bash
npm run dev       # Start development server
npm run build     # Production build
npm run start     # Start production server
npm run lint      # ESLint
npm run format    # Prettier format all files
```

---

## Known Quirks

- The `utills/` directory is misspelled (should be `utils`). Do NOT rename without updating all imports.
- `projectsData.ts` and `utills/constants.ts` both define project data with slightly different schemas. The projects page uses `projectsData.ts`; the home page projects section uses `utills/constants.ts`.
- The Sanity `projects` schema exists but projects data is currently hardcoded (not fetched from Sanity).
- `FerroFuild.tsx` is misspelled (should be `FerroFluid`). It's a WebGL shader component using OGL, currently available but usage may be conditional.
- Some components have commented-out MagneticContainer wrappers.
- The `devProjects` array in `utills/constants.ts` appears to be sample/placeholder data.
