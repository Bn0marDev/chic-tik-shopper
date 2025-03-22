
import { useEffect, useState } from "react";
import { ChevronRight, Flame, Star, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import { useTheme } from "@/hooks/useTheme";

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
}

export function FeaturedServices() {
  const [imgLoaded, setImgLoaded] = useState<Record<string, boolean>>({});
  const { theme } = useTheme();
  
  const services: Service[] = [
    {
      id: 1,
      title: "زيادة متابعين حقيقيين",
      description: "زيادة متابعين حقيقيين ومتفاعلين لحسابك على تيك توك",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1000&auto=format&fit=crop",
      rating: 4.8,
      tags: ["متابعين", "حقيقيين"],
      popular: true
    },
    {
      id: 2,
      title: "زيادة مشاهدات الفيديو",
      description: "زيادة مشاهدات الفيديوهات لزيادة الوصول والانتشار",
      price: 29.99,
      image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=1000&auto=format&fit=crop",
      rating: 4.6,
      tags: ["مشاهدات", "فيديو"],
      new: true
    },
    {
      id: 3,
      title: "تفاعلات وتعليقات",
      description: "زيادة التفاعل على منشوراتك بتعليقات حقيقية",
      price: 39.99,
      image: "https://images.unsplash.com/photo-1627843240167-b1f9309c4b31?q=80&w=1000&auto=format&fit=crop",
      rating: 4.7,
      tags: ["تعليقات", "تفاعل"]
    },
    {
      id: 4,
      title: "زيادة مشاركات المحتوى",
      description: "زيادة عدد مرات مشاركة المحتوى الخاص بك",
      price: 34.99,
      image: "https://images.unsplash.com/photo-1596558450268-9c27524ba856?q=80&w=1000&auto=format&fit=crop",
      rating: 4.5,
      tags: ["مشاركات", "انتشار"]
    }
  ];

  const handleImageLoad = (id: number) => {
    setImgLoaded(prev => ({ ...prev, [id]: true }));
  };

  useEffect(() => {
    // Preload images
    services.forEach(service => {
      const img = new Image();
      img.src = service.image;
      img.onload = () => handleImageLoad(service.id);
    });
  }, []);

  return (
    <section className="mb-8">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold">الخدمات المميزة</h2>
        <Link to="/services" className="flex items-center text-primary text-sm">
          عرض الكل <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service) => (
          <Link key={service.id} to={`/service/${service.id}`} className={cn("service-card", 
            theme === 'dark' ? "" : "light-card")}>
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={service.image}
                alt={service.title}
                className={cn("object-cover w-full h-full transition-all duration-700", 
                  imgLoaded[service.id] ? 'img-loaded' : 'img-loading')}
                onLoad={() => handleImageLoad(service.id)}
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
                <h3 className="font-bold text-lg">{service.title}</h3>
                <div className="flex items-center text-yellow-500">
                  <Star className="fill-yellow-500 h-4 w-4" />
                  <span className="text-sm ml-1">{service.rating}</span>
                </div>
              </div>
              
              <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{service.description}</p>
              
              <div className="flex justify-between items-center">
                <div className="flex gap-1">
                  {service.tags.map((tag, i) => (
                    <span key={i} className={cn("text-xs px-2 py-0.5 rounded-full", 
                      theme === 'dark' ? "bg-accent" : "bg-slate-200")}>{tag}</span>
                  ))}
                </div>
                <p className="font-bold text-primary">{service.price} د.ل</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
