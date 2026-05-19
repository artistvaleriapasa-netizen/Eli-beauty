import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { createClient } from "@/lib/supabase/server";

export default async function SettingsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: membership } = await supabase
    .from("salon_members")
    .select("role, salons(*)")
    .eq("user_id", user!.id)
    .limit(1)
    .maybeSingle();

  const salon = membership?.salons as unknown as {
    name: string;
    slug: string;
    email: string | null;
    phone: string | null;
    city: string | null;
    subscription_status: string;
    subscription_tier: string;
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold">
          Setări
        </h1>
        <p className="text-muted-foreground mt-1">
          Detaliile salonului tău
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Informații salon</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-sm">
          <Row label="Nume" value={salon?.name} />
          <Row label="URL public" value={`eli-beauty.app/${salon?.slug}`} />
          <Row label="Email contact" value={salon?.email ?? "—"} />
          <Row label="Telefon" value={salon?.phone ?? "—"} />
          <Row label="Oraș" value={salon?.city ?? "—"} />
          <Row
            label="Plan curent"
            value={`${salon?.subscription_tier} · ${salon?.subscription_status}`}
          />
          <Row label="Rolul tău" value={membership?.role ?? "—"} />
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Confidențialitate & GDPR</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>
            Datele clienților salonului tău sunt stocate în Supabase EU
            (Frankfurt), izolate de orice alt salon prin Row-Level Security.
          </p>
          <p>
            Modulul de export/ștergere date conform GDPR + Legea 133 va fi
            disponibil în setări → Confidențialitate.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string | undefined }) {
  return (
    <div className="grid grid-cols-3 gap-4 py-2 border-b border-border/40 last:border-0">
      <dt className="text-muted-foreground">{label}</dt>
      <dd className="col-span-2 font-medium">{value || "—"}</dd>
    </div>
  );
}
