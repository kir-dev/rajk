import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "awardees" ALTER COLUMN "extended_justification" DROP NOT NULL;
  ALTER TABLE "awardees" ALTER COLUMN "extended_justification_en" DROP NOT NULL;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "awardees" ALTER COLUMN "extended_justification" SET NOT NULL;
  ALTER TABLE "awardees" ALTER COLUMN "extended_justification_en" SET NOT NULL;`)
}
