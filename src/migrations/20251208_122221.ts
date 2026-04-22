import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "awards" ADD COLUMN "event_id" integer;
  ALTER TABLE "awards" ADD CONSTRAINT "awards_event_id_events_id_fk" FOREIGN KEY ("event_id") REFERENCES "public"."events"("id") ON DELETE set null ON UPDATE no action;
  CREATE INDEX "awards_event_idx" ON "awards" USING btree ("event_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "awards" DROP CONSTRAINT "awards_event_id_events_id_fk";
  
  DROP INDEX "awards_event_idx";
  ALTER TABLE "awards" DROP COLUMN "event_id";`)
}
