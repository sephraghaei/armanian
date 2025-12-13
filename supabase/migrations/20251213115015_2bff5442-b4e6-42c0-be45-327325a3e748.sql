-- Make user آنا admin
INSERT INTO public.user_roles (user_id, role)
VALUES ('835a86c0-9437-407b-ac9b-383765bb5899', 'admin')
ON CONFLICT (user_id, role) DO NOTHING;