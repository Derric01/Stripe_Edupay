import { mutation } from "./_generated/server";
import { v } from "convex/values";
import { Id } from "./_generated/dataModel";

export const createPendingPurchase = mutation({
  args: {
    userId: v.id("users"),
    courseId: v.id("courses"),
    checkoutSessionId: v.string(),
  },
  handler: async (ctx, args): Promise<Id<"purchases">> => {
    return await ctx.db.insert("purchases", {
      userId: args.userId,
      courseId: args.courseId,
      isPaid: false,
      checkoutSessionId: args.checkoutSessionId
    });
  },
});

export const confirmPurchase = mutation({
  args: {
    checkoutSessionId: v.string(),
  },
  handler: async (ctx, args): Promise<Id<"purchases">> => {
    const purchase = await ctx.db
      .query("purchases")
      .filter((q) => q.eq(q.field("checkoutSessionId"), args.checkoutSessionId))
      .first();

    if (!purchase) {
      throw new Error("Purchase not found");
    }

    await ctx.db.patch(purchase._id, {
      isPaid: true,
    });

    return purchase._id;
  },
});
