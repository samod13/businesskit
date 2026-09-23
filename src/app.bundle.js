import { businessConfig, businessPresets, getLocalized } from './config.js';
import { translations } from './translations.js';
const _global = typeof window !== 'undefined' ? window : globalThis;
const React = _global.React;
const ReactDOM = _global.ReactDOM;
const {
  useState,
  useEffect,
  useMemo,
  useRef
} = React;

// --- Dynamic Date Generator with Locale Support ---
function getNextDays(locale = 'it') {
  const days = [];
  const now = new Date();
  for (let i = 0; i < 5; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    let label = "";
    if (i === 0) {
      label = locale === 'it' ? "Oggi" : locale === 'uk' ? "Сьогодні" : "Today";
    } else if (i === 1) {
      label = locale === 'it' ? "Domani" : locale === 'uk' ? "Завтра" : "Tomorrow";
    } else {
      label = d.toLocaleDateString(locale === 'uk' ? 'uk-UA' : locale === 'it' ? 'it-IT' : 'en-US', {
        weekday: 'short'
      });
    }
    const sub = d.toLocaleDateString(locale === 'uk' ? 'uk-UA' : locale === 'it' ? 'it-IT' : 'en-US', {
      day: 'numeric',
      month: 'short'
    });
    const dateStr = `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getFullYear()}`;
    days.push({
      label,
      sub,
      dateStr
    });
  }
  return days;
}

// Initial demo orders for first-time visitors
function getInitialOrders(lang = 'it') {
  if (lang === 'uk') {
    return [{
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
    }, {
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
    }, {
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
    }];
  } else if (lang === 'en') {
    return [{
      id: "BK-7891",
      clientName: "Emily Watson",
      clientPhone: "+1 202 555 0192",
      serviceId: "srv-2",
      serviceName: "Deluxe Spa Manicure with Gel Polish",
      price: 40,
      currency: "€",
      duration: "60 min",
      date: "Tomorrow (Sep 24)",
      time: "14:00",
      comment: "Please confirm via SMS",
      status: "new",
      createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
      businessName: "Luxe Studio"
    }, {
      id: "BK-7890",
      clientName: "David Miller",
      clientPhone: "+1 415 555 2671",
      serviceId: "srv-1",
      serviceName: "Signature Haircut & Blowout",
      price: 45,
      currency: "€",
      duration: "45 min",
      date: "Today (Sep 23)",
      time: "17:30",
      comment: "",
      status: "confirmed",
      createdAt: new Date(Date.now() - 120 * 60000).toISOString(),
      businessName: "Luxe Studio"
    }, {
      id: "BK-7889",
      clientName: "Sarah Davis",
      clientPhone: "+1 312 555 8899",
      serviceId: "srv-3",
      serviceName: "Anti-Aging Facial with Lymphatic Massage",
      price: 85,
      currency: "€",
      duration: "60 min",
      date: "Sep 23",
      time: "11:00",
      comment: "Sensitive skin preference",
      status: "completed",
      createdAt: new Date(Date.now() - 360 * 60000).toISOString(),
      businessName: "Luxe Studio"
    }];
  } else {
    return [{
      id: "BK-7891",
      clientName: "Giulia Romano",
      clientPhone: "+39 340 123 4567",
      serviceId: "srv-2",
      serviceName: "Manicure Spa Completa con Semipermanente",
      price: 40,
      currency: "€",
      duration: "60 min",
      date: "Domani (24 set)",
      time: "14:00",
      comment: "Richiesta conferma via WhatsApp",
      status: "new",
      createdAt: new Date(Date.now() - 15 * 60000).toISOString(),
      businessName: "Luxe Studio"
    }, {
      id: "BK-7890",
      clientName: "Alessandro Ferrari",
      clientPhone: "+39 335 987 6543",
      serviceId: "srv-1",
      serviceName: "Taglio e Piega Stilistica",
      price: 45,
      currency: "€",
      duration: "45 min",
      date: "Oggi (23 set)",
      time: "17:30",
      comment: "",
      status: "confirmed",
      createdAt: new Date(Date.now() - 120 * 60000).toISOString(),
      businessName: "Luxe Studio"
    }, {
      id: "BK-7889",
      clientName: "Chiara Ricci",
      clientPhone: "+39 320 444 5566",
      serviceId: "srv-3",
      serviceName: "Trattamento Viso Anti-Age con Massaggio Linfodrenante",
      price: 85,
      currency: "€",
      duration: "60 min",
      date: "23 set",
      time: "11:00",
      comment: "Pelle sensibile",
      status: "completed",
      createdAt: new Date(Date.now() - 360 * 60000).toISOString(),
      businessName: "Luxe Studio"
    }];
  }
}

// ==============================================================================
// 1. PHONE MOCKUP COMPONENT
// ==============================================================================
function PhoneMockup({
  children,
  isFullWidth,
  onToggleViewMode,
  businessName,
  t
}) {
  if (isFullWidth) {
    return /*#__PURE__*/React.createElement("div", {
      className: "w-full min-h-screen bg-slate-50 dark:bg-slate-900 pb-16 transition-colors duration-300"
    }, /*#__PURE__*/React.createElement("div", {
      className: "max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between mb-4 bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700"
    }, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-300"
    }, /*#__PURE__*/React.createElement("span", {
      className: "inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"
    }), /*#__PURE__*/React.createElement("span", {
      className: "font-medium"
    }, t.desktopModeTitle, " (", businessName, ")")), /*#__PURE__*/React.createElement("button", {
      onClick: onToggleViewMode,
      className: "inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-xs font-semibold text-slate-800 dark:text-slate-100 transition shadow-sm active:scale-95"
    }, /*#__PURE__*/React.createElement("span", null, t.switchToPhone))), /*#__PURE__*/React.createElement("div", {
      className: "bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden"
    }, children)));
  }
  return /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col items-center justify-center py-6 px-3 min-h-[calc(100vh-80px)]"
  }, /*#__PURE__*/React.createElement("div", {
    className: "mb-4 flex items-center justify-between gap-3 w-full max-w-[400px] px-2 text-xs font-medium text-slate-600 dark:text-slate-300"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-1.5 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full shadow-sm border border-slate-200 dark:border-slate-700"
  }, /*#__PURE__*/React.createElement("span", {
    className: "inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"
  }), /*#__PURE__*/React.createElement("span", null, t.mockupTitle)), /*#__PURE__*/React.createElement("button", {
    onClick: onToggleViewMode,
    className: "inline-flex items-center space-x-1 px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm transition active:scale-95"
  }, /*#__PURE__*/React.createElement("span", null, t.switchToDesktop))), /*#__PURE__*/React.createElement("div", {
    className: "relative w-full max-w-[395px] h-[844px] bg-slate-900 rounded-[52px] p-[10px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1),inset_0_0_0_2px_rgba(255,255,255,0.15)] ring-1 ring-slate-800 flex flex-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "absolute -left-[12px] top-[115px] w-[3px] h-[26px] bg-slate-700 rounded-l-sm"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute -left-[12px] top-[155px] w-[3px] h-[48px] bg-slate-700 rounded-l-sm"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute -left-[12px] top-[215px] w-[3px] h-[48px] bg-slate-700 rounded-l-sm"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute -right-[12px] top-[170px] w-[3px] h-[60px] bg-slate-700 rounded-r-sm"
  }), /*#__PURE__*/React.createElement("div", {
    className: "relative w-full h-full bg-white dark:bg-slate-900 rounded-[44px] overflow-hidden flex flex-col"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative z-30 h-11 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center justify-between px-7 pt-1 select-none"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold text-slate-900 dark:text-white tracking-tight"
  }, "09:41"), /*#__PURE__*/React.createElement("div", {
    className: "absolute left-1/2 -translate-x-1/2 top-2 w-[100px] h-[26px] bg-black rounded-full flex items-center justify-end px-2.5 space-x-1.5 shadow-inner"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-2.5 h-2.5 rounded-full bg-slate-900 ring-1 ring-slate-800"
  }), /*#__PURE__*/React.createElement("div", {
    className: "w-2 h-2 rounded-full bg-emerald-500/70 animate-pulse"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-1.5 text-xs text-slate-900 dark:text-white"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCF6"), /*#__PURE__*/React.createElement("span", null, "\uD83D\uDD0B"))), /*#__PURE__*/React.createElement("div", {
    className: "flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-none select-none"
  }, children), /*#__PURE__*/React.createElement("div", {
    className: "relative z-30 h-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm flex items-center justify-center pointer-events-none"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-32 h-1 bg-slate-300 dark:bg-slate-600 rounded-full"
  })))));
}

// ==============================================================================
// 2. BOOKING MODAL COMPONENT
// ==============================================================================
function BookingModal({
  service,
  config,
  isOpen,
  onClose,
  onSubmitBooking,
  t,
  lang
}) {
  if (!isOpen || !service) return null;
  const days = useMemo(() => getNextDays(lang), [lang]);
  const timeSlots = ["09:30", "11:00", "12:30", "14:00", "15:30", "17:00", "18:30", "20:00"];
  const [selectedDay, setSelectedDay] = useState(days[1] || days[0]);
  const [selectedTime, setSelectedTime] = useState("14:00");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState(lang === 'uk' ? '+380 ' : lang === 'en' ? '+1 ' : '+39 ');
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (lang === 'uk' && clientPhone === '+39 ') setClientPhone('+380 ');
    if (lang === 'en' && (clientPhone === '+39 ' || clientPhone === '+380 ')) setClientPhone('+1 ');
    if (lang === 'it' && (clientPhone === '+380 ' || clientPhone === '+1 ')) setClientPhone('+39 ');
  }, [lang]);
  const handleSubmit = e => {
    e.preventDefault();
    const errs = {};
    if (!clientName.trim()) errs.clientName = t.errName;
    const digits = clientPhone.replace(/\D/g, '');
    if (digits.length < 7) {
      errs.clientPhone = t.errPhone;
    }
    if (!selectedTime) errs.selectedTime = t.errTime;
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const localizedServiceName = getLocalized(service.name, lang);
      const localizedCategory = getLocalized(service.category, lang);
      const localizedPrice = getLocalized(service.price, lang);
      const localizedCurrency = getLocalized(config.currency, lang) || (lang === 'uk' ? 'грн' : '€');
      const localizedDuration = getLocalized(service.duration, lang);
      const newOrder = {
        id: "BK-" + Math.floor(1000 + Math.random() * 9000),
        clientName: clientName.trim(),
        clientPhone: clientPhone.trim(),
        serviceId: service.id,
        serviceName: localizedServiceName,
        category: localizedCategory,
        price: localizedPrice,
        currency: localizedCurrency,
        duration: localizedDuration,
        date: selectedDay.label + " (" + selectedDay.sub + ")",
        time: selectedTime,
        comment: comment.trim(),
        status: "new",
        createdAt: new Date().toISOString(),
        businessName: config.businessName
      };
      setIsSubmitting(false);
      onSubmitBooking(newOrder);
      onClose();
    }, 450);
  };
  const localizedSrvName = getLocalized(service.name, lang);
  const localizedSrvCategory = getLocalized(service.category, lang);
  const localizedSrvPrice = getLocalized(service.price, lang);
  const localizedSrvDuration = getLocalized(service.duration, lang);
  const localizedCurrency = getLocalized(config.currency, lang) || (lang === 'uk' ? 'грн' : '€');
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in font-sans"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[92vh] animate-slide-up sm:animate-scale-up",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/80 dark:bg-slate-850"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-base font-black text-slate-900 dark:text-white"
  }, t.quickBookingTitle), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 dark:text-slate-400"
  }, config.businessName)), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition"
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "px-6 py-3 bg-primary/5 dark:bg-primary/10 border-b border-primary/10 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-bold uppercase tracking-wider text-primary"
  }, localizedSrvCategory), /*#__PURE__*/React.createElement("h4", {
    className: "text-sm font-bold text-slate-900 dark:text-white"
  }, localizedSrvName)), /*#__PURE__*/React.createElement("div", {
    className: "text-right"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-base font-black text-primary"
  }, localizedSrvPrice, " ", localizedCurrency), /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] block text-slate-400"
  }, "\u23F1\uFE0F ", localizedSrvDuration))), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    className: "p-6 overflow-y-auto space-y-5 flex-1"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2"
  }, t.step1Date), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-5 gap-2"
  }, days.map((day, idx) => {
    const isSelected = selectedDay.dateStr === day.dateStr;
    return /*#__PURE__*/React.createElement("button", {
      key: idx,
      type: "button",
      onClick: () => setSelectedDay(day),
      className: `p-2.5 rounded-2xl flex flex-col items-center justify-center transition border ${isSelected ? "bg-primary text-white border-primary shadow-md shadow-primary/25 scale-105" : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-primary/50"}`
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-[11px] font-bold leading-tight"
    }, day.label), /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] opacity-80 mt-0.5"
    }, day.sub));
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-2"
  }, t.step2Time), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-4 gap-2"
  }, timeSlots.map(time => {
    const isSelected = selectedTime === time;
    return /*#__PURE__*/React.createElement("button", {
      key: time,
      type: "button",
      onClick: () => setSelectedTime(time),
      className: `py-2 px-1 text-xs font-bold rounded-xl transition border text-center ${isSelected ? "bg-primary text-white border-primary shadow-sm shadow-primary/25" : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-300"}`
    }, time);
  }))), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3 pt-1"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider"
  }, t.step3Contact), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: clientName,
    onChange: e => setClientName(e.target.value),
    placeholder: t.namePlaceholder,
    className: `w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border ${errors.clientName ? "border-rose-500 ring-1 ring-rose-500" : "border-slate-200 dark:border-slate-700"} text-xs font-medium focus:outline-none focus:border-primary`
  }), errors.clientName && /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-rose-500 mt-1 font-medium"
  }, errors.clientName)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    type: "tel",
    value: clientPhone,
    onChange: e => setClientPhone(e.target.value),
    placeholder: t.phonePlaceholder,
    className: `w-full px-3.5 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border ${errors.clientPhone ? "border-rose-500 ring-1 ring-rose-500" : "border-slate-200 dark:border-slate-700"} text-xs font-medium focus:outline-none focus:border-primary`
  }), errors.clientPhone && /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-rose-500 mt-1 font-medium"
  }, errors.clientPhone)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("textarea", {
    rows: 2,
    value: comment,
    onChange: e => setComment(e.target.value),
    placeholder: t.commentPlaceholder,
    className: "w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium focus:outline-none focus:border-primary resize-none"
  }))), /*#__PURE__*/React.createElement("div", {
    className: "pt-2"
  }, /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: isSubmitting,
    className: "w-full py-3.5 rounded-2xl bg-primary hover:opacity-95 text-white font-extrabold text-sm shadow-lg shadow-primary/30 transition active:scale-95 disabled:opacity-50"
  }, isSubmitting ? t.submittingBtn : t.confirmBookingBtn), /*#__PURE__*/React.createElement("p", {
    className: "text-center text-[11px] text-slate-400 mt-2 font-medium"
  }, "\uD83D\uDD12 ", t.instantConfirmNotice)))));
}

// ==============================================================================
// 3. CUSTOMER APP COMPONENT
// ==============================================================================
function CustomerApp({
  config,
  onBookService,
  lastOrder,
  onResetLastOrder,
  t,
  lang
}) {
  const [selectedCat, setSelectedCat] = useState("all");
  const [bookingSrv, setBookingSrv] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  // Reset category filter when switching languages so categories always match
  useEffect(() => {
    setSelectedCat("all");
  }, [lang]);
  const categories = useMemo(() => {
    const list = [{
      id: "all",
      label: t.all || "All"
    }];
    const seen = new Set();
    if (config.services && Array.isArray(config.services)) {
      config.services.forEach(s => {
        const cat = getLocalized(s.category, lang);
        if (cat && !seen.has(cat)) {
          seen.add(cat);
          list.push({
            id: cat,
            label: cat
          });
        }
      });
    }
    return list;
  }, [config.services, lang, t.all]);
  const filtered = useMemo(() => {
    if (!config.services) return [];
    if (selectedCat === "all") return config.services;
    return config.services.filter(s => getLocalized(s.category, lang) === selectedCat);
  }, [config.services, selectedCat, lang]);
  const localizedBusinessCategory = getLocalized(config.category, lang);
  const localizedTagline = getLocalized(config.tagline, lang);
  const localizedAddress = getLocalized(config.contact?.address, lang);
  const localizedWorkingHours = getLocalized(config.contact?.workingHours, lang);
  const localizedCurrency = getLocalized(config.currency, lang) || (lang === 'uk' ? 'грн' : '€');
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-full flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-44 sm:h-52 w-full relative overflow-hidden bg-slate-800"
  }, /*#__PURE__*/React.createElement("img", {
    src: config.coverUrl || "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=1200&q=80",
    alt: config.businessName,
    className: "w-full h-full object-cover brightness-90 hover:scale-105 transition-transform duration-700"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/40 to-transparent"
  }), /*#__PURE__*/React.createElement("div", {
    className: "absolute top-3 inset-x-3 flex justify-between items-center text-xs"
  }, /*#__PURE__*/React.createElement("span", {
    className: "px-2.5 py-1 rounded-full bg-black/40 backdrop-blur-md text-white font-medium border border-white/10 flex items-center space-x-1"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"
  }), /*#__PURE__*/React.createElement("span", null, t.openNow)), /*#__PURE__*/React.createElement("span", {
    className: "px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-bold border border-white/20"
  }, "\u2605 ", config.rating || 4.9, " (", config.reviewsCount || 100, "+ ", t.reviews, ")"))), /*#__PURE__*/React.createElement("div", {
    className: "px-4 pt-0 -mt-12 relative z-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-slate-850 rounded-2xl p-4 shadow-lg border border-slate-200/80 dark:border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3.5"
  }, /*#__PURE__*/React.createElement("img", {
    src: config.logoUrl || "https://images.unsplash.com/photo-1560066984-138dadb4c035?auto=format&fit=crop&w=250&q=80",
    alt: config.businessName,
    className: "w-14 h-14 rounded-2xl object-cover border-2 border-white dark:border-slate-800 shadow-md ring-2 ring-primary/20"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-black text-slate-900 dark:text-white leading-tight"
  }, config.businessName), /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-primary mt-0.5"
  }, localizedBusinessCategory), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1"
  }, "\uD83D\uDCCD ", localizedAddress))), localizedTagline && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-600 dark:text-slate-300 mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 italic"
  }, "\"", localizedTagline, "\""), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mt-3 pt-1 overflow-x-auto scrollbar-none text-[11px]"
  }, config.contact?.phone && /*#__PURE__*/React.createElement("a", {
    href: `tel:${config.contact.phone}`,
    className: "px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 hover:text-primary transition font-medium whitespace-nowrap"
  }, "\uD83D\uDCDE ", t.call), config.contact?.instagram && /*#__PURE__*/React.createElement("a", {
    href: `https://instagram.com/${config.contact.instagram.replace('@', '')}`,
    target: "_blank",
    rel: "noreferrer",
    className: "px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-pink-500/10 hover:text-pink-500 transition font-medium whitespace-nowrap"
  }, "\uD83D\uDCF8 Instagram"), /*#__PURE__*/React.createElement("span", {
    className: "px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap"
  }, "\uD83D\uDD52 ", localizedWorkingHours))))), /*#__PURE__*/React.createElement("div", {
    className: "px-4 mt-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
  }, t.selectService), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-400"
  }, filtered.length, " ", t.available)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none"
  }, categories.map(cat => /*#__PURE__*/React.createElement("button", {
    key: cat.id,
    onClick: () => setSelectedCat(cat.id),
    className: `px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${selectedCat === cat.id ? "bg-primary text-white shadow-md shadow-primary/25 scale-[1.02]" : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300"}`
  }, cat.label)))), /*#__PURE__*/React.createElement("div", {
    className: "px-4 mt-3 space-y-3 flex-1 pb-20"
  }, filtered.map(srv => {
    const srvName = getLocalized(srv.name, lang);
    const srvCategory = getLocalized(srv.category, lang);
    const srvPrice = getLocalized(srv.price, lang);
    const srvDuration = getLocalized(srv.duration, lang);
    const srvDescription = getLocalized(srv.description, lang);
    return /*#__PURE__*/React.createElement("div", {
      key: srv.id,
      className: "bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-200/80 dark:border-slate-700/80 transition hover:shadow-md flex flex-col justify-between"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex items-start justify-between gap-3"
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center space-x-2"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
    }, srvCategory), srv.popular && /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20"
    }, "\uD83D\uDD25 ", t.popularHit)), /*#__PURE__*/React.createElement("h3", {
      className: "text-sm font-bold text-slate-900 dark:text-white mt-1.5"
    }, srvName)), /*#__PURE__*/React.createElement("div", {
      className: "text-right whitespace-nowrap pl-2"
    }, /*#__PURE__*/React.createElement("div", {
      className: "text-base font-black text-slate-900 dark:text-white"
    }, srvPrice, " ", localizedCurrency), /*#__PURE__*/React.createElement("span", {
      className: "text-[11px] text-slate-400"
    }, "\u23F1\uFE0F ", srvDuration))), srvDescription && /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed"
    }, srvDescription)), /*#__PURE__*/React.createElement("div", {
      className: "mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-[11px] text-emerald-600 dark:text-emerald-400 font-medium"
    }, "\u25CF ", t.freeSlotsTomorrow), /*#__PURE__*/React.createElement("button", {
      onClick: () => setBookingSrv(srv),
      className: "px-3.5 py-1.5 rounded-xl bg-primary text-white font-bold text-xs shadow-sm shadow-primary/20 transition active:scale-95"
    }, t.bookNow)));
  })), /*#__PURE__*/React.createElement(BookingModal, {
    service: bookingSrv,
    config: config,
    isOpen: !!bookingSrv,
    onClose: () => setBookingSrv(null),
    onSubmitBooking: order => {
      onBookService(order);
      setShowSuccess(true);
    },
    t: t,
    lang: lang
  }), showSuccess && lastOrder && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in font-sans"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-center animate-scale-up"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-500 border-2 border-emerald-500/30 flex items-center justify-center mx-auto text-2xl shadow-lg mb-4 animate-bounce"
  }, "\u2713"), /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full inline-block mb-1"
  }, t.bookingSuccessBadge), /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-black text-slate-900 dark:text-white"
  }, t.thankYou, ", ", lastOrder.clientName, "!"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 dark:text-slate-400 mt-1"
  }, t.bookingSummaryDesc, " ", /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-slate-700 dark:text-slate-200"
  }, config.businessName)), /*#__PURE__*/React.createElement("div", {
    className: "my-4 p-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-left text-xs space-y-1.5 font-medium"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, t.serviceLabel), /*#__PURE__*/React.createElement("span", {
    className: "font-bold"
  }, lastOrder.serviceName)), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, t.dateTimeLabel), /*#__PURE__*/React.createElement("span", {
    className: "text-primary font-bold"
  }, lastOrder.date, ", ", lastOrder.time)), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, t.priceLabel), /*#__PURE__*/React.createElement("span", {
    className: "text-emerald-600 font-bold"
  }, lastOrder.price, " ", lastOrder.currency)), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, t.bookingIdLabel), /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-slate-500"
  }, "#", lastOrder.id.slice(-4)))), /*#__PURE__*/React.createElement("div", {
    className: "p-2.5 bg-sky-50 dark:bg-sky-950/40 rounded-xl border border-sky-200 dark:border-sky-800/60 text-[11px] text-sky-800 dark:text-sky-300 flex items-center space-x-2 text-left mb-5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-base"
  }, "\u2708\uFE0F"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "font-bold"
  }, t.telegramNoticeTitle), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-sky-600 dark:text-sky-400"
  }, t.telegramNoticeDesc))), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setShowSuccess(false);
      onResetLastOrder && onResetLastOrder();
    },
    className: "w-full py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs shadow-md active:scale-95 transition"
  }, t.doneBtn))));
}

// ==============================================================================
// 4. ADMIN DASHBOARD COMPONENT
// ==============================================================================
function AdminDashboard({
  orders,
  onUpdateStatus,
  onDeleteOrder,
  onAddSampleOrder,
  onResetOrders,
  config,
  t,
  lang
}) {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");
  const filtered = useMemo(() => {
    return orders.filter(o => {
      const match = o.clientName?.toLowerCase().includes(search.toLowerCase()) || o.clientPhone?.toLowerCase().includes(search.toLowerCase()) || o.serviceName?.toLowerCase().includes(search.toLowerCase()) || o.id?.toLowerCase().includes(search.toLowerCase());
      return match && (filter === "all" || o.status === filter);
    });
  }, [orders, search, filter]);
  const totalRevenue = orders.filter(o => o.status !== 'cancelled').reduce((acc, c) => acc + (Number(c.price) || 0), 0);
  const newCount = orders.filter(o => o.status === 'new').length;
  const confirmedCount = orders.filter(o => o.status === 'confirmed').length;
  const completedCount = orders.filter(o => o.status === 'completed').length;
  const avgCheck = orders.length > 0 ? Math.round(totalRevenue / (orders.length - orders.filter(o => o.status === 'cancelled').length || 1)) : 0;
  const localizedCurrency = getLocalized(config.currency, lang) || (lang === 'uk' ? 'грн' : '€');
  const handleExportCSV = () => {
    const headers = [t.thIdTime, t.thClientPhone, t.thService, t.thDate, t.thPrice, t.thStatus, t.telegramNotes];
    const rows = orders.map(o => [o.id, `"${o.clientName} (${o.clientPhone})"`, `"${o.serviceName}"`, `"${o.date} ${o.time}"`, `${o.price} ${o.currency}`, o.status, `"${o.comment || ''}"`]);
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `orders_${config.businessName.toLowerCase().replace(/\s+/g, '_')}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const getStatusLabel = st => {
    if (st === 'new') return t.statusNew;
    if (st === 'confirmed') return t.statusConfirmed;
    if (st === 'completed') return t.statusCompleted;
    if (st === 'cancelled') return t.statusCancelled;
    return st;
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in font-sans"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-850 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-xl"
  }, "\uD83D\uDCCA"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-xl sm:text-2xl font-black text-slate-900 dark:text-white"
  }, t.adminTitle, ": ", config.businessName), /*#__PURE__*/React.createElement("span", {
    className: "text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/20"
  }, "Live CRM")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5"
  }, t.adminSubtitle))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 flex-wrap"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onAddSampleOrder,
    className: "px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition flex items-center space-x-1.5 active:scale-95"
  }, /*#__PURE__*/React.createElement("span", null, t.addTestLead)), /*#__PURE__*/React.createElement("button", {
    onClick: handleExportCSV,
    className: "px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition flex items-center space-x-1.5 active:scale-95"
  }, /*#__PURE__*/React.createElement("span", null, t.exportCsv)), /*#__PURE__*/React.createElement("button", {
    onClick: onResetOrders,
    className: "px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-rose-50 hover:text-rose-600 text-slate-400 text-xs font-semibold transition active:scale-95"
  }, /*#__PURE__*/React.createElement("span", null, t.resetDb)))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-slate-850 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-slate-400 text-xs font-bold uppercase tracking-wider"
  }, t.totalLeads), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 flex items-baseline space-x-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-3xl font-black text-slate-900 dark:text-white"
  }, orders.length), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-emerald-500 font-bold"
  }, "+", orders.slice(0, 3).length, " ", t.todayLeads)), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 text-[11px] text-slate-400"
  }, newCount, " ", t.pendingReview)), /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-slate-850 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-slate-400 text-xs font-bold uppercase tracking-wider"
  }, t.expectedRevenue), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 flex items-baseline space-x-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-3xl font-black text-slate-900 dark:text-white"
  }, totalRevenue), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-bold text-slate-400"
  }, localizedCurrency)), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 text-[11px] text-slate-400"
  }, t.activeBookings)), /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-slate-850 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-slate-400 text-xs font-bold uppercase tracking-wider"
  }, t.averageCheck), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 flex items-baseline space-x-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-3xl font-black text-slate-900 dark:text-white"
  }, avgCheck), /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-bold text-slate-400"
  }, localizedCurrency)), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 text-[11px] text-slate-400"
  }, t.perClient)), /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-slate-850 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-slate-400 text-xs font-bold uppercase tracking-wider"
  }, t.statusFunnel), /*#__PURE__*/React.createElement("div", {
    className: "mt-3 flex items-center justify-between text-xs"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-amber-500 font-bold"
  }, "\uD83D\uDFE1 ", newCount), /*#__PURE__*/React.createElement("span", {
    className: "text-sky-500 font-bold"
  }, "\uD83D\uDD35 ", confirmedCount), /*#__PURE__*/React.createElement("span", {
    className: "text-emerald-500 font-bold"
  }, "\uD83D\uDFE2 ", completedCount)), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-slate-100 dark:bg-slate-700 h-2 rounded-full overflow-hidden flex mt-3"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${newCount / (orders.length || 1) * 100}%`
    },
    className: "bg-amber-400"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${confirmedCount / (orders.length || 1) * 100}%`
    },
    className: "bg-sky-400"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${completedCount / (orders.length || 1) * 100}%`
    },
    className: "bg-emerald-400"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-slate-850 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 sm:p-6 border-b border-slate-100 dark:border-slate-800 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative flex-1 max-w-md"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: search,
    onChange: e => setSearch(e.target.value),
    placeholder: t.searchPlaceholder,
    className: "w-full pl-9 pr-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs focus:outline-none focus:border-primary"
  }), /*#__PURE__*/React.createElement("span", {
    className: "absolute left-3 top-2.5 text-xs text-slate-400"
  }, "\uD83D\uDD0D")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-1.5 overflow-x-auto scrollbar-none text-xs font-semibold"
  }, ['all', 'new', 'confirmed', 'completed', 'cancelled'].map(st => /*#__PURE__*/React.createElement("button", {
    key: st,
    onClick: () => setFilter(st),
    className: `px-3 py-1.5 rounded-xl transition ${filter === st ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900" : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200"}`
  }, st === 'all' && t.filterAll, st === 'new' && t.filterNew, st === 'confirmed' && t.filterConfirmed, st === 'completed' && t.filterCompleted, st === 'cancelled' && t.filterCancelled)))), /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full text-left text-xs"
  }, /*#__PURE__*/React.createElement("thead", {
    className: "bg-slate-50 dark:bg-slate-800/60 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-100 dark:border-slate-800"
  }, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", {
    className: "py-3 px-4"
  }, t.thIdTime), /*#__PURE__*/React.createElement("th", {
    className: "py-3 px-4"
  }, t.thClientPhone), /*#__PURE__*/React.createElement("th", {
    className: "py-3 px-4"
  }, t.thService), /*#__PURE__*/React.createElement("th", {
    className: "py-3 px-4"
  }, t.thDate), /*#__PURE__*/React.createElement("th", {
    className: "py-3 px-4"
  }, t.thPrice), /*#__PURE__*/React.createElement("th", {
    className: "py-3 px-4"
  }, t.thStatus), /*#__PURE__*/React.createElement("th", {
    className: "py-3 px-4 text-right"
  }, t.thActions))), /*#__PURE__*/React.createElement("tbody", {
    className: "divide-y divide-slate-100 dark:divide-slate-800 font-medium"
  }, filtered.length === 0 ? /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: 7,
    className: "py-12 text-center text-slate-400"
  }, t.noOrdersFound)) : filtered.map(o => /*#__PURE__*/React.createElement("tr", {
    key: o.id,
    className: "hover:bg-slate-50/60 dark:hover:bg-slate-800/40 transition"
  }, /*#__PURE__*/React.createElement("td", {
    className: "py-3.5 px-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-mono font-bold text-slate-800 dark:text-slate-200"
  }, "#", o.id), /*#__PURE__*/React.createElement("span", {
    className: "block text-[10px] text-slate-400 mt-0.5"
  }, new Date(o.createdAt).toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit'
  }))), /*#__PURE__*/React.createElement("td", {
    className: "py-3.5 px-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-bold text-slate-900 dark:text-white"
  }, o.clientName), /*#__PURE__*/React.createElement("a", {
    href: `tel:${o.clientPhone}`,
    className: "text-primary text-[11px] hover:underline font-mono"
  }, o.clientPhone)), /*#__PURE__*/React.createElement("td", {
    className: "py-3.5 px-4"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-semibold"
  }, o.serviceName), o.comment && /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-slate-400 italic line-clamp-1"
  }, "\"", o.comment, "\"")), /*#__PURE__*/React.createElement("td", {
    className: "py-3.5 px-4 whitespace-nowrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-bold text-slate-800 dark:text-slate-200"
  }, o.date), /*#__PURE__*/React.createElement("span", {
    className: "block text-[11px] text-slate-400"
  }, "\u23F0 ", o.time)), /*#__PURE__*/React.createElement("td", {
    className: "py-3.5 px-4 whitespace-nowrap font-black text-slate-900 dark:text-white"
  }, o.price, " ", o.currency), /*#__PURE__*/React.createElement("td", {
    className: "py-3.5 px-4"
  }, /*#__PURE__*/React.createElement("select", {
    value: o.status,
    onChange: e => onUpdateStatus(o.id, e.target.value),
    className: "px-2 py-1 rounded-lg text-xs font-bold bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 focus:outline-none"
  }, /*#__PURE__*/React.createElement("option", {
    value: "new"
  }, t.statusNew), /*#__PURE__*/React.createElement("option", {
    value: "confirmed"
  }, t.statusConfirmed), /*#__PURE__*/React.createElement("option", {
    value: "completed"
  }, t.statusCompleted), /*#__PURE__*/React.createElement("option", {
    value: "cancelled"
  }, t.statusCancelled))), /*#__PURE__*/React.createElement("td", {
    className: "py-3.5 px-4 text-right"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (confirm(t.deleteConfirm + ` #${o.id}?`)) {
        onDeleteOrder(o.id);
      }
    },
    className: "p-1.5 rounded-lg text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition",
    title: t.deleteServiceBtn
  }, "\uD83D\uDDD1\uFE0F")))))))));
}

// ==============================================================================
// 5. CREATOR STUDIO (AREA PRIVATA CREATORE)
// ==============================================================================
function CreatorStudio({
  config,
  onSaveConfig,
  onResetToDefault,
  t,
  lang
}) {
  const [activeTab, setActiveTab] = useState("branding");

  // Localized values for current language or fallback
  const [form, setForm] = useState(() => ({
    businessName: config.businessName || "Luxe Studio",
    category: getLocalized(config.category, lang),
    tagline: getLocalized(config.tagline, lang),
    rating: config.rating || 4.95,
    reviewsCount: config.reviewsCount || 142,
    logoUrl: config.logoUrl || "",
    coverUrl: config.coverUrl || "",
    primaryColor: config.primaryColor || "#7c3aed",
    accentColor: config.accentColor || "#db2777",
    currency: getLocalized(config.currency, lang) || (lang === 'uk' ? 'грн' : '€'),
    contact: {
      phone: config.contact?.phone || "",
      address: getLocalized(config.contact?.address, lang),
      workingHours: getLocalized(config.contact?.workingHours, lang),
      instagram: config.contact?.instagram || "",
      telegramBot: config.contact?.telegramBot || ""
    },
    services: config.services ? [...config.services] : []
  }));

  // Keep form in sync if language switches
  useEffect(() => {
    setForm(prev => ({
      ...prev,
      category: getLocalized(config.category, lang),
      tagline: getLocalized(config.tagline, lang),
      currency: getLocalized(config.currency, lang) || (lang === 'uk' ? 'грн' : '€'),
      contact: {
        ...prev.contact,
        address: getLocalized(config.contact?.address, lang),
        workingHours: getLocalized(config.contact?.workingHours, lang)
      }
    }));
  }, [lang, config]);
  const [toastMessage, setToastMessage] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [serviceModal, setServiceModal] = useState(false);
  const [srvForm, setSrvForm] = useState({
    id: "",
    name: "",
    category: "",
    price: 50,
    duration: "45 min",
    description: "",
    popular: false
  });
  const palettes = [{
    name: "Luxe Violet & Pink",
    primary: "#7c3aed",
    accent: "#db2777"
  }, {
    name: "Blade Amber & Slate",
    primary: "#d97706",
    accent: "#334155"
  }, {
    name: "Apex Sky & Red",
    primary: "#0284c7",
    accent: "#ef4444"
  }, {
    name: "Bio Emerald & Gold",
    primary: "#059669",
    accent: "#d97706"
  }, {
    name: "Coffee Warm & Orange",
    primary: "#92400e",
    accent: "#ea580c"
  }, {
    name: "Cyber Neon & Indigo",
    primary: "#4f46e5",
    accent: "#06b6d4"
  }];
  const showToast = msg => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };
  const handleApply = () => {
    // Merge back: preserve multilingual objects where not overwritten
    const updated = {
      ...config,
      ...form,
      // If user typed string in form, preserve or wrap
      category: typeof config.category === 'object' ? {
        ...config.category,
        [lang]: form.category
      } : form.category,
      tagline: typeof config.tagline === 'object' ? {
        ...config.tagline,
        [lang]: form.tagline
      } : form.tagline,
      currency: typeof config.currency === 'object' ? {
        ...config.currency,
        [lang]: form.currency
      } : form.currency,
      contact: {
        ...config.contact,
        ...form.contact,
        address: typeof config.contact?.address === 'object' ? {
          ...config.contact.address,
          [lang]: form.contact.address
        } : form.contact.address,
        workingHours: typeof config.contact?.workingHours === 'object' ? {
          ...config.contact.workingHours,
          [lang]: form.contact.workingHours
        } : form.contact.workingHours
      },
      services: form.services
    };
    onSaveConfig(updated);
    showToast(t.changesAppliedToast);
  };
  const openAddService = () => {
    setEditingIndex(null);
    setSrvForm({
      id: "srv-" + Date.now(),
      name: "",
      category: form.services[0] ? getLocalized(form.services[0].category, lang) : "General",
      price: 50,
      duration: "45 min",
      description: "",
      popular: false
    });
    setServiceModal(true);
  };
  const openEditService = idx => {
    setEditingIndex(idx);
    const s = form.services[idx];
    setSrvForm({
      id: s.id,
      name: getLocalized(s.name, lang),
      category: getLocalized(s.category, lang),
      price: getLocalized(s.price, lang),
      duration: getLocalized(s.duration, lang),
      description: getLocalized(s.description, lang),
      popular: !!s.popular
    });
    setServiceModal(true);
  };
  const handleSaveService = e => {
    e.preventDefault();
    if (!srvForm.name.trim()) return;
    const list = [...form.services];
    if (editingIndex !== null) {
      const orig = list[editingIndex];
      list[editingIndex] = {
        ...orig,
        name: typeof orig.name === 'object' ? {
          ...orig.name,
          [lang]: srvForm.name
        } : srvForm.name,
        category: typeof orig.category === 'object' ? {
          ...orig.category,
          [lang]: srvForm.category
        } : srvForm.category,
        price: typeof orig.price === 'object' ? {
          ...orig.price,
          [lang]: Number(srvForm.price)
        } : Number(srvForm.price),
        duration: typeof orig.duration === 'object' ? {
          ...orig.duration,
          [lang]: srvForm.duration
        } : srvForm.duration,
        description: typeof orig.description === 'object' ? {
          ...orig.description,
          [lang]: srvForm.description
        } : srvForm.description,
        popular: srvForm.popular
      };
    } else {
      list.push({
        ...srvForm,
        price: Number(srvForm.price)
      });
    }
    setForm(prev => ({
      ...prev,
      services: list
    }));
    setServiceModal(false);
  };
  const handleDeleteService = idx => {
    if (confirm(t.deleteConfirm + ` ${getLocalized(form.services[idx].name, lang)}?`)) {
      setForm(prev => ({
        ...prev,
        services: prev.services.filter((_, i) => i !== idx)
      }));
    }
  };
  const generateConfigJsCode = () => {
    return `/**\n * BUSINESSKIT MVP — WHITE-LABEL CONFIG\n * Generated by Creator Studio\n */\nexport const businessConfig = ${JSON.stringify(form, null, 2)};\n`;
  };
  const handleCopyCode = () => {
    navigator.clipboard?.writeText(generateConfigJsCode());
    showToast(t.configCodeCopied);
  };
  const handleDownloadCode = () => {
    const blob = new Blob([generateConfigJsCode()], {
      type: "text/javascript"
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "config.js";
    a.click();
    URL.revokeObjectURL(url);
    showToast("config.js downloaded!");
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 animate-fade-in font-sans"
  }, toastMessage && /*#__PURE__*/React.createElement("div", {
    className: "fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center space-x-2 animate-bounce-in"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-emerald-400"
  }, "\u2713"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold"
  }, toastMessage)), /*#__PURE__*/React.createElement("div", {
    className: "bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-indigo-500/30 flex flex-col md:flex-row md:items-center justify-between gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-400/20 text-amber-300 text-xs font-bold border border-amber-400/30 mb-2"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDC51"), /*#__PURE__*/React.createElement("span", null, t.creatorStudio)), /*#__PURE__*/React.createElement("h2", {
    className: "text-xl sm:text-2xl font-black"
  }, t.creatorStudioTitle), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-300 max-w-2xl mt-1"
  }, t.creatorStudioSubtitle)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleApply,
    className: "px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-white font-black text-xs shadow-lg shadow-emerald-500/25 transition active:scale-95"
  }, "\uD83D\uDCBE ", t.saveCreatorChangesBtn), /*#__PURE__*/React.createElement("button", {
    onClick: onResetToDefault,
    className: "px-3.5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-bold transition active:scale-95"
  }, "\uD83D\uDD04"))), /*#__PURE__*/React.createElement("div", {
    className: "flex border-b border-slate-200 dark:border-slate-800 space-x-2 overflow-x-auto pb-1 text-xs font-bold"
  }, [{
    id: "branding",
    label: t.tabBranding,
    icon: "🏷️"
  }, {
    id: "colors",
    label: t.tabColorsStyle,
    icon: "🎨"
  }, {
    id: "services",
    label: t.tabServices,
    icon: "📋"
  }, {
    id: "export",
    label: t.tabExportCode,
    icon: "💾"
  }].map(tab => /*#__PURE__*/React.createElement("button", {
    key: tab.id,
    onClick: () => setActiveTab(tab.id),
    className: `px-4 py-2.5 rounded-2xl transition flex items-center space-x-1.5 whitespace-nowrap ${activeTab === tab.id ? "bg-primary text-white shadow-md shadow-primary/20" : "bg-white dark:bg-slate-850 text-slate-600 dark:text-slate-300 hover:bg-slate-100"}`
  }, /*#__PURE__*/React.createElement("span", null, tab.icon), /*#__PURE__*/React.createElement("span", null, tab.label)))), activeTab === "branding" && /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-slate-850 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-5"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold uppercase tracking-wider text-slate-500"
  }, t.tabBranding), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 md:grid-cols-2 gap-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold mb-1"
  }, t.fieldBusinessName), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: form.businessName,
    onChange: e => setForm({
      ...form,
      businessName: e.target.value
    }),
    className: "w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold mb-1"
  }, t.fieldCategory, " (", lang.toUpperCase(), ")"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: form.category,
    onChange: e => setForm({
      ...form,
      category: e.target.value
    }),
    className: "w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium"
  })), /*#__PURE__*/React.createElement("div", {
    className: "md:col-span-2"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold mb-1"
  }, t.fieldTagline, " (", lang.toUpperCase(), ")"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: form.tagline,
    onChange: e => setForm({
      ...form,
      tagline: e.target.value
    }),
    className: "w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold mb-1"
  }, t.fieldLogoUrl), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: form.logoUrl,
    onChange: e => setForm({
      ...form,
      logoUrl: e.target.value
    }),
    className: "flex-1 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium"
  }), /*#__PURE__*/React.createElement("img", {
    src: form.logoUrl,
    alt: "Logo",
    className: "w-9 h-9 rounded-xl object-cover border"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold mb-1"
  }, t.fieldCoverUrl), /*#__PURE__*/React.createElement("div", {
    className: "flex gap-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: form.coverUrl,
    onChange: e => setForm({
      ...form,
      coverUrl: e.target.value
    }),
    className: "flex-1 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium"
  }), /*#__PURE__*/React.createElement("img", {
    src: form.coverUrl,
    alt: "Cover",
    className: "w-14 h-9 rounded-xl object-cover border"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold mb-1"
  }, t.fieldPhone), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: form.contact.phone,
    onChange: e => setForm({
      ...form,
      contact: {
        ...form.contact,
        phone: e.target.value
      }
    }),
    className: "w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold mb-1"
  }, t.fieldAddress, " (", lang.toUpperCase(), ")"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: form.contact.address,
    onChange: e => setForm({
      ...form,
      contact: {
        ...form.contact,
        address: e.target.value
      }
    }),
    className: "w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold mb-1"
  }, t.fieldWorkingHours, " (", lang.toUpperCase(), ")"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: form.contact.workingHours,
    onChange: e => setForm({
      ...form,
      contact: {
        ...form.contact,
        workingHours: e.target.value
      }
    }),
    className: "w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold mb-1"
  }, t.fieldCurrency), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: form.currency,
    onChange: e => setForm({
      ...form,
      currency: e.target.value
    }),
    className: "w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold mb-1"
  }, t.fieldInstagram), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: form.contact.instagram,
    onChange: e => setForm({
      ...form,
      contact: {
        ...form.contact,
        instagram: e.target.value
      }
    }),
    className: "w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium"
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold mb-1"
  }, t.fieldTelegramBot), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: form.contact.telegramBot,
    onChange: e => setForm({
      ...form,
      contact: {
        ...form.contact,
        telegramBot: e.target.value
      }
    }),
    className: "w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-medium"
  })))), activeTab === "colors" && /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-slate-850 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-5"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold uppercase tracking-wider text-slate-500"
  }, t.tabColorsStyle), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold mb-2"
  }, "Preset Designer Palettes"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 sm:grid-cols-3 gap-2"
  }, palettes.map((p, idx) => /*#__PURE__*/React.createElement("button", {
    key: idx,
    onClick: () => setForm({
      ...form,
      primaryColor: p.primary,
      accentColor: p.accent
    }),
    className: "p-3 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-primary text-left flex items-center space-x-3 transition active:scale-95"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex -space-x-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "w-5 h-5 rounded-full border border-white shadow-sm",
    style: {
      backgroundColor: p.primary
    }
  }), /*#__PURE__*/React.createElement("span", {
    className: "w-5 h-5 rounded-full border border-white shadow-sm",
    style: {
      backgroundColor: p.accent
    }
  })), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold truncate"
  }, p.name))))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold mb-1"
  }, t.fieldPrimaryColor), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "color",
    value: form.primaryColor,
    onChange: e => setForm({
      ...form,
      primaryColor: e.target.value
    }),
    className: "w-10 h-10 rounded-xl cursor-pointer p-0.5 border"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: form.primaryColor,
    onChange: e => setForm({
      ...form,
      primaryColor: e.target.value
    }),
    className: "flex-1 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold"
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold mb-1"
  }, t.fieldAccentColor), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "color",
    value: form.accentColor,
    onChange: e => setForm({
      ...form,
      accentColor: e.target.value
    }),
    className: "w-10 h-10 rounded-xl cursor-pointer p-0.5 border"
  }), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: form.accentColor,
    onChange: e => setForm({
      ...form,
      accentColor: e.target.value
    }),
    className: "flex-1 px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs font-mono font-bold"
  }))))), activeTab === "services" && /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-slate-850 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold uppercase tracking-wider text-slate-500"
  }, t.servicesManagerTitle), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 mt-0.5"
  }, t.servicesManagerDesc)), /*#__PURE__*/React.createElement("button", {
    onClick: openAddService,
    className: "px-3.5 py-2 rounded-xl bg-primary text-white font-bold text-xs shadow-md shadow-primary/20 transition active:scale-95"
  }, t.addNewServiceBtn)), /*#__PURE__*/React.createElement("div", {
    className: "divide-y divide-slate-100 dark:divide-slate-800 border rounded-2xl overflow-hidden"
  }, form.services.map((srv, idx) => /*#__PURE__*/React.createElement("div", {
    key: srv.id || idx,
    className: "p-4 flex items-center justify-between gap-4 hover:bg-slate-50/50 dark:hover:bg-slate-800/50 transition"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex-1"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-500"
  }, getLocalized(srv.category, lang)), srv.popular && /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-bold text-amber-500"
  }, "\uD83D\uDD25 Top")), /*#__PURE__*/React.createElement("h4", {
    className: "text-sm font-bold text-slate-900 dark:text-white mt-1"
  }, getLocalized(srv.name, lang)), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-400 line-clamp-1"
  }, getLocalized(srv.description, lang))), /*#__PURE__*/React.createElement("div", {
    className: "text-right whitespace-nowrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-sm font-black text-slate-900 dark:text-white"
  }, getLocalized(srv.price, lang), " ", form.currency), /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] block text-slate-400"
  }, "\u23F1\uFE0F ", getLocalized(srv.duration, lang))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-1"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => openEditService(idx),
    className: "p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition",
    title: "Modifica"
  }, "\u270F\uFE0F"), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleDeleteService(idx),
    className: "p-2 rounded-xl text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition",
    title: "Elimina"
  }, "\uD83D\uDDD1\uFE0F")))))), activeTab === "export" && /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-slate-850 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 space-y-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold uppercase tracking-wider text-slate-500"
  }, t.tabExportCode), /*#__PURE__*/React.createElement("div", {
    className: "flex space-x-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: handleCopyCode,
    className: "px-3.5 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-xs font-bold transition"
  }, "\uD83D\uDCCB ", t.copyConfigBtn), /*#__PURE__*/React.createElement("button", {
    onClick: handleDownloadCode,
    className: "px-3.5 py-1.5 rounded-xl bg-primary text-white text-xs font-bold transition shadow-sm"
  }, "\uD83D\uDCBE ", t.downloadConfigBtn))), /*#__PURE__*/React.createElement("pre", {
    className: "p-4 bg-slate-900 text-slate-100 text-[11px] rounded-2xl overflow-x-auto font-mono max-h-80 scrollbar-none"
  }, generateConfigJsCode())), serviceModal && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in font-sans"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 animate-scale-up space-y-4"
  }, /*#__PURE__*/React.createElement("h3", {
    className: "text-base font-black text-slate-900 dark:text-white"
  }, editingIndex !== null ? t.editServiceTitle : t.newServiceTitle), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSaveService,
    className: "space-y-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold mb-1"
  }, t.serviceName, " (", lang.toUpperCase(), ")"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: srvForm.name,
    onChange: e => setSrvForm({
      ...srvForm,
      name: e.target.value
    }),
    className: "w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs font-medium",
    required: true
  })), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-2"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold mb-1"
  }, t.serviceCategory), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: srvForm.category,
    onChange: e => setSrvForm({
      ...srvForm,
      category: e.target.value
    }),
    className: "w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs font-medium",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold mb-1"
  }, t.servicePrice), /*#__PURE__*/React.createElement("input", {
    type: "number",
    value: srvForm.price,
    onChange: e => setSrvForm({
      ...srvForm,
      price: e.target.value
    }),
    className: "w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs font-medium",
    required: true
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold mb-1"
  }, t.serviceDuration), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: srvForm.duration,
    onChange: e => setSrvForm({
      ...srvForm,
      duration: e.target.value
    }),
    className: "w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs font-medium",
    required: true
  })), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold mb-1"
  }, t.serviceDescription, " (", lang.toUpperCase(), ")"), /*#__PURE__*/React.createElement("textarea", {
    rows: 2,
    value: srvForm.description,
    onChange: e => setSrvForm({
      ...srvForm,
      description: e.target.value
    }),
    className: "w-full px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 border text-xs font-medium resize-none"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 pt-1"
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    id: "pop",
    checked: srvForm.popular,
    onChange: e => setSrvForm({
      ...srvForm,
      popular: e.target.checked
    }),
    className: "rounded text-primary focus:ring-primary"
  }), /*#__PURE__*/React.createElement("label", {
    htmlFor: "pop",
    className: "text-xs font-bold"
  }, t.servicePopular)), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-end space-x-2 pt-3"
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    onClick: () => setServiceModal(false),
    className: "px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-xs font-bold transition"
  }, t.cancelBtn), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    className: "px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold transition shadow-sm"
  }, t.saveServiceBtn))))));
}

// ==============================================================================
// 6. TELEGRAM ALERT COMPONENT
// ==============================================================================
function TelegramAlert({
  order,
  onClose,
  onOpenAdmin,
  t
}) {
  if (!order) return null;
  useEffect(() => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15);
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch (e) {}
  }, [order]);
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-x-4 top-4 md:top-6 md:right-6 md:left-auto md:max-w-md z-50 animate-bounce-in transition-all"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900/95 text-white backdrop-blur-xl border border-sky-500/40 rounded-3xl shadow-2xl p-5 ring-1 ring-white/10 overflow-hidden font-sans"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-slate-800 pb-3 mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-md"
  }, "\u2708\uFE0F"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold text-sky-400"
  }, t.telegramBotTitle), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] bg-sky-500/20 text-sky-300 px-1.5 py-0.5 rounded-full font-mono font-medium"
  }, "LIVE")), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-slate-400"
  }, t.telegramBotChannel))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] text-slate-400"
  }, t.telegramJustNow), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "text-slate-400 hover:text-white p-1 rounded-lg"
  }, "\u2715"))), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-950/60 rounded-2xl p-3.5 border border-slate-800/80 font-mono text-xs space-y-1.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-emerald-400 font-semibold flex items-center space-x-1 font-sans"
  }, /*#__PURE__*/React.createElement("span", null, "\u2728 ", t.telegramNewLead)), /*#__PURE__*/React.createElement("div", {
    className: "h-px bg-slate-800 my-1"
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-[85px_1fr] gap-x-2 text-[11px]"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, t.telegramClient), /*#__PURE__*/React.createElement("span", {
    className: "text-white font-medium font-sans"
  }, order.clientName), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, t.telegramPhone), /*#__PURE__*/React.createElement("span", {
    className: "text-sky-400 font-sans"
  }, order.clientPhone), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, t.telegramService), /*#__PURE__*/React.createElement("span", {
    className: "text-white font-sans"
  }, order.serviceName), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, t.telegramTime), /*#__PURE__*/React.createElement("span", {
    className: "text-amber-300 font-sans"
  }, order.date, ", ", order.time), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, t.telegramTotal), /*#__PURE__*/React.createElement("span", {
    className: "text-emerald-400 font-bold font-sans"
  }, order.price, " ", order.currency), order.comment && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, t.telegramNotes), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-300 italic font-sans"
  }, order.comment)))), /*#__PURE__*/React.createElement("div", {
    className: "mt-3.5 flex items-center gap-2"
  }, onOpenAdmin && /*#__PURE__*/React.createElement("button", {
    onClick: onOpenAdmin,
    className: "flex-1 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold py-2 px-3 rounded-xl text-xs transition active:scale-95"
  }, t.telegramOpenAdmin), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-medium transition"
  }, t.telegramDismiss))));
}

// ==============================================================================
// 7. WHITE-LABEL QUICK PRESETS MODAL
// ==============================================================================
function WhiteLabelDemo({
  currentConfig,
  isOpen,
  onClose,
  onSelectPreset,
  onCustomUpdate,
  t,
  lang
}) {
  if (!isOpen) return null;
  const presets = [{
    id: "beautySalon",
    brand: "Luxe Studio",
    icon: "💅",
    colors: ["#7c3aed", "#db2777"],
    data: businessPresets.beautySalon
  }, {
    id: "barberShop",
    brand: "Blade & Barber",
    icon: "💈",
    colors: ["#d97706", "#334155"],
    data: businessPresets.barberShop
  }, {
    id: "autoDetailing",
    brand: "Apex Auto Spa",
    icon: "🚗",
    colors: ["#0284c7", "#ef4444"],
    data: businessPresets.autoDetailing
  }, {
    id: "coffeeRoastery",
    brand: "Kava Craft & Roasters",
    icon: "☕",
    colors: ["#92400e", "#ea580c"],
    data: businessPresets.coffeeRoastery
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in font-sans"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh] animate-scale-up",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xl"
  }, "\uD83C\uDFA8"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-base font-black text-slate-900 dark:text-white"
  }, t.wlTitle || "White-Label Configuratore"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 dark:text-slate-400"
  }, t.wlSubtitle || "Cambia settore e stile in 1 minuto"))), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-white"
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "p-6 overflow-y-auto space-y-3"
  }, /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 dark:text-slate-400"
  }, t.wlDesc || "Seleziona uno dei preset pronti per vedere l'app adattarsi all'istante a un nuovo settore:"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2"
  }, presets.map(preset => {
    const isCurrent = currentConfig.businessName === preset.brand;
    const presetCategory = getLocalized(preset.data.category, lang);
    return /*#__PURE__*/React.createElement("button", {
      key: preset.id,
      onClick: () => {
        onSelectPreset(preset.data);
        onClose();
      },
      className: `p-4 rounded-2xl border text-left transition flex flex-col justify-between h-36 relative ${isCurrent ? "border-primary bg-primary/5 dark:bg-primary/10 ring-2 ring-primary/30" : "border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800/80 hover:border-slate-300"}`
    }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-2xl"
    }, preset.icon), /*#__PURE__*/React.createElement("div", {
      className: "flex -space-x-1.5"
    }, preset.colors.map((c, i) => /*#__PURE__*/React.createElement("span", {
      key: i,
      className: "w-4 h-4 rounded-full border border-white dark:border-slate-900 shadow-sm",
      style: {
        backgroundColor: c
      }
    })))), /*#__PURE__*/React.createElement("h4", {
      className: "text-sm font-black text-slate-900 dark:text-white mt-2 leading-tight"
    }, preset.brand), /*#__PURE__*/React.createElement("p", {
      className: "text-xs text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5"
    }, presetCategory)), /*#__PURE__*/React.createElement("div", {
      className: "flex items-center justify-between text-[11px] pt-2 border-t border-slate-100 dark:border-slate-800"
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-slate-400 font-semibold"
    }, preset.data.services?.length || 4, " servizi"), isCurrent ? /*#__PURE__*/React.createElement("span", {
      className: "text-primary font-bold"
    }, "\u2713 ", t.wlActive || "Attivo") : /*#__PURE__*/React.createElement("span", {
      className: "text-slate-400 hover:text-primary font-medium"
    }, t.wlApply || "Applica", " \u2192")));
  })))));
}

// ==============================================================================
// 8. ROOT MAIN APPLICATION
// ==============================================================================
export default function MainApp() {
  // 1. Language state: 'it' (default) | 'en' | 'uk'
  const [lang, setLang] = useState(() => {
    try {
      const saved = localStorage.getItem("businesskit_lang");
      return saved && ['it', 'en', 'uk'].includes(saved) ? saved : 'it';
    } catch (e) {
      return 'it';
    }
  });
  const t = translations[lang] || translations.it;
  const handleSetLang = newLang => {
    setLang(newLang);
    try {
      localStorage.setItem("businesskit_lang", newLang);
    } catch (e) {}
  };

  // 2. Navigation tab: "customer" | "admin" | "creator"
  const [tab, setTab] = useState("customer");
  const [fullWidth, setFullWidth] = useState(false);

  // 3. Business config
  const [cfg, setCfg] = useState(() => {
    try {
      const saved = localStorage.getItem("businesskit_custom_config");
      return saved ? JSON.parse(saved) : businessConfig;
    } catch (e) {
      return businessConfig;
    }
  });

  // 4. Orders state
  const [orders, setOrders] = useState(() => {
    try {
      const saved = localStorage.getItem("businesskit_orders");
      return saved ? JSON.parse(saved) : getInitialOrders(lang);
    } catch (e) {
      return getInitialOrders(lang);
    }
  });
  const [telegramNotif, setTelegramNotif] = useState(null);
  const [lastOrder, setLastOrder] = useState(null);
  const [wlOpen, setWlOpen] = useState(false);
  useEffect(() => {
    try {
      localStorage.setItem("businesskit_orders", JSON.stringify(orders));
    } catch (e) {}
  }, [orders]);
  useEffect(() => {
    const root = document.documentElement;
    if (cfg.primaryColor) root.style.setProperty('--color-primary', cfg.primaryColor);
    if (cfg.accentColor) root.style.setProperty('--color-accent', cfg.accentColor);
  }, [cfg]);
  const handleSaveConfig = newCfg => {
    setCfg(newCfg);
    try {
      localStorage.setItem("businesskit_custom_config", JSON.stringify(newCfg));
    } catch (e) {}
  };
  const handleResetToDefault = () => {
    if (confirm(t.resetConfirm)) {
      setCfg(businessConfig);
      try {
        localStorage.removeItem("businesskit_custom_config");
      } catch (e) {}
    }
  };
  const handleNewBooking = newOrder => {
    setOrders(prev => [newOrder, ...prev]);
    setLastOrder(newOrder);
    setTelegramNotif(newOrder);
  };
  const handleAddSampleOrder = () => {
    const names = lang === 'it' ? ["Alessandro Ferrari", "Giulia Romano", "Matteo Colombo", "Chiara Ricci"] : lang === 'uk' ? ["Денис Кравчук", "Марія Литвин", "Артем Васильєв", "Світлана Ткач"] : ["David Miller", "Emily Watson", "James Wilson", "Sarah Davis"];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const srv = cfg.services[Math.floor(Math.random() * cfg.services.length)] || {
      name: "Servizio Prova",
      price: 50,
      duration: "30 min"
    };
    const srvName = getLocalized(srv.name, lang);
    const srvPrice = getLocalized(srv.price, lang);
    const srvDuration = getLocalized(srv.duration, lang);
    const srvCurrency = getLocalized(cfg.currency, lang) || (lang === 'uk' ? 'грн' : '€');
    const dayLabel = lang === 'it' ? "Oggi" : lang === 'uk' ? "Сьогодні" : "Today";
    handleNewBooking({
      id: "BK-" + Math.floor(1000 + Math.random() * 9000),
      clientName: randomName,
      clientPhone: lang === 'it' ? `+39 34${Math.floor(10000000 + Math.random() * 90000000)}` : `+380 97 ${Math.floor(100 + Math.random() * 900)} ${Math.floor(10 + Math.random() * 90)}`,
      serviceName: srvName,
      price: srvPrice,
      currency: srvCurrency,
      duration: srvDuration,
      date: dayLabel,
      time: "16:30",
      comment: "Lead generato per test",
      status: "new",
      createdAt: new Date().toISOString()
    });
  };
  const localizedCategory = getLocalized(cfg.category, lang);
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-screen bg-slate-100 dark:bg-slate-950 flex flex-col font-sans transition-colors"
  }, /*#__PURE__*/React.createElement("header", {
    className: "sticky top-0 z-40 bg-white/95 dark:bg-slate-900/95 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 shadow-sm px-4 sm:px-6 py-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto flex items-center justify-between gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-9 h-9 rounded-xl bg-gradient-to-tr from-primary to-indigo-600 flex items-center justify-center text-white font-black text-base shadow-md shadow-primary/20"
  }, "BK"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-extrabold text-sm sm:text-base tracking-tight text-slate-900 dark:text-white"
  }, "BusinessKit"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-bold uppercase bg-primary/10 text-primary px-2 py-0.5 rounded-full border border-primary/20"
  }, "White-Label MVP")), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-slate-500 hidden sm:block"
  }, t.currentBusiness, " ", /*#__PURE__*/React.createElement("strong", null, cfg.businessName), " (", localizedCategory, ")"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setTab("customer"),
    className: `flex items-center space-x-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition ${tab === "customer" ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"}`
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCF1"), /*#__PURE__*/React.createElement("span", {
    className: "hidden md:inline"
  }, t.customerApp)), /*#__PURE__*/React.createElement("button", {
    onClick: () => setTab("admin"),
    className: `flex items-center space-x-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition ${tab === "admin" ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-900 dark:hover:text-white"}`
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCBC"), /*#__PURE__*/React.createElement("span", {
    className: "hidden md:inline"
  }, t.adminDashboard), orders.filter(o => o.status === 'new').length > 0 && /*#__PURE__*/React.createElement("span", {
    className: "w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm"
  }, orders.filter(o => o.status === 'new').length)), /*#__PURE__*/React.createElement("button", {
    onClick: () => setTab("creator"),
    className: `flex items-center space-x-1.5 px-3 sm:px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition ${tab === "creator" ? "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-sm" : "text-slate-500 hover:text-amber-500"}`
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDC51"), /*#__PURE__*/React.createElement("span", {
    className: "hidden md:inline"
  }, t.creatorStudio))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center bg-slate-100 dark:bg-slate-800 p-0.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-bold"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => handleSetLang("it"),
    className: `px-2 py-1 rounded-lg transition ${lang === "it" ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm" : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"}`,
    title: "Italiano"
  }, "\uD83C\uDDEE\uD83C\uDDF9 IT"), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleSetLang("en"),
    className: `px-2 py-1 rounded-lg transition ${lang === "en" ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm" : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"}`,
    title: "English"
  }, "\uD83C\uDDEC\uD83C\uDDE7 EN"), /*#__PURE__*/React.createElement("button", {
    onClick: () => handleSetLang("uk"),
    className: `px-2 py-1 rounded-lg transition ${lang === "uk" ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm" : "text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"}`,
    title: "\u0423\u043A\u0440\u0430\u0457\u043D\u0441\u044C\u043A\u0430"
  }, "\uD83C\uDDFA\uD83C\uDDE6 UK")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setWlOpen(true),
    className: "p-2 sm:px-3 sm:py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold text-xs transition",
    title: t.whiteLabelPresets
  }, /*#__PURE__*/React.createElement("span", null, "\uD83C\uDFA8"))))), /*#__PURE__*/React.createElement("main", {
    className: "flex-1"
  }, tab === "customer" && /*#__PURE__*/React.createElement(PhoneMockup, {
    isFullWidth: fullWidth,
    onToggleViewMode: () => setFullWidth(!fullWidth),
    businessName: cfg.businessName,
    t: t
  }, /*#__PURE__*/React.createElement(CustomerApp, {
    config: cfg,
    onBookService: handleNewBooking,
    lastOrder: lastOrder,
    onResetLastOrder: () => setLastOrder(null),
    t: t,
    lang: lang
  })), tab === "admin" && /*#__PURE__*/React.createElement(AdminDashboard, {
    orders: orders,
    config: cfg,
    onUpdateStatus: (id, st) => setOrders(prev => prev.map(o => o.id === id ? {
      ...o,
      status: st
    } : o)),
    onDeleteOrder: id => setOrders(prev => prev.filter(o => o.id !== id)),
    onAddSampleOrder: handleAddSampleOrder,
    onResetOrders: () => {
      if (confirm(t.resetConfirm)) {
        localStorage.removeItem("businesskit_orders");
        window.location.reload();
      }
    },
    t: t,
    lang: lang
  }), tab === "creator" && /*#__PURE__*/React.createElement(CreatorStudio, {
    config: cfg,
    onSaveConfig: handleSaveConfig,
    onResetToDefault: handleResetToDefault,
    t: t,
    lang: lang
  })), /*#__PURE__*/React.createElement(TelegramAlert, {
    order: telegramNotif,
    onClose: () => setTelegramNotif(null),
    onOpenAdmin: () => {
      setTab("admin");
      setTelegramNotif(null);
    },
    t: t
  }), /*#__PURE__*/React.createElement(WhiteLabelDemo, {
    currentConfig: cfg,
    isOpen: wlOpen,
    onClose: () => setWlOpen(false),
    onSelectPreset: p => setCfg(p),
    onCustomUpdate: custom => setCfg(prev => ({
      ...prev,
      ...custom
    })),
    t: t,
    lang: lang
  }));
}

// Mount to root
const rootEl = document.getElementById('root');
if (rootEl) {
  ReactDOM.createRoot(rootEl).render( /*#__PURE__*/React.createElement(MainApp, null));
}
