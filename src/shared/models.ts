import tables from "@/database/tables";

export type CustomerModel = Required<typeof tables.customer.$inferInsert>;

export type CustomerAddressModel = typeof tables.customerAddress.$inferInsert;

export type LaundryModel = Required<typeof tables.laundry.$inferInsert>;

export type LaundryBannerModel = typeof tables.laundryBanner.$inferInsert;

export type OrderModel = typeof tables.order.$inferSelect;

export type OrderItemModel = typeof tables.orderItem.$inferInsert;

export type FeedbackModel = typeof tables.feedbackPost.$inferInsert;

export type FeedbackImageModel = typeof tables.feedbackImage.$inferInsert;

export type AccountModel = typeof tables.account.$inferSelect;
