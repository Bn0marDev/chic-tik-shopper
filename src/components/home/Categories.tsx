
import { useEffect, useState } from "react";
import { ChevronRight, Users, Eye, Heart, MessageCircle, BarChart, Share2 } from "lucide-react";
import { Link } from "react-router-dom";

interface Category {
  id: number;
  title: string;
  icon: React.ElementType;
  description: string;
  color: string;
}

export function Categories() {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);
  
  const categories: Category[] = [
    {
      id: 1,
      title: "متابعين",
      icon: Users,
      description: "زيادة عدد المتابعين الحقيقيين لحسابك",
      color: "from-blue-600 to-blue-400"
    },
    {
      id: 2,
      title: "مشاهدات",
      icon: Eye,
      description: "زيادة عدد مشاهدات الفيديوهات",
      color: "from-purple-600 to-purple-400"
    },
    {
      id: 3,
      title: "إعجابات",
      icon: Heart,
      description: "زيادة الإعجابات على المحتوى الخاص بك",
      color: "from-red-600 to-red-400"
    },
    {
      id: 4,
      title: "تعليقات",
      icon: MessageCircle,
      description: "زيادة التعليقات على المحتوى الخاص بك",
      color: "from-green-600 to-green-400"
    },
    {
      id: 5,
      title: "إحصائيات",
      icon: BarChart,
      description: "تحليل وتحسين أداء حسابك",
      color: "from-yellow-600 to-yellow-400"
    },
    {
      id: 6,
      title: "مشاركات",
      icon: Share2,
      description: "زيادة مشاركة المحتوى الخاص بك",
      color: "from-pink-600 to-pink-400"
    }
  ];

  // Auto-rotate categories
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveCategory((prev) => {
        if (prev === null) return 0;
        return (prev + 1) % categories.length;
      });
    }, 3000);
    
    return () => clearInterval(interval);
  }, [categories.length]);

  return (
    <section className="mb-10">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">تصفح حسب الفئة</h2>
        <Link to="/categories" className="flex items-center text-primary text-sm">
          عرض الكل <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((category) => (
          <Link
            key={category.id}
            to={`/category/${category.id}`}
            className={`glass-effect flex flex-col items-center justify-center text-center p-4 rounded-2xl transition-all duration-300 hover:scale-105 ${
              activeCategory === category.id ? 'ring-2 ring-primary' : ''
            }`}
            onMouseEnter={() => setActiveCategory(category.id)}
            onMouseLeave={() => setActiveCategory(null)}
          >
            <div className={`flex items-center justify-center h-12 w-12 mb-3 rounded-xl bg-gradient-to-r ${category.color}`}>
              <category.icon className="h-6 w-6 text-white" />
            </div>
            <h3 className="font-bold mb-1">{category.title}</h3>
            <p className="text-xs text-muted-foreground">{category.description}</p>
          </Link>
        ))}
      </div>
    </section>
  );
}
