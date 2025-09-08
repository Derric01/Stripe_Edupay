import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

export const createUser = mutation({
    args: {
        email: v.string(),
        name: v.string(),
        clerkId: v.string(),
    },
    handler: async (ctx, args) => {
        const existingUser = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
            .first();

        if (existingUser) {
            return existingUser._id;
        }

        const userId = await ctx.db.insert("users", {
            email: args.email,
            name: args.name,
            clerkId: args.clerkId,
        });

        return userId;
    },
});

export const getUserByClerkId = query({
    args: { clerkId: v.string() },
    handler: async (ctx, args) => {
        return await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", args.clerkId))
            .first();
    },
});

export const getUserCourseAccess = query({
    args: { 
        userId: v.id("users"),
        courseId: v.id("courses") 
    },
    handler: async (ctx, args) => {
        const purchase = await ctx.db
            .query("purchases")
            .withIndex("by_userId_and_courseId", (q) => 
                q.eq("userId", args.userId).eq("courseId", args.courseId)
            )
            .first();
        
        return purchase?.isPaid || false;
    },
});

export const getCurrentUserCourseAccess = query({
    args: { 
        courseId: v.id("courses") 
    },
    handler: async (ctx, args) => {
        const identity = await ctx.auth.getUserIdentity();
        
        if (!identity) {
            return false;
        }

        const user = await ctx.db
            .query("users")
            .withIndex("by_clerkId", (q) => q.eq("clerkId", identity.subject))
            .first();
        
        if (!user) {
            return false;
        }

        const purchase = await ctx.db
            .query("purchases")
            .withIndex("by_userId_and_courseId", (q) => 
                q.eq("userId", user._id).eq("courseId", args.courseId)
            )
            .first();
        
        return purchase?.isPaid || false;
    },
});