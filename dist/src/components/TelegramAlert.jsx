import React, { useEffect } from 'react';

export default function TelegramAlert({ order, onClose, onOpenAdmin }) {
  if (!order) return null;

  // Optional subtle Web Audio chime on appearance
  useEffect(() => {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(587.33, ctx.currentTime); // D5
        osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.15); // A5
        gain.gain.setValueAtTime(0.12, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.35);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.35);
      }
    } catch (e) {
      // Audio context might be restricted before interaction; safe to ignore
    }

    // Rich styled console output
    console.log(
      `%c ✈️ [Telegram Bot Notification] %c Новий лід отримано: ${order.clientName} (${order.clientPhone}) | ${order.serviceName} - ${order.price} грн`,
      'background: #0088cc; color: #fff; font-weight: bold; border-radius: 4px; padding: 3px 6px;',
      'color: #0088cc; font-weight: 600;'
    );
    console.table({
      "ID Замовлення": order.id,
      "Клієнт": order.clientName,
      "Телефон": order.clientPhone,
      "Послуга": order.serviceName,
      "Дата": order.date,
      "Час": order.time,
      "Сума (грн)": order.price,
      "Коментар": order.comment || "Без коментаря",
      "Створено": new Date(order.createdAt).toLocaleTimeString()
    });
  }, [order]);

  return (
    <div className="fixed inset-x-4 top-4 md:top-6 md:right-6 md:left-auto md:max-w-md z-50 animate-bounce-in transition-all">
      <div className="bg-slate-900/95 text-white backdrop-blur-xl border border-sky-500/40 rounded-3xl shadow-2xl p-4.5 p-5 ring-1 ring-white/10 overflow-hidden">
        
        {/* Glow accent */}
        <div className="absolute top-0 right-0 -mr-8 -mt-8 w-32 h-32 bg-sky-500/20 rounded-full blur-2xl pointer-events-none"></div>

        {/* Telegram Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3 mb-3">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-md">
              {/* Telegram Paper Plane Icon */}
              <svg className="w-4 h-4 translate-x-[-1px] translate-y-[1px]" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.52 2.77-1.16 3.35-1.36 3.73-1.37.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z"/>
              </svg>
            </div>
            <div>
              <div className="flex items-center space-x-1.5">
                <span className="text-xs font-bold text-sky-400">Telegram Bot Alert</span>
                <span className="text-[10px] bg-sky-500/20 text-sky-300 px-1.5 py-0.5 rounded-full font-mono font-medium">LIVE</span>
              </div>
              <p className="text-[11px] text-slate-400">Канал сповіщень власника бізнесу</p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <span className="text-[11px] text-slate-400">щойно</span>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
              aria-label="Закрити"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Message body imitating Telegram formatted message */}
        <div className="bg-slate-950/60 rounded-2xl p-3.5 border border-slate-800/80 font-mono text-xs leading-relaxed space-y-1.5 select-text">
          <div className="text-emerald-400 font-semibold flex items-center space-x-1 font-sans">
            <span>✨ Новий запис через онлайн-віджет!</span>
          </div>

          <div className="h-px bg-slate-800 my-1.5"></div>

          <div className="grid grid-cols-[85px_1fr] gap-x-2 text-[11px]">
            <span className="text-slate-400">Клієнт:</span>
            <span className="text-white font-medium font-sans">{order.clientName}</span>

            <span className="text-slate-400">Телефон:</span>
            <a href={`tel:${order.clientPhone}`} className="text-sky-400 underline font-sans">{order.clientPhone}</a>

            <span className="text-slate-400">Послуга:</span>
            <span className="text-white font-sans font-medium">{order.serviceName}</span>

            <span className="text-slate-400">Дата/Час:</span>
            <span className="text-amber-300 font-sans font-medium">{order.date}, о {order.time}</span>

            <span className="text-slate-400">Сума:</span>
            <span className="text-emerald-400 font-sans font-bold">{order.price} {order.currency || "грн"}</span>

            {order.comment && (
              <>
                <span className="text-slate-400">Примітка:</span>
                <span className="text-slate-300 font-sans italic">{order.comment}</span>
              </>
            )}

            <span className="text-slate-400">ID броні:</span>
            <span className="text-slate-400 font-mono">#{order.id.slice(-6).toUpperCase()}</span>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-3.5 flex items-center gap-2">
          {onOpenAdmin && (
            <button
              onClick={() => {
                onOpenAdmin();
                onClose();
              }}
              className="flex-1 bg-sky-500 hover:bg-sky-400 text-slate-950 font-bold py-2 px-3 rounded-xl text-xs transition flex items-center justify-center space-x-1.5 shadow-lg shadow-sky-500/20 active:scale-95"
            >
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              <span>Відкрити в Адмінці</span>
            </button>
          )}
          <button
            onClick={onClose}
            className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-xl text-xs font-medium transition active:scale-95"
          >
            Зрозуміло
          </button>
        </div>

      </div>
    </div>
  );
}
