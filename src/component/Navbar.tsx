"use client";

import Link from "next/link";
import { UserButton, useUser, SignedIn, SignedOut, SignInButton, SignUpButton, SignOutButton } from "@clerk/nextjs";
import { Button } from "@/component/ui/button";
import { GraduationCap, Menu, X, BookOpen, User } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { user } = useUser();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-lg border-b border-gray-200/50 shadow-sm">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            href="/" 
            className="flex items-center space-x-2 group"
          >
            <div className="p-2 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl shadow-lg group-hover:scale-105 transition-transform">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              EduPay
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink href="/courses" icon={<BookOpen className="h-4 w-4" />}>
              Courses
            </NavLink>
            
            <SignedIn>
              <NavLink href="/dashboard" icon={<User className="h-4 w-4" />}>
                My Courses
              </NavLink>
            </SignedIn>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            <SignedIn>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-600">
                  Welcome, {user?.firstName || "User"}!
                </span>
                <UserButton 
                  appearance={{
                    elements: {
                      avatarBox: "h-10 w-10 rounded-full border-2 border-indigo-200 hover:border-indigo-400 transition-colors"
                    }
                  }}
                />
              </div>
            </SignedIn>
            
            <SignedOut>
              <div className="flex items-center space-x-3">
                <SignInButton mode="modal">
                  <Button variant="ghost">Sign In</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white shadow-lg transition-all duration-300 hover:shadow-xl">
                    Get Started
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleMenu}
              className="relative z-50"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t border-gray-200/50 bg-white/95 backdrop-blur-lg">
          <div className="px-4 py-6 space-y-4">
            <MobileNavLink href="/courses" icon={<BookOpen className="h-5 w-5" />} onClick={() => setIsMenuOpen(false)}>
              Courses
            </MobileNavLink>
            
            <SignedIn>
              <MobileNavLink href="/dashboard" icon={<User className="h-5 w-5" />} onClick={() => setIsMenuOpen(false)}>
                My Courses
              </MobileNavLink>
            </SignedIn>

            <div className="pt-4 border-t border-gray-200">
              <SignedIn>
                <div className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                  <div className="flex items-center space-x-3">
                    <UserButton 
                      appearance={{
                        elements: {
                          avatarBox: "h-10 w-10 rounded-full border-2 border-indigo-200"
                        }
                      }}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {user?.firstName || "User"}
                    </span>
                  </div>
                  <SignOutButton>
                    <Button variant="outline" size="sm" className="border-red-200 text-red-600 hover:bg-red-50">
                      Sign Out
                    </Button>
                  </SignOutButton>
                </div>
              </SignedIn>
              
              <SignedOut>
                <div className="space-y-3">
                  <SignInButton mode="modal">
                    <Button variant="outline" className="w-full">
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button className="w-full bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white">
                      Get Started
                    </Button>
                  </SignUpButton>
                </div>
              </SignedOut>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}

// Desktop Navigation Link Component
function NavLink({ href, children, icon }: { href: string; children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <Link 
      href={href}
      className="flex items-center space-x-2 text-gray-700 hover:text-indigo-600 transition-colors duration-200 font-medium group"
    >
      {icon && (
        <span className="group-hover:scale-110 transition-transform duration-200">
          {icon}
        </span>
      )}
      <span>{children}</span>
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
      className="flex items-center space-x-3 p-3 rounded-lg text-gray-700 hover:bg-indigo-50 hover:text-indigo-600 transition-all duration-200 font-medium"
    >
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </Link>
  );
}