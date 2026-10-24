# 5. Contact Page Context

## Route & File Location

- **URL**: `/contact`
- **Page file**: `src/app/(portfolio)/contact/page.tsx`
- **Type**: Static client-rendered page (no server data fetching; form uses server action)

---

## Page Structure

The contact page is unique among the portfolio pages in that it does **NOT** use the dual-layer Mask pattern. It only has a RegularPage (no MaskPage).

```
ContactPage (Static FC)
├── SmoothScrollLenis
│   └── <main class="bg-dark-blue text-white" + Gantari font>
│       ├── Particles (fixed full-viewport canvas)
│       ├── Ambient glows (2× radial blurred divs)
│       └── RegularPage
│           └── <section class="contact__page">
│               └── Wrapper
│                   ├── Editorial Header
│                   │   ├── Eyebrow ("// INITIATE CONTACT")
│                   │   ├── H1 ("Let's build something exceptional together.")
│                   │   └── Subtitle paragraph
│                   └── Two-Column Grid
│                       ├── Left: Contact Info & Availability
│                       │   ├── Availability Card (glassmorphic)
│                       │   ├── Contact Items
│                       │   │   ├── Email (copyable)
│                       │   │   ├── Phone (copyable)
│                       │   │   └── Location
│                       │   └── Social Media Links
│                       │       ├── GitHub
│                       │       ├── LinkedIn
│                       │       └── Instagram
│                       └── Right: Contact Form (glassmorphic container)
│                           ├── Ambient glow decoration
│                           ├── Form header ("// SEND A MESSAGE")
│                           └── ContactForm component
```

---

## Contact Information (Hardcoded)

| Field    | Value                                         |
| -------- | --------------------------------------------- |
| Email    | `anoopraju31@gmail.com`                       |
| Phone    | `+91 8921222748`                              |
| Location | Pathanamthitta, Kerala, India                 |
| GitHub   | `https://github.com/anoopraju31`              |
| LinkedIn | `https://www.linkedin.com/in/anoop-raju`      |
| Instagram| `https://www.instagram.com/_a.n.o.o.p_r.a.j.u_/` |

---

## Contact Form

### Component: `src/components/pages/contact/contactForm.tsx`

The form is powered by **`react-hook-form`** with **Zod** schema validation (`@hookform/resolvers/zod`), submitting directly to MongoDB through Prisma ORM via Next.js Server Actions.

**Fields & Schema**:

| Field       | Type     | Required | Validation Rules                              | Stored In MongoDB |
| ----------- | -------- | -------- | --------------------------------------------- | ----------------- |
| `name`      | text     | ✅       | Zod string, min 2, max 100 chars              | `name: String`    |
| `email`     | email    | ✅       | Zod valid email format                        | `email: String`   |
| `phone`     | tel      | ❌       | Optional, valid phone format if provided      | `phone: String?`  |
| `subject`   | text     | ✅       | Zod string, min 3, max 150 chars              | `subject: String` |
| `message`   | textarea | ❌       | Optional string                               | `message: String?`|

### Form Validation & State
- Real-time client-side validation triggers on touch (`mode: 'onTouched'`).
- Inline error messages appear immediately beneath invalid inputs in red (`text-red-400`).
- Fields use `forwardRef` to connect seamlessly with `register()` from `react-hook-form`.
- During submission, inputs and button are disabled with an animated loading spinner (`Saving Message...`).

### Notifications: Custom Sonner Toasts
Rather than plain generic toasts, the form uses custom-styled Sonner toasts (`contactToast.tsx`):
- **Success Toast**: Dark glassmorphic badge with glowing emerald border (`border-light-green/40`), checkmark icon, and confirmation title.
- **Error Toast**: Dark glassmorphic badge with red warning border (`border-red-500/40`), alert icon, and actionable error description.

### Submit Flow & Database Architecture

```
Client Form (useForm + Zod) → submitContactMe() Server Action → Prisma Client → MongoDB (ContactMessage)
```

**Prisma Schema** (`prisma/schema.prisma`):
```prisma
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
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

**Server Action** (`src/utills/actions.ts`):
- Performs server-side Zod validation on incoming payloads using `contactFormSchema.safeParse()`.
- Persists valid submissions into the `ContactMessage` collection via `prisma.contactMessage.create()`.
- Returns a structured response `{ success: boolean, message: string, id?: string, errors?: Record<string, string[]> }`.

---

## Component Architecture

```
src/
├── lib/
│   └── prisma.ts                # PrismaClient singleton instance
├── utills/
│   ├── actions.ts               # Server actions (submitContactMe → Prisma MongoDB)
│   └── contactValidation.ts     # Zod contactFormSchema & TypeScript types
└── components/pages/contact/
    ├── RegularPage.tsx          # Main page layout (editorial header + 2-column grid)
    ├── contactForm.tsx          # Form component (useForm + Zod + Prisma)
    ├── contactToast.tsx         # Custom glassmorphic Sonner toast components
    ├── inputField.tsx           # ForwardRef styled input with error message
    ├── textareaField.tsx        # ForwardRef styled textarea with error message
    ├── contactWrapper/
    │   └── ContactWrapper.tsx   # Contact info item (icon + label + content + optional copy)
    └── styles.module.css        # CSS Module for layout structure
```


### ContactWrapper Component
Renders individual contact information items with:
- Icon (FiMail, FiPhone, FiMapPin)
- Label text
- Content (email, phone, address)
- Optional `copyable` prop for clipboard copy functionality
- Optional `href` for clickable links

### InputField & TextareaField
Styled form field components with:
- Floating label animation
- Focus/blur state transitions
- Bottom border highlighting
- Disabled state styling

---

## Styling Details

- **Font**: Gantari (400, 700)
- **Layout**: Two-column grid on desktop, stacks on mobile
- **Cards**: Glassmorphic panels (`border-white/10 bg-white/[0.03] backdrop-blur-md`)
- **Form container**: Glassmorphic with ambient glow decoration
- **Social links**: Pill-shaped badges with hover animation (`-translate-y-0.5`)
- **Submit button**: Full-width with 4 visual states

### CSS Module Classes (`styles.module.css`)

| Class                      | Purpose                           |
| -------------------------- | --------------------------------- |
| `.contact__page`           | Full page wrapper                 |
| `.wrapper`                 | Max-width centered container      |
| `.hero_header`             | Editorial header section          |
| `.heading`                 | Main H1 heading                   |
| `.subheading`              | Subtitle paragraph                |
| `.container`               | Two-column grid container         |
| `.contact__container`      | Left column (info + socials)      |
| `.form__container`         | Right column (glassmorphic form)  |
| `.contact__inner__container`| Contact items wrapper             |
| `.eyebrow`                 | Monospace label badge             |

---

## Toast Notifications

Uses **Sonner** toast library:
- **Success**: "Message received! I will get back to you shortly."
- **Error (response)**: "Something went wrong. Please try again later or email directly."
- **Error (catch)**: "Failed to submit message. Please try emailing directly."

The `<Toaster />` is rendered in the portfolio layout (`(portfolio)/layout.tsx`).

---

## SEO Metadata

```typescript
export const metadata: Metadata = {
  title: 'Contact | Anoop Raju',
  description: 'Get in touch with Anoop Raju for full-stack web development, bespoke interactive visual engineering, and software collaborations.',
};
```

Title template resolves to: **"Contact | Anoop Raju"**
