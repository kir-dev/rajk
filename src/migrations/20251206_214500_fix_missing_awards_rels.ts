import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE IF NOT EXISTS "awards_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"awardees_id" integer
  );
  
  DO $$ BEGIN
   ALTER TABLE "awards_rels" ADD CONSTRAINT "awards_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."awards"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "awards_rels" ADD CONSTRAINT "awards_rels_awardees_fk" FOREIGN KEY ("awardees_id") REFERENCES "public"."awardees"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "awards_rels_order_idx" ON "awards_rels" USING btree ("order");
  CREATE INDEX IF NOT EXISTS "awards_rels_parent_idx" ON "awards_rels" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "awards_rels_path_idx" ON "awards_rels" USING btree ("path");
  CREATE INDEX IF NOT EXISTS "awards_rels_awardees_id_idx" ON "awards_rels" USING btree ("awardees_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE IF EXISTS "awards_rels" CASCADE;
  `)
}
