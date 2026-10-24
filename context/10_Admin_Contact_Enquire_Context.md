# 10. Admin Contact Enquire Page Context

## Route & File Location

- **URL**: `/contact-enquire`
- **Page File**: `src/app/(admin)/(dashboard)/contact-enquire/page.tsx`
- **Route Access**: **PRIVATE** (Requires authenticated session)
- **Parent Layout**: `src/app/(admin)/(dashboard)/layout.tsx` (wrapped by `<AuthProvider>`)

---

## Page Purpose & Responsibilities

1. **Submission Review**: Primary administrative interface to view, inspect, search, and manage all contact inquiries submitted by visitors on the public `/contact` page.
2. **Data Source**: Fetches directly from MongoDB via `GET /v1/users/contact-enquire` (using Prisma model `ContactMessage`).
3. **Comprehensive Inspection**: Allows the administrator to expand any submission to read the full message body, sender phone number, subject, and accurate timestamp.
4. **Search & Filter**: Allows filtering inquiries by keyword, sender email, or date range.

---

## Page Layout & Component Tree

```
ContactEnquirePage (Client Component)
├── Page Header
│   ├── Title ("Contact Enquiries")
│   ├── Subtitle ("Review, search, and manage all inquiries submitted through your portfolio.")
│   └── Top Bar Controls
│       ├── Search Input (Filter by name, email, subject, or message text)
│       ├── Refresh Button (Re-fetch submissions from API)
│       └── Total Count Chip ("Total: 18 inquiries")
│
├── Enquiries Data Table
│   ├── Table Header
│   │   ├── Sender (Name & Email)
│   │   ├── Subject
│   │   ├── Message Preview
│   │   ├── Date Received
│   │   └── Actions (View Details, Email Reply)
│   ├── Table Rows (Paginated or virtualized)
│   │   ├── Sender Column
│   │   │   ├── Name (font-medium)
│   │   │   ├── Email (text-slate-500, click to mailto:)
│   │   │   └── Phone (optional pill tag if provided)
│   │   ├── Subject Column (bold or distinct color)
│   │   ├── Message Column (truncated preview with tooltip)
│   │   ├── Date Column (formatted with date-fns e.g., "Oct 24, 2026 • 10:15 AM")
│   │   └── Action Column
│   │       ├── "View" Button (opens detail modal or expandable drawer)
│   │       └── "Reply" Link (mailto: with prefilled subject)
│   │
│   ├── Empty State (when 0 inquiries exist or search returns 0 results)
│   │   ├── Icon (Inbox / Mail)
│   │   ├── Message ("No contact inquiries found")
│   │   └── Subtext ("Inquiries submitted through the contact form will appear here.")
│   │
│   └── Pagination Controls
│       ├── Page Indicator ("Page 1 of 3")
│       ├── Previous Page Button
│       └── Next Page Button
│
└── Message Detail Modal / Drawer (Opens on row click)
    ├── Modal Header (Sender Name, Date & Time)
    ├── Contact Coordinates
    │   ├── Email address (copyable)
    │   └── Phone number (copyable, or "Not provided")
    ├── Full Subject
    ├── Full Message Body (preserved whitespace / pre-wrap)
    └── Modal Footer (Close button, Direct "Reply via Email" CTA)
```

---

## Data Schema & Types

```typescript
export interface ContactMessageItem {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message?: string | null;
  createdAt: string;
  updatedAt: string;
}
```

---

## Data Fetching Flow

```
ContactEnquirePage Mounts
    │
    ├── 1. Auth check verified by parent <AuthProvider>
    │
    ├── 2. Dispatch axios.get('/v1/users/contact-enquire', { withCredentials: true })
    │       ├── Pending: Renders table skeleton rows
    │       ├── Success (200):
    │       │   ├── Sets enquiries state
    │       │   └── Updates total count chip
    │       └── Error (401 / 500):
    │           ├── Sonner toast error: "Failed to load contact inquiries"
    │           └── Renders retry button
    │
    ├── 3. Administrator interactions:
    │       ├── Type in Search Box → Filters table rows in real-time
    │       ├── Click row → Opens detailed message inspection modal
    │       └── Click "Reply" → Launches email client with mailto: protocol
```

---

## Visual Design & Aesthetics

- **Theme**: Consistent with Admin dashboard palette (`#F9FBFF` base background, white elevated cards, subtle slate borders `border-slate-200`).
- **Data Table**: Clean tabular layout with hover effects (`hover:bg-slate-50/80`), rounded card wrapper (`rounded-2xl border border-slate-200 bg-white shadow-sm`), and clear typography.
- **Accents**: Electric green / navy blue indicators for status and interactive controls.
