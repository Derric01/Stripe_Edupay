"use client";

import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/component/ui/card";
import { Badge } from "@/component/ui/badge";
import { Button } from "@/component/ui/button";
import { BookOpen, CheckCircle, Loader2Icon, Star, Users } from "lucide-react";
import { Input } from "@/component/ui/input";
import { useState } from "react";

export default function CoursesPage() {
  const courses = useQuery(api.courses.getCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");

  if (courses === undefined) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2Icon className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (courses.length === 0) {
    return (
      <div className="container max-w-6xl mx-auto py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">No Courses Available</h1>
          <p className="text-muted-foreground">Check back later for new courses.</p>
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
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container max-w-7xl mx-auto py-12 px-4 sm:px-6">
        {/* Hero section */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl mb-4">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              Browse All Courses
            </span>
          </h1>
          <p className="max-w-3xl mx-auto text-xl text-gray-600">
            Discover high-quality courses taught by industry experts and take your skills to the next level.
          </p>
        </div>
        
        {/* Filters and Search */}
        <div className="mb-8 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between bg-white p-6 rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-wrap gap-2 order-2 md:order-1">
            {categories.map(category => (
              <Button 
                key={category.id}
                variant={filter === category.id ? "default" : "outline"}
                onClick={() => setFilter(category.id)}
                className={`mb-2 ${filter === category.id ? "bg-blue-600 hover:bg-blue-700" : ""}`}
              >
                {category.name} <span className="ml-2 bg-gray-100 text-gray-800 rounded-full px-2 py-0.5 text-xs font-medium">{category.count}</span>
              </Button>
            ))}
          </div>
          <div className="w-full md:w-80 order-1 md:order-2">
            <div className="relative">
              <Input
                placeholder="Search courses..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10"
              />
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>
        </div>
      
        {/* Course Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course) => (
              <Card 
                key={course._id} 
                className="overflow-hidden flex flex-col h-full group hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-0 bg-white"
              >
                {course.imageUrl && (
                  <div className="relative h-52 w-full overflow-hidden">
                    <Image 
                      src={course.imageUrl} 
                      alt={course.title} 
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <Badge className="absolute top-3 right-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 py-1.5 px-3 text-sm font-medium shadow-lg">
                      ${course.price}
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="pb-2">
                  <CardTitle className="line-clamp-1 text-lg font-bold group-hover:text-indigo-600 transition-colors">{course.title}</CardTitle>
                  <div className="flex items-center mt-2">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-500">(24 reviews)</span>
                  </div>
                </CardHeader>
                
                <CardContent className="flex-grow pb-3">
                  <CardDescription className="line-clamp-3 mb-4 text-gray-600">
                    {course.description}
                  </CardDescription>
                  
                  <div className="flex flex-wrap gap-y-2">
                    <div className="w-1/2 flex items-center text-sm text-gray-600">
                      <BookOpen className="h-4 w-4 mr-2 text-indigo-500" />
                      <span>12 lessons</span>
                    </div>
                    <div className="w-1/2 flex items-center text-sm text-gray-600">
                      <Users className="h-4 w-4 mr-2 text-indigo-500" />
                      <span>Beginner</span>
                    </div>
                    <div className="w-full flex items-center text-sm text-gray-600 mt-1">
                      <CheckCircle className="h-4 w-4 mr-2 text-green-500" />
                      <span>Certificate of completion</span>
                    </div>
                  </div>
                </CardContent>
                
                <CardFooter className="pt-0 pb-6">
                  <Button asChild className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-md transition-all duration-300 hover:shadow-lg">
                    <Link href={`/courses/${course._id}`}>
                      View Course
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-lg shadow-sm border border-gray-100 max-w-xl mx-auto">
            <BookOpen className="w-16 h-16 text-indigo-300 mx-auto mb-5" />
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">No courses found</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">Try adjusting your search or filter criteria to find the perfect course for you.</p>
            <Button 
              onClick={() => {setSearchTerm(""); setFilter("all");}}
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-6 py-2 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
            >
              Reset Filters
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
