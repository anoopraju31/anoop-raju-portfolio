# 6. Blogs Page Context

## Routes & File Locations

| Route           | Page File                                   | Type                    |
| --------------- | ------------------------------------------- | ----------------------- |
| `/blogs`        | `src/app/(portfolio)/blogs/page.tsx`        | Server Component (SSR)  |
| `/blogs/[slug]` | `src/app/(portfolio)/blogs/[slug]/page.tsx` | ISR (revalidate: 3600s) |

---

## Blogs Listing Page (`/blogs`)

### Page Structure

```
BlogsPage (Server Component)
├── SmoothScrollLenis
│   └── <main class="bg-dark-blue text-white" + Gantari font>
│       ├── Particles (fixed full-viewport canvas)
│       ├── Ambient glows (2× radial blurred divs)
│       ├── MaskPage (absolute, mouse-following spotlight)
│       │   └── Mask
│       │       └── Blog cards with inverted colors
│       └── RegularPage (relative, normal content)
│           ├── Hero Header Section
│           │   ├── Eyebrow badge ("Engineering Journal • Insights & Tech")
│           │   ├── H1 ("Articles, Notes & Studies")
│           │   ├── Subtitle paragraph
│           │   └── Stats bar (3 metrics)
│           ├── Blog Grid
│           │   └── N× BlogCard components
│           ├── Empty State (when no blogs)
│           │   └── FiBookOpen icon + "New Articles in Progress"
│           └── Bottom CTA Banner
│               └── MagneticContainer → Link → /contact
```

### Data Fetching

```typescript
const blogsData: Blogs[] = (await (await sanityFetch({ query: AllBlogsQuery2 })).data) ?? [];
```

Fetches ALL published blog posts from Sanity, ordered by date descending.

### Blog Data Shape (`Blogs` type from `types.ts`)

```typescript
interface Blogs {
  _id: string;
  title: string;
  slug: string;
  coverImage: BlogsCoverImage; // { alt, asset: { _ref, _type }, _type }
  date: string;
  tags?: string[];
  readTime: number;
  author: {
    name: string;
    picture: { asset?; hotspot?; crop?; alt?; _type: 'image' };
  };
}
```

### Stats Bar

- Articles Published count (zero-padded, e.g., "02")
- "Next.js • React" → "Frontend Core"
- "WebGL • Kinetic" → "Interactive UI"

### Empty State

When no blogs are returned:

- Book icon (FiBookOpen, 48px)
- "New Articles in Progress" heading
- Description about upcoming articles

---

## BlogCard Component

**Location**: `src/components/blogCard/index.tsx`

Renders individual blog preview cards with:

- Cover image (from Sanity CDN via `urlFor()`)
- Title
- Date (formatted via `formatDate()`)
- Tags list
- Read time
- Author name and picture
- Link to `/blogs/[slug]`

**Styling**: CSS Module (`blogCard/styles.module.css`) with glassmorphic card design.

**Interaction**: On hover, dispatches `mouseEnter()` to `textHoverSlice`, which causes the mask spotlight to expand from 20px → 300px, revealing the inverted-color variant.

---

## Blog Post Page (`/blogs/[slug]`)

### Rendering Strategy

```typescript
export const dynamicParams = true; // Allow new slugs not generated at build time
export const revalidate = 3600; // ISR: regenerate every 1 hour
```

### Data Fetching

```typescript
const post = await sanityFetch<PostQueryResult>({
  query: postQuery,
  params: await params, // { slug: "..." }
});
if (!post.data?._id) return notFound();
```

**GROQ Query** (`postQuery`):

```groq
*[_type == "post" && slug.current == $slug] [0] {
  content,
  conclusion,
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  readTime,
  "coverImage": coverImage.asset->url,
  "seoTitle": seoTitle,
  "seoDescription": seoDescription,
  "keywords": keywords[],
  "tags": tags[]->title,
  "date": coalesce(date, _updatedAt),
  "author": author->{
    "name": coalesce(name, "Anonymous"),
    picture,
    socialLinks[]{ platform, url },
    shortDescription
  },
}
```

Returns the full post with content blocks, conclusion, author details with social links, SEO fields, and cover image URL.

### Page Structure

```
BlogPostPage (Server Component)
└── <main class="bg-dark-blue text-white">
    └── RegularPage
        └── <div class="PT Sans font">
            └── Container
                ├── Breadcrumbs (Home → Blogs → [truncated title])
                ├── Title (<h1>)
                ├── Cover Image (Next.js Image, 2000×1000)
                ├── CustomPortableText (main content)
                └── Conclusion (optional, green bg panel)
```

**Note**: The blog post page does NOT use:

- Particles background
- Mask dual-layer system
- Smooth scroll (Lenis)
- Ambient glows

It's a more traditional, reading-focused layout.

---

## CustomPortableText (`portable-text.tsx`)

**Location**: `src/components/pages/blogPost/portable-text.tsx`

Renders Sanity Portable Text (block content) with custom serializers for:

| Block Type | Rendering                                           |
| ---------- | --------------------------------------------------- |
| `block`    | Standard text with heading, paragraph, list support |
| `code`     | Syntax-highlighted code block (via Prism.js)        |
| `image`    | Next.js `Image` component with alt text and caption |
| `table`    | HTML table rendering from `@sanity/table` data      |

### Supported Text Marks

- Bold, italic, underline, strikethrough
- Links (with `target="_blank"`)
- Code inline spans

### Heading IDs

Headings are auto-assigned IDs for deep linking (slugified from text content).

---

## Sanity Blog Schema

### Post Schema (`src/sanity/schemaTypes/blogs/post.ts`)

| Field            | Type                  | Required | Notes                        |
| ---------------- | --------------------- | -------- | ---------------------------- |
| `title`          | string                | ✅       |                              |
| `slug`           | slug                  | ✅       | Auto-generated from title    |
| `content`        | array (portable text) | ✅       | Blocks, code, images, tables |
| `conclusion`     | array (portable text) | ❌       | Optional conclusion section  |
| `readTime`       | number                | ❌       | Estimated minutes (1–1440)   |
| `coverImage`     | image                 | ✅       | With alt text, hotspot       |
| `date`           | datetime              | ❌       | Auto-fills to current date   |
| `author`         | reference → author    | ❌       |                              |
| `keywords`       | array of strings      | ❌       | SEO keywords                 |
| `seoTitle`       | string                | ❌       | Max 60 chars (warning)       |
| `seoDescription` | text                  | ❌       | Max 160 chars (warning)      |
| `tags`           | array of refs → tag   | ❌       | Tag taxonomy                 |

### Code Block Languages Supported

JavaScript, TypeScript, HTML, CSS, Python

### Author Schema (`src/sanity/schemaTypes/blogs/author.ts`)

| Field              | Type                       | Required |
| ------------------ | -------------------------- | -------- |
| `name`             | string                     | ✅       |
| `shortDescription` | string                     | ✅       |
| `picture`          | image (with alt)           | ✅       |
| `socialLinks`      | array of { platform, url } | ❌       |

Supported social platforms: Twitter, LinkedIn, Instagram, YouTube, Facebook

### Tag Schema (`src/sanity/schemaTypes/blogs/tags.ts`)

Simple document with a `title` field for categorization.

---

## GROQ Queries Summary

| Query Name         | Purpose                                  | Usage                   |
| ------------------ | ---------------------------------------- | ----------------------- |
| `AllBlogsQuery`    | Latest 10 posts (basic fields)           | Unused currently        |
| `AllBlogsQuery2`   | All posts ordered by date (basic fields) | Home page + blogs page  |
| `postQuery`        | Single post by slug (full content)       | Blog post page          |
| `moreStoriesQuery` | Related posts excluding current (basic)  | Unused currently        |
| `postSlugs`        | All post slugs                           | Unused (for static gen) |

---

## SEO Metadata (Blogs Listing)

```typescript
export const metadata: Metadata = {
  title: 'Blogs | Anoop Raju',
  description:
    'Technical deep-dives, architectural notes, and perspectives on modern frontend engineering, React, Next.js, and interactive WebGL by Anoop Raju.',
};
```

Title template resolves to: **"Blogs | Anoop Raju"**

---

## Known Blog Posts (from sitemap.ts)

1. `/blogs/a-comprehensive-guide-to-react-hooks` (priority: 0.6)
2. `/blogs/solid-principle-in-react-js-and-next-js` (priority: 0.6)

---

## Component File Tree

```
src/components/pages/
├── blogs/
│   ├── MaskPage.tsx           # Mask variant of blog listing
│   ├── RegularPage.tsx        # Main blog listing (hero + grid + CTA)
│   └── styles.module.css      # Shared CSS Module for both pages
├── blogPost/
│   ├── MaskPage.tsx           # Blog post mask variant (NOT used on post page)
│   ├── RegularPage.tsx        # Blog post content renderer
│   ├── portable-text.tsx      # Custom Sanity PortableText serializer
│   └── styles.module.css      # Blog post scoped styles
└── (shared)
    └── blogCard/
        ├── index.tsx           # Reusable blog card
        └── styles.module.css   # Blog card styles
```
