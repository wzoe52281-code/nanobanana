"use client"

import { useState } from "react"
import Link from "next/link"
import { LoginButton } from "@/components/ui/login-button";
import { useUser } from "@/components/user-context";

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isLoading, signOut } = useUser();

  return (
    <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="text-2xl font-bold">🍌</div>
            <span className="text-xl font-bold text-foreground group-hover:text-accent transition-colors">
              Nano Banana
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex gap-8 items-center">
            <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">
              Features
            </Link>
            <Link href="#showcase" className="text-muted-foreground hover:text-foreground transition-colors">
              Showcase
            </Link>
            <Link href="#reviews" className="text-muted-foreground hover:text-foreground transition-colors">
              Reviews
            </Link>
            <Link href="#faq" className="text-muted-foreground hover:text-foreground transition-colors">
              FAQ
            </Link>
            
            {/* Auth Section */}
            <div className="flex items-center gap-2">
              {isLoading ? (
                <div className="px-4 py-2 text-sm">Loading...</div>
              ) : user ? (
                <div className="flex items-center gap-4">
                  <span className="hidden sm:inline text-sm text-muted-foreground max-w-[120px] truncate" title={user.email}>
                    {user.email}
                  </span>
                  <button 
  onClick={() => signOut()} 
  className="px-4 py-2 text-sm bg-destructive text-white/90 rounded-full hover:bg-destructive/90 transition-colors"
>
  Sign Out
</button>
                </div>
              ) : (
                <LoginButton>
                  <span className="flex items-center gap-2 px-4 py-2 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                      <path 
                        fill="#fff" 
                        d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
                      />
                    </svg>
                    Sign In
                  </span>
                </LoginButton>
              )}
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex items-center gap-4">
            <button className="hidden md:block px-6 py-2 bg-accent text-accent-foreground font-semibold rounded-full hover:bg-accent/90 transition-colors">
              Start Editing
            </button>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden p-2 hover:bg-secondary rounded-lg">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link
              href="#features"
              className="block px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
            >
              Features
            </Link>
            <Link
              href="#showcase"
              className="block px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
            >
              Showcase
            </Link>
            <Link
              href="#reviews"
              className="block px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
            >
              Reviews
            </Link>
            <Link
              href="#faq"
              className="block px-4 py-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg transition-colors"
            >
              FAQ
            </Link>
            
            {/* Mobile Auth Section */}
            <div className="px-4 py-2 border-t border-border pt-4">
              {isLoading ? (
                <div className="py-2 text-center text-sm">Loading...</div>
              ) : user ? (
                <div className="space-y-3">
                  <p className="text-sm text-muted-foreground break-all px-2">
                    Signed in as: {user.email}
                  </p>
                  <button 
                    onClick={() => {
                      signOut();
                      setIsOpen(false); // Close menu after sign out
                    }} 
                    className="w-full px-4 py-2 text-sm bg-destructive text-white/90 rounded-full hover:bg-destructive/90 transition-colors"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <LoginButton>
                  <span className="flex items-center justify-center gap-2 w-full px-4 py-2 text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24">
                      <path 
                        fill="#fff" 
                        d="M12.24 10.285V14.4h6.806c-.275 1.765-2.056 5.174-6.806 5.174-4.095 0-7.439-3.389-7.439-7.574s3.345-7.574 7.439-7.574c2.33 0 3.891.989 4.785 1.849l3.254-3.138C18.189 1.186 15.479 0 12.24 0c-6.635 0-12 5.365-12 12s5.365 12 12 12c6.926 0 11.52-4.869 11.52-11.726 0-.788-.085-1.39-.189-1.989H12.24z"
                      />
                    </svg>
                    Sign In with Google
                  </span>
                </LoginButton>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}