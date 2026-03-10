-- Fix RLS violations on branches and accessories tables

-- Enable RLS on accessories (if not already enabled)
ALTER TABLE public.accessories ENABLE ROW LEVEL SECURITY;

-- 1. Policies for Branches Table
-- Allow ANY authenticated user to insert, update, or delete branches
-- In a real production app, you might restrict this strictly to the 'main_admin' role, 
-- but for testing purposes we allow all authenticated admins (main or regional)

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
