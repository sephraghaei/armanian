-- Update enrollments table to work with custom auth users and payment tracking
ALTER TABLE public.enrollments
  DROP CONSTRAINT IF EXISTS enrollments_user_id_fkey;

ALTER TABLE public.enrollments
  ADD CONSTRAINT enrollments_user_id_fkey
  FOREIGN KEY (user_id)
  REFERENCES public.users_app(id)
  ON DELETE CASCADE;

ALTER TABLE public.enrollments
  ALTER COLUMN user_id SET NOT NULL;

ALTER TABLE public.enrollments
  ADD COLUMN IF NOT EXISTS payment_status text NOT NULL DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed')),
  ADD COLUMN IF NOT EXISTS payment_method text NOT NULL DEFAULT 'manual',
  ADD COLUMN IF NOT EXISTS amount_due numeric(10,2) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS amount_paid numeric(10,2) NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS paid_at timestamptz,
  ADD COLUMN IF NOT EXISTS payment_notes text;

CREATE INDEX IF NOT EXISTS enrollments_payment_status_idx ON public.enrollments(payment_status);

-- Add optional price column to courses for better invoicing
ALTER TABLE public.courses
  ADD COLUMN IF NOT EXISTS price numeric(10,2) DEFAULT 0;
