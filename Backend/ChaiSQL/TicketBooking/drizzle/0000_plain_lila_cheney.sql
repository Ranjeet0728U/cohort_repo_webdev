CREATE TYPE "public"."role" AS ENUM('customer', 'admin', 'seller');--> statement-breakpoint
CREATE TABLE "seats" (
	"id" serial PRIMARY KEY NOT NULL,
	"customer_id" uuid,
	"name" varchar(255) DEFAULT '' NOT NULL,
	"seat_number" text NOT NULL,
	"is_booked" boolean DEFAULT false NOT NULL,
	CONSTRAINT "seats_seat_number_unique" UNIQUE("seat_number")
);
--> statement-breakpoint
CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" varchar(50) NOT NULL,
	"email" varchar(322) NOT NULL,
	"password" varchar(255) NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"role" "role" DEFAULT 'customer' NOT NULL,
	"verification_token" text,
	"refresh_token" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "seats" ADD CONSTRAINT "seats_customer_id_users_id_fk" FOREIGN KEY ("customer_id") REFERENCES "public"."users"("id") ON DELETE set null ON UPDATE no action;