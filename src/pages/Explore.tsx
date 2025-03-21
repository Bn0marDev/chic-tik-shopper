
import { useState } from "react";
import { MainLayout } from "../components/layouts/MainLayout";
import { 
  Search, 
  SlidersHorizontal, 
  Flame, 
  Clock, 
  Star, 
  ArrowUp, 
  ArrowDown,
  XCircle
} from "lucide-react";
import { Link } from "react-router-dom";

interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  tags: string[];
  popular?: boolean;
  new?: boolean;
  category: string;
}

const Explore = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<"popular" | "newest" | "price-asc" | "price-desc">("popular");
  
  const categories = [
    "متابعين",
    "مشاهدات",
    "إعجابات",
    "تعليقات",
    "مشاركات",
    "إحصائيات"
  ];
  
  // Example services data
  const allServices: Service[] = [
    {
      id: 1,
      title: "زيادة متابعين حقيقيين",
      description: "زيادة متابعين حقيقيين ومتفاعلين لحسابك على تيك توك",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1000&auto=format&fit=crop",
      rating: 4.8,
      tags: ["متابعين", "حقيقيين"],
      popular: true,
      category: "متابعين"
    },
    {
      id: 2,
      title: "زيادة مشاهدات الفيديو",
      description: "زيادة مشاهدات الفيديوهات لزيادة الوصول والانتشار",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=1000&auto=format&fit=crop",
      rating: 4.6,
      tags: ["مشاهدات", "فيديو"],
      new: true,
      category: "مشاهدات"
    },
    {
      id: 3,
      title: "تفاعلات وتعليقات",
      description: "زيادة التفاعل على منشوراتك بتعليقات حقيقية",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1627843240167-b1f9309c4b31?q=80&w=1000&auto=format&fit=crop",
      rating: 4.7,
      tags: ["تعليقات", "تفاعل"],
      category: "تعليقات"
    },
    {
      id: 4,
      title: "زيادة مشاركات المحتوى",
      description: "زيادة عدد مرات مشاركة المحتوى الخاص بك",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1596558450268-9c27524ba856?q=80&w=1000&auto=format&fit=crop",
      rating: 4.5,
      tags: ["مشاركات", "انتشار"],
      category: "مشاركات"
    },
    {
      id: 5,
      title: "زيادة إعجابات الفيديو",
      description: "زيادة الإعجابات على الفيديوهات لتحسين الترتيب",
      price: 19.99,
      image: "https://images.unsplash.com/photo-1613294326794-e7c74fe886e2?q=80&w=1000&auto=format&fit=crop",
      rating: 4.7,
      tags: ["إعجابات", "فيديو"],
      category: "إعجابات"
    },
    {
      id: 6,
      title: "تحليل وتحسين الحساب",
      description: "تحليل شامل لحسابك مع توصيات لتحسين الأداء",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop",
      rating: 4.9,
      tags: ["تحليل", "تحسين"],
      category: "إحصائيات"
    }
  ];

  // Apply filters and search
  const filteredServices = allServices
    .filter(service => 
      (selectedCategory ? service.category === selectedCategory : true) &&
      (searchQuery ? service.title.includes(searchQuery) || service.description.includes(searchQuery) : true)
    )
    .sort((a, b) => {
      if (sortBy === "popular") {
        return (a.popular ? 1 : 0) > (b.popular ? 1 : 0) ? -1 : 1;
      } else if (sortBy === "newest") {
        return (a.new ? 1 : 0) > (b.new ? 1 : 0) ? -1 : 1;
      } else if (sortBy === "price-asc") {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
  
  const clearFilters = () => {
    setSelectedCategory(null);
    setSortBy("popular");
    setSearchQuery("");
  };

  return (
    <MainLayout>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-bold">استكشاف الخدمات</h1>
      </div>
      
      <div className="glass-effect rounded-2xl p-4 mb-6">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="ابحث عن خدمات..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-accent/50 py-2.5 pr-10 pl-4 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
        
        <div className="flex justify-between items-center mt-3">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-1.5 text-sm font-medium"
          >
            <SlidersHorizontal className="h-4 w-4" />
            {showFilters ? 'إخفاء الفلاتر' : 'عرض الفلاتر'}
          </button>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">ترتيب حسب:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-accent/50 rounded-lg text-sm p-1.5 border-none focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="popular">الأكثر شعبية</option>
              <option value="newest">الأحدث</option>
              <option value="price-asc">السعر: من الأقل للأعلى</option>
              <option value="price-desc">السعر: من الأعلى للأقل</option>
            </select>
          </div>
        </div>
        
        {showFilters && (
          <div className="mt-4 border-t border-border pt-4 animate-fade-in">
            <h3 className="font-medium mb-2">تصفية حسب الفئة</h3>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(selectedCategory === category ? null : category)}
                  className={`px-3 py-1.5 rounded-full text-sm transition-all duration-300 ${
                    selectedCategory === category
                      ? "bg-primary text-white"
                      : "bg-accent/50 hover:bg-accent"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
            
            {(selectedCategory || sortBy !== "popular" || searchQuery) && (
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
              >
                <XCircle className="h-4 w-4" />
                إعادة ضبط الفلاتر
              </button>
            )}
          </div>
        )}
      </div>
      
      {filteredServices.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredServices.map((service) => (
            <Link key={service.id} to={`/service/${service.id}`} className="service-card">
              <div className="relative aspect-video overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="object-cover w-full h-full"
                />
                
                {service.popular && (
                  <div className="absolute top-2 right-2 bg-primary/90 text-white text-xs py-1 px-2 rounded-full flex items-center">
                    <Flame className="h-3 w-3 mr-1" /> الأكثر طلباً
                  </div>
                )}
                
                {service.new && (
                  <div className="absolute top-2 right-2 bg-green-500/90 text-white text-xs py-1 px-2 rounded-full flex items-center">
                    <Clock className="h-3 w-3 mr-1" /> جديد
                  </div>
                )}
              </div>
              
              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold">{service.title}</h3>
                  <div className="flex items-center text-yellow-500">
                    <Star className="fill-yellow-500 h-4 w-4" />
                    <span className="text-sm ml-1">{service.rating}</span>
                  </div>
                </div>
                
                <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{service.description}</p>
                
                <div className="flex justify-between items-center">
                  <div className="flex gap-1">
                    {service.tags.map((tag, i) => (
                      <span key={i} className="text-xs px-2 py-0.5 bg-accent rounded-full">{tag}</span>
                    ))}
                  </div>
                  <p className="font-bold text-primary">${service.price}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="glass-effect rounded-2xl p-8 text-center">
          <h3 className="font-bold text-lg mb-2">لا توجد نتائج</h3>
          <p className="text-muted-foreground mb-4">لا توجد خدمات تطابق معايير البحث الخاصة بك.</p>
          <button
            onClick={clearFilters}
            className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-full transition-all duration-300"
          >
            إعادة ضبط البحث
          </button>
        </div>
      )}
    </MainLayout>
  );
};

export default Explore;
