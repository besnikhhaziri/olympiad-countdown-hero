CREATE TABLE public.interest_registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  country text,
  school text,
  grade text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.interest_registrations TO anon, authenticated;
GRANT SELECT ON public.interest_registrations TO authenticated;
GRANT ALL ON public.interest_registrations TO service_role;
ALTER TABLE public.interest_registrations ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can register interest" ON public.interest_registrations FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Staff can read interest" ON public.interest_registrations FOR SELECT TO authenticated USING (has_role(auth.uid(),'staff'::app_role) OR has_role(auth.uid(),'admin'::app_role));

CREATE TABLE public.public_problem_proposals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id uuid NOT NULL DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  country text,
  title text NOT NULL,
  statement text NOT NULL,
  solution_sketch text,
  difficulty text NOT NULL DEFAULT 'medium',
  status text NOT NULL DEFAULT 'submitted',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.public_problem_proposals TO anon, authenticated;
GRANT SELECT ON public.public_problem_proposals TO authenticated;
GRANT ALL ON public.public_problem_proposals TO service_role;
ALTER TABLE public.public_problem_proposals ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can propose problems" ON public.public_problem_proposals FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Staff can read proposals" ON public.public_problem_proposals FOR SELECT TO authenticated USING (has_role(auth.uid(),'staff'::app_role) OR has_role(auth.uid(),'admin'::app_role));

CREATE TABLE public.public_contributor_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id uuid NOT NULL DEFAULT gen_random_uuid(),
  first_name text NOT NULL,
  last_name text NOT NULL,
  email text NOT NULL,
  country text,
  role_wanted text NOT NULL DEFAULT 'grader',
  essay text NOT NULL,
  status text NOT NULL DEFAULT 'submitted',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.public_contributor_applications TO anon, authenticated;
GRANT SELECT ON public.public_contributor_applications TO authenticated;
GRANT ALL ON public.public_contributor_applications TO service_role;
ALTER TABLE public.public_contributor_applications ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can apply" ON public.public_contributor_applications FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Staff can read applications" ON public.public_contributor_applications FOR SELECT TO authenticated USING (has_role(auth.uid(),'staff'::app_role) OR has_role(auth.uid(),'admin'::app_role));