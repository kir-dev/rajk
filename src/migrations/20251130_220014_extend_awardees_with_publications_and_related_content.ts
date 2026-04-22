import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_awardees_related_content_type" AS ENUM('article', 'interview', 'video', 'other');
  CREATE TABLE "awardees_image_gallery" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"caption" varchar NOT NULL,
  	"caption_en" varchar NOT NULL
  );
  
  CREATE TABLE "awardees_related_content" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"title_en" varchar NOT NULL,
  	"url" varchar NOT NULL,
  	"thumbnail_id" integer,
  	"type" "enum_awardees_related_content_type" NOT NULL
  );
  
  CREATE TABLE "awardees_publications" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"title_en" varchar NOT NULL,
  	"author" varchar NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"link" varchar
  );
  
  ALTER TABLE "awardees" ADD COLUMN "downloads_laudation_pdf_id" integer;
  ALTER TABLE "awardees" ADD COLUMN "downloads_press_photo_pack_id" integer;
  ALTER TABLE "awardees_image_gallery" ADD CONSTRAINT "awardees_image_gallery_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "awardees_image_gallery" ADD CONSTRAINT "awardees_image_gallery_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."awardees"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "awardees_related_content" ADD CONSTRAINT "awardees_related_content_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "awardees_related_content" ADD CONSTRAINT "awardees_related_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."awardees"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "awardees_publications" ADD CONSTRAINT "awardees_publications_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."awardees"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "awardees_image_gallery_order_idx" ON "awardees_image_gallery" USING btree ("_order");
  CREATE INDEX "awardees_image_gallery_parent_id_idx" ON "awardees_image_gallery" USING btree ("_parent_id");
  CREATE INDEX "awardees_image_gallery_image_idx" ON "awardees_image_gallery" USING btree ("image_id");
  CREATE INDEX "awardees_related_content_order_idx" ON "awardees_related_content" USING btree ("_order");
  CREATE INDEX "awardees_related_content_parent_id_idx" ON "awardees_related_content" USING btree ("_parent_id");
  CREATE INDEX "awardees_related_content_thumbnail_idx" ON "awardees_related_content" USING btree ("thumbnail_id");
  CREATE INDEX "awardees_publications_order_idx" ON "awardees_publications" USING btree ("_order");
  CREATE INDEX "awardees_publications_parent_id_idx" ON "awardees_publications" USING btree ("_parent_id");
  ALTER TABLE "awardees" ADD CONSTRAINT "awardees_downloads_laudation_pdf_id_media_id_fk" FOREIGN KEY ("downloads_laudation_pdf_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "awardees" ADD CONSTRAINT "awardees_downloads_press_photo_pack_id_media_id_fk" FOREIGN KEY ("downloads_press_photo_pack_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "awardees_downloads_downloads_laudation_pdf_idx" ON "awardees" USING btree ("downloads_laudation_pdf_id");
  CREATE INDEX "awardees_downloads_downloads_press_photo_pack_idx" ON "awardees" USING btree ("downloads_press_photo_pack_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "awardees_image_gallery" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "awardees_related_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "awardees_publications" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "awardees_image_gallery" CASCADE;
  DROP TABLE "awardees_related_content" CASCADE;
  DROP TABLE "awardees_publications" CASCADE;
  ALTER TABLE "awardees" DROP CONSTRAINT "awardees_downloads_laudation_pdf_id_media_id_fk";
  
  ALTER TABLE "awardees" DROP CONSTRAINT "awardees_downloads_press_photo_pack_id_media_id_fk";
  
  DROP INDEX "awardees_downloads_downloads_laudation_pdf_idx";
  DROP INDEX "awardees_downloads_downloads_press_photo_pack_idx";
  ALTER TABLE "awardees" DROP COLUMN "downloads_laudation_pdf_id";
  ALTER TABLE "awardees" DROP COLUMN "downloads_press_photo_pack_id";
  DROP TYPE "public"."enum_awardees_related_content_type";`)
}
