import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "awardees_articles" ADD COLUMN "download_id" integer;
  ALTER TABLE "awardees_articles" ADD CONSTRAINT "awardees_articles_download_id_media_id_fk" FOREIGN KEY ("download_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "awardees_articles_download_idx" ON "awardees_articles" USING btree ("download_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "awardees_articles" DROP CONSTRAINT "awardees_articles_download_id_media_id_fk";
  
  DROP INDEX "awardees_articles_download_idx";
  ALTER TABLE "awardees_articles" DROP COLUMN "download_id";`)
}
