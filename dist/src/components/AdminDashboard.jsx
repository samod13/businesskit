import React, { useState, useMemo } from 'react';

export default function AdminDashboard({ orders, onUpdateStatus, onDeleteOrder, onAddSampleOrder, onResetOrders, config }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  // Filter orders by search query and status
  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = 
        order.clientName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.clientPhone?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.serviceName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.id?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === "all" || order.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [orders, searchTerm, statusFilter]);

  // Statistics calculation
  const stats = useMemo(() => {
    const totalLeads = orders.length;
    
    // Check orders made today (or mock recent)
    const today = new Date().toISOString().split('T')[0];
    const todayLeads = orders.filter(o => o.createdAt && o.createdAt.startsWith(today)).length;
    
    const activeRevenue = orders
      .filter(o => o.status !== 'cancelled')
      .reduce((acc, curr) => acc + (Number(curr.price) || 0), 0);
    
    const averageCheck = totalLeads > 0 ? Math.round(activeRevenue / (totalLeads - orders.filter(o => o.status === 'cancelled').length || 1)) : 0;

    const newOrdersCount = orders.filter(o => o.status === 'new').length;
    const confirmedCount = orders.filter(o => o.status === 'confirmed').length;
    const completedCount = orders.filter(o => o.status === 'completed').length;

    return { totalLeads, todayLeads, activeRevenue, averageCheck, newOrdersCount, confirmedCount, completedCount };
  }, [orders]);

  const getStatusBadge = (status) => {
    switch (status) {
      case 'new':
        return {
          bg: 'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300 border-amber-300 dark:border-amber-800',
          dot: 'bg-amber-500 animate-pulse',
          label: '🟡 Новий'
        };
      case 'confirmed':
        return {
          bg: 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300 border-sky-300 dark:border-sky-800',
          dot: 'bg-sky-500',
          label: '🔵 Підтверджено'
        };
      case 'completed':
        return {
          bg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-300 dark:border-emerald-800',
          dot: 'bg-emerald-500',
          label: '🟢 Виконано'
        };
      case 'cancelled':
        return {
          bg: 'bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border-rose-300 dark:border-rose-800',
          dot: 'bg-rose-500',
          label: '🔴 Скасовано'
        };
      default:
        return {
          bg: 'bg-slate-100 text-slate-800',
          dot: 'bg-slate-400',
          label: status
        };
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-fade-in font-sans">
      
      {/* 1. TOP HEADER & BRAND BAR */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white dark:bg-slate-800 p-6 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black text-xl">
            📊
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white">
                Адмін-панель: {config.businessName}
              </h1>
              <span className="text-xs bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-semibold px-2 py-0.5 rounded-full border border-emerald-500/20">
                Live CRM
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Керування лідами, бронюваннями та статистикою в реальному часі (збереження в LocalStorage)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={onAddSampleOrder}
            className="px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-bold text-xs transition flex items-center space-x-1.5 active:scale-95"
            title="Згенерувати тестове замовлення"
          >
            <span>➕ Додати тестовий лід</span>
          </button>
          <button
            onClick={onResetOrders}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-rose-50 hover:text-rose-600 dark:hover:bg-rose-950/40 dark:hover:text-rose-400 text-slate-500 text-xs font-semibold transition active:scale-95"
            title="Скинути до початкових демо-записів"
          >
            <span>🔄 Скинути базу</span>
          </button>
        </div>
      </div>

      {/* 2. STATS & ANALYTICS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Total Leads */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>Усього лідів</span>
            <span className="text-base">📋</span>
          </div>
          <div className="mt-3 flex items-baseline space-x-2">
            <span className="text-3xl font-black text-slate-900 dark:text-white">
              {stats.totalLeads}
            </span>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-bold">
              +{stats.todayLeads} сьогодні
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400 flex items-center space-x-2">
            <span>{stats.newOrdersCount} очікують обробки</span>
          </div>
        </div>

        {/* Expected Revenue */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>Сума замовлень</span>
            <span className="text-base">💰</span>
          </div>
          <div className="mt-3 flex items-baseline space-x-1">
            <span className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
              {stats.activeRevenue.toLocaleString()}
            </span>
            <span className="text-sm font-bold text-slate-500">
              {config.currency || "грн"}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            Без урахування скасованих записів
          </div>
        </div>

        {/* Average Check */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>Середній чек</span>
            <span className="text-base">💳</span>
          </div>
          <div className="mt-3 flex items-baseline space-x-1">
            <span className="text-3xl font-black text-slate-900 dark:text-white">
              {stats.averageCheck.toLocaleString()}
            </span>
            <span className="text-sm font-bold text-slate-500">
              {config.currency || "грн"}
            </span>
          </div>
          <div className="mt-2 text-[11px] text-slate-400">
            Розраховано на активні бронювання
          </div>
        </div>

        {/* Status Breakdown */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 relative overflow-hidden">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 text-xs font-bold uppercase tracking-wider">
            <span>Статуси воронки</span>
            <span className="text-base">⚡</span>
          </div>
          <div className="mt-3 flex items-center justify-between text-xs font-semibold">
            <div className="text-amber-500 text-center">
              <span className="block text-lg font-black">{stats.newOrdersCount}</span>
              <span className="text-[10px] uppercase">Нові</span>
            </div>
            <div className="text-sky-500 text-center">
              <span className="block text-lg font-black">{stats.confirmedCount}</span>
              <span className="text-[10px] uppercase">Підтверджені</span>
            </div>
            <div className="text-emerald-500 text-center">
              <span className="block text-lg font-black">{stats.completedCount}</span>
              <span className="text-[10px] uppercase">Виконані</span>
            </div>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full overflow-hidden mt-3 flex">
            <div style={{ width: `${(stats.newOrdersCount / (stats.totalLeads || 1)) * 100}%` }} className="bg-amber-400"></div>
            <div style={{ width: `${(stats.confirmedCount / (stats.totalLeads || 1)) * 100}%` }} className="bg-sky-500"></div>
            <div style={{ width: `${(stats.completedCount / (stats.totalLeads || 1)) * 100}%` }} className="bg-emerald-500"></div>
          </div>
        </div>

      </div>

      {/* 3. SEARCH & FILTER TOOLBAR */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-white dark:bg-slate-800 p-4 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700">
        
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <span className="absolute left-3.5 top-2.5 text-slate-400 text-sm">🔍</span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Пошук за ім'ям, телефоном, послугою або ID..."
            className="w-full pl-9 pr-4 py-2 text-xs rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center space-x-1 overflow-x-auto scrollbar-none">
          {[
            { id: "all", label: "Всі заявки" },
            { id: "new", label: "🟡 Нові" },
            { id: "confirmed", label: "🔵 Підтверджені" },
            { id: "completed", label: "🟢 Виконані" },
            { id: "cancelled", label: "🔴 Скасовані" }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                statusFilter === f.id
                  ? "bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-sm"
                  : "bg-slate-100 hover:bg-slate-200 dark:bg-slate-700/60 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* 4. ORDERS TABLE */}
      <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-700 bg-slate-50/70 dark:bg-slate-800/80 text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                <th className="py-3.5 px-4 sm:px-6">ID & Створено</th>
                <th className="py-3.5 px-4">Клієнт & Контакти</th>
                <th className="py-3.5 px-4">Послуга</th>
                <th className="py-3.5 px-4">Дата запису</th>
                <th className="py-3.5 px-4">Сума</th>
                <th className="py-3.5 px-4">Статус</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">Дії</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 text-xs">
              {filteredOrders.map((order) => {
                const badge = getStatusBadge(order.status);
                return (
                  <tr 
                    key={order.id} 
                    className="hover:bg-slate-50/70 dark:hover:bg-slate-750/50 transition-colors"
                  >
                    {/* ID & Date */}
                    <td className="py-4 px-4 sm:px-6 whitespace-nowrap">
                      <span className="font-mono font-bold text-slate-700 dark:text-slate-300 bg-slate-100 dark:bg-slate-700 px-2 py-0.5 rounded-md text-[11px]">
                        {order.id}
                      </span>
                      <div className="text-[10px] text-slate-400 mt-1">
                        {order.createdAt ? new Date(order.createdAt).toLocaleString('uk-UA', { dateStyle: 'short', timeStyle: 'short' }) : 'Щойно'}
                      </div>
                    </td>

                    {/* Client Info */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="font-bold text-slate-900 dark:text-white">
                        {order.clientName}
                      </div>
                      <div className="flex items-center space-x-1.5 mt-0.5">
                        <a 
                          href={`tel:${order.clientPhone}`}
                          className="text-[11px] text-primary hover:underline font-mono"
                        >
                          {order.clientPhone}
                        </a>
                      </div>
                      {order.comment && (
                        <div className="text-[10px] text-slate-400 italic max-w-xs truncate mt-0.5">
                          "{order.comment}"
                        </div>
                      )}
                    </td>

                    {/* Service */}
                    <td className="py-4 px-4">
                      <div className="font-medium text-slate-800 dark:text-slate-200">
                        {order.serviceName}
                      </div>
                      <span className="text-[10px] text-slate-400">
                        {order.duration}
                      </span>
                    </td>

                    {/* Booking Date & Time */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="font-bold text-slate-900 dark:text-white">
                        {order.date}
                      </div>
                      <span className="text-[11px] text-primary font-semibold">
                        о {order.time}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <div className="font-black text-slate-900 dark:text-white">
                        {order.price} {order.currency || "грн"}
                      </div>
                    </td>

                    {/* Status Dropdown */}
                    <td className="py-4 px-4 whitespace-nowrap">
                      <select
                        value={order.status}
                        onChange={(e) => onUpdateStatus(order.id, e.target.value)}
                        className={`text-xs font-bold rounded-xl px-2.5 py-1.5 border cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/20 ${badge.bg}`}
                      >
                        <option value="new">🟡 Новий</option>
                        <option value="confirmed">🔵 Підтверджено</option>
                        <option value="completed">🟢 Виконано</option>
                        <option value="cancelled">🔴 Скасовано</option>
                      </select>
                    </td>

                    {/* Action buttons */}
                    <td className="py-4 px-4 sm:px-6 text-right whitespace-nowrap">
                      <div className="flex items-center justify-end space-x-1.5">
                        <a
                          href={`tel:${order.clientPhone}`}
                          className="p-1.5 text-slate-400 hover:text-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 rounded-lg transition"
                          title="Подзвонити клієнту"
                        >
                          📞
                        </a>
                        <button
                          onClick={() => {
                            if (window.confirm(`Видалити запис ${order.id} клієнта ${order.clientName}?`)) {
                              onDeleteOrder(order.id);
                            }
                          }}
                          className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition"
                          title="Видалити запис"
                        >
                          🗑️
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}

              {filteredOrders.length === 0 && (
                <tr>
                  <td colSpan="7" className="py-12 text-center text-slate-400">
                    <span className="text-3xl block mb-2">📭</span>
                    <p className="font-semibold text-slate-600 dark:text-slate-300">
                      Не знайдено жодного замовлення за вказаними фільтрами
                    </p>
                    <p className="text-xs text-slate-400 mt-1">
                      Створіть запис через мобільний віджет або натисніть «Додати тестовий лід».
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
}
