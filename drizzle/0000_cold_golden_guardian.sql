CREATE TABLE "customer" (
	"id" text PRIMARY KEY NOT NULL,
	"profile_url" text,
	"name" text,
	"email" text NOT NULL,
	"is_pj" boolean DEFAULT false,
	"document" varchar(14),
	"birth_date" text,
	"gender" text,
	"password" text,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "customer_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "customerAddress" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"latitude" numeric,
	"longitude" numeric,
	"customerId" text
);
--> statement-breakpoint
CREATE TABLE "employee" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"cpf" char(11),
	"email" varchar,
	"password" text,
	"laundryId" text,
	CONSTRAINT "employee_cpf_unique" UNIQUE("cpf"),
	CONSTRAINT "employee_email_unique" UNIQUE("email")
);
--> statement-breakpoint
CREATE TABLE "feedbackImage" (
	"id" text PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"postId" text
);
--> statement-breakpoint
CREATE TABLE "feedbackPost" (
	"id" text PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"rate" integer,
	"created_at" timestamp DEFAULT now(),
	"laundryId" text
);
--> statement-breakpoint
CREATE TABLE "laundry" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"address" text,
	"opening" varchar(30) DEFAULT '.',
	"longitude" numeric,
	"latitude" numeric,
	"cnpj" char(14),
	"bank_code" text,
	"bank_agency" integer,
	"account_number" text,
	"account_type" text,
	"type" text,
	"created_at" timestamp DEFAULT now(),
	"ownerId" text,
	CONSTRAINT "laundry_cnpj_unique" UNIQUE("cnpj"),
	CONSTRAINT "laundry_account_number_unique" UNIQUE("account_number")
);
--> statement-breakpoint
CREATE TABLE "laundryBanner" (
	"id" text PRIMARY KEY NOT NULL,
	"resource" text,
	"laundryId" text
);
--> statement-breakpoint
CREATE TABLE "order" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now(),
	"description" text,
	"status" text,
	"type" text,
	"details" text,
	"latitude" numeric,
	"longitude" numeric,
	"laundryId" text,
	"customerId" text
);
--> statement-breakpoint
CREATE TABLE "orderItem" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"services" text,
	"orderId" text
);
--> statement-breakpoint
CREATE TABLE "owner" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"cpf" char(11),
	"verified" boolean DEFAULT false,
	"email" text,
	"birth_date" text,
	"cep" char(8),
	CONSTRAINT "owner_cpf_unique" UNIQUE("cpf"),
	CONSTRAINT "owner_email_unique" UNIQUE("email")
);
--> statement-breakpoint
ALTER TABLE "customerAddress" ADD CONSTRAINT "customerAddress_customerId_customer_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."customer"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "employee" ADD CONSTRAINT "employee_laundryId_laundry_id_fk" FOREIGN KEY ("laundryId") REFERENCES "public"."laundry"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedbackImage" ADD CONSTRAINT "feedbackImage_postId_feedbackPost_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."feedbackPost"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedbackPost" ADD CONSTRAINT "feedbackPost_laundryId_laundry_id_fk" FOREIGN KEY ("laundryId") REFERENCES "public"."laundry"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "laundry" ADD CONSTRAINT "laundry_ownerId_owner_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."owner"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "laundryBanner" ADD CONSTRAINT "laundryBanner_laundryId_laundry_id_fk" FOREIGN KEY ("laundryId") REFERENCES "public"."laundry"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_laundryId_laundry_id_fk" FOREIGN KEY ("laundryId") REFERENCES "public"."laundry"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_customerId_customer_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."customer"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_orderId_order_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."order"("id") ON DELETE no action ON UPDATE no action;