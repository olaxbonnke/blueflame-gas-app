-- Fix RLS violations on branches and accessories tables

-- Enable RLS on accessories (if not already enabled)
ALTER TABLE public.accessories ENABLE ROW LEVEL SECURITY;

-- 1. Policies for Branches Table
-- Allow ANY authenticated user to insert, update, or delete branches

CREATE POLICY "Allow authenticated full access to branches"
ON public.branches
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Ensure public can still read branches
CREATE POLICY "Allow public read access to branches"
ON public.branches
FOR SELECT
TO public
USING (true);


-- 2. Policies for Accessories Table
-- Allow ANY authenticated user to insert, update, or delete accessories

CREATE POLICY "Allow authenticated full access to accessories"
ON public.accessories
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);

-- Ensure public can still read accessories
CREATE POLICY "Allow public read access to accessories"
ON public.accessories
FOR SELECT
TO public
USING (true);


-- 3. Policies for Prices Table (CRITICAL for Hero price badge)
-- The Hero section needs anonymous read access to the prices table

ALTER TABLE public.prices ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read access to prices"
ON public.prices
FOR SELECT
TO public
USING (true);

CREATE POLICY "Allow authenticated full access to prices"
ON public.prices
FOR ALL
TO authenticated
USING (true)
WITH CHECK (true);


-- 4. Also ensure newsletter_posts has public read for published posts
-- (Run this AFTER creating the newsletter_posts table)
-- ALTER TABLE public.newsletter_posts ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Anyone can read published posts" ON public.newsletter_posts FOR SELECT USING (published = true);
-- CREATE POLICY "Authenticated admins can manage posts" ON public.newsletter_posts FOR ALL TO authenticated USING (true) WITH CHECK (true);

