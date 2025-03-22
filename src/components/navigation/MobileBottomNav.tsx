
import { useLocation, Link } from "react-router-dom";
import { Home, Search, ShoppingCart, User, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

export function MobileBottomNav() {
  const location = useLocation();
  const currentPath = location.pathname;
  const { theme } = useTheme();
  
  const navItems = [
    { path: "/", icon: Home, label: "الرئيسية" },
    { path: "/explore", icon: Search, label: "استكشاف" },
    { path: "/premium", icon: Sparkles, label: "المميزة" },
    { path: "/cart", icon: ShoppingCart, label: "السلة" },
    { path: "/profile", icon: User, label: "حسابي" },
  ];

  return (
    <div className={cn("fixed bottom-0 left-0 right-0 z-50 py-2 px-1 border-t border-border animate-slide-in-bottom",
      theme === 'dark' ? "bg-card/80 backdrop-blur-lg" : "bg-white/80 backdrop-blur-lg")}>
      <nav className="flex items-center justify-around">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center gap-1 px-2 py-1.5 rounded-xl transition-all duration-300",
              currentPath === item.path
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon size={20} className={currentPath === item.path ? "animate-pulse-subtle" : ""} />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </nav>
    </div>
  );
}
