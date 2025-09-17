import tables from "../../database/tables";

export type CustomerModel = typeof tables.customer.$inferInsert;

export type CustomerAddressModel = typeof tables.customerAddress.$inferInsert;

export type OwnerModel = Required<typeof tables.owner.$inferInsert>;

export type LaundryModel = typeof tables.laundry.$inferInsert;

export type LaundryBannerModel = typeof tables.laundryBanner.$inferInsert;

export type EmployeeModel = typeof tables.employee.$inferInsert;

export type OrderModel = typeof tables.order.$inferInsert;

export type OrderItemModel = typeof tables.orderItem.$inferInsert;

export type FeedbackModel = typeof tables.feedbackPost.$inferInsert;

export type FeedbackImageModel = typeof tables.feedbackImage.$inferInsert;
