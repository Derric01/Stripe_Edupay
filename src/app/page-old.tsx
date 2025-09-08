import { ConvexHttpClient } from "convex/browser";
import { api } from "../../convex/_generated/api";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/component/ui/card";
import Link from "next/link";
import Image from "next/image";
import { SignedOut, SignInButton } from "@clerk/nextjs";
import { Button } from "@/component/ui/button";
import { Badge } from "@/component/ui/badge";
import { ArrowRight, CheckCircle, Users, Star, BookOpen } from "lucide-react";

export default async function Home() {
	const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);
	const courses = await convex.query(api.courses.getCourses);

	// Take only the first 3 featured courses
	const featuredCourses = courses.slice(0, 3);

	return (
		<div className="flex flex-col min-h-screen">
			{/* Hero Section */}
			<section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white py-20">
				<div className="container mx-auto px-4 text-center">
					<h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
						Unlock Your Potential with <br/> <span className="text-blue-200">Premium Courses</span>
					</h1>
					<p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-blue-100">
						Discover high-quality courses taught by industry experts and transform your skills today.
					</p>
					<div className="flex flex-col sm:flex-row justify-center gap-4">
						<Link href="/courses">
							<Button size="lg" className="bg-white text-blue-700 hover:bg-blue-50 py-6 px-8 text-lg">
								Browse Courses
							</Button>
						</Link>
						<SignedOut>
							<SignInButton>
								<Button variant="outline" size="lg" className="border-white text-white hover:bg-blue-700 py-6 px-8 text-lg">
									Sign In to Learn
								</Button>
							</SignInButton>
						</SignedOut>
					</div>
				</div>
			</section>

			{/* Features Section */}
			<section className="py-16 bg-gray-50">
				<div className="container mx-auto px-4">
					<h2 className="text-3xl font-bold text-center mb-12">Why Choose Our Platform</h2>
					
					<div className="grid md:grid-cols-3 gap-8">
						<div className="bg-white p-8 rounded-lg shadow-md text-center">
							<div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
								<BookOpen className="text-blue-600 h-8 w-8" />
							</div>
							<h3 className="text-xl font-semibold mb-3">Expert-Led Content</h3>
							<p className="text-gray-600">
								Learn from industry professionals with years of real-world experience in their fields.
							</p>
						</div>
						
						<div className="bg-white p-8 rounded-lg shadow-md text-center">
							<div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
								<Users className="text-blue-600 h-8 w-8" />
							</div>
							<h3 className="text-xl font-semibold mb-3">Community Support</h3>
							<p className="text-gray-600">
								Join a thriving community of learners to share insights and grow together.
							</p>
						</div>
						
						<div className="bg-white p-8 rounded-lg shadow-md text-center">
							<div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
								<Star className="text-blue-600 h-8 w-8" />
							</div>
							<h3 className="text-xl font-semibold mb-3">Premium Quality</h3>
							<p className="text-gray-600">
								Our courses are carefully crafted to ensure the highest quality educational experience.
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* Featured Courses Section */}
			<section className="py-16">
				<div className="container mx-auto px-4">
					<div className="flex justify-between items-center mb-10">
						<h2 className="text-3xl font-bold">Featured Courses</h2>
						<Link href="/courses" className="flex items-center text-blue-600 hover:text-blue-800">
							View All Courses <ArrowRight className="ml-2 h-4 w-4" />
						</Link>
					</div>
					
					<div className="grid md:grid-cols-3 gap-8">
						{featuredCourses.map((course) => (
							<Card key={course._id} className="overflow-hidden flex flex-col transition-all hover:shadow-lg">
								{course.imageUrl && (
									<div className="relative h-48 w-full">
										<Image
											src={course.imageUrl}
											alt={course.title}
											fill
											className="object-cover"
										/>
									</div>
								)}
								
								<CardHeader>
									<div className="flex justify-between items-start">
										<CardTitle className="text-xl">{course.title}</CardTitle>
										<Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">${course.price}</Badge>
									</div>
								</CardHeader>
								
								<CardContent className="flex-grow">
									<p className="text-gray-600 line-clamp-3">
										{course.description}
									</p>
									
									<div className="mt-4">
										<div className="flex items-center text-sm text-gray-500">
											<CheckCircle className="mr-1 h-4 w-4 text-green-500" />
											<span>Full lifetime access</span>
										</div>
									</div>
								</CardContent>
								
								<CardFooter className="border-t bg-gray-50 p-4">
									<Link href={`/courses/${course._id}`} className="w-full">
										<Button className="w-full bg-blue-600 hover:bg-blue-700">
											View Course
										</Button>
									</Link>
								</CardFooter>
							</Card>
						))}
					</div>
				</div>
			</section>

			{/* CTA Section */}
			<section className="py-16 bg-blue-50">
				<div className="container mx-auto px-4 text-center">
					<h2 className="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
					<p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
						Join thousands of students who are already advancing their careers with our courses.
					</p>
					<Link href="/courses">
						<Button size="lg" className="bg-blue-600 hover:bg-blue-700 py-6 px-8 text-lg">
							Explore All Courses
						</Button>
					</Link>
				</div>
			</section>
		</div>
	);
}