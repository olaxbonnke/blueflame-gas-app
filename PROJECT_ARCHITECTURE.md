# BlueFlame Gas | Project Architecture & Development History

This document provides a detailed, pinpoint description of how the BlueFlame Gas project was made possible, the evolution of its architecture, and the technical implementation of its core functioning parts.

---

## 1. Project Overview & Evolution

The project evolved through several distinct phases, moving from a static UI concept to a high-performance, live-data-driven web application.

### Phase 1: The Foundation & Technical Setup
We established the core tech stack using **Next.js 14+ (App Router)** for its routing capabilities and server-side optimization. **TypeScript** was used throughout to ensure type safety, especially for the complex data structures involved in products and admin management.
- **Styling:** Tailwind CSS was selected for rapid UI development and utility-first styling.
- **Backend:** Supabase was integrated early as the "all-in-one" backend solution for Authentication, Postgres Database, and Media Storage.

### Phase 2: Dedicated Routing & Component Refactoring
Originally conceived as a monolithic landing page, the project was refactored into a multi-page application to handle the depth of information (Services, Shop, Safety Guide, etc.).
- **Architecture:** We extracted giant sections into reusable components located in `src/components/sections/`.
- **Navigation:** A global `Navbar` was implemented with sticky glassmorphic effects, providing seamless transition between `/shop`, `/services`, `/locations`, and `/safety`.

### Phase 3: Premium Aesthetic & Glassmorphism
The visual identity was overhauled to achieve a "premium" feel.
- **Design System:** We implemented a dark-theme-first aesthetic using true black backgrounds (`#09090b`) and subtle, high-performance gradients.
- **Glassmorphism:** Card elements use `backdrop-blur-xl` and semi-transparent borders (`border-white/10`) to create a layered, modern depth.
- **AI Media:** We integrated photorealistic AI-generated product images for gas cylinders and accessories to replace generic placeholders.

### Phase 4: Live Data Integration
The frontend was connected to the Supabase backend to enable real-time updates without code changes.
- **Logic:** We replaced mock arrays with `useEffect` hooks and Supabase client calls.
- **Real-time Price Ticker:** The LPG price displayed in the Hero section is pulled directly from the `prices` table, allowing the admin to update global rates instantly.

---

## 2. Core Functionality: How it Works

### 🛒 The Shopping & Cart System
- **State Management:** Uses **Zustand** with persistence (`localStorage`) to keep the user's cart active even if they close the browser.
- **Product Hub:** The `/shop` page dynamically fetches accessories and cylinders from the `accessories` table.
- **Checkout Flow:** Instead of a complex traditional payment Gateway, we implemented a **WhatsApp Checkout**. After filling in delivery details, the system generates a pre-filled WhatsApp message containing the order summary, allowing for direct communication and delivery coordination.

### 🔐 Multi-Layered Admin Security
The project feature a sophisticated security model to protect the business data:
1. **Google OAuth:** Admins log in using their official Google accounts.
2. **Whitelist System:** A custom table `admin_users` acts as an authorization gate. Even if someone logs in with Google, the `auth/callback` logic checks if their email specifically exists in the whitelist. If not, they are immediately signed out.
3. **Nuclear Revoke (Emergency Lock):** Located in the Admin Settings, this "Danger Zone" feature allows the Super Admin to delete the entire whitelist (saving only the developer) and sign everyone out. This is an emergency lockdown mechanism that emails the developer automatically for a manual reset.

### 📊 Admin Dashboard Logic
- **Regional Access Control:** The database includes a `branches` and `profiles` relationship. Regional admins can only see and manage orders intended for their specific branch (Abuja, Lagos, etc.).
- **CMS Features:** Admins can publish Newsletter bulletins, update LPG prices, manage accessory stock, and edit Branch contact information through a unified, clean interface.
- **Activity Monitoring:** A dedicated activity log tracks which admin performed which action, ensuring accountability.

---

## 3. Tech Stack Deep Dive

| Layer | Technology |
| :--- | :--- |
| **Framework** | Next.js 14+ (React) |
| **Language** | TypeScript |
| **Database** | PostgreSQL (Supabase) |
| **Auth** | Supabase Auth (Google OAuth) |
| **Styles** | Tailwind CSS |
| **Animations** | Framer Motion |
| **State** | Zustand |
| **Icons** | Lucide React |

---

## 4. Key Implementation Files

- `src/app/page.tsx`: The main landing page entry point.
- `src/app/admin/page.tsx`: The secure entrance to the admin portal.
- `src/app/auth/callback/page.tsx`: The "Gatekeeper" logic enforcing the email whitelist.
- `src/lib/supabase/client.ts`: Standardized database connection.
- `src/lib/store.ts`: The global cart and UI state manager.

---

*This document was generated based on the project history and current codebase architecture as of March 2026.*
