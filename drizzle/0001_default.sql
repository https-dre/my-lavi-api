ALTER TABLE "customerAddress" DROP CONSTRAINT "customerAddress_customerId_customer_id_fk";
--> statement-breakpoint
ALTER TABLE "feedbackImage" DROP CONSTRAINT "feedbackImage_postId_feedbackPost_id_fk";
--> statement-breakpoint
ALTER TABLE "feedbackPost" DROP CONSTRAINT "feedbackPost_laundryId_laundry_id_fk";
--> statement-breakpoint
ALTER TABLE "laundry" DROP CONSTRAINT "laundry_ownerId_owner_id_fk";
--> statement-breakpoint
ALTER TABLE "laundryBanner" DROP CONSTRAINT "laundryBanner_laundryId_laundry_id_fk";
--> statement-breakpoint
ALTER TABLE "order" DROP CONSTRAINT "order_laundryId_laundry_id_fk";
--> statement-breakpoint
ALTER TABLE "order" DROP CONSTRAINT "order_customerId_customer_id_fk";
--> statement-breakpoint
ALTER TABLE "orderItem" DROP CONSTRAINT "orderItem_orderId_order_id_fk";
--> statement-breakpoint
ALTER TABLE "feedbackPost" ADD COLUMN "customerId" text;--> statement-breakpoint
ALTER TABLE "customerAddress" ADD CONSTRAINT "customerAddress_customerId_customer_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."customer"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedbackImage" ADD CONSTRAINT "feedbackImage_postId_feedbackPost_id_fk" FOREIGN KEY ("postId") REFERENCES "public"."feedbackPost"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedbackPost" ADD CONSTRAINT "feedbackPost_customerId_customer_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."customer"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "feedbackPost" ADD CONSTRAINT "feedbackPost_laundryId_laundry_id_fk" FOREIGN KEY ("laundryId") REFERENCES "public"."laundry"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "laundry" ADD CONSTRAINT "laundry_ownerId_owner_id_fk" FOREIGN KEY ("ownerId") REFERENCES "public"."owner"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "laundryBanner" ADD CONSTRAINT "laundryBanner_laundryId_laundry_id_fk" FOREIGN KEY ("laundryId") REFERENCES "public"."laundry"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_laundryId_laundry_id_fk" FOREIGN KEY ("laundryId") REFERENCES "public"."laundry"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "order" ADD CONSTRAINT "order_customerId_customer_id_fk" FOREIGN KEY ("customerId") REFERENCES "public"."customer"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "orderItem" ADD CONSTRAINT "orderItem_orderId_order_id_fk" FOREIGN KEY ("orderId") REFERENCES "public"."order"("id") ON DELETE cascade ON UPDATE no action;