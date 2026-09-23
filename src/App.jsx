import React, { useState, useEffect } from 'react';
import { businessConfig } from './config.js';
import CustomerApp from './components/CustomerApp.jsx';
import PhoneMockup from './components/PhoneMockup.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import TelegramAlert from './components/TelegramAlert.jsx';
import WhiteLabelDemo from './components/WhiteLabelDemo.jsx';

// Initial sample orders for first-time dashboard demonstration
const INITIAL_DEMO_ORDERS = [
  {
    id: "BK-7891",
    clientName: "Олена Коваленко",
    clientPhone: "+380 67 111 22 33",
    serviceId: "srv-2",
    serviceName: "Комплексний преміум-манікюр",
    price: 750,
    currency: "грн",
    duration: "60 хв",
    date: "Завтра (24 вер)",
    time: "14:00",
    comment: "Прошу нагадати за годину через SMS",
    status: "new",
    createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
    businessName: "Luxe Studio"
  },
  {
    id: "BK-7890",
    clientName: "Максим Шевченко",
    clientPhone: "+380 50 222 33 44",
    serviceId: "srv-1",
    serviceName: "Стрижка та авторське укладання",
    price: 650,
    currency: "грн",
    duration: "45 хв",
    date: "Сьогодні (23 вер)",
    time: "17:30",
    comment: "",
    status: "confirmed",
    createdAt: new Date(Date.now() - 120 * 60000).toISOString(),
    businessName: "Luxe Studio"
  },
  {
    id: "BK-7889",
    clientName: "Ірина Мельник",
    clientPhone: "+380 93 444 55 66",
    serviceId: "srv-3",
    serviceName: "SPA-догляд та масаж обличчя",
    price: 1200,
    currency: "грн",
    duration: "60 хв",
    date: "23 вер",
    time: "11:00",
    comment: "Чутлива шкіра",
    status: "completed",
    createdAt: new Date(Date.now() - 360 * 60000).toISOString(),
    businessName: "Luxe Studio"
  }
];

export default function App() {
  // Navigation mode: "customer" | "admin"
  const [activeTab, setActiveTab] = useState("customer");

  // Device display mode for customer widget: phone frame vs full width
  const [isFullWidth, setIsFullWidth] = useState(false);

  // Active configuration (defaults to businessConfig from config.js)
  const [currentConfig, setCurrentConfig] = useState(businessConfig);

  // Orders stored in localStorage
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem("businesskit_orders");
      return saved ? JSON.parse(saved) : INITIAL_DEMO_ORDERS;
    } catch (e) {
      return INITIAL_DEMO_ORDERS;
    }
  });

  // State for simulated Telegram notification pop-up
  const [telegramNotification, setTelegramNotification] = useState(null);
  const [lastOrder, setLastOrder] = useState(null);

  // State for White-Label preset switcher modal
  const [isWhiteLabelModalOpen, setIsWhiteLabelModalOpen] = useState(false);

  // Synchronize orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("businesskit_orders", JSON.stringify(orders));
    } catch (e) {
      console.error("Помилка збереження в localStorage:", e);
    }
  }, [orders]);

  // Inject primary and accent brand colors as CSS custom variables
  useEffect(() => {
    const root = document.documentElement;
    if (currentConfig.primaryColor) {
      root.style.setProperty('--color-primary', currentConfig.primaryColor);
    }
    if (currentConfig.accentColor) {
      root.style.setProperty('--color-accent', currentConfig.accentColor);
    }
  }, [currentConfig]);

  // Handle new booking coming from Customer App
  const handleNewBooking = (newOrder) => {
    const enrichedOrder = {
      ...newOrder,
      businessName: currentConfig.businessName
    };

    setOrders((prev) => [enrichedOrder, ...prev]);
    setLastOrder(enrichedOrder);
    setTelegramNotification(enrichedOrder);
  };

  // Update order status in Admin Dashboard
  const handleUpdateStatus = (orderId, newStatus) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  // Delete order
  const handleDeleteOrder = (orderId) => {
    setOrders((prev) => prev.filter((order) => order.id !== orderId));
  };

  // Generate quick sample booking
  const handleAddSampleOrder = () => {
    const randomNames = ["Юлія Бондар", "Денис Кравчук", "Марія Литвин", "Артем Васильєв", "Світлана Ткач"];
    const randomName = randomNames[Math.floor(Math.random() * randomNames.length)];
    const randomService = currentConfig.services[Math.floor(Math.random() * currentConfig.services.length)] || {
      id: "srv-demo",
      name: "Експрес послуга",
      price: 500,
      duration: "30 хв"
    };

    const newSample = {
      id: "BK-" + Math.floor(1000 + Math.random() * 9000),
      clientName: randomName,
      clientPhone: `+380 9${Math.floor(10000000 + Math.random() * 90000000)}`,
      serviceId: randomService.id,
      serviceName: randomService.name,
      price: randomService.price,
      currency: currentConfig.currency || "грн",
      duration: randomService.duration,
      date: "Сьогодні (" + new Date().toLocaleDateString('uk-UA', { day: 'numeric', month: 'short' }) + ")",
      time: `${Math.floor(10 + Math.random() * 8)}:00`,
      comment: "Створено через адмін-панель для тестування",
      status: "new",
      createdAt: new Date().toISOString(),
      businessName: currentConfig.businessName
    };

    handleNewBooking(newSample);
  };

  // Reset to default sample orders
  const handleResetOrders = () => {
    if (window.confirm("Скинути базу замовлень до початкових демо-записів?")) {
      setOrders(INITIAL_DEMO_ORDERS);
      localStorage.removeItem("businesskit_orders");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col font-sans transition-colors duration-200">
      
      {/* GLOBAL TOP NAVIGATION & CONTROL BAR */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm px-4 sm:px-6 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Brand Identity / MVP Logo */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-indigo-600 flex items-center justify-center text-white font-black text-base shadow-md shadow-primary/20">
              BK
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-extrabold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white">
                  BusinessKit
                </span>
                <span className="text-[10px] font-bold uppercase tracking-wider bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20">
                  White-Label MVP
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
                Поточний бізнес: <strong className="text-slate-800 dark:text-slate-200">{currentConfig.businessName}</strong> ({currentConfig.category})
              </p>
            </div>
          </div>

          {/* Center Tabs: Customer App vs Admin Dashboard */}
          <nav className="flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-inner">
            <button
              onClick={() => setActiveTab("customer")}
              className={`flex items-center space-x-1.5 px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                activeTab === "customer"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <span>📱</span>
              <span>Клієнтський віджет</span>
            </button>
            <button
              onClick={() => setActiveTab("admin")}
              className={`flex items-center space-x-1.5 px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all relative ${
                activeTab === "admin"
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm"
                  : "text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white"
              }`}
            >
              <span>💼</span>
              <span>Адмін-панель</span>
              {orders.filter(o => o.status === 'new').length > 0 && (
                <span className="w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm">
                  {orders.filter(o => o.status === 'new').length}
                </span>
              )}
            </button>
          </nav>

          {/* Quick Actions: White-Label Configurator & View Mode */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsWhiteLabelModalOpen(true)}
              className="px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition active:scale-95 flex items-center space-x-1.5"
              title="Кастомізувати бренд та перемикати пресети"
            >
              <span>🎨</span>
              <span className="hidden md:inline">White-Label Конфіг</span>
            </button>
          </div>

        </div>
      </header>

      {/* MAIN VIEWPORT CONTAINER */}
      <main className="flex-1">
        {activeTab === "customer" ? (
          <PhoneMockup
            isFullWidth={isFullWidth}
            onToggleViewMode={() => setIsFullWidth(!isFullWidth)}
            activePresetName={currentConfig.businessName}
          >
            <CustomerApp
              config={currentConfig}
              onBookService={handleNewBooking}
              lastOrder={lastOrder}
              onResetLastOrder={() => setLastOrder(null)}
            />
          </PhoneMockup>
        ) : (
          <AdminDashboard
            orders={orders}
            config={currentConfig}
            onUpdateStatus={handleUpdateStatus}
            onDeleteOrder={handleDeleteOrder}
            onAddSampleOrder={handleAddSampleOrder}
            onResetOrders={handleResetOrders}
          />
        )}
      </main>

      {/* SIMULATED TELEGRAM LIVE NOTIFICATION */}
      <TelegramAlert
        order={telegramNotification}
        onClose={() => setTelegramNotification(null)}
        onOpenAdmin={() => {
          setActiveTab("admin");
          setTelegramNotification(null);
        }}
      />

      {/* WHITE-LABEL DEMO PRESET SWITCHER & CUSTOMIZER */}
      <WhiteLabelDemo
        currentConfig={currentConfig}
        isOpen={isWhiteLabelModalOpen}
        onClose={() => setIsWhiteLabelModalOpen(false)}
        onSelectPreset={(newPreset) => setCurrentConfig(newPreset)}
        onCustomUpdate={(customFields) => setCurrentConfig(prev => ({ ...prev, ...customFields }))}
      />

    </div>
  );
}
