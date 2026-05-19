import { Card, CardContent } from "@/components/ui/card";
import { Calendar } from "lucide-react";

export default function AppointmentsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold">
          Programări
        </h1>
        <p className="text-muted-foreground mt-1">
          Calendar și gestiune programări
        </p>
      </div>

      <Card>
        <CardContent className="py-16 text-center">
          <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-brand-light text-rose-brand mb-4">
            <Calendar className="h-6 w-6" />
          </div>
          <h3 className="font-semibold mb-2">În lucru — Modulul 2</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Calendar pentru programări, slot booking, confirmări SMS și
            sincronizare cu personalul. Disponibil în curând.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
