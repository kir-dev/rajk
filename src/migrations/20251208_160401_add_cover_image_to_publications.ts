import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   -- TRUNCATE TABLE "awardees" CASCADE; -- Removed to prevent data loss
   ALTER TABLE "awardees_publications" ADD COLUMN "cover_image_id" integer;
  ALTER TABLE "awardees_publications" ADD CONSTRAINT "awardees_publications_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "awardees_publications_cover_image_idx" ON "awardees_publications" USING btree ("cover_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "awardees_publications" DROP CONSTRAINT "awardees_publications_cover_image_id_media_id_fk";
  
  DROP INDEX "awardees_publications_cover_image_idx";
  ALTER TABLE "awardees_publications" DROP COLUMN "cover_image_id";`)
}
