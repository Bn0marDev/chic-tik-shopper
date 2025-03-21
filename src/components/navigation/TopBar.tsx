
import { ShoppingBag, Bell, Search } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export function TopBar() {
  const [showSearch, setShowSearch] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full">
      <div className="bg-card/80 backdrop-blur-lg border-b border-border">
        <div className="container flex h-16 items-center justify-between px-4">
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl tracking-tight">تيك بازار</span>
            </Link>
          </div>

          {showSearch ? (
            <div className="absolute inset-0 flex items-center justify-center bg-card/95 px-4 animate-fade-in">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  placeholder="البحث عن خدمات..."
                  className="w-full bg-accent py-2 px-10 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-muted-foreground/70"
                  autoFocus
                  onBlur={() => setShowSearch(false)}
                />
                <button
                  onClick={() => setShowSearch(false)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                >
                  إلغاء
                </button>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <button onClick={() => setShowSearch(true)} className="button-icon">
                <Search className="h-5 w-5" />
              </button>
              <Link to="/notifications" className="button-icon relative">
                <Bell className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold">
                  3
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
