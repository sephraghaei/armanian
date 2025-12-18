-- Add payment columns to enrollments table
ALTER TABLE public.enrollments 
ADD COLUMN IF NOT EXISTS payment_status text DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS payment_method text DEFAULT 'manual',
ADD COLUMN IF NOT EXISTS amount_due text DEFAULT '0',
ADD COLUMN IF NOT EXISTS amount_paid text DEFAULT '0',
ADD COLUMN IF NOT EXISTS paid_at timestamp with time zone,
ADD COLUMN IF NOT EXISTS payment_notes text;