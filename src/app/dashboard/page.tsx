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
  Loader2Icon,
  GraduationCap,
  Target,
  Calendar,
  Star
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function DashboardPage() {
  const { user } = useUser();
  const userData = useQuery(api.users.getUserByClerkId, user ? { clerkId: user.id } : "skip");
  const userPurchases = useQuery(api.purchases.getUserPurchases, userData ? { userId: userData._id } : "skip");

  if (!user) {
    return (
      <div className="min-h-screen bg-slate-900 relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-yellow-900/20" />
        <motion.div
          className="absolute top-20 -left-10 w-72 h-72 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-10 right-20 w-72 h-72 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10"
        >
          <Card className="max-w-md mx-4 glass-card border-white/20 bg-white/10 backdrop-blur-md shadow-2xl">
            <CardHeader className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mx-auto mb-4 w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center"
              >
                <GraduationCap className="w-8 h-8 text-white" />
              </motion.div>
              <CardTitle className="text-2xl text-white">Please Sign In</CardTitle>
              <CardDescription className="text-lg text-slate-300">
                You need to be signed in to access your dashboard.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button asChild className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-none shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-xl transform hover:scale-105">
                <Link href="/sign-in">Sign In</Link>
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  if (userData === undefined || userPurchases === undefined) {
    return (
      <div className="min-h-screen bg-slate-900 relative overflow-hidden flex justify-center items-center">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-yellow-900/20" />
        <div className="relative z-10 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="inline-block mb-6"
          >
            <Loader2Icon className="w-16 h-16 text-purple-400" />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-8 shadow-2xl"
          >
            <h2 className="text-2xl font-semibold text-white mb-2">Loading Dashboard</h2>
            <p className="text-slate-300">Preparing your learning experience...</p>
          </motion.div>
        </div>
      </div>
    );
  }

  const paidPurchases = userPurchases?.filter(purchase => purchase.isPaid) || [];
  const completedCourses = Math.floor(paidPurchases.length * 0.6); // Mock completion data
  const totalWatchTime = paidPurchases.length * 8; // Mock watch time

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-yellow-900/20" />
        <motion.div
          className="absolute top-20 -left-10 w-96 h-96 bg-purple-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, 100, 0],
            y: [0, -100, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute top-40 -right-10 w-96 h-96 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />
        <motion.div
          className="absolute -bottom-10 left-20 w-96 h-96 bg-yellow-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-7xl">
        {/* Header */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400">
              Welcome back, {user.firstName}! 
            </span>
          </motion.h1>
          <motion.p 
            className="text-xl text-slate-300 max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Continue your learning journey and track your progress ✨
          </motion.p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <StatsCard
            icon={<BookOpen className="h-8 w-8" />}
            title="Enrolled Courses"
            value={paidPurchases.length.toString()}
            subtitle="Active enrollments"
            gradient="from-purple-500 to-purple-600"
            delay={0.8}
          />
          <StatsCard
            icon={<CheckCircle className="h-8 w-8" />}
            title="Completed"
            value={completedCourses.toString()}
            subtitle="Courses finished"
            gradient="from-green-500 to-emerald-600"
            delay={0.9}
          />
          <StatsCard
            icon={<Clock className="h-8 w-8" />}
            title="Watch Time"
            value={`${totalWatchTime}h`}
            subtitle="Total learning time"
            gradient="from-pink-500 to-pink-600"
            delay={1.0}
          />
          <StatsCard
            icon={<Award className="h-8 w-8" />}
            title="Certificates"
            value={completedCourses.toString()}
            subtitle="Earned certificates"
            gradient="from-yellow-500 to-orange-600"
            delay={1.1}
          />
        </motion.div>

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
        >
          <Tabs defaultValue="courses" className="space-y-8">
            <TabsList className="grid w-full grid-cols-3 backdrop-blur-md bg-white/10 border border-white/20 rounded-xl p-1 shadow-2xl">
              <TabsTrigger 
                value="courses" 
                className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg text-slate-300 hover:text-white transition-all duration-300"
              >
                My Courses
              </TabsTrigger>
              <TabsTrigger 
                value="progress" 
                className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg text-slate-300 hover:text-white transition-all duration-300"
              >
                Progress
              </TabsTrigger>
              <TabsTrigger 
                value="certificates" 
                className="rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white data-[state=active]:shadow-lg text-slate-300 hover:text-white transition-all duration-300"
              >
                Certificates
              </TabsTrigger>
            </TabsList>

            <TabsContent value="courses" className="space-y-6">
              {paidPurchases.length > 0 ? (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.4 }}
                >
                  {paidPurchases
                    .filter((purchase) => purchase.course !== null)
                    .map((purchase, index) => (
                      <motion.div
                        key={purchase._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                      >
                        <CourseCard
                          course={purchase.course!}
                          progress={Math.floor(Math.random() * 100)} // Mock progress
                        />
                      </motion.div>
                    ))}
                </motion.div>
              ) : (
                <EmptyState
                  icon={<BookOpen className="h-20 w-20 text-purple-400" />}
                  title="No Courses Yet"
                  description="Start your learning journey by enrolling in your first course"
                  actionLabel="Browse Courses"
                  actionHref="/courses"
                />
              )}
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              <Card className="glass-card border-white/20 bg-white/10 backdrop-blur-md shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    <TrendingUp className="h-6 w-6 text-purple-400" />
                    Learning Progress
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Track your learning journey and achievements
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {paidPurchases.length > 0 ? (
                    <div className="space-y-4">
                      {paidPurchases.map((purchase, index) => (
                        <motion.div
                          key={purchase._id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                        >
                          <ProgressItem
                            title={purchase.course?.title || "Course"}
                            progress={Math.floor(Math.random() * 100)}
                            timeSpent={`${Math.floor(Math.random() * 10) + 1}h`}
                            lastAccessed="2 days ago"
                          />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <EmptyState
                      icon={<TrendingUp className="h-20 w-20 text-purple-400" />}
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
              <Card className="glass-card border-white/20 bg-white/10 backdrop-blur-md shadow-2xl">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-white">
                    <Award className="h-6 w-6 text-yellow-400" />
                    Your Certificates
                  </CardTitle>
                  <CardDescription className="text-slate-300">
                    Download and share your course completion certificates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {completedCourses > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {paidPurchases.slice(0, completedCourses).map((purchase, index) => (
                        <motion.div
                          key={purchase._id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5, delay: 1.6 + index * 0.1 }}
                        >
                          <CertificateCard
                            courseTitle={purchase.course?.title || "Course"}
                            completedDate="September 2024"
                            certificateId={`CERT-${purchase._id.slice(-6).toUpperCase()}`}
                          />
                        </motion.div>
                      ))}
                    </div>
                  ) : (
                    <EmptyState
                      icon={<Award className="h-20 w-20 text-purple-400" />}
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
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.8 }}
        >
          <Card className="glass-card border-white/20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-md shadow-2xl mt-12">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="mb-6 md:mb-0">
                  <h3 className="text-3xl font-bold mb-3 text-white">Ready to Learn More?</h3>
                  <p className="text-slate-300 text-lg">
                    Discover new courses and expand your skillset today ✨
                  </p>
                </div>
                <Button
                  asChild
                  size="lg"
                  className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-none shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-xl transform hover:scale-105 px-8 py-3"
                >
                  <Link href="/courses">
                    Explore Courses
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
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
  gradient,
  delay = 0
}: { 
  icon: React.ReactNode; 
  title: string; 
  value: string; 
  subtitle: string; 
  gradient: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <Card className="glass-card hover:glass-card-hover border-white/20 bg-white/10 backdrop-blur-md shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-400 mb-2">{title}</p>
              <p className="text-4xl font-bold text-white mb-1">{value}</p>
              <p className="text-sm text-slate-300">{subtitle}</p>
            </div>
            <div className={`p-4 rounded-2xl bg-gradient-to-r ${gradient} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
              <div className="text-white">
                {icon}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
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
    <Card className="glass-card hover:glass-card-hover border-white/20 bg-white/10 backdrop-blur-md shadow-2xl transition-all duration-500 transform hover:-translate-y-2 group">
      <div className="aspect-video bg-gradient-to-r from-purple-500 to-pink-500 rounded-t-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <PlayCircle className="h-16 w-16 text-white opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.div>
        </div>
        <div className="absolute top-4 right-4">
          <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-black font-semibold shadow-lg">
            Premium
          </Badge>
        </div>
      </div>
      <CardContent className="p-6">
        <h3 className="font-bold text-white mb-4 line-clamp-2 text-lg group-hover:text-purple-300 transition-colors duration-300">
          {course?.title}
        </h3>
        <div className="mb-6">
          <div className="flex justify-between text-sm text-slate-300 mb-2">
            <span>Progress</span>
            <span className="font-semibold">{progress}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3 overflow-hidden">
            <motion.div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-3 rounded-full shadow-lg"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: 0.5 }}
            />
          </div>
        </div>
        <Button 
          asChild 
          className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-none shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-xl transform hover:scale-[1.02]"
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
    <div className="flex items-center justify-between p-6 backdrop-blur-md bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-all duration-300 group">
      <div className="flex-1">
        <h4 className="font-semibold text-white mb-2 group-hover:text-purple-300 transition-colors duration-300">{title}</h4>
        <div className="flex items-center gap-6 text-sm text-slate-400">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-purple-400" />
            <span>{timeSpent} watched</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4 text-pink-400" />
            <span>Last accessed {lastAccessed}</span>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-6">
        <div className="text-right">
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <p className="text-sm font-semibold text-white">{progress}% complete</p>
          </div>
          <div className="w-32 bg-slate-700 rounded-full h-2 overflow-hidden">
            <motion.div 
              className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: 0.2 }}
            />
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
    <Card className="glass-card border-yellow-400/30 bg-gradient-to-br from-yellow-500/10 to-orange-500/10 backdrop-blur-md shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500 transform hover:-translate-y-1 group">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-6">
          <motion.div
            whileHover={{ rotate: 10, scale: 1.1 }}
            transition={{ duration: 0.2 }}
          >
            <Award className="h-10 w-10 text-yellow-400" />
          </motion.div>
          <Badge className="bg-gradient-to-r from-green-400 to-emerald-500 text-white border-none shadow-lg">
            Completed
          </Badge>
        </div>
        <h4 className="font-bold text-white mb-3 group-hover:text-yellow-300 transition-colors duration-300">{courseTitle}</h4>
        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <Calendar className="w-4 h-4 text-yellow-400" />
            <span>Completed on {completedDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Target className="w-4 h-4 text-orange-400" />
            <span>Certificate ID: {certificateId}</span>
          </div>
        </div>
        <Button 
          size="sm" 
          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white border-none shadow-lg shadow-yellow-500/25 transition-all duration-300 hover:shadow-xl transform hover:scale-[1.02]"
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
    <motion.div 
      className="text-center py-20 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-2xl"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div 
        className="mb-6"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        {icon}
      </motion.div>
      <h3 className="text-2xl font-semibold text-white mb-4">{title}</h3>
      <p className="text-slate-300 mb-8 max-w-md mx-auto text-lg leading-relaxed">{description}</p>
      <Button 
        asChild 
        className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-none shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-xl transform hover:scale-105 px-8 py-3"
      >
        <Link href={actionHref}>{actionLabel}</Link>
      </Button>
    </motion.div>
  );
}
