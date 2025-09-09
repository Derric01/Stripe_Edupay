import Link from "next/link";
import { Button } from "@/component/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/component/ui/card";
import { Badge } from "@/component/ui/badge";
import { Users, Star, ArrowRight, Zap, Shield, Trophy, Sparkles, Crown, Gem, ChevronRight } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-animated relative overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-purple-500/10 rounded-full blur-xl float"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-pink-500/10 rounded-full blur-xl float-delayed"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-blue-500/10 rounded-full blur-xl float"></div>
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-indigo-500/10 rounded-full blur-xl float-delayed"></div>
      </div>

      {/* Hero Section */}
      <section className="relative py-32 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="container mx-auto max-w-7xl relative z-10">
          <div className="text-center">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 glass-card mb-8 px-6 py-3 glow-purple">
              <Crown className="h-5 w-5 text-yellow-400" />
              <span className="gradient-gold font-semibold">Premium Learning Platform</span>
              <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
            </div>
            
            {/* Hero Title */}
            <h1 className="heading-hero mb-8 text-shine">
              Transform Your
              <br />
              <span className="relative">
                Future Today
                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600/20 to-pink-600/20 blur-xl"></div>
              </span>
            </h1>
            
            {/* Hero Subtitle */}
            <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed">
              Join thousands of learners mastering cutting-edge skills with our premium courses. 
              <span className="gradient-text font-semibold"> Secure payments, instant access, lifetime learning.</span>
            </p>
            
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Button 
                asChild 
                size="lg"
                className="btn-premium text-lg px-10 py-6 rounded-2xl text-white font-semibold shadow-2xl relative z-10"
              >
                <Link href="/courses" className="flex items-center gap-3">
                  <Gem className="h-6 w-6" />
                  Explore Premium Courses
                  <ChevronRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="glass-card text-lg px-10 py-6 rounded-2xl font-semibold border-white/30 hover:border-white/50 backdrop-blur-xl"
              >
                <span className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-yellow-400" />
                  Watch Demo
                </span>
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="mt-16 flex flex-wrap justify-center items-center gap-8 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-500" />
                <span className="font-medium">50,000+ Students</span>
              </div>
              <div className="flex items-center gap-2">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="font-medium">4.9/5 Rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-500" />
                <span className="font-medium">Secure & Trusted</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <Badge className="mb-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 text-sm font-medium rounded-full shadow-lg">
              ✨ Why Choose EduPay
            </Badge>
            <h2 className="heading-section">
              Premium Learning Experience
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Experience the future of online education with our cutting-edge platform designed for success.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Zap className="h-8 w-8 text-yellow-400" />,
                title: "Lightning Fast Access",
                description: "Instant course access after payment with our advanced streaming technology.",
                gradient: "from-yellow-400 to-orange-500"
              },
              {
                icon: <Shield className="h-8 w-8 text-green-400" />,
                title: "Bank-Level Security",
                description: "Military-grade encryption and secure payment processing with Stripe.",
                gradient: "from-green-400 to-blue-500"
              },
              {
                icon: <Trophy className="h-8 w-8 text-purple-400" />,
                title: "Premium Content",
                description: "Expert-crafted courses with certificates and lifetime access.",
                gradient: "from-purple-400 to-pink-500"
              }
            ].map((feature, index) => (
              <Card key={index} className="card-premium glass-card border-0 group cursor-pointer">
                <CardHeader className="text-center pb-4">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${feature.gradient} glow-purple mb-6`}>
                    {feature.icon}
                  </div>
                  <CardTitle className="text-2xl font-bold mb-3 gradient-text">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-black/5 backdrop-blur-sm">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: "50K+", label: "Active Students", icon: <Users className="h-6 w-6" /> },
              { number: "500+", label: "Premium Courses", icon: <Star className="h-6 w-6" /> },
              { number: "95%", label: "Success Rate", icon: <Trophy className="h-6 w-6" /> },
              { number: "24/7", label: "Support", icon: <Shield className="h-6 w-6" /> }
            ].map((stat, index) => (
              <div key={index} className="glass-card p-8 rounded-2xl hover:scale-105 transition-transform duration-300">
                <div className="text-purple-500 mb-4 flex justify-center">
                  {stat.icon}
                </div>
                <div className="text-4xl font-black gradient-text mb-2">{stat.number}</div>
                <div className="text-gray-600 dark:text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 relative">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="glass-card p-12 rounded-3xl glow-purple">
            <Crown className="h-16 w-16 text-yellow-400 mx-auto mb-6 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold mb-6 gradient-text">
              Ready to Begin Your Journey?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
              Join our premium community and unlock your potential with world-class education.
            </p>
            <Button 
              asChild 
              size="lg"
              className="btn-premium text-xl px-12 py-6 rounded-2xl text-white font-bold shadow-2xl"
            >
              <Link href="/courses" className="flex items-center gap-3">
                <Sparkles className="h-6 w-6" />
                Start Learning Now
                <ArrowRight className="h-6 w-6" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
