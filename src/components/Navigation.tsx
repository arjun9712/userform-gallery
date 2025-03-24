
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const location = useLocation();
  
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-lg border-b border-border">
      <div className="container-padding mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <svg 
              width="32" 
              height="32" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary"
            >
              <path 
                d="M20 12V6.5C20 5.67157 19.3284 5 18.5 5H5.5C4.67157 5 4 5.67157 4 6.5V17.5C4 18.3284 4.67157 19 5.5 19H12" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M18 15V18M18 21V18M18 18H15M18 18H21" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <span className="text-lg font-display font-semibold">DataForms</span>
          </Link>
          
          <nav className="hidden md:flex items-center gap-1">
            <Link 
              to="/" 
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                location.pathname === "/" 
                  ? "bg-primary/10 text-primary" 
                  : "text-foreground/70 hover:text-foreground hover:bg-secondary"
              )}
            >
              Submit
            </Link>
            <Link 
              to="/admin" 
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                location.pathname === "/admin" 
                  ? "bg-primary/10 text-primary" 
                  : "text-foreground/70 hover:text-foreground hover:bg-secondary"
              )}
            >
              Admin
            </Link>
          </nav>
        </div>
        
        <div className="md:hidden">
          <nav className="flex items-center">
            <Link 
              to="/" 
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                location.pathname === "/" 
                  ? "bg-primary/10 text-primary" 
                  : "text-foreground/70 hover:text-foreground"
              )}
            >
              Submit
            </Link>
            <Link 
              to="/admin" 
              className={cn(
                "px-3 py-1.5 rounded-lg text-sm font-medium transition-colors",
                location.pathname === "/admin" 
                  ? "bg-primary/10 text-primary" 
                  : "text-foreground/70 hover:text-foreground"
              )}
            >
              Admin
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navigation;
