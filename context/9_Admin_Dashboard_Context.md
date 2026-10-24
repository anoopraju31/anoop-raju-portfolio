# 9. Admin Dashboard Page Context

## Route & File Location

- **URL**: `/dashboard`
- **Page File**: `src/app/(admin)/(dashboard)/dashboard/page.tsx`
- **Route Access**: **PRIVATE** (Requires authenticated session)
- **Parent Layout**: `src/app/(admin)/(dashboard)/layout.tsx` (wrapped by `<AuthProvider>`)

---

## Page Purpose & Responsibilities

1. **Administrative Home**: Provides an at-a-glance operational summary of the portfolio application.
2. **Key Metric Indicators**:
   - Total Contact Form Inquiries received.
   - Recent messages from the last 24-48 hours.
   - Total published blogs in Sanity CMS.
   - Portfolio telemetry overview.
3. **Quick Navigation Hub**: Fast shortcuts to `/contact-enquire` and external CMS tools (Sanity Studio at `/studio`).
4. **Session Management**: Displays current logged-in user identity (name, role, email) and provides an immediate Logout action.

---

## Layout & Hierarchy

The page is encapsulated within `AdminLayout` (`src/app/(admin)/(dashboard)/layout.tsx`):
- Background: `#F9FBFF` (clean administrative canvas).
- Top navigation / Header bar: Brand badge, active page indicator, user profile chip, and Logout button.
- Sidebar or Tab Bar: Links between `/dashboard` and `/contact-enquire`.

```
DashboardPage (Client Component)
├── Header Area
│   ├── Greeting ("Welcome back, Anoop")
│   ├── Date / Status Indicator ("System operational • Session active")
│   └── Actions Bar (Refresh metrics, View public site)
│
├── Stat Cards Grid (Responsive 3-4 column grid)
│   ├── Total Inquiries Card
│   │   ├── Value (e.g. "24")
│   │   ├── Metric description ("All-time submissions")
│   │   └── Trend indicator (+3 this week)
│   ├── Recent Messages Card
│   │   ├── Value (e.g. "4")
│   │   ├── Metric description ("Pending review")
│   │   └── Direct Link to /contact-enquire
│   ├── Published Blogs Card
│   │   ├── Value (e.g. "6")
│   │   ├── Metric description ("Live articles on Sanity")
│   │   └── Direct Link to /studio
│   └── User Profile Card
│       ├── Role badge ("ADMIN")
│       └── Logged-in email ("anoopraju31@gmail.com")
│
├── Recent Activity Preview
│   ├── Section Title ("Recent Contact Inquiries")
│   ├── Preview List (Last 3-5 submissions)
│   │   ├── Sender Name, Email, Subject snippet, Relative timestamp
│   │   └── "View Details" click handler
│   └── "View All Responses →" navigation link
│
└── Quick Actions Panel
    ├── Open Contact Inquiries (/contact-enquire)
    ├── Open Sanity CMS Studio (/studio)
    └── Open Public Portfolio (/)
```

---

## Auth Protection & Redirection Flow

Protected automatically by `AuthProvider` in `src/app/(admin)/(dashboard)/layout.tsx`:

```
User visits /dashboard
    │
    ├── AuthProvider evaluates Redux userAuth state:
    │       ├── status === 'LOADING': Displays <LoadingScreen /> with animated dots
    │       ├── status === 'SUCCESS' && user !== null: Renders dashboard children
    │       └── status === 'LOGOUT' || status === 'FAILURE':
    │               ├── Redirects to /login?redirect=/dashboard
    │               └── Aborts rendering
```

---

## Data Fetching & State

- **User Data**: Populated from Redux `state.userAuth.user`.
- **Metrics & Inquiries Data**: Fetched on mount via `axios.get('/v1/users/contact-enquire?limit=5', { withCredentials: true })` or dedicated dashboard telemetry summary.
- **Loading State**: Skeleton cards while metrics resolve.
- **Error Handling**: Non-blocking toast notification via Sonner if background telemetry fails.
