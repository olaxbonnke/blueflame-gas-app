# BlueFlame Gas Web Application

A premium Next.js 14 based web application for BlueFlame Gas delivery services, utilizing Supabase for backend operations, Framer Motion for animations, and a responsive Tailwind CSS v4 design.

## Features
- **Hero Video Background:** Implements muted, autoplay loop videos using native `<video>` elements with Framer Motion Parallax.
- **Guest Checkout via WhatsApp:** Customers can add cylinders to their persistent local cart, and checkout simply by entering delivery details. Operations are instantly forwarded to WhatsApp.
- **Real-time LPG Pricing:** Fetched directly from Supabase via real-time web sockets.
- **Admin Dashboard:** Role-based access control protecting orders and products management.

---

## 🚀 Supabase Setup & Schema

Execute the following SQL commands in your Supabase SQL Editor to initialize your database structure:

```sql
-- 1. Create Enums
CREATE TYPE user_role AS ENUM ('main_admin', 'regional_admin');

-- 2. Create Tables
CREATE TABLE branches (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  address TEXT NOT NULL,
  phone TEXT NOT NULL,
  coordinates TEXT
);

CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  role user_role DEFAULT 'regional_admin',
  branch_id UUID REFERENCES branches(id)
);

CREATE TABLE prices (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  lpg_price_per_kg DECIMAL NOT NULL DEFAULT 0.0,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE TABLE accessories (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL NOT NULL,
  image_url TEXT NOT NULL
);

CREATE TABLE orders (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  customer_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  address TEXT NOT NULL,
  nearest_branch_id UUID REFERENCES branches(id),
  total_amount DECIMAL NOT NULL,
  order_details JSONB NOT NULL,
  status TEXT DEFAULT 'pending',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. Insert Initial Data (Example)
INSERT INTO prices (lpg_price_per_kg) VALUES (1200);
INSERT INTO branches (name, address, phone) VALUES ('HQ Ikeja', '121 Oba Akran Ave', '+2348000000001');

-- 4. Set up Row Level Security (RLS)
ALTER TABLE branches ENABLE ROW LEVEL SECURITY;
ALTER TABLE prices ENABLE ROW LEVEL SECURITY;
ALTER TABLE accessories ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;

-- Allow public reads
CREATE POLICY "Public profiles are viewable by everyone." ON branches FOR SELECT USING (true);
CREATE POLICY "Public prices are viewable by everyone." ON prices FOR SELECT USING (true);
CREATE POLICY "Public accessories are viewable by everyone." ON accessories FOR SELECT USING (true);

-- Allow public inserting orders
CREATE POLICY "Anyone can insert orders." ON orders FOR INSERT WITH CHECK (true);

-- To keep it simple for the demo, you can allow authenticated users full access
CREATE POLICY "Auth reads orders" ON orders FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Auth updates orders" ON orders FOR UPDATE USING (auth.role() = 'authenticated');
```

---

## 📚 How-To Instructions

### 1. Replace the Hero Video
Navigate to the `public/` directory in this codebase.
Find `hero-bg.mp4` and replace it with your optimized WebM/MP4 file. Ensure the name remains `hero-bg.mp4`, or update the `src/components/sections/Hero.tsx` component's `src` attribute.

### 2. Update 1kg LPG Price inside Admin
- Log in to the Admin Portal (`/admin`).
- Navigate to the **Pricing** tab (or update directly via Supabase Dashboard if the UI is pending).
- Modify the `lpg_price_per_kg` row. Due to real-time subscriptions, the frontend shop will immediately update the prices for all cylinder sizes (3kg, 6kg, 12kg etc.) without requiring a page refresh for active users.

### 3. Upload a new Accessory Image
- In the Supabase dashboard, navigate to **Storage**.
- Create a bucket named `products`. 
- Upload your image, copy the public URL, and insert it as the `image_url` for a new row in the `accessories` table.

### 4. Create Sub-Admins and Assign Branches
- Super admins can create new users via the **Users** tab (or Supabase Auth dashboard).
- Once the user is invited, create a row in the `profiles` table matching the user's `UUID`, define the role as `regional_admin`, and set the `branch_id` to their designated location.

### 5. View and Test Location-Routed Orders
- Place an order on the frontend, selecting different nearest branches.
- The `order` inserted in Supabase will contain the `nearest_branch_id`. Regional admins viewing the dashboard can filter the table using this column to see only their designated orders.

---

## ☁️ Vercel Deployment Guide

1. Push this codebase to a GitHub/GitLab repository.
2. Sign in to [Vercel](https://vercel.com/) and click **Add New Project**.
3. Import your repository.
4. Set the Framework Preset to **Next.js**.
5. Under **Environment Variables**, add:
   - `NEXT_PUBLIC_SUPABASE_URL` = Your Supabase Project URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = Your Supabase Anon Key
6. Click **Deploy**. Vercel will automatically build the application and provide a global URL.
