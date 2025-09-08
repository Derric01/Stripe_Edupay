import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createPurchase = mutation({
  args: {
    userId: v.id("users"),
    courseId: v.id("courses"),
    isPaid: v.boolean(),
    checkoutSessionId: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const purchaseId = await ctx.db.insert("purchases", {
      userId: args.userId,
      courseId: args.courseId,
      isPaid: args.isPaid,
      checkoutSessionId: args.checkoutSessionId,
    });

    return purchaseId;
  },
});

export const updatePurchaseStatus = mutation({
  args: {
    checkoutSessionId: v.string(),
    isPaid: v.boolean(),
  },
  handler: async (ctx, args) => {
    const purchase = await ctx.db
      .query("purchases")
      .filter((q) => q.eq(q.field("checkoutSessionId"), args.checkoutSessionId))
      .first();

    if (!purchase) {
      throw new Error("Purchase not found");
    }

    await ctx.db.patch(purchase._id, {
      isPaid: args.isPaid,
    });

    return purchase._id;
  },
});

export const getUserPurchases = query({
  args: {
    userId: v.id("users"),
  },
  handler: async (ctx, args) => {
    const purchases = await ctx.db
      .query("purchases")
      .withIndex("by_userId", (q) => q.eq("userId", args.userId))
      .collect();

    // Fetch the course details for each purchase
    const purchasesWithCourses = await Promise.all(
      purchases.map(async (purchase) => {
        const course = await ctx.db.get(purchase.courseId);
        return {
          ...purchase,
          course,
        };
      })
    );

    return purchasesWithCourses;
  },
});

export const getCurrentUserPurchases = query({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    
    if (!identity) {
      return [];
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
      .first();
    
    if (!user) {
      return [];
    }

    const purchases = await ctx.db
      .query("purchases")
      .withIndex("by_userId", (q) => q.eq("userId", user._id))
      .collect();

    // Fetch the course details for each purchase
    const purchasesWithCourses = await Promise.all(
      purchases.map(async (purchase) => {
        const course = await ctx.db.get(purchase.courseId);
        return {
          ...purchase,
          course,
        };
      })
    );

    return purchasesWithCourses;
  },
});

// New query to get purchases by session ID
export const getPurchaseBySessionId = query({
  args: {
    checkoutSessionId: v.string(),
  },
  handler: async (ctx, args) => {
    const purchases = await ctx.db
      .query("purchases")
      .filter((q) => q.eq(q.field("checkoutSessionId"), args.checkoutSessionId))
      .collect();
    
    return purchases;
  },
});
