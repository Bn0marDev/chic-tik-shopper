
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ShoppingCart, Sun, Moon, User } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

export function TopBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  
  const navLinks = [
    { path: "/", label: "الرئيسية" },
    { path: "/explore", label: "استكشاف" },
    { path: "/premium", label: "المميزة" }
  ];
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  return (
    <header className={cn("sticky top-0 z-50 w-full py-3 border-b border-border backdrop-blur-md", 
      theme === 'dark' ? "bg-background/80" : "bg-white/80")}>
      <div className="container flex items-center justify-between">
        <div className="flex items-center gap-x-4">
          <button 
            onClick={toggleMenu}
            className="lg:hidden button-icon"
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
          
          <Link to="/" className="text-xl font-bold text-primary">TikBoost</Link>
          
          <nav className="hidden lg:flex items-center gap-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={cn(
                  "nav-link px-4 py-2 rounded-lg",
                  location.pathname === link.path && "active"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
        
        <div className="flex items-center gap-x-2">
          <button
            onClick={toggleTheme}
            className="button-icon"
            aria-label={theme === 'dark' ? "Switch to light mode" : "Switch to dark mode"}
          >
            {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          
          <Link to="/cart" className="button-icon">
            <ShoppingCart className="h-5 w-5" />
          </Link>
          
          <Link to="/profile" className="button-icon">
            <User className="h-5 w-5" />
          </Link>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className={cn("fixed inset-0 z-50 w-full h-full mt-14", 
          theme === 'dark' ? "bg-background/80 backdrop-blur-md" : "bg-white/80 backdrop-blur-md")}>
          <div className="container py-4">
            <nav className="flex flex-col gap-y-3">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={toggleMenu}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 text-lg rounded-lg transition-colors",
                    location.pathname === link.path
                      ? "bg-primary/10 text-primary font-medium"
                      : "hover:bg-accent/40"
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
