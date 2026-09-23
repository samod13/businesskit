import React from 'react';

export default function PhoneMockup({ children, isFullWidth, onToggleViewMode, activePresetName }) {
  const currentTime = "09:41";

  if (isFullWidth) {
    return (
      <div className="w-full min-h-screen bg-slate-50 dark:bg-slate-900 pb-16 transition-colors duration-300">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
          <div className="flex items-center justify-between mb-4 bg-white dark:bg-slate-800 p-3 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-300">
              <span className="inline-block w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-medium">Режим: Десктопний перегляд (Повний екран)</span>
            </div>
            <button
              onClick={onToggleViewMode}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 text-xs font-semibold text-slate-800 dark:text-slate-100 transition-all shadow-sm active:scale-95"
            >
              <span>📱 Перемкнути на вигляд у смартфоні</span>
            </button>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden">
            {children}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-6 px-3 min-h-[calc(100vh-80px)]">
      {/* Device controls bar */}
      <div className="mb-4 flex items-center justify-between gap-3 w-full max-w-[420px] px-2 text-xs font-medium text-slate-600 dark:text-slate-300">
        <div className="flex items-center space-x-1.5 bg-white dark:bg-slate-800 px-3 py-1.5 rounded-full shadow-sm border border-slate-200 dark:border-slate-700">
          <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>iPhone 15 Pro • Live Mockup</span>
        </div>
        <button
          onClick={onToggleViewMode}
          className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-full bg-white dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 shadow-sm transition active:scale-95"
          title="Розгорнути на весь екран"
        >
          <span>🖥️ На весь екран</span>
        </button>
      </div>

      {/* Realistic Phone Body */}
      <div className="relative w-full max-w-[395px] h-[844px] bg-slate-900 rounded-[52px] p-[10px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.4),0_0_0_1px_rgba(255,255,255,0.1),inset_0_0_0_2px_rgba(255,255,255,0.15)] ring-1 ring-slate-800 flex flex-col">
        {/* Outer buttons aesthetic */}
        <div className="absolute -left-[14px] top-[115px] w-[4px] h-[28px] bg-slate-700 rounded-l-md"></div>
        <div className="absolute -left-[14px] top-[160px] w-[4px] h-[50px] bg-slate-700 rounded-l-md"></div>
        <div className="absolute -left-[14px] top-[220px] w-[4px] h-[50px] bg-slate-700 rounded-l-md"></div>
        <div className="absolute -right-[14px] top-[170px] w-[4px] h-[65px] bg-slate-700 rounded-r-md"></div>

        {/* Screen Container */}
        <div className="relative w-full h-full bg-white dark:bg-slate-900 rounded-[44px] overflow-hidden flex flex-col">
          
          {/* iOS Status Bar */}
          <div className="relative z-30 h-11 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md flex items-center justify-between px-7 pt-1 select-none">
            <span className="text-xs font-semibold text-slate-900 dark:text-white tracking-tight">
              {currentTime}
            </span>

            {/* Dynamic Island */}
            <div className="absolute left-1/2 -translate-x-1/2 top-2 w-[100px] h-[26px] bg-black rounded-full flex items-center justify-end px-2.5 space-x-1.5 shadow-inner">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-900 ring-1 ring-slate-800"></div>
              <div className="w-2 h-2 rounded-full bg-emerald-500/70 animate-pulse"></div>
            </div>

            <div className="flex items-center space-x-1.5 text-slate-900 dark:text-white">
              {/* Cellular Signal Icon */}
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 3c-4.97 0-9 4.03-9 9 0 2.12.74 4.07 1.97 5.61L4.35 19H19.65l-.62-1.39C20.26 16.07 21 14.12 21 12c0-4.97-4.03-9-9-9zm0 2c3.87 0 7 3.13 7 7 0 1.5-.47 2.89-1.28 4.04H6.28C5.47 14.89 5 13.5 5 12c0-3.87 3.13-7 7-7z" opacity="0.2"/>
                <circle cx="12" cy="12" r="3"/>
                <path d="M2 19h20v2H2z" opacity="0.3"/>
                <path d="M4 17h2v-3H4v3zm4 0h2v-6H8v6zm4 0h2V8h-2v9zm4 0h2V5h-2v12z"/>
              </svg>
              {/* Wifi */}
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M12 4C7.31 4 3.07 5.9 0 8.98L12 21 24 8.98C20.93 5.9 16.69 4 12 4zm0 3.32c3.8 0 7.23 1.54 9.72 4.03L12 18.73 2.28 11.35C4.77 8.86 8.2 7.32 12 7.32z"/>
              </svg>
              {/* Battery */}
              <div className="flex items-center">
                <div className="w-5 h-2.5 border border-slate-900 dark:border-white rounded-[4px] p-0.5 flex items-center">
                  <div className="h-full w-full bg-slate-900 dark:bg-white rounded-[1.5px]"></div>
                </div>
                <div className="w-0.5 h-1 bg-slate-900 dark:bg-white rounded-r-sm"></div>
              </div>
            </div>
          </div>

          {/* Scrollable Screen Content */}
          <div className="flex-1 overflow-y-auto overflow-x-hidden relative scrollbar-none select-none">
            {children}
          </div>

          {/* iOS Bottom Home Bar */}
          <div className="relative z-30 h-6 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm flex items-center justify-center pointer-events-none">
            <div className="w-32 h-1 bg-slate-300 dark:bg-slate-600 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}
