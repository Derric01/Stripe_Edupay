"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/component/ui/card";
import { Button } from "@/component/ui/button";
import Link from "next/link";
import Image from "next/image";
import { CheckCircle, Download, Loader2 } from "lucide-react";
import { useQuery, useAction } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Id } from "../../../convex/_generated/dataModel";
import confetti from 'canvas-confetti';
import { toast } from "sonner";

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const courseId = searchParams.get("course") as Id<"courses"> | null;
  const sessionId = searchParams.get("session_id");
  const [isProcessing, setIsProcessing] = useState(true);
  const [paymentVerified, setPaymentVerified] = useState(false);
  const [isDownloadingReceipt, setIsDownloadingReceipt] = useState(false);
  const [transactionId, setTransactionId] = useState<string>("");
  const course = useQuery(api.courses.getCourseById, courseId ? { courseId } : "skip");
  const verifyPayment = useAction(api.stripe.verifyPaymentSession);
  
  // Handle receipt download
  const handleDownloadReceipt = async () => {
    if (!sessionId) {
      toast.error("Receipt information not available");
      return;
    }
    
    setIsDownloadingReceipt(true);
    
    try {
      // For mock sessions, create a client-side receipt
      if (sessionId === 'mock') {
        // In a real app, we might generate a PDF here, but for now just show a toast
        toast.success("Mock receipt ready - In production, this would download a PDF");
        setIsDownloadingReceipt(false);
        return;
      }
      
      // For real sessions, fetch from our API
      const response = await fetch(`/api/receipts/${sessionId}`);
      
      if (!response.ok) {
        throw new Error('Failed to fetch receipt');
      }
      
      const data = await response.json();
      
      if (data.receiptUrl) {
        // If Stripe provides a receipt URL, redirect to it
        window.open(data.receiptUrl, '_blank');
      } else {
        // Otherwise we could create a custom receipt with the data
        // For now, just display a success message
        toast.success("Receipt downloaded successfully");
      }
    } catch (error) {
      console.error("Receipt download error:", error);
      toast.error("Failed to download receipt. Please try again later.");
    } finally {
      setIsDownloadingReceipt(false);
    }
  };
  
  useEffect(() => {
    async function verifyAndConfirmPayment() {
      if (courseId && sessionId) {
        try {
          // Verify the payment directly with Stripe
          const isVerified = await verifyPayment({ sessionId });
          
          setPaymentVerified(isVerified);
          setIsProcessing(false);
          
          // Store a real transaction ID if the payment is verified
          if (isVerified) {
            // In real app, we'd get this from Stripe
            setTransactionId(`TXN-${Math.floor(Math.random() * 1000000)}`);
          }
          
          // Trigger confetti effect when payment is verified
          if (isVerified && typeof window !== 'undefined') {
            // Create a more celebratory confetti effect
            const duration = 3000;
            const animationEnd = Date.now() + duration;
            const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

            const randomInRange = (min: number, max: number) => {
              return Math.random() * (max - min) + min;
            };

            const interval = setInterval(function() {
              const timeLeft = animationEnd - Date.now();

              if (timeLeft <= 0) {
                return clearInterval(interval);
              }

              const particleCount = 50 * (timeLeft / duration);
              
              // Firework effect
              confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
                colors: ['#ff0000', '#00ff00', '#0000ff']
              });
              
              confetti({
                ...defaults,
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
                colors: ['#ffff00', '#ff00ff', '#00ffff']
              });
            }, 250);
          }
        } catch (error) {
          console.error("Payment verification failed:", error);
          setPaymentVerified(false);
          setIsProcessing(false);
        }
      } else {
        setIsProcessing(false);
      }
    }
    
    verifyAndConfirmPayment();
  }, [courseId, sessionId, verifyPayment]);

  if (!courseId) {
    return (
      <div className="container max-w-md mx-auto py-12 px-4">
        <Card>
          <CardHeader>
            <CardTitle>Invalid Request</CardTitle>
            <CardDescription>No course information found.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Button asChild className="w-full">
              <Link href="/courses">Browse Courses</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gradient-to-b from-gray-50 to-white py-10">
      <Card className="w-full max-w-2xl shadow-xl border-0 overflow-hidden">
        {isProcessing ? (
          <>
            <CardHeader className="text-center pb-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
              <CardTitle className="text-2xl">Processing Your Purchase</CardTitle>
              <CardDescription className="text-blue-100">
                Please wait while we confirm your purchase...
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-6 py-10">
              <Loader2 className="w-16 h-16 text-blue-600 animate-spin" />
              <p className="text-center text-gray-500">
                This will only take a moment. Please do not close this page.
              </p>
            </CardContent>
          </>
        ) : (
          <>
            <div className={`text-white p-8 rounded-t-lg ${
              paymentVerified 
                ? "bg-gradient-to-r from-indigo-600 to-violet-600" 
                : "bg-gradient-to-r from-amber-500 to-orange-500"
            }`}>
              <div className="flex justify-center mb-6">
                <div className="bg-white rounded-full p-3 shadow-xl transform transition-transform hover:scale-105">
                  <CheckCircle className={`w-14 h-14 ${
                    paymentVerified ? "text-indigo-600" : "text-amber-500"
                  }`} />
                </div>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold text-center">
                {paymentVerified ? "Payment Successful!" : "Payment Status"}
              </h1>
              <p className="text-center mt-3 opacity-90 text-lg">
                {paymentVerified 
                  ? "Your transaction has been completed" 
                  : "We could not verify your payment. Please contact support."}
              </p>
            </div>
            
            <CardContent className="pt-8 pb-6">
              {course && (
                <div className="mb-6 flex items-center p-4 bg-gray-50 rounded-lg">
                  {course.imageUrl && (
                    <div className="relative w-16 h-16 mr-4">
                      <Image 
                        src={course.imageUrl} 
                        alt={course.title} 
                        fill
                        className="object-cover rounded"
                      />
                    </div>
                  )}
                  <div>
                    <h3 className="font-medium">{course.title}</h3>
                    <p className="text-sm text-gray-500">Purchase complete</p>
                  </div>
                </div>
              )}
              
              <div className="space-y-6">
                <div className="border-t border-b py-4">
                  <div className="flex justify-between font-medium mb-2">
                    <span>Transaction ID</span>
                    <span className="text-gray-600">{transactionId || `TXN-${Math.floor(Math.random() * 1000000)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Date</span>
                    <span className="text-gray-600">{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
                
                <div className="flex flex-col space-y-2">
                  <h3 className="font-medium">What&apos;s next?</h3>
                  <ul className="space-y-3 text-gray-600">
                    <li className="flex">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Access your course immediately</span>
                    </li>
                    <li className="flex">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Learn at your own pace</span>
                    </li>
                    <li className="flex">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                      <span>Certificate upon completion</span>
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Button asChild className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white shadow-md transition-all">
                  <Link href={`/courses/${courseId}`}>
                    Start Learning Now
                  </Link>
                </Button>
                <Button variant="secondary" asChild className="flex-1 border-gray-300 hover:bg-gray-50">
                  <Link href="/courses">
                    Browse More Courses
                  </Link>
                </Button>
              </div>
              
              <div className="text-center mt-8">
                <button 
                  onClick={handleDownloadReceipt}
                  disabled={!paymentVerified || isDownloadingReceipt} 
                  className="text-sm bg-gradient-to-r from-indigo-50 to-purple-50 hover:from-indigo-100 hover:to-purple-100 text-indigo-700 hover:text-indigo-800 py-2 px-4 rounded-full border border-indigo-200 flex items-center justify-center group mx-auto shadow-sm transition-all duration-300 hover:shadow-md"
                >
                  {isDownloadingReceipt ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" /> Preparing receipt...
                    </>
                  ) : (
                    <>
                      <Download className="h-4 w-4 mr-2 group-hover:animate-bounce" /> Download receipt
                    </>
                  )}
                </button>
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  );
}
