import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "awardees" ADD COLUMN "video_description" jsonb;
  ALTER TABLE "awardees" ADD COLUMN "video_description_en" jsonb;
  ALTER TABLE "awardees" DROP COLUMN "lecture_video_link";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "awardees" ADD COLUMN "lecture_video_link" varchar;
  ALTER TABLE "awardees" DROP COLUMN "video_description";
  ALTER TABLE "awardees" DROP COLUMN "video_description_en";`)
}
