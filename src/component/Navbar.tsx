"use client";

import Link from "next/link";
import { UserButton, useUser, SignedIn, SignedOut, SignInButton, SignUpButton, SignOutButton } from "@clerk/nextjs";
import { Button } from "@/component/ui/button";
import { Menu, X, BookOpen, User, Sparkles, Zap } from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";
import { EduPayLogo } from "./EduPayLogo";

export default function Navbar() {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="fixed top-0 w-full z-50 bg-slate-900/90 backdrop-blur-xl border-b border-white/10 shadow-2xl"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-3 group"
          >
            <motion.div 
              whileHover={{ scale: 1.1, rotate: 5 }}
              className="transition-all duration-300"
            >
              <EduPayLogo size="md" className="group-hover:drop-shadow-2xl" />
            </motion.div>
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 via-pink-400 to-yellow-400 bg-clip-text text-transparent">
              EduPay
            </span>
            <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/courses" icon={<BookOpen className="h-4 w-4" />}>
              Courses
            </NavLink>
            
            <SignedIn>
              <NavLink href="/dashboard" icon={<User className="h-4 w-4" />}>
                Dashboard
              </NavLink>
            </SignedIn>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedIn>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-3 px-4 py-2 bg-white/5 backdrop-blur-md rounded-full border border-white/10">
                  <UserButton 
                    appearance={{
                      elements: {
                        avatarBox: "h-8 w-8 rounded-full border-2 border-purple-400 shadow-lg"
                      }
                    }}
                  />
                  <span className="text-sm text-white font-medium">
                    {user?.firstName || "User"}
                  </span>
                </div>
              </div>
            </SignedIn>
            
            <SignedOut>
              <div className="flex items-center space-x-3">
                <SignInButton mode="modal">
                  <Button 
                    variant="outline" 
                    className="border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white backdrop-blur-md bg-white/5 transition-all duration-300 hover:scale-105"
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white border-0 shadow-2xl hover:shadow-purple-500/50 transition-all duration-300 hover:scale-105">
                    <Zap className="mr-2 h-4 w-4" />
                    Get Started
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={toggleMenu}
              className="relative z-50 border-white/20 text-white hover:bg-white/10 backdrop-blur-md bg-white/5"
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </motion.div>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ 
          opacity: isMenuOpen ? 1 : 0, 
          height: isMenuOpen ? "auto" : 0 
        }}
        transition={{ duration: 0.3 }}
        className="md:hidden overflow-hidden bg-slate-900/95 backdrop-blur-xl border-t border-white/10"
      >
        <div className="px-4 py-6 space-y-4">
          <MobileNavLink href="/courses" icon={<BookOpen className="h-5 w-5" />} onClick={() => setIsMenuOpen(false)}>
            Courses
          </MobileNavLink>
          
          <SignedIn>
            <MobileNavLink href="/dashboard" icon={<User className="h-5 w-5" />} onClick={() => setIsMenuOpen(false)}>
              Dashboard
            </MobileNavLink>
          </SignedIn>

          <div className="pt-4 border-t border-white/10">
            <SignedIn>
              <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10">
                <div className="flex items-center space-x-3">
                  <UserButton 
                    appearance={{
                      elements: {
                        avatarBox: "h-10 w-10 rounded-full border-2 border-purple-400 shadow-lg"
                      }
                    }}
                  />
                  <span className="text-sm font-medium text-white">
                    {user?.firstName || "User"}
                  </span>
                </div>
                <SignOutButton>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="border-red-400 text-red-400 hover:bg-red-500 hover:text-white backdrop-blur-md bg-white/5"
                  >
                    Sign Out
                  </Button>
                </SignOutButton>
              </div>
            </SignedIn>
            
            <SignedOut>
              <div className="space-y-3">
                <SignInButton mode="modal">
                  <Button 
                    variant="outline" 
                    className="w-full border-purple-500 text-purple-400 hover:bg-purple-500 hover:text-white backdrop-blur-md bg-white/5"
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-2xl">
                    <Zap className="mr-2 h-4 w-4" />
                    Get Started
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>
        </div>
      </motion.div>
    </motion.nav>
  );
}

// Desktop Navigation Link Component
function NavLink({ href, children, icon }: { href: string; children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <Link 
      href={href}
      className="flex items-center space-x-2 text-gray-300 hover:text-white transition-all duration-300 font-medium group relative"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="group-hover:text-purple-400 transition-colors duration-300"
      >
        {icon}
      </motion.div>
      <span className="group-hover:text-purple-400 transition-colors duration-300">{children}</span>
      <motion.div
        className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
        initial={{ scaleX: 0 }}
        whileHover={{ scaleX: 1 }}
      />
    </Link>
  );
}

// Mobile Navigation Link Component
function MobileNavLink({ 
  href, 
  children, 
  icon, 
  onClick 
}: { 
  href: string; 
  children: React.ReactNode; 
  icon?: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link 
      href={href}
      onClick={onClick}
      className="flex items-center space-x-3 p-3 rounded-xl text-gray-300 hover:text-white hover:bg-white/10 transition-all duration-300 font-medium group backdrop-blur-md"
    >
      <motion.div
        whileHover={{ scale: 1.1 }}
        className="text-purple-400 group-hover:text-pink-400 transition-colors duration-300"
      >
        {icon}
      </motion.div>
      <span className="group-hover:text-purple-400 transition-colors duration-300">{children}</span>
    </Link>
  );
}
