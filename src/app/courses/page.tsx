"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/component/ui/card";
import { Badge } from "@/component/ui/badge";
import { Button } from "@/component/ui/button";
import { BookOpen, CheckCircle, Loader2Icon, Star, Users, Search } from "lucide-react";
import { Input } from "@/component/ui/input";
import { useState } from "react";
import { motion } from "framer-motion";

export default function CoursesPage() {
  const courses = useQuery(api.courses.getCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  if (courses === undefined) {
    return (
      <div className="min-h-screen bg-slate-900 flex justify-center items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-yellow-900/20" />
        <div className="relative z-10 text-center">
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="inline-block"
          >
            <Loader2Icon className="w-12 h-12 text-purple-400" />
          </motion.div>
          <motion.p 
            className="mt-4 text-slate-300 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Loading courses...
          </motion.p>
        </div>
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="min-h-screen bg-slate-900 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-pink-900/20 to-yellow-900/20" />
        <div className="relative z-10 container max-w-6xl mx-auto py-20">
          <motion.div 
            className="text-center backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-12 shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <BookOpen className="w-20 h-20 text-purple-400 mx-auto mb-6" />
            </motion.div>
            <h1 className="text-3xl font-bold mb-4 text-white">No Courses Available</h1>
            <p className="text-slate-300 text-lg">Check back later for new courses to explore.</p>
          </motion.div>
        </div>
      </div>
    );
  }

  // Filter and search courses
  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                        course.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === "all") return matchesSearch;
    if (filter === "low") return matchesSearch && course.price < 50;
    if (filter === "mid") return matchesSearch && course.price >= 50 && course.price < 100;
    if (filter === "high") return matchesSearch && course.price >= 100;
    
    return matchesSearch;
  });

  // Create category counts for display
  const categories = [
    { id: "all", name: "All Courses", count: courses.length },
    { id: "low", name: "Under $50", count: courses.filter(c => c.price < 50).length },
    { id: "mid", name: "$50 - $99", count: courses.filter(c => c.price >= 50 && c.price < 100).length },
    { id: "high", name: "$100+", count: courses.filter(c => c.price >= 100).length },
  ];

  return (
    <div className="min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
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
          className="absolute top-40 -right-10 w-72 h-72 bg-pink-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70"
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
          className="absolute -bottom-10 left-20 w-72 h-72 bg-yellow-500/30 rounded-full mix-blend-multiply filter blur-xl opacity-70"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="relative z-10 container max-w-7xl mx-auto py-12 px-4 sm:px-6">
        {/* Hero section */}
        <motion.div 
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-extrabold mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400">
              Explore Courses
            </span>
          </motion.h1>
          <motion.p 
            className="max-w-3xl mx-auto text-xl text-slate-300 leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Discover world-class courses that transform knowledge into achievement. 
            Learn from industry experts and unlock your potential.
          </motion.p>
        </motion.div>
        
        {/* Filters and Search */}
        <motion.div 
          className="mb-12 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl p-6 shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex flex-col lg:flex-row gap-6 items-start lg:items-center justify-between">
            <div className="flex flex-wrap gap-3 order-2 lg:order-1">
              {categories.map((category, index) => (
                <motion.div
                  key={category.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.1 }}
                >
                  <Button 
                    variant={filter === category.id ? "default" : "outline"}
                    onClick={() => setFilter(category.id)}
                    className={`transition-all duration-300 transform hover:scale-105 ${
                      filter === category.id 
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg shadow-purple-500/25 border-none" 
                        : "bg-white/10 text-white border-white/30 hover:bg-white/20 hover:border-white/50"
                    }`}
                  >
                    {category.name} 
                    <span className={`ml-2 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      filter === category.id 
                        ? "bg-white/20 text-white" 
                        : "bg-purple-500/20 text-purple-300"
                    }`}>
                      {category.count}
                    </span>
                  </Button>
                </motion.div>
              ))}
            </div>
            
            <motion.div 
              className="w-full lg:w-80 order-1 lg:order-2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <div className="relative">
                <Input
                  placeholder="Search courses..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 bg-white/10 border-white/30 text-white placeholder-slate-400 rounded-xl focus:bg-white/20 focus:border-purple-400 transition-all duration-300"
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      
        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1 }}
          >
            {filteredCourses.map((course, index) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1.2 + index * 0.1 }}
                className="group"
              >
                <Card className="overflow-hidden flex flex-col h-full glass-card hover:glass-card-hover transition-all duration-500 transform hover:-translate-y-2 border-white/20 bg-white/10 backdrop-blur-md">
                  {course.imageUrl && (
                    <div className="relative h-52 w-full overflow-hidden">
                      <Image 
                        src={course.imageUrl} 
                        alt={course.title} 
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <Badge className="absolute top-4 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-none shadow-lg shadow-purple-500/25 px-3 py-1.5">
                        ${course.price}
                      </Badge>
                    </div>
                  )}
                  
                  <CardHeader className="pb-3">
                    <CardTitle className="line-clamp-2 text-lg font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                      {course.title}
                    </CardTitle>
                    <div className="flex items-center mt-3">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-slate-400">(24 reviews)</span>
                    </div>
                  </CardHeader>
                  
                  <CardContent className="flex-grow pb-4">
                    <CardDescription className="line-clamp-3 mb-6 text-slate-300 leading-relaxed">
                      {course.description}
                    </CardDescription>
                    
                    <div className="space-y-3">
                      <div className="flex items-center text-sm text-slate-400">
                        <BookOpen className="h-4 w-4 mr-3 text-purple-400" />
                        <span>12 comprehensive lessons</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-400">
                        <Users className="h-4 w-4 mr-3 text-pink-400" />
                        <span>Beginner friendly</span>
                      </div>
                      <div className="flex items-center text-sm text-slate-400">
                        <CheckCircle className="h-4 w-4 mr-3 text-green-400" />
                        <span>Certificate included</span>
                      </div>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="pt-0 pb-6">
                    <Button asChild className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white border-none shadow-lg shadow-purple-500/25 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/30 transform hover:scale-[1.02]">
                      <Link href={`/courses/${course._id}`}>
                        Explore Course
                      </Link>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div 
            className="text-center py-20 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl max-w-xl mx-auto shadow-2xl"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 1.4 }}
            >
              <BookOpen className="w-20 h-20 text-purple-400 mx-auto mb-6" />
            </motion.div>
            <h2 className="text-2xl font-semibold mb-4 text-white">No courses found</h2>
            <p className="text-slate-300 mb-8 max-w-md mx-auto leading-relaxed">
              Try adjusting your search or filter criteria to discover the perfect course for your learning journey.
            </p>
            <Button 
              onClick={() => {setSearchTerm(""); setFilter("all");}}
              className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-8 py-3 rounded-xl shadow-lg shadow-purple-500/25 hover:shadow-xl hover:shadow-purple-500/30 transition-all duration-300 transform hover:scale-105 border-none"
            >
              Reset Filters
            </Button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
