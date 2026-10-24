# 2. Design System & Visual Language

## Color Palette

| Token          | Value                    | Usage                                      |
| -------------- | ------------------------ | ------------------------------------------ |
| `dark-blue`    | `#090e16`                | Primary background, text on light surfaces |
| `light-green`  | `rgb(76, 252, 15)`       | Accent, highlights, CTAs, footer bg        |
| White          | `#ffffff` (various alphas) | Text, borders, subtle overlays             |

### Surface Hierarchy
- **Primary surfaces**: `bg-dark-blue` (deep navy-black)
- **Glass panels**: `bg-white/[0.03]` to `bg-white/[0.05]` with `backdrop-blur-md`
- **Footer surface**: `bg-light-green` (inverted theme — dark text on bright green)
- **Ambient glows**: `bg-light-green/[0.03]` with `blur-[140px]` (soft radial atmospheric effects)

---

## Typography

### Font Stack

| Font          | Weight(s)    | Usage                                | Loaded Via           |
| ------------- | ------------ | ------------------------------------ | -------------------- |
| Bebas Neue    | 400          | Root layout, hero headings           | `next/font/google`   |
| Gantari       | 400, 700     | Body text, page headings, nav, footer | `next/font/google`   |
| PT Sans       | 400, 700     | Blog post content                    | `next/font/google`   |
| System Mono   | —            | Labels, eyebrows, code, badges       | `font-mono` (Tailwind) |

### Type Scale (Tailwind Custom)

| Token          | Value                                 | Usage                    |
| -------------- | ------------------------------------- | ------------------------ |
| `hero-text`    | `var(--hero-text-size)` (~19.4vw)     | Hero section main text   |
| `skill`        | `var(--skill-text-size)` (~3.86vw)    | Skills marquee text      |
| `skill-sm`     | `var(--skill-text-size-sm)` (~6.86vw) | Skills text (small)      |
| `body`         | `clamp(1.1rem, 2vw, 1.3rem)`         | Body paragraphs          |
| `heading`      | `clamp(2rem, 5vw, 2.75rem)`          | Section headings         |
| `works-title`  | `clamp(1.25rem, 2vw, 1.5rem)`        | Project card titles      |
| `body-4`       | `clamp(0.75rem, 3vw, 1rem)`          | Small body text          |

All fluid sizes use `clamp()` for responsive scaling without breakpoints.

---

## Visual Effects System

### 1. Particle Background (`Particles.tsx`)
- **Technique**: Canvas 2D animation loop via `requestAnimationFrame`
- **Behavior**: 60 white particles floating with slight drift, mouse-reactive magnetism
- **Placement**: Fixed position, covers full viewport, behind all content
- **Props**: `quantity`, `staticity`, `ease`, `color`, `vx`, `vy`

### 2. SVG Mask Spotlight (`mask/index.tsx`)
- **Technique**: CSS `webkit-mask` with Framer Motion positioning
- **Behavior**: A circular spotlight follows the mouse cursor, revealing an alternate-colored version of the content underneath
- **States**:
  - Default: 20px mask (tiny dot)
  - Text hover: 300px mask (large reveal area)
  - Project card hover: Mask hidden, replaced by a green arrow-cursor circle
- **Used on**: Home, Projects, Blogs pages (each with paired MaskPage + RegularPage)

### 3. FerroFluid Shader (`FerroFuild.tsx`)
- **Technique**: WebGL via OGL library with custom GLSL fragment shader
- **Features**: Procedural noise-based fluid simulation, mouse interaction, configurable colors/speed/turbulence
- **Props**: 18 configurable properties including `colors`, `speed`, `scale`, `turbulence`, `mouseInteraction`

### 4. Page Transitions (`pageTransitionLoader/`)
- **Technique**: Framer Motion `AnimatePresence` via Next.js `template.tsx`
- **Behavior**: Animated overlay on route changes

### 5. Smooth Scrolling (`SmoothScrollLenis/`)
- **Library**: Lenis
- **Behavior**: Hardware-accelerated smooth scroll, wraps all portfolio page content
- **Integration**: Controlled via `appSlice.lenisScrollRoot` Redux state

---

## Component Design Patterns

### Eyebrow Badges
Consistent pattern across pages:
```
[● pulsing dot] [// LABEL TEXT]
```
- Monospace font, uppercase, wide tracking
- Green pulsing dot for "available" status
- Used in: page headers, contact section, footer

### Glassmorphic Panels
```
rounded-2xl border border-white/10 bg-white/[0.03] backdrop-blur-md p-6
```
Used for: availability cards, contact info panels, form containers

### CTA Buttons
Two variants:
1. **Primary (light-green)**: `bg-light-green text-dark-blue` with hover glow `shadow-[0_0_25px_rgba(76,252,15,0.4)]`
2. **Ghost (outlined)**: `border border-white/10 bg-white/10` with hover fill

### Magnetic Containers (`MagneticContainer.tsx`)
Wraps interactive elements with a subtle magnetic pull toward the mouse cursor. Used on: footer CTA, social links, back-to-top button.

---

## Responsive Breakpoints

| Breakpoint | Token | Value   | Usage                                  |
| ---------- | ----- | ------- | -------------------------------------- |
| sm         | `sm`  | 640px   | Standard mobile → tablet               |
| md         | `md`  | 768px   | Tablet → desktop                       |
| mdlg       | `mdlg`| 892px   | Custom breakpoint (between md and lg)  |
| lg         | `lg`  | 1024px  | Desktop                                |

Max content width: `max-w-[1400px]` (header)

---

## Animation Library

### Framer Motion Variants (from `utills/animations.ts`)

| Variant             | Purpose                                       |
| -------------------- | --------------------------------------------- |
| `maskAnimation`      | Positions the SVG mask at mouse coordinates   |
| `maskInitialAnimation` | Off-screen mask position                    |
| `maskTransition`     | Spring-based mask size animation              |
| `menuSlide`          | Full-screen menu slide up/down                |
| `showAnimation`      | Fade in/out                                   |
| `slideToView`        | Delayed fade-in for scroll reveals            |
| `panelVariants`      | Accordion panel expand/collapse               |

### CSS Animations (from `tailwind.config.ts`)

| Animation  | Keyframe  | Duration | Usage                    |
| ---------- | --------- | -------- | ------------------------ |
| `marquee`  | translate3d | 40s linear | Skills section marquee |
| `ping`     | (built-in)| —        | Status dot pulsing       |
| `pulse`    | (built-in)| —        | Availability indicators  |

---

## Header Theming Logic

The header dynamically adapts its color scheme based on two factors:
1. **Footer visibility**: `useFooterScrollOverViewport` hook checks if the footer has scrolled past the header (top ≤ 74px)
2. **Menu state**: Whether the full-screen nav menu is open

```
isDarkBackground = (!isMenuOpen && !isHeaderColorDark) || (isMenuOpen && isHeaderColorDark)
```

This XOR-like logic ensures:
- Over dark content + menu closed → light header (dark bg styling)
- Over footer (light green) + menu closed → dark header (light bg styling)
- Menu inverts the logic so the header contrasts with the menu background

---

## Footer Custom Cursor

The footer implements its own custom cursor system (separate from the mask):
- **Outer ring**: Spring-animated circle following mouse with ~28 damping
- **Center dot**: Tighter spring following (damping: 35, stiffness: 600)
- **Interactive hover**: Both elements scale up when over clickable elements
- **Only visible on md+ screens** (hidden on mobile)

---

## CSS Custom Properties (from `globals.css`)

| Variable                       | Value                              | Purpose                     |
| ------------------------------ | ---------------------------------- | --------------------------- |
| `--hero-image-width`           | `calc(100vw * 0.1875)`             | Hero profile image sizing   |
| `--hero-text-size`             | `calc(100vw * 0.19428571)`         | Hero headline fluid size    |
| `--skill-text-size-sm`         | `calc(100vw * 0.06857142)`         | Skills text (mobile)        |
| `--skill-text-size`            | `calc(100vw * 0.03857142)`         | Skills text (desktop)       |
| `--projects-container-height`  | `calc(450vh + 64px)`               | Home projects scroll height |
| `--curveTransitionSvgHeight`   | `calc(100vh + 600px)`              | Nav menu curve SVG height   |
| `--height-transition`          | `calc(100vh - 80px)`               | Page transition height      |
