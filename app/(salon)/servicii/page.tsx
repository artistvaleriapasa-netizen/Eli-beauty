import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Plus, Scissors } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { formatPrice, formatDuration } from "@/lib/utils";

export default async function ServicesPage() {
  const supabase = await createClient();
  const { data: services } = await supabase
    .from("services")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold">
            Servicii
          </h1>
          <p className="text-muted-foreground mt-1">
            Catalogul serviciilor pe care le oferi clientelor
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Adaugă serviciu
        </Button>
      </div>

      {!services || services.length === 0 ? (
        <Card>
          <CardContent className="py-16 text-center">
            <div className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-rose-brand-light text-rose-brand mb-4">
              <Scissors className="h-6 w-6" />
            </div>
            <h3 className="font-semibold mb-2">Nu ai încă servicii adăugate</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-sm mx-auto">
              Adaugă primul serviciu pe care îl oferi (ex: manichiură clasică,
              tuns scurt, vopsit complet)
            </p>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Adaugă primul serviciu
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <Card key={service.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-semibold">{service.name}</h3>
                    {service.category && (
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {service.category}
                      </p>
                    )}
                  </div>
                  {!service.is_active && (
                    <span className="text-xs px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
                      Inactiv
                    </span>
                  )}
                </div>
                {service.description && (
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {service.description}
                  </p>
                )}
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">
                    {formatDuration(service.duration_minutes)}
                  </span>
                  <span className="font-semibold text-rose-brand">
                    {formatPrice(
                      service.price_cents,
                      service.currency as "MDL" | "EUR" | "RON"
                    )}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
