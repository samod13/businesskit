import React, { useState } from 'react';

export default function CreatorStudio({ config, onSaveConfig, onResetToDefault, t, lang }) {
  const [activeTab, setActiveTab] = useState("branding"); // "branding" | "colors" | "services" | "export"

  // Working copy of the configuration
  const [form, setForm] = useState({
    businessName: config.businessName || "",
    category: config.category || "",
    tagline: config.tagline || "",
    rating: config.rating || 4.9,
    reviewsCount: config.reviewsCount || 100,
    logoUrl: config.logoUrl || "",
    coverUrl: config.coverUrl || "",
    primaryColor: config.primaryColor || "#7c3aed",
    accentColor: config.accentColor || "#db2777",
    currency: config.currency || "грн",
    borderRadius: config.borderRadius || "rounded",
    contact: {
      phone: config.contact?.phone || "",
      address: config.contact?.address || "",
      workingHours: config.contact?.workingHours || "",
      instagram: config.contact?.instagram || "",
      telegramBot: config.contact?.telegramBot || "",
      notificationChannel: config.contact?.notificationChannel || ""
    },
    services: config.services ? [...config.services] : []
  });

  const [toastMessage, setToastMessage] = useState("");
  const [editingServiceIndex, setEditingServiceIndex] = useState(null);
  const [serviceForm, setServiceForm] = useState({
    id: "",
    name: "",
    category: "",
    price: 500,
    duration: "45 min",
    description: "",
    popular: false
  });
  const [isServiceModalOpen, setIsServiceModalOpen] = useState(false);

  // Quick Brand Color Palettes
  const palettes = [
    { name: "Luxe Violet & Pink", primary: "#7c3aed", accent: "#db2777" },
    { name: "Blade Amber & Slate", primary: "#d97706", accent: "#334155" },
    { name: "Apex Blue & Racing Red", primary: "#0284c7", accent: "#ef4444" },
    { name: "Emerald Bio & Gold", primary: "#059669", accent: "#d97706" },
    { name: "Coffee Warm & Orange", primary: "#92400e", accent: "#ea580c" },
    { name: "Cyber Neon & Indigo", primary: "#4f46e5", accent: "#06b6d4" },
  ];

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleApplyChanges = () => {
    onSaveConfig(form);
    showToast(t.changesAppliedToast);
  };

  // Service Management
  const openNewServiceModal = () => {
    setEditingServiceIndex(null);
    setServiceForm({
      id: "srv-" + Date.now(),
      name: "",
      category: form.services[0]?.category || "Generale",
      price: 500,
      duration: "45 min",
      description: "",
      popular: false
    });
    setIsServiceModalOpen(true);
  };

  const openEditServiceModal = (index) => {
    setEditingServiceIndex(index);
    setServiceForm({ ...form.services[index] });
    setIsServiceModalOpen(true);
  };

  const handleSaveService = (e) => {
    e.preventDefault();
    if (!serviceForm.name.trim()) return;

    const updated = [...form.services];
    if (editingServiceIndex !== null) {
      updated[editingServiceIndex] = serviceForm;
    } else {
      updated.push(serviceForm);
    }

    setForm(prev => ({ ...prev, services: updated }));
    setIsServiceModalOpen(false);
  };

  const handleDeleteService = (index) => {
    if (window.confirm("Eliminare questo servizio?")) {
      const updated = form.services.filter((_, i) => i !== index);
      setForm(prev => ({ ...prev, services: updated }));
    }
  };

  // Generate clean config.js string
  const generateConfigJsCode = () => {
    return `/**
 * BUSINESSKIT MVP — CONFIGURAZIONE WHITE-LABEL
 * Generato automaticamente dal Creator Studio
 */

export const businessConfig = ${JSON.stringify(form, null, 2)};
`;
  };

  const handleCopyCode = () => {
    const code = generateConfigJsCode();
    navigator.clipboard?.writeText(code);
    showToast(t.configCodeCopied);
  };

  const handleDownloadFile = () => {
    const code = generateConfigJsCode();
    const blob = new Blob([code], { type: "text/javascript;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "config.js";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showToast("File config.js scaricato!");
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6 font-sans animate-fade-in">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-500/40 flex items-center space-x-2 animate-bounce-in">
          <span className="text-emerald-400">✓</span>
          <span className="text-xs font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 sm:p-8 rounded-3xl shadow-xl border border-indigo-500/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center space-x-4">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-amber-400 to-amber-600 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg shadow-amber-500/20">
              👑
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-xl sm:text-2xl font-black tracking-tight">
                  {t.creatorStudioTitle}
                </h1>
                <span className="text-[10px] bg-amber-400/20 text-amber-300 font-bold px-2 py-0.5 rounded-full border border-amber-400/30 uppercase tracking-wider">
                  Master Admin
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1 max-w-xl leading-relaxed">
                {t.creatorStudioSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleApplyChanges}
              className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/25 transition active:scale-95 flex items-center space-x-1.5"
            >
              <span>💾</span>
              <span>{t.saveCreatorChangesBtn}</span>
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center space-x-1 sm:space-x-2 mt-6 pt-4 border-t border-white/10 overflow-x-auto scrollbar-none">
          {[
            { id: "branding", icon: "🏢", label: t.tabBranding },
            { id: "colors", icon: "🎨", label: t.tabColorsStyle },
            { id: "services", icon: "✂️", label: t.tabServices + ` (${form.services.length})` },
            { id: "export", icon: "💾", label: t.tabExportCode }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center space-x-1.5 whitespace-nowrap ${
                activeTab === tab.id
                  ? "bg-white text-slate-900 shadow-md"
                  : "bg-white/10 text-white/80 hover:bg-white/20 hover:text-white"
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* TAB 1: BRANDING & IDENTITÀ */}
      {activeTab === "branding" && (
        <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Business Name */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                {t.fieldBusinessName}
              </label>
              <input
                type="text"
                value={form.businessName}
                onChange={e => setForm({ ...form, businessName: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20"
                placeholder="es. Luxe Studio o Blade & Barber"
              />
            </div>

            {/* Category */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                {t.fieldCategory}
              </label>
              <input
                type="text"
                value={form.category}
                onChange={e => setForm({ ...form, category: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20"
                placeholder="es. Salone di Bellezza & SPA"
              />
            </div>

            {/* Tagline */}
            <div className="md:col-span-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                {t.fieldTagline}
              </label>
              <input
                type="text"
                value={form.tagline}
                onChange={e => setForm({ ...form, tagline: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:ring-2 focus:ring-primary/20"
                placeholder="Slogan o promessa al cliente"
              />
            </div>

            {/* Logo URL with Live Preview */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                {t.fieldLogoUrl}
              </label>
              <div className="flex items-center space-x-3">
                <img
                  src={form.logoUrl}
                  alt="Logo preview"
                  className="w-12 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 bg-slate-100"
                  onError={e => { e.target.src = "https://images.unsplash.com/photo-1560066984-138dadb4c035?w=150"; }}
                />
                <input
                  type="url"
                  value={form.logoUrl}
                  onChange={e => setForm({ ...form, logoUrl: e.target.value })}
                  className="flex-1 px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                  placeholder="https://..."
                />
              </div>
            </div>

            {/* Cover URL with Live Preview */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                {t.fieldCoverUrl}
              </label>
              <div className="flex items-center space-x-3">
                <img
                  src={form.coverUrl}
                  alt="Cover preview"
                  className="w-16 h-12 rounded-xl object-cover border border-slate-200 dark:border-slate-700 bg-slate-100"
                  onError={e => { e.target.src = "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=300"; }}
                />
                <input
                  type="url"
                  value={form.coverUrl}
                  onChange={e => setForm({ ...form, coverUrl: e.target.value })}
                  className="flex-1 px-3.5 py-2.5 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                  placeholder="https://..."
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                {t.fieldPhone}
              </label>
              <input
                type="text"
                value={form.contact.phone}
                onChange={e => setForm({ ...form, contact: { ...form.contact, phone: e.target.value } })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                placeholder="+39 340 ... o +380 ..."
              />
            </div>

            {/* Address */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                {t.fieldAddress}
              </label>
              <input
                type="text"
                value={form.contact.address}
                onChange={e => setForm({ ...form, contact: { ...form.contact, address: e.target.value } })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                placeholder="Via / Piazza, Città"
              />
            </div>

            {/* Working Hours */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                {t.fieldWorkingHours}
              </label>
              <input
                type="text"
                value={form.contact.workingHours}
                onChange={e => setForm({ ...form, contact: { ...form.contact, workingHours: e.target.value } })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                placeholder="Lun-Sab: 09:00 - 20:00"
              />
            </div>

            {/* Instagram */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                {t.fieldInstagram}
              </label>
              <input
                type="text"
                value={form.contact.instagram}
                onChange={e => setForm({ ...form, contact: { ...form.contact, instagram: e.target.value } })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                placeholder="@nome_account"
              />
            </div>

            {/* Currency */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                {t.fieldCurrency}
              </label>
              <input
                type="text"
                value={form.currency}
                onChange={e => setForm({ ...form, currency: e.target.value })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                placeholder="€, грн, $, ecc."
              />
            </div>

            {/* Telegram Bot */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-1.5">
                {t.fieldTelegramBot}
              </label>
              <input
                type="text"
                value={form.contact.telegramBot}
                onChange={e => setForm({ ...form, contact: { ...form.contact, telegramBot: e.target.value } })}
                className="w-full px-3.5 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white"
                placeholder="@NomeBot"
              />
            </div>

          </div>
        </div>
      )}

      {/* TAB 2: COLORI & STILE GRAFICO */}
      {activeTab === "colors" && (
        <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-8">
          
          {/* Quick Palettes */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-500 mb-3">
              Preset di Colori Consigliati (1 Click)
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {palettes.map((p, idx) => (
                <button
                  key={idx}
                  onClick={() => setForm({ ...form, primaryColor: p.primary, accentColor: p.accent })}
                  className="p-3 rounded-2xl border border-slate-200 dark:border-slate-700 hover:border-slate-400 bg-slate-50 dark:bg-slate-850 text-left transition flex items-center justify-between"
                >
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">{p.name}</span>
                  <div className="flex space-x-1.5">
                    <span className="w-4 h-4 rounded-full border border-white shadow-sm" style={{ backgroundColor: p.primary }}></span>
                    <span className="w-4 h-4 rounded-full border border-white shadow-sm" style={{ backgroundColor: p.accent }}></span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Color Pickers */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-slate-100 dark:border-slate-700">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
                {t.fieldPrimaryColor}
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={form.primaryColor}
                  onChange={e => setForm({ ...form, primaryColor: e.target.value })}
                  className="w-12 h-12 rounded-xl border border-slate-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={form.primaryColor}
                  onChange={e => setForm({ ...form, primaryColor: e.target.value })}
                  className="flex-1 px-3.5 py-2.5 text-xs font-mono font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 mb-2">
                {t.fieldAccentColor}
              </label>
              <div className="flex items-center space-x-3">
                <input
                  type="color"
                  value={form.accentColor}
                  onChange={e => setForm({ ...form, accentColor: e.target.value })}
                  className="w-12 h-12 rounded-xl border border-slate-300 cursor-pointer"
                />
                <input
                  type="text"
                  value={form.accentColor}
                  onChange={e => setForm({ ...form, accentColor: e.target.value })}
                  className="flex-1 px-3.5 py-2.5 text-xs font-mono font-bold rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900"
                />
              </div>
            </div>
          </div>

          {/* Live Preview Box */}
          <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4">
              Anteprima Visiva del Design System
            </h4>
            <div className="flex items-center gap-3 flex-wrap">
              <button
                style={{ backgroundColor: form.primaryColor }}
                className="px-5 py-2.5 rounded-xl text-white font-bold text-xs shadow-md"
              >
                Bottone Principale
              </button>
              <span
                style={{ color: form.primaryColor, backgroundColor: `${form.primaryColor}15` }}
                className="px-3 py-1 rounded-full font-bold text-xs"
              >
                Badge Primario
              </span>
              <span
                style={{ color: form.accentColor, backgroundColor: `${form.accentColor}15` }}
                className="px-3 py-1 rounded-full font-bold text-xs"
              >
                Badge Accento 🔥
              </span>
            </div>
          </div>

        </div>
      )}

      {/* TAB 3: GESTIONE SERVIZI (CATALOG MANAGER) */}
      {activeTab === "services" && (
        <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-base font-bold text-slate-900 dark:text-white">
                {t.servicesManagerTitle}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                {t.servicesManagerDesc}
              </p>
            </div>
            <button
              onClick={openNewServiceModal}
              className="px-4 py-2 rounded-xl bg-primary text-white font-bold text-xs shadow-md transition active:scale-95 flex items-center space-x-1"
            >
              <span>{t.addNewServiceBtn}</span>
            </button>
          </div>

          {/* Services List Table */}
          <div className="space-y-3 pt-2">
            {form.services.map((srv, idx) => (
              <div
                key={srv.id || idx}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-850 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200">
                      {srv.category}
                    </span>
                    {srv.popular && (
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-600 border border-amber-500/20">
                        🔥 Top
                      </span>
                    )}
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-sm mt-1">
                    {srv.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-1">
                    {srv.description}
                  </p>
                </div>

                <div className="flex items-center justify-between sm:justify-end space-x-4 border-t sm:border-t-0 pt-2 sm:pt-0">
                  <div className="text-right">
                    <div className="text-base font-black text-slate-900 dark:text-white">
                      {srv.price} {form.currency}
                    </div>
                    <span className="text-[11px] text-slate-400 font-medium">⏱️ {srv.duration}</span>
                  </div>

                  <div className="flex items-center space-x-1">
                    <button
                      onClick={() => openEditServiceModal(idx)}
                      className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg text-xs"
                      title="Modifica"
                    >
                      ✏️
                    </button>
                    <button
                      onClick={() => handleDeleteService(idx)}
                      className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg text-xs"
                      title="Elimina"
                    >
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: ESPORTA / SALVA CODICE */}
      {activeTab === "export" && (
        <div className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 space-y-6">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Esporta la configurazione pronta per il codice
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Puoi scaricare il file <code className="text-primary font-bold">src/config.js</code> o copiare il codice negli appunti per salvarlo direttamente nel progetto o su Git.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleCopyCode}
              className="px-4 py-2.5 rounded-xl bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-bold text-xs shadow-md transition active:scale-95 flex items-center space-x-1.5"
            >
              <span>📋</span>
              <span>{t.copyConfigBtn}</span>
            </button>
            <button
              onClick={handleDownloadFile}
              className="px-4 py-2.5 rounded-xl bg-primary text-white font-bold text-xs shadow-md transition active:scale-95 flex items-center space-x-1.5"
            >
              <span>📥</span>
              <span>{t.downloadConfigBtn}</span>
            </button>
            <button
              onClick={onResetToDefault}
              className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-rose-600 text-xs font-semibold"
            >
              {t.resetToDefaultConfig}
            </button>
          </div>

          <div className="p-4 bg-slate-950 text-slate-200 rounded-2xl font-mono text-xs overflow-x-auto max-h-80 border border-slate-800 select-all">
            <pre>{generateConfigJsCode()}</pre>
          </div>
        </div>
      )}

      {/* MODAL EDIT / ADD SERVICE */}
      {isServiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-slate-800 p-6 animate-scale-up space-y-4">
            <div className="flex justify-between items-center pb-3 border-b border-slate-100 dark:border-slate-800">
              <h3 className="font-bold text-base text-slate-900 dark:text-white">
                {editingServiceIndex !== null ? t.editServiceTitle : t.newServiceTitle}
              </h3>
              <button onClick={() => setIsServiceModalOpen(false)} className="text-slate-400 hover:text-white">✕</button>
            </div>

            <form onSubmit={handleSaveService} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold uppercase text-slate-500 mb-1">{t.serviceName}</label>
                <input
                  type="text"
                  required
                  value={serviceForm.name}
                  onChange={e => setServiceForm({ ...serviceForm, name: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold uppercase text-slate-500 mb-1">{t.serviceCategory}</label>
                  <input
                    type="text"
                    required
                    value={serviceForm.category}
                    onChange={e => setServiceForm({ ...serviceForm, category: e.target.value })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block font-bold uppercase text-slate-500 mb-1">{t.servicePrice} ({form.currency})</label>
                  <input
                    type="number"
                    required
                    value={serviceForm.price}
                    onChange={e => setServiceForm({ ...serviceForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-500 mb-1">{t.serviceDuration}</label>
                <input
                  type="text"
                  value={serviceForm.duration}
                  onChange={e => setServiceForm({ ...serviceForm, duration: e.target.value })}
                  placeholder="es. 45 min"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                />
              </div>

              <div>
                <label className="block font-bold uppercase text-slate-500 mb-1">{t.serviceDescription}</label>
                <textarea
                  rows="2"
                  value={serviceForm.description}
                  onChange={e => setServiceForm({ ...serviceForm, description: e.target.value })}
                  className="w-full px-3 py-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white"
                ></textarea>
              </div>

              <div className="flex items-center space-x-2 pt-1">
                <input
                  type="checkbox"
                  id="popularCheck"
                  checked={serviceForm.popular}
                  onChange={e => setServiceForm({ ...serviceForm, popular: e.target.checked })}
                  className="w-4 h-4 rounded text-primary"
                />
                <label htmlFor="popularCheck" className="text-slate-700 dark:text-slate-200 font-medium">
                  {t.servicePopular}
                </label>
              </div>

              <div className="flex items-center gap-2 pt-3">
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-primary text-white font-bold text-xs shadow-md"
                >
                  {t.saveServiceBtn}
                </button>
                <button
                  type="button"
                  onClick={() => setIsServiceModalOpen(false)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-500 text-xs"
                >
                  {t.cancelBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
