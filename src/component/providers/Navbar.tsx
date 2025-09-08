import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton, UserButton } from "@clerk/nextjs";
import { GraduationCap } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const Navbar = () => {
	return (
		<nav className='w-full bg-white border-b border-gray-200'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='flex items-center justify-between h-20'>
					{/* Logo (left) */}
					<Link href="/" className='flex items-center gap-3 text-2xl font-bold text-black'>
						MasterClass
						<GraduationCap className='w-7 h-7' />
					</Link>

					{/* Right side (aligned by justify-between) */}
					<div className='flex items-center space-x-6'>
						<Link href="/courses" className='text-lg text-gray-700 hover:text-black font-medium'>
							Courses
						</Link>

						<Link href="/pro" className='text-lg text-gray-700 hover:text-black font-medium'>
							Pro
						</Link>

						<SignedIn>
							<Link href="/billing">
								<Button variant="outline" size="default" className='h-10 px-4'>
									Billing
								</Button>
							</Link>
							<UserButton appearance={{ elements: { avatarBox: "h-10 w-10" } }} />
							<SignOutButton>
								<Button variant="outline" size="default" className='h-10 px-4'>
									Log out
								</Button>
							</SignOutButton>
						</SignedIn>

						<SignedOut>
							<SignInButton mode='modal'>
								<Button variant="outline" size="default" className='h-10 px-4'>
									Log in
								</Button>
							</SignInButton>

							<SignUpButton mode='modal'>
								<Button size="default" className='h-10 px-4 bg-blue-600 hover:bg-blue-700 text-white'>
									Sign Up
								</Button>
							</SignUpButton>
						</SignedOut>
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar;