
import { MainLayout } from "../components/layouts/MainLayout";
import { Hero } from "../components/home/Hero";
import { Categories } from "../components/home/Categories";
import { FeaturedServices } from "../components/home/FeaturedServices";
import { TestimonialSlider } from "../components/home/TestimonialSlider";
import { Zap, ShieldCheck, Clock, Users } from "lucide-react";

const Index = () => {
  return (
    <MainLayout>
      <Hero />
      
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-10">
        <div className="glass-effect rounded-2xl p-4 flex flex-col items-center text-center">
          <div className="bg-primary/10 p-3 rounded-full mb-3">
            <Zap className="h-6 w-6 text-primary" />
          </div>
          <h3 className="font-bold mb-1">تنفيذ سريع</h3>
          <p className="text-xs text-muted-foreground">خدمات مع بدء التنفيذ فوراً</p>
        </div>
        
        <div className="glass-effect rounded-2xl p-4 flex flex-col items-center text-center">
          <div className="bg-green-500/10 p-3 rounded-full mb-3">
            <ShieldCheck className="h-6 w-6 text-green-500" />
          </div>
          <h3 className="font-bold mb-1">آمن 100%</h3>
          <p className="text-xs text-muted-foreground">لا نطلب كلمة المرور أبداً</p>
        </div>
        
        <div className="glass-effect rounded-2xl p-4 flex flex-col items-center text-center">
          <div className="bg-purple-500/10 p-3 rounded-full mb-3">
            <Clock className="h-6 w-6 text-purple-500" />
          </div>
          <h3 className="font-bold mb-1">دعم 24/7</h3>
          <p className="text-xs text-muted-foreground">فريق دعم متاح على مدار الساعة</p>
        </div>
        
        <div className="glass-effect rounded-2xl p-4 flex flex-col items-center text-center">
          <div className="bg-yellow-500/10 p-3 rounded-full mb-3">
            <Users className="h-6 w-6 text-yellow-500" />
          </div>
          <h3 className="font-bold mb-1">30 ألف+ عميل</h3>
          <p className="text-xs text-muted-foreground">نثق بنا لتنمية حساباتهم</p>
        </div>
      </div>
      
      <Categories />
      <FeaturedServices />
      <TestimonialSlider />
    </MainLayout>
  );
};

export default Index;
