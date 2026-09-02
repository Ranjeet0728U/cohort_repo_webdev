CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
	"first_name" varchar(45) NOT NULL,
	"last_name" varchar(45),
	"email" varchar(322) NOT NULL UNIQUE,
	"password" text NOT NULL,
	"email_verified" boolean DEFAULT false NOT NULL,
	"salt" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp
);
