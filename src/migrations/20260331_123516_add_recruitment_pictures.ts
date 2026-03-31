import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "recruitment_pictures" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"picture_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "recruitment_pictures_id" integer;
  ALTER TABLE "recruitment_pictures" ADD CONSTRAINT "recruitment_pictures_picture_id_media_id_fk" FOREIGN KEY ("picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "recruitment_pictures_picture_idx" ON "recruitment_pictures" USING btree ("picture_id");
  CREATE INDEX "recruitment_pictures_updated_at_idx" ON "recruitment_pictures" USING btree ("updated_at");
  CREATE INDEX "recruitment_pictures_created_at_idx" ON "recruitment_pictures" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_recruitment_pictures_fk" FOREIGN KEY ("recruitment_pictures_id") REFERENCES "public"."recruitment_pictures"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_recruitment_pictures_id_idx" ON "payload_locked_documents_rels" USING btree ("recruitment_pictures_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "recruitment_pictures" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "recruitment_pictures" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_recruitment_pictures_fk";
  
  DROP INDEX "payload_locked_documents_rels_recruitment_pictures_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "recruitment_pictures_id";`)
}
