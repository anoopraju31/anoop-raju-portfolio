# 8. Admin Login Page Context

## Route & File Location

- **URL**: `/login`
- **Page File**: `src/app/(admin)/login/page.tsx`
- **Route Access**: **PUBLIC** (accessible without authentication)
- **Automatic Redirect**: If a user is already authenticated (`status === 'SUCCESS'` & `user !== null`), the page automatically redirects to `/dashboard` (or the `?redirect=` target parameter).

---

## Page Purpose & Responsibilities

1. **Authentication Entry Point**: Provides a secure, clean credentials interface for the portfolio administrator.
2. **Input Validation**: Uses **Zod** schema validation and **React Hook Form** to validate email and password before dispatching the request.
3. **Session Initiation**: Calls `POST /v1/users/auth/login` to establish the `HttpOnly` cookie session.
4. **State Transition**: Dispatches `fetchUserAuth` or updates Redux `userAuth` slice upon successful login.
5. **Dynamic Redirection**: Preserves the user's intended target route via `?redirect=/path` and navigates upon authenticated confirmation.

---

## Page Layout & Component Tree

```
LoginPage (Client Component)
├── Container (Centered card layout with clean modern aesthetic)
│   ├── Brand Header
│   │   ├── Portfolio Badge ("// ADMIN AUTHENTICATION")
│   │   ├── Title ("Sign in to your control center")
│   │   └── Subtitle ("Enter your administrative credentials to manage contact inquiries and portfolio telemetry.")
│   ├── LoginForm
│   │   ├── Form Error Alert (displays if invalid credentials or server errors occur)
│   │   ├── Email Field
│   │   │   ├── Label ("Email Address")
│   │   │   ├── Input (type="email", autocomplete="username", placeholder="admin@example.com")
│   │   │   └── Field Error message
│   │   ├── Password Field
│   │   │   ├── Label ("Password")
│   │   │   ├── Input (type="password", autocomplete="current-password", toggle visibility)
│   │   │   └── Field Error message
│   │   ├── Submit Button
│   │   │   ├── Normal State ("Sign In")
│   │   │   ├── Loading State (Spinner / "Authenticating...")
│   │   │   └── Action: Triggers onSubmit handler
│   └── Footer Links
│       └── Return to Portfolio Link ("← Return to public website")
```

---

## Form Validation Schema (Zod)

```typescript
import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email address is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

export type LoginFormData = z.infer<typeof loginSchema>;
```

---

## Auth Lifecycle & Redirect Behavior

```
User visits /login
    │
    ├── 1. Redux check: Is user already authenticated?
    │       ├── YES: Redirect to `/dashboard` or searchParams.get('redirect')
    │       └── NO: Render login form
    │
    ├── 2. User submits form:
    │       ├── Validates with loginSchema (Zod)
    │       ├── Sets button state to loading
    │       └── Calls POST /v1/users/auth/login
    │
    ├── 3. API Response:
    │       ├── SUCCESS (200):
    │       │   ├── Cookie set automatically by browser (HttpOnly)
    │       │   ├── Sonner toast: "Welcome back, Anoop!"
    │       │   ├── Dispatch fetchUserAuth() to update Redux store
    │       │   └── router.push(targetPath)
    │       └── FAILURE (401 / 400):
    │           ├── Sonner toast: "Invalid email or password"
    │           ├── Display inline error banner
    │           └── Reset loading state
```

---

## Visual Design & Theming

- **Background**: Soft modern slate `#F9FBFF` or matching dark `#090e16` with glassmorphic auth card.
- **Card Styling**: Rounded corners (`rounded-2xl` / `rounded-3xl`), border `border-slate-200` or `border-white/10`, subtle elevation shadow.
- **Brand Accent**: Electric green (`#4cfc0f`) button highlights or high-contrast dark-blue CTAs.
- **Typography**: Gantari font for crisp, readable UI forms with monospace accent labels.
