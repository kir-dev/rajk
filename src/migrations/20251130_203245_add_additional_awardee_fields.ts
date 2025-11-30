import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "awardees_fields_of_science" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL
  );
  
  CREATE TABLE "awardees_fields_of_science_en" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"field" varchar NOT NULL
  );
  
  ALTER TABLE "awardees" ADD COLUMN "institution" varchar NOT NULL;
  ALTER TABLE "awardees" ADD COLUMN "origin_country" varchar NOT NULL;
  ALTER TABLE "awardees" ADD COLUMN "about_en" jsonb NOT NULL;
  ALTER TABLE "awardees" ADD COLUMN "short_justification" jsonb NOT NULL;
  ALTER TABLE "awardees" ADD COLUMN "short_justification_en" jsonb NOT NULL;
  ALTER TABLE "awardees" ADD COLUMN "has_nobel" boolean DEFAULT false;
  ALTER TABLE "awardees" ADD COLUMN "nobel_year" numeric;
  ALTER TABLE "awardees" ADD COLUMN "google_scholar_link" varchar;
  ALTER TABLE "awardees" ADD COLUMN "personal_website_link" varchar;
  ALTER TABLE "awardees" ADD COLUMN "institution_website_link" varchar;
  ALTER TABLE "awardees" ADD COLUMN "nobel_website_link" varchar;
  ALTER TABLE "awardees_fields_of_science" ADD CONSTRAINT "awardees_fields_of_science_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."awardees"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "awardees_fields_of_science_en" ADD CONSTRAINT "awardees_fields_of_science_en_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."awardees"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "awardees_fields_of_science_order_idx" ON "awardees_fields_of_science" USING btree ("_order");
  CREATE INDEX "awardees_fields_of_science_parent_id_idx" ON "awardees_fields_of_science" USING btree ("_parent_id");
  CREATE INDEX "awardees_fields_of_science_en_order_idx" ON "awardees_fields_of_science_en" USING btree ("_order");
  CREATE INDEX "awardees_fields_of_science_en_parent_id_idx" ON "awardees_fields_of_science_en" USING btree ("_parent_id");
  ALTER TABLE "awardees" DROP COLUMN "testimony";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "awardees_fields_of_science" CASCADE;
  DROP TABLE "awardees_fields_of_science_en" CASCADE;
  ALTER TABLE "awardees" ADD COLUMN "testimony" varchar NOT NULL;
  ALTER TABLE "awardees" DROP COLUMN "institution";
  ALTER TABLE "awardees" DROP COLUMN "origin_country";
  ALTER TABLE "awardees" DROP COLUMN "about_en";
  ALTER TABLE "awardees" DROP COLUMN "short_justification";
  ALTER TABLE "awardees" DROP COLUMN "short_justification_en";
  ALTER TABLE "awardees" DROP COLUMN "has_nobel";
  ALTER TABLE "awardees" DROP COLUMN "nobel_year";
  ALTER TABLE "awardees" DROP COLUMN "google_scholar_link";
  ALTER TABLE "awardees" DROP COLUMN "personal_website_link";
  ALTER TABLE "awardees" DROP COLUMN "institution_website_link";
  ALTER TABLE "awardees" DROP COLUMN "nobel_website_link";`)
}
