import React, { useState, useMemo } from 'react';
import BookingModal from './BookingModal.jsx';

export default function CustomerApp({ config, onBookService, lastOrder, onResetLastOrder }) {
  const [selectedCategory, setSelectedCategory] = useState("Всі");
  const [activeBookingService, setActiveBookingService] = useState(null);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  // Extract unique categories dynamically from config.services
  const categories = useMemo(() => {
    const cats = ["Всі"];
    if (config.services && Array.isArray(config.services)) {
      config.services.forEach(s => {
        if (s.category && !cats.includes(s.category)) {
          cats.push(s.category);
        }
      });
    }
    return cats;
  }, [config.services]);

  // Filtered services
  const filteredServices = useMemo(() => {
    if (!config.services) return [];
    if (selectedCategory === "Всі") return config.services;
    return config.services.filter(s => s.category === selectedCategory);
  }, [config.services, selectedCategory]);

  const handleBookingSubmit = (orderData) => {
    onBookService(orderData);
    setShowSuccessModal(true);
  };

  return (
    <div className="min-h-full flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans">
      
      {/* 1. HERO & BRAND HEADER */}
      <div className="relative">
        {/* Cover Image with gradient overlay */}
        <div className="h-44 sm:h-52 w-full relative overflow-hidden bg-slate-800">
          <img
            src={config.coverUrl || "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80"}
            alt={config.businessName}
            className="w-full h-full object-cover object-center filter brightness-90 hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"></div>
          
          {/* Top badges */}
          <div className="absolute top-3 inset-x-3 flex justify-between items-center text-xs">
            <span className="px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white font-medium border border-white/10 flex items-center space-x-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
              <span>Працюємо зараз</span>
            </span>
            <span className="px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-bold border border-white/20 flex items-center space-x-1">
              <span>★ {config.rating || 4.9}</span>
              <span className="text-[10px] text-white/80">({config.reviewsCount || 100}+)</span>
            </span>
          </div>
        </div>

        {/* Business Profile Avatar & Title Card */}
        <div className="px-4 pt-0 -mt-12 relative z-10">
          <div className="bg-white dark:bg-slate-850 rounded-2xl p-4 shadow-lg border border-slate-200/80 dark:border-slate-800 backdrop-blur-md">
            <div className="flex items-start justify-between">
              <div className="flex items-center space-x-3.5">
                <img
                  src={config.logoUrl || "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=250&q=80"}
                  alt={config.businessName}
                  className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl object-cover border-2 border-white dark:border-slate-800 shadow-md ring-2 ring-primary/20"
                />
                <div>
                  <div className="flex items-center space-x-1.5">
                    <h1 className="text-lg sm:text-xl font-black text-slate-900 dark:text-white leading-tight">
                      {config.businessName}
                    </h1>
                    <span className="text-primary text-sm" title="Перевірений заклад">✓</span>
                  </div>
                  <p className="text-xs font-semibold text-primary mt-0.5">
                    {config.category}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                    📍 {config.contact?.address || "Київ"}
                  </p>
                </div>
              </div>
            </div>

            {/* Tagline */}
            {config.tagline && (
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 leading-relaxed italic">
                "{config.tagline}"
              </p>
            )}

            {/* Quick Action Chips */}
            <div className="flex items-center gap-2 mt-3 pt-1 overflow-x-auto scrollbar-none text-[11px]">
              {config.contact?.phone && (
                <a
                  href={`tel:${config.contact.phone}`}
                  className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 hover:text-primary transition font-medium whitespace-nowrap"
                >
                  <span>📞 Дзвінок</span>
                </a>
              )}
              {config.contact?.instagram && (
                <a
                  href={`https://instagram.com/${config.contact.instagram.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-pink-500/10 hover:text-pink-500 transition font-medium whitespace-nowrap"
                >
                  <span>📸 Instagram</span>
                </a>
              )}
              <span className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap">
                <span>🕒 {config.contact?.workingHours || "09:00 - 20:00"}</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. CATEGORY TABS */}
      <div className="px-4 mt-5">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            Оберіть послугу
          </h2>
          <span className="text-xs text-slate-400 font-medium">
            {filteredServices.length} {filteredServices.length === 1 ? 'пропозиція' : 'пропозицій'}
          </span>
        </div>

        <div className="flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap flex items-center space-x-1 ${
                  isActive
                    ? "bg-primary text-white shadow-md shadow-primary/25 scale-[1.02]"
                    : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 border border-slate-200/80 dark:border-slate-700/80"
                }`}
              >
                <span>{cat}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3. SERVICES LIST */}
      <div className="px-4 mt-3 space-y-3 flex-1 pb-20">
        {filteredServices.map((service) => (
          <div
            key={service.id}
            className="group relative bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm hover:shadow-md border border-slate-200/80 dark:border-slate-700/80 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
                      {service.category}
                    </span>
                    {service.popular && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                        🔥 Хіт
                      </span>
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white mt-1.5 leading-snug group-hover:text-primary transition-colors">
                    {service.name}
                  </h3>
                </div>

                <div className="text-right">
                  <div className="text-base font-black text-slate-900 dark:text-white tracking-tight">
                    {service.price} {config.currency || "грн"}
                  </div>
                  <span className="text-[11px] text-slate-400 font-medium">
                    ⏱️ {service.duration}
                  </span>
                </div>
              </div>

              {service.description && (
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                  {service.description}
                </p>
              )}
            </div>

            <div className="mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between">
              <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium flex items-center space-x-1">
                <span>●</span>
                <span>Є вільні години на завтра</span>
              </span>
              <button
                onClick={() => setActiveBookingService(service)}
                className="px-3.5 py-1.5 rounded-xl bg-primary hover:opacity-90 text-white font-bold text-xs tracking-wide shadow-sm shadow-primary/20 transition active:scale-95 flex items-center space-x-1"
              >
                <span>Записатися</span>
                <span>→</span>
              </button>
            </div>
          </div>
        ))}

        {filteredServices.length === 0 && (
          <div className="text-center py-12 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700">
            <span className="text-3xl">🔍</span>
            <p className="text-sm font-semibold text-slate-600 dark:text-slate-300 mt-2">
              У цій категорії поки немає послуг
            </p>
            <button
              onClick={() => setSelectedCategory("Всі")}
              className="mt-3 text-xs text-primary font-bold hover:underline"
            >
              Показати всі послуги
            </button>
          </div>
        )}
      </div>

      {/* 4. FOOTER INFO */}
      <div className="px-4 py-6 bg-slate-100 dark:bg-slate-850/60 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400 space-y-1 mt-auto">
        <p className="font-semibold text-slate-600 dark:text-slate-300">
          {config.businessName} • {config.category}
        </p>
        <p>{config.contact?.address} • {config.contact?.workingHours}</p>
        <p className="text-[10px] text-slate-400 pt-1">
          Працює на платформі <span className="font-bold text-primary">BusinessKit White-Label</span>
        </p>
      </div>

      {/* 5. BOOKING MODAL */}
      <BookingModal
        service={activeBookingService}
        config={config}
        isOpen={!!activeBookingService}
        onClose={() => setActiveBookingService(null)}
        onSubmitBooking={handleBookingSubmit}
      />

      {/* 6. SUCCESS CONFIRMATION MODAL WITH TELEGRAM DISPATCH NOTIFICATION */}
      {showSuccessModal && lastOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-center relative overflow-hidden animate-scale-up">
            
            {/* Background decorative glow */}
            <div className="absolute -top-12 -right-12 w-28 h-28 bg-emerald-500/20 rounded-full blur-xl pointer-events-none"></div>

            {/* Checkmark icon with animation */}
            <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-500 border-2 border-emerald-500/30 flex items-center justify-center mx-auto text-2xl shadow-lg shadow-emerald-500/20 mb-4 animate-bounce">
              ✓
            </div>

            <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full inline-block mb-1">
              Запис успішно створено!
            </span>
            <h3 className="text-xl font-black text-slate-900 dark:text-white">
              Дякуємо, {lastOrder.clientName}!
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Ми забронювали час для вас у <span className="font-semibold text-slate-700 dark:text-slate-200">{config.businessName}</span>
            </p>

            {/* Booking Details Card */}
            <div className="my-4 p-3.5 bg-slate-50 dark:bg-slate-800/70 rounded-2xl border border-slate-200/80 dark:border-slate-700 text-left text-xs space-y-1.5 font-medium">
              <div className="flex justify-between">
                <span className="text-slate-400">Послуга:</span>
                <span className="text-slate-900 dark:text-white font-bold">{lastOrder.serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Дата та час:</span>
                <span className="text-primary font-bold">{lastOrder.date}, {lastOrder.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">До сплати:</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{lastOrder.price} {lastOrder.currency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Номер бронювання:</span>
                <span className="font-mono text-slate-500">{lastOrder.id}</span>
              </div>
            </div>

            {/* Telegram dispatch visual banner */}
            <div className="p-2.5 bg-sky-50 dark:bg-sky-950/40 rounded-xl border border-sky-200 dark:border-sky-800/60 text-[11px] text-sky-800 dark:text-sky-300 flex items-center space-x-2 text-left mb-5">
              <span className="text-base">✈️</span>
              <div className="leading-tight">
                <span className="font-bold">Сповіщення надіслано в Telegram</span>
                <p className="text-[10px] text-sky-600 dark:text-sky-400 mt-0.5">
                  Адміністратор уже бачить ваш запис у робочому каналі.
                </p>
              </div>
            </div>

            <button
              onClick={() => {
                setShowSuccessModal(false);
                if (onResetLastOrder) onResetLastOrder();
              }}
              className="w-full py-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 font-bold text-xs shadow-md transition active:scale-95"
            >
              Готово
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
