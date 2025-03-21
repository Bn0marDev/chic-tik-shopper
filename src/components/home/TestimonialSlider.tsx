
import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  rating: number;
  avatar: string;
}

export function TestimonialSlider() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "سارة أحمد",
      role: "صانعة محتوى",
      content: "خدمات ممتازة ساعدتني في زيادة متابعيني بشكل كبير وزيادة وصول المحتوى الخاص بي لجمهور أكبر.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/44.jpg"
    },
    {
      id: 2,
      name: "محمد خالد",
      role: "مؤثر",
      content: "كنت متردداً في البداية، ولكن بعد تجربة الخدمات لاحظت زيادة كبيرة في التفاعل والمشاهدات.",
      rating: 4,
      avatar: "https://randomuser.me/api/portraits/men/86.jpg"
    },
    {
      id: 3,
      name: "ليلى عمر",
      role: "مسوقة",
      content: "ساعدتني خدماتهم في الوصول إلى الجمهور المستهدف بسرعة كبيرة وتحقيق أهداف حملاتي التسويقية.",
      rating: 5,
      avatar: "https://randomuser.me/api/portraits/women/63.jpg"
    }
  ];

  const handlePrev = () => {
    setDirection('left');
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setDirection('right');
    setActiveIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleImageLoad = (id: number) => {
    setImagesLoaded(prev => ({ ...prev, [id]: true }));
  };

  useEffect(() => {
    // Auto-rotate testimonials
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [activeIndex]);

  useEffect(() => {
    // Preload images
    testimonials.forEach(testimonial => {
      const img = new Image();
      img.src = testimonial.avatar;
      img.onload = () => handleImageLoad(testimonial.id);
    });
  }, []);

  return (
    <section className="mb-10 py-10">
      <h2 className="text-xl font-bold text-center mb-8">ماذا يقول عملاؤنا</h2>
      
      <div className="relative max-w-3xl mx-auto">
        <div className="absolute inset-0 bg-primary opacity-5 blur-3xl rounded-full"></div>
        
        <div className="relative overflow-hidden glass-effect rounded-2xl p-6 sm:p-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className={`transition-all duration-500 absolute inset-0 p-6 sm:p-8 ${
                index === activeIndex
                  ? "opacity-100 translate-x-0"
                  : "opacity-0 " +
                    (direction === "right"
                      ? "translate-x-full"
                      : "-translate-x-full")
              }`}
              style={{ display: index === activeIndex ? "block" : "none" }}
            >
              <div className="flex flex-col sm:flex-row gap-6 items-center">
                <div className="flex-shrink-0">
                  <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary/30">
                    <img
                      src={testimonial.avatar}
                      alt={testimonial.name}
                      className={`w-full h-full object-cover ${imagesLoaded[testimonial.id] ? 'img-loaded' : 'img-loading'}`}
                      onLoad={() => handleImageLoad(testimonial.id)}
                    />
                  </div>
                </div>
                
                <div className="flex-1 text-center sm:text-right">
                  <Quote className="h-8 w-8 text-primary/30 mb-3 mx-auto sm:mr-0" />
                  
                  <p className="mb-4 text-lg">{testimonial.content}</p>
                  
                  <div className="flex items-center justify-center sm:justify-start mb-2">
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
                  
                  <h4 className="font-bold">{testimonial.name}</h4>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="flex justify-center mt-5 gap-2">
          <button
            onClick={handlePrev}
            className="button-icon bg-accent/50 hover:bg-accent"
            aria-label="Previous testimonial"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          
          <div className="flex items-center gap-2">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index < activeIndex ? 'left' : 'right');
                  setActiveIndex(index);
                }}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  index === activeIndex
                    ? "bg-primary w-6"
                    : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
          
          <button
            onClick={handleNext}
            className="button-icon bg-accent/50 hover:bg-accent"
            aria-label="Next testimonial"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
