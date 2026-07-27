"use client";

import { useState, useMemo } from "react";
import {
  APPOINTMENTS,
  STAFF,
  getStaffById,
  getServiceById,
  getClientById,
  formatLei,
  formatTime,
} from "@/lib/demo-data";
import {
  ChevronLeft,
  ChevronRight,
  Plus,
  Calendar as CalIcon,
  Users as UsersIcon,
  X,
} from "lucide-react";

const HOURS = Array.from({ length: 12 }, (_, i) => 9 + i); // 09:00 - 20:00
const SLOT_HEIGHT = 60; // px per hour

export default function ProgramariPage() {
  const [weekStart, setWeekStart] = useState(() => {
    const d = new Date();
    d.setHours(0, 0, 0, 0);
    const dow = d.getDay() === 0 ? 6 : d.getDay() - 1;
    d.setDate(d.getDate() - dow);
    return d;
  });
  const [selectedApt, setSelectedApt] = useState<string | null>(null);
  const [filterStaffId, setFilterStaffId] = useState<string | null>(null);

  const weekDays = useMemo(() => {
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(weekStart);
      d.setDate(d.getDate() + i);
      return d;
    });
  }, [weekStart]);

  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 7);

  const weekAppointments = useMemo(() => {
    return APPOINTMENTS.filter((a) => {
      if (filterStaffId && a.staffId !== filterStaffId) return false;
      const start = new Date(a.startsAt);
      return start >= weekStart && start < weekEnd;
    });
  }, [weekStart, weekEnd, filterStaffId]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const totalRev = weekAppointments
    .filter((a) => a.status === "completed" || a.status === "confirmed")
    .reduce((s, a) => s + a.priceLei, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl font-bold text-gray-900">Programări</h1>
          <p className="text-sm text-gray-500 mt-1">
            {weekAppointments.length} programări această săptămână · {formatLei(totalRev)} prognozat
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-lg font-medium shadow-sm hover:shadow-md transition-shadow">
          <Plus className="w-4 h-4" />
          Programare nouă
        </button>
      </div>

      {/* Controls */}
      <div className="bg-white rounded-xl border border-rose-100 p-4 flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              const d = new Date(weekStart);
              d.setDate(d.getDate() - 7);
              setWeekStart(d);
            }}
            className="p-2 rounded-lg hover:bg-rose-50"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => {
              const d = new Date();
              d.setHours(0, 0, 0, 0);
              const dow = d.getDay() === 0 ? 6 : d.getDay() - 1;
              d.setDate(d.getDate() - dow);
              setWeekStart(d);
            }}
            className="px-3 py-1.5 text-sm rounded-lg border border-gray-200 hover:bg-gray-50 font-medium"
          >
            Astăzi
          </button>
          <button
            onClick={() => {
              const d = new Date(weekStart);
              d.setDate(d.getDate() + 7);
              setWeekStart(d);
            }}
            className="p-2 rounded-lg hover:bg-rose-50"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
          <div className="ml-2 text-sm font-medium text-gray-700">
            {weekStart.toLocaleDateString("ro-RO", { day: "numeric", month: "long" })} -{" "}
            {new Date(weekEnd.getTime() - 1).toLocaleDateString("ro-RO", { day: "numeric", month: "long" })}
          </div>
        </div>

        <div className="md:ml-auto flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setFilterStaffId(null)}
            className={`px-3 py-1.5 text-xs rounded-full font-medium ${
              !filterStaffId ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            }`}
          >
            Toate
          </button>
          {STAFF.map((s) => (
            <button
              key={s.id}
              onClick={() => setFilterStaffId(s.id === filterStaffId ? null : s.id)}
              className={`px-3 py-1.5 text-xs rounded-full font-medium flex items-center gap-1.5 transition-colors ${
                filterStaffId === s.id
                  ? "text-white"
                  : "bg-white border border-gray-200 text-gray-700 hover:bg-gray-50"
              }`}
              style={filterStaffId === s.id ? { backgroundColor: s.color } : {}}
            >
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              {s.firstName}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="bg-white rounded-xl border border-rose-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <div className="min-w-[900px]">
            {/* Day headers */}
            <div className="grid grid-cols-[60px_repeat(7,1fr)] border-b border-rose-100 bg-rose-50/30">
              <div />
              {weekDays.map((d) => {
                const isToday = d.getTime() === today.getTime();
                return (
                  <div
                    key={d.toISOString()}
                    className={`p-3 text-center border-l border-rose-100 ${
                      isToday ? "bg-gradient-to-b from-rose-100/50 to-transparent" : ""
                    }`}
                  >
                    <div className="text-xs text-gray-500 uppercase">
                      {d.toLocaleDateString("ro-RO", { weekday: "short" })}
                    </div>
                    <div
                      className={`text-lg font-bold mt-0.5 ${
                        isToday ? "text-rose-700" : "text-gray-900"
                      }`}
                    >
                      {d.getDate()}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Hours + slots */}
            <div className="grid grid-cols-[60px_repeat(7,1fr)]">
              {/* Hour labels */}
              <div className="border-r border-rose-100">
                {HOURS.map((h) => (
                  <div
                    key={h}
                    className="text-xs text-gray-400 text-right pr-2 border-b border-rose-50"
                    style={{ height: SLOT_HEIGHT }}
                  >
                    <span className="relative -top-2 bg-white px-1">
                      {String(h).padStart(2, "0")}:00
                    </span>
                  </div>
                ))}
              </div>

              {weekDays.map((day) => {
                const dayApts = weekAppointments.filter((a) => {
                  const d = new Date(a.startsAt);
                  return (
                    d.getFullYear() === day.getFullYear() &&
                    d.getMonth() === day.getMonth() &&
                    d.getDate() === day.getDate()
                  );
                });

                return (
                  <div
                    key={day.toISOString()}
                    className="relative border-l border-rose-100"
                    style={{ height: HOURS.length * SLOT_HEIGHT }}
                  >
                    {/* Hour grid lines */}
                    {HOURS.map((h) => (
                      <div
                        key={h}
                        className="border-b border-rose-50 hover:bg-rose-50/30 cursor-pointer"
                        style={{ height: SLOT_HEIGHT }}
                      />
                    ))}

                    {/* Appointments */}
                    {dayApts.map((apt) => {
                      const staff = getStaffById(apt.staffId);
                      const service = getServiceById(apt.serviceId);
                      const client = getClientById(apt.clientId);
                      if (!staff || !service || !client) return null;

                      const start = new Date(apt.startsAt);
                      const end = new Date(apt.endsAt);
                      const startMin = start.getHours() * 60 + start.getMinutes() - HOURS[0] * 60;
                      const duration = (end.getTime() - start.getTime()) / 60000;
                      const top = (startMin / 60) * SLOT_HEIGHT;
                      const height = (duration / 60) * SLOT_HEIGHT;

                      if (top < 0 || top > HOURS.length * SLOT_HEIGHT) return null;

                      const isCancelled = apt.status === "cancelled" || apt.status === "no_show";

                      return (
                        <button
                          key={apt.id}
                          onClick={() => setSelectedApt(apt.id)}
                          className={`absolute left-1 right-1 rounded-md p-1.5 overflow-hidden text-left shadow-sm hover:shadow-md transition-shadow z-10 ${
                            isCancelled ? "opacity-50" : ""
                          }`}
                          style={{
                            top,
                            height: Math.max(height - 2, 24),
                            backgroundColor: staff.color + "15",
                            borderLeft: `3px solid ${staff.color}`,
                          }}
                        >
                          <div className="text-[10px] font-semibold text-gray-900 truncate leading-tight">
                            {client.firstName} {client.lastName[0]}.
                          </div>
                          {height > 30 && (
                            <div className="text-[10px] text-gray-600 truncate leading-tight mt-0.5">
                              {service.name}
                            </div>
                          )}
                          {height > 45 && (
                            <div className="text-[9px] text-gray-500 mt-0.5">
                              {formatTime(apt.startsAt)}
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Appointment detail modal */}
      {selectedApt && (
        <AppointmentModal
          appointmentId={selectedApt}
          onClose={() => setSelectedApt(null)}
        />
      )}
    </div>
  );
}

function AppointmentModal({
  appointmentId,
  onClose,
}: {
  appointmentId: string;
  onClose: () => void;
}) {
  const apt = APPOINTMENTS.find((a) => a.id === appointmentId);
  if (!apt) return null;

  const client = getClientById(apt.clientId);
  const staff = getStaffById(apt.staffId);
  const service = getServiceById(apt.serviceId);

  if (!client || !staff || !service) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl max-w-md w-full shadow-2xl max-h-[90vh] overflow-y-auto"
        style={{ maxWidth: "94vw" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          className="p-6 rounded-t-2xl relative"
          style={{ background: `linear-gradient(135deg, ${staff.color}20, ${staff.color}05)` }}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-lg hover:bg-white/50"
          >
            <X className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-4">
            <div className={`w-14 h-14 rounded-full ${client.avatarBg} flex items-center justify-center font-bold text-lg`}>
              {client.initials}
            </div>
            <div>
              <div className="font-serif text-xl font-bold text-gray-900">
                {client.firstName} {client.lastName}
              </div>
              <div className="text-sm text-gray-600">{client.phone}</div>
            </div>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <Row label="Data & ora">
            <span className="font-medium">
              {new Date(apt.startsAt).toLocaleDateString("ro-RO", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
              {" · "}
              {formatTime(apt.startsAt)} - {formatTime(apt.endsAt)}
            </span>
          </Row>
          <Row label="Serviciu">
            <div>
              <div className="font-medium">{service.name}</div>
              <div className="text-xs text-gray-500">{service.durationMin} min</div>
            </div>
          </Row>
          <Row label="Angajată">
            <span className="font-medium">
              {staff.firstName} {staff.lastName}
            </span>
          </Row>
          <Row label="Preț">
            <span className="font-bold text-rose-700">{formatLei(apt.priceLei)}</span>
          </Row>
          <Row label="Status">
            <StatusBadge status={apt.status} />
          </Row>
          {apt.paid && (
            <Row label="Plătit">
              <span className="text-emerald-700 font-medium">
                ✓ da · {apt.paymentMethod === "card" ? "Card" : apt.paymentMethod === "cash" ? "Cash" : "Transfer"}
              </span>
            </Row>
          )}
          {apt.notes && (
            <Row label="Note">
              <span className="text-sm">{apt.notes}</span>
            </Row>
          )}
        </div>

        <div className="p-6 pt-0 flex flex-col sm:flex-row gap-2">
          <button className="flex-1 px-4 py-2.5 rounded-lg border border-gray-200 hover:bg-gray-50 font-medium text-sm">
            Editează
          </button>
          <button className="flex-1 px-4 py-2.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-medium text-sm">
            📱 Trimite WhatsApp
          </button>
        </div>
      </div>
    </div>
  );
}

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-4 py-2 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-500 shrink-0">{label}</span>
      <div className="text-right min-w-0">{children}</div>
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
    <span className={`text-xs px-2 py-1 rounded-full font-medium ${c.class}`}>
      {c.label}
    </span>
  );
}
