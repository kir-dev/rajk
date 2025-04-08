// storage-adapter-import-placeholder
import { postgresAdapter } from '@payloadcms/db-postgres'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import { fileURLToPath } from 'url'
import sharp from 'sharp'

import { Users } from './collections/Users'
import { Media } from './collections/Media'
import {Sponsors} from "@/collections/Sponsors";
import {Groups} from "@/collections/Groups";
import {People} from "@/collections/People";
import {Awards} from "@/collections/Awards";
import {Awardees} from "@/collections/Awardees";
import {TDKs} from "@/collections/TDKs";
import {FAQs} from "@/collections/FAQs";
import {Reports} from "@/collections/Reports";
import {Apply_Timeline_Event} from "@/collections/Apply_Timeline_Event";
import {About_Timeline_Event} from "@/collections/About_Timeline_Event";

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [Users, Media, Sponsors, Groups, People, Awards, Awardees, TDKs, FAQs, Reports, Apply_Timeline_Event, About_Timeline_Event],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
