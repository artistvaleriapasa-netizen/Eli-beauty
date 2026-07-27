"use client";

import {
  STAFF,
  getStaffPerformance,
  getServiceById,
  formatLei,
} from "@/lib/demo-data";
import { Plus, Star, Calendar, TrendingUp, Users, Award } from "lucide-react";

const DAYS = ["L", "M", "M", "J", "V", "S", "D"];

export default function EchipaPage() {
  const staffWithPerf = getStaffPerformance();

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900">Echipa mea</h1>
          <p className="text-sm text-gray-500 mt-1">
            {STAFF.length} profesioniste · echipă premium care aduce salonului{" "}
            {formatLei(staffWithPerf.reduce((s, st) => s + st.revenue, 0))} venituri
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-shadow">
          <Plus className="w-4 h-4" />
          Adaugă membru
        </button>
      </div>

      {/* Top performer highlight */}
      {staffWithPerf[0] && (
        <div className="bg-gradient-to-r from-amber-100 via-rose-100 to-pink-100 rounded-2xl border border-amber-200 p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 opacity-10 text-9xl">🏆</div>
          <div className="flex items-center gap-4 relative">
            <div className={`w-16 h-16 rounded-full ${staffWithPerf[0].avatarBg} ${staffWithPerf[0].avatarText} flex items-center justify-center font-bold text-xl shrink-0 shadow-lg`}>
              {staffWithPerf[0].initials}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <Award className="w-4 h-4 text-amber-700" />
                <span className="text-xs font-bold text-amber-800 uppercase tracking-wide">
                  Top angajată luna asta
                </span>
              </div>
              <div className="font-serif text-2xl font-bold text-gray-900">
                {staffWithPerf[0].firstName} {staffWithPerf[0].lastName}
              </div>
              <div className="text-sm text-gray-700 mt-1">
                {staffWithPerf[0].completedAppointments} programări · {formatLei(staffWithPerf[0].revenue)} venit
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Staff grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {staffWithPerf.map((s) => {
          const services = s.services
            .map((sid) => getServiceById(sid))
            .filter((sv): sv is NonNullable<typeof sv> => !!sv);

          return (
            <div
              key={s.id}
              className="bg-white rounded-2xl border border-rose-100 p-6 hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="flex items-start gap-4">
                <div className={`w-16 h-16 rounded-full ${s.avatarBg} ${s.avatarText} flex items-center justify-center font-bold text-xl shrink-0`}>
                  {s.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-serif text-xl font-bold text-gray-900 truncate">
                    {s.firstName} {s.lastName}
                  </div>
                  <div className="text-sm text-gray-500 truncate">{s.role}</div>
                  <div className="flex items-center gap-3 mt-2 text-xs">
                    <div className="flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
                      <span className="font-semibold text-gray-900">{s.rating}</span>
                      <span className="text-gray-500">({s.reviewCount})</span>
                    </div>
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ backgroundColor: s.color }}
                    />
                  </div>
                </div>
              </div>

              <p className="text-xs text-gray-500 mt-4 italic">
                {s.bio}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-gray-100">
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wide">Programări</div>
                  <div className="font-bold text-gray-900 mt-0.5">
                    {s.completedAppointments}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wide">Venit</div>
                  <div className="font-bold text-gray-900 mt-0.5 text-sm">
                    {formatLei(s.revenue).replace(" lei", "")}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-wide">Cliente</div>
                  <div className="font-bold text-gray-900 mt-0.5">
                    {s.uniqueClients}
                  </div>
                </div>
              </div>

              {/* Work schedule */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 mb-2">
                  <Calendar className="w-3.5 h-3.5 text-gray-500" />
                  <span className="text-xs text-gray-500 font-medium">
                    Program: {s.workHours.start} - {s.workHours.end}
                  </span>
                </div>
                <div className="flex gap-1">
                  {DAYS.map((d, idx) => {
                    const isWork = s.workDays.includes(idx + 1);
                    return (
                      <div
                        key={idx}
                        className={`flex-1 h-8 rounded-md flex items-center justify-center text-xs font-medium ${
                          isWork ? "text-white" : "bg-gray-100 text-gray-400"
                        }`}
                        style={isWork ? { backgroundColor: s.color } : {}}
                      >
                        {d}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Services */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="text-xs text-gray-500 mb-2">
                  Face {services.length} servicii:
                </div>
                <div className="flex flex-wrap gap-1">
                  {services.slice(0, 4).map((sv) => (
                    <span
                      key={sv.id}
                      className="text-[10px] px-2 py-1 rounded-full bg-gray-100 text-gray-700"
                    >
                      {sv.name}
                    </span>
                  ))}
                  {services.length > 4 && (
                    <span className="text-[10px] px-2 py-1 rounded-full bg-rose-100 text-rose-800 font-medium">
                      +{services.length - 4}
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
