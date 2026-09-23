import React, { useState } from 'react';

export default function BookingModal({ service, config, isOpen, onClose, onSubmitBooking }) {
  if (!isOpen || !service) return null;

  // Generate the next 5 days for easy date picking
  const days = [
    { label: "Сьогодні", sub: "23 вер", dateStr: "23.09.2026", available: true },
    { label: "Завтра", sub: "24 вер", dateStr: "24.09.2026", available: true },
    { label: "Пт", sub: "25 вер", dateStr: "25.09.2026", available: true },
    { label: "Сб", sub: "26 вер", dateStr: "26.09.2026", available: true },
    { label: "Нд", sub: "27 вер", dateStr: "27.09.2026", available: true },
  ];

  const timeSlots = [
    "10:00", "11:30", "13:00", "14:30", "16:00", "17:30", "19:00", "20:00"
  ];

  const [selectedDay, setSelectedDay] = useState(days[1]); // Default tomorrow
  const [selectedTime, setSelectedTime] = useState("13:00");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("+380 ");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!clientName.trim()) {
      newErrors.clientName = "Будь ласка, вкажіть ваше ім'я";
    }

    if (!clientPhone.trim() || clientPhone.replace(/\D/g, '').length < 10) {
      newErrors.clientPhone = "Введіть коректний номер (мінімум 10 цифр)";
    }

    if (!selectedTime) {
      newErrors.selectedTime = "Оберіть зручний час";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const orderData = {
        id: "BK-" + Math.floor(1000 + Math.random() * 9000),
        clientName: clientName.trim(),
        clientPhone: clientPhone.trim(),
        serviceId: service.id,
        serviceName: service.name,
        price: service.price,
        currency: config.currency || "грн",
        duration: service.duration,
        date: `${selectedDay.label} (${selectedDay.sub})`,
        rawDate: selectedDay.dateStr,
        time: selectedTime,
        comment: comment.trim(),
        status: "new", // 'new' | 'confirmed' | 'completed' | 'cancelled'
        createdAt: new Date().toISOString(),
        businessName: config.businessName
      };

      onSubmitBooking(orderData);
      setIsSubmitting(false);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full sm:max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh] animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">Швидкий онлайн-запис</span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {config.businessName}
            </h3>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            ✕
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Selected Service Card */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/60 dark:to-slate-800 border border-slate-200/80 dark:border-slate-700/60 flex items-start justify-between">
            <div className="pr-3">
              <span className="text-[11px] font-semibold text-primary px-2 py-0.5 rounded-full bg-primary/10 inline-block mb-1">
                {service.category || "Послуга"}
              </span>
              <h4 className="font-bold text-slate-900 dark:text-white text-base leading-snug">
                {service.name}
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                {service.description}
              </p>
              <div className="flex items-center space-x-3 mt-2 text-xs text-slate-600 dark:text-slate-300 font-medium">
                <span>⏱️ {service.duration}</span>
              </div>
            </div>
            <div className="text-right whitespace-nowrap">
              <span className="text-xs text-slate-400 block">Вартість</span>
              <span className="text-lg font-black text-slate-900 dark:text-white">
                {service.price} {config.currency || "грн"}
              </span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Date Selection */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
                1. Оберіть дату візиту
              </label>
              <div className="grid grid-cols-5 gap-2">
                {days.map((d, idx) => {
                  const isSelected = selectedDay.dateStr === d.dateStr;
                  return (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setSelectedDay(d)}
                      className={`flex flex-col items-center justify-center p-2.5 rounded-xl border text-center transition-all ${
                        isSelected
                          ? "border-primary bg-primary text-white shadow-md shadow-primary/20 scale-[1.02]"
                          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-200"
                      }`}
                    >
                      <span className="text-[11px] font-semibold uppercase">{d.label}</span>
                      <span className={`text-xs mt-0.5 ${isSelected ? "text-white/90" : "text-slate-400 font-medium"}`}>
                        {d.sub}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Slot Selection */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                  2. Оберіть час
                </label>
                <span className="text-[11px] text-slate-400">Вільні вікна майстра</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map((slot) => {
                  const isSelected = selectedTime === slot;
                  return (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => {
                        setSelectedTime(slot);
                        if (errors.selectedTime) setErrors(prev => ({ ...prev, selectedTime: null }));
                      }}
                      className={`py-2 px-1 text-xs font-bold rounded-xl border transition-all text-center ${
                        isSelected
                          ? "border-primary bg-primary text-white shadow-sm shadow-primary/20"
                          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-600 text-slate-700 dark:text-slate-200"
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
              {errors.selectedTime && (
                <p className="text-xs text-rose-500 mt-1 font-medium">{errors.selectedTime}</p>
              )}
            </div>

            {/* Client Information Form */}
            <div className="space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300">
                3. Ваші контактні дані
              </label>

              <div>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-slate-400 text-sm">👤</span>
                  <input
                    type="text"
                    value={clientName}
                    onChange={(e) => {
                      setClientName(e.target.value);
                      if (errors.clientName) setErrors(prev => ({ ...prev, clientName: null }));
                    }}
                    placeholder="Ваше ім'я (напр. Олена)"
                    className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border bg-slate-50/50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition ${
                      errors.clientName ? "border-rose-400 focus:border-rose-500" : "border-slate-200 dark:border-slate-700 focus:border-primary"
                    }`}
                  />
                </div>
                {errors.clientName && (
                  <p className="text-xs text-rose-500 mt-1 font-medium">{errors.clientName}</p>
                )}
              </div>

              <div>
                <div className="relative">
                  <span className="absolute left-3.5 top-3 text-slate-400 text-sm">📞</span>
                  <input
                    type="tel"
                    value={clientPhone}
                    onChange={(e) => {
                      setClientPhone(e.target.value);
                      if (errors.clientPhone) setErrors(prev => ({ ...prev, clientPhone: null }));
                    }}
                    placeholder="+380 97 123 4567"
                    className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border bg-slate-50/50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 transition ${
                      errors.clientPhone ? "border-rose-400 focus:border-rose-500" : "border-slate-200 dark:border-slate-700 focus:border-primary"
                    }`}
                  />
                </div>
                {errors.clientPhone && (
                  <p className="text-xs text-rose-500 mt-1 font-medium">{errors.clientPhone}</p>
                )}
              </div>

              <div>
                <input
                  type="text"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Коментар чи побажання (необов'язково)"
                  className="w-full px-4 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800/80 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition"
                />
              </div>
            </div>

            {/* Submit Action */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 px-4 rounded-2xl bg-primary hover:opacity-95 text-white font-bold text-sm tracking-wide shadow-lg shadow-primary/25 transition active:scale-[0.99] flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Відправляємо запис...</span>
                  </>
                ) : (
                  <>
                    <span>✨ Затвердити бронювання</span>
                    <span className="opacity-80">({service.price} {config.currency || "грн"})</span>
                  </>
                )}
              </button>
              <p className="text-[11px] text-center text-slate-400 mt-2">
                🔒 Миттєве підтвердження • Без передоплати
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
