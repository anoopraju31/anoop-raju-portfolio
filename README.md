# Anoop Raju — Personal Portfolio

[![Live Site](https://img.shields.io/badge/Live_Site-anoopraju.xyz-4cfc0f?style=for-the-badge&logo=googlechrome&logoColor=090e16)](https://www.anoopraju.xyz)
[![Next.js 15](<https://img.shields.io/badge/Next.js-15_(App_Router)-black?style=for-the-badge&logo=next.js>)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-Strict-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Sanity v3](<https://img.shields.io/badge/Sanity-v3_(CMS)-F03E2F?style=for-the-badge&logo=sanity&logoColor=white>)](https://www.sanity.io/)
[![Prisma ORM](https://img.shields.io/badge/Prisma-MongoDB-2D3748?style=for-the-badge&logo=prisma&logoColor=white)](https://www.prisma.io/)

A high-fidelity, interactive personal portfolio website for **Anoop Raju**, a Software Developer based in Kerala, India. Built with **Next.js 15 (App Router)**, **Sanity CMS**, and **Prisma ORM**, featuring an immersive dark-mode aesthetic with dual-layer SVG mask effects, interactive particle canvas, Framer Motion micro-interactions, and WebGL shaders.

🌐 **Live Website:** [https://www.anoopraju.xyz](https://www.anoopraju.xyz)

---

## ✨ Features

- **Dual-Layer SVG Mask Interaction:** Cursor-following SVG spotlight revealing an inverted high-contrast layer beneath in real time.
- **Dynamic Editorial Blog (Sanity CMS):** Server-side rendered articles with ISR (`revalidate = 3600`), category tags, reading times, and Prism syntax-highlighted code blocks.
- **Embedded Sanity Studio:** Full content management interface embedded directly at `/studio`.
- **Fullstack Contact Pipeline:**
  - Client-side validation using **Zod** schema and **React Hook Form**.
  - Server actions with **Prisma ORM** persisting inquiries to **MongoDB**.
  - Custom branded **Sonner** toast notifications for instant submission feedback.
- **Fluid Motion & Canvas Visuals:**
  - Mouse-reactive Canvas 2D particle simulation.
  - OGL WebGL ferrofluid shader interaction.
  - Smooth inertia scrolling powered by **Lenis**.
  - Animated route transitions, accordions, and magnetic buttons with **Framer Motion**.
- **Refined Dark Aesthetics:** Tailored color palette (`#090e16` midnight dark-blue with `#4cfc0f` electric green accent), generous layout rhythm, and WCAG-compliant contrast.
- **SEO & Social Sharing:** Dynamic OpenGraph preview images, structured JSON-LD metadata, `sitemap.xml`, and `robots.txt`.

---

## 🛠️ Tech Stack

| Layer                 | Technology                                                       |
| --------------------- | ---------------------------------------------------------------- |
| **Framework**         | Next.js 15 (App Router, React 18)                                |
| **Language**          | TypeScript (Strict mode)                                         |
| **Styling**           | TailwindCSS 3 + Scoped CSS Modules (`.module.css`)               |
| **CMS**               | Sanity v3 (Studio embedded at `/studio`, GROQ queries, Live API) |
| **Database & ORM**    | MongoDB via Prisma ORM                                           |
| **Animations**        | Framer Motion 10, Canvas 2D, custom CSS keyframes                |
| **WebGL & 3D**        | OGL (FerroFluid shader), Three.js types                          |
| **State Management**  | Redux Toolkit (RTK) for UI mask & interactive state              |
| **Smooth Scroll**     | Lenis (`@studio-freight/lenis`)                                  |
| **Form & Validation** | React Hook Form, Zod                                             |
| **Notifications**     | Sonner                                                           |
| **Icons & Fonts**     | React Icons, Bebas Neue, Gantari, PT Sans                        |

---

## 📁 Directory Structure

```
├── prisma/                      # Prisma schema (MongoDB models)
│   └── schema.prisma
├── public/                      # Static assets, favicon, OG images
├── src/
│   ├── app/
│   │   ├── (portfolio)/         # Public route group
│   │   │   ├── (home)/          # Index route (Hero, About, Projects, Skills, Experience, Blogs)
│   │   │   ├── projects/        # Projects showcase page
│   │   │   ├── blogs/           # Blog posts listing
│   │   │   │   └── [slug]/      # Dynamic individual blog post (ISR)
│   │   │   ├── contact/         # Contact page with MongoDB-backed form
│   │   │   ├── layout.tsx       # Header, Footer, Lenis wrapper, Sonner Toaster
│   │   │   └── template.tsx     # Page transition loader wrapper
│   │   ├── studio/              # Embedded Sanity Studio route
│   │   ├── layout.tsx           # Root HTML layout, Google fonts, metadata
│   │   ├── not-found.tsx        # Custom 404 page with particles & mask
│   │   ├── sitemap.ts           # Dynamic sitemap generator
│   │   └── robots.ts            # Dynamic robots.txt
│   ├── components/
│   │   ├── header/              # Theme-aware sticky header & animated full-screen nav
│   │   ├── footer/              # Light-green themed footer with magnetic socials
│   │   ├── mask/                # SVG mask tracking component
│   │   ├── pages/               # Page-specific views (dual-layer Mask & Regular variants)
│   │   ├── blogCard/            # Reusable responsive blog card
│   │   ├── Particles.tsx        # Canvas 2D particle system
│   │   ├── FerroFuild.tsx       # OGL WebGL ferrofluid shader
│   │   └── ReduxProvider.tsx    # Client Redux store provider
│   ├── lib/
│   │   ├── prisma.ts            # Cached Prisma client singleton
│   │   └── validations/         # Zod schemas (contact form)
│   ├── redux/                   # Redux store & UI feature slices
│   ├── sanity/                  # Sanity client, queries, image helpers, schema definitions
│   └── utills/                  # Helpers (cn, animations, constants, server actions)
├── tailwind.config.ts           # Custom color tokens, fonts, animation keyframes
└── tsconfig.json                # TypeScript path aliases (@/* -> ./src/*)
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.18+ or 20+
- **npm**, **pnpm**, or **yarn**
- **MongoDB** instance (local or MongoDB Atlas connection URI)
- **Sanity.io** account & project credentials

### 1. Clone the repository

```bash
git clone https://github.com/anoopraju31/anoop-raju-portfolio.git
cd anoop-raju-portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Configure environment variables

Create a `.env.local` file in the root directory (based on `.env.example`):

```env
# Sanity CMS Credentials
NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=production
NEXT_PUBLIC_SANITY_API_KEY=your_sanity_api_read_token

# Backend url
NEXT_PUBLIC_BACKEND_URL=backend_uri

# Seed user
ADMIN_EMAIL=seed_user_email
ADMIN_PASSWORD=seed_user_password
ADMIN_FIRST_NAME=seed_user_first_name
ADMIN_LAST_NAME=seed_user_last_name

# MongoDB Connection String (Prisma)
DATABASE_URL="mongodb+srv://<username>:<password>@cluster.mongodb.net/portfolio?retryWrites=true&w=majority"
```

### 4. Initialize Prisma client

Generate the Prisma Client matching the MongoDB schema:

```bash
npx prisma generate
```

### 5. Run the development server

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.  
To access the embedded Sanity Studio, navigate to [http://localhost:3000/studio](http://localhost:3000/studio).

---

## 📜 Available Scripts

| Command          | Description                                                 |
| ---------------- | ----------------------------------------------------------- |
| `npm run dev`    | Starts the Next.js development server at `localhost:3000`   |
| `npm run build`  | Builds the optimized production application bundle          |
| `npm run start`  | Runs the built production server                            |
| `npm run lint`   | Runs ESLint to check for code quality and convention issues |
| `npm run format` | Runs Prettier with the Tailwind CSS sorting plugin          |

---

## 🎨 Design Philosophy & Architecture

- **Dual-Layer Rendering:** Major routes render two synchronous component trees (`RegularPage` and `MaskPage`). The `Mask` component calculates mouse position via vector interpolation, applying an SVG mask style clip that reveals the inverted visual layer on cursor hover.
- **Zero Jitter & 60fps Budget:** Smooth scrolling via Lenis, composite-only transforms (`transform`, `opacity`) for animations, and offloaded Canvas/WebGL processing.
- **Type-Safe Data Flow:** GROQ queries typed with TypeScript interfaces, form validations enforced with Zod schemas on both client and server, and database access typed via Prisma ORM.

---

## 📬 Contact & Connect

- **Portfolio:** [anoopraju.xyz](https://www.anoopraju.xyz)
- **GitHub:** [@anoopraju31](https://github.com/anoopraju31)
- **LinkedIn:** [Anoop Raju](https://www.linkedin.com/in/anoop-raju/)
- **Email:** [anoopraju31@gmail.com](mailto:anoopraju31@gmail.com)

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
