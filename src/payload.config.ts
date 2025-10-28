// storage-adapter-import-placeholder
import { s3Storage } from '@payloadcms/storage-s3'
import { vercelPostgresAdapter } from '@payloadcms/db-vercel-postgres'
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
import {Applicants} from "@/collections/Applicants";
import {Events} from "@/collections/Events";
import {stripePlugin} from "@payloadcms/plugin-stripe";
import {StripeTransactions} from "@/collections/Stripe-Transactions";
import {CommunityPictures} from "@/collections/CommunityPictures";
import {CourseCategories} from "@/collections/CourseCategories";
import {Courses} from "@/collections/Courses";
import {Odyssey} from "@/collections/Odyssey";

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: "users",
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  collections: [
    Users,
    Media,
    Sponsors,
    Groups,
    People,
    Applicants,
    Awards,
    Awardees,
    TDKs,
    FAQs,
    Reports,
    Apply_Timeline_Event,
    About_Timeline_Event,
    StripeTransactions,
    Events,
    CommunityPictures,
    CourseCategories,
    Courses,
    Odyssey,
  ],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: vercelPostgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    s3Storage({
      collections: {
        media: true
      },
      bucket: process.env.S3_BUCKET!,
      config: {
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID!,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
        },
        forcePathStyle: true,
        region: process.env.S3_REGION,
        endpoint: process.env.S3_ENDPOINT,
        // ... Other S3 configuration
      },
      clientUploads: true,
    }),
    // storage-adapter-placeholder
    stripePlugin({
      stripeSecretKey: process.env.STRIPE_SECRET_KEY!,
      rest: true,
    })
  ],
});
