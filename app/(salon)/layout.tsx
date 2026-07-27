"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Calendar,
  Users,
  Sparkles,
  UsersRound,
  BarChart3,
  Megaphone,
  Bot,
  Settings,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
import { SALON } from "@/lib/demo-data";

const NAV = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/programari", label: "Programări", icon: Calendar },
  { href: "/clienti", label: "Clienți", icon: Users },
  { href: "/servicii", label: "Servicii", icon: Sparkles },
  { href: "/echipa", label: "Echipă", icon: UsersRound },
  { href: "/rapoarte", label: "Rapoarte", icon: BarChart3 },
  { href: "/marketing", label: "Marketing", icon: Megaphone },
  { href: "/ai", label: "Assistant AI", icon: Bot, badge: "PRO" },
  { href: "/setari", label: "Setări", icon: Settings },
];

export default function SalonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50/40 via-white to-pink-50/20">
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-rose-100 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-700 to-rose-900 text-white font-serif italic font-bold text-lg flex items-center justify-center">
            E
          </div>
          <span className="font-semibold text-gray-900">{SALON.name}</span>
        </div>
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="p-2 hover:bg-rose-50 rounded-lg"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside
          className={`${
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          } lg:translate-x-0 fixed lg:sticky top-0 left-0 h-screen w-64 bg-white border-r border-rose-100 z-40 transition-transform overflow-y-auto`}
        >
          <div className="p-6 border-b border-rose-100">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-rose-700 to-rose-900 text-white font-serif italic font-bold text-2xl flex items-center justify-center shadow-lg shadow-rose-200">
                E
              </div>
              <div>
                <div className="font-serif text-lg font-bold text-gray-900 leading-tight">
                  Eli Beauty
                </div>
                <div className="text-xs text-gray-500">{SALON.city}</div>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-2 text-xs">
              <span className="px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 font-medium">
                Plan {SALON.subscription.tier}
              </span>
              <span className="text-gray-400">Activ</span>
            </div>
          </div>

          <nav className="p-3 space-y-1">
            {NAV.map((item) => {
              const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
              const Icon = item.icon;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center justify-between gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-gradient-to-r from-rose-100 to-pink-100 text-rose-900"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? "text-rose-700" : "text-gray-500"}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-gradient-to-r from-amber-400 to-amber-600 text-white font-bold">
                      {item.badge}
                    </span>
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 mt-4 border-t border-rose-100">
            <div className="rounded-xl bg-gradient-to-br from-rose-50 to-pink-50 border border-rose-100 p-4">
              <div className="text-xs font-semibold text-rose-900 mb-1">
                📱 App mobilă
              </div>
              <p className="text-[11px] text-rose-700 leading-relaxed">
                Adaugă Eli Beauty pe ecranul de start pentru acces rapid.
              </p>
            </div>

            <div className="mt-4 flex items-center gap-3 px-1">
              <div className="w-9 h-9 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-sm">
                D
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">
                  Demo User
                </div>
                <div className="text-xs text-gray-500 truncate">
                  Owner · demo@elibeauty.ro
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Backdrop for mobile */}
        {mobileOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/40 z-30"
            onClick={() => setMobileOpen(false)}
          />
        )}

        {/* Main content */}
        <main className="flex-1 min-w-0 lg:pl-0">
          <div className="max-w-7xl mx-auto p-4 lg:p-8">{children}</div>
        </main>
      </div>
    </div>
  );
}
