
import { useState } from "react";
import { MainLayout } from "../components/layouts/MainLayout";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

interface CartItem {
  id: number;
  title: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
}

const Cart = () => {
  const { theme } = useTheme();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      title: "زيادة متابعين حقيقيين",
      description: "زيادة متابعين حقيقيين ومتفاعلين لحسابك على تيك توك",
      price: 49.99,
      quantity: 1,
      image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=1000&auto=format&fit=crop"
    },
    {
      id: 2,
      title: "زيادة مشاهدات الفيديو",
      description: "زيادة مشاهدات الفيديوهات لزيادة الوصول والانتشار",
      price: 29.99,
      quantity: 2,
      image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?q=80&w=1000&auto=format&fit=crop"
    }
  ]);

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  if (cartItems.length === 0) {
    return (
      <MainLayout>
        <div className="py-12 flex flex-col items-center justify-center text-center">
          <div className={cn("p-6 rounded-full mb-4", 
            theme === 'dark' ? "bg-accent/50" : "bg-slate-100")}>
            <ShoppingCart className="h-10 w-10 text-muted-foreground" />
          </div>
          <h1 className="text-2xl font-bold mb-2">سلة التسوق فارغة</h1>
          <p className="text-muted-foreground mb-6">لم تقم بإضافة أي خدمات إلى سلة التسوق بعد</p>
          <Link
            to="/explore"
            className="bg-primary hover:bg-primary/90 text-white font-medium py-2.5 px-6 rounded-full transition-all duration-300"
          >
            استكشاف الخدمات
          </Link>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="mb-6">
        <h1 className="text-xl font-bold">سلة التسوق</h1>
        <p className="text-muted-foreground">مراجعة وتعديل الخدمات قبل الدفع</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          {cartItems.map((item) => (
            <div
              key={item.id}
              className={cn("flex flex-col sm:flex-row gap-4 p-4 rounded-xl mb-4 border",
                theme === 'dark' ? "bg-card border-border/40" : "bg-white border-slate-200/60 shadow-sm")}
            >
              <div className="h-24 w-24 flex-shrink-0 rounded-lg overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-grow">
                <div className="flex justify-between">
                  <h3 className="font-bold">{item.title}</h3>
                  <button
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-muted-foreground hover:text-destructive transition-colors"
                    aria-label="حذف من السلة"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>

                <p className="text-sm text-muted-foreground mb-2 line-clamp-1">
                  {item.description}
                </p>

                <div className="flex justify-between items-center mt-auto">
                  <div className="flex items-center border rounded-lg overflow-hidden">
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                      className={cn("p-1.5", 
                        theme === 'dark' ? "hover:bg-accent/50" : "hover:bg-slate-100")}
                      aria-label="تقليل الكمية"
                    >
                      <Minus className="h-4 w-4" />
                    </button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <button
                      onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                      className={cn("p-1.5", 
                        theme === 'dark' ? "hover:bg-accent/50" : "hover:bg-slate-100")}
                      aria-label="زيادة الكمية"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="font-bold">{(item.price * item.quantity).toFixed(2)} د.ل</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={cn("rounded-xl p-4 h-fit border",
            theme === 'dark' ? "bg-card border-border/40" : "bg-white border-slate-200/60 shadow-sm")}>
          <h3 className="font-bold text-lg mb-4">ملخص الطلب</h3>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between">
              <span className="text-muted-foreground">المجموع الفرعي</span>
              <span>{totalPrice.toFixed(2)} د.ل</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">الضريبة (5%)</span>
              <span>{(totalPrice * 0.05).toFixed(2)} د.ل</span>
            </div>
            <div className="border-t border-border pt-2 mt-2">
              <div className="flex justify-between font-bold">
                <span>المجموع</span>
                <span>{(totalPrice * 1.05).toFixed(2)} د.ل</span>
              </div>
            </div>
          </div>

          <button className="w-full bg-primary hover:bg-primary/90 text-white font-medium py-2.5 rounded-lg transition-colors">
            الانتقال إلى الدفع
          </button>
          
          <Link
            to="/explore"
            className="w-full block text-center mt-2 text-sm text-primary hover:underline"
          >
            مواصلة التسوق
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default Cart;
