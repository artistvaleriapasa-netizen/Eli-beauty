"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  CLIENTS,
  formatLei,
  formatDate,
  daysBetween,
  getServiceById,
} from "@/lib/demo-data";
import {
  Search,
  Plus,
  Filter,
  Phone,
  Mail,
  Cake,
  Star,
  ChevronRight,
  Users,
  TrendingUp,
  UserPlus,
  AlertCircle,
} from "lucide-react";

const TAG_STYLES: Record<string, string> = {
  VIP: "bg-gradient-to-r from-amber-400 to-amber-600 text-white",
  Regular: "bg-emerald-100 text-emerald-800",
  Nou: "bg-sky-100 text-sky-800",
  Recuperare: "bg-rose-100 text-rose-800",
};

export default function ClientiPage() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "vip" | "new" | "winback">("all");

  const stats = useMemo(() => {
    const vip = CLIENTS.filter((c) => c.tags.includes("VIP")).length;
    const nou = CLIENTS.filter((c) => c.tags.includes("Nou")).length;
    const winback = CLIENTS.filter((c) => c.tags.includes("Recuperare")).length;
    const totalRevenue = CLIENTS.reduce((s, c) => s + c.totalSpent, 0);
    return { vip, nou, winback, totalRevenue, total: CLIENTS.length };
  }, []);

  const filtered = useMemo(() => {
    let list = CLIENTS;

    if (filter === "vip") list = list.filter((c) => c.tags.includes("VIP"));
    else if (filter === "new") list = list.filter((c) => c.tags.includes("Nou"));
    else if (filter === "winback") list = list.filter((c) => c.tags.includes("Recuperare"));

    if (search) {
      const q = search.toLowerCase();
      list = list.filter(
        (c) =>
          `${c.firstName} ${c.lastName}`.toLowerCase().includes(q) ||
          c.phone.includes(q) ||
          (c.email?.toLowerCase().includes(q) ?? false)
      );
    }

    return list.sort((a, b) => b.totalSpent - a.totalSpent);
  }, [search, filter]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900">Clienți</h1>
          <p className="text-sm text-gray-500 mt-1">
            {stats.total} clienți totali · {formatLei(stats.totalRevenue)} venituri totale
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-shadow">
          <Plus className="w-4 h-4" />
          Client nou
        </button>
      </div>

      {/* Stats cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard
          icon={<Users className="w-5 h-5" />}
          label="Total clienți"
          value={stats.total}
          color="from-rose-500 to-rose-700"
          active={filter === "all"}
          onClick={() => setFilter("all")}
        />
        <StatCard
          icon={<Star className="w-5 h-5" />}
          label="VIP"
          value={stats.vip}
          color="from-amber-500 to-amber-700"
          active={filter === "vip"}
          onClick={() => setFilter("vip")}
        />
        <StatCard
          icon={<UserPlus className="w-5 h-5" />}
          label="Noi luna asta"
          value={stats.nou}
          color="from-sky-500 to-sky-700"
          active={filter === "new"}
          onClick={() => setFilter("new")}
        />
        <StatCard
          icon={<AlertCircle className="w-5 h-5" />}
          label="Recuperare"
          value={stats.winback}
          color="from-pink-500 to-pink-700"
          active={filter === "winback"}
          onClick={() => setFilter("winback")}
        />
      </div>

      {/* Search */}
      <div className="bg-white rounded-xl border border-rose-100 p-4">
        <div className="flex items-center gap-3 flex-col sm:flex-row">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Caută după nume, telefon sau email..."
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-gray-200 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100 text-sm"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 text-sm font-medium">
            <Filter className="w-4 h-4" />
            Filtre avansate
          </button>
        </div>
      </div>

      {/* Clients grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((client) => {
          const [_, birthMonth, birthDay] = client.birthday
            ? client.birthday.split("-").map(Number)
            : [null, null, null];
          const now = new Date();
          const hasBdaySoon = birthMonth && birthDay
            ? (() => {
                const bday = new Date(now.getFullYear(), birthMonth - 1, birthDay);
                if (bday < now) bday.setFullYear(bday.getFullYear() + 1);
                const daysUntil = Math.ceil((bday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                return daysUntil <= 30;
              })()
            : false;

          const daysSinceLastVisit = client.lastVisit
            ? daysBetween(client.lastVisit)
            : null;

          return (
            <Link
              key={client.id}
              href={`/clienti/${client.id}`}
              className="bg-white rounded-2xl border border-rose-100 p-5 hover:shadow-md transition-shadow group"
            >
              <div className="flex items-start gap-3">
                <div className={`w-12 h-12 rounded-full ${client.avatarBg} flex items-center justify-center font-bold shrink-0`}>
                  {client.initials}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <div className="font-semibold text-gray-900 truncate">
                        {client.firstName} {client.lastName}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500 mt-0.5">
                        <Phone className="w-3 h-3" />
                        {client.phone}
                      </div>
                    </div>
                    <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-rose-600 shrink-0 mt-1" />
                  </div>

                  {client.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {client.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                            TAG_STYLES[tag] || "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-100">
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wide">Vizite</div>
                  <div className="font-bold text-gray-900 mt-0.5">{client.visits}</div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wide">Total</div>
                  <div className="font-bold text-gray-900 mt-0.5 text-sm">
                    {formatLei(client.totalSpent).replace(" lei", "")}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wide">Ultima</div>
                  <div className="font-bold text-gray-900 mt-0.5 text-xs">
                    {daysSinceLastVisit !== null
                      ? daysSinceLastVisit === 0
                        ? "Azi"
                        : `${daysSinceLastVisit}z`
                      : "—"}
                  </div>
                </div>
              </div>

              {hasBdaySoon && (
                <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-800 bg-amber-50 rounded-lg px-2 py-1.5">
                  <Cake className="w-3.5 h-3.5" />
                  Aniversare curând
                </div>
              )}
            </Link>
          );
        })}

        {filtered.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-400">
            Niciun client găsit
          </div>
        )}
      </div>
    </div>
  );
}

function StatCard({
  icon,
  label,
  value,
  color,
  active,
  onClick,
}: {
  icon: React.ReactNode;
  label: string;
  value: number;
  color: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`bg-white rounded-2xl border-2 p-5 text-left transition-all ${
        active ? "border-rose-400 shadow-md" : "border-transparent hover:border-rose-100"
      }`}
    >
      <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${color} text-white flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <div className="text-xs text-gray-500 uppercase tracking-wide">{label}</div>
      <div className="text-2xl font-bold text-gray-900 mt-0.5">{value}</div>
    </button>
  );
}
