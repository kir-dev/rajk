import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-vercel-postgres'

export async function up({ db }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_stripe_transactions_status" AS ENUM('succeeded', 'failed');
  CREATE TYPE "public"."enum_courses_icon" AS ENUM('BookOpen', 'Calculator', 'Globe', 'Palette', 'Code', 'Users', 'TrendingUp', 'Lightbulb', 'Target', 'Database', 'Settings', 'Puzzle', 'Monitor', 'FileText', 'Search', 'BarChart', 'Download', 'MessageCircle', 'PenTool', 'Layers');
  CREATE TABLE "users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "media" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric
  );
  
  CREATE TABLE "sponsors" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"logo_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "groups_members" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"member_id" integer NOT NULL,
  	"role" varchar,
  	"joined_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "groups" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"description" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "people" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"picture_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "applicants" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"email" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "awards_covers" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"cover_id" integer NOT NULL
  );
  
  CREATE TABLE "awards" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"logo_id" integer NOT NULL,
  	"about" jsonb NOT NULL,
  	"awardees_id" integer,
  	"facebook_link" varchar,
  	"event_facebook_link" varchar,
  	"connected_publicatios" numeric,
  	"block_seminar_participants" numeric,
  	"lecture_participants" numeric,
  	"video_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "awardees" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"about" jsonb NOT NULL,
  	"year" numeric NOT NULL,
  	"picture_id" integer NOT NULL,
  	"testimony" varchar NOT NULL,
  	"facebook_link" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tdks" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"section_name" varchar,
  	"year" numeric,
  	"placement" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "tdks_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"people_id" integer
  );
  
  CREATE TABLE "faqs" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"question" varchar NOT NULL,
  	"answer" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "reports" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"topic" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "apply_timeline_event" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"description" jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "about_timeline_event" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"description" jsonb NOT NULL,
  	"logo_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "stripe_transactions" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"donor_name" varchar,
  	"formatted_amount" varchar,
  	"currency" varchar,
  	"donor_email" varchar,
  	"stripe_payment_intent_id" varchar NOT NULL,
  	"amount" numeric,
  	"metadata" jsonb,
  	"status" "enum_stripe_transactions_status" NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "events" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"picture_id" integer NOT NULL,
  	"description" jsonb NOT NULL,
  	"date" timestamp(3) with time zone NOT NULL,
  	"location" varchar NOT NULL,
  	"speakers" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "community_pictures" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"picture_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "course_categories" (
  	"id" varchar PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"color" varchar NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "courses" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"link" varchar,
  	"icon" "enum_courses_icon" DEFAULT 'BookOpen' NOT NULL,
  	"position_top" varchar DEFAULT '50%' NOT NULL,
  	"position_left" varchar DEFAULT '50%' NOT NULL,
  	"category_id" varchar NOT NULL,
  	"display_order" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "odyssey_participants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"participant_id" integer NOT NULL
  );
  
  CREATE TABLE "odyssey" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"title" varchar NOT NULL,
  	"description" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer,
  	"media_id" integer,
  	"sponsors_id" integer,
  	"groups_id" integer,
  	"people_id" integer,
  	"applicants_id" integer,
  	"awards_id" integer,
  	"awardees_id" integer,
  	"tdks_id" integer,
  	"faqs_id" integer,
  	"reports_id" integer,
  	"apply_timeline_event_id" integer,
  	"about_timeline_event_id" integer,
  	"stripe_transactions_id" integer,
  	"events_id" integer,
  	"community_pictures_id" integer,
  	"course_categories_id" varchar,
  	"courses_id" integer,
  	"odyssey_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"users_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  ALTER TABLE "sponsors" ADD CONSTRAINT "sponsors_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "groups_members" ADD CONSTRAINT "groups_members_member_id_people_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "groups_members" ADD CONSTRAINT "groups_members_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "people" ADD CONSTRAINT "people_picture_id_media_id_fk" FOREIGN KEY ("picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "awards_covers" ADD CONSTRAINT "awards_covers_cover_id_media_id_fk" FOREIGN KEY ("cover_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "awards_covers" ADD CONSTRAINT "awards_covers_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."awards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "awards" ADD CONSTRAINT "awards_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "awards" ADD CONSTRAINT "awards_awardees_id_awardees_id_fk" FOREIGN KEY ("awardees_id") REFERENCES "public"."awardees"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "awards" ADD CONSTRAINT "awards_video_id_media_id_fk" FOREIGN KEY ("video_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "awardees" ADD CONSTRAINT "awardees_picture_id_media_id_fk" FOREIGN KEY ("picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "tdks_rels" ADD CONSTRAINT "tdks_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."tdks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "tdks_rels" ADD CONSTRAINT "tdks_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "about_timeline_event" ADD CONSTRAINT "about_timeline_event_logo_id_media_id_fk" FOREIGN KEY ("logo_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "events" ADD CONSTRAINT "events_picture_id_media_id_fk" FOREIGN KEY ("picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "community_pictures" ADD CONSTRAINT "community_pictures_picture_id_media_id_fk" FOREIGN KEY ("picture_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "courses" ADD CONSTRAINT "courses_category_id_course_categories_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."course_categories"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "odyssey_participants" ADD CONSTRAINT "odyssey_participants_participant_id_people_id_fk" FOREIGN KEY ("participant_id") REFERENCES "public"."people"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "odyssey_participants" ADD CONSTRAINT "odyssey_participants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."odyssey"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_sponsors_fk" FOREIGN KEY ("sponsors_id") REFERENCES "public"."sponsors"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_groups_fk" FOREIGN KEY ("groups_id") REFERENCES "public"."groups"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_people_fk" FOREIGN KEY ("people_id") REFERENCES "public"."people"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_applicants_fk" FOREIGN KEY ("applicants_id") REFERENCES "public"."applicants"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_awards_fk" FOREIGN KEY ("awards_id") REFERENCES "public"."awards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_awardees_fk" FOREIGN KEY ("awardees_id") REFERENCES "public"."awardees"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_tdks_fk" FOREIGN KEY ("tdks_id") REFERENCES "public"."tdks"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_faqs_fk" FOREIGN KEY ("faqs_id") REFERENCES "public"."faqs"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_reports_fk" FOREIGN KEY ("reports_id") REFERENCES "public"."reports"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_apply_timeline_event_fk" FOREIGN KEY ("apply_timeline_event_id") REFERENCES "public"."apply_timeline_event"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_about_timeline_event_fk" FOREIGN KEY ("about_timeline_event_id") REFERENCES "public"."about_timeline_event"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_stripe_transactions_fk" FOREIGN KEY ("stripe_transactions_id") REFERENCES "public"."stripe_transactions"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "public"."events"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_community_pictures_fk" FOREIGN KEY ("community_pictures_id") REFERENCES "public"."community_pictures"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_course_categories_fk" FOREIGN KEY ("course_categories_id") REFERENCES "public"."course_categories"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_courses_fk" FOREIGN KEY ("courses_id") REFERENCES "public"."courses"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_odyssey_fk" FOREIGN KEY ("odyssey_id") REFERENCES "public"."odyssey"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "public"."users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "users_updated_at_idx" ON "users" USING btree ("updated_at");
  CREATE INDEX "users_created_at_idx" ON "users" USING btree ("created_at");
  CREATE UNIQUE INDEX "users_email_idx" ON "users" USING btree ("email");
  CREATE INDEX "media_updated_at_idx" ON "media" USING btree ("updated_at");
  CREATE INDEX "media_created_at_idx" ON "media" USING btree ("created_at");
  CREATE UNIQUE INDEX "media_filename_idx" ON "media" USING btree ("filename");
  CREATE INDEX "sponsors_logo_idx" ON "sponsors" USING btree ("logo_id");
  CREATE INDEX "sponsors_updated_at_idx" ON "sponsors" USING btree ("updated_at");
  CREATE INDEX "sponsors_created_at_idx" ON "sponsors" USING btree ("created_at");
  CREATE INDEX "groups_members_order_idx" ON "groups_members" USING btree ("_order");
  CREATE INDEX "groups_members_parent_id_idx" ON "groups_members" USING btree ("_parent_id");
  CREATE INDEX "groups_members_member_idx" ON "groups_members" USING btree ("member_id");
  CREATE INDEX "groups_updated_at_idx" ON "groups" USING btree ("updated_at");
  CREATE INDEX "groups_created_at_idx" ON "groups" USING btree ("created_at");
  CREATE INDEX "people_picture_idx" ON "people" USING btree ("picture_id");
  CREATE INDEX "people_updated_at_idx" ON "people" USING btree ("updated_at");
  CREATE INDEX "people_created_at_idx" ON "people" USING btree ("created_at");
  CREATE INDEX "applicants_updated_at_idx" ON "applicants" USING btree ("updated_at");
  CREATE INDEX "applicants_created_at_idx" ON "applicants" USING btree ("created_at");
  CREATE INDEX "awards_covers_order_idx" ON "awards_covers" USING btree ("_order");
  CREATE INDEX "awards_covers_parent_id_idx" ON "awards_covers" USING btree ("_parent_id");
  CREATE INDEX "awards_covers_cover_idx" ON "awards_covers" USING btree ("cover_id");
  CREATE INDEX "awards_logo_idx" ON "awards" USING btree ("logo_id");
  CREATE INDEX "awards_awardees_idx" ON "awards" USING btree ("awardees_id");
  CREATE INDEX "awards_video_idx" ON "awards" USING btree ("video_id");
  CREATE INDEX "awards_updated_at_idx" ON "awards" USING btree ("updated_at");
  CREATE INDEX "awards_created_at_idx" ON "awards" USING btree ("created_at");
  CREATE INDEX "awardees_picture_idx" ON "awardees" USING btree ("picture_id");
  CREATE INDEX "awardees_updated_at_idx" ON "awardees" USING btree ("updated_at");
  CREATE INDEX "awardees_created_at_idx" ON "awardees" USING btree ("created_at");
  CREATE INDEX "tdks_updated_at_idx" ON "tdks" USING btree ("updated_at");
  CREATE INDEX "tdks_created_at_idx" ON "tdks" USING btree ("created_at");
  CREATE INDEX "tdks_rels_order_idx" ON "tdks_rels" USING btree ("order");
  CREATE INDEX "tdks_rels_parent_idx" ON "tdks_rels" USING btree ("parent_id");
  CREATE INDEX "tdks_rels_path_idx" ON "tdks_rels" USING btree ("path");
  CREATE INDEX "tdks_rels_people_id_idx" ON "tdks_rels" USING btree ("people_id");
  CREATE INDEX "faqs_updated_at_idx" ON "faqs" USING btree ("updated_at");
  CREATE INDEX "faqs_created_at_idx" ON "faqs" USING btree ("created_at");
  CREATE INDEX "reports_updated_at_idx" ON "reports" USING btree ("updated_at");
  CREATE INDEX "reports_created_at_idx" ON "reports" USING btree ("created_at");
  CREATE INDEX "apply_timeline_event_updated_at_idx" ON "apply_timeline_event" USING btree ("updated_at");
  CREATE INDEX "apply_timeline_event_created_at_idx" ON "apply_timeline_event" USING btree ("created_at");
  CREATE INDEX "about_timeline_event_logo_idx" ON "about_timeline_event" USING btree ("logo_id");
  CREATE INDEX "about_timeline_event_updated_at_idx" ON "about_timeline_event" USING btree ("updated_at");
  CREATE INDEX "about_timeline_event_created_at_idx" ON "about_timeline_event" USING btree ("created_at");
  CREATE INDEX "stripe_transactions_updated_at_idx" ON "stripe_transactions" USING btree ("updated_at");
  CREATE INDEX "stripe_transactions_created_at_idx" ON "stripe_transactions" USING btree ("created_at");
  CREATE INDEX "events_picture_idx" ON "events" USING btree ("picture_id");
  CREATE INDEX "events_updated_at_idx" ON "events" USING btree ("updated_at");
  CREATE INDEX "events_created_at_idx" ON "events" USING btree ("created_at");
  CREATE INDEX "community_pictures_picture_idx" ON "community_pictures" USING btree ("picture_id");
  CREATE INDEX "community_pictures_updated_at_idx" ON "community_pictures" USING btree ("updated_at");
  CREATE INDEX "community_pictures_created_at_idx" ON "community_pictures" USING btree ("created_at");
  CREATE INDEX "course_categories_updated_at_idx" ON "course_categories" USING btree ("updated_at");
  CREATE INDEX "course_categories_created_at_idx" ON "course_categories" USING btree ("created_at");
  CREATE INDEX "courses_category_idx" ON "courses" USING btree ("category_id");
  CREATE INDEX "courses_updated_at_idx" ON "courses" USING btree ("updated_at");
  CREATE INDEX "courses_created_at_idx" ON "courses" USING btree ("created_at");
  CREATE INDEX "odyssey_participants_order_idx" ON "odyssey_participants" USING btree ("_order");
  CREATE INDEX "odyssey_participants_parent_id_idx" ON "odyssey_participants" USING btree ("_parent_id");
  CREATE INDEX "odyssey_participants_participant_idx" ON "odyssey_participants" USING btree ("participant_id");
  CREATE INDEX "odyssey_updated_at_idx" ON "odyssey" USING btree ("updated_at");
  CREATE INDEX "odyssey_created_at_idx" ON "odyssey" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels" USING btree ("users_id");
  CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels" USING btree ("media_id");
  CREATE INDEX "payload_locked_documents_rels_sponsors_id_idx" ON "payload_locked_documents_rels" USING btree ("sponsors_id");
  CREATE INDEX "payload_locked_documents_rels_groups_id_idx" ON "payload_locked_documents_rels" USING btree ("groups_id");
  CREATE INDEX "payload_locked_documents_rels_people_id_idx" ON "payload_locked_documents_rels" USING btree ("people_id");
  CREATE INDEX "payload_locked_documents_rels_applicants_id_idx" ON "payload_locked_documents_rels" USING btree ("applicants_id");
  CREATE INDEX "payload_locked_documents_rels_awards_id_idx" ON "payload_locked_documents_rels" USING btree ("awards_id");
  CREATE INDEX "payload_locked_documents_rels_awardees_id_idx" ON "payload_locked_documents_rels" USING btree ("awardees_id");
  CREATE INDEX "payload_locked_documents_rels_tdks_id_idx" ON "payload_locked_documents_rels" USING btree ("tdks_id");
  CREATE INDEX "payload_locked_documents_rels_faqs_id_idx" ON "payload_locked_documents_rels" USING btree ("faqs_id");
  CREATE INDEX "payload_locked_documents_rels_reports_id_idx" ON "payload_locked_documents_rels" USING btree ("reports_id");
  CREATE INDEX "payload_locked_documents_rels_apply_timeline_event_id_idx" ON "payload_locked_documents_rels" USING btree ("apply_timeline_event_id");
  CREATE INDEX "payload_locked_documents_rels_about_timeline_event_id_idx" ON "payload_locked_documents_rels" USING btree ("about_timeline_event_id");
  CREATE INDEX "payload_locked_documents_rels_stripe_transactions_id_idx" ON "payload_locked_documents_rels" USING btree ("stripe_transactions_id");
  CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels" USING btree ("events_id");
  CREATE INDEX "payload_locked_documents_rels_community_pictures_id_idx" ON "payload_locked_documents_rels" USING btree ("community_pictures_id");
  CREATE INDEX "payload_locked_documents_rels_course_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("course_categories_id");
  CREATE INDEX "payload_locked_documents_rels_courses_id_idx" ON "payload_locked_documents_rels" USING btree ("courses_id");
  CREATE INDEX "payload_locked_documents_rels_odyssey_id_idx" ON "payload_locked_documents_rels" USING btree ("odyssey_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels" USING btree ("users_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "users" CASCADE;
  DROP TABLE "media" CASCADE;
  DROP TABLE "sponsors" CASCADE;
  DROP TABLE "groups_members" CASCADE;
  DROP TABLE "groups" CASCADE;
  DROP TABLE "people" CASCADE;
  DROP TABLE "applicants" CASCADE;
  DROP TABLE "awards_covers" CASCADE;
  DROP TABLE "awards" CASCADE;
  DROP TABLE "awardees" CASCADE;
  DROP TABLE "tdks" CASCADE;
  DROP TABLE "tdks_rels" CASCADE;
  DROP TABLE "faqs" CASCADE;
  DROP TABLE "reports" CASCADE;
  DROP TABLE "apply_timeline_event" CASCADE;
  DROP TABLE "about_timeline_event" CASCADE;
  DROP TABLE "stripe_transactions" CASCADE;
  DROP TABLE "events" CASCADE;
  DROP TABLE "community_pictures" CASCADE;
  DROP TABLE "course_categories" CASCADE;
  DROP TABLE "courses" CASCADE;
  DROP TABLE "odyssey_participants" CASCADE;
  DROP TABLE "odyssey" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TYPE "public"."enum_stripe_transactions_status";
  DROP TYPE "public"."enum_courses_icon";`)
}
