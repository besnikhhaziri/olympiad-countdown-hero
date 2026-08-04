CREATE TYPE public.app_role AS ENUM ('admin', 'staff', 'user');

CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);

GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

CREATE POLICY "Users can view their own roles"
ON public.user_roles FOR SELECT TO authenticated
USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage roles"
ON public.user_roles FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.country_participation (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  country text NOT NULL,
  edition integer NOT NULL DEFAULT 2026,
  participants integer NOT NULL DEFAULT 1,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (country, edition)
);

GRANT SELECT ON public.country_participation TO anon;
GRANT SELECT ON public.country_participation TO authenticated;
GRANT INSERT, UPDATE, DELETE ON public.country_participation TO authenticated;
GRANT ALL ON public.country_participation TO service_role;
ALTER TABLE public.country_participation ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view participation"
ON public.country_participation FOR SELECT TO anon, authenticated
USING (true);

CREATE POLICY "Staff can manage participation"
ON public.country_participation FOR ALL TO authenticated
USING (public.has_role(auth.uid(), 'staff') OR public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'staff') OR public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$
LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_country_participation_updated_at
BEFORE UPDATE ON public.country_participation
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

INSERT INTO public.country_participation (country, edition, participants) VALUES
  ('El Salvador', 2024, 1),
  ('Kosovo', 2024, 1),
  ('Brazil', 2024, 2),
  ('Ukraine', 2024, 3),
  ('India', 2024, 1),
  ('Russia', 2024, 1),
  ('Libya', 2024, 1),
  ('Croatia', 2024, 1),
  ('Malaysia', 2024, 1),
  ('Cyprus', 2024, 1),
  ('Australia', 2024, 1);