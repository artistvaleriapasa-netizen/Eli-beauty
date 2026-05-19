# Eli Beauty OS

> SaaS multi-tenant pentru saloane de înfrumusețare din Moldova & România.
> Built by [B4B Moldova](https://b4b-bold.vercel.app).

## Stack

- **Next.js 15** (App Router) + **TypeScript** strict
- **Tailwind CSS v4** + **shadcn/ui** (New York style)
- **Supabase** (Postgres + Auth + Storage + RLS)
- **Stripe** subscriptions (modulul 5)
- **MPay** pentru plăți end-customer Moldova (modulul 5)
- **next-intl** pentru i18n (RO inițial, EN+RU mai târziu)
- **Vercel** deploy

## Setup local (~10 min)

### 1. Clone & install

```bash
git clone https://github.com/artistvaleriapasa-netizen/b4b-eli-beauty.git
cd b4b-eli-beauty
pnpm install
```

Dacă nu ai `pnpm`: `brew install pnpm`.

### 2. Configurează Supabase

Pe [dashboard.supabase.com](https://dashboard.supabase.com):
1. **New Project** → nume `eli-beauty-os` → region **Frankfurt (eu-central-1)** → salvează parola DB.
2. După ce e gata, din **Settings → API** copiază: `Project URL`, `anon public key`, `service_role key`.

În terminal:
```bash
cp .env.example .env.local
# Editează .env.local cu valorile copiate
```

### 3. Rulează migration-ul

```bash
pnpm exec supabase login
pnpm exec supabase link --project-ref <PROJECT_REF>
pnpm db:push
```

Asta creează toate tabelele (`salons`, `services`, `clients`, `appointments`, etc.) împreună cu RLS policies pe Supabase.

### 4. Generează types din schema

```bash
pnpm db:types
```

Acest pas suprascrie `types/database.ts` cu types reale generate din schema curentă.

### 5. Pornește dev server

```bash
pnpm dev
```

Deschide [http://localhost:3000](http://localhost:3000).

## Arhitectură

### Multi-tenancy

Fiecare salon e un **tenant** în tabelul `salons`. Toate tabelele relevante au coloana `salon_id`. **Row-Level Security** (RLS) blochează accesul cross-tenant la nivel de Postgres — un user nu poate vedea date din alt salon, indiferent ce încearcă din client.

Helper functions pentru RLS:
- `is_salon_member(salon_id)` → user-ul curent e membru al salonului?
- `has_salon_role(salon_id, roles[])` → user-ul curent are unul din rolurile cerute?

Operațiunile cross-tenant (signup salon nou, invitări) folosesc `createAdminClient()` cu `service_role_key` (doar pe server, niciodată în client).

### Route groups

```
app/
├── (marketing)/         # landing public, fără auth
├── (auth)/              # login + signup
├── (salon)/             # dashboard salon (B2B), protejat de middleware
│   ├── dashboard/
│   ├── programari/
│   ├── servicii/
│   ├── clienti/
│   └── setari/
└── (client)/[salonSlug] # portal public per salon (rezervări online)
```

Middleware-ul (`middleware.ts`) refresh-uiește sesiunea Supabase la fiecare request și redirecționează utilizatorii neautentificați de pe rutele `(salon)`.

## Module MVP

- [x] **Modulul 1**: Auth multi-tenant — signup creează user + salon + membership atomic
- [ ] **Modulul 3**: Catalog servicii — CRUD complet (în lucru)
- [ ] **Modulul 2**: Programări online — calendar + slot booking
- [ ] **Modulul 4**: Clientele CRM — istoric vizite, preferințe
- [ ] **Modulul 6**: Dashboard owner — KPIs, programări azi, venituri
- [ ] **Modulul 5**: Plăți — Stripe (subscription) + MPay (clienți MD). Necesită decizia strategiei de entitate (vezi mai jos).

### Decizie pendinte: Stripe & Moldova

Moldova nu e suportată ca țară merchant de Stripe. Opțiuni:
- **A) SRL România** → Stripe RO direct
- **B) Stripe Atlas** → US LLC, ~$500 setup
- **C) Paddle / Lemon Squeezy** → Merchant of Record, fără entitate străină, comision mai mare

A se decide înainte de modulul 5 (~2 săptămâni).

## Brand

- **Rose primary**: `#be185d` → `--rose-brand`, `text-rose-brand`, `bg-rose-brand`
- **Gold secondary**: `#d4a574` → `--gold-brand`, `text-gold-brand`, `bg-gold-brand`
- **Display font**: Playfair Display
- **Body font**: Inter

## Comenzi utile

```bash
pnpm dev              # dev server cu Turbopack
pnpm build            # production build
pnpm typecheck        # tsc --noEmit
pnpm db:push          # aplică migrations pe Supabase remote
pnpm db:types         # regenerează types/database.ts din schema curentă
pnpm db:reset         # reset complet DB local (cu seed)
```

## Deploy pe Vercel

```bash
pnpm dlx vercel link
pnpm dlx vercel env pull .env.local   # sync variabilele dacă le-ai setat pe Vercel
pnpm dlx vercel --prod
```

Variabilele din `.env.example` trebuie setate în Vercel project settings.

## Compliance

- **GDPR + Legea 133 MD**: date stocate în Supabase EU (Frankfurt). Politica de retenție și export pentru clienți — modulul „Setări → Confidențialitate".
- **RLS**: izolare strictă tenant — niciun user nu poate accesa date din alt salon.

## Licență

© B4B Moldova. Toate drepturile rezervate.
