import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        email: v.string(),
        name: v.string(),
        clerkId: v.string(),
    }).index("by_clerkId", ["clerkId"]),

   courses: defineTable({
       title: v.string(),
       description: v.string(),
       imageUrl:v.string(),
       price:v.number(),
   }),

   purchases: defineTable({
       userId: v.id("users"),
       courseId: v.id("courses"),
       isPaid: v.boolean(),
       checkoutSessionId: v.optional(v.string()),
   }).index("by_userId", ["userId"])
     .index("by_courseId", ["courseId"])
     .index("by_userId_and_courseId", ["userId", "courseId"])
});