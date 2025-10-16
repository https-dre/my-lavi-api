import { db } from "@/database/conn";
import * as t from "@/database/tables";
import { FeedbackImageModel, FeedbackModel } from "@/shared/models";
import { IFeedbackRepository } from "@/shared/repositories";
import { randomUUID } from "crypto";
import { eq } from "drizzle-orm";

type InnerJoinWithImages = {
  feedbackPosts: FeedbackModel;
  feedbacImages: FeedbackImageModel;
};

export class FeedbackRepository implements IFeedbackRepository {
  async findWithInnerJoin(
    laundryId: string,
    page: number = 1,
    pageSize: number = 10
  ) {
    const result = await db
      .select()
      .from(t.feedbackPost)
      .where(eq(t.feedbackPost.laundryId, laundryId))
      .limit(pageSize)
      .offset((page - 1) * pageSize)
      .leftJoin(t.feedbackImage, eq(t.feedbackPost.id, t.feedbackImage.postId));

    return result[0].feedbackPosts;
  }
  async findByCustomerId(
    customerId: string,
    page: number = 1,
    pageSize: number = 10
  ): Promise<FeedbackModel[]> {
    const offset = (page - 1) * pageSize;
    const result = await db
      .select()
      .from(t.feedbackPost)
      .where(eq(t.feedbackPost.customerId, customerId))
      .limit(pageSize)
      .offset(offset);
    return result;
  }

  async findByLaundryId(
    customerId: string,
    page: number = 1,
    pageSize: number = 10
  ) {
    const offset = (page - 1) * pageSize;
    const result = await db
      .select()
      .from(t.feedbackPost)
      .where(eq(t.feedbackPost.customerId, customerId))
      .limit(pageSize)
      .offset(offset)
      .leftJoin(t.feedbackImage, eq(t.feedbackImage.postId, t.feedbackPost.id));
  }

  async save(
    data: Omit<FeedbackModel, "id" | "created_at">
  ): Promise<FeedbackModel> {
    const saved = await db
      .insert(t.feedbackPost)
      .values({
        ...data,
        id: randomUUID(),
      })
      .returning();
    return saved[0];
  }

  async saveImages(
    images: Omit<FeedbackImageModel, "id">[]
  ): Promise<FeedbackImageModel[]> {
    const saved = await db
      .insert(t.feedbackImage)
      .values(
        images.map((img) => {
          return {
            ...img,
            id: randomUUID(),
          };
        })
      )
      .returning();
    return saved;
  }

  async deleteById(id: string): Promise<void> {
    await db.delete(t.feedbackPost).where(eq(t.feedbackPost.id, id));
  }

  async deleteImage(key: string): Promise<void> {
    await db.delete(t.feedbackPost).where(eq(t.feedbackPost.id, key));
  }
  async findById(id: string): Promise<FeedbackModel> {
    const result = await db
      .select()
      .from(t.feedbackPost)
      .where(eq(t.feedbackPost.id, id));
    return result[0];
  }
}
