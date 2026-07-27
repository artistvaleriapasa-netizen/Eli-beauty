"use client";

import { useState } from "react";
import {
  getRevenueByDay,
  getServicePopularity,
  getStaffPerformance,
  APPOINTMENTS,
  CLIENTS,
  formatLei,
  STAFF,
} from "@/lib/demo-data";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { Download, TrendingUp, TrendingDown, Users, DollarSign } from "lucide-react";

const PIE_COLORS = ["#be185d", "#ec4899", "#d97706", "#9333ea", "#059669"];

export default function RapoartePage() {
  const [period, setPeriod] = useState<"7d" | "30d" | "90d">("30d");

  const days = period === "7d" ? 7 : period === "30d" ? 30 : 90;
  const revenueData = getRevenueByDay(days);
  const services = getServicePopularity();
  const staffPerf = getStaffPerformance();

  // Compute metrics
  const totalRev = revenueData.reduce((s, d) => s + d.revenue, 0);
  const totalApts = APPOINTMENTS.filter((a) => {
    const d = new Date(a.startsAt);
    const start = new Date();
    start.setDate(start.getDate() - days);
    return d >= start && a.status === "completed";
  }).length;
  const uniqueClientsInPeriod = new Set(
    APPOINTMENTS.filter((a) => {
      const d = new Date(a.startsAt);
      const start = new Date();
      start.setDate(start.getDate() - days);
      return d >= start && a.status === "completed";
    }).map((a) => a.clientId)
  ).size;

  // Cancelation rate
  const cancelled = APPOINTMENTS.filter((a) => {
    const d = new Date(a.startsAt);
    const start = new Date();
    start.setDate(start.getDate() - days);
    return d >= start && (a.status === "cancelled" || a.status === "no_show");
  }).length;
  const cancelRate = (cancelled / (totalApts + cancelled)) * 100;

  // Hour heatmap data
  const hourData = Array.from({ length: 12 }, (_, i) => {
    const hour = 9 + i;
    const count = APPOINTMENTS.filter((a) => {
      const d = new Date(a.startsAt);
      const start = new Date();
      start.setDate(start.getDate() - days);
      return d >= start && d.getHours() === hour;
    }).length;
    return {
      hour: `${String(hour).padStart(2, "0")}:00`,
      count,
    };
  });

  // Day-of-week data
  const dowNames = ["Duminică", "Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă"];
  const dowData = Array.from({ length: 7 }, (_, i) => {
    const count = APPOINTMENTS.filter((a) => {
      const d = new Date(a.startsAt);
      const start = new Date();
      start.setDate(start.getDate() - days);
      return d >= start && d.getDay() === i && a.status === "completed";
    }).length;
    const revenue = APPOINTMENTS.filter((a) => {
      const d = new Date(a.startsAt);
      const start = new Date();
      start.setDate(start.getDate() - days);
      return d >= start && d.getDay() === i && a.status === "completed";
    }).reduce((s, a) => s + a.priceLei, 0);
    return {
      day: dowNames[i].slice(0, 3),
      count,
      revenue,
    };
  });

  const pieData = services.map((s) => ({ name: s.name, value: s.revenue }));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900">Rapoarte & Analitice</h1>
          <p className="text-sm text-gray-500 mt-1">
            Înțelege cum crește salonul tău
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-white rounded-lg border border-gray-200 p-1">
            {(["7d", "30d", "90d"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`px-3 py-1.5 text-sm rounded font-medium transition-colors ${
                  period === p ? "bg-rose-600 text-white" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {p === "7d" ? "7 zile" : p === "30d" ? "30 zile" : "90 zile"}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-gray-200 hover:bg-gray-50">
            <Download className="w-4 h-4" />
            Export
          </button>
        </div>
      </div>

      {/* Key metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          label="Venituri totale"
          value={formatLei(totalRev)}
          icon={<DollarSign className="w-5 h-5" />}
          color="rose"
        />
        <MetricCard
          label="Programări finalizate"
          value={totalApts.toString()}
          icon={<TrendingUp className="w-5 h-5" />}
          color="emerald"
        />
        <MetricCard
          label="Cliente unice"
          value={uniqueClientsInPeriod.toString()}
          icon={<Users className="w-5 h-5" />}
          color="sky"
        />
        <MetricCard
          label="Rată anulări"
          value={`${cancelRate.toFixed(1)}%`}
          icon={<TrendingDown className="w-5 h-5" />}
          color={cancelRate > 15 ? "red" : "gray"}
        />
      </div>

      {/* Revenue trend */}
      <ChartCard title="Trend venituri" subtitle={`Total ${formatLei(totalRev)} în ultimele ${days} zile`}>
        <ResponsiveContainer width="100%" height={280}>
          <AreaChart data={revenueData} margin={{ top: 10, right: 5, left: -10, bottom: 0 }}>
            <defs>
              <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#be185d" stopOpacity={0.4} />
                <stop offset="100%" stopColor="#be185d" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="label"
              interval={Math.floor(revenueData.length / 7)}
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
            />
            <Area type="monotone" dataKey="revenue" stroke="#be185d" strokeWidth={2} fill="url(#revGrad)" />
          </AreaChart>
        </ResponsiveContainer>
      </ChartCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Services pie */}
        <ChartCard title="Distribuție pe categorii" subtitle="Venituri pe categoria de servicii">
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                innerRadius={60}
                paddingAngle={2}
                dataKey="value"
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={PIE_COLORS[i % PIE_COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  background: "white",
                  border: "1px solid #fecdd3",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
                formatter={(v: number) => formatLei(v)}
              />
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                wrapperStyle={{ fontSize: "11px" }}
              />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        {/* Day of week */}
        <ChartCard title="Programări pe zi a săptămânii" subtitle="Când vin cele mai multe cliente">
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={dowData} margin={{ top: 10, right: 5, left: -10, bottom: 0 }}>
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#71717a" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#71717a" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{
                  background: "white",
                  border: "1px solid #fecdd3",
                  borderRadius: "8px",
                  fontSize: "12px",
                }}
              />
              <Bar dataKey="count" fill="#ec4899" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Hour heatmap */}
      <ChartCard title="Ore cu cerere maximă" subtitle="Când se rezervă cele mai multe programări">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={hourData} margin={{ top: 10, right: 5, left: -10, bottom: 0 }}>
            <XAxis dataKey="hour" tick={{ fontSize: 11, fill: "#71717a" }} axisLine={false} tickLine={false} />
            <YAxis tick={{ fontSize: 11, fill: "#71717a" }} axisLine={false} tickLine={false} />
            <Tooltip
              contentStyle={{
                background: "white",
                border: "1px solid #fecdd3",
                borderRadius: "8px",
                fontSize: "12px",
              }}
            />
            <Bar dataKey="count" fill="#d97706" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      {/* Staff leaderboard */}
      <div className="bg-white rounded-2xl border border-rose-100 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-semibold text-gray-900">Performanță echipă</h2>
            <p className="text-sm text-gray-500 mt-0.5">Rank după venituri</p>
          </div>
        </div>
        <div className="space-y-3">
          {staffPerf.map((s, i) => {
            const maxRev = Math.max(...staffPerf.map((st) => st.revenue));
            const pct = (s.revenue / maxRev) * 100;
            return (
              <div key={s.id} className="flex items-center gap-4">
                <div className="text-lg font-bold text-gray-400 w-6 text-center">
                  {i + 1}
                </div>
                <div className={`w-10 h-10 rounded-full ${s.avatarBg} ${s.avatarText} flex items-center justify-center font-semibold text-sm shrink-0`}>
                  {s.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-sm mb-1">
                    <div className="font-medium text-gray-900 truncate">
                      {s.firstName} {s.lastName}
                    </div>
                    <div className="font-bold text-gray-900 shrink-0">
                      {formatLei(s.revenue)}
                    </div>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${pct}%`, backgroundColor: s.color }}
                    />
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    {s.completedAppointments} programări · bilet mediu {formatLei(s.avgTicket)}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function MetricCard({
  label,
  value,
  icon,
  color,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: "rose" | "emerald" | "sky" | "red" | "gray";
}) {
  const colorClass = {
    rose: "from-rose-500 to-rose-700",
    emerald: "from-emerald-500 to-emerald-700",
    sky: "from-sky-500 to-sky-700",
    red: "from-red-500 to-red-700",
    gray: "from-gray-500 to-gray-700",
  }[color];

  return (
    <div className="bg-white rounded-2xl border border-rose-100 p-5">
      <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${colorClass} text-white flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-2xl font-bold text-gray-900 mt-1">{value}</div>
    </div>
  );
}

function ChartCard({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="bg-white rounded-2xl border border-rose-100 p-6">
      <div className="mb-4">
        <h2 className="font-semibold text-gray-900">{title}</h2>
        {subtitle && <p className="text-sm text-gray-500 mt-0.5">{subtitle}</p>}
      </div>
      {children}
    </div>
  );
}
