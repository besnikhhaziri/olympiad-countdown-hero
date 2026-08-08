-- 1. Profiles: owner-only read
DROP POLICY IF EXISTS "Profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Users can view their own profile"
ON public.profiles FOR SELECT TO authenticated
USING (auth.uid() = id);
REVOKE SELECT ON public.profiles FROM anon;

-- 2. Country participation: staff/admin read only, public map uses a safe function
DROP POLICY IF EXISTS "Anyone can view participation" ON public.country_participation;
CREATE POLICY "Staff can view participation"
ON public.country_participation FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'staff'::app_role) OR has_role(auth.uid(), 'admin'::app_role));
REVOKE SELECT ON public.country_participation FROM anon;

CREATE OR REPLACE FUNCTION public.participating_countries()
RETURNS TABLE (country text)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT DISTINCT c.country FROM (
    SELECT cp.country FROM public.country_participation cp WHERE cp.country IS NOT NULL
    UNION
    SELECT p.country FROM public.profiles p WHERE p.country IS NOT NULL
  ) c
  WHERE btrim(c.country) <> ''
$$;
GRANT EXECUTE ON FUNCTION public.participating_countries() TO anon, authenticated;

-- 3. Public submissions: admin-only read
DROP POLICY IF EXISTS "Staff can read proposals" ON public.public_problem_proposals;
CREATE POLICY "Admins can read proposals"
ON public.public_problem_proposals FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));
REVOKE SELECT ON public.public_problem_proposals FROM anon;

DROP POLICY IF EXISTS "Staff can read applications" ON public.public_contributor_applications;
CREATE POLICY "Admins can read applications"
ON public.public_contributor_applications FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));
REVOKE SELECT ON public.public_contributor_applications FROM anon;

DROP POLICY IF EXISTS "Staff can read interest" ON public.interest_registrations;
CREATE POLICY "Admins can read interest"
ON public.interest_registrations FOR SELECT TO authenticated
USING (has_role(auth.uid(), 'admin'::app_role));
REVOKE SELECT ON public.interest_registrations FROM anon;