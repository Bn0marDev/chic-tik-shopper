
import { ArrowUp, Play, TrendingUp, Users } from "lucide-react";
import { useState, useEffect } from "react";

export function Hero() {
  const [imageLoaded, setImageLoaded] = useState(false);
  
  useEffect(() => {
    const img = new Image();
    img.src = "https://images.unsplash.com/photo-1633628569245-1ab300f5554e?q=80&w=1000&auto=format&fit=crop";
    img.onload = () => setImageLoaded(true);
  }, []);

  return (
    <section className="mb-10 overflow-hidden rounded-3xl relative">
      <div className="glass-effect p-6 sm:p-8 rounded-3xl relative z-10">
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <div className="flex-1 text-center sm:text-right order-2 sm:order-1">
            <h1 className="text-3xl sm:text-4xl font-bold mb-4 leading-tight">
              ارتقِ بحسابك على <span className="text-primary">تيك توك</span>
            </h1>
            <p className="text-muted-foreground mb-6 max-w-md mx-auto sm:mr-0">
              خدمات احترافية لزيادة متابعينك، مشاهداتك وتفاعلاتك بشكل طبيعي وآمن
            </p>
            
            <div className="flex flex-wrap gap-3 justify-center sm:justify-start mb-8">
              <div className="flex items-center gap-2 bg-accent/50 px-4 py-2 rounded-full">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm">متابعين حقيقيين</span>
              </div>
              
              <div className="flex items-center gap-2 bg-accent/50 px-4 py-2 rounded-full">
                <TrendingUp className="h-4 w-4 text-primary" />
                <span className="text-sm">زيادة الوصول</span>
              </div>
              
              <div className="flex items-center gap-2 bg-accent/50 px-4 py-2 rounded-full">
                <ArrowUp className="h-4 w-4 text-primary" />
                <span className="text-sm">تعزيز التفاعل</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4 justify-center sm:justify-start">
              <button className="bg-primary hover:bg-primary/90 text-white font-medium py-2.5 px-6 rounded-full transition-all duration-300 hover:shadow-premium transform hover:scale-105">
                تصفح الخدمات
              </button>
              
              <button className="flex items-center gap-2 bg-accent hover:bg-accent/80 py-2.5 px-6 rounded-full transition-all duration-300">
                <Play className="h-4 w-4 fill-primary stroke-none" />
                <span>شاهد كيف يعمل</span>
              </button>
            </div>
          </div>
          
          <div className="flex-1 relative order-1 sm:order-2">
            <div className="max-w-[300px] aspect-square mx-auto">
              <div className="absolute inset-0 rounded-full bg-primary opacity-10 blur-3xl animate-pulse-subtle"></div>
              <img 
                src="https://images.unsplash.com/photo-1633628569245-1ab300f5554e?q=80&w=1000&auto=format&fit=crop"
                alt="تيك توك خدمات"
                className={`rounded-3xl object-cover w-full h-full shadow-premium transition-all duration-700 ${imageLoaded ? 'img-loaded' : 'img-loading'} animate-scale-in`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
