import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "awardees" ALTER COLUMN "short_justification" SET DATA TYPE varchar;
  ALTER TABLE "awardees" ALTER COLUMN "short_justification_en" SET DATA TYPE varchar;
  ALTER TABLE "awardees" ADD COLUMN "ceremony_video_link" varchar;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "awardees" ALTER COLUMN "short_justification" SET DATA TYPE jsonb;
  ALTER TABLE "awardees" ALTER COLUMN "short_justification_en" SET DATA TYPE jsonb;
  ALTER TABLE "awardees" DROP COLUMN "ceremony_video_link";`)
}
