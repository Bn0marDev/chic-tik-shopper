
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { MainLayout } from "../components/layouts/MainLayout";
import { 
  ArrowLeft, 
  Star, 
  Share, 
  ShoppingCart, 
  Shield, 
  Clock, 
  Zap,
  ChevronDown,
  ChevronUp,
  Check,
  AlertCircle
} from "lucide-react";

interface Service {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  packages: Package[];
}

interface Package {
  id: number;
  name: string;
  price: number;
  features: string[];
  popular?: boolean;
}

const ServiceDetails = () => {
  const { id } = useParams();
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<number>(0);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [faqOpen, setFaqOpen] = useState<Record<number, boolean>>({});
  
  // Example service data
  const service: Service = {
    id: Number(id) || 1,
    title: "زيادة متابعين حقيقيين",
    description: "زيادة متابعين حقيقيين ومتفاعلين لحسابك على تيك توك",
    longDescription: "نقدم خدمة زيادة المتابعين الحقيقيين لحسابك على تيك توك، مما يزيد من مصداقية حسابك ويساعد على زيادة الوصول والتفاعل مع المحتوى الخاص بك. متابعينا حقيقيون بنسبة 100% وليسوا حسابات مزيفة أو روبوتات، مما يضمن تفاعلهم مع محتواك ومنشوراتك. نستخدم تقنيات آمنة تماماً لحسابك وبدون الحاجة لكلمة المرور أبداً، فقط نحتاج رابط حسابك على تيك توك وسنقوم بالباقي. خدماتنا مضمونة وتبدأ في الظهور خلال 24 ساعة من بدء الطلب.",
    price: 49.99,
    image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=2000&auto=format&fit=crop",
    rating: 4.8,
    reviews: 256,
    packages: [
      {
        id: 1,
        name: "باقة أساسية",
        price: 49.99,
        features: [
          "500 متابع حقيقي",
          "ضمان بقاء 30 يوم",
          "بدء التنفيذ خلال 24 ساعة",
          "تقرير إحصائي"
        ]
      },
      {
        id: 2,
        name: "باقة محترفة",
        price: 89.99,
        popular: true,
        features: [
          "1000 متابع حقيقي",
          "ضمان بقاء 60 يوم",
          "بدء التنفيذ خلال 12 ساعة",
          "تقرير إحصائي تفصيلي",
          "دعم أولوية"
        ]
      },
      {
        id: 3,
        name: "باقة VIP",
        price: 149.99,
        features: [
          "2000 متابع حقيقي",
          "ضمان بقاء 90 يوم",
          "بدء التنفيذ فوري",
          "تقرير إحصائي احترافي",
          "دعم شخصي",
          "استشارة مجانية لتحسين المحتوى"
        ]
      }
    ]
  };

  const faqs = [
    {
      id: 1,
      question: "كم من الوقت تستغرق الخدمة حتى تبدأ؟",
      answer: "نبدأ بتنفيذ طلبك خلال 24 ساعة كحد أقصى. الباقات المتقدمة تحصل على أولوية في التنفيذ."
    },
    {
      id: 2,
      question: "هل المتابعين حقيقيين أم وهميين؟",
      answer: "جميع المتابعين في خدماتنا حقيقيون 100% وليسوا حسابات آلية، مما يضمن تفاعل أفضل مع محتواك."
    },
    {
      id: 3,
      question: "هل يمكن أن يتم حظر حسابي؟",
      answer: "لا، خدماتنا آمنة تماماً وتتبع سياسات تيك توك، ولا نطلب كلمة المرور الخاصة بك أبداً."
    },
    {
      id: 4,
      question: "ما هو ضمان الخدمة؟",
      answer: "نقدم ضمان بقاء للمتابعين حسب الباقة المختارة، وفي حال انخفاض العدد نقوم بالتعويض مجاناً."
    }
  ];

  const toggleFaq = (id: number) => {
    setFaqOpen(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleAddToCart = () => {
    setIsAddingToCart(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsAddingToCart(false);
      // Show toast or notification
      console.log("Added to cart:", service.packages[selectedPackage]);
    }, 1000);
  };

  useEffect(() => {
    // Preload image
    const img = new Image();
    img.src = service.image;
    img.onload = () => setImageLoaded(true);
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, [service.image]);

  return (
    <MainLayout>
      <div className="flex items-center mb-4">
        <Link to="/" className="button-icon mr-2">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-xl font-bold">تفاصيل الخدمة</h1>
      </div>
      
      <div className="glass-effect p-6 rounded-3xl mb-6 animate-fade-in">
        <div className="relative aspect-[2/1] rounded-2xl overflow-hidden mb-6">
          <div className="absolute inset-0 bg-primary opacity-10 blur-2xl"></div>
          <img
            src={service.image}
            alt={service.title}
            className={`w-full h-full object-cover transition-all duration-700 ${imageLoaded ? 'img-loaded' : 'img-loading'}`}
          />
        </div>
        
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-2xl font-bold">{service.title}</h2>
          
          <div className="flex gap-2">
            <button className="button-icon">
              <Share className="h-5 w-5" />
            </button>
            
            <div className="flex items-center gap-1 bg-accent/50 px-3 py-1 rounded-full">
              <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
              <span className="font-medium">{service.rating}</span>
              <span className="text-xs text-muted-foreground">({service.reviews})</span>
            </div>
          </div>
        </div>
        
        <p className="text-muted-foreground mb-4">{service.description}</p>
        
        <div className={`relative ${showFullDescription ? '' : 'max-h-24 overflow-hidden'}`}>
          <p className="text-sm">{service.longDescription}</p>
          
          {!showFullDescription && (
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-card to-transparent"></div>
          )}
        </div>
        
        <button
          onClick={() => setShowFullDescription(!showFullDescription)}
          className="flex items-center gap-1 text-primary text-sm mt-2"
        >
          {showFullDescription ? (
            <>
              عرض أقل <ChevronUp className="h-4 w-4" />
            </>
          ) : (
            <>
              عرض المزيد <ChevronDown className="h-4 w-4" />
            </>
          )}
        </button>
        
        <div className="grid grid-cols-3 gap-3 my-6">
          <div className="flex flex-col items-center text-center bg-accent/40 rounded-xl p-3">
            <Shield className="h-5 w-5 text-primary mb-1" />
            <span className="text-xs">آمن 100%</span>
          </div>
          
          <div className="flex flex-col items-center text-center bg-accent/40 rounded-xl p-3">
            <Clock className="h-5 w-5 text-primary mb-1" />
            <span className="text-xs">تنفيذ سريع</span>
          </div>
          
          <div className="flex flex-col items-center text-center bg-accent/40 rounded-xl p-3">
            <Zap className="h-5 w-5 text-primary mb-1" />
            <span className="text-xs">دعم 24/7</span>
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="font-bold mb-4 text-lg">اختر الباقة المناسبة</h3>
          
          <div className="flex flex-col gap-4">
            {service.packages.map((pkg, index) => (
              <div
                key={pkg.id}
                className={`border rounded-2xl p-4 transition-all duration-300 ${
                  selectedPackage === index
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/30"
                } ${pkg.popular ? "relative" : ""}`}
                onClick={() => setSelectedPackage(index)}
              >
                {pkg.popular && (
                  <div className="absolute -top-3 right-4 bg-primary text-white text-xs py-1 px-3 rounded-full">
                    الأكثر طلباً
                  </div>
                )}
                
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h4 className="font-bold">{pkg.name}</h4>
                    <p className="text-primary text-lg font-bold">${pkg.price}</p>
                  </div>
                  
                  <div className={`h-6 w-6 rounded-full border-2 flex items-center justify-center ${
                    selectedPackage === index
                      ? "border-primary bg-primary text-white"
                      : "border-muted-foreground"
                  }`}>
                    {selectedPackage === index && <Check className="h-4 w-4" />}
                  </div>
                </div>
                
                <ul className="space-y-2">
                  {pkg.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <Check className="h-4 w-4 text-green-500 mt-0.5" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mb-8">
          <h3 className="font-bold mb-4 text-lg">الأسئلة الشائعة</h3>
          
          <div className="space-y-3">
            {faqs.map((faq) => (
              <div key={faq.id} className="border border-border rounded-xl overflow-hidden">
                <button
                  className="flex items-center justify-between w-full p-4 text-right"
                  onClick={() => toggleFaq(faq.id)}
                >
                  <span className="font-medium">{faq.question}</span>
                  {faqOpen[faq.id] ? (
                    <ChevronUp className="h-5 w-5 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 flex-shrink-0" />
                  )}
                </button>
                
                {faqOpen[faq.id] && (
                  <div className="p-4 pt-0 text-sm text-muted-foreground border-t border-border">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center gap-3 justify-between">
          <div>
            <p className="text-sm text-muted-foreground">السعر</p>
            <p className="text-2xl font-bold">${service.packages[selectedPackage].price}</p>
          </div>
          
          <button
            onClick={handleAddToCart}
            disabled={isAddingToCart}
            className="flex-1 bg-primary hover:bg-primary/90 text-white font-medium py-3 px-6 rounded-full transition-all duration-300 hover:shadow-premium disabled:opacity-70 disabled:hover:bg-primary"
          >
            {isAddingToCart ? (
              <span className="flex items-center justify-center gap-2">
                <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                جاري الإضافة...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <ShoppingCart className="h-5 w-5" />
                إضافة للسلة
              </span>
            )}
          </button>
        </div>
      </div>
      
      <div className="glass-effect p-4 rounded-xl mb-6 flex items-center gap-3">
        <AlertCircle className="h-5 w-5 text-yellow-500 flex-shrink-0" />
        <p className="text-sm">نحتاج فقط رابط حسابك على تيك توك، ولا نطلب كلمة المرور أبداً. الأمان مضمون 100%.</p>
      </div>
    </MainLayout>
  );
};

export default ServiceDetails;
