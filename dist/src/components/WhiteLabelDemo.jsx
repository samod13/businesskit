import React, { useState } from 'react';
import { businessPresets } from '../config.js';

export default function WhiteLabelDemo({ currentConfig, onSelectPreset, onCustomUpdate, isOpen, onClose }) {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState("presets"); // "presets" | "customize"
  const [tempName, setTempName] = useState(currentConfig.businessName);
  const [tempCategory, setTempCategory] = useState(currentConfig.category);
  const [tempPrimary, setTempPrimary] = useState(currentConfig.primaryColor);
  const [tempAccent, setTempAccent] = useState(currentConfig.accentColor);
  const [copied, setCopied] = useState(false);

  const presets = [
    {
      id: "beautySalon",
      name: "Салон краси & SPA",
      brand: "Luxe Studio",
      icon: "💅",
      colors: ["#7c3aed", "#db2777"],
      data: businessPresets.beautySalon
    },
    {
      id: "barberShop",
      name: "Чоловічий барбершоп",
      brand: "Blade & Barber",
      icon: "💈",
      colors: ["#d97706", "#334155"],
      data: businessPresets.barberShop
    },
    {
      id: "autoDetailing",
      name: "Детейлінг & Автосервіс",
      brand: "Apex Auto Spa",
      icon: "🚗",
      colors: ["#0284c7", "#ef4444"],
      data: businessPresets.autoDetailing
    },
    {
      id: "coffeeRoastery",
      name: "Кав'ярня третьої хвилі",
      brand: "Kava Craft",
      icon: "☕",
      colors: ["#92400e", "#ea580c"],
      data: businessPresets.coffeeRoastery
    }
  ];

  const handleApplyCustom = () => {
    onCustomUpdate({
      businessName: tempName,
      category: tempCategory,
      primaryColor: tempPrimary,
      accentColor: tempAccent
    });
    onClose();
  };

  const copyConfigSnippet = () => {
    const snippet = `// Скопіюйте це у src/config.js:
export const businessConfig = {
  businessName: "${tempName}",
  category: "${tempCategory}",
  primaryColor: "${tempPrimary}",
  accentColor: "${tempAccent}",
  currency: "${currentConfig.currency || 'грн'}",
  // ... ваші контакти та послуги
};`;
    navigator.clipboard?.writeText(snippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in font-sans">
      <div 
        className="w-full max-w-lg bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh] animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-800/50">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🎨</span>
            <div>
              <h3 className="text-base font-black text-slate-900 dark:text-white">
                White-Label Конфігуратор
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Зміна бренду та стилю за 1 хвилину
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full flex items-center justify-center text-slate-400 hover:text-slate-600 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition"
          >
            ✕
          </button>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-100 dark:border-slate-800 px-6 pt-2 bg-white dark:bg-slate-900">
          <button
            onClick={() => setActiveTab("presets")}
            className={`pb-2.5 px-3 text-xs font-bold transition border-b-2 ${
              activeTab === "presets"
                ? "border-primary text-primary"
                : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            }`}
          >
            ⚡ Готові бізнес-пресети
          </button>
          <button
            onClick={() => setActiveTab("customize")}
            className={`pb-2.5 px-3 text-xs font-bold transition border-b-2 ${
              activeTab === "customize"
                ? "border-primary text-primary"
                : "border-transparent text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
            }`}
          >
            🛠️ Ручне налаштування
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 overflow-y-auto space-y-4">
          {activeTab === "presets" ? (
            <div className="space-y-3">
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                Оберіть будь-який пресет, щоб миттєво побачити, як додаток перевтілюється під іншу нішу (кольори, послуги, контакти):
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {presets.map((preset) => {
                  const isCurrent = currentConfig.businessName === preset.brand;
                  return (
                    <button
                      key={preset.id}
                      onClick={() => {
                        onSelectPreset(preset.data);
                        onClose();
                      }}
                      className={`p-3.5 rounded-2xl border text-left transition-all relative overflow-hidden group ${
                        isCurrent
                          ? "border-primary ring-2 ring-primary/20 bg-primary/5"
                          : "border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-850 hover:border-primary/40 hover:shadow-md"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-2xl">{preset.icon}</span>
                        <div className="flex space-x-1">
                          {preset.colors.map((c, i) => (
                            <span 
                              key={i} 
                              className="w-3.5 h-3.5 rounded-full border border-white dark:border-slate-900 shadow-sm"
                              style={{ backgroundColor: c }}
                            ></span>
                          ))}
                        </div>
                      </div>

                      <div className="font-bold text-slate-900 dark:text-white text-sm">
                        {preset.brand}
                      </div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {preset.name}
                      </div>

                      {isCurrent && (
                        <span className="absolute top-2 right-2 text-[10px] bg-primary text-white font-bold px-1.5 py-0.5 rounded-full">
                          Активний
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                  Назва бізнесу (businessName)
                </label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                  Категорія (category)
                </label>
                <input
                  type="text"
                  value={tempCategory}
                  onChange={(e) => setTempCategory(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                    Основний колір (primary)
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={tempPrimary}
                      onChange={(e) => setTempPrimary(e.target.value)}
                      className="w-8 h-8 rounded-lg border border-slate-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={tempPrimary}
                      onChange={(e) => setTempPrimary(e.target.value)}
                      className="w-full px-2 py-1.5 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1">
                    Акцентний колір (accent)
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={tempAccent}
                      onChange={(e) => setTempAccent(e.target.value)}
                      className="w-8 h-8 rounded-lg border border-slate-300 cursor-pointer"
                    />
                    <input
                      type="text"
                      value={tempAccent}
                      onChange={(e) => setTempAccent(e.target.value)}
                      className="w-full px-2 py-1.5 text-xs font-mono rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-2 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleApplyCustom}
                  className="flex-1 py-2.5 px-4 rounded-xl bg-primary text-white font-bold text-xs shadow-md transition active:scale-95"
                >
                  Застосувати зміни наживо
                </button>
                <button
                  type="button"
                  onClick={copyConfigSnippet}
                  className="py-2.5 px-3 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-xs font-medium transition"
                  title="Скопіювати код для src/config.js"
                >
                  {copied ? "✓ Скопійовано!" : "📋 Код для config.js"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Footer tip */}
        <div className="p-4 bg-slate-50 dark:bg-slate-800/80 border-t border-slate-100 dark:border-slate-800 text-center">
          <p className="text-[11px] text-slate-500 dark:text-slate-400">
            💡 У фінальному проєкті все це налаштовується в єдиному файлі: <code className="text-primary font-mono font-bold">src/config.js</code>
          </p>
        </div>
      </div>
    </div>
  );
}
