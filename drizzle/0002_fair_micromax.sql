CREATE TABLE "account" (
	"id" text PRIMARY KEY NOT NULL,
	"profile_url" text,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_blind_index" text NOT NULL,
	"cpf" text NOT NULL,
	"cpf_blind_index" text NOT NULL,
	"password" text NOT NULL,
	"role" text NOT NULL,
	"laundryId" text,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "owner_data" (
	"verified" boolean DEFAULT false,
	"birth_date" date NOT NULL,
	"cep" text NOT NULL,
	"accountId" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "owner" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "owner" CASCADE;--> statement-breakpoint
ALTER TABLE "laundry" DROP CONSTRAINT "laundry_ownerId_owner_id_fk";
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_laundryId_laundry_id_fk" FOREIGN KEY ("laundryId") REFERENCES "public"."laundry"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "owner_data" ADD CONSTRAINT "owner_data_accountId_account_id_fk" FOREIGN KEY ("accountId") REFERENCES "public"."account"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "laundry" DROP COLUMN "ownerId";