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

**Fields**:

| Field     | Type     | Required | Validation      |
| --------- | -------- | -------- | --------------- |
| `name`    | text     | ✅       | Client-side     |
| `email`   | email    | ✅       | Client-side     |
| `subject` | text     | ✅       | Client-side     |
| `message` | textarea | ✅       | Client-side     |

**Form State Machine**:

```
DISABLED → (all fields filled) → ENABLED → (submit) → SUBMITTING → SUCCESS → (4s timeout) → DISABLED
                                                       ↘ ERROR → ENABLED
```

| Status      | Button State                                    | Visual                          |
| ----------- | ----------------------------------------------- | ------------------------------- |
| `DISABLED`  | Disabled, ghost style                           | Outlined, muted text            |
| `ENABLED`   | Clickable, primary green                        | Green bg, hover scale + glow    |
| `SUBMITTING`| Disabled, loading                               | Green/70 bg, spinner + text     |
| `SUCCESS`   | Disabled, success state                         | Green bg, checkmark icon        |
| `ERROR`     | → Returns to `ENABLED`                          | Toast error notification        |

### Submit Flow

```
Client form data → submitContactMe() server action → Sanity client.create() → Sanity CMS
```

**Server Action** (`src/utills/actions.ts`):
```typescript
export const submitContactMe = async (data: ContactFormData) => {
  const updatedData = {
    _type: 'contactMe',
    ...data,
    submittedAt: new Date().toISOString(),
  };
  const response = await client.create(updatedData);
  return response;
};
```

This creates a `contactMe` document in Sanity with the form data + timestamp.

### Sanity Schema: `contactMe`

| Field         | Type     | Validation                     |
| ------------- | -------- | ------------------------------ |
| `name`        | string   | Required, 2-50 chars           |
| `email`       | string   | Required, valid email          |
| `subject`     | string   | Required, 2-100 chars          |
| `message`     | string   | Required, 10-500 chars         |
| `submittedAt` | datetime | Auto-filled, read-only         |

---

## Component Architecture

```
src/components/pages/contact/
├── RegularPage.tsx          # Main page layout (editorial header + 2-column grid)
├── contactForm.tsx          # Form component with state machine
├── inputField.tsx           # Reusable styled text input
├── textareaField.tsx        # Reusable styled textarea
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
