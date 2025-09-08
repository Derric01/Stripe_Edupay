"use client";

import { useQuery } from "convex/react";
import { useUser } from "@clerk/nextjs";
import { api } from "../../../convex/_generated/api";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/component/ui/card";
import { Badge } from "@/component/ui/badge";
import { Button } from "@/component/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/component/ui/tabs";
import { 
  BookOpen, 
  Clock, 
  Award, 
  TrendingUp, 
  PlayCircle, 
  CheckCircle,
  Download,
  Loader2Icon
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const { user } = useUser();
  const userData = useQuery(api.users.getUserByClerkId, user ? { clerkId: user.id } : "skip");
  const userPurchases = useQuery(api.purchases.getUserPurchases, userData ? { userId: userData._id } : "skip");

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <Card className="max-w-md mx-4 shadow-xl border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-gray-900">Please Sign In</CardTitle>
            <CardDescription className="text-lg">
              You need to be signed in to access your dashboard.
            </CardDescription>
          </CardHeader>
          <CardContent className="text-center">
            <Button asChild className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (userData === undefined || userPurchases === undefined) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex justify-center items-center">
        <div className="text-center">
          <Loader2Icon className="w-12 h-12 animate-spin text-indigo-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  const paidPurchases = userPurchases?.filter(purchase => purchase.isPaid) || [];
  const completedCourses = Math.floor(paidPurchases.length * 0.6); // Mock completion data
  const totalWatchTime = paidPurchases.length * 8; // Mock watch time

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
            Welcome back, {user.firstName}! 👋
          </h1>
          <p className="text-xl text-gray-600">
            Continue your learning journey and track your progress
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <StatsCard
            icon={<BookOpen className="h-8 w-8 text-indigo-600" />}
            title="Enrolled Courses"
            value={paidPurchases.length.toString()}
            subtitle="Active enrollments"
            gradient="from-indigo-500 to-blue-600"
          />
          <StatsCard
            icon={<CheckCircle className="h-8 w-8 text-green-600" />}
            title="Completed"
            value={completedCourses.toString()}
            subtitle="Courses finished"
            gradient="from-green-500 to-emerald-600"
          />
          <StatsCard
            icon={<Clock className="h-8 w-8 text-purple-600" />}
            title="Watch Time"
            value={`${totalWatchTime}h`}
            subtitle="Total learning time"
            gradient="from-purple-500 to-pink-600"
          />
          <StatsCard
            icon={<Award className="h-8 w-8 text-amber-600" />}
            title="Certificates"
            value={completedCourses.toString()}
            subtitle="Earned certificates"
            gradient="from-amber-500 to-orange-600"
          />
        </div>

        {/* Main Content */}
        <Tabs defaultValue="courses" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-white shadow-sm border border-gray-200 p-1 rounded-lg">
            <TabsTrigger value="courses" className="rounded-md">My Courses</TabsTrigger>
            <TabsTrigger value="progress" className="rounded-md">Progress</TabsTrigger>
            <TabsTrigger value="certificates" className="rounded-md">Certificates</TabsTrigger>
          </TabsList>

          <TabsContent value="courses" className="space-y-6">
            {paidPurchases.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paidPurchases
                  .filter((purchase) => purchase.course !== null)
                  .map((purchase) => (
                    <CourseCard
                      key={purchase._id}
                      course={purchase.course!}
                      progress={Math.floor(Math.random() * 100)} // Mock progress
                    />
                  ))}
              </div>
            ) : (
              <EmptyState
                icon={<BookOpen className="h-16 w-16 text-gray-400" />}
                title="No Courses Yet"
                description="Start your learning journey by enrolling in your first course"
                actionLabel="Browse Courses"
                actionHref="/courses"
              />
            )}
          </TabsContent>

          <TabsContent value="progress" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-indigo-600" />
                  Learning Progress
                </CardTitle>
                <CardDescription>
                  Track your learning journey and achievements
                </CardDescription>
              </CardHeader>
              <CardContent>
                {paidPurchases.length > 0 ? (
                  <div className="space-y-4">
                    {paidPurchases.map((purchase) => (
                      <ProgressItem
                        key={purchase._id}
                        title={purchase.course?.title || "Course"}
                        progress={Math.floor(Math.random() * 100)}
                        timeSpent={`${Math.floor(Math.random() * 10) + 1}h`}
                        lastAccessed="2 days ago"
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={<TrendingUp className="h-16 w-16 text-gray-400" />}
                    title="No Progress to Show"
                    description="Start learning to see your progress here"
                    actionLabel="Browse Courses"
                    actionHref="/courses"
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="certificates" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-amber-600" />
                  Your Certificates
                </CardTitle>
                <CardDescription>
                  Download and share your course completion certificates
                </CardDescription>
              </CardHeader>
              <CardContent>
                {completedCourses > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {paidPurchases.slice(0, completedCourses).map((purchase) => (
                      <CertificateCard
                        key={purchase._id}
                        courseTitle={purchase.course?.title || "Course"}
                        completedDate="September 2025"
                        certificateId={`CERT-${purchase._id.slice(-6).toUpperCase()}`}
                      />
                    ))}
                  </div>
                ) : (
                  <EmptyState
                    icon={<Award className="h-16 w-16 text-gray-400" />}
                    title="No Certificates Yet"
                    description="Complete courses to earn certificates"
                    actionLabel="View My Courses"
                    actionHref="#"
                  />
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card className="border-0 shadow-lg bg-gradient-to-r from-indigo-500 to-purple-600 text-white mt-8">
          <CardContent className="p-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-2xl font-bold mb-2">Ready to Learn More?</h3>
                <p className="text-indigo-100">
                  Discover new courses and expand your skillset today
                </p>
              </div>
              <Button
                asChild
                size="lg"
                className="bg-white text-indigo-600 hover:bg-gray-100 shadow-lg"
              >
                <Link href="/courses">
                  Explore Courses
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Stats Card Component
function StatsCard({ 
  icon, 
  title, 
  value, 
  subtitle, 
  gradient 
}: { 
  icon: React.ReactNode; 
  title: string; 
  value: string; 
  subtitle: string; 
  gradient: string;
}) {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-600 mb-1">{title}</p>
            <p className="text-3xl font-bold text-gray-900">{value}</p>
            <p className="text-sm text-gray-500">{subtitle}</p>
          </div>
          <div className={`p-3 rounded-full bg-gradient-to-r ${gradient}`}>
            {icon}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

// Course Card Component
function CourseCard({ 
  course, 
  progress 
}: { 
  course: {
    _id: string;
    title: string;
    description?: string;
    price?: number;
  }; 
  progress: number;
}) {
  return (
    <Card className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="aspect-video bg-gradient-to-r from-indigo-400 to-purple-500 rounded-t-lg relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <PlayCircle className="h-12 w-12 text-white opacity-80" />
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{course?.title}</h3>
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Progress</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        <Button 
          asChild 
          className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
        >
          <Link href={`/courses/${course?._id}`}>
            Continue Learning
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

// Progress Item Component
function ProgressItem({ 
  title, 
  progress, 
  timeSpent, 
  lastAccessed 
}: { 
  title: string; 
  progress: number; 
  timeSpent: string; 
  lastAccessed: string;
}) {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{title}</h4>
        <div className="flex items-center gap-4 text-sm text-gray-600 mt-1">
          <span>{timeSpent} watched</span>
          <span>Last accessed {lastAccessed}</span>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-sm font-medium text-gray-900">{progress}% complete</p>
          <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
            <div 
              className="bg-gradient-to-r from-indigo-500 to-purple-600 h-2 rounded-full"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Certificate Card Component
function CertificateCard({ 
  courseTitle, 
  completedDate, 
  certificateId 
}: { 
  courseTitle: string; 
  completedDate: string; 
  certificateId: string;
}) {
  return (
    <Card className="border-0 shadow-lg bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-4">
          <Award className="h-8 w-8 text-amber-600" />
          <Badge className="bg-amber-100 text-amber-700">Completed</Badge>
        </div>
        <h4 className="font-bold text-gray-900 mb-2">{courseTitle}</h4>
        <p className="text-sm text-gray-600 mb-1">Completed on {completedDate}</p>
        <p className="text-xs text-gray-500 mb-4">Certificate ID: {certificateId}</p>
        <Button 
          size="sm" 
          className="w-full bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-600 hover:to-orange-700"
        >
          <Download className="h-4 w-4 mr-2" />
          Download Certificate
        </Button>
      </CardContent>
    </Card>
  );
}

// Empty State Component
function EmptyState({ 
  icon, 
  title, 
  description, 
  actionLabel, 
  actionHref 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  actionLabel: string; 
  actionHref: string;
}) {
  return (
    <div className="text-center py-12">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-6 max-w-md mx-auto">{description}</p>
      <Button 
        asChild 
        className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700"
      >
        <Link href={actionHref}>{actionLabel}</Link>
      </Button>
    </div>
  );
}
