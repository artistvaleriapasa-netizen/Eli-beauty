import { Card, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

export default function ClientsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold">
          Clienți
        </h1>
        <p className="text-muted-foreground mt-1">
          CRM cu istoric vizite, preferințe și programări viitoare
        </p>
      </div>

      <Card>
        <CardContent className="py-16 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-brand-light text-rose-brand mb-4">
            <Users className="h-6 w-6" />
          </div>
          <h3 className="font-semibold mb-2">În lucru — Modulul 4</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            CRM complet pentru clienții salonului tău. Disponibil după modulul
            de programări.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
