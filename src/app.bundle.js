import { businessConfig, businessPresets } from './config.js';
const _global = typeof window !== 'undefined' ? window : globalThis;
const React = _global.React;
const ReactDOM = _global.ReactDOM;
const {
  useState,
  useEffect,
  useMemo,
  useRef
} = React;

// --- Dynamic Date Generator ---
function getNextDays() {
  const days = [];
  const dayNames = ["Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];
  const monthNames = ["січ", "лют", "бер", "кві", "тра", "чер", "лип", "сер", "вер", "жов", "лис", "груд"];
  const now = new Date();
  for (let i = 0; i < 5; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    let label = dayNames[d.getDay()];
    if (i === 0) label = "Сьогодні";else if (i === 1) label = "Завтра";
    const sub = `${d.getDate()} ${monthNames[d.getMonth()]}`;
    const dateStr = `${d.getDate().toString().padStart(2, '0')}.${(d.getMonth() + 1).toString().padStart(2, '0')}.${d.getFullYear()}`;
    days.push({
      label,
      sub,
      dateStr
    });
  }
  return days;
}

// --- 1. PhoneMockup Component ---
function PhoneMockup({
  children,
  isFullWidth,
  onToggleViewMode,
  businessName
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
    }, "\u0414\u0435\u0441\u043A\u0442\u043E\u043F\u043D\u0438\u0439 \u043F\u043E\u0432\u043D\u043E\u0435\u043A\u0440\u0430\u043D\u043D\u0438\u0439 \u0432\u0438\u0433\u043B\u044F\u0434 (", businessName, ")")), /*#__PURE__*/React.createElement("button", {
      onClick: onToggleViewMode,
      className: "inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-xs font-semibold text-slate-800 dark:text-slate-100 transition shadow-sm active:scale-95"
    }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCF1 \u041F\u0435\u0440\u0435\u0439\u0442\u0438 \u0434\u043E \u043C\u043E\u0431\u0456\u043B\u044C\u043D\u043E\u0433\u043E \u0444\u0440\u0435\u0439\u043C\u0443"))), /*#__PURE__*/React.createElement("div", {
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
  }), /*#__PURE__*/React.createElement("span", null, "iPhone 15 Pro \u2022 Live Mockup")), /*#__PURE__*/React.createElement("button", {
    onClick: onToggleViewMode,
    className: "inline-flex items-center space-x-1 px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm transition active:scale-95"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDDA5\uFE0F \u041D\u0430 \u0432\u0435\u0441\u044C \u0435\u043A\u0440\u0430\u043D"))), /*#__PURE__*/React.createElement("div", {
    className: "relative w-full max-w-[395px] h-[844px] bg-slate-900 rounded-[52px] p-[10px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1),inset_0_0_0_2px_rgba(255,255,255,0.15)] ring-1 ring-slate-800 flex flex-col"
  }, /*#__PURE__*/React.createElement("div", {
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

// --- 2. BookingModal Component ---
function BookingModal({
  service,
  config,
  isOpen,
  onClose,
  onSubmitBooking
}) {
  if (!isOpen || !service) return null;
  const days = useMemo(() => getNextDays(), []);
  const timeSlots = ["09:30", "11:00", "12:30", "14:00", "15:30", "17:00", "18:30", "20:00"];
  const [selectedDay, setSelectedDay] = useState(days[1] || days[0]);
  const [selectedTime, setSelectedTime] = useState("14:00");
  const [clientName, setClientName] = useState("");
  const [clientPhone, setClientPhone] = useState("+380 ");
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handlePhoneChange = val => {
    if (!val.startsWith("+380")) {
      setClientPhone("+380 ");
      return;
    }
    setClientPhone(val);
    if (errors.clientPhone) setErrors(prev => ({
      ...prev,
      clientPhone: null
    }));
  };
  const handleSubmit = e => {
    e.preventDefault();
    const errs = {};
    if (!clientName.trim()) errs.clientName = "Будь ласка, вкажіть ваше ім'я";
    const digits = clientPhone.replace(/\D/g, '');
    if (digits.length < 10) {
      errs.clientPhone = "Введіть номер повністю (напр. +380 97 123 4567)";
    }
    if (!selectedTime) errs.selectedTime = "Оберіть час візиту";
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      const newOrder = {
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
        status: "new",
        createdAt: new Date().toISOString(),
        businessName: config.businessName
      };
      onSubmitBooking(newOrder);
      setIsSubmitting(false);
      onClose();
    }, 350);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full sm:max-w-lg bg-white dark:bg-slate-900 rounded-t-3xl sm:rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh] animate-slide-up",
    onClick: e => e.stopPropagation()
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] font-bold uppercase tracking-wider text-slate-400"
  }, "\u0428\u0432\u0438\u0434\u043A\u0438\u0439 \u043E\u043D\u043B\u0430\u0439\u043D-\u0437\u0430\u043F\u0438\u0441"), /*#__PURE__*/React.createElement("h3", {
    className: "text-base font-bold text-slate-900 dark:text-white leading-tight"
  }, config.businessName)), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "p-6 overflow-y-auto space-y-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "p-4 rounded-2xl bg-gradient-to-r from-slate-50 to-slate-100 dark:from-slate-800/60 dark:to-slate-800 border border-slate-200/80 dark:border-slate-700/60 flex items-start justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-bold text-primary px-2 py-0.5 rounded-full bg-primary/10 inline-block mb-1"
  }, service.category || "Послуга"), /*#__PURE__*/React.createElement("h4", {
    className: "font-bold text-slate-900 dark:text-white text-sm sm:text-base leading-snug"
  }, service.name), /*#__PURE__*/React.createElement("div", {
    className: "mt-1 text-xs text-slate-500 dark:text-slate-400 font-medium"
  }, "\u23F1\uFE0F ", service.duration)), /*#__PURE__*/React.createElement("div", {
    className: "text-right whitespace-nowrap pl-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400 block"
  }, "\u0412\u0430\u0440\u0442\u0456\u0441\u0442\u044C"), /*#__PURE__*/React.createElement("span", {
    className: "text-base sm:text-lg font-black text-slate-900 dark:text-white"
  }, service.price, " ", config.currency || "грн"))), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit,
    className: "space-y-4"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2"
  }, "1. \u041E\u0431\u0435\u0440\u0456\u0442\u044C \u0434\u0430\u0442\u0443 \u0432\u0456\u0437\u0438\u0442\u0443"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-5 gap-1.5 sm:gap-2"
  }, days.map((d, i) => {
    const isSel = selectedDay.dateStr === d.dateStr;
    return /*#__PURE__*/React.createElement("button", {
      key: i,
      type: "button",
      onClick: () => setSelectedDay(d),
      className: `p-2 rounded-xl border text-center transition ${isSel ? "border-primary bg-primary text-white shadow-md shadow-primary/25 scale-[1.02]" : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-200"}`
    }, /*#__PURE__*/React.createElement("span", {
      className: "text-[10px] font-semibold block uppercase"
    }, d.label), /*#__PURE__*/React.createElement("span", {
      className: `text-xs ${isSel ? "text-white/90 font-bold" : "text-slate-400 font-medium"}`
    }, d.sub));
  }))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center mb-2"
  }, /*#__PURE__*/React.createElement("label", {
    className: "text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300"
  }, "2. \u041E\u0431\u0435\u0440\u0456\u0442\u044C \u0437\u0440\u0443\u0447\u043D\u0438\u0439 \u0447\u0430\u0441"), /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] text-slate-400"
  }, "\u0412\u0456\u043B\u044C\u043D\u0456 \u0433\u043E\u0434\u0438\u043D\u0438")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-4 gap-2"
  }, timeSlots.map(slot => {
    const isSel = selectedTime === slot;
    return /*#__PURE__*/React.createElement("button", {
      key: slot,
      type: "button",
      onClick: () => {
        setSelectedTime(slot);
        if (errors.selectedTime) setErrors(prev => ({
          ...prev,
          selectedTime: null
        }));
      },
      className: `py-2 px-1 text-xs font-bold rounded-xl border transition ${isSel ? "border-primary bg-primary text-white shadow-sm" : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300 text-slate-700 dark:text-slate-200"}`
    }, slot);
  })), errors.selectedTime && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-rose-500 font-medium mt-1"
  }, errors.selectedTime)), /*#__PURE__*/React.createElement("div", {
    className: "space-y-3 pt-2 border-t border-slate-100 dark:border-slate-800"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300"
  }, "3. \u041A\u043E\u043D\u0442\u0430\u043A\u0442\u043D\u0456 \u0434\u0430\u043D\u0456"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: clientName,
    onChange: e => {
      setClientName(e.target.value);
      if (errors.clientName) setErrors(prev => ({
        ...prev,
        clientName: null
      }));
    },
    placeholder: "\u0412\u0430\u0448\u0435 \u0456\u043C'\u044F (\u043D\u0430\u043F\u0440. \u041E\u043B\u0435\u043D\u0430 \u0447\u0438 \u041E\u043B\u0435\u043A\u0441\u0430\u043D\u0434\u0440)",
    className: `w-full px-3.5 py-2.5 text-sm rounded-xl border bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.clientName ? "border-rose-400" : "border-slate-200 dark:border-slate-700 focus:border-primary"}`
  }), errors.clientName && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-rose-500 font-medium mt-1"
  }, errors.clientName)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    type: "tel",
    value: clientPhone,
    onChange: e => handlePhoneChange(e.target.value),
    placeholder: "+380 97 123 4567",
    className: `w-full px-3.5 py-2.5 text-sm rounded-xl border bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary/20 ${errors.clientPhone ? "border-rose-400" : "border-slate-200 dark:border-slate-700 focus:border-primary"}`
  }), errors.clientPhone && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-rose-500 font-medium mt-1"
  }, errors.clientPhone)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: comment,
    onChange: e => setComment(e.target.value),
    placeholder: "\u041F\u043E\u0431\u0430\u0436\u0430\u043D\u043D\u044F \u0447\u0438 \u043A\u043E\u043C\u0435\u043D\u0442\u0430\u0440 \u043C\u0430\u0439\u0441\u0442\u0440\u0443 (\u043D\u0435\u043E\u0431\u043E\u0432'\u044F\u0437\u043A\u043E\u0432\u043E)",
    className: "w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50/50 dark:bg-slate-800 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary"
  }))), /*#__PURE__*/React.createElement("button", {
    type: "submit",
    disabled: isSubmitting,
    className: "w-full py-3.5 px-4 rounded-2xl bg-primary hover:opacity-95 text-white font-bold text-sm tracking-wide shadow-lg shadow-primary/25 transition active:scale-[0.99] flex items-center justify-center space-x-2 mt-4"
  }, isSubmitting ? /*#__PURE__*/React.createElement("span", null, "\u0421\u0442\u0432\u043E\u0440\u0435\u043D\u043D\u044F \u0437\u0430\u043F\u0438\u0441\u0443...") : /*#__PURE__*/React.createElement("span", null, "\u2728 \u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0438\u0442\u0438 \u0437\u0430\u043F\u0438\u0441 (", service.price, " ", config.currency || "грн", ")")), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-center text-slate-400"
  }, "\uD83D\uDD12 \u041C\u0438\u0442\u0442\u0454\u0432\u0435 \u0431\u0440\u043E\u043D\u044E\u0432\u0430\u043D\u043D\u044F \u2022 \u041E\u043F\u043B\u0430\u0442\u0430 \u043D\u0430 \u043C\u0456\u0441\u0446\u0456")))));
}

// --- 3. TelegramAlert Component ---
function TelegramAlert({
  order,
  onClose,
  onOpenAdmin
}) {
  if (!order) return null;
  useEffect(() => {
    // Audio Chime using Web Audio API
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.frequency.setValueAtTime(659.25, ctx.currentTime); // E5
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch (e) {}

    // Rich Console Output
    console.log(`%c ✈️ [Telegram Bot Alert] %c Новий запис: ${order.clientName} (${order.clientPhone}) | ${order.serviceName} - ${order.price} грн`, 'background: #0088cc; color: #fff; font-weight: bold; border-radius: 4px; padding: 4px 8px;', 'color: #0088cc; font-weight: bold;');
    console.table({
      "ID Замовлення": order.id,
      "Клієнт": order.clientName,
      "Телефон": order.clientPhone,
      "Послуга": order.serviceName,
      "Дата та час": `${order.date}, о ${order.time}`,
      "Сума": `${order.price} ${order.currency}`,
      "Коментар": order.comment || "Без коментаря"
    });
  }, [order]);
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-x-4 top-4 md:top-6 md:right-6 md:left-auto md:max-w-md z-50 animate-bounce-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-900/95 text-white backdrop-blur-xl border border-sky-500/40 rounded-3xl shadow-2xl p-5 ring-1 ring-white/10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between border-b border-slate-800 pb-3 mb-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-md font-bold text-sm"
  }, "\u2708\uFE0F"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-1.5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold text-sky-400"
  }, "Telegram Bot Notification"), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] bg-sky-500/20 text-sky-300 px-1.5 py-0.5 rounded-full font-mono font-medium"
  }, "LIVE")), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-slate-400"
  }, "\u041A\u0430\u043D\u0430\u043B \u0441\u043F\u043E\u0432\u0456\u0449\u0435\u043D\u044C \u0430\u0434\u043C\u0456\u043D\u0456\u0441\u0442\u0440\u0430\u0442\u043E\u0440\u0430"))), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "text-slate-400 hover:text-white p-1"
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "bg-slate-950/70 rounded-2xl p-3.5 border border-slate-800 font-mono text-xs space-y-1.5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-emerald-400 font-semibold font-sans"
  }, "\u2728 \u041D\u043E\u0432\u0438\u0439 \u0437\u0430\u043F\u0438\u0441 \u0432\u0456\u0434 BusinessKit!"), /*#__PURE__*/React.createElement("div", {
    className: "h-px bg-slate-800 my-1"
  }), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-[75px_1fr] gap-x-2 text-[11px]"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, "\u041A\u043B\u0456\u0454\u043D\u0442:"), /*#__PURE__*/React.createElement("span", {
    className: "text-white font-medium font-sans"
  }, order.clientName), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, "\u0422\u0435\u043B\u0435\u0444\u043E\u043D:"), /*#__PURE__*/React.createElement("span", {
    className: "text-sky-400 font-sans"
  }, order.clientPhone), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, "\u041F\u043E\u0441\u043B\u0443\u0433\u0430:"), /*#__PURE__*/React.createElement("span", {
    className: "text-white font-sans"
  }, order.serviceName), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, "\u0427\u0430\u0441:"), /*#__PURE__*/React.createElement("span", {
    className: "text-amber-300 font-sans"
  }, order.date, ", \u043E ", order.time), /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, "\u0421\u0443\u043C\u0430:"), /*#__PURE__*/React.createElement("span", {
    className: "text-emerald-400 font-bold font-sans"
  }, order.price, " ", order.currency || "грн"))), /*#__PURE__*/React.createElement("div", {
    className: "mt-3.5 flex items-center gap-2"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      onOpenAdmin();
      onClose();
    },
    className: "flex-1 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold py-2 px-3 rounded-xl text-xs transition active:scale-95 text-center shadow-md shadow-sky-500/20"
  }, "\u0412\u0456\u0434\u043A\u0440\u0438\u0442\u0438 \u0432 \u0410\u0434\u043C\u0456\u043D\u0446\u0456"), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-medium"
  }, "\u0417\u0433\u043E\u0440\u043D\u0443\u0442\u0438"))));
}

// --- 4. CustomerApp Component ---
function CustomerApp({
  config,
  onBookService,
  lastOrder,
  onResetLastOrder
}) {
  const [selectedCat, setSelectedCat] = useState("Всі");
  const [bookingSrv, setBookingSrv] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);
  const categories = useMemo(() => {
    const c = ["Всі"];
    if (config.services) {
      config.services.forEach(s => {
        if (s.category && !c.includes(s.category)) c.push(s.category);
      });
    }
    return c;
  }, [config.services]);
  const filtered = useMemo(() => {
    if (!config.services) return [];
    if (selectedCat === "Всі") return config.services;
    return config.services.filter(s => s.category === selectedCat);
  }, [config.services, selectedCat]);
  return /*#__PURE__*/React.createElement("div", {
    className: "min-h-full flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 font-sans"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative"
  }, /*#__PURE__*/React.createElement("div", {
    className: "h-44 sm:h-52 w-full relative overflow-hidden bg-slate-800"
  }, /*#__PURE__*/React.createElement("img", {
    src: config.coverUrl,
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
  }), /*#__PURE__*/React.createElement("span", null, "\u0412\u0456\u0434\u0447\u0438\u043D\u0435\u043D\u043E \u0437\u0430\u0440\u0430\u0437")), /*#__PURE__*/React.createElement("span", {
    className: "px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-md text-white font-bold border border-white/20"
  }, "\u2605 ", config.rating || 4.9, " (", config.reviewsCount || 100, "+)"))), /*#__PURE__*/React.createElement("div", {
    className: "px-4 pt-0 -mt-12 relative z-10"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-slate-850 rounded-2xl p-4 shadow-lg border border-slate-200/80 dark:border-slate-800"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-3.5"
  }, /*#__PURE__*/React.createElement("img", {
    src: config.logoUrl,
    alt: config.businessName,
    className: "w-14 h-14 rounded-2xl object-cover border-2 border-white dark:border-slate-800 shadow-md ring-2 ring-primary/20"
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    className: "text-lg font-black text-slate-900 dark:text-white leading-tight"
  }, config.businessName), /*#__PURE__*/React.createElement("p", {
    className: "text-xs font-semibold text-primary mt-0.5"
  }, config.category), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1"
  }, "\uD83D\uDCCD ", config.contact?.address))), config.tagline && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-600 dark:text-slate-300 mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800 italic"
  }, "\"", config.tagline, "\""), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 mt-3 pt-1 overflow-x-auto scrollbar-none text-[11px]"
  }, /*#__PURE__*/React.createElement("a", {
    href: `tel:${config.contact?.phone}`,
    className: "px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-primary/10 hover:text-primary transition font-medium whitespace-nowrap"
  }, "\uD83D\uDCDE \u0414\u0437\u0432\u0456\u043D\u043E\u043A"), config.contact?.instagram && /*#__PURE__*/React.createElement("a", {
    href: `https://instagram.com/${config.contact.instagram.replace('@', '')}`,
    target: "_blank",
    rel: "noreferrer",
    className: "px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 hover:bg-pink-500/10 hover:text-pink-500 transition font-medium whitespace-nowrap"
  }, "\uD83D\uDCF8 Instagram"), /*#__PURE__*/React.createElement("span", {
    className: "px-2.5 py-1.5 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 font-medium whitespace-nowrap"
  }, "\uD83D\uDD52 ", config.contact?.workingHours))))), /*#__PURE__*/React.createElement("div", {
    className: "px-4 mt-5"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-between mb-2"
  }, /*#__PURE__*/React.createElement("h2", {
    className: "text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400"
  }, "\u041A\u0430\u0442\u0430\u043B\u043E\u0433 \u043F\u043E\u0441\u043B\u0443\u0433"), /*#__PURE__*/React.createElement("span", {
    className: "text-xs text-slate-400"
  }, filtered.length, " \u0434\u043E\u0441\u0442\u0443\u043F\u043D\u043E")), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2 overflow-x-auto pb-2 scrollbar-none"
  }, categories.map(cat => /*#__PURE__*/React.createElement("button", {
    key: cat,
    onClick: () => setSelectedCat(cat),
    className: `px-3.5 py-1.5 rounded-xl text-xs font-bold transition whitespace-nowrap ${selectedCat === cat ? "bg-primary text-white shadow-md shadow-primary/25 scale-[1.02]" : "bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:border-slate-300"}`
  }, cat)))), /*#__PURE__*/React.createElement("div", {
    className: "px-4 mt-3 space-y-3 flex-1 pb-20"
  }, filtered.map(srv => /*#__PURE__*/React.createElement("div", {
    key: srv.id,
    className: "bg-white dark:bg-slate-800 rounded-2xl p-4 shadow-sm border border-slate-200/80 dark:border-slate-700/80 transition hover:shadow-md flex flex-col justify-between"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-start justify-between gap-3"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
  }, srv.category), srv.popular && /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20"
  }, "\uD83D\uDD25 \u0425\u0456\u0442")), /*#__PURE__*/React.createElement("h3", {
    className: "text-sm font-bold text-slate-900 dark:text-white mt-1.5"
  }, srv.name)), /*#__PURE__*/React.createElement("div", {
    className: "text-right whitespace-nowrap pl-2"
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-base font-black text-slate-900 dark:text-white"
  }, srv.price, " ", config.currency || "грн"), /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] text-slate-400"
  }, "\u23F1\uFE0F ", srv.duration))), srv.description && /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed"
  }, srv.description)), /*#__PURE__*/React.createElement("div", {
    className: "mt-3.5 pt-3 border-t border-slate-100 dark:border-slate-700/50 flex items-center justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] text-emerald-600 dark:text-emerald-400 font-medium"
  }, "\u25CF \u0412\u0456\u043B\u044C\u043D\u0456 \u0432\u0456\u043A\u043D\u0430 \u043D\u0430 \u0437\u0430\u0432\u0442\u0440\u0430"), /*#__PURE__*/React.createElement("button", {
    onClick: () => setBookingSrv(srv),
    className: "px-3.5 py-1.5 rounded-xl bg-primary text-white font-bold text-xs shadow-sm shadow-primary/20 transition active:scale-95"
  }, "\u0417\u0430\u043F\u0438\u0441\u0430\u0442\u0438\u0441\u044F \u2192"))))), /*#__PURE__*/React.createElement(BookingModal, {
    service: bookingSrv,
    config: config,
    isOpen: !!bookingSrv,
    onClose: () => setBookingSrv(null),
    onSubmitBooking: order => {
      onBookService(order);
      setShowSuccess(true);
    }
  }), showSuccess && lastOrder && /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-sm bg-white dark:bg-slate-900 rounded-3xl p-6 shadow-2xl border border-slate-200 dark:border-slate-800 text-center animate-scale-up"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-500 border-2 border-emerald-500/30 flex items-center justify-center mx-auto text-2xl shadow-lg mb-4 animate-bounce"
  }, "\u2713"), /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 dark:bg-emerald-950/60 px-2.5 py-0.5 rounded-full inline-block mb-1"
  }, "\u0417\u0430\u043F\u0438\u0441 \u0443\u0441\u043F\u0456\u0448\u043D\u043E \u0441\u0442\u0432\u043E\u0440\u0435\u043D\u043E!"), /*#__PURE__*/React.createElement("h3", {
    className: "text-xl font-black text-slate-900 dark:text-white"
  }, "\u0414\u044F\u043A\u0443\u0454\u043C\u043E, ", lastOrder.clientName, "!"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 dark:text-slate-400 mt-1"
  }, "\u0427\u0435\u043A\u0430\u0454\u043C\u043E \u043D\u0430 \u0432\u0430\u0441 \u0443 ", /*#__PURE__*/React.createElement("span", {
    className: "font-semibold text-slate-700 dark:text-slate-200"
  }, config.businessName)), /*#__PURE__*/React.createElement("div", {
    className: "my-4 p-3.5 bg-slate-50 dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 text-left text-xs space-y-1.5 font-medium"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, "\u041F\u043E\u0441\u043B\u0443\u0433\u0430:"), /*#__PURE__*/React.createElement("span", {
    className: "font-bold"
  }, lastOrder.serviceName)), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, "\u0414\u0430\u0442\u0430/\u0427\u0430\u0441:"), /*#__PURE__*/React.createElement("span", {
    className: "text-primary font-bold"
  }, lastOrder.date, ", ", lastOrder.time)), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, "\u0414\u043E \u0441\u043F\u043B\u0430\u0442\u0438:"), /*#__PURE__*/React.createElement("span", {
    className: "text-emerald-600 font-bold"
  }, lastOrder.price, " ", lastOrder.currency)), /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-slate-400"
  }, "\u041D\u043E\u043C\u0435\u0440 \u0431\u0440\u043E\u043D\u0456:"), /*#__PURE__*/React.createElement("span", {
    className: "font-mono text-slate-500"
  }, "#", lastOrder.id.slice(-4)))), /*#__PURE__*/React.createElement("div", {
    className: "p-2.5 bg-sky-50 dark:bg-sky-950/40 rounded-xl border border-sky-200 dark:border-sky-800/60 text-[11px] text-sky-800 dark:text-sky-300 flex items-center space-x-2 text-left mb-5"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-base"
  }, "\u2708\uFE0F"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("span", {
    className: "font-bold"
  }, "\u0421\u043F\u043E\u0432\u0456\u0449\u0435\u043D\u043D\u044F \u043D\u0430\u0434\u0456\u0441\u043B\u0430\u043D\u043E \u0432 Telegram"), /*#__PURE__*/React.createElement("p", {
    className: "text-[10px] text-sky-600 dark:text-sky-400"
  }, "\u0410\u0434\u043C\u0456\u043D\u0456\u0441\u0442\u0440\u0430\u0442\u043E\u0440 \u0443\u0436\u0435 \u0431\u0430\u0447\u0438\u0442\u044C \u0432\u0430\u0448 \u0437\u0430\u043F\u0438\u0441."))), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      setShowSuccess(false);
      onResetLastOrder && onResetLastOrder();
    },
    className: "w-full py-3 rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xs shadow-md active:scale-95 transition"
  }, "\u0413\u043E\u0442\u043E\u0432\u043E"))));
}

// --- 5. AdminDashboard Component ---
function AdminDashboard({
  orders,
  onUpdateStatus,
  onDeleteOrder,
  onAddSampleOrder,
  onResetOrders,
  config
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

  // Export to CSV Function
  const handleExportCSV = () => {
    const headers = ["ID", "Час створення", "Клієнт", "Телефон", "Послуга", "Дата візиту", "Час", "Ціна", "Валюта", "Статус", "Коментар"];
    const rows = orders.map(o => [o.id, o.createdAt, o.clientName, o.clientPhone, o.serviceName, o.date, o.time, o.price, o.currency, o.status, `"${o.comment || ''}"`]);
    const csvContent = "data:text/csv;charset=utf-8,\uFEFF" + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `businesskit_leads_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  return /*#__PURE__*/React.createElement("div", {
    className: "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in font-sans"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-xl"
  }, "\uD83D\uDCCA"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement("h1", {
    className: "text-xl sm:text-2xl font-black text-slate-900 dark:text-white"
  }, "\u0410\u0434\u043C\u0456\u043D-\u043F\u0430\u043D\u0435\u043B\u044C: ", config.businessName), /*#__PURE__*/React.createElement("span", {
    className: "text-xs bg-emerald-500/10 text-emerald-600 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/20"
  }, "Live CRM")), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500 dark:text-slate-400 mt-0.5"
  }, "\u0412\u0441\u0456 \u043B\u0456\u0434\u0438 \u0430\u0432\u0442\u043E\u043C\u0430\u0442\u0438\u0447\u043D\u043E \u0437\u0431\u0435\u0440\u0456\u0433\u0430\u044E\u0442\u044C\u0441\u044F \u0432 \u043F\u0430\u043C'\u044F\u0442\u0456 \u0431\u0440\u0430\u0443\u0437\u0435\u0440\u0430 (LocalStorage)"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center gap-2 flex-wrap"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: onAddSampleOrder,
    className: "px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold text-xs transition active:scale-95 flex items-center space-x-1"
  }, /*#__PURE__*/React.createElement("span", null, "\u2795 \u0422\u0435\u0441\u0442\u043E\u0432\u0438\u0439 \u043B\u0456\u0434")), /*#__PURE__*/React.createElement("button", {
    onClick: handleExportCSV,
    className: "px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 font-bold text-xs transition active:scale-95 flex items-center space-x-1",
    title: "\u0417\u0430\u0432\u0430\u043D\u0442\u0430\u0436\u0438\u0442\u0438 \u0442\u0430\u0431\u043B\u0438\u0446\u044E \u0432 Excel/CSV"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCE5 \u0415\u043A\u0441\u043F\u043E\u0440\u0442 \u0432 CSV")), /*#__PURE__*/React.createElement("button", {
    onClick: onResetOrders,
    className: "px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-rose-600 text-xs font-semibold transition active:scale-95"
  }, "\uD83D\uDD04 \u0421\u043A\u0438\u043D\u0443\u0442\u0438 \u0431\u0430\u0437\u0443"))), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold uppercase text-slate-400"
  }, "\u0423\u0441\u044C\u043E\u0433\u043E \u0437\u0430\u044F\u0432\u043E\u043A"), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 text-3xl font-black text-slate-900 dark:text-white"
  }, orders.length), /*#__PURE__*/React.createElement("div", {
    className: "text-[11px] text-amber-500 mt-1 font-medium"
  }, newCount, " \u043E\u0447\u0456\u043A\u0443\u044E\u0442\u044C \u043F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043D\u044F")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold uppercase text-slate-400"
  }, "\u041E\u0447\u0456\u043A\u0443\u0432\u0430\u043D\u0438\u0439 \u0434\u043E\u0445\u0456\u0434"), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 text-3xl font-black text-emerald-600"
  }, totalRevenue.toLocaleString(), " ", config.currency || "грн"), /*#__PURE__*/React.createElement("div", {
    className: "text-[11px] text-slate-400 mt-1"
  }, "\u0410\u043A\u0442\u0438\u0432\u043D\u0456 \u0431\u0440\u043E\u043D\u044E\u0432\u0430\u043D\u043D\u044F")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold uppercase text-slate-400"
  }, "\u0421\u0435\u0440\u0435\u0434\u043D\u0456\u0439 \u0447\u0435\u043A"), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 text-3xl font-black text-slate-900 dark:text-white"
  }, orders.length ? Math.round(totalRevenue / (orders.filter(o => o.status !== 'cancelled').length || 1)) : 0, " ", config.currency || "грн"), /*#__PURE__*/React.createElement("div", {
    className: "text-[11px] text-slate-400 mt-1"
  }, "\u041D\u0430 \u043E\u0434\u043D\u043E\u0433\u043E \u043A\u043B\u0456\u0454\u043D\u0442\u0430")), /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-bold uppercase text-slate-400"
  }, "\u0412\u043E\u0440\u043E\u043D\u043A\u0430 \u0441\u0442\u0430\u0442\u0443\u0441\u0456\u0432"), /*#__PURE__*/React.createElement("div", {
    className: "mt-2 flex items-center justify-between text-xs font-semibold"
  }, /*#__PURE__*/React.createElement("span", {
    className: "text-amber-500"
  }, "\uD83D\uDFE1 ", newCount, " \u043D\u043E\u0432."), /*#__PURE__*/React.createElement("span", {
    className: "text-sky-500"
  }, "\uD83D\uDD35 ", confirmedCount, " \u043F\u0456\u0434\u0442\u0432."), /*#__PURE__*/React.createElement("span", {
    className: "text-emerald-500"
  }, "\uD83D\uDFE2 ", completedCount, " \u0432\u0438\u043A\u043E\u043D.")), /*#__PURE__*/React.createElement("div", {
    className: "w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mt-3 flex"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${newCount / (orders.length || 1) * 100}%`
    },
    className: "bg-amber-400"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${confirmedCount / (orders.length || 1) * 100}%`
    },
    className: "bg-sky-500"
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${completedCount / (orders.length || 1) * 100}%`
    },
    className: "bg-emerald-500"
  })))), /*#__PURE__*/React.createElement("div", {
    className: "flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700"
  }, /*#__PURE__*/React.createElement("div", {
    className: "relative flex-1 max-w-md"
  }, /*#__PURE__*/React.createElement("span", {
    className: "absolute left-3 top-2.5 text-slate-400 text-xs"
  }, "\uD83D\uDD0D"), /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: search,
    onChange: e => setSearch(e.target.value),
    placeholder: "\u041F\u043E\u0448\u0443\u043A \u0437\u0430 \u043A\u043B\u0456\u0454\u043D\u0442\u043E\u043C, \u043D\u043E\u043C\u0435\u0440\u043E\u043C, \u043F\u043E\u0441\u043B\u0443\u0433\u043E\u044E \u0430\u0431\u043E \u0442\u0435\u043B\u0435\u0444\u043E\u043D\u043E\u043C...",
    className: "w-full pl-8 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
  })), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-1 overflow-x-auto scrollbar-none"
  }, [{
    id: "all",
    label: "Всі"
  }, {
    id: "new",
    label: "🟡 Нові"
  }, {
    id: "confirmed",
    label: "🔵 Підтверджені"
  }, {
    id: "completed",
    label: "🟢 Виконані"
  }, {
    id: "cancelled",
    label: "🔴 Скасовані"
  }].map(f => /*#__PURE__*/React.createElement("button", {
    key: f.id,
    onClick: () => setFilter(f.id),
    className: `px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${filter === f.id ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm" : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"}`
  }, f.label)))), /*#__PURE__*/React.createElement("div", {
    className: "bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden"
  }, /*#__PURE__*/React.createElement("div", {
    className: "overflow-x-auto"
  }, /*#__PURE__*/React.createElement("table", {
    className: "w-full text-left border-collapse text-xs"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", {
    className: "border-b border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/80 text-[11px] font-bold uppercase text-slate-500"
  }, /*#__PURE__*/React.createElement("th", {
    className: "py-3.5 px-4 sm:px-6"
  }, "ID & \u0421\u0442\u0432\u043E\u0440\u0435\u043D\u043E"), /*#__PURE__*/React.createElement("th", {
    className: "py-3.5 px-4"
  }, "\u041A\u043B\u0456\u0454\u043D\u0442 & \u0422\u0435\u043B\u0435\u0444\u043E\u043D"), /*#__PURE__*/React.createElement("th", {
    className: "py-3.5 px-4"
  }, "\u041F\u043E\u0441\u043B\u0443\u0433\u0430"), /*#__PURE__*/React.createElement("th", {
    className: "py-3.5 px-4"
  }, "\u0414\u0430\u0442\u0430 \u0437\u0430\u043F\u0438\u0441\u0443"), /*#__PURE__*/React.createElement("th", {
    className: "py-3.5 px-4"
  }, "\u0421\u0443\u043C\u0430"), /*#__PURE__*/React.createElement("th", {
    className: "py-3.5 px-4"
  }, "\u0421\u0442\u0430\u0442\u0443\u0441"), /*#__PURE__*/React.createElement("th", {
    className: "py-3.5 px-4 sm:px-6 text-right"
  }, "\u0414\u0456\u0457"))), /*#__PURE__*/React.createElement("tbody", {
    className: "divide-y divide-slate-100 dark:divide-slate-700/60"
  }, filtered.map(order => /*#__PURE__*/React.createElement("tr", {
    key: order.id,
    className: "hover:bg-slate-50/70 dark:hover:bg-slate-750/50"
  }, /*#__PURE__*/React.createElement("td", {
    className: "py-4 px-4 sm:px-6 whitespace-nowrap"
  }, /*#__PURE__*/React.createElement("span", {
    className: "font-mono font-bold bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded text-[11px] text-slate-700 dark:text-slate-300"
  }, order.id), /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-slate-400 mt-1"
  }, order.createdAt ? new Date(order.createdAt).toLocaleTimeString('uk-UA', {
    hour: '2-digit',
    minute: '2-digit'
  }) : 'Щойно')), /*#__PURE__*/React.createElement("td", {
    className: "py-4 px-4 whitespace-nowrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-bold text-slate-900 dark:text-white"
  }, order.clientName), /*#__PURE__*/React.createElement("a", {
    href: `tel:${order.clientPhone}`,
    className: "text-[11px] text-primary hover:underline font-mono"
  }, order.clientPhone), order.comment && /*#__PURE__*/React.createElement("div", {
    className: "text-[10px] text-slate-400 italic max-w-xs truncate"
  }, "\"", order.comment, "\"")), /*#__PURE__*/React.createElement("td", {
    className: "py-4 px-4"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-medium text-slate-800 dark:text-slate-200"
  }, order.serviceName), /*#__PURE__*/React.createElement("span", {
    className: "text-[10px] text-slate-400"
  }, order.duration)), /*#__PURE__*/React.createElement("td", {
    className: "py-4 px-4 whitespace-nowrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "font-bold text-slate-900 dark:text-white"
  }, order.date), /*#__PURE__*/React.createElement("span", {
    className: "text-[11px] text-primary font-semibold"
  }, "\u043E ", order.time)), /*#__PURE__*/React.createElement("td", {
    className: "py-4 px-4 whitespace-nowrap font-black text-slate-900 dark:text-white"
  }, order.price, " ", order.currency || "грн"), /*#__PURE__*/React.createElement("td", {
    className: "py-4 px-4 whitespace-nowrap"
  }, /*#__PURE__*/React.createElement("select", {
    value: order.status,
    onChange: e => onUpdateStatus(order.id, e.target.value),
    className: "text-xs font-bold rounded-xl px-2.5 py-1.5 border cursor-pointer bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-100"
  }, /*#__PURE__*/React.createElement("option", {
    value: "new"
  }, "\uD83D\uDFE1 \u041D\u043E\u0432\u0438\u0439"), /*#__PURE__*/React.createElement("option", {
    value: "confirmed"
  }, "\uD83D\uDD35 \u041F\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043D\u043E"), /*#__PURE__*/React.createElement("option", {
    value: "completed"
  }, "\uD83D\uDFE2 \u0412\u0438\u043A\u043E\u043D\u0430\u043D\u043E"), /*#__PURE__*/React.createElement("option", {
    value: "cancelled"
  }, "\uD83D\uDD34 \u0421\u043A\u0430\u0441\u043E\u0432\u0430\u043D\u043E"))), /*#__PURE__*/React.createElement("td", {
    className: "py-4 px-4 sm:px-6 text-right whitespace-nowrap"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center justify-end space-x-1.5"
  }, /*#__PURE__*/React.createElement("a", {
    href: `tel:${order.clientPhone}`,
    className: "p-1.5 text-slate-400 hover:text-emerald-500 rounded-lg hover:bg-slate-100 transition",
    title: "\u041F\u043E\u0434\u0437\u0432\u043E\u043D\u0438\u0442\u0438"
  }, "\uD83D\uDCDE"), /*#__PURE__*/React.createElement("button", {
    onClick: () => {
      if (confirm(`Видалити запис ${order.id} клієнта ${order.clientName}?`)) onDeleteOrder(order.id);
    },
    className: "p-1.5 text-slate-400 hover:text-rose-500 rounded-lg hover:bg-slate-100 transition",
    title: "\u0412\u0438\u0434\u0430\u043B\u0438\u0442\u0438"
  }, "\uD83D\uDDD1\uFE0F"))))), filtered.length === 0 && /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("td", {
    colSpan: "7",
    className: "py-12 text-center text-slate-400"
  }, "\u041D\u0435 \u0437\u043D\u0430\u0439\u0434\u0435\u043D\u043E \u0436\u043E\u0434\u043D\u043E\u0433\u043E \u0437\u0430\u043C\u043E\u0432\u043B\u0435\u043D\u043D\u044F \u0437\u0430 \u0432\u043A\u0430\u0437\u0430\u043D\u0438\u043C\u0438 \u0444\u0456\u043B\u044C\u0442\u0440\u0430\u043C\u0438")))))));
}

// --- 6. WhiteLabelDemo Component ---
function WhiteLabelDemo({
  currentConfig,
  onSelectPreset,
  onCustomUpdate,
  isOpen,
  onClose
}) {
  if (!isOpen) return null;
  const [tempName, setTempName] = useState(currentConfig.businessName);
  const [tempCategory, setTempCategory] = useState(currentConfig.category);
  const [tempPrimary, setTempPrimary] = useState(currentConfig.primaryColor);
  const [tempAccent, setTempAccent] = useState(currentConfig.accentColor);
  const presets = [{
    id: "beautySalon",
    name: "Салон краси & SPA",
    brand: "Luxe Studio",
    icon: "💅",
    colors: ["#7c3aed", "#db2777"],
    data: businessPresets.beautySalon
  }, {
    id: "barberShop",
    name: "Чоловічий барбершоп",
    brand: "Blade & Barber",
    icon: "💈",
    colors: ["#d97706", "#334155"],
    data: businessPresets.barberShop
  }, {
    id: "autoDetailing",
    name: "Детейлінг & Автосервіс",
    brand: "Apex Auto Spa",
    icon: "🚗",
    colors: ["#0284c7", "#ef4444"],
    data: businessPresets.autoDetailing
  }, {
    id: "coffeeRoastery",
    name: "Кав'ярня третьої хвилі",
    brand: "Kava Craft",
    icon: "☕",
    colors: ["#92400e", "#ea580c"],
    data: businessPresets.coffeeRoastery
  }];
  return /*#__PURE__*/React.createElement("div", {
    className: "fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in font-sans"
  }, /*#__PURE__*/React.createElement("div", {
    className: "w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 animate-scale-up"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800"
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h3", {
    className: "text-base font-black text-slate-900 dark:text-white"
  }, "White-Label \u041A\u043E\u043D\u0444\u0456\u0433\u0443\u0440\u0430\u0442\u043E\u0440"), /*#__PURE__*/React.createElement("p", {
    className: "text-xs text-slate-500"
  }, "\u041C\u0438\u0442\u0442\u0454\u0432\u0435 \u043F\u0435\u0440\u0435\u043C\u0438\u043A\u0430\u043D\u043D\u044F \u043D\u0456\u0448\u0456 \u0430\u0431\u043E \u043A\u043E\u043B\u044C\u043E\u0440\u0456\u0432")), /*#__PURE__*/React.createElement("button", {
    onClick: onClose,
    className: "text-slate-400 hover:text-white"
  }, "\u2715")), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3 my-4"
  }, presets.map(p => /*#__PURE__*/React.createElement("button", {
    key: p.id,
    onClick: () => {
      onSelectPreset(p.data);
      onClose();
    },
    className: `p-3.5 rounded-2xl border text-left transition ${currentConfig.businessName === p.brand ? "border-primary bg-primary/5 ring-2 ring-primary/20" : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 hover:border-slate-300"}`
  }, /*#__PURE__*/React.createElement("div", {
    className: "text-2xl mb-1"
  }, p.icon), /*#__PURE__*/React.createElement("div", {
    className: "font-bold text-sm text-slate-900 dark:text-white"
  }, p.brand), /*#__PURE__*/React.createElement("div", {
    className: "text-xs text-slate-500"
  }, p.name)))), /*#__PURE__*/React.createElement("div", {
    className: "pt-3 border-t border-slate-100 dark:border-slate-800 space-y-3"
  }, /*#__PURE__*/React.createElement("label", {
    className: "block text-xs font-bold uppercase text-slate-500"
  }, "\u0428\u0432\u0438\u0434\u043A\u0430 \u0437\u043C\u0456\u043D\u0430 \u043A\u043E\u043B\u044C\u043E\u0440\u0456\u0432 \u043D\u0430\u0436\u0438\u0432\u043E"), /*#__PURE__*/React.createElement("div", {
    className: "grid grid-cols-2 gap-3"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "color",
    value: tempPrimary,
    onChange: e => {
      setTempPrimary(e.target.value);
      onCustomUpdate({
        primaryColor: e.target.value
      });
    },
    className: "w-8 h-8 rounded cursor-pointer"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-mono"
  }, tempPrimary)), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center space-x-2"
  }, /*#__PURE__*/React.createElement("input", {
    type: "color",
    value: tempAccent,
    onChange: e => {
      setTempAccent(e.target.value);
      onCustomUpdate({
        accentColor: e.target.value
      });
    },
    className: "w-8 h-8 rounded cursor-pointer"
  }), /*#__PURE__*/React.createElement("span", {
    className: "text-xs font-mono"
  }, tempAccent)))), /*#__PURE__*/React.createElement("p", {
    className: "text-[11px] text-center text-slate-400 mt-4"
  }, "\uD83D\uDCA1 \u0413\u043E\u043B\u043E\u0432\u043D\u0438\u0439 \u0444\u0430\u0439\u043B \u043D\u0430\u043B\u0430\u0448\u0442\u0443\u0432\u0430\u043D\u044C: ", /*#__PURE__*/React.createElement("code", {
    className: "text-primary font-bold"
  }, "src/config.js"))));
}

// --- Main Application Controller ---
function MainApp() {
  const [tab, setTab] = useState("customer");
  const [fullWidth, setFullWidth] = useState(false);
  const [cfg, setCfg] = useState(businessConfig);
  const [orders, setOrders] = useState(() => {
    try {
      const s = localStorage.getItem("businesskit_orders");
      return s ? JSON.parse(s) : [{
        id: "BK-7891",
        clientName: "Олена Коваленко",
        clientPhone: "+380 67 111 22 33",
        serviceName: "Комплексний преміум-манікюр",
        price: 750,
        duration: "60 хв",
        date: "Завтра",
        time: "14:00",
        comment: "Прошу нагадати за годину",
        status: "new",
        createdAt: new Date(Date.now() - 15 * 60000).toISOString()
      }, {
        id: "BK-7890",
        clientName: "Максим Шевченко",
        clientPhone: "+380 50 222 33 44",
        serviceName: "Стрижка та авторське укладання",
        price: 650,
        duration: "45 хв",
        date: "Сьогодні",
        time: "17:30",
        comment: "",
        status: "confirmed",
        createdAt: new Date(Date.now() - 120 * 60000).toISOString()
      }, {
        id: "BK-7889",
        clientName: "Ірина Мельник",
        clientPhone: "+380 93 444 55 66",
        serviceName: "SPA-догляд та масаж обличчя",
        price: 1200,
        duration: "60 хв",
        date: "23 вер",
        time: "11:00",
        comment: "Чутлива шкіра",
        status: "completed",
        createdAt: new Date(Date.now() - 360 * 60000).toISOString()
      }];
    } catch (e) {
      return [];
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
  const handleNewBooking = newOrder => {
    setOrders(prev => [newOrder, ...prev]);
    setLastOrder(newOrder);
    setTelegramNotif(newOrder);
  };
  const handleAddSampleOrder = () => {
    const names = ["Денис Кравчук", "Марія Литвин", "Артем Васильєв", "Світлана Ткач", "Віталій Поліщук"];
    const randomName = names[Math.floor(Math.random() * names.length)];
    const srv = cfg.services[Math.floor(Math.random() * cfg.services.length)] || {
      name: "Індивідуальна консультація",
      price: 500,
      duration: "30 хв"
    };
    handleNewBooking({
      id: "BK-" + Math.floor(1000 + Math.random() * 9000),
      clientName: randomName,
      clientPhone: `+380 97 ${Math.floor(100 + Math.random() * 900)} ${Math.floor(10 + Math.random() * 90)} ${Math.floor(10 + Math.random() * 90)}`,
      serviceName: srv.name,
      price: srv.price,
      currency: cfg.currency || "грн",
      duration: srv.duration,
      date: "Сьогодні",
      time: "16:30",
      comment: "Тестовий лід для демонстрації",
      status: "new",
      createdAt: new Date().toISOString()
    });
  };
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
  }, "\u041F\u043E\u0442\u043E\u0447\u043D\u0438\u0439 \u0431\u0456\u0437\u043D\u0435\u0441: ", /*#__PURE__*/React.createElement("strong", null, cfg.businessName), " (", cfg.category, ")"))), /*#__PURE__*/React.createElement("div", {
    className: "flex items-center bg-slate-100 dark:bg-slate-800 p-1 rounded-2xl border border-slate-200 dark:border-slate-700"
  }, /*#__PURE__*/React.createElement("button", {
    onClick: () => setTab("customer"),
    className: `flex items-center space-x-1.5 px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition ${tab === "customer" ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-900"}`
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCF1"), /*#__PURE__*/React.createElement("span", null, "\u041A\u043B\u0456\u0454\u043D\u0442\u0441\u044C\u043A\u0438\u0439 \u0432\u0456\u0434\u0436\u0435\u0442")), /*#__PURE__*/React.createElement("button", {
    onClick: () => setTab("admin"),
    className: `flex items-center space-x-1.5 px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition ${tab === "admin" ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm" : "text-slate-500 hover:text-slate-900"}`
  }, /*#__PURE__*/React.createElement("span", null, "\uD83D\uDCBC"), /*#__PURE__*/React.createElement("span", null, "\u0410\u0434\u043C\u0456\u043D-\u043F\u0430\u043D\u0435\u043B\u044C"), orders.filter(o => o.status === 'new').length > 0 && /*#__PURE__*/React.createElement("span", {
    className: "w-5 h-5 rounded-full bg-rose-500 text-white text-[10px] font-bold flex items-center justify-center shadow-sm"
  }, orders.filter(o => o.status === 'new').length))), /*#__PURE__*/React.createElement("button", {
    onClick: () => setWlOpen(true),
    className: "px-3 py-1.5 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition active:scale-95 flex items-center space-x-1.5"
  }, /*#__PURE__*/React.createElement("span", null, "\uD83C\uDFA8"), /*#__PURE__*/React.createElement("span", {
    className: "hidden md:inline"
  }, "White-Label \u041A\u043E\u043D\u0444\u0456\u0433")))), /*#__PURE__*/React.createElement("main", {
    className: "flex-1"
  }, tab === "customer" ? /*#__PURE__*/React.createElement(PhoneMockup, {
    isFullWidth: fullWidth,
    onToggleViewMode: () => setFullWidth(!fullWidth),
    businessName: cfg.businessName
  }, /*#__PURE__*/React.createElement(CustomerApp, {
    config: cfg,
    onBookService: handleNewBooking,
    lastOrder: lastOrder,
    onResetLastOrder: () => setLastOrder(null)
  })) : /*#__PURE__*/React.createElement(AdminDashboard, {
    orders: orders,
    config: cfg,
    onUpdateStatus: (id, st) => setOrders(prev => prev.map(o => o.id === id ? {
      ...o,
      status: st
    } : o)),
    onDeleteOrder: id => setOrders(prev => prev.filter(o => o.id !== id)),
    onAddSampleOrder: handleAddSampleOrder,
    onResetOrders: () => {
      if (confirm("Скинути базу замовлень до початкових демо-записів?")) {
        localStorage.removeItem("businesskit_orders");
        window.location.reload();
      }
    }
  })), /*#__PURE__*/React.createElement(TelegramAlert, {
    order: telegramNotif,
    onClose: () => setTelegramNotif(null),
    onOpenAdmin: () => {
      setTab("admin");
      setTelegramNotif(null);
    }
  }), /*#__PURE__*/React.createElement(WhiteLabelDemo, {
    currentConfig: cfg,
    isOpen: wlOpen,
    onClose: () => setWlOpen(false),
    onSelectPreset: p => setCfg(p),
    onCustomUpdate: custom => setCfg(prev => ({
      ...prev,
      ...custom
    }))
  }));
}

// Mount to root
const rootEl = document.getElementById('root');
if (rootEl) {
  ReactDOM.createRoot(rootEl).render( /*#__PURE__*/React.createElement(MainApp, null));
}
