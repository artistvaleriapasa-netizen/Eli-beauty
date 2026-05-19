import Link from "next/link";
import { Button } from "@/components/ui/button";
import { CalendarHeart, Users, CreditCard, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-rose-brand">
              Eli
            </span>
            <span className="text-sm tracking-wider text-muted-foreground uppercase">
              Beauty OS
            </span>
          </Link>
          <nav className="flex items-center gap-4">
            <Link
              href="/login"
              className="text-sm font-medium hover:text-rose-brand transition-colors"
            >
              Autentificare
            </Link>
            <Button asChild>
              <Link href="/signup">Începe gratuit</Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="container mx-auto px-4 py-24 text-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-rose-brand/20 bg-rose-brand-light/30 px-4 py-1.5 text-sm text-rose-brand-dark mb-8">
          <Sparkles className="h-3.5 w-3.5" />
          Primul SaaS dedicat saloanelor din Moldova & România
        </div>
        <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto">
          Salonul tău,{" "}
          <span className="text-rose-brand">simplificat complet</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
          Programări online, CRM clienți, gestiune servicii și plăți — totul
          într-o singură platformă. De la 200 EUR/lună.
        </p>
        <div className="flex gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/signup">Probă 14 zile gratuit</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="#features">Vezi funcționalitățile</Link>
          </Button>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="container mx-auto px-4 py-24 border-t border-border/40">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            {
              icon: CalendarHeart,
              title: "Programări online",
              desc: "Clientele rezervă singure 24/7, tu vezi totul pe calendar.",
            },
            {
              icon: Users,
              title: "CRM complet",
              desc: "Istoricul vizitelor, preferințele și note pentru fiecare client.",
            },
            {
              icon: CreditCard,
              title: "Plăți integrate",
              desc: "Stripe pentru abonament, MPay pentru clienți din Moldova.",
            },
            {
              icon: Sparkles,
              title: "AI assistant",
              desc: "Recomandări automate și chat asistent pentru clientele tale.",
            },
          ].map((f) => (
            <div
              key={f.title}
              className="rounded-lg border border-border bg-card p-6 hover:border-rose-brand/30 transition-colors"
            >
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-md bg-rose-brand-light text-rose-brand mb-4">
                <f.icon className="h-5 w-5" />
              </div>
              <h3 className="font-semibold mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/40 py-8">
        <div className="container mx-auto px-4 flex items-center justify-between text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} B4B Moldova. Toate drepturile rezervate.</p>
          <div className="flex gap-6">
            <Link href="/termeni" className="hover:text-foreground">
              Termeni
            </Link>
            <Link href="/confidentialitate" className="hover:text-foreground">
              GDPR
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
