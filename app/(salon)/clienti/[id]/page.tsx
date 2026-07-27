"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import {
  CLIENTS,
  APPOINTMENTS,
  REVIEWS,
  getStaffById,
  getServiceById,
  formatLei,
  formatDate,
  formatTime,
  daysBetween,
} from "@/lib/demo-data";
import {
  ArrowLeft,
  Phone,
  Mail,
  Cake,
  Gift,
  Calendar as CalIcon,
  Star,
  MessageCircle,
  Edit,
  TrendingUp,
  MapPin,
  Send,
  Heart,
} from "lucide-react";

export default function ClientDetailPage() {
  const params = useParams();
  const clientId = params.id as string;
  const client = CLIENTS.find((c) => c.id === clientId);

  if (!client) {
    return (
      <div className="py-12 text-center">
        <p className="text-gray-500">Client negăsit</p>
        <Link href="/clienti" className="text-rose-700 hover:underline mt-2 inline-block">
          Înapoi la clienți
        </Link>
      </div>
    );
  }

  const clientApts = APPOINTMENTS
    .filter((a) => a.clientId === client.id)
    .sort((a, b) => b.startsAt.localeCompare(a.startsAt));
  const pastApts = clientApts.filter((a) => new Date(a.startsAt) < new Date());
  const upcomingApts = clientApts.filter((a) => new Date(a.startsAt) >= new Date());
  const clientReviews = REVIEWS.filter((r) => r.clientId === client.id);

  // Compute favorites
  const serviceCounts = new Map<string, number>();
  pastApts.forEach((a) => {
    if (a.status === "completed") {
      serviceCounts.set(a.serviceId, (serviceCounts.get(a.serviceId) || 0) + 1);
    }
  });
  const topServices = Array.from(serviceCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)
    .map(([id, count]) => ({ service: getServiceById(id), count }));

  // Staff preferences
  const staffCounts = new Map<string, number>();
  pastApts.forEach((a) => {
    if (a.status === "completed") {
      staffCounts.set(a.staffId, (staffCounts.get(a.staffId) || 0) + 1);
    }
  });
  const favoriteStaff = Array.from(staffCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([id]) => getStaffById(id));

  const avgSpent = pastApts.length > 0 ? Math.round(client.totalSpent / pastApts.length) : 0;
  const [_, bMonth, bDay] = client.birthday ? client.birthday.split("-").map(Number) : [null, null, null];
  const birthdayFormatted = bMonth && bDay
    ? new Date(2000, bMonth - 1, bDay).toLocaleDateString("ro-RO", { day: "numeric", month: "long" })
    : "—";

  return (
    <div className="space-y-6">
      <Link
        href="/clienti"
        className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-rose-700"
      >
        <ArrowLeft className="w-4 h-4" />
        Înapoi la clienți
      </Link>

      {/* Header */}
      <div className="bg-gradient-to-br from-rose-50 via-white to-pink-50 rounded-2xl border border-rose-100 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className={`w-24 h-24 rounded-full ${client.avatarBg} flex items-center justify-center font-bold text-3xl shrink-0`}>
            {client.initials}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <h1 className="font-serif text-3xl font-bold text-gray-900">
                {client.firstName} {client.lastName}
              </h1>
              {client.tags.includes("VIP") && (
                <span className="text-xs px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-amber-600 text-white font-bold flex items-center gap-1">
                  <Star className="w-3 h-3 fill-white" />
                  VIP
                </span>
              )}
              {client.tags.filter((t) => t !== "VIP").map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2 py-1 rounded-full bg-white border border-rose-200 text-rose-800 font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1.5">
                <Phone className="w-4 h-4" />
                {client.phone}
              </div>
              {client.email && (
                <div className="flex items-center gap-1.5">
                  <Mail className="w-4 h-4" />
                  {client.email}
                </div>
              )}
              <div className="flex items-center gap-1.5">
                <Cake className="w-4 h-4" />
                {birthdayFormatted}
              </div>
              <div className="flex items-center gap-1.5">
                <CalIcon className="w-4 h-4" />
                Client din {formatDate(client.joinedAt)}
              </div>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 md:flex-col">
            <button className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-rose-600 to-rose-700 text-white rounded-lg font-medium shadow-sm text-sm">
              <MessageCircle className="w-4 h-4" />
              WhatsApp
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg font-medium text-sm">
              <Edit className="w-4 h-4" />
              Editează
            </button>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon="💰" label="Total cheltuit" value={formatLei(client.totalSpent)} />
        <StatCard icon="📅" label="Total vizite" value={client.visits.toString()} />
        <StatCard icon="🎫" label="Bilet mediu" value={formatLei(avgSpent)} />
        <StatCard
          icon="⏱️"
          label="Ultima vizită"
          value={
            client.lastVisit
              ? daysBetween(client.lastVisit) === 0
                ? "Astăzi"
                : `${daysBetween(client.lastVisit)}z în urmă`
              : "Prima vizită"
          }
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left: History */}
        <div className="lg:col-span-2 space-y-6">
          {/* Upcoming */}
          {upcomingApts.length > 0 && (
            <div className="bg-white rounded-2xl border border-rose-100 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">
                Programări viitoare ({upcomingApts.length})
              </h2>
              <div className="space-y-3">
                {upcomingApts.map((apt) => {
                  const staff = getStaffById(apt.staffId);
                  const service = getServiceById(apt.serviceId);
                  if (!staff || !service) return null;
                  return (
                    <div
                      key={apt.id}
                      className="flex items-center gap-4 p-3 rounded-xl bg-gradient-to-r from-rose-50 to-transparent border border-rose-100"
                    >
                      <div
                        className="w-1 h-12 rounded-full shrink-0"
                        style={{ backgroundColor: staff.color }}
                      />
                      <div className="w-14 text-center shrink-0">
                        <div className="text-xs text-gray-500 uppercase">
                          {new Date(apt.startsAt).toLocaleDateString("ro-RO", { month: "short" })}
                        </div>
                        <div className="text-xl font-bold text-gray-900">
                          {new Date(apt.startsAt).getDate()}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatTime(apt.startsAt)}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="font-medium text-gray-900">{service.name}</div>
                        <div className="text-sm text-gray-500">
                          cu {staff.firstName} {staff.lastName} · {service.durationMin} min
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <div className="font-bold text-rose-700">{formatLei(apt.priceLei)}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Past visits */}
          <div className="bg-white rounded-2xl border border-rose-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">
                Istoric vizite ({pastApts.length})
              </h2>
              {pastApts.length > 10 && (
                <span className="text-xs text-gray-500">
                  Afișez ultimele 10
                </span>
              )}
            </div>
            <div className="space-y-2">
              {pastApts.slice(0, 10).map((apt) => {
                const staff = getStaffById(apt.staffId);
                const service = getServiceById(apt.serviceId);
                if (!staff || !service) return null;
                return (
                  <div
                    key={apt.id}
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-rose-50/50"
                  >
                    <div className="text-xs text-gray-400 w-20 shrink-0">
                      {formatDate(apt.startsAt).replace(/ \d{4}/, "")}
                    </div>
                    <div
                      className="w-1 h-8 rounded-full shrink-0"
                      style={{ backgroundColor: staff.color }}
                    />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-sm text-gray-900 truncate">
                        {service.name}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        cu {staff.firstName}
                      </div>
                    </div>
                    <div className={`text-xs px-2 py-0.5 rounded-full font-medium shrink-0 ${
                      apt.status === "completed" ? "bg-emerald-50 text-emerald-700" :
                      apt.status === "cancelled" ? "bg-red-50 text-red-700" :
                      apt.status === "no_show" ? "bg-red-50 text-red-700" :
                      "bg-gray-50 text-gray-600"
                    }`}>
                      {apt.status === "completed" ? "Făcut" :
                       apt.status === "cancelled" ? "Anulat" :
                       apt.status === "no_show" ? "Absent" : apt.status}
                    </div>
                    <div className="font-medium text-sm text-gray-900 shrink-0 w-20 text-right">
                      {formatLei(apt.priceLei)}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reviews */}
          {clientReviews.length > 0 && (
            <div className="bg-white rounded-2xl border border-rose-100 p-6">
              <h2 className="font-semibold text-gray-900 mb-4">
                Recenzii de la client
              </h2>
              <div className="space-y-3">
                {clientReviews.map((r) => (
                  <div key={r.id} className="p-4 rounded-xl bg-gradient-to-br from-amber-50 to-yellow-50 border border-amber-100">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((n) => (
                          <Star
                            key={n}
                            className={`w-4 h-4 ${
                              n <= r.rating ? "text-amber-400 fill-amber-400" : "text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-xs text-gray-500">{formatDate(r.createdAt)}</span>
                    </div>
                    <p className="text-sm text-gray-700">{r.text}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: Preferences & notes */}
        <div className="space-y-6">
          {/* Notes */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Edit className="w-4 h-4 text-yellow-700" />
              <h3 className="font-semibold text-yellow-900">Note interne</h3>
            </div>
            <p className="text-sm text-yellow-900/80 italic">
              {client.notes || "Nicio notă adăugată încă."}
            </p>
          </div>

          {/* Favorite services */}
          {topServices.length > 0 && (
            <div className="bg-white rounded-2xl border border-rose-100 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-4 h-4 text-rose-600" />
                <h3 className="font-semibold text-gray-900">Servicii preferate</h3>
              </div>
              <div className="space-y-3">
                {topServices.map(({ service, count }) => (
                  service && (
                    <div key={service.id} className="flex items-center justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="font-medium text-sm text-gray-900 truncate">
                          {service.name}
                        </div>
                        <div className="text-xs text-gray-500">
                          {formatLei(service.priceLei)}
                        </div>
                      </div>
                      <div className="text-xs px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 font-semibold shrink-0">
                        ×{count}
                      </div>
                    </div>
                  )
                ))}
              </div>
            </div>
          )}

          {/* Favorite staff */}
          {favoriteStaff.length > 0 && favoriteStaff[0] && (
            <div className="bg-white rounded-2xl border border-rose-100 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">
                Angajate preferate
              </h3>
              <div className="space-y-3">
                {favoriteStaff.map((s) => s && (
                  <div key={s.id} className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full ${s.avatarBg} ${s.avatarText} flex items-center justify-center font-semibold text-sm shrink-0`}>
                      {s.initials}
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="font-medium text-sm text-gray-900 truncate">
                        {s.firstName} {s.lastName}
                      </div>
                      <div className="text-xs text-gray-500 truncate">
                        {s.role}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Marketing actions */}
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 border border-purple-200 rounded-2xl p-5">
            <h3 className="font-semibold text-purple-900 mb-3">Acțiuni marketing</h3>
            <div className="space-y-2">
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-white hover:bg-purple-100 text-sm text-purple-900 border border-purple-200">
                <Gift className="w-4 h-4" />
                Trimite voucher personalizat
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-white hover:bg-purple-100 text-sm text-purple-900 border border-purple-200">
                <Send className="w-4 h-4" />
                Ofertă -20% pentru revenire
              </button>
              <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg bg-white hover:bg-purple-100 text-sm text-purple-900 border border-purple-200">
                <Cake className="w-4 h-4" />
                Programează urare de zi de naștere
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="bg-white rounded-2xl border border-rose-100 p-4">
      <div className="text-2xl mb-1">{icon}</div>
      <div className="text-xs text-gray-500 uppercase tracking-wide">{label}</div>
      <div className="text-xl font-bold text-gray-900 mt-0.5">{value}</div>
    </div>
  );
}
