"use client";

import { useState } from "react";
import { CAMPAIGNS, formatLei, type Campaign } from "@/lib/demo-data";
import {
  Plus,
  TrendingUp,
  MessageCircle,
  Zap,
  Users,
  DollarSign,
  ChevronRight,
  Check,
  Pause,
  Send,
} from "lucide-react";

const TYPE_LABELS: Record<Campaign["type"], string> = {
  birthday: "Aniversare",
  winback: "Recuperare",
  referral: "Recomandare",
  promo: "Promoție",
  new_service: "Serviciu nou",
};

export default function MarketingPage() {
  const [selectedId, setSelectedId] = useState<string | null>(CAMPAIGNS[0]?.id ?? null);
  const selected = CAMPAIGNS.find((c) => c.id === selectedId);

  const totalSent = CAMPAIGNS.reduce((s, c) => s + c.sentThisMonth, 0);
  const totalConversions = CAMPAIGNS.reduce((s, c) => s + c.conversionsThisMonth, 0);
  const totalRevenue = CAMPAIGNS.reduce((s, c) => s + c.revenueGeneratedLei, 0);
  const conversionRate = totalSent > 0 ? (totalConversions / totalSent) * 100 : 0;

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900">Marketing automat</h1>
          <p className="text-sm text-gray-500 mt-1">
            Campanii automate care lucrează pentru tine 24/7
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-shadow">
          <Plus className="w-4 h-4" />
          Campanie nouă
        </button>
      </div>

      {/* Overview stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={<Send className="w-5 h-5" />}
          label="Mesaje trimise"
          value={totalSent.toString()}
          sub="luna asta"
          color="from-rose-500 to-rose-700"
        />
        <StatCard
          icon={<Check className="w-5 h-5" />}
          label="Conversii"
          value={totalConversions.toString()}
          sub={`${conversionRate.toFixed(1)}% rate`}
          color="from-emerald-500 to-emerald-700"
        />
        <StatCard
          icon={<DollarSign className="w-5 h-5" />}
          label="Venit generat"
          value={formatLei(totalRevenue)}
          sub="direct din campanii"
          color="from-amber-500 to-amber-700"
        />
        <StatCard
          icon={<TrendingUp className="w-5 h-5" />}
          label="ROI"
          value={`${((totalRevenue / (totalSent * 0.008 * 20)) || 0).toFixed(0)}x`}
          sub="pe fiecare leu"
          color="from-purple-500 to-purple-700"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Campaign list */}
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
            Campanii ({CAMPAIGNS.length})
          </h2>
          {CAMPAIGNS.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedId(c.id)}
              className={`w-full bg-white rounded-2xl border-2 p-5 text-left transition-all ${
                selectedId === c.id
                  ? "border-rose-400 shadow-md"
                  : "border-transparent hover:border-rose-100"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <div className="text-3xl shrink-0">{c.icon}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-gray-900 truncate">{c.name}</h3>
                      {c.status === "active" ? (
                        <span className="flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          ACTIV
                        </span>
                      ) : c.status === "paused" ? (
                        <span className="text-[10px] px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-semibold">
                          PAUZAT
                        </span>
                      ) : null}
                    </div>
                    <p className="text-xs text-gray-500 mb-3">{c.description}</p>
                    <div className="flex gap-4 text-xs">
                      <div>
                        <div className="text-gray-500">Trimise</div>
                        <div className="font-bold text-gray-900">{c.sentThisMonth}</div>
                      </div>
                      <div>
                        <div className="text-gray-500">Conversii</div>
                        <div className="font-bold text-emerald-700">
                          {c.conversionsThisMonth}
                        </div>
                      </div>
                      <div>
                        <div className="text-gray-500">Venit</div>
                        <div className="font-bold text-gray-900">
                          {formatLei(c.revenueGeneratedLei)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <ChevronRight
                  className={`w-5 h-5 shrink-0 mt-1 transition-colors ${
                    selectedId === c.id ? "text-rose-600" : "text-gray-400"
                  }`}
                />
              </div>
            </button>
          ))}
        </div>

        {/* Selected campaign detail */}
        {selected && (
          <div className="space-y-4 lg:sticky lg:top-6 self-start">
            <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wide">
              Detalii campanie
            </h2>

            {/* Campaign header */}
            <div className="bg-white rounded-2xl border border-rose-100 p-6">
              <div className="flex items-start gap-4">
                <div className="text-4xl">{selected.icon}</div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-serif text-2xl font-bold text-gray-900">
                    {selected.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-medium">
                      {TYPE_LABELS[selected.type]}
                    </span>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                        selected.status === "active"
                          ? "bg-emerald-100 text-emerald-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {selected.status === "active" ? "Activ" : "Pauzat"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mt-3">{selected.description}</p>
                </div>
              </div>

              <div className="mt-6 p-4 rounded-xl bg-rose-50 border border-rose-100">
                <div className="flex items-center gap-2 text-xs font-medium text-rose-800 mb-1">
                  <Zap className="w-3.5 h-3.5" />
                  DECLANȘATOR
                </div>
                <div className="text-sm text-rose-900">{selected.triggerCondition}</div>
              </div>

              <div className="flex gap-2 mt-4">
                {selected.status === "active" ? (
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium text-sm">
                    <Pause className="w-4 h-4" />
                    Pauzează
                  </button>
                ) : (
                  <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-medium text-sm">
                    <Zap className="w-4 h-4" />
                    Activează
                  </button>
                )}
                <button className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-medium text-sm">
                  Editează mesaj
                </button>
              </div>
            </div>

            {/* WhatsApp preview */}
            <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-2xl border border-emerald-200 p-6">
              <div className="flex items-center gap-2 mb-4">
                <MessageCircle className="w-5 h-5 text-emerald-700" />
                <h4 className="font-semibold text-emerald-900">
                  Preview mesaj WhatsApp
                </h4>
              </div>

              {/* Fake phone frame */}
              <div className="mx-auto max-w-sm bg-gray-100 rounded-3xl p-3 shadow-lg">
                <div className="bg-white rounded-2xl overflow-hidden">
                  {/* Header */}
                  <div className="bg-emerald-600 text-white px-4 py-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center font-serif italic font-bold">
                      E
                    </div>
                    <div className="min-w-0">
                      <div className="font-semibold text-sm">Eli Beauty Studio</div>
                      <div className="text-[10px] text-emerald-100">Business</div>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="p-4 bg-emerald-50 min-h-[200px]">
                    <div className="bg-white rounded-2xl rounded-bl-none p-3 max-w-[85%] shadow-sm">
                      <p className="text-sm text-gray-900 whitespace-pre-wrap">
                        {selected.messagePreview}
                      </p>
                      <div className="text-[10px] text-gray-400 mt-2 text-right">
                        14:32 ✓✓
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-xs text-emerald-800 mt-3 text-center">
                Automatizat prin WhatsApp Business API
              </div>
            </div>

            {/* Performance chart mock */}
            <div className="bg-white rounded-2xl border border-rose-100 p-6">
              <h4 className="font-semibold text-gray-900 mb-4">
                Performanță luna asta
              </h4>
              <div className="space-y-4">
                <PerfBar
                  label="Mesaje trimise"
                  value={selected.sentThisMonth}
                  max={30}
                  color="bg-rose-500"
                />
                <PerfBar
                  label="Cliente au răspuns"
                  value={selected.conversionsThisMonth}
                  max={30}
                  color="bg-emerald-500"
                />
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between">
                  <span className="text-sm text-gray-500">Venituri directe</span>
                  <span className="font-bold text-lg text-emerald-700">
                    +{formatLei(selected.revenueGeneratedLei)}
                  </span>
                </div>
              </div>
            </div>
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
  sub,
  color,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  sub: string;
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl border border-rose-100 p-5">
      <div className={`w-9 h-9 rounded-lg bg-gradient-to-br ${color} text-white flex items-center justify-center mb-3`}>
        {icon}
      </div>
      <div className="text-xs text-gray-500">{label}</div>
      <div className="text-2xl font-bold text-gray-900 mt-0.5">{value}</div>
      <div className="text-xs text-gray-400 mt-0.5">{sub}</div>
    </div>
  );
}

function PerfBar({
  label,
  value,
  max,
  color,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
}) {
  const pct = Math.min((value / max) * 100, 100);
  return (
    <div>
      <div className="flex justify-between text-sm mb-1">
        <span className="text-gray-600">{label}</span>
        <span className="font-semibold text-gray-900">{value}</span>
      </div>
      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
      </div>
    </div>
  );
}
