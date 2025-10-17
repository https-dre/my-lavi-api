CREATE TABLE "laundryCatalogItems" (
	"id" text PRIMARY KEY NOT NULL,
	"color" text NOT NULL,
	"units" integer NOT NULL,
	"priceInCents" integer NOT NULL,
	"clothing" text NOT NULL,
	"wash_cycle" text NOT NULL,
	"laundryId" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "laundryCatalogItems" ADD CONSTRAINT "laundryCatalogItems_laundryId_laundries_id_fk" FOREIGN KEY ("laundryId") REFERENCES "public"."laundries"("id") ON DELETE cascade ON UPDATE no action;