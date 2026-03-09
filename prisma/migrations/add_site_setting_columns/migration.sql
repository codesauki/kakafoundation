-- Add missing columns to site_settings table if they don't exist
-- These columns were defined in the Prisma schema but missing from the database

ALTER TABLE "site_settings"
ADD COLUMN IF NOT EXISTS "description" TEXT,
ADD COLUMN IF NOT EXISTS "is_public" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS "updated_by" TEXT,
ADD COLUMN IF NOT EXISTS "updated_at" TIMESTAMPTZ NOT NULL DEFAULT now();

-- Create an index on updated_at for better query performance
CREATE INDEX IF NOT EXISTS "site_settings_updated_at_idx" ON "site_settings"("updated_at");
