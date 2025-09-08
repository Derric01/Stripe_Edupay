"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/component/ui/card";
import { Badge } from "@/component/ui/badge";
import { Button } from "@/component/ui/button";
import { Separator } from "@/component/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/component/ui/tabs";
import Image from "next/image";
import PurchaseButton from "@/component/PurchaseButton";
import { 
  BookOpen, 
  CheckCircle, 
  Clock, 
  Globe, 
  Loader2Icon, 
  PlayCircle, 
  Star, 
  Users,
  Award,
  Download,
  Shield,
  Infinity
} from "lucide-react";

export default function CourseDetailPage({ params }: { params: { id: string } }) {
  const courseId = params.id as Id<"courses">;
  const course = useQuery(api.courses.getCourseById, { courseId });
  const hasAccess = useQuery(api.users.getCurrentUserCourseAccess, { courseId });

  if (course === undefined) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex justify-center items-center">
        <div className="text-center">
          <Loader2Icon className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading course details...</p>
        </div>
      </div>
    );
  }

  if (course === null) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex justify-center items-center">
        <Card className="max-w-md mx-4 shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-900">Course Not Found</CardTitle>
            <CardDescription className="text-lg">
              The course you&apos;re looking for doesn&apos;t exist or has been removed.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
              <a href="/courses">Browse All Courses</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Enhanced course details
  const courseDetails = {
    duration: "12 hours",
    lessons: 48,
    level: "Intermediate",
    lastUpdated: "September 2025",
    language: "English",
    students: 2847,
    rating: 4.9,
    reviews: 324,
    features: [
      "Lifetime access to all course materials",
      "48 comprehensive video lessons",
      "Practical exercises and projects",
      "Certificate of completion",
      "Downloadable resources and code files",
      "24/7 community support",
      "Mobile and desktop access",
      "30-day money-back guarantee"
    ],
    curriculum: [
      { title: "Getting Started", lessons: 5, duration: "1h 30m" },
      { title: "Core Concepts", lessons: 12, duration: "3h 45m" },
      { title: "Advanced Techniques", lessons: 15, duration: "4h 20m" },
      { title: "Real-World Projects", lessons: 10, duration: "2h 15m" },
      { title: "Best Practices", lessons: 6, duration: "1h 10m" }
    ]
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Course Header */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Badge className="bg-indigo-100 text-indigo-700 hover:bg-indigo-200">
                  {courseDetails.level}
                </Badge>
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-200">
                  Updated {courseDetails.lastUpdated}
                </Badge>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">
                {course.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-6 leading-relaxed">
                {course.description}
              </p>

              {/* Course Stats */}
              <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                  <span className="font-medium">{courseDetails.rating}</span>
                  <span>({courseDetails.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-indigo-500" />
                  <span>{courseDetails.students.toLocaleString()} students</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-purple-500" />
                  <span>{courseDetails.duration} total</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5 text-green-500" />
                  <span>{courseDetails.lessons} lessons</span>
                </div>
              </div>
            </div>

            {/* Course Image/Video */}
            <div className="relative mb-8 group">
              <div className="aspect-video bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl overflow-hidden shadow-xl">
                {course.imageUrl ? (
                  <Image 
                    src={course.imageUrl} 
                    alt={course.title}
                    width={800}
                    height={400}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <PlayCircle className="h-20 w-20 text-white opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300" />
                  </div>
                )}
              </div>
              {!hasAccess && (
                <div className="absolute inset-0 bg-black/50 rounded-xl flex items-center justify-center">
                  <div className="text-center text-white">
                    <PlayCircle className="h-16 w-16 mx-auto mb-4 opacity-80" />
                    <p className="text-lg font-medium">Preview Available After Purchase</p>
                  </div>
                </div>
              )}
            </div>

            {/* Course Details Tabs */}
            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-3 bg-gray-100 p-1 rounded-lg">
                <TabsTrigger value="overview" className="rounded-md">Overview</TabsTrigger>
                <TabsTrigger value="curriculum" className="rounded-md">Curriculum</TabsTrigger>
                <TabsTrigger value="reviews" className="rounded-md">Reviews</TabsTrigger>
              </TabsList>
              
              <TabsContent value="overview" className="mt-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <BookOpen className="h-5 w-5 text-indigo-600" />
                      What You&apos;ll Learn
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {courseDetails.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="curriculum" className="mt-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <PlayCircle className="h-5 w-5 text-indigo-600" />
                      Course Curriculum
                    </CardTitle>
                    <CardDescription>
                      {courseDetails.lessons} lessons • {courseDetails.duration} total length
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {courseDetails.curriculum.map((section, index) => (
                      <div key={index} className="border rounded-lg p-4 hover:bg-gray-50 transition-colors">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium text-gray-900">{section.title}</h4>
                            <p className="text-sm text-gray-600">
                              {section.lessons} lessons • {section.duration}
                            </p>
                          </div>
                          <PlayCircle className="h-5 w-5 text-indigo-500" />
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-6">
                <Card className="border-0 shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="h-5 w-5 text-yellow-500" />
                      Student Reviews
                    </CardTitle>
                    <CardDescription>
                      {courseDetails.rating} out of 5 stars ({courseDetails.reviews} reviews)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {/* Sample reviews */}
                      {[
                        { name: "Sarah Johnson", rating: 5, comment: "Absolutely amazing course! The instructor explains everything clearly and the projects are very practical.", time: "2 days ago" },
                        { name: "Mike Chen", rating: 5, comment: "Best course I've taken on this topic. Highly recommend to anyone looking to advance their skills.", time: "1 week ago" },
                        { name: "Emily Davis", rating: 4, comment: "Great content and well-structured. Could use a few more advanced examples but overall excellent.", time: "2 weeks ago" }
                      ].map((review, index) => (
                        <div key={index} className="border-b pb-4 last:border-b-0">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                              {review.name.charAt(0)}
                            </div>
                            <div>
                              <p className="font-medium text-gray-900">{review.name}</p>
                              <div className="flex items-center gap-1">
                                {[...Array(review.rating)].map((_, i) => (
                                  <Star key={i} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                                ))}
                                <span className="text-sm text-gray-500 ml-2">{review.time}</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-700">{review.comment}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 border-0 shadow-xl bg-white">
              <CardHeader className="text-center">
                <div className="text-4xl font-bold text-gray-900 mb-2">
                  ${course.price}
                </div>
                <CardDescription className="text-lg">
                  One-time payment • Lifetime access
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-6">
                {/* Purchase Button */}
                <PurchaseButton courseId={courseId} className="w-full text-lg py-3" />
                
                <Separator />
                
                {/* Course Features */}
                <div className="space-y-4">
                  <h4 className="font-semibold text-gray-900">This course includes:</h4>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Infinity className="h-5 w-5 text-indigo-600" />
                      <span className="text-gray-700">Lifetime access</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Download className="h-5 w-5 text-purple-600" />
                      <span className="text-gray-700">Downloadable resources</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Award className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">Certificate of completion</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Shield className="h-5 w-5 text-blue-600" />
                      <span className="text-gray-700">30-day money-back guarantee</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-orange-600" />
                      <span className="text-gray-700">Access on mobile and desktop</span>
                    </div>
                  </div>
                </div>
                
                <Separator />
                
                {/* Course Stats */}
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Students enrolled</span>
                    <span className="font-medium">{courseDetails.students.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Language</span>
                    <span className="font-medium">{courseDetails.language}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Last updated</span>
                    <span className="font-medium">{courseDetails.lastUpdated}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
