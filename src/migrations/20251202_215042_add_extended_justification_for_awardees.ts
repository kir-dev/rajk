import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "awardees" ADD COLUMN "extended_justification" varchar NOT NULL;
  ALTER TABLE "awardees" ADD COLUMN "extended_justification_en" varchar NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "awardees" DROP COLUMN "extended_justification";
  ALTER TABLE "awardees" DROP COLUMN "extended_justification_en";`)
}
