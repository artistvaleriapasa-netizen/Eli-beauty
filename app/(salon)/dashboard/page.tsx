"use client";

import {
  getDashboardKpis,
  getRevenueByDay,
  getServicePopularity,
  getStaffPerformance,
  formatLei,
  formatTime,
  getStaffById,
  getServiceById,
  getClientById,
  CLIENTS,
  APPOINTMENTS,
  SALON,
} from "@/lib/demo-data";
import {
  TrendingUp,
  TrendingDown,
  Users,
  Calendar as CalIcon,
  DollarSign,
  Star,
  ArrowRight,
  Gift,
  Sparkles as SparkIcon,
} from "lucide-react";
import Link from "next/link";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";

export default function DashboardPage() {
  const kpi = getDashboardKpis();
  const revenueData = getRevenueByDay(30);
  const services = getServicePopularity();
  const staffPerf = getStaffPerformance().slice(0, 3);

  // Birthday soon
  const now = new Date();
  const birthdaysSoon = CLIENTS
    .map((c) => {
      if (!c.birthday) return null;
      const [_, month, day] = c.birthday.split("-").map(Number);
      const bday = new Date(now.getFullYear(), month - 1, day);
      if (bday < now) bday.setFullYear(bday.getFullYear() + 1);
      const daysUntil = Math.ceil((bday.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      return daysUntil <= 14 ? { client: c, daysUntil } : null;
    })
    .filter((x): x is { client: typeof CLIENTS[0]; daysUntil: number } => x !== null)
    .sort((a, b) => a.daysUntil - b.daysUntil)
    .slice(0, 3);

  // New this month
  const newClientsThisMonth = CLIENTS.filter((c) => {
    const joined = new Date(c.joinedAt);
    return joined.getMonth() === now.getMonth() && joined.getFullYear() === now.getFullYear();
  }).length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">Bine ai revenit,</p>
          <h1 className="font-serif text-3xl md:text-4xl font-bold text-gray-900">
            {SALON.name} 💫
          </h1>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <CalIcon className="w-4 h-4" />
          <span>
            {now.toLocaleDateString("ro-RO", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          icon={<DollarSign className="w-5 h-5" />}
          iconBg="bg-gradient-to-br from-rose-500 to-rose-700"
          label="Venituri luna asta"
          value={formatLei(kpi.revenueThisMonth)}
          trend={kpi.revenueChange}
          trendLabel="vs luna trecută"
        />
        <KpiCard
          icon={<CalIcon className="w-5 h-5" />}
          iconBg="bg-gradient-to-br from-pink-500 to-pink-700"
          label="Programări"
          value={kpi.appointmentsThisMonth.toString()}
          subtitle={`${kpi.uniqueClientsThisMonth} cliente unice`}
        />
        <KpiCard
          icon={<Users className="w-5 h-5" />}
          iconBg="bg-gradient-to-br from-amber-500 to-amber-700"
          label="Client nou luna asta"
          value={newClientsThisMonth.toString()}
          subtitle={`din ${CLIENTS.length} total`}
        />
        <KpiCard
          icon={<Star className="w-5 h-5" />}
          iconBg="bg-gradient-to-br from-purple-500 to-purple-700"
          label="Bilet mediu"
          value={formatLei(kpi.avgTicket)}
          subtitle="pe programare"
        />
      </div>

      {/* Revenue Chart */}
      <div className="bg-white rounded-2xl border border-rose-100 p-6 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-semibold text-gray-900">Venituri ultimele 30 zile</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              {formatLei(revenueData.reduce((s, d) => s + d.revenue, 0))} total în perioadă
            </p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-1.5 text-xs rounded-lg bg-rose-100 text-rose-800 font-medium">
              30 zile
            </button>
            <button className="px-3 py-1.5 text-xs rounded-lg text-gray-500 hover:bg-gray-50">
              90 zile
            </button>
            <button className="px-3 py-1.5 text-xs rounded-lg text-gray-500 hover:bg-gray-50">
              1 an
            </button>
          </div>
        </div>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: -10, bottom: 0 }}>
              <defs>
                <linearGradient id="revGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#be185d" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="#be185d" stopOpacity={0} />
                </linearGradient>
              </defs>
              <XAxis
                dataKey="label"
                interval={Math.floor(revenueData.length / 6)}
                tick={{ fontSize: 11, fill: "#71717a" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "#71717a" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `${(v / 1000).toFixed(0)}k`}
              />
              <Tooltip
                contentStyle={{
                  background: "white",
                  border: "1px solid #fecdd3",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                formatter={(v: number) => [formatLei(v), "Venit"]}
                labelStyle={{ color: "#be185d", fontWeight: 600 }}
              />
              <Area
                type="monotone"
                dataKey="revenue"
                stroke="#be185d"
                strokeWidth={2}
                fill="url(#revGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Two column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's schedule */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-rose-100 shadow-sm">
          <div className="p-6 border-b border-rose-100 flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900">
                Programări astăzi ({kpi.todayAppointments.length})
              </h2>
              <p className="text-sm text-gray-500 mt-0.5">
                {formatLei(kpi.todayRevenue)} preconizat
              </p>
            </div>
            <Link
              href="/programari"
              className="text-sm text-rose-700 font-medium hover:underline flex items-center gap-1"
            >
              Vezi toate <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="divide-y divide-rose-50 max-h-96 overflow-y-auto">
            {kpi.todayAppointments.length === 0 ? (
              <div className="p-8 text-center text-gray-400 text-sm">
                Nicio programare azi
              </div>
            ) : (
              kpi.todayAppointments.map((apt) => {
                const client = getClientById(apt.clientId);
                const staff = getStaffById(apt.staffId);
                const service = getServiceById(apt.serviceId);
                if (!client || !staff || !service) return null;
                return (
                  <div key={apt.id} className="p-4 flex items-center gap-4 hover:bg-rose-50/30">
                    <div className="w-16 text-right shrink-0">
                      <div className="font-mono font-semibold text-gray-900">
                        {formatTime(apt.startsAt)}
                      </div>
                      <div className="text-[10px] text-gray-400">
                        {service.durationMin}m
                      </div>
                    </div>
                    <div
                      className="w-1 h-12 rounded-full shrink-0"
                      style={{ backgroundColor: staff.color }}
                    />
                    <div className={`w-10 h-10 rounded-full ${client.avatarBg} flex items-center justify-center font-semibold text-sm shrink-0`}>
                      {client.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-gray-900 truncate">
                        {client.firstName} {client.lastName}
                      </div>
                      <div className="text-sm text-gray-500 truncate">
                        {service.name} · cu {staff.firstName}
                      </div>
                    </div>
                    <StatusBadge status={apt.status} />
                    <div className="text-sm font-semibold text-gray-900 shrink-0 hidden sm:block">
                      {formatLei(apt.priceLei)}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right sidebar - insights */}
        <div className="space-y-6">
          {/* Birthdays soon */}
          <div className="bg-gradient-to-br from-amber-50 via-rose-50 to-pink-50 border border-amber-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Gift className="w-5 h-5 text-amber-700" />
              <h3 className="font-semibold text-amber-900">
                Aniversări în 2 săptămâni
              </h3>
            </div>
            {birthdaysSoon.length === 0 ? (
              <p className="text-sm text-amber-700/70">
                Nimeni în perioada asta
              </p>
            ) : (
              <div className="space-y-3">
                {birthdaysSoon.map(({ client, daysUntil }) => (
                  <div key={client.id} className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full ${client.avatarBg} flex items-center justify-center font-semibold text-sm shrink-0`}>
                      {client.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-sm text-gray-900 truncate">
                        {client.firstName} {client.lastName}
                      </div>
                      <div className="text-xs text-amber-700">
                        {daysUntil === 0 ? "🎂 astăzi!" : `în ${daysUntil} zile`}
                      </div>
                    </div>
                  </div>
                ))}
                <button className="w-full mt-2 text-xs font-medium text-amber-800 hover:text-amber-900 py-2 border-t border-amber-200">
                  Trimite voucher automat →
                </button>
              </div>
            )}
          </div>

          {/* Top staff */}
          <div className="bg-white rounded-2xl border border-rose-100 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">
              Top angajate luna asta
            </h3>
            <div className="space-y-3">
              {staffPerf.map((s, i) => (
                <div key={s.id} className="flex items-center gap-3">
                  <div className="text-xs font-bold text-gray-400 w-4">
                    {i + 1}
                  </div>
                  <div className={`w-9 h-9 rounded-full ${s.avatarBg} flex items-center justify-center font-semibold text-sm shrink-0 ${s.avatarText}`}>
                    {s.initials}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="font-medium text-sm text-gray-900 truncate">
                      {s.firstName} {s.lastName}
                    </div>
                    <div className="text-xs text-gray-500">
                      {s.completedAppointments} programări · ⭐ {s.rating}
                    </div>
                  </div>
                  <div className="text-sm font-semibold text-gray-900 shrink-0">
                    {formatLei(s.revenue)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Service categories */}
          <div className="bg-white rounded-2xl border border-rose-100 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">
              Categorii populare
            </h3>
            <div className="space-y-3">
              {services.slice(0, 5).map((cat) => {
                const maxRev = Math.max(...services.map((s) => s.revenue));
                const pct = (cat.revenue / maxRev) * 100;
                return (
                  <div key={cat.name}>
                    <div className="flex items-center justify-between text-sm mb-1">
                      <span className="flex items-center gap-2">
                        <span>{cat.icon}</span>
                        <span className="text-gray-700">{cat.name}</span>
                      </span>
                      <span className="font-medium text-gray-900">
                        {formatLei(cat.revenue)}
                      </span>
                    </div>
                    <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-rose-500 to-pink-500 rounded-full"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* AI Insight Banner */}
      <Link
        href="/ai"
        className="block bg-gradient-to-r from-purple-600 via-rose-600 to-amber-500 rounded-2xl p-6 text-white shadow-lg shadow-rose-200 hover:shadow-xl transition-shadow"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center shrink-0">
            <SparkIcon className="w-6 h-6" />
          </div>
          <div className="flex-1">
            <div className="font-semibold flex items-center gap-2">
              Assistant AI · <span className="text-xs bg-white/20 px-2 py-0.5 rounded font-bold">PRO</span>
            </div>
            <p className="text-white/90 text-sm mt-1">
              Am identificat 8 cliente care nu au mai revenit în 60+ zile. Vrei să le trimit ofertă automată? 🤖
            </p>
          </div>
          <ArrowRight className="w-6 h-6 shrink-0" />
        </div>
      </Link>
    </div>
  );
}

function KpiCard({
  icon,
  iconBg,
  label,
  value,
  trend,
  trendLabel,
  subtitle,
}: {
  icon: React.ReactNode;
  iconBg: string;
  label: string;
  value: string;
  trend?: number;
  trendLabel?: string;
  subtitle?: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-rose-100 p-5 shadow-sm">
      <div className="flex items-start justify-between mb-3">
        <div className={`w-10 h-10 rounded-lg ${iconBg} text-white flex items-center justify-center shadow-sm`}>
          {icon}
        </div>
        {trend !== undefined && (
          <div
            className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${
              trend >= 0
                ? "bg-emerald-50 text-emerald-700"
                : "bg-red-50 text-red-700"
            }`}
          >
            {trend >= 0 ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {Math.abs(trend).toFixed(0)}%
          </div>
        )}
      </div>
      <div className="text-xs text-gray-500 mb-1">{label}</div>
      <div className="text-2xl font-bold text-gray-900">{value}</div>
      {(subtitle || trendLabel) && (
        <div className="text-xs text-gray-400 mt-1">{subtitle || trendLabel}</div>
      )}
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const config: Record<string, { label: string; class: string }> = {
    confirmed: { label: "Confirmat", class: "bg-emerald-50 text-emerald-700" },
    completed: { label: "Finalizat", class: "bg-gray-100 text-gray-600" },
    pending: { label: "În așteptare", class: "bg-amber-50 text-amber-700" },
    cancelled: { label: "Anulat", class: "bg-red-50 text-red-700" },
    no_show: { label: "Absent", class: "bg-red-50 text-red-700" },
  };
  const c = config[status] || config.pending;
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${c.class} hidden md:inline-block`}>
      {c.label}
    </span>
  );
}
