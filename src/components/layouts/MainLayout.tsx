
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { MobileBottomNav } from "../navigation/MobileBottomNav";
import { TopBar } from "../navigation/TopBar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation();
  const [isPageChanged, setIsPageChanged] = useState(false);
  
  // Effect for page transition animation
  useEffect(() => {
    setIsPageChanged(true);
    const timer = setTimeout(() => {
      setIsPageChanged(false);
    }, 300);
    
    return () => clearTimeout(timer);
  }, [location.pathname]);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden bg-background">
      <TopBar />
      
      <main className="flex-1 container px-4 py-4 pb-20 relative">
        <div className={`w-full ${isPageChanged ? 'animate-fade-in' : ''}`}>
          {children}
        </div>
      </main>
      
      <MobileBottomNav />
    </div>
  );
}
