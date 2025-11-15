import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "awards_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"awardees_id" integer
  );
  
  ALTER TABLE "awards" DROP CONSTRAINT "awards_awardees_id_awardees_id_fk";
  
  DROP INDEX "awards_awardees_idx";
  ALTER TABLE "awards_rels" ADD CONSTRAINT "awards_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."awards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "awards_rels" ADD CONSTRAINT "awards_rels_awardees_fk" FOREIGN KEY ("awardees_id") REFERENCES "public"."awardees"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "awards_rels_order_idx" ON "awards_rels" USING btree ("order");
  CREATE INDEX "awards_rels_parent_idx" ON "awards_rels" USING btree ("parent_id");
  CREATE INDEX "awards_rels_path_idx" ON "awards_rels" USING btree ("path");
  CREATE INDEX "awards_rels_awardees_id_idx" ON "awards_rels" USING btree ("awardees_id");
  ALTER TABLE "awards" DROP COLUMN "awardees_id";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "awards_rels" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "awards_rels" CASCADE;
  ALTER TABLE "awards" ADD COLUMN "awardees_id" integer;
  ALTER TABLE "awards" ADD CONSTRAINT "awards_awardees_id_awardees_id_fk" FOREIGN KEY ("awardees_id") REFERENCES "public"."awardees"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "awards_awardees_idx" ON "awards" USING btree ("awardees_id");`)
}
