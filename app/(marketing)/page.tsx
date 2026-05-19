import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Users,
  TrendingUp,
  MessageSquare,
  Sparkles,
  Check,
  ArrowRight,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* ===== Header ===== */}
      <header className="border-b border-border/40 backdrop-blur supports-[backdrop-filter]:bg-background/80 sticky top-0 z-50">
        <div className="container mx-auto flex h-16 items-center justify-between px-4 max-w-7xl">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-rose-brand">
              Eli
            </span>
            <span className="text-sm tracking-wider text-muted-foreground uppercase">
              Beauty OS
            </span>
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm">
            <a href="#problema" className="hover:text-rose-brand transition-colors">
              Problema
            </a>
            <a href="#functii" className="hover:text-rose-brand transition-colors">
              Funcții
            </a>
            <a href="#preturi" className="hover:text-rose-brand transition-colors">
              Prețuri
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="text-sm font-medium hover:text-rose-brand transition-colors hidden sm:block"
            >
              Autentificare
            </Link>
            <Button asChild>
              <Link href="/signup">Începe gratuit</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* ===== Hero ===== */}
      <section className="container mx-auto px-4 pt-20 pb-12 max-w-7xl">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 rounded-full border border-rose-brand/20 bg-rose-brand-light/40 px-4 py-1.5 text-sm text-rose-brand-dark mb-8">
            <Sparkles className="h-3.5 w-3.5" />
            Primul SaaS dedicat saloanelor din Moldova & România
          </div>
          <h1 className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl font-bold tracking-tight mb-6 max-w-4xl mx-auto leading-tight">
            Salonul tău,{" "}
            <span className="text-rose-brand italic">simplificat complet</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Programări online, CRM clienți, gestiune servicii și plăți — totul
            într-o singură platformă. Construit cu și pentru proprietari de saloane.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-4">
            <Button size="lg" asChild>
              <Link href="/signup">
                Probă 14 zile gratuit
                <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <a href="#functii">Vezi cum funcționează</a>
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Fără card bancar · Configurare în 5 minute · Suport în română
          </p>
        </div>

        <div className="relative mx-auto max-w-5xl">
          <div className="absolute -inset-x-8 -inset-y-4 bg-gradient-to-br from-rose-brand-light/40 via-transparent to-gold-brand-light/40 blur-3xl rounded-[3rem] -z-10" />
          <DashboardMockup />
        </div>
      </section>

      {/* ===== Problem ===== */}
      <section id="problema" className="container mx-auto px-4 py-24 max-w-7xl">
        <div className="text-center mb-16">
          <p className="text-sm font-medium text-rose-brand mb-3 tracking-wider uppercase">
            Recunoști asta?
          </p>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold tracking-tight mb-4">
            Saloanele pierd timp și clienți
            <br />
            <span className="text-muted-foreground">cu unelte improvizate</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            DM-uri pe Instagram, caiete de programări, Excel-uri rătăcite — și la sfârșitul lunii nu știi nici câți clienți ai, nici cât ai câștigat.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              emoji: "📱",
              title: "Programări prin DM",
              pain: "Răspunzi la zeci de mesaje pe Instagram și WhatsApp. Uneori dublezi programări fără să-ți dai seama. Clientele își pierd rândul.",
            },
            {
              emoji: "📓",
              title: "Caiet de clienți",
              pain: "Istoricul vizitelor și preferințele sunt într-un caiet. Când o angajată pleacă, datele se pierd cu ea.",
            },
            {
              emoji: "🤷‍♀️",
              title: "Habar n-ai ce câștigi",
              pain: "La sfârșit de lună nu știi care serviciu e popular, cine sunt clienții fideli, sau cât trebuie să mărești prețul ca să crești.",
            },
          ].map((p) => (
            <div
              key={p.title}
              className="rounded-xl border border-border bg-card p-6 hover:border-rose-brand/40 transition-colors"
            >
              <div className="text-4xl mb-4">{p.emoji}</div>
              <h3 className="font-semibold text-lg mb-3">{p.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">{p.pain}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <p className="text-2xl font-[family-name:var(--font-playfair)] italic text-rose-brand">
            Există o cale mai bună.
          </p>
        </div>
      </section>

      {/* ===== Features ===== */}
      <section id="functii" className="bg-muted/30 border-y border-border/40">
        <div className="container mx-auto px-4 py-24 max-w-7xl">
          <div className="text-center mb-20">
            <p className="text-sm font-medium text-rose-brand mb-3 tracking-wider uppercase">
              Tot ce ai nevoie
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold tracking-tight mb-4">
              O singură aplicație,
              <br />
              <span className="text-rose-brand">tot salonul tău</span>
            </h2>
          </div>

          <FeatureBlock
            tag="Modulul de programări"
            title="Clientele rezervă singure, tu vezi totul"
            desc="Trimite-le link-ul tău unic și clientele rezervă în 30 de secunde, 24/7. Confirmări automate prin SMS. Tu vezi totul într-un calendar curat, fără double-bookings."
            bullets={[
              "Calendar live cu toate programările",
              "Confirmări SMS automate clientelor",
              "Blochezi sloturi (pauze, concedii) cu un click",
              "Reprogramări fără telefon",
            ]}
            mockup={<CalendarMockup />}
            reverse={false}
          />

          <div className="h-20" />

          <FeatureBlock
            tag="CRM clienți"
            title="Cunoaște-ți clientele mai bine ca ele însele"
            desc="Istoric complet al vizitelor, preferințe, alergii, note despre fiecare client. Vezi cine e VIP-ul tău, cine a dispărut de 3 luni, cine are ziua de naștere săptămâna asta."
            bullets={[
              "Fișă completă: contact, foto, preferințe",
              "Istoric vizite cu serviciile primite",
              "Tag-uri (VIP, alergic, dificil) pentru context rapid",
              "Note private vizibile doar staff-ului",
            ]}
            mockup={<ClientMockup />}
            reverse={true}
          />

          <div className="h-20" />

          <FeatureBlock
            tag="Catalog servicii"
            title="Servicii clare, prețuri actualizate"
            desc="Catalogul tău de servicii cu durată, preț, fotografii. Actualizezi prețul o dată — apare la fel peste tot: pagina publică, calendar, facturi."
            bullets={[
              "Categorii flexibile (Păr, Manichiură, Cosmetică)",
              "Durata exactă pentru blocarea corectă a slotului",
              "Activare/dezactivare sezonieră fără ștergere",
              "Foto pentru fiecare serviciu pe pagina publică",
            ]}
            mockup={<ServicesMockup />}
            reverse={false}
          />
        </div>
      </section>

      {/* ===== Why Now ===== */}
      <section className="container mx-auto px-4 py-24 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-sm font-medium text-rose-brand mb-3 tracking-wider uppercase">
              De ce acum?
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold tracking-tight mb-6">
              Clientele tale rezervă deja online — la concurenți
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p>
                <strong className="text-foreground">73% dintre clientele de saloane</strong>{" "}
                caută rezervare online înainte să sune. Dacă nu o ai, alegerea e simplă: aleg salonul care o oferă.
              </p>
              <p>
                <strong className="text-foreground">Saloanele cu sistem digital cresc cu 40%</strong>{" "}
                mai rapid decât cele care folosesc caietul. Nu pentru că sunt mai bune — pentru că sunt mai ușor de rezervat.
              </p>
              <p>
                Eli Beauty OS îți oferă același sistem pe care îl folosesc lanțurile mari, la un preț făcut pentru salonul tău.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <StatCard value="14 zile" label="Probă gratuită" />
            <StatCard value="5 min" label="Setup complet" />
            <StatCard value="24/7" label="Rezervări online" />
            <StatCard value="100%" label="GDPR conform" />
          </div>
        </div>
      </section>

      {/* ===== Pricing ===== */}
      <section id="preturi" className="bg-muted/30 border-y border-border/40">
        <div className="container mx-auto px-4 py-24 max-w-7xl">
          <div className="text-center mb-16">
            <p className="text-sm font-medium text-rose-brand mb-3 tracking-wider uppercase">
              Prețuri simple
            </p>
            <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold tracking-tight mb-4">
              Alege planul pentru salonul tău
            </h2>
            <p className="text-lg text-muted-foreground">
              14 zile gratuit. Anulezi oricând. Fără surprize.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            <PricingCard
              tier="Starter"
              price="200"
              desc="Pentru saloane mici, 1-3 angajați"
              features={[
                "Până la 3 utilizatori staff",
                "Programări online nelimitate",
                "CRM clienți complet",
                "Catalog servicii",
                "Suport prin email",
              ]}
              cta="Începe cu Starter"
              highlight={false}
            />
            <PricingCard
              tier="Pro"
              price="350"
              desc="Pentru saloane în creștere, 4-8 angajați"
              features={[
                "Până la 8 utilizatori staff",
                "Tot din Starter +",
                "SMS reminders automate",
                "Rapoarte avansate",
                "Marketing automation",
                "Suport prioritar",
              ]}
              cta="Începe cu Pro"
              highlight={true}
              badge="Cel mai popular"
            />
            <PricingCard
              tier="Enterprise"
              price="500"
              desc="Pentru lanțuri și saloane mari, 9-15 angajați"
              features={[
                "Utilizatori staff nelimitați",
                "Tot din Pro +",
                "Multi-locație",
                "Comisioane staff automate",
                "API & integrări custom",
                "Account manager dedicat",
              ]}
              cta="Contactează-ne"
              highlight={false}
            />
          </div>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Toate planurile includ: hosting, backup zilnic, conformitate GDPR & Legea 133 Moldova
          </p>
        </div>
      </section>

      {/* ===== Final CTA ===== */}
      <section className="container mx-auto px-4 py-24 max-w-4xl text-center">
        <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Gata să oprești haosul programărilor?
        </h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-2xl mx-auto">
          Înscrie-te în 60 de secunde și ai salonul tău live cu link de rezervări astăzi. Fără card bancar, fără contract pe termen lung.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" asChild>
            <Link href="/signup">
              Începe proba gratuit
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/login">Am deja cont</Link>
          </Button>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer className="border-t border-border/40 py-12 bg-muted/20">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div>
              <Link href="/" className="flex items-center gap-2 mb-2">
                <span className="font-[family-name:var(--font-playfair)] text-xl font-bold text-rose-brand">
                  Eli
                </span>
                <span className="text-xs tracking-wider text-muted-foreground uppercase">
                  Beauty OS
                </span>
              </Link>
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} B4B Moldova. Toate drepturile rezervate.
              </p>
            </div>
            <div className="flex gap-6 text-sm">
              <Link href="/termeni" className="text-muted-foreground hover:text-foreground">
                Termeni
              </Link>
              <Link href="/confidentialitate" className="text-muted-foreground hover:text-foreground">
                GDPR
              </Link>
              <a
                href="https://b4b-bold.vercel.app"
                target="_blank"
                rel="noopener"
                className="text-muted-foreground hover:text-foreground"
              >
                B4B Moldova
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ===== Sub-components ===== */

function FeatureBlock({
  tag,
  title,
  desc,
  bullets,
  mockup,
  reverse,
}: {
  tag: string;
  title: string;
  desc: string;
  bullets: string[];
  mockup: React.ReactNode;
  reverse: boolean;
}) {
  return (
    <div
      className={`grid lg:grid-cols-2 gap-12 items-center ${reverse ? "lg:[&>*:first-child]:order-2" : ""}`}
    >
      <div>
        <p className="text-sm font-medium text-rose-brand mb-3 tracking-wider uppercase">{tag}</p>
        <h3 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold tracking-tight mb-4">
          {title}
        </h3>
        <p className="text-lg text-muted-foreground mb-6">{desc}</p>
        <ul className="space-y-3">
          {bullets.map((b) => (
            <li key={b} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-rose-brand/10">
                <Check className="h-3 w-3 text-rose-brand" />
              </div>
              <span className="text-sm">{b}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="relative">
        <div className="absolute -inset-x-4 -inset-y-2 bg-gradient-to-br from-rose-brand-light/30 via-transparent to-gold-brand-light/30 blur-2xl rounded-3xl -z-10" />
        {mockup}
      </div>
    </div>
  );
}

function StatCard({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 text-center">
      <div className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-rose-brand mb-1">
        {value}
      </div>
      <div className="text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function PricingCard({
  tier,
  price,
  desc,
  features,
  cta,
  highlight,
  badge,
}: {
  tier: string;
  price: string;
  desc: string;
  features: string[];
  cta: string;
  highlight: boolean;
  badge?: string;
}) {
  return (
    <div
      className={`relative rounded-2xl border bg-card p-8 ${highlight ? "border-rose-brand shadow-xl shadow-rose-brand/10 scale-105" : "border-border"}`}
    >
      {badge && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-rose-brand text-white text-xs px-3 py-1 rounded-full">
          {badge}
        </div>
      )}
      <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold mb-1">{tier}</h3>
      <p className="text-sm text-muted-foreground mb-6">{desc}</p>
      <div className="mb-6">
        <span className="text-5xl font-bold">{price}</span>
        <span className="text-muted-foreground"> EUR/lună</span>
      </div>
      <Button className="w-full mb-6" variant={highlight ? "default" : "outline"} asChild>
        <Link href="/signup">{cta}</Link>
      </Button>
      <ul className="space-y-3">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2 text-sm">
            <Check className="h-4 w-4 text-rose-brand shrink-0 mt-0.5" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ===== SVG Mockups ===== */

function DashboardMockup() {
  return (
    <svg
      viewBox="0 0 900 540"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full rounded-2xl shadow-2xl"
      role="img"
      aria-label="Mockup dashboard Eli Beauty OS"
    >
      <rect width="900" height="540" rx="20" fill="white" />
      <rect width="900" height="36" rx="20" fill="#f9f5f3" />
      <rect y="20" width="900" height="16" fill="#f9f5f3" />
      <circle cx="20" cy="18" r="5" fill="#fca5a5" />
      <circle cx="40" cy="18" r="5" fill="#fcd34d" />
      <circle cx="60" cy="18" r="5" fill="#86efac" />
      <rect x="0" y="36" width="180" height="504" fill="#fafafa" />
      <text x="24" y="76" fontFamily="Georgia, serif" fontSize="20" fontWeight="700" fill="#be185d">Eli</text>
      <text x="60" y="74" fontFamily="system-ui" fontSize="9" letterSpacing="2" fill="#9ca3af">BEAUTY OS</text>
      <text x="24" y="100" fontFamily="system-ui" fontSize="11" fontWeight="600" fill="#111">Salon Bella</text>
      <text x="24" y="116" fontFamily="system-ui" fontSize="10" fill="#9ca3af">@salon-bella</text>
      {[
        { y: 160, label: "Dashboard", active: true },
        { y: 195, label: "Programări" },
        { y: 230, label: "Servicii" },
        { y: 265, label: "Clienți" },
        { y: 300, label: "Setări" },
      ].map((n) => (
        <g key={n.label}>
          {n.active && <rect x="12" y={n.y - 18} width="156" height="28" rx="6" fill="#fce7f3" />}
          <circle cx="28" cy={n.y - 4} r="4" fill={n.active ? "#be185d" : "#9ca3af"} />
          <text x="44" y={n.y} fontFamily="system-ui" fontSize="13" fontWeight={n.active ? 600 : 400} fill={n.active ? "#be185d" : "#374151"}>
            {n.label}
          </text>
        </g>
      ))}
      <text x="210" y="80" fontFamily="Georgia, serif" fontSize="28" fontWeight="700" fill="#111">Bun venit</text>
      <text x="210" y="100" fontFamily="system-ui" fontSize="12" fill="#9ca3af">Marți, 27 octombrie 2026</text>
      {[
        { x: 210, label: "Programări azi", value: "12", change: "+3" },
        { x: 380, label: "Clienți totali", value: "248", change: "+12" },
        { x: 550, label: "Servicii active", value: "18", change: "" },
        { x: 720, label: "Venit (luna)", value: "47K", change: "+18%" },
      ].map((k) => (
        <g key={k.label}>
          <rect x={k.x} y="130" width="160" height="86" rx="10" fill="white" stroke="#e5e7eb" />
          <text x={k.x + 16} y="156" fontFamily="system-ui" fontSize="10" fill="#9ca3af">{k.label}</text>
          <text x={k.x + 16} y="190" fontFamily="system-ui" fontSize="26" fontWeight="700" fill="#111">{k.value}</text>
          {k.change && (
            <text x={k.x + 100} y="190" fontFamily="system-ui" fontSize="11" fontWeight="600" fill="#be185d">{k.change}</text>
          )}
        </g>
      ))}
      <text x="210" y="260" fontFamily="system-ui" fontSize="14" fontWeight="600" fill="#111">Programări astăzi</text>
      {[
        { y: 280, time: "09:00", name: "Maria Popescu", service: "Manichiură premium" },
        { y: 320, time: "10:30", name: "Andreea Ionescu", service: "Tuns + Vopsit" },
        { y: 360, time: "12:00", name: "Cristina Dumitru", service: "Coafat ocazie" },
        { y: 400, time: "14:00", name: "Elena Vasile", service: "Manichiură + Pedichiură" },
        { y: 440, time: "16:00", name: "Ioana Marinescu", service: "Tratament facial" },
      ].map((a) => (
        <g key={a.time}>
          <rect x="210" y={a.y} width="670" height="32" rx="6" fill="#fafafa" />
          <rect x="218" y={a.y + 6} width="4" height="20" rx="2" fill="#be185d" />
          <text x="232" y={a.y + 20} fontFamily="system-ui" fontSize="12" fontWeight="600" fill="#111">{a.time}</text>
          <text x="290" y={a.y + 20} fontFamily="system-ui" fontSize="12" fill="#374151">{a.name}</text>
          <text x="500" y={a.y + 20} fontFamily="system-ui" fontSize="11" fill="#9ca3af">{a.service}</text>
          <text x="820" y={a.y + 20} fontFamily="system-ui" fontSize="10" fontWeight="600" fill="#16a34a">●  Confirmat</text>
        </g>
      ))}
      <rect x="210" y="490" width="670" height="34" rx="8" fill="white" stroke="#e5e7eb" strokeDasharray="3 3" />
      <text x="540" y="511" fontFamily="system-ui" fontSize="11" fill="#9ca3af" textAnchor="middle">+ Adaugă programare</text>
    </svg>
  );
}

function CalendarMockup() {
  return (
    <svg
      viewBox="0 0 600 440"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full rounded-2xl shadow-xl"
      role="img"
      aria-label="Mockup calendar programări"
    >
      <rect width="600" height="440" rx="16" fill="white" />
      <text x="24" y="40" fontFamily="Georgia, serif" fontSize="20" fontWeight="700" fill="#111">Săptămâna 26 oct - 1 nov</text>
      {["Lun 26", "Mar 27", "Mie 28", "Joi 29", "Vin 30"].map((d, i) => (
        <g key={d}>
          <rect x={70 + i * 100} y="70" width="98" height="32" rx="6" fill={i === 1 ? "#fce7f3" : "#fafafa"} />
          <text x={119 + i * 100} y="90" fontFamily="system-ui" fontSize="11" fontWeight={i === 1 ? 600 : 500} fill={i === 1 ? "#be185d" : "#374151"} textAnchor="middle">{d}</text>
        </g>
      ))}
      {["09:00", "10:00", "11:00", "12:00", "13:00", "14:00"].map((t, i) => (
        <g key={t}>
          <text x="24" y={130 + i * 50} fontFamily="system-ui" fontSize="10" fill="#9ca3af">{t}</text>
          <line x1="70" y1={130 + i * 50 - 8} x2="570" y2={130 + i * 50 - 8} stroke="#f3f4f6" />
        </g>
      ))}
      {[
        { day: 0, top: 122, h: 40, name: "Maria P.", service: "Manichiură", color: "#be185d" },
        { day: 0, top: 222, h: 60, name: "Andreea I.", service: "Coafat", color: "#d4a574" },
        { day: 1, top: 122, h: 50, name: "Cristina D.", service: "Tuns + Vopsit", color: "#be185d" },
        { day: 1, top: 222, h: 40, name: "Elena V.", service: "Manichiură", color: "#be185d" },
        { day: 1, top: 322, h: 50, name: "Ioana M.", service: "Tratament", color: "#d4a574" },
        { day: 2, top: 172, h: 60, name: "Ana B.", service: "Vopsit complet", color: "#be185d" },
        { day: 2, top: 272, h: 40, name: "Diana T.", service: "Manichiură", color: "#d4a574" },
        { day: 3, top: 122, h: 50, name: "Lavinia S.", service: "Tuns", color: "#be185d" },
        { day: 3, top: 272, h: 60, name: "Roxana N.", service: "Coafat ocazie", color: "#be185d" },
        { day: 4, top: 172, h: 40, name: "Carmen R.", service: "Manichiură", color: "#d4a574" },
        { day: 4, top: 222, h: 50, name: "Sofia P.", service: "Vopsit", color: "#be185d" },
      ].map((a, i) => (
        <g key={i}>
          <rect x={72 + a.day * 100} y={a.top} width="94" height={a.h} rx="4" fill={a.color} opacity="0.15" />
          <rect x={72 + a.day * 100} y={a.top} width="3" height={a.h} fill={a.color} />
          <text x={80 + a.day * 100} y={a.top + 14} fontFamily="system-ui" fontSize="10" fontWeight="600" fill="#111">{a.name}</text>
          <text x={80 + a.day * 100} y={a.top + 28} fontFamily="system-ui" fontSize="9" fill="#6b7280">{a.service}</text>
        </g>
      ))}
      <line x1="70" y1="402" x2="570" y2="402" stroke="#f3f4f6" />
      <text x="300" y="424" fontFamily="system-ui" fontSize="10" fill="#9ca3af" textAnchor="middle">11 programări săptămâna asta · 3 sloturi libere</text>
    </svg>
  );
}

function ClientMockup() {
  return (
    <svg
      viewBox="0 0 540 440"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full rounded-2xl shadow-xl"
      role="img"
      aria-label="Mockup fișă client CRM"
    >
      <rect width="540" height="440" rx="16" fill="white" />
      <defs>
        <linearGradient id="clientGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fce7f3" />
          <stop offset="1" stopColor="#f5e6d3" />
        </linearGradient>
      </defs>
      <rect width="540" height="120" rx="16" fill="url(#clientGrad)" />
      <circle cx="80" cy="80" r="40" fill="#be185d" />
      <text x="80" y="92" fontFamily="Georgia, serif" fontSize="32" fontWeight="700" fill="white" textAnchor="middle">MP</text>
      <text x="140" y="68" fontFamily="Georgia, serif" fontSize="22" fontWeight="700" fill="#111">Maria Popescu</text>
      <text x="140" y="88" fontFamily="system-ui" fontSize="11" fill="#6b7280">maria.popescu@email.com · +373 79 123 456</text>
      <rect x="140" y="100" width="40" height="18" rx="9" fill="#be185d" />
      <text x="160" y="113" fontFamily="system-ui" fontSize="10" fontWeight="600" fill="white" textAnchor="middle">VIP</text>
      <rect x="186" y="100" width="62" height="18" rx="9" fill="#fef3c7" />
      <text x="217" y="113" fontFamily="system-ui" fontSize="10" fontWeight="600" fill="#92400e" textAnchor="middle">Alergic</text>
      <rect x="24" y="144" width="160" height="64" rx="10" fill="#fafafa" />
      <text x="40" y="166" fontFamily="system-ui" fontSize="10" fill="#9ca3af">Vizite</text>
      <text x="40" y="196" fontFamily="system-ui" fontSize="24" fontWeight="700" fill="#111">24</text>
      <rect x="194" y="144" width="160" height="64" rx="10" fill="#fafafa" />
      <text x="210" y="166" fontFamily="system-ui" fontSize="10" fill="#9ca3af">Total cheltuit</text>
      <text x="210" y="196" fontFamily="system-ui" fontSize="24" fontWeight="700" fill="#111">8,450 <tspan fontSize="14" fill="#9ca3af">MDL</tspan></text>
      <rect x="364" y="144" width="152" height="64" rx="10" fill="#fafafa" />
      <text x="380" y="166" fontFamily="system-ui" fontSize="10" fill="#9ca3af">Ultima vizită</text>
      <text x="380" y="196" fontFamily="system-ui" fontSize="14" fontWeight="600" fill="#111">acum 2 săpt</text>
      <text x="24" y="240" fontFamily="system-ui" fontSize="13" fontWeight="600" fill="#111">Istoric vizite</text>
      {[
        { y: 256, date: "13 oct 2026", service: "Manichiură premium + Pedichiură", price: "650 MDL" },
        { y: 296, date: "29 sept 2026", service: "Vopsit balayage + Tuns", price: "1,200 MDL" },
        { y: 336, date: "15 sept 2026", service: "Manichiură + Tratament unghii", price: "450 MDL" },
        { y: 376, date: "1 sept 2026", service: "Coafat ocazie + Machiaj", price: "800 MDL" },
      ].map((v) => (
        <g key={v.date}>
          <rect x="24" y={v.y} width="492" height="34" rx="6" fill="#fafafa" />
          <text x="40" y={v.y + 20} fontFamily="system-ui" fontSize="11" fill="#9ca3af">{v.date}</text>
          <text x="140" y={v.y + 20} fontFamily="system-ui" fontSize="12" fill="#111">{v.service}</text>
          <text x="500" y={v.y + 20} fontFamily="system-ui" fontSize="12" fontWeight="600" fill="#be185d" textAnchor="end">{v.price}</text>
        </g>
      ))}
    </svg>
  );
}

function ServicesMockup() {
  return (
    <svg
      viewBox="0 0 600 440"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full rounded-2xl shadow-xl"
      role="img"
      aria-label="Mockup catalog servicii"
    >
      <rect width="600" height="440" rx="16" fill="white" />
      <text x="24" y="40" fontFamily="Georgia, serif" fontSize="20" fontWeight="700" fill="#111">Servicii</text>
      <text x="24" y="58" fontFamily="system-ui" fontSize="11" fill="#9ca3af">18 active · 3 inactive sezonier</text>
      <rect x="480" y="22" width="96" height="32" rx="6" fill="#be185d" />
      <text x="528" y="42" fontFamily="system-ui" fontSize="11" fontWeight="600" fill="white" textAnchor="middle">+ Adaugă</text>
      <defs>
        <linearGradient id="card1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fce7f3" />
          <stop offset="1" stopColor="#be185d" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="card2" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f5e6d3" />
          <stop offset="1" stopColor="#d4a574" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id="card3" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#fce7f3" />
          <stop offset="1" stopColor="#d4a574" stopOpacity="0.4" />
        </linearGradient>
        <linearGradient id="card4" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#f5e6d3" />
          <stop offset="1" stopColor="#be185d" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      {[
        { x: 24, y: 90, name: "Manichiură premium", cat: "Manichiură", duration: "1h 30min", price: "450 MDL", gradient: "card1" },
        { x: 312, y: 90, name: "Vopsit balayage", cat: "Păr", duration: "3h", price: "1,200 MDL", gradient: "card2" },
        { x: 24, y: 260, name: "Tratament facial", cat: "Cosmetică", duration: "1h", price: "500 MDL", gradient: "card3" },
        { x: 312, y: 260, name: "Coafat ocazie", cat: "Păr", duration: "45min", price: "350 MDL", gradient: "card4" },
      ].map((s, i) => (
        <g key={i}>
          <rect x={s.x} y={s.y} width="264" height="150" rx="12" fill="#fafafa" stroke="#e5e7eb" />
          <rect x={s.x + 12} y={s.y + 12} width="60" height="60" rx="8" fill={`url(#${s.gradient})`} />
          <text x={s.x + 88} y={s.y + 32} fontFamily="system-ui" fontSize="14" fontWeight="600" fill="#111">{s.name}</text>
          <text x={s.x + 88} y={s.y + 50} fontFamily="system-ui" fontSize="11" fill="#9ca3af">{s.cat}</text>
          <line x1={s.x + 12} y1={s.y + 92} x2={s.x + 252} y2={s.y + 92} stroke="#f3f4f6" />
          <text x={s.x + 12} y={s.y + 120} fontFamily="system-ui" fontSize="11" fill="#9ca3af">⏱ {s.duration}</text>
          <text x={s.x + 252} y={s.y + 120} fontFamily="system-ui" fontSize="14" fontWeight="700" fill="#be185d" textAnchor="end">{s.price}</text>
        </g>
      ))}
    </svg>
  );
}
