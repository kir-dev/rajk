import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "awardees" ADD COLUMN "lecture_video_link" varchar;
  ALTER TABLE "awardees" DROP COLUMN "facebook_link";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "awardees" ADD COLUMN "facebook_link" varchar;
  ALTER TABLE "awardees" DROP COLUMN "lecture_video_link";`)
}
