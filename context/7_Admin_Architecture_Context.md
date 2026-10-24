# 7. Admin Panel & API Architecture Context

## Overview

The Admin Panel serves as the private management backoffice for the portfolio. It allows the site owner (Anoop Raju) to authenticate securely, view dashboard operational metrics, and review incoming contact form submissions stored in MongoDB.

---

## Authentication & Security Model

### 1. Cookie-Based Session Mechanism
- **Transport**: Standard HTTP Cookie (`token` or `session`).
- **Flags**:
  - `HttpOnly`: Prevents client-side scripts from reading or manipulating the cookie, mitigating cross-site scripting (XSS).
  - `Secure`: Transmitted only over HTTPS (enforced in production environments).
  - `SameSite=Lax`: Defends against Cross-Site Request Forgery (CSRF) while allowing normal top-level navigation.
  - `Path=/`: Valid across all app routes.
- **Payload**: Signed JWT (JSON Web Token) or cryptographic session ID containing:
  ```json
  {
    "userId": "664fa1...",
    "email": "anoopraju31@gmail.com",
    "role": "ADMIN",
    "exp": 1792896000
  }
  ```

### 2. User Accounts & Role-Based Access Control (RBAC)
- No public user registration endpoint. Accounts are provisioned directly by the administrator or via seed scripts.
- **Roles**:
  - `ADMIN`: Full read/write access to dashboard metrics, contact message responses, and administrative actions.
  - `MEMBER`: Restricted view access (future extensible).

### 3. Password Security
- Passwords are never stored in plaintext. They are salted and hashed using `bcrypt` (minimum 10-12 salt rounds).
- Login compares the plaintext password attempt against the stored hash via `bcrypt.compare()`.

---

## Prisma Schema Definition

Located in `prisma/schema.prisma`:

```prisma
datasource db {
  provider = "mongodb"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

enum Role {
  ADMIN
  MEMBER
}

model User {
  id         String   @id @default(auto()) @map("_id") @db.ObjectId
  firstName  String
  middleName String?
  lastName   String
  email      String   @unique
  phone      String?
  role       Role     @default(ADMIN)
  password   String
  createdAt  DateTime @default(now())
  updatedAt  DateTime @updatedAt
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

---

## REST API Specification

All routes run under `/api/v1/users` (configured via `NEXT_PUBLIC_BACKEND_URL` / Next.js route handlers):

### 1. `GET /v1/users/auth`
- **Purpose**: Verify existing session cookie and return logged-in user profile.
- **Headers**: `Cookie: token=...`
- **Response `200 OK`**:
  ```json
  {
    "id": "664fa1...",
    "firstName": "Anoop",
    "middleName": null,
    "lastName": "Raju",
    "email": "anoopraju31@gmail.com",
    "phone": "+91 8921222748",
    "role": "ADMIN",
    "createdAt": "2026-10-24T00:00:00.000Z"
  }
  ```
- **Response `401 Unauthorized`**:
  ```json
  {
    "message": "Unauthenticated. Invalid or expired session."
  }
  ```

### 2. `POST /v1/users/auth/login`
- **Purpose**: Authenticate user credentials and set `HttpOnly` cookie.
- **Request Body**:
  ```json
  {
    "email": "anoopraju31@gmail.com",
    "password": "SecurePassword123"
  }
  ```
- **Response `200 OK`**:
  - `Set-Cookie`: `token=<jwt_token>; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=604800`
  - Body:
    ```json
    {
      "message": "Login successful",
      "user": {
        "id": "664fa1...",
        "firstName": "Anoop",
        "lastName": "Raju",
        "email": "anoopraju31@gmail.com",
        "role": "ADMIN"
      }
    }
    ```
- **Response `400 / 401 Error`**:
  ```json
  {
    "message": "Invalid email or password."
  }
  ```

### 3. `POST /v1/users/auth/logout`
- **Purpose**: Clear the authentication cookie and terminate the session.
- **Response `200 OK`**:
  - `Set-Cookie`: `token=; HttpOnly; Secure; SameSite=Lax; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT`
  - Body:
    ```json
    {
      "message": "Logout successful",
      "success": true
    }
    ```

### 4. `GET /v1/users/contact-response`
- **Purpose**: Retrieve all contact form submissions from MongoDB (Chronological order, newest first).
- **Security**: Requires active `ADMIN` cookie session.
- **Query Parameters (optional)**:
  - `limit`: number (default: 50)
  - `page`: number (default: 1)
  - `search`: string (filters across name, email, subject, message)
- **Response `200 OK`**:
  ```json
  {
    "total": 12,
    "page": 1,
    "limit": 50,
    "data": [
      {
        "id": "664fa9...",
        "name": "Sarah Connor",
        "email": "sarah@cyberdyne.com",
        "phone": "+1 415 555 0199",
        "subject": "Frontend Architecture Contract",
        "message": "Interested in building a high-performance Next.js application.",
        "createdAt": "2026-10-24T10:15:30.000Z",
        "updatedAt": "2026-10-24T10:15:30.000Z"
      }
    ]
  }
  ```

### 5. `POST /v1/users/contact`
- **Purpose**: Public submission endpoint to record incoming inquiries.
- **Request Body**:
  ```json
  {
    "name": "Sarah Connor",
    "email": "sarah@cyberdyne.com",
    "phone": "+1 415 555 0199",
    "subject": "Frontend Architecture Contract",
    "message": "Interested in building a high-performance Next.js application."
  }
  ```
- **Validation**:
  - `name`: String, 2-100 characters
  - `email`: Valid RFC 5322 email string
  - `phone`: Optional string
  - `subject`: String, 3-150 characters
  - `message`: Optional string, up to 2000 characters
- **Response `201 Created`**:
  ```json
  {
    "message": "Contact message recorded successfully.",
    "id": "664fa9..."
  }
  ```

---

## Client Redux Integration (`userAuth` Slice)

Located in `src/redux/features/userAuth.ts`:
- **State Properties**:
  - `user`: `UserAuth | null`
  - `status`: `'IDLE' | 'LOADING' | 'SUCCESS' | 'FAILURE' | 'LOGOUT'`
- **Async Thunks**:
  - `fetchUserAuth`: Dispatches `GET ${BACKEND_URL}/v1/users/auth` with `{ withCredentials: true }`.
  - `fetchUserLogout`: Dispatches `GET / POST ${BACKEND_URL}/v1/users/auth/logout`.
- **Sync Actions**:
  - `setLogout`: Resets user to `null` and status to `'LOGOUT'`.
