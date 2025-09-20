CREATE TABLE "customers" (
	"id" text PRIMARY KEY NOT NULL,
	"profile_url" text,
	"name" text NOT NULL,
	"email_blind_index" text NOT NULL,
	"email" text NOT NULL,
	"is_pj" boolean DEFAULT false NOT NULL,
	"doc_blind_index" text NOT NULL,
	"doc" text NOT NULL,
	"birth_date" date NOT NULL,
	"gender" text NOT NULL,
	"password" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "customers_email_blind_index_unique" UNIQUE("email_blind_index"),
	CONSTRAINT "customers_doc_blind_index_unique" UNIQUE("doc_blind_index")
);
--> statement-breakpoint
CREATE TABLE "customerAddresses" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text,
	"latitude" numeric,
	"longitude" numeric,
	"customerId" text
);
--> statement-breakpoint
CREATE TABLE "feedbackImages" (
	"id" text PRIMARY KEY NOT NULL,
	"url" text NOT NULL,
	"postId" text
);
--> statement-breakpoint
CREATE TABLE "feedbackPosts" (
	"id" text PRIMARY KEY NOT NULL,
	"content" text NOT NULL,
	"rate" integer,
	"created_at" timestamp DEFAULT now(),
	"laundryId" text,
	"customerId" text
);
--> statement-breakpoint
CREATE TABLE "laundries" (
	"id" text PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"profile_url" text,
	"address" text NOT NULL,
	"opening" text NOT NULL,
	"longitude" numeric NOT NULL,
	"latitude" numeric NOT NULL,
	"cnpj_blind_index" text,
	"cnpj" text NOT NULL,
	"bank_code" text NOT NULL,
	"bank_agency" text NOT NULL,
	"account_number" text NOT NULL,
	"account_type" text NOT NULL,
	"putEmployeeCode" text,
	"type" text NOT NULL,
	"created_at" timestamp DEFAULT now(),
	CONSTRAINT "laundries_cnpj_blind_index_unique" UNIQUE("cnpj_blind_index"),
	CONSTRAINT "laundries_cnpj_unique" UNIQUE("cnpj"),
	CONSTRAINT "laundries_account_number_unique" UNIQUE("account_number")
);
--> statement-breakpoint
CREATE TABLE "laundryBanners" (
	"id" text PRIMARY KEY NOT NULL,
	"resource" text,
	"resource_key" text,
	"laundryId" text
);
--> statement-breakpoint
CREATE TABLE "laundry_member" (
	"id" text PRIMARY KEY NOT NULL,
	"laundryId" text NOT NULL,
	"memberId" text NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "members" (
	"id" text PRIMARY KEY NOT NULL,
	"profile_url" text,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_blind_index" text NOT NULL,
	"cpf" text NOT NULL,
	"cpf_blind_index" text NOT NULL,
	"password" text NOT NULL,
	"roles" text[] NOT NULL,
	"created_at" timestamp DEFAULT now()
);
--> statement-breakpoint
CREATE TABLE "orders" (
	"id" text PRIMARY KEY NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp,
	"status" text NOT NULL,
	"delivery_type" text NOT NULL,
	"details" text NOT NULL,
	"latitude" numeric NOT NULL,
	"longitude" numeric NOT NULL,
	"laundryId" text NOT NULL,
	"customerId" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE "orderItems" (
	"id" text PRIMARY KEY NOT NULL,
	"qntd" integer NOT NULL,
	"unitPrice_inCents" integer NOT NULL,
	"name" text NOT NULL,
	"service" text NOT NULL,
	"orderId" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "customerAddresses" ADD CONSTRAINT "customerAddresses_customerId_customers_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedbackImages" ADD CONSTRAINT "feedbackImages_postId_feedbackPosts_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."feedbackPosts"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedbackPosts" ADD CONSTRAINT "feedbackPosts_laundryId_laundries_id_fk" FOREIGN KEY ("laundryId") REFERENCES "public"."laundries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedbackPosts" ADD CONSTRAINT "feedbackPosts_customerId_customers_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "laundryBanners" ADD CONSTRAINT "laundryBanners_laundryId_laundries_id_fk" FOREIGN KEY ("laundryId") REFERENCES "public"."laundries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "laundry_member" ADD CONSTRAINT "laundry_member_laundryId_laundries_id_fk" FOREIGN KEY ("laundryId") REFERENCES "public"."laundries"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "laundry_member" ADD CONSTRAINT "laundry_member_memberId_members_id_fk" FOREIGN KEY ("memberId") REFERENCES "public"."members"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_laundryId_laundries_id_fk" FOREIGN KEY ("laundryId") REFERENCES "public"."laundries"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orders" ADD CONSTRAINT "orders_customerId_customers_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."customers"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orderItems" ADD CONSTRAINT "orderItems_orderId_orders_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."orders"("id") ON DELETE cascade ON UPDATE no action;