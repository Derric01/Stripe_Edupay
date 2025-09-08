"use client";

import Link from "next/link";
import { Button } from "@/component/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/component/ui/card";
import { Home, Search, ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* 404 Animation */}
        <div className="mb-8">
          <div className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
            404
          </div>
          <div className="w-24 h-1 bg-gradient-to-r from-indigo-500 to-purple-600 mx-auto rounded-full"></div>
        </div>

        <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-6">
            <CardTitle className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Oops! Page Not Found
            </CardTitle>
            <CardDescription className="text-lg text-gray-600 leading-relaxed">
              The page you&apos;re looking for seems to have wandered off into the digital void. 
              Don&apos;t worry, even the best explorers sometimes take a wrong turn!
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {/* Suggestions */}
            <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-900 mb-3">Here&apos;s what you can do:</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-indigo-500 rounded-full"></div>
                  Check if the URL is spelled correctly
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Go back to the previous page
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-pink-500 rounded-full"></div>
                  Visit our homepage to start fresh
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Browse our available courses
                </li>
              </ul>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button 
                asChild 
                size="lg"
                className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
              >
                <Link href="/">
                  <Home className="mr-2 h-5 w-5" />
                  Back to Home
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="border-2 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-300"
              >
                <Link href="/courses">
                  <Search className="mr-2 h-5 w-5" />
                  Browse Courses
                </Link>
              </Button>
              
              <Button 
                variant="ghost" 
                size="lg"
                onClick={() => window.history.back()}
                className="hover:bg-gray-100 transition-all duration-300"
              >
                <ArrowLeft className="mr-2 h-5 w-5" />
                Go Back
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Footer Message */}
        <div className="mt-8 text-gray-500 text-sm">
          <p>Still having trouble? Contact our support team and we&apos;ll help you find what you&apos;re looking for.</p>
        </div>
      </div>
    </div>
  );
}
