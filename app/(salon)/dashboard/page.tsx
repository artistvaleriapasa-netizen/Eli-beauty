import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Users, Scissors, TrendingUp } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  // Ia statistici de bază pentru salonul curent
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [
    { count: todayAppointmentsCount },
    { count: clientsCount },
    { count: servicesCount },
  ] = await Promise.all([
    supabase
      .from("appointments")
      .select("*", { count: "exact", head: true })
      .gte("starts_at", today.toISOString())
      .lt("starts_at", tomorrow.toISOString()),
    supabase.from("clients").select("*", { count: "exact", head: true }),
    supabase
      .from("services")
      .select("*", { count: "exact", head: true })
      .eq("is_active", true),
  ]);

  const stats = [
    {
      label: "Programări astăzi",
      value: todayAppointmentsCount ?? 0,
      icon: Calendar,
    },
    { label: "Clienți totali", value: clientsCount ?? 0, icon: Users },
    {
      label: "Servicii active",
      value: servicesCount ?? 0,
      icon: Scissors,
    },
    { label: "Venit (luna)", value: "—", icon: TrendingUp },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold">
          Bun venit
        </h1>
        <p className="text-muted-foreground mt-1">
          {new Date().toLocaleDateString("ro-RO", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
      </div>

      {/* KPI cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {stat.label}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Empty state */}
      <Card>
        <CardHeader>
          <CardTitle>Primii pași</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <p className="text-muted-foreground">
            Pentru a începe să folosești Eli Beauty OS:
          </p>
          <ol className="space-y-2 list-decimal list-inside text-muted-foreground">
            <li>
              Adaugă{" "}
              <a href="/servicii" className="text-rose-brand hover:underline">
                serviciile pe care le oferi
              </a>{" "}
              (manichiură, tuns, vopsit, etc.)
            </li>
            <li>Configurează personalul și programul de lucru</li>
            <li>Distribuie link-ul de rezervare clientelor tale</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
