import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    UPDATE "awards"
    SET "about_en" = '{"root":{"children":[{"children":[],"direction":null,"format":"","indent":0,"type":"paragraph","version":1}],"direction":null,"format":"","indent":0,"type":"root","version":1}}'
    WHERE "about_en"::text = '{}'::text
       OR "about_en" IS NULL;
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  // No restoration needed
}
