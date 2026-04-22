import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "awardees" RENAME COLUMN "google_scholar_link" TO "websites_google_scholar_link";
  ALTER TABLE "awardees" RENAME COLUMN "personal_website_link" TO "websites_personal_website_link";
  ALTER TABLE "awardees" RENAME COLUMN "institution_website_link" TO "websites_institution_website_link";
  ALTER TABLE "awardees" RENAME COLUMN "nobel_website_link" TO "websites_nobel_website_link";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "awardees" RENAME COLUMN "websites_google_scholar_link" TO "google_scholar_link";
  ALTER TABLE "awardees" RENAME COLUMN "websites_personal_website_link" TO "personal_website_link";
  ALTER TABLE "awardees" RENAME COLUMN "websites_institution_website_link" TO "institution_website_link";
  ALTER TABLE "awardees" RENAME COLUMN "websites_nobel_website_link" TO "nobel_website_link";`)
}
