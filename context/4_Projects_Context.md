# 4. Projects Page Context

## Route & File Location

- **URL**: `/projects`
- **Page file**: `src/app/(portfolio)/projects/page.tsx`
- **Type**: Static client-rendered page (no server data fetching)

---

## Page Structure

```
ProjectsPage (Static FC)
├── SmoothScrollLenis
│   └── <main class="bg-dark-blue text-white" + Gantari font>
│       ├── Particles (fixed full-viewport canvas)
│       ├── Ambient glows (2× radial blurred divs)
│       ├── MaskPage (absolute, mouse-following spotlight)
│       │   └── Mask
│       │       └── Projects mask variant (inverted colors)
│       └── RegularPage (relative, normal content)
│           ├── Hero Header Section
│           │   ├── Eyebrow badge ("Selected Works • 2023 — Present")
│           │   ├── Main heading ("Featured Work & Systems")
│           │   ├── Subtitle paragraph
│           │   └── Stats bar (4 metrics)
│           ├── Asymmetric Project Grid
│           │   └── 5× ProjectCard components
│           └── Bottom CTA Banner
│               └── Link → /contact
```

---

## Data Source

Projects data is **hardcoded** in `src/constants/projectsData.ts` — NOT fetched from Sanity CMS (even though a Sanity `projects` schema exists).

### Project Data Schema (`ProjectItem`)

```typescript
interface ProjectItem {
  id: number;
  number: string;        // "01", "02", etc.
  name: string;
  subtitle: string;      // Short descriptor
  description: string;   // Full description paragraph
  year: string;
  category: string;      // "Creative Web", "AI / Tooling", etc.
  img: string;           // Path to public/ image
  alt: string;
  link: string;          // Live deployment URL
  github: string;        // GitHub repository URL
  tools: string[];       // Tech stack tags
  featured?: boolean;    // Featured project flag
  siteDomain?: string;   // Display domain
}
```

### Current Projects (5 total)

| # | Name              | Category        | Tech Stack                                      | Featured |
| - | ----------------- | --------------- | ------------------------------------------------ | -------- |
| 1 | Eat Curious       | Creative Web    | Next.js, React, TailwindCSS, TypeScript, Framer Motion | ✅       |
| 2 | Summarizer        | AI / Tooling    | React, OpenAI API, TailwindCSS, JavaScript, RTK Query | ❌       |
| 3 | Netflix GPT       | AI / Full Stack | React, Firebase Auth, OpenAI GPT, TailwindCSS, TMDB API | ❌       |
| 4 | Nike Landing Page | Creative Web    | React, TailwindCSS, JavaScript, Responsive UI    | ❌       |
| 5 | Dropbox Clone     | Full Stack      | Next.js, Firebase Storage, TailwindCSS, TypeScript, Shadcn UI | ❌       |

---

## Component Architecture

```
src/components/pages/projects/
├── MaskPage.tsx              # Mask layer with inverted color project display
├── RegularPage.tsx           # Main project listing
├── projectCard/              # Individual project card component
│   └── (ProjectCard component with image, metadata, links)
└── projects.module.css       # Complex CSS Module styles for grid layout
```

### RegularPage Layout

1. **Hero Header Section**
   - Eyebrow badge with pulsing dot
   - Main heading with highlighted accent span
   - Descriptive subtitle
   - Stats bar with 4 metrics: "05 Curated Builds", "100% TypeScript", "React • Next.js Core Stack", "OpenAI • WebGL Integrations"

2. **Asymmetric Project Grid**
   - Uses CSS Modules for a bespoke grid layout (`projects.module.css`)
   - 5 different container classes for asymmetric sizing:
     - `project1__container` through `project5__container`
   - Each contains a `ProjectCard` component

3. **Bottom CTA Banner**
   - "Have a vision in mind?" eyebrow
   - "Let's build something extraordinary together" heading
   - Availability message
   - CTA button linking to `/contact`

### ProjectCard Component
Each project card displays:
- Project number badge (01–05)
- Project name and subtitle
- Full description
- Year and category
- Screenshot image (from `/public/`)
- Tech stack tags
- Links to live site and GitHub
- Featured badge (if applicable)
- Site domain display

---

## Styling

- **Font**: Gantari (400, 700) — applied at page level
- **Grid**: CSS Module-based asymmetric grid (not Tailwind grid)
- **Cards**: Glassmorphic style with hover effects
- **CTA**: Ghost button style transitioning to filled on hover

### Key CSS Module Classes

| Class                      | Purpose                                  |
| -------------------------- | ---------------------------------------- |
| `.regularPage`             | Main container with z-index layering     |
| `.container`               | Max-width content wrapper                |
| `.heroSection`             | Hero header area                         |
| `.project__container`      | Asymmetric grid wrapper                  |
| `.project1__container` etc.| Individual grid cell sizing/positioning  |
| `.bottomCtaSection`        | CTA banner at bottom                     |
| `.statItem`                | Stats bar individual metric              |
| `.eyebrowBadge`            | Monospace label with pulsing dot         |

---

## Dual-Layer Mask System

The MaskPage for projects contains the same grid and cards but with an inverted color scheme:
- Regular: White text on dark blue background
- Mask: Revealed through mouse-following webkit-mask spotlight
- When hovering a project card: mask spotlight is replaced by a green arrow cursor (managed by `projectCardSlice`)

---

## SEO Metadata

```typescript
export const metadata: Metadata = {
  title: 'Projects | Anoop Raju',
  description: 'Explore curated software engineering projects, production web applications, and interactive digital experiments by Anoop Raju.',
};
```

Title template resolves to: **"Projects | Anoop Raju"**

---

## Note on Data Architecture

There's a discrepancy in the codebase:
- A Sanity `projects` schema exists (`src/sanity/schemaTypes/projects/index.ts`) with fields for `projectName`, `projectDescription`, `publishedAt`, `projectImage`, `deploymentUrl`, `projectGithubUrl`, `techStack`, `isFeatured`
- But the Projects page uses **hardcoded data** from `src/constants/projectsData.ts`
- The Home page projects section uses a DIFFERENT hardcoded set from `src/utills/constants.ts` (with a simpler schema)

This suggests the Sanity projects schema was set up for future migration but hasn't been integrated yet.
