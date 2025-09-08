"use client";

import { useUser } from "@clerk/nextjs";
import { Id } from "../../convex/_generated/dataModel";
import { useAction, useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { Button } from "./ui/button";
import { Loader2Icon, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface PurchaseButtonProps {
  courseId: Id<"courses">;
  className?: string;
}

const PurchaseButton = ({ courseId, className }: PurchaseButtonProps) => {
  const { user, isSignedIn } = useUser();
  const userData = useQuery(api.users.getUserByClerkId, user ? { clerkId: user?.id } : "skip");
  const [isLoading, setIsLoading] = useState(false);
  const createCheckoutSession = useAction(api.stripe.createCheckoutSession);

  const userAccess = useQuery(
    api.users.getCurrentUserCourseAccess,
    userData ? { courseId } : "skip"
  );

  const handlePurchase = async () => {
    if (!isSignedIn) {
      return toast.error("Please log in to purchase this course", { 
        id: "login-error",
        duration: 3000,
        position: "top-center"
      });
    }
    
    setIsLoading(true);
    try {
      const result = await createCheckoutSession({ courseId });
      if (result.checkoutUrl) {
        window.location.href = result.checkoutUrl;
      } else {
        throw new Error("Failed to create checkout session");
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error";
      if (errorMessage.includes("Rate limit exceeded")) {
        toast.error("You've tried too many times. Please try again later.", {
          position: "top-center",
          duration: 3000
        });
      } else {
        toast.error(errorMessage || "Something went wrong. Please try again later.", {
          position: "top-center",
          duration: 3000
        });
      }
      console.error("Purchase error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (userAccess === false) {
    return (
      <Button 
        className={cn(
          "relative overflow-hidden font-medium bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg transition-all",
          "before:absolute before:inset-0 before:bg-white before:opacity-0 before:transform before:scale-x-0 before:transition-transform hover:before:opacity-10 hover:before:scale-x-100",
          className
        )} 
        onClick={handlePurchase} 
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2Icon className="mr-2 size-4 animate-spin" />
            Processing...
          </>
        ) : (
          <>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Enroll Now
          </>
        )}
      </Button>
    );
  }

  if (userAccess === true) {
    return (
      <Button 
        variant="outline" 
        className={cn(
          "bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 text-green-700 hover:bg-green-100 hover:text-green-800 shadow-sm",
          "transition-all duration-300 hover:scale-105",
          className
        )}
        disabled
      >
        ✓ Enrolled
      </Button>
    );
  }

  // Default loading state
  return (
    <Button className={cn(className)} disabled>
      <Loader2Icon className="mr-2 size-4 animate-spin" />
      Loading...
    </Button>
  );
};

export default PurchaseButton;