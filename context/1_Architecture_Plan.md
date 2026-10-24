# 1. Architecture Plan

## System Architecture

This is a **Next.js 15 App Router** portfolio and administration web application backed by **Sanity CMS** for editorial blog content and **MongoDB via Prisma ORM** for user management and contact message responses. The public application features an immersive dark-mode visual experience with dual-layer SVG mask interactions and smooth scrolling, while the admin panel provides secure, cookie-authenticated access to dashboard metrics and contact inquiries.

---

## High-Level Architecture Diagram

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                  CLIENT (Browser)                                      │
│                                                                                        │
│  ┌──────────────────────────────────────────────────────────────────────────────────┐  │
│  │                               Next.js App Router                                 │  │
│  │                                                                                  │  │
│  │  RootLayout (Bebas Neue font, ReduxProvider)                                     │  │
│  │    ├── (portfolio) Layout (Header, Footer, Toaster)                              │  │
│  │    │     ├── template.tsx (PageTransitionLoader)                                 │  │
│  │    │     ├── (home)/page.tsx          ── SSR ──┐                                 │  │
│  │    │     ├── projects/page.tsx                 │                                 │  │
│  │    │     ├── contact/page.tsx                  │                                 │  │
│  │    │     ├── blogs/page.tsx           ── SSR ──┤                                 │  │
│  │    │     └── blogs/[slug]/page.tsx    ── ISR ──┤                                 │  │
│  │    │                                           │                                 │  │
│  │    ├── (admin) Route Group                     │                                 │  │
│  │    │     ├── login/page.tsx (Public)           │                                 │  │
│  │    │     └── (dashboard) Layout                │                                 │  │
│  │    │           ├── AuthProvider (Auth Guard)   │                                 │  │
│  │    │           ├── dashboard/page.tsx (Private)│                                 │  │
│  │    │           └── contact-enquire/ (Priv)     │                                 │  │
│  │    │                                           │                                 │  │
│  │    ├── studio/[[...tool]]/page.tsx             │                                 │  │
│  │    └── api/v1/users/ (Route Handlers)          │                                 │  │
│  └────────────────────────────────────────────────┼─────────────────────────────────┘  │
│                                                   │                                    │
│  ┌─────────────────────┐  ┌───────────────┐       │                                    │
│  │   Redux Store       │  │  Lenis Smooth │       │                                    │
│  │   (UI & Auth state) │  │  Scrolling    │       │                                    │
│  │   - navbar          │  └───────────────┘       │                                    │
│  │   - textHover       │                          │                                    │
│  │   - projectCardHover│  ┌───────────────┐       │                                    │
│  │   - accordion       │  │  Framer Motion│       │                                    │
│  │   - appState        │  │  (Animations) │       │                                    │
│  │   - userAuth        │  └───────────────┘       │                                    │
│  └─────────────────────┘                          │                                    │
│                                                   │                                    │
│  ┌─────────────────────┐  ┌───────────────┐       │                                    │
│  │  Canvas 2D Particles│  │  OGL WebGL    │       │                                    │
│  │  (mouse-reactive)   │  │  FerroFluid   │       │                                    │
│  └─────────────────────┘  └───────────────┘       │                                    │
└───────────────────────────────────────────────────┼────────────────────────────────────┘
                                                    │
                 ┌──────────────────────────────────┴──────────────────────────────────┐
                 │                                                                     │
    ┌────────────▼────────────┐                                           ┌────────────▼────────────┐
    │    Sanity CMS (Cloud)   │                                           │    MongoDB (Prisma ORM) │
    │                         │                                           │                         │
    │  ┌───────────────────┐  │                                           │  ┌───────────────────┐  │
    │  │  Content Schemas  │  │                                           │  │  Database Models  │  │
    │  │  - post (blogs)   │  │                                           │  │  - User           │  │
    │  │  - author         │  │                                           │  │  - ContactMessage │  │
    │  │  - tag            │  │                                           │  └───────────────────┘  │
    │  │  - projects       │  │                                           │                         │
    │  └───────────────────┘  │                                           │  ┌───────────────────┐  │
    │                         │                                           │  │  Client Singleton │  │
    │  ┌───────────────────┐  │                                           │  │  - prisma.user    │  │
    │  │  APIs             │  │                                           │  │  - prisma.contact │  │
    │  │  - GROQ queries   │  │                                           │  └───────────────────┘  │
    │  │  - Live content   │  │                                           └─────────────────────────┘
    │  │  - Image CDN      │  │
    │  └───────────────────┘  │
    └─────────────────────────┘
```

---

## Rendering & Access Strategy

| Route                               | Access    | Strategy               | Data Source & Middleware              |
| ----------------------------------- | --------- | ---------------------- | ------------------------------------- |
| `/` (Home)                          | Public    | Server Component (SSR) | Sanity (blogs), static constants      |
| `/projects`                         | Public    | Static (client render) | Hardcoded `projectsData.ts`           |
| `/contact`                          | Public    | Static (client render) | Server Action (`prisma.contactMessage`)|
| `/blogs`                            | Public    | Server Component (SSR) | Sanity (all published blogs)          |
| `/blogs/[slug]`                     | Public    | ISR (revalidate: 3600) | Sanity (single post via GROQ)         |
| `/login`                            | Public    | Client Component       | Redux `userAuth`, redirect if authed  |
| `/dashboard`                        | Private   | Client Component       | Protected by `AuthProvider`           |
| `/contact-enquire`                  | Private   | Client Component       | Protected by `AuthProvider`, Prisma   |
| `/studio/[[...tool]]`               | Public    | Client-only            | Sanity Studio embedded                |

---

## Data Flow Patterns

### 1. Blog Editorial Content (Server → Client)
```
Sanity CMS → sanityFetch(GROQ) → page.tsx (Server Component) → props → MaskPage / RegularPage (Client)
```

### 2. Public Contact Inquiries (Client → Database)
```
ContactForm (Client, useForm + Zod) → submitContactMe() (Server Action) → prisma.contactMessage.create() → MongoDB
```

### 3. Admin Authentication & Session Management
```
Login Form → POST /v1/users/auth/login → Verify bcrypt password → Issue HttpOnly session cookie
Page Load  → GET /v1/users/auth (with cookie) → Redux userAuth dispatch → AuthProvider route gating
Logout     → POST /v1/users/auth/logout → Clear HttpOnly cookie → Redux setLogout → Redirect /login
```

### 4. Admin Contact Enquiries Query
```
Admin Dashboard → GET /v1/users/contact-enquire (Cookie validated) → prisma.contactMessage.findMany() → Table View
```

---

## Route Group Architecture

```
src/app/
├── layout.tsx                    # Root: <html>, <body>, fonts, Redux provider
├── (portfolio)/                  # Public portfolio route group (no URL segment)
│   ├── layout.tsx                # Shared: Header + Footer + Sonner Toaster
│   ├── template.tsx              # Per-navigation: Page transition loader
│   ├── (home)/page.tsx           # / → Home page
│   ├── projects/page.tsx         # /projects
│   ├── contact/page.tsx          # /contact
│   ├── blogs/
│   │   ├── page.tsx              # /blogs
│   │   └── [slug]/page.tsx       # /blogs/:slug
│   └── not-found.tsx             # 404 error page
├── (admin)/                      # Admin panel route group
│   ├── login/
│   │   └── page.tsx              # /login (PUBLIC route)
│   └── (dashboard)/              # Protected dashboard group
│       ├── layout.tsx            # AuthProvider wrapper + admin layout shell
│       ├── dashboard/
│       │   └── page.tsx          # /dashboard (PRIVATE route)
│       └── contact-enquire/
│           └── page.tsx          # /contact-enquire (PRIVATE route)
├── api/                          # Next.js App Router API endpoints
│   └── v1/
│       └── users/
│           ├── auth/
│           │   ├── route.ts      # GET: Current authenticated user details
│           │   ├── login/
│           │   │   └── route.ts  # POST: Login & set HttpOnly cookie
│           │   └── logout/
│           │       └── route.ts  # POST: Logout & invalidate cookie
│           ├── contact-enquire/
│           │   └── route.ts      # GET: Fetch all contact inquiries
│           └── contact/
│               └── route.ts      # POST: Submit contact inquiry
└── studio/                       # Sanity Studio (excluded from portfolio layout)
    ├── layout.tsx                # Minimal layout for studio
    └── [[...tool]]/page.tsx      # Catch-all for studio routes
```

---

## Database Architecture (Prisma + MongoDB)

```prisma
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  ADMIN
  MEMBER
}

model User {
  id         String   @id @default(auto()) @map("_id") @db.ObjectId
  firstName  String
  middleName String?
  lastName   String
  email      String   @unique
  phone      String?
  role       Role     @default(ADMIN)
  password   String   // Hashed with bcrypt
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
}

model ContactMessage {
  id        String   @id @default(auto()) @map("_id") @db.ObjectId
  name      String
  email     String
  phone     String?
  subject   String
  message   String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

---

## Key Dependencies & Roles

| Package                   | Purpose                                                        |
| ------------------------- | -------------------------------------------------------------- |
| `@prisma/client` & `prisma`| MongoDB ORM with type-safe models for Users & ContactMessages |
| `axios`                   | Client HTTP client for `/v1/users/*` endpoints with credentials|
| `next-sanity`             | Sanity v3 integration, GROQ queries, live content API          |
| `framer-motion`           | Dual-layer mask animations, transitions, and accordions        |
| `@reduxjs/toolkit`        | UI & Auth state management (`userAuth`, `navbar`, `mask`, ...) |
| `lenis`                   | Smooth inertia scrolling on portfolio routes                   |
| `ogl`                     | WebGL renderer for FerroFluid shader effect                    |
| `sonner`                  | Toast notifications for form feedback and auth alerts          |
| `zod` & `react-hook-form` | Schema validation and form management (contact & login)        |
| `clsx` + `tailwind-merge` | Conditional className composition utility                      |
| `date-fns`                | Timestamp formatting in contact responses and blog posts       |
| `react-icons`             | Icon set (FontAwesome, Feather, Simple Icons)                  |
