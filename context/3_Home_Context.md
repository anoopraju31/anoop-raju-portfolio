# 3. Home Page Context

## Route & File Location

- **URL**: `/`
- **Page file**: `src/app/(portfolio)/(home)/page.tsx`
- **Type**: Server Component (async) — fetches blog data from Sanity at render time

---

## Page Structure

The home page is the main landing experience. It fetches the latest 3 blog posts from Sanity and renders a dual-layer (Mask + Regular) composition with 6 content sections.

```
Home (Server Component)
├── SmoothScrollLenis
│   └── <main class="bg-dark-blue text-white">
│       ├── Particles (fixed full-viewport canvas)
│       ├── MaskPage (absolute, mouse-following spotlight)
│       │   └── Mask
│       │       ├── HeroMask
│       │       ├── ProjectsMask
│       │       ├── AboutMask
│       │       ├── SkillsMask
│       │       ├── ExperienceMask
│       │       └── BlogMask (receives blogs prop)
│       └── RegularPage (relative, normal content)
│           ├── Hero
│           ├── Projects (ProjectsMain)
│           ├── About
│           ├── Skills (SkillsMain)
│           ├── Experience
│           └── Blog (receives blogs prop)
```

---

## Data Fetching

```typescript
const blogsData: Blogs[] = await (await sanityFetch({ query: AllBlogsQuery2 })).data.slice(0, 3);
```

- Uses `sanityFetch` from the live content API
- Fetches ALL blog posts ordered by date, then slices to 3
- GROQ query (`AllBlogsQuery2`) returns: `_id`, `title`, `slug`, `coverImage`, `readTime`, `date`, `tags`, `author`

---

## Sections Breakdown

### 1. Hero Section (`sections/hero/`)
- **Files**: `Hero.tsx` (regular), `HeroMask.tsx` (mask variant)
- **Content**: Full-viewport hero with the developer's name in massive fluid typography (`text-hero-text` → ~19.4vw)
- **Features**: Profile image, character-by-character text animation, scroll prompt
- **Font**: Bebas Neue (inherited from root layout)

### 2. Projects Section (`sections/projects/`)
- **Files**: `ProjectsMain.tsx` (regular), `ProjectsMask.tsx` (mask variant)
- **Content**: Horizontal scroll showcase of portfolio projects
- **Data source**: `src/utills/constants.ts` → `projects` array (5 items)
- **Features**: 
  - Scroll-driven horizontal translation (sticky container with `--projects-container-height: calc(450vh + 64px)`)
  - Project cards with hover effects that trigger `projectCardSlice` Redux state
  - Mouse cursor transforms to green arrow on hover

### 3. About Section (`sections/about/`)
- **Files**: `About.tsx` (regular), `AboutMask.tsx` (mask variant)
- **Content**: Personal introduction, developer philosophy, brief bio
- **Features**: Text reveal animations on scroll, parallax effects

### 4. Skills Section (`sections/skills/`)
- **Files**: `SkillsMain.tsx` (regular), `SkillsMask.tsx` (mask variant)
- **Content**: Infinite marquee of skill names + icon grid
- **Data sources**: 
  - `src/utills/constants.ts` → `skills` array (9 items: HTML, CSS, JavaScript, TypeScript, ReactJS, NextJS, TailwindCSS, Figma, Framer Motion)
  - `src/utills/SkillLogos.ts` → two icon arrays (`firstContainer`: 11 icons, `secondContainer`: 9 icons)
- **Features**: 
  - CSS `animation: marquee 40s linear infinite` for scrolling text
  - `text-skill` / `text-skill-sm` fluid font sizes

### 5. Experience Section (`sections/experience/`)
- **Files**: `Experience.tsx` (regular), `ExperienceMask.tsx` (mask variant)
- **Content**: Professional work history in accordion format
- **Data source**: `src/utills/constants.ts` → `accordionData` array (2 entries)
- **Current entries**:
  1. **Infigon Futures** — Frontend Developer (Aug 2024 – Present)
  2. **Tridashay Private Limited** — Frontend Developer Intern (Feb 2022 – Jun 2022)
- **State**: `accordionSlice` manages open/close state per accordion item
- **Features**: Animated expand/collapse via Framer Motion `panelVariants`

### 6. Blog Section (`sections/blogs/`)
- **Files**: `Blog.tsx` (regular), `BlogMask.tsx` (mask variant)
- **Content**: Latest 3 blog post cards
- **Data source**: Sanity CMS (passed as `blogs` prop from the page component)
- **Features**: Blog cards with hover effect triggering `textHoverSlice` (mask expands to 300px)

---

## Key Interactions

| Interaction              | Visual Effect                                     | State Managed By            |
| ------------------------ | ------------------------------------------------- | --------------------------- |
| Mouse movement           | Particle magnetism + mask spotlight follows cursor | `useMousePosition` hook     |
| Text hover (blog cards)  | Mask spotlight grows from 20px → 300px             | `textHoverSlice` Redux      |
| Project card hover       | Mask hides, green arrow cursor appears             | `projectCardSlice` Redux    |
| Accordion click          | Experience panel expand/collapse                   | `accordionSlice` Redux      |
| Scroll                   | Header hide/show, horizontal projects scroll       | `useScroll` (Framer Motion) |

---

## Component File Tree

```
src/components/pages/home/
├── MaskPage.tsx           # Wraps all mask section variants inside <Mask>
├── RegularPage.tsx        # Wraps all regular section variants
└── sections/
    ├── hero/
    │   ├── Hero.tsx
    │   └── HeroMask.tsx
    ├── projects/
    │   ├── ProjectsMain.tsx
    │   └── ProjectsMask.tsx
    ├── about/
    │   ├── About.tsx
    │   └── AboutMask.tsx
    ├── skills/
    │   ├── SkillsMain.tsx
    │   └── SkillsMask.tsx
    ├── experience/
    │   ├── Experience.tsx
    │   └── ExperienceMask.tsx
    └── blogs/
        ├── Blog.tsx
        └── BlogMask.tsx
```

---

## SEO

- **Title**: `Anoop Raju | Frontend Developer & Web Creator` (from root layout `metadata.title.default`)
- **Description**: Extensive portfolio description mentioning React, TypeScript, Next.js, Tailwind CSS
- **OpenGraph**: Full OG tags with image (`og-image.png`, 1200×630)
- **Keywords**: 11 targeted keywords including "Developer Portfolio 2025"
