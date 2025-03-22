
import { useState } from "react";
import { MainLayout } from "../components/layouts/MainLayout";
import { User, Settings, LogOut, Package, CreditCard, History, Edit } from "lucide-react";
import { useTheme } from "@/hooks/useTheme";
import { cn } from "@/lib/utils";

const Profile = () => {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'settings'>('profile');
  
  const user = {
    name: "Bn0mar",
    email: "bn0mar@example.com",
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
    phone: "+218 91-123-4567",
    address: "طرابلس، ليبيا",
    joinDate: new Date("2023-01-15")
  };
  
  const orders = [
    {
      id: "ORD-12345",
      date: new Date("2023-11-25"),
      status: "مكتمل",
      total: 79.98,
      items: 2
    },
    {
      id: "ORD-12341",
      date: new Date("2023-10-12"),
      status: "مكتمل",
      total: 49.99,
      items: 1
    },
    {
      id: "ORD-12334",
      date: new Date("2023-09-05"),
      status: "مكتمل",
      total: 109.97,
      items: 3
    }
  ];
  
  const renderProfileContent = () => (
    <div className="animate-fade-in">
      <div className="flex flex-col sm:flex-row gap-6 items-center sm:items-start mb-8">
        <div className="relative">
          <div className="h-24 w-24 rounded-full overflow-hidden border-4 border-primary/20">
            <img 
              src={user.avatar} 
              alt={user.name} 
              className="h-full w-full object-cover"
            />
          </div>
          <button className="absolute bottom-0 right-0 bg-primary text-white p-1.5 rounded-full">
            <Edit className="h-4 w-4" />
          </button>
        </div>
        
        <div className="text-center sm:text-right">
          <h2 className="text-2xl font-bold">{user.name}</h2>
          <p className="text-muted-foreground">{user.email}</p>
          <p className="text-sm mt-2">عضو منذ {user.joinDate.toLocaleDateString('ar-LY')}</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <div className={cn("p-4 rounded-xl border",
          theme === 'dark' ? "bg-card border-border/40" : "bg-white border-slate-200/60")}>
          <h3 className="font-medium text-muted-foreground mb-2">معلومات الاتصال</h3>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-muted-foreground">البريد الإلكتروني</p>
              <p>{user.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">رقم الهاتف</p>
              <p>{user.phone}</p>
            </div>
          </div>
        </div>
        
        <div className={cn("p-4 rounded-xl border",
          theme === 'dark' ? "bg-card border-border/40" : "bg-white border-slate-200/60")}>
          <h3 className="font-medium text-muted-foreground mb-2">العنوان</h3>
          <p>{user.address}</p>
          <button className="text-primary text-sm mt-2">تحديث العنوان</button>
        </div>
      </div>
      
      <div className={cn("p-4 rounded-xl border mb-4",
        theme === 'dark' ? "bg-card border-border/40" : "bg-white border-slate-200/60")}>
        <h3 className="font-medium mb-2">آخر الطلبات</h3>
        {orders.length > 0 ? (
          <div className="space-y-3">
            {orders.slice(0, 2).map(order => (
              <div key={order.id} className="flex justify-between items-center">
                <div>
                  <p className="font-medium">{order.id}</p>
                  <p className="text-sm text-muted-foreground">
                    {order.date.toLocaleDateString('ar-LY')} • {order.items} خدمات
                  </p>
                </div>
                <div className="text-right">
                  <span className="inline-block px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-500">
                    {order.status}
                  </span>
                  <p className="font-medium">{order.total.toFixed(2)} د.ل</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">لا توجد طلبات سابقة</p>
        )}
        
        {orders.length > 2 && (
          <button 
            onClick={() => setActiveTab('orders')}
            className="text-primary text-sm mt-3"
          >
            عرض جميع الطلبات
          </button>
        )}
      </div>
    </div>
  );
  
  const renderOrdersContent = () => (
    <div className="animate-fade-in">
      <h2 className="text-xl font-bold mb-4">طلباتي</h2>
      
      {orders.length > 0 ? (
        <div className="space-y-4">
          {orders.map(order => (
            <div 
              key={order.id} 
              className={cn("p-4 rounded-xl border flex flex-col sm:flex-row justify-between",
                theme === 'dark' ? "bg-card border-border/40" : "bg-white border-slate-200/60")}
            >
              <div>
                <p className="font-bold">{order.id}</p>
                <p className="text-sm text-muted-foreground">
                  {order.date.toLocaleDateString('ar-LY')}
                </p>
                <span className="inline-block mt-2 px-2 py-1 text-xs rounded-full bg-green-500/10 text-green-500">
                  {order.status}
                </span>
              </div>
              
              <div className="mt-3 sm:mt-0 sm:text-right">
                <p className="text-sm text-muted-foreground">{order.items} خدمات</p>
                <p className="font-bold mt-1">{order.total.toFixed(2)} د.ل</p>
                <button className="text-primary text-sm mt-2">
                  عرض التفاصيل
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <Package className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
          <h3 className="font-bold text-lg mb-1">لا توجد طلبات</h3>
          <p className="text-muted-foreground mb-4">لم تقم بإجراء أي طلبات حتى الآن</p>
          <button 
            onClick={() => setActiveTab('profile')}
            className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-colors"
          >
            استكشاف الخدمات
          </button>
        </div>
      )}
    </div>
  );
  
  const renderSettingsContent = () => (
    <div className="animate-fade-in">
      <h2 className="text-xl font-bold mb-4">الإعدادات</h2>
      
      <div className="space-y-6">
        <div className={cn("p-4 rounded-xl border",
          theme === 'dark' ? "bg-card border-border/40" : "bg-white border-slate-200/60")}>
          <h3 className="font-medium mb-3">بيانات الحساب</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-1">الاسم</label>
              <input 
                type="text" 
                defaultValue={user.name}
                className={cn("w-full p-2 rounded-lg border",
                  theme === 'dark' ? "bg-background border-border" : "bg-white border-slate-200")}
              />
            </div>
            
            <div>
              <label className="block text-sm text-muted-foreground mb-1">البريد الإلكتروني</label>
              <input 
                type="email" 
                defaultValue={user.email}
                className={cn("w-full p-2 rounded-lg border",
                  theme === 'dark' ? "bg-background border-border" : "bg-white border-slate-200")}
              />
            </div>
            
            <div>
              <label className="block text-sm text-muted-foreground mb-1">رقم الهاتف</label>
              <input 
                type="tel" 
                defaultValue={user.phone}
                className={cn("w-full p-2 rounded-lg border",
                  theme === 'dark' ? "bg-background border-border" : "bg-white border-slate-200")}
              />
            </div>
            
            <div>
              <label className="block text-sm text-muted-foreground mb-1">العنوان</label>
              <input 
                type="text" 
                defaultValue={user.address}
                className={cn("w-full p-2 rounded-lg border",
                  theme === 'dark' ? "bg-background border-border" : "bg-white border-slate-200")}
              />
            </div>
          </div>
          
          <button className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-colors mt-4">
            حفظ التغييرات
          </button>
        </div>
        
        <div className={cn("p-4 rounded-xl border",
          theme === 'dark' ? "bg-card border-border/40" : "bg-white border-slate-200/60")}>
          <h3 className="font-medium mb-3">كلمة المرور</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-muted-foreground mb-1">كلمة المرور الحالية</label>
              <input 
                type="password" 
                className={cn("w-full p-2 rounded-lg border",
                  theme === 'dark' ? "bg-background border-border" : "bg-white border-slate-200")}
              />
            </div>
            
            <div>
              <label className="block text-sm text-muted-foreground mb-1">كلمة المرور الجديدة</label>
              <input 
                type="password" 
                className={cn("w-full p-2 rounded-lg border",
                  theme === 'dark' ? "bg-background border-border" : "bg-white border-slate-200")}
              />
            </div>
          </div>
          
          <button className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-colors mt-4">
            تغيير كلمة المرور
          </button>
        </div>
        
        <div className={cn("p-4 rounded-xl border",
          theme === 'dark' ? "bg-card border-border/40" : "bg-white border-slate-200/60")}>
          <h3 className="font-medium mb-3">الإشعارات</h3>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">إشعارات البريد الإلكتروني</p>
                <p className="text-sm text-muted-foreground">استلام تنبيهات عبر البريد الإلكتروني</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked className="sr-only peer" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium">إشعارات العروض والخصومات</p>
                <p className="text-sm text-muted-foreground">تلقي إشعارات بالعروض الجديدة</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-11 h-6 bg-muted peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
              </label>
            </div>
          </div>
          
          <button className="bg-primary hover:bg-primary/90 text-white font-medium py-2 px-4 rounded-lg transition-colors mt-4">
            حفظ التفضيلات
          </button>
        </div>
      </div>
    </div>
  );
  
  return (
    <MainLayout>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="md:col-span-1">
          <div className={cn("sticky top-20 p-4 rounded-xl border",
            theme === 'dark' ? "bg-card border-border/40" : "bg-white border-slate-200/60 shadow-sm")}>
            <div className="flex flex-row md:flex-col gap-1">
              <button
                onClick={() => setActiveTab('profile')}
                className={cn("flex items-center gap-2 w-full p-2 rounded-lg text-right transition-colors",
                  activeTab === 'profile' 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "hover:bg-accent/50"
                )}
              >
                <User className="h-5 w-5" />
                <span className="hidden md:inline">الملف الشخصي</span>
              </button>
              
              <button
                onClick={() => setActiveTab('orders')}
                className={cn("flex items-center gap-2 w-full p-2 rounded-lg text-right transition-colors",
                  activeTab === 'orders' 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "hover:bg-accent/50"
                )}
              >
                <History className="h-5 w-5" />
                <span className="hidden md:inline">طلباتي</span>
              </button>
              
              <button
                onClick={() => setActiveTab('settings')}
                className={cn("flex items-center gap-2 w-full p-2 rounded-lg text-right transition-colors",
                  activeTab === 'settings' 
                    ? "bg-primary/10 text-primary font-medium" 
                    : "hover:bg-accent/50"
                )}
              >
                <Settings className="h-5 w-5" />
                <span className="hidden md:inline">الإعدادات</span>
              </button>
              
              <button
                className="flex items-center gap-2 w-full p-2 rounded-lg text-right text-destructive hover:bg-destructive/10 transition-colors mt-auto md:mt-4"
              >
                <LogOut className="h-5 w-5" />
                <span className="hidden md:inline">تسجيل الخروج</span>
              </button>
            </div>
          </div>
        </div>
        
        <div className="md:col-span-3">
          {activeTab === 'profile' && renderProfileContent()}
          {activeTab === 'orders' && renderOrdersContent()}
          {activeTab === 'settings' && renderSettingsContent()}
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
