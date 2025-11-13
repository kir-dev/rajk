import { sql, MigrateUpArgs, MigrateDownArgs } from "@payloadcms/db-vercel-postgres";

export async function up({ db }: MigrateUpArgs): Promise<void> {
  // Drop Stripe artifacts only if they exist
  await db.execute(sql`
    DO $$ BEGIN
      IF EXISTS (
        SELECT 1 FROM information_schema.tables
        WHERE table_schema = 'public' AND table_name = 'stripe_transactions'
      ) THEN
        -- RLS state doesn't matter if we drop, but keep it guarded
        EXECUTE 'ALTER TABLE "stripe_transactions" DISABLE ROW LEVEL SECURITY';
        EXECUTE 'DROP TABLE "stripe_transactions" CASCADE';
      END IF;
    EXCEPTION WHEN undefined_table THEN
      -- no-op
      NULL;
    END $$;
  `);

  // Drop FK if present
  await db.execute(sql`
    DO $$ BEGIN
      IF EXISTS (
        SELECT 1 FROM pg_constraint WHERE conname = 'payload_locked_documents_rels_stripe_transactions_fk'
      ) THEN
        EXECUTE 'ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_stripe_transactions_fk"';
      END IF;
    END $$;
  `);

  // Drop index if present
  await db.execute(sql`
    DO $$ BEGIN
      IF EXISTS (
        SELECT 1 FROM pg_class WHERE relname = 'payload_locked_documents_rels_stripe_transactions_id_idx' AND relkind = 'i'
      ) THEN
        EXECUTE 'DROP INDEX "payload_locked_documents_rels_stripe_transactions_id_idx"';
      END IF;
    END $$;
  `);

  // Remove column if present
  await db.execute(sql`
    ALTER TABLE "payload_locked_documents_rels"
    DROP COLUMN IF EXISTS "stripe_transactions_id";
  `);

  // Drop enum type if present
  await db.execute(sql`
    DROP TYPE IF EXISTS "public"."enum_stripe_transactions_status";
  `);

  // Make reports.topic NOT NULL safely
  await db.execute(sql`
    UPDATE "reports" SET "topic" = 'unspecified'
    WHERE "topic" IS NULL;
  `);
  await db.execute(sql`
    ALTER TABLE "reports" ALTER COLUMN "topic" SET NOT NULL;
  `);

  // Add reports.link as NOT NULL safely
  await db.execute(sql`
    ALTER TABLE "reports" ADD COLUMN IF NOT EXISTS "link" varchar;
  `);
  await db.execute(sql`
    UPDATE "reports" SET "link" = COALESCE("link", '');
  `);
  await db.execute(sql`
    ALTER TABLE "reports" ALTER COLUMN "link" SET NOT NULL;
  `);
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  // Reverse the NOT NULLs and column creation; we won't recreate the Stripe artifacts.
  await db.execute(sql`ALTER TABLE "reports" ALTER COLUMN "topic" DROP NOT NULL;`);
  await db.execute(sql`ALTER TABLE "reports" DROP COLUMN IF EXISTS "link";`);
}