import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "awards_stats" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"value" numeric NOT NULL,
  	"label" varchar NOT NULL,
  	"label_en" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"description_en" varchar NOT NULL
  );
  
  CREATE TABLE "awardees_articles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"title_en" varchar NOT NULL,
  	"abstract" varchar,
  	"abstract_en" varchar,
  	"cover_image_id" integer NOT NULL,
  	"author" varchar NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"link" varchar
  );
  
  ALTER TABLE "awards" ADD COLUMN "name_en" varchar DEFAULT '' NOT NULL;
  ALTER TABLE "awards" ADD COLUMN "program_about" jsonb DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}' NOT NULL;
  ALTER TABLE "awards" ADD COLUMN "program_about_en" jsonb DEFAULT '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}' NOT NULL;
  ALTER TABLE "awardees_publications" ADD COLUMN "abstract" varchar;
  ALTER TABLE "awardees_publications" ADD COLUMN "abstract_en" varchar;
  ALTER TABLE "awardees" ADD COLUMN "interview_video_link" varchar;
  ALTER TABLE "awards_stats" ADD CONSTRAINT "awards_stats_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."awards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "awardees_articles" ADD CONSTRAINT "awardees_articles_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "awardees_articles" ADD CONSTRAINT "awardees_articles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."awardees"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "awards_stats_order_idx" ON "awards_stats" USING btree ("_order");
  CREATE INDEX "awards_stats_parent_id_idx" ON "awards_stats" USING btree ("_parent_id");
  CREATE INDEX "awardees_articles_order_idx" ON "awardees_articles" USING btree ("_order");
  CREATE INDEX "awardees_articles_parent_id_idx" ON "awardees_articles" USING btree ("_parent_id");
  CREATE INDEX "awardees_articles_cover_image_idx" ON "awardees_articles" USING btree ("cover_image_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "awards_stats" CASCADE;
  DROP TABLE "awardees_articles" CASCADE;
  ALTER TABLE "awards" DROP COLUMN "name_en";
  ALTER TABLE "awards" DROP COLUMN "program_about";
  ALTER TABLE "awards" DROP COLUMN "program_about_en";
  ALTER TABLE "awardees_publications" DROP COLUMN "abstract";
  ALTER TABLE "awardees_publications" DROP COLUMN "abstract_en";
  ALTER TABLE "awardees" DROP COLUMN "interview_video_link";`)
}
