# BlueFlame Gas | Premium LPG Delivery Platform 🔥

## About The Project
**BlueFlame Gas** is a modern, ultra-premium web application designed to revolutionize the way customers order cooking gas (LPG) and related accessories. Built with a focus on speed, aesthetics, and user experience, the platform allows users to check real-time gas prices, order securely via WhatsApp integration, and read essential gas safety tips—all wrapped in a stunning glassmorphism design.

Behind the scenes, the app features a powerful, secure **Admin Portal** that allows business owners to manage prices, approve/revoke sub-admin access, view orders, and publish newsletter bulletins in real time using Supabase.

---

## 🌟 Key Features

### For Customers:
- **Real-Time Pricing:** Gas prices (per kg) are synced live via Supabase. Customers instantly see accurate pricing for 3kg, 6kg, 12kg, 25kg, and 50kg cylinders.
- **WhatsApp Checkout:** A frictionless checkout experience that compiles the user's cart and delivery details into a pre-formatted WhatsApp message sent directly to the dispatch team.
- **Immersive Design:** Next-generation UI featuring Framer Motion scroll animations, backdrop blurs (glassmorphism), and dark-mode aesthetics.
- **Safety & Knowledge Base:** Dedicated sections for interactive safety guidelines and a "Newsletter" style bulletin for company updates.

### For Administrators (`/admin`):
- **Role-Based Access Control (RBAC):** Strict authentication system differentiating between `main_admin` (Super Admin) and `regional_admin`.
- **Nuclear Revoke System:** A one-click emergency button for the Super Admin to instantly revoke all regional admin access and lock down the platform.
- **Live Price Management:** Update the master price of LPG per kg, which instantly pushes updates to all connected customers via WebSockets.
- **Newsletter Publishing:** Create, edit, and publish rich-text bulletins directly from the dashboard.
- **Dynamic Help Desk:** Admins can update the global WhatsApp support number directly from the settings panel.

---

## 💻 Tech Stack

- **Frontend Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS v4
- **Animations:** Framer Motion & Lenis Scroll
- **State Management:** Zustand (Cart & UI State)
- **Database & Auth:** Supabase (PostgreSQL, Row Level Security, Real-Time Subscriptions)
- **Icons:** Lucide React & Google Material Symbols
- **Language:** TypeScript

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- A Supabase Project ([Create one here](https://supabase.com))

### 1. Clone & Install
```bash
git clone https://github.com/olaxbonnke/blueflame-gas-app.git
cd blueflame-gas-app
npm install
```

### 2. Environment Setup
Create a `.env.local` file in the root directory and add your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

*(Note: Never push your `.env.local` to GitHub. Use the provided `.env.example` as a template).*

### 3. Database Initialization
Run the provided SQL schemas in your Supabase SQL Editor to create the necessary tables for Prices, Admin Profiles, and Newsletter Posts. Be sure to enable **Row Level Security (RLS)** as defined in the SQL scripts.

### 4. Run Locally
```bash
npm run dev
```
Navigate to `http://localhost:3000` to view the app!

---

## 🛡️ Security
This platform utilizes strict Supabase RLS (Row Level Security) policies.
- Public users can only `SELECT` active products, prices, and published newsletters.
- Only authenticated users with the `admin` flag in the `profiles` table can access the `/admin` route or perform `UPDATE`/`INSERT`/`DELETE` operations.

---

## ☁️ Deployment
This project is optimized for deployment on **Vercel**:
1. Push your code to GitHub.
2. Import the project into Vercel.
3. Add your `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to the Vercel Environment Variables.
4. Deploy!

---

*Built with precision for the modern energy sector.* 🚀
