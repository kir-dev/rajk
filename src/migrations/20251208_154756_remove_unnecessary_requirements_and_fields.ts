import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "awardees_related_content" CASCADE;
  ALTER TABLE "awardees" DROP COLUMN "about";
  ALTER TABLE "awardees" DROP COLUMN "about_en";
  DROP TYPE "public"."enum_awardees_related_content_type";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_awardees_related_content_type" AS ENUM('article', 'interview', 'video', 'other');
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
  
  ALTER TABLE "awardees" ADD COLUMN "about" jsonb NOT NULL;
  ALTER TABLE "awardees" ADD COLUMN "about_en" jsonb NOT NULL;
  ALTER TABLE "awardees_related_content" ADD CONSTRAINT "awardees_related_content_thumbnail_id_media_id_fk" FOREIGN KEY ("thumbnail_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "awardees_related_content" ADD CONSTRAINT "awardees_related_content_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."awardees"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "awardees_related_content_order_idx" ON "awardees_related_content" USING btree ("_order");
  CREATE INDEX "awardees_related_content_parent_id_idx" ON "awardees_related_content" USING btree ("_parent_id");
  CREATE INDEX "awardees_related_content_thumbnail_idx" ON "awardees_related_content" USING btree ("thumbnail_id");`)
}
