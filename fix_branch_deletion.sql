-- Migration to allow branch deletion even if orders or profiles are linked
-- This drops the existing RESTRICT/NO ACTION foreign keys and replaces them with ON DELETE SET NULL

-- 1. Fix Orders table reference
ALTER TABLE public.orders 
DROP CONSTRAINT IF EXISTS orders_nearest_branch_id_fkey;

ALTER TABLE public.orders
ADD CONSTRAINT orders_nearest_branch_id_fkey
FOREIGN KEY (nearest_branch_id)
REFERENCES public.branches(id)
ON DELETE SET NULL;

-- 2. Fix Profiles table reference
ALTER TABLE public.profiles
DROP CONSTRAINT IF EXISTS profiles_branch_id_fkey;

ALTER TABLE public.profiles
ADD CONSTRAINT profiles_branch_id_fkey
FOREIGN KEY (branch_id)
REFERENCES public.branches(id)
ON DELETE SET NULL;

-- 3. Optimization: If you'd rather not lose branch history in orders, 
-- you could use a "Soft Delete" approach (adding a 'deleted' boolean to branches),
-- but the above SET NULL fix is the most straightforward way to stop the "Failed to delete" error 
-- while keeping the customer's order records intact.
