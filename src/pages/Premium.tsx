
import { useState, useEffect } from "react";
import { MainLayout } from "../components/layouts/MainLayout";
import { 
  Sparkles, 
  Check, 
  ArrowRight, 
  Star, 
  Shield, 
  Zap, 
  Clock,
  Package
} from "lucide-react";
import { Link } from "react-router-dom";

interface PremiumPlan {
  id: number;
  title: string;
  description: string;
  price: number;
  features: string[];
  popular?: boolean;
}

interface PremiumService {
  id: number;
  title: string;
  description: string;
  icon: string;
}

const Premium = () => {
  const [selectedPlan, setSelectedPlan] = useState<number>(1);
  
  const plans: PremiumPlan[] = [
    {
      id: 0,
      title: "أساسية",
      description: "للمبتدئين في تيك توك",
      price: 99.99,
      features: [
        "3 خدمات أساسية",
        "دعم بالبريد الإلكتروني",
        "تقرير أسبوعي",
        "ضمان لمدة 14 يوم"
      ]
    },
    {
      id: 1,
      title: "احترافية",
      description: "للمؤثرين الطموحين",
      price: 199.99,
      popular: true,
      features: [
        "7 خدمات متنوعة",
        "أولوية التنفيذ",
        "دعم على مدار الساعة",
        "تقارير يومية",
        "ضمان لمدة 30 يوم",
        "استشارة شهرية"
      ]
    },
    {
      id: 2,
      title: "VIP",
      description: "للمحترفين والعلامات التجارية",
      price: 349.99,
      features: [
        "جميع الخدمات المتاحة",
        "تنفيذ فوري",
        "دعم شخصي",
        "تقارير مخصصة",
        "ضمان لمدة 60 يوم",
        "استشارات أسبوعية",
        "استراتيجية محتوى مخصصة"
      ]
    }
  ];
  
  const premiumServices: PremiumService[] = [
    {
      id: 1,
      title: "متابعين مستهدفين",
      description: "زيادة المتابعين حسب الفئة المستهدفة والاهتمامات",
      icon: "👥"
    },
    {
      id: 2,
      title: "مشاهدات متكررة",
      description: "زيادة المشاهدات المتكررة لتعزيز ترتيب الفيديو",
      icon: "👁️"
    },
    {
      id: 3,
      title: "تعليقات مخصصة",
      description: "تعليقات حقيقية ومخصصة حسب محتوى الفيديو",
      icon: "💬"
    },
    {
      id: 4,
      title: "تحليل منافسين",
      description: "تحليل شامل للمنافسين واستراتيجياتهم",
      icon: "📊"
    },
    {
      id: 5,
      title: "مشاركات استراتيجية",
      description: "مشاركة المحتوى في منصات التواصل الاجتماعي المختلفة",
      icon: "🔄"
    },
    {
      id: 6,
      title: "استشارات محتوى",
      description: "نصائح احترافية لتحسين محتواك وزيادة جاذبيته",
      icon: "💡"
    }
  ];
  
  const testimonials = [
    {
      id: 1,
      name: "أحمد محمد",
      role: "مؤثر على تيك توك",
      content: "بفضل الباقة الاحترافية، زاد عدد متابعيني من 10 آلاف إلى 100 ألف خلال شهرين فقط. خدمة ممتازة!",
      rating: 5
    },
    {
      id: 2,
      name: "سارة علي",
      role: "صاحبة علامة تجارية",
      content: "حصلت على نتائج مذهلة مع باقة VIP. الدعم الشخصي والاستشارات المنتظمة كانت قيمة جداً لنمو حسابنا.",
      rating: 5
    }
  ];
  
  // Increment plan view count for analytics
  useEffect(() => {
    console.log("Premium plans page viewed");
    window.scrollTo(0, 0);
  }, []);

  return (
    <MainLayout>
      <section className="mb-8">
        <div className="text-center mb-10">
          <h1 className="text-xl font-bold inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 rounded-full mb-4">
            <Sparkles className="h-5 w-5 text-primary" />
            باقات بريميوم
          </h1>
          
          <h2 className="text-3xl sm:text-4xl font-bold mb-3">ارتقِ بحسابك على تيك توك</h2>
          
          <p className="text-muted-foreground max-w-xl mx-auto">
            اختر الباقة المناسبة لك واستمتع بمجموعة متكاملة من الخدمات المميزة لتنمية حسابك على تيك توك
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`glass-effect rounded-3xl p-6 relative overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
                plan.popular ? "ring-2 ring-primary" : ""
              }`}
            >
              {plan.popular && (
                <div className="absolute top-5 right-0 bg-primary text-white text-xs py-1 px-4 rounded-l-full">
                  الأكثر طلباً
                </div>
              )}
              
              <div className="mb-6">
                <h3 className="text-xl font-bold mb-1">{plan.title}</h3>
                <p className="text-sm text-muted-foreground">{plan.description}</p>
              </div>
              
              <div className="flex items-end gap-1 mb-6">
                <span className="text-3xl font-bold">${plan.price}</span>
                <span className="text-muted-foreground">/ شهرياً</span>
              </div>
              
              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <Check className={`h-5 w-5 ${plan.popular ? "text-primary" : "text-green-500"}`} />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              
              <button
                onClick={() => setSelectedPlan(plan.id)}
                className={`w-full py-3 rounded-xl font-medium transition-all duration-300 ${
                  selectedPlan === plan.id
                    ? "bg-primary text-white"
                    : "bg-accent hover:bg-accent/70"
                }`}
              >
                اختر هذه الباقة
              </button>
            </div>
          ))}
        </div>
        
        <div className="glass-effect rounded-3xl p-8 mb-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-3">اطلب خدمتك الآن</h3>
              <p className="text-muted-foreground mb-6">
                اختر باقة بريميوم واستمتع بجميع المزايا الحصرية. مع ضمان استرداد الأموال إذا لم تكن راضياً عن الخدمة.
              </p>
              
              <div className="flex flex-wrap gap-3 mb-6">
                <div className="flex items-center gap-2 bg-accent/40 px-3 py-1.5 rounded-full">
                  <Shield className="h-4 w-4 text-primary" />
                  <span className="text-sm">ضمان استرداد الأموال</span>
                </div>
                
                <div className="flex items-center gap-2 bg-accent/40 px-3 py-1.5 rounded-full">
                  <Zap className="h-4 w-4 text-primary" />
                  <span className="text-sm">تنفيذ سريع</span>
                </div>
                
                <div className="flex items-center gap-2 bg-accent/40 px-3 py-1.5 rounded-full">
                  <Clock className="h-4 w-4 text-primary" />
                  <span className="text-sm">دعم 24/7</span>
                </div>
              </div>
              
              <Link
                to="/checkout"
                className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-xl transition-all duration-300 hover:shadow-premium transform hover:scale-105"
              >
                طلب الآن
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
            
            <div className="flex-1">
              <div className="bg-accent/30 rounded-2xl p-5">
                <h4 className="font-bold mb-4 flex items-center gap-2">
                  <Package className="h-5 w-5 text-primary" />
                  تفاصيل الباقة المختارة:
                </h4>
                
                <div className="mb-4">
                  <h5 className="text-lg font-bold mb-1">{plans[selectedPlan].title}</h5>
                  <p className="text-primary font-bold">${plans[selectedPlan].price} / شهرياً</p>
                </div>
                
                <ul className="space-y-2 mb-4">
                  {plans[selectedPlan].features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                
                <div className="text-xs text-muted-foreground">
                  * يمكنك إلغاء الاشتراك في أي وقت
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-center mb-8">خدمات بريميوم حصرية</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {premiumServices.map((service) => (
              <div key={service.id} className="glass-effect rounded-2xl p-5 transition-all duration-300 hover:scale-[1.02]">
                <div className="flex items-start gap-3">
                  <div className="text-3xl">{service.icon}</div>
                  <div>
                    <h4 className="font-bold mb-1">{service.title}</h4>
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="rounded-3xl bg-primary/5 p-8">
          <h3 className="text-2xl font-bold text-center mb-8">ما يقوله عملاؤنا</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="glass-effect rounded-2xl p-6">
                <div className="flex items-center gap-2 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < testimonial.rating
                          ? "fill-yellow-500 text-yellow-500"
                          : "text-muted-foreground"
                      }`}
                    />
                  ))}
                </div>
                
                <p className="mb-4">"{testimonial.content}"</p>
                
                <div>
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Premium;
