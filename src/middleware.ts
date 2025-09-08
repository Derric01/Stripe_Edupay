import { clerkMiddleware } from "@clerk/nextjs/server";
 
// This protects all routes using Clerk authentication
export default clerkMiddleware();
 
export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};