"use client";

import { useState, useMemo } from "react";
import {
  SERVICES,
  CATEGORIES,
  STAFF,
  formatLei,
  getCategoryById,
} from "@/lib/demo-data";
import { Plus, Search, Clock, TrendingUp, Sparkles, Edit } from "lucide-react";

export default function ServiciiPage() {
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    let list = SERVICES;
    if (categoryFilter) list = list.filter((s) => s.categoryId === categoryFilter);
    if (search) {
      const q = search.toLowerCase();
      list = list.filter((s) => s.name.toLowerCase().includes(q));
    }
    return list.sort((a, b) => b.bookings30d - a.bookings30d);
  }, [categoryFilter, search]);

  const totalBookings = SERVICES.reduce((s, sv) => s + sv.bookings30d, 0);
  const totalRevenue = SERVICES.reduce((s, sv) => s + sv.priceLei * sv.bookings30d, 0);

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900">Servicii</h1>
          <p className="text-sm text-gray-500 mt-1">
            {SERVICES.length} servicii active · {totalBookings} rezervări ultimele 30 zile · {formatLei(totalRevenue)} prognozat
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-shadow">
          <Plus className="w-4 h-4" />
          Serviciu nou
        </button>
      </div>

      {/* Search + category filters */}
      <div className="bg-white rounded-xl border border-rose-100 p-4 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Caută serviciu..."
            className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100 text-sm"
          />
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setCategoryFilter(null)}
            className={`px-4 py-2 text-sm rounded-full font-medium transition-colors ${
              !categoryFilter
                ? "bg-gray-900 text-white"
                : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
            }`}
          >
            Toate ({SERVICES.length})
          </button>
          {CATEGORIES.map((cat) => {
            const count = SERVICES.filter((s) => s.categoryId === cat.id).length;
            const isActive = categoryFilter === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setCategoryFilter(isActive ? null : cat.id)}
                className={`px-4 py-2 text-sm rounded-full font-medium border transition-colors ${
                  isActive
                    ? "bg-rose-600 text-white border-rose-600"
                    : `${cat.color} hover:opacity-80`
                }`}
              >
                <span className="mr-1">{cat.icon}</span>
                {cat.name} ({count})
              </button>
            );
          })}
        </div>
      </div>

      {/* Services grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((service) => {
          const cat = getCategoryById(service.categoryId);
          const staffCount = STAFF.filter((s) => s.services.includes(service.id)).length;
          const revenue = service.priceLei * service.bookings30d;
          const isPopular = service.bookings30d >= 30;

          return (
            <div
              key={service.id}
              className="bg-white rounded-2xl border border-rose-100 overflow-hidden hover:shadow-md transition-shadow group"
            >
              {/* Header with gradient */}
              <div
                className={`h-24 relative ${cat?.color || "bg-gray-100"} flex items-center justify-center border-b`}
              >
                <div className="text-5xl opacity-40">{cat?.icon}</div>
                {isPopular && (
                  <div className="absolute top-3 right-3 flex items-center gap-1 px-2 py-1 rounded-full bg-white/90 backdrop-blur text-xs font-bold shadow-sm">
                    <TrendingUp className="w-3 h-3 text-rose-600" />
                    <span className="text-rose-600">Popular</span>
                  </div>
                )}
                <button className="absolute top-3 left-3 p-2 rounded-lg bg-white/90 backdrop-blur opacity-0 group-hover:opacity-100 transition-opacity">
                  <Edit className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="font-semibold text-gray-900 leading-tight">{service.name}</h3>
                </div>

                <p className="text-xs text-gray-500 mb-4 line-clamp-2 min-h-8">
                  {service.description}
                </p>

                <div className="grid grid-cols-2 gap-3 pt-4 border-t border-gray-100">
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wide">Preț</div>
                    <div className="font-bold text-rose-700 text-lg">
                      {formatLei(service.priceLei)}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-500 uppercase tracking-wide">Durată</div>
                    <div className="font-bold text-gray-900 text-lg flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {service.durationMin}m
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-xs">
                  <span className="text-gray-500">{staffCount} angajate</span>
                  <span className="font-semibold text-gray-900">
                    {service.bookings30d} rezervări/lună
                  </span>
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-400">
            Niciun serviciu găsit
          </div>
        )}
      </div>
    </div>
  );
}
