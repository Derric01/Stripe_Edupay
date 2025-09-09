import Link from "next/link";
import { Button } from "@/component/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/component/ui/card";
import { Badge } from "@/component/ui/badge";
import { Users, Star, ArrowRight, Zap, Shield, Trophy } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-purple-500/5"></div>
        <div className="container mx-auto max-w-7xl relative">
          <div className="text-center">
            <Badge className="mb-6 bg-gradient-to-r from-indigo-500 to-purple-600 text-white px-4 py-2 text-sm font-medium rounded-full shadow-lg">
              🚀 New Platform Launch
            </Badge>
            <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 mb-6 leading-tight">
              Learn. Pay. 
              <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Excel.
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              Transform your skills with our premium courses. Secure payments, instant access, and lifetime learning guaranteed.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                asChild 
                size="lg"
                className="text-lg px-8 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105"
              >
                <Link href="/courses">
                  Explore Courses <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-4 border-2 border-indigo-200 hover:bg-indigo-50 hover:border-indigo-400 transition-all duration-300"
              >
                Watch Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Choose <span className="text-indigo-600">EduPay</span>?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Experience the perfect blend of premium education and seamless payment processing
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Shield className="h-8 w-8 text-indigo-600" />}
              title="Secure Payments"
              description="Bank-level security with Stripe integration. Your payment data is always protected."
              gradient="from-indigo-500 to-blue-600"
            />
            <FeatureCard
              icon={<Zap className="h-8 w-8 text-purple-600" />}
              title="Instant Access"
              description="Start learning immediately after purchase. No waiting, no delays, just pure learning."
              gradient="from-purple-500 to-pink-600"
            />
            <FeatureCard
              icon={<Trophy className="h-8 w-8 text-amber-600" />}
              title="Certified Learning"
              description="Earn industry-recognized certificates upon course completion."
              gradient="from-amber-500 to-orange-600"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <StatCard number="10K+" label="Students Enrolled" />
            <StatCard number="150+" label="Expert Courses" />
            <StatCard number="98%" label="Success Rate" />
            <StatCard number="24/7" label="Support Available" />
          </div>
        </div>
      </section>

      {/* Popular Courses Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Popular Courses
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
              Join thousands of students already learning with our top-rated courses
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <CoursePreviewCard
              title="React Mastery"
              description="Master modern React development with hooks, context, and best practices."
              price={99}
              rating={4.9}
              students={2847}
            />
            <CoursePreviewCard
              title="Python for Data Science"
              description="Learn Python programming with a focus on data analysis and machine learning."
              price={129}
              rating={4.8}
              students={1923}
            />
            <CoursePreviewCard
              title="UI/UX Design Fundamentals"
              description="Create beautiful, user-friendly interfaces with modern design principles."
              price={89}
              rating={4.9}
              students={3156}
            />
          </div>
          
          <div className="text-center">
            <Button 
              asChild 
              size="lg"
              className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white px-8 py-4 text-lg shadow-lg transition-all duration-300 hover:shadow-xl"
            >
              <Link href="/courses">
                View All Courses <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-600 to-purple-600">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Start Learning?
          </h2>
          <p className="text-xl text-indigo-100 mb-8 max-w-2xl mx-auto">
            Join thousands of students who have transformed their careers with our courses. 
            Start your journey today with secure, instant access.
          </p>
          <Button 
            asChild 
            size="lg"
            className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold shadow-xl transition-all duration-300 hover:shadow-2xl hover:scale-105"
          >
            <Link href="/courses">
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}

// Feature Card Component
function FeatureCard({ 
  icon, 
  title, 
  description, 
  gradient 
}: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  gradient: string;
}) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white hover:-translate-y-2">
      <CardHeader className="text-center">
        <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-r ${gradient} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        <CardTitle className="text-xl font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription className="text-gray-600 text-center leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}

// Stats Card Component
function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-white">
      <div className="text-4xl md:text-5xl font-bold mb-2">{number}</div>
      <div className="text-indigo-100 text-lg">{label}</div>
    </div>
  );
}

// Course Preview Card Component
function CoursePreviewCard({
  title,
  description,
  price,
  rating,
  students
}: {
  title: string;
  description: string;
  price: number;
  rating: number;
  students: number;
}) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300 border-0 bg-white hover:-translate-y-2">
      <div className="aspect-video bg-gradient-to-r from-indigo-400 to-purple-500 rounded-t-lg"></div>
      <CardHeader>
        <div className="flex justify-between items-start mb-2">
          <CardTitle className="text-lg font-bold text-gray-900 group-hover:text-indigo-600 transition-colors">
            {title}
          </CardTitle>
          <Badge className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
            ${price}
          </Badge>
        </div>
        <CardDescription className="text-gray-600 leading-relaxed">
          {description}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center">
            <Star className="h-4 w-4 text-yellow-400 fill-yellow-400 mr-1" />
            <span className="font-medium">{rating}</span>
          </div>
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{students.toLocaleString()} students</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
