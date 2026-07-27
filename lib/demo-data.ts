/**
 * Central Demo Data — Eli Beauty Studio (București)
 *
 * All pages import from here. When ready to migrate to real DB queries,
 * replace individual imports with Supabase queries.
 *
 * Dates are computed relative to "now" so demo stays fresh forever.
 */

// ============================================================================
// TYPES
// ============================================================================

export interface Staff {
  id: string;
  firstName: string;
  lastName: string;
  role: string;
  bio: string;
  color: string; // hex — used for calendar bars
  avatarBg: string; // tailwind class
  avatarText: string; // tailwind class
  initials: string;
  rating: number;
  reviewCount: number;
  totalRevenue: number; // lei last 30d
  appointmentsThisMonth: number;
  services: string[]; // service IDs they perform
  workDays: number[]; // 1=Mon..7=Sun
  workHours: { start: string; end: string };
}

export interface ServiceCategory {
  id: string;
  name: string;
  icon: string; // emoji for demo
  color: string;
}

export interface Service {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  durationMin: number;
  priceLei: number;
  active: boolean;
  bookings30d: number; // popularity indicator
}

export interface Client {
  id: string;
  firstName: string;
  lastName: string;
  phone: string;
  email: string | null;
  birthday: string | null; // ISO date, no year matters much
  joinedAt: string;
  visits: number;
  totalSpent: number;
  notes: string;
  avatarBg: string;
  initials: string;
  favoriteServiceIds: string[];
  tags: string[]; // "VIP", "Regular", "New"
  lastVisit: string | null;
}

export type AppointmentStatus =
  | "confirmed"
  | "completed"
  | "cancelled"
  | "no_show"
  | "pending";

export interface Appointment {
  id: string;
  clientId: string;
  staffId: string;
  serviceId: string;
  startsAt: string;
  endsAt: string;
  status: AppointmentStatus;
  priceLei: number;
  paid: boolean;
  paymentMethod: "card" | "cash" | "transfer" | null;
  notes: string | null;
}

export interface Review {
  id: string;
  clientId: string;
  staffId: string | null;
  serviceId: string | null;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  createdAt: string;
}

export interface Campaign {
  id: string;
  name: string;
  type: "birthday" | "winback" | "referral" | "promo" | "new_service";
  status: "active" | "paused" | "draft";
  icon: string;
  description: string;
  triggerCondition: string;
  sentThisMonth: number;
  conversionsThisMonth: number;
  revenueGeneratedLei: number;
  messagePreview: string;
}

// ============================================================================
// SALON
// ============================================================================

export const SALON = {
  id: "demo-salon",
  name: "Eli Beauty Studio",
  slug: "eli-beauty-studio",
  logo: "E",
  tagline: "Frumusețea ta, prioritatea noastră",
  address: "Calea Victoriei 128, sector 1, București",
  phone: "+40 21 555 0123",
  email: "salut@elibeauty.ro",
  city: "București",
  workHours: "L-V: 09:00-20:00 · S: 10:00-18:00 · D: închis",
  subscription: {
    tier: "Pro",
    priceLei: 1000,
    renewsAt: addDays(30).toISOString(),
    status: "active" as const,
  },
};

// ============================================================================
// STAFF (5 members)
// ============================================================================

export const STAFF: Staff[] = [
  {
    id: "staff-1",
    firstName: "Ana",
    lastName: "Popescu",
    role: "Cosmetician senior",
    bio: "8 ani experiență în tratamente faciale și mesoterapie. Certificată Dermalogica.",
    color: "#be185d",
    avatarBg: "bg-rose-100",
    avatarText: "text-rose-800",
    initials: "AP",
    rating: 4.9,
    reviewCount: 127,
    totalRevenue: 15200,
    appointmentsThisMonth: 68,
    services: ["s-fata-1", "s-fata-2", "s-fata-3", "s-fata-4", "s-fata-5", "s-fata-6"],
    workDays: [1, 2, 3, 4, 5, 6],
    workHours: { start: "10:00", end: "19:00" },
  },
  {
    id: "staff-2",
    firstName: "Maria",
    lastName: "Ivanov",
    role: "Nail Artist",
    bio: "Specializată în design creativ și gel. Peste 5000 de manichiuri făcute.",
    color: "#ec4899",
    avatarBg: "bg-pink-100",
    avatarText: "text-pink-800",
    initials: "MI",
    rating: 4.8,
    reviewCount: 203,
    totalRevenue: 16400,
    appointmentsThisMonth: 92,
    services: ["s-unghii-1", "s-unghii-2", "s-unghii-3", "s-unghii-4", "s-unghii-5"],
    workDays: [1, 2, 3, 4, 5, 6],
    workHours: { start: "09:00", end: "20:00" },
  },
  {
    id: "staff-3",
    firstName: "Cristina",
    lastName: "Rusu",
    role: "Hair Stylist principală",
    bio: "Formată în Milano. Specialistă balayage și tratamente de restructurare.",
    color: "#d97706",
    avatarBg: "bg-amber-100",
    avatarText: "text-amber-800",
    initials: "CR",
    rating: 4.9,
    reviewCount: 168,
    totalRevenue: 23100,
    appointmentsThisMonth: 54,
    services: ["s-par-1", "s-par-2", "s-par-3", "s-par-4", "s-par-5", "s-par-6"],
    workDays: [2, 3, 4, 5, 6],
    workHours: { start: "10:00", end: "19:00" },
  },
  {
    id: "staff-4",
    firstName: "Elena",
    lastName: "Munteanu",
    role: "Machiaj Artist",
    bio: "Machiaje mireasă și evenimente. Colaborează cu 3 saloane de nunți din București.",
    color: "#9333ea",
    avatarBg: "bg-purple-100",
    avatarText: "text-purple-800",
    initials: "EM",
    rating: 5.0,
    reviewCount: 89,
    totalRevenue: 12900,
    appointmentsThisMonth: 32,
    services: ["s-machiaj-1", "s-machiaj-2", "s-machiaj-3"],
    workDays: [3, 4, 5, 6, 7],
    workHours: { start: "11:00", end: "20:00" },
  },
  {
    id: "staff-5",
    firstName: "Diana",
    lastName: "Ciobanu",
    role: "Specialist Epilare & Sprâncene",
    bio: "Epilare cu ceară elastică și SHR. Micropigmentare sprâncene.",
    color: "#059669",
    avatarBg: "bg-emerald-100",
    avatarText: "text-emerald-800",
    initials: "DC",
    rating: 4.7,
    reviewCount: 114,
    totalRevenue: 11100,
    appointmentsThisMonth: 71,
    services: ["s-epilare-1", "s-epilare-2", "s-epilare-3", "s-epilare-4", "s-fata-5", "s-fata-6"],
    workDays: [1, 2, 3, 4, 5],
    workHours: { start: "09:00", end: "18:00" },
  },
];

// ============================================================================
// SERVICE CATEGORIES + SERVICES (25)
// ============================================================================

export const CATEGORIES: ServiceCategory[] = [
  { id: "cat-unghii", name: "Unghii", icon: "💅", color: "bg-pink-50 text-pink-900 border-pink-200" },
  { id: "cat-par", name: "Păr", icon: "💇‍♀️", color: "bg-amber-50 text-amber-900 border-amber-200" },
  { id: "cat-fata", name: "Cosmetică & Sprâncene", icon: "✨", color: "bg-rose-50 text-rose-900 border-rose-200" },
  { id: "cat-machiaj", name: "Machiaj", icon: "💄", color: "bg-purple-50 text-purple-900 border-purple-200" },
  { id: "cat-epilare", name: "Epilare", icon: "🌸", color: "bg-emerald-50 text-emerald-900 border-emerald-200" },
];

export const SERVICES: Service[] = [
  // UNGHII
  { id: "s-unghii-1", name: "Manichiură clasică", categoryId: "cat-unghii", description: "Îngrijire cuticule, tăiere unghii, oja regulată", durationMin: 45, priceLei: 70, active: true, bookings30d: 48 },
  { id: "s-unghii-2", name: "Manichiură cu gel", categoryId: "cat-unghii", description: "Manichiura permanentă, rezistă 3 săptămâni", durationMin: 60, priceLei: 120, active: true, bookings30d: 67 },
  { id: "s-unghii-3", name: "Design unghii", categoryId: "cat-unghii", description: "Nail art, glitter, stampile, elemente 3D", durationMin: 30, priceLei: 50, active: true, bookings30d: 34 },
  { id: "s-unghii-4", name: "Pedichiură clasică", categoryId: "cat-unghii", description: "Îngrijire completă pentru picioare", durationMin: 60, priceLei: 100, active: true, bookings30d: 28 },
  { id: "s-unghii-5", name: "Pedichiură cu gel", categoryId: "cat-unghii", description: "Manichiură permanentă pentru picioare", durationMin: 90, priceLei: 150, active: true, bookings30d: 22 },
  // PĂR
  { id: "s-par-1", name: "Tuns damă (păr scurt)", categoryId: "cat-par", description: "Consultație, tuns și styling", durationMin: 30, priceLei: 100, active: true, bookings30d: 19 },
  { id: "s-par-2", name: "Tuns damă (păr lung)", categoryId: "cat-par", description: "Tuns creativ + coafat", durationMin: 60, priceLei: 180, active: true, bookings30d: 26 },
  { id: "s-par-3", name: "Coafat", categoryId: "cat-par", description: "Coafat pentru evenimente sau zi cu zi", durationMin: 45, priceLei: 100, active: true, bookings30d: 41 },
  { id: "s-par-4", name: "Vopsit rădăcini", categoryId: "cat-par", description: "Refresh culoare la rădăcini", durationMin: 120, priceLei: 250, active: true, bookings30d: 33 },
  { id: "s-par-5", name: "Balayage", categoryId: "cat-par", description: "Tehnică de decolorare natural graduată", durationMin: 180, priceLei: 550, active: true, bookings30d: 12 },
  { id: "s-par-6", name: "Tratament păr", categoryId: "cat-par", description: "Restructurare cu Olaplex sau Kerastase", durationMin: 60, priceLei: 180, active: true, bookings30d: 18 },
  // FAȚĂ
  { id: "s-fata-1", name: "Curățare facială", categoryId: "cat-fata", description: "Curățare profundă, extracție puncte negre", durationMin: 60, priceLei: 220, active: true, bookings30d: 24 },
  { id: "s-fata-2", name: "Peeling chimic", categoryId: "cat-fata", description: "Peeling cu acizi pentru înnoire celulară", durationMin: 45, priceLei: 280, active: true, bookings30d: 15 },
  { id: "s-fata-3", name: "Hidratare profundă", categoryId: "cat-fata", description: "Măști + serumuri pentru hidratare intensă", durationMin: 60, priceLei: 250, active: true, bookings30d: 21 },
  { id: "s-fata-4", name: "Mesoterapie", categoryId: "cat-fata", description: "Injecții cu vitamine și acid hialuronic", durationMin: 45, priceLei: 450, active: true, bookings30d: 9 },
  { id: "s-fata-5", name: "Design sprâncene", categoryId: "cat-fata", description: "Corectare formă cu ceară sau pensetă", durationMin: 20, priceLei: 50, active: true, bookings30d: 56 },
  { id: "s-fata-6", name: "Vopsit sprâncene + gene", categoryId: "cat-fata", description: "Vopsit cu vopsea profesională", durationMin: 30, priceLei: 100, active: true, bookings30d: 38 },
  // MACHIAJ
  { id: "s-machiaj-1", name: "Machiaj de zi", categoryId: "cat-machiaj", description: "Machiaj natural pentru zi", durationMin: 45, priceLei: 180, active: true, bookings30d: 17 },
  { id: "s-machiaj-2", name: "Machiaj de seară", categoryId: "cat-machiaj", description: "Machiaj glam pentru evenimente", durationMin: 60, priceLei: 250, active: true, bookings30d: 11 },
  { id: "s-machiaj-3", name: "Machiaj mireasă", categoryId: "cat-machiaj", description: "Trial + machiaj în ziua nunții", durationMin: 90, priceLei: 600, active: true, bookings30d: 4 },
  // EPILARE
  { id: "s-epilare-1", name: "Epilare picioare", categoryId: "cat-epilare", description: "Cu ceară elastică, picior complet", durationMin: 45, priceLei: 130, active: true, bookings30d: 29 },
  { id: "s-epilare-2", name: "Epilare zona bikini", categoryId: "cat-epilare", description: "Zona clasică sau brazilian", durationMin: 30, priceLei: 100, active: true, bookings30d: 32 },
  { id: "s-epilare-3", name: "Epilare mâini", categoryId: "cat-epilare", description: "Braț complet", durationMin: 30, priceLei: 70, active: true, bookings30d: 18 },
  { id: "s-epilare-4", name: "Epilare completă", categoryId: "cat-epilare", description: "Picioare + mâini + bikini", durationMin: 90, priceLei: 280, active: true, bookings30d: 14 },
];

// ============================================================================
// CLIENTS (generate 80)
// ============================================================================

const FEMALE_NAMES = [
  "Ana", "Maria", "Elena", "Cristina", "Diana", "Nadia", "Irina", "Olga",
  "Tatiana", "Ludmila", "Natalia", "Victoria", "Alina", "Corina", "Doina",
  "Silvia", "Mihaela", "Iulia", "Larisa", "Rodica", "Ecaterina", "Aliona",
  "Veronica", "Angela", "Svetlana", "Valeria", "Ana-Maria", "Nicoleta",
  "Camelia", "Daniela", "Adriana", "Simona", "Andreea", "Ionela", "Georgiana",
  "Ștefania", "Loredana", "Roxana", "Bianca", "Monica",
];

const LAST_NAMES = [
  "Popescu", "Ionescu", "Popa", "Dumitru", "Munteanu", "Stoica", "Constantin",
  "Marin", "Barbu", "Radu", "Preda", "Dima", "Mihai", "Nistor", "Bălan",
  "Croitoru", "Bejan", "Iancu", "Voinea", "Chiriac", "Bunea", "Grosu",
  "Sîrbu", "Lupu", "Ciobanu", "Rusu", "Georgescu", "Vasilescu", "Andreescu",
  "Stan", "Toma", "Ilie", "Neagu", "Enache", "Manole", "Pavel", "Grigore",
  "Petrescu", "Dobre", "Șerban", "Anghel", "Ivan", "Diaconu", "Cristea",
  "Nicolescu", "Ștefănescu", "Dinu", "Tudor", "Moldovan", "Oprea",
];

const AVATAR_COLORS = [
  "bg-rose-100 text-rose-800",
  "bg-pink-100 text-pink-800",
  "bg-amber-100 text-amber-800",
  "bg-purple-100 text-purple-800",
  "bg-emerald-100 text-emerald-800",
  "bg-sky-100 text-sky-800",
  "bg-indigo-100 text-indigo-800",
  "bg-orange-100 text-orange-800",
  "bg-fuchsia-100 text-fuchsia-800",
  "bg-teal-100 text-teal-800",
];

const CLIENT_NOTES = [
  "Preferă produse fără parfum. Alergică la nichel.",
  "Îi place să povestească — programează 15 min bonus.",
  "Vine mereu cu prietena Marina — recomandă buy-1-get-1 promo.",
  "Client fidel din 2022. Este influencer local (12k followers Instagram).",
  "Preferă tehniciene liniștite, nu îi place discuția.",
  "Are părul sensibil — nu vopsit direct pe rădăcină.",
  "",
  "Sensibilă la unghiile fragile, folosește lac întăritor.",
  "Vine pentru evenimente importante — mereu are grabă.",
  "",
  "A recomandat 3 prietene până acum. VIP.",
  "Anulează des în ultima secundă — cerem depozit.",
  "",
  "Studentă, vine când poate. Buget limitat.",
  "Prima vizită. De monitorizat.",
];

function seededRandom(seed: number): () => number {
  let state = seed;
  return () => {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };
}

function generateClients(): Client[] {
  const rand = seededRandom(42);
  const clients: Client[] = [];
  const usedNames = new Set<string>();
  const now = new Date();

  for (let i = 0; i < 80; i++) {
    let firstName: string, lastName: string, key: string;
    do {
      firstName = FEMALE_NAMES[Math.floor(rand() * FEMALE_NAMES.length)];
      lastName = LAST_NAMES[Math.floor(rand() * LAST_NAMES.length)];
      key = `${firstName} ${lastName}`;
    } while (usedNames.has(key));
    usedNames.add(key);

    // Romanian mobile: +40 7XX XXX XXX
    const phoneRest = String(Math.floor(rand() * 90000000) + 10000000); // 8 digits
    const phone = `+40 7${phoneRest.slice(0, 2)} ${phoneRest.slice(2, 5)} ${phoneRest.slice(5)}`;
    const hasEmail = rand() > 0.4;
    const email = hasEmail
      ? `${firstName.toLowerCase().replace(/-/g, "").replace(/ă/g, "a").replace(/â/g, "a").replace(/î/g, "i").replace(/ș/g, "s").replace(/ț/g, "t")}${lastName.toLowerCase().replace(/ă/g, "a").replace(/â/g, "a").replace(/î/g, "i").replace(/ș/g, "s").replace(/ț/g, "t")}@${["gmail.com", "yahoo.com", "outlook.com"][Math.floor(rand() * 3)]}`
      : null;

    // Birthday: random date this year
    const birthMonth = Math.floor(rand() * 12) + 1;
    const birthDay = Math.floor(rand() * 27) + 1;
    const birthYear = 1970 + Math.floor(rand() * 35);
    const birthday = `${birthYear}-${String(birthMonth).padStart(2, "0")}-${String(birthDay).padStart(2, "0")}`;

    // Joined: random past 3 years
    const daysSinceJoin = Math.floor(rand() * 900) + 30;
    const joinedAt = addDays(-daysSinceJoin).toISOString();

    const visits = Math.floor(rand() * 40) + 1;
    const avgSpend = 120 + Math.floor(rand() * 250); // 120-370 lei average per visit
    const totalSpent = visits * avgSpend;

    // Last visit: within past 90 days for most
    const daysSinceLastVisit = rand() > 0.85 ? Math.floor(rand() * 180) + 90 : Math.floor(rand() * 60);
    const lastVisit = visits > 0 ? addDays(-daysSinceLastVisit).toISOString() : null;

    const tags: string[] = [];
    if (totalSpent > 5000) tags.push("VIP");
    else if (visits >= 5) tags.push("Regular");
    else if (visits <= 1) tags.push("Nou");
    if (daysSinceLastVisit > 90 && visits > 3) tags.push("Recuperare");

    // Birthday soon? Add tag
    const bdayThisYear = new Date(now.getFullYear(), birthMonth - 1, birthDay);
    const daysUntilBday = Math.floor((bdayThisYear.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    if (daysUntilBday >= 0 && daysUntilBday <= 7) tags.push("Aniversare săptămâna asta");

    const favIdx1 = Math.floor(rand() * SERVICES.length);
    const favIdx2 = Math.floor(rand() * SERVICES.length);
    const favoriteServiceIds = [SERVICES[favIdx1].id, SERVICES[favIdx2].id].filter(
      (v, i, a) => a.indexOf(v) === i
    );

    clients.push({
      id: `client-${i + 1}`,
      firstName,
      lastName,
      phone,
      email,
      birthday,
      joinedAt,
      visits,
      totalSpent,
      notes: CLIENT_NOTES[Math.floor(rand() * CLIENT_NOTES.length)],
      avatarBg: AVATAR_COLORS[Math.floor(rand() * AVATAR_COLORS.length)],
      initials: (firstName[0] + lastName[0]).toUpperCase(),
      favoriteServiceIds,
      tags,
      lastVisit,
    });
  }

  return clients;
}

export const CLIENTS: Client[] = generateClients();

// ============================================================================
// APPOINTMENTS (generate ~250)
// ============================================================================

function generateAppointments(): Appointment[] {
  const rand = seededRandom(123);
  const apts: Appointment[] = [];
  const now = new Date();
  now.setMinutes(0, 0, 0);

  // Generate for -30 days to +30 days
  for (let dayOffset = -30; dayOffset <= 30; dayOffset++) {
    const date = addDays(dayOffset);
    const dayOfWeek = date.getDay() === 0 ? 7 : date.getDay();

    // Skip Sundays mostly (fewer appointments)
    const dailyCount = dayOfWeek === 7 ? Math.floor(rand() * 3) : 3 + Math.floor(rand() * 6);

    for (let i = 0; i < dailyCount; i++) {
      // Random staff who works that day
      const availableStaff = STAFF.filter((s) => s.workDays.includes(dayOfWeek));
      if (availableStaff.length === 0) continue;
      const staff = availableStaff[Math.floor(rand() * availableStaff.length)];

      // Pick a service the staff performs
      const service = SERVICES.find((s) => staff.services.includes(s.id)) ||
        SERVICES[Math.floor(rand() * SERVICES.length)];

      // Random client
      const client = CLIENTS[Math.floor(rand() * CLIENTS.length)];

      // Random start hour (9-19)
      const hour = 9 + Math.floor(rand() * 10);
      const minute = Math.random() > 0.5 ? 0 : 30;
      const startsAt = new Date(date);
      startsAt.setHours(hour, minute, 0, 0);
      const endsAt = new Date(startsAt.getTime() + service.durationMin * 60000);

      // Status logic
      let status: AppointmentStatus;
      if (dayOffset < 0) {
        const r = rand();
        status = r < 0.85 ? "completed" : r < 0.93 ? "no_show" : "cancelled";
      } else if (dayOffset === 0) {
        // Today: some completed (earlier), some upcoming
        status = startsAt < now ? (rand() < 0.9 ? "completed" : "no_show") : "confirmed";
      } else {
        status = rand() < 0.92 ? "confirmed" : "pending";
      }

      const paid = status === "completed";
      const paymentMethod = paid
        ? (rand() < 0.5 ? "card" : rand() < 0.85 ? "cash" : "transfer") as "card" | "cash" | "transfer"
        : null;

      apts.push({
        id: `apt-${apts.length + 1}`,
        clientId: client.id,
        staffId: staff.id,
        serviceId: service.id,
        startsAt: startsAt.toISOString(),
        endsAt: endsAt.toISOString(),
        status,
        priceLei: service.priceLei,
        paid,
        paymentMethod,
        notes: rand() < 0.15 ? "Client prefera muzică relaxantă" : null,
      });
    }
  }

  return apts.sort((a, b) => a.startsAt.localeCompare(b.startsAt));
}

export const APPOINTMENTS: Appointment[] = generateAppointments();

// ============================================================================
// REVIEWS (30)
// ============================================================================

const REVIEW_TEXTS = [
  "Super mulțumită de servicii! Ana e o profesionistă adevărată, îmi place cum îmi rezolvă problemele de piele.",
  "Vin aici de 2 ani. Maria face cele mai frumoase unghii din București, fără exagerare!",
  "Am făcut balayage cu Cristina și e exact ce mi-am dorit. Recomand cu drag!",
  "Elena a făcut machiajul meu de mireasă. Am fost impecabilă toată ziua, nu s-a mișcat deloc.",
  "Salon foarte curat și profesionist. Prețuri corecte pentru calitate.",
  "Diana e blândă și rapidă la epilare. Simt că are mâna ușoară.",
  "Serviciile sunt de top, dar rezervările se ocupă rapid. Recomand programare din timp.",
  "Am recomandat prietenelor mele. Toată lumea a fost mulțumită.",
  "Atmosfera este relaxantă și primitoare. Mă simt ca acasă.",
  "5 stele pentru atenția la detalii. Nu grăbesc niciodată clientul.",
  "Cel mai bun tratament facial pe care l-am făcut vreodată!",
  "Cristina m-a salvat după o vopsire eșuată în alt salon. Genială!",
  "Manichiura ține 4 săptămâni fără să se ciocnească — record personal.",
  "Diana explică tot ce face. Foarte pedagogică.",
  "Nu mai merg în alt salon. Fidelă pentru totdeauna.",
];

function generateReviews(): Review[] {
  const rand = seededRandom(999);
  const reviews: Review[] = [];
  for (let i = 0; i < 30; i++) {
    const client = CLIENTS[Math.floor(rand() * CLIENTS.length)];
    const staff = rand() > 0.3 ? STAFF[Math.floor(rand() * STAFF.length)] : null;
    const service = rand() > 0.4 ? SERVICES[Math.floor(rand() * SERVICES.length)] : null;
    const daysAgo = Math.floor(rand() * 90);
    reviews.push({
      id: `review-${i + 1}`,
      clientId: client.id,
      staffId: staff?.id || null,
      serviceId: service?.id || null,
      rating: rand() < 0.7 ? 5 : rand() < 0.9 ? 4 : 3,
      text: REVIEW_TEXTS[Math.floor(rand() * REVIEW_TEXTS.length)],
      createdAt: addDays(-daysAgo).toISOString(),
    });
  }
  return reviews.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export const REVIEWS: Review[] = generateReviews();

// ============================================================================
// MARKETING CAMPAIGNS (3 active)
// ============================================================================

export const CAMPAIGNS: Campaign[] = [
  {
    id: "camp-birthday",
    name: "Cadou de aniversare",
    type: "birthday",
    status: "active",
    icon: "🎂",
    description: "Trimite automat un voucher de 15% clientelor în ziua nașterii lor",
    triggerCondition: "Cu 3 zile înainte de ziua de naștere",
    sentThisMonth: 12,
    conversionsThisMonth: 8,
    revenueGeneratedLei: 1750,
    messagePreview: "Bună Maria! 🎂 La mulți ani cu drag de la echipa Eli Beauty! Îți oferim -15% la orice serviciu în luna aniversării tale. Cod: BDAY15. Te așteptăm! ✨",
  },
  {
    id: "camp-winback",
    name: "Te-am pierdut, te vrem înapoi",
    type: "winback",
    status: "active",
    icon: "💌",
    description: "Recuperează cliente care n-au mai fost de 60+ zile cu ofertă personalizată",
    triggerCondition: "Ultima vizită acum peste 60 zile",
    sentThisMonth: 23,
    conversionsThisMonth: 9,
    revenueGeneratedLei: 2550,
    messagePreview: "Ne-a fost dor de tine, Cristina! Îți oferim -20% la orice serviciu preferat dacă revii în următoarele 2 săptămâni. Cod: MISS20 ✨",
  },
  {
    id: "camp-referral",
    name: "Adu o prietenă",
    type: "referral",
    status: "active",
    icon: "👯‍♀️",
    description: "Client existent primește -10% când aduce o prietenă nouă",
    triggerCondition: "Când client nou menționează cine i-a recomandat",
    sentThisMonth: 8,
    conversionsThisMonth: 5,
    revenueGeneratedLei: 1320,
    messagePreview: "Elena, mulțumim că ai adus-o pe Diana! Vei primi -10% la următoarea programare. Codul tău: THANKS10 💖",
  },
  {
    id: "camp-newservice",
    name: "Serviciu nou: Mesoterapie",
    type: "new_service",
    status: "paused",
    icon: "💉",
    description: "Anunță clientele existente despre serviciile nou introduse",
    triggerCondition: "Trimitere unică (nu automat)",
    sentThisMonth: 0,
    conversionsThisMonth: 0,
    revenueGeneratedLei: 0,
    messagePreview: "Ana, avem un serviciu nou! Mesoterapia facială este acum disponibilă cu ofertă de lansare -30% până pe 15 noiembrie. 💫",
  },
];

// ============================================================================
// KPI SNAPSHOTS (dashboard)
// ============================================================================

export function getDashboardKpis() {
  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1);
  const prevMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const prevMonthEnd = new Date(now.getFullYear(), now.getMonth(), 0);

  const thisMonth = APPOINTMENTS.filter(
    (a) => new Date(a.startsAt) >= monthStart && a.status === "completed"
  );
  const prevMonth = APPOINTMENTS.filter(
    (a) => new Date(a.startsAt) >= prevMonthStart &&
           new Date(a.startsAt) <= prevMonthEnd &&
           a.status === "completed"
  );

  const revenueThisMonth = thisMonth.reduce((sum, a) => sum + a.priceLei, 0);
  const revenuePrevMonth = prevMonth.reduce((sum, a) => sum + a.priceLei, 0) || 1;

  const uniqueClientsThisMonth = new Set(thisMonth.map((a) => a.clientId)).size;

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  const todayApts = APPOINTMENTS.filter(
    (a) => {
      const d = new Date(a.startsAt);
      return d >= today && d < tomorrow;
    }
  ).sort((a, b) => a.startsAt.localeCompare(b.startsAt));

  return {
    revenueThisMonth,
    revenueChange: ((revenueThisMonth - revenuePrevMonth) / revenuePrevMonth) * 100,
    appointmentsThisMonth: thisMonth.length,
    uniqueClientsThisMonth,
    avgTicket: thisMonth.length > 0 ? Math.round(revenueThisMonth / thisMonth.length) : 0,
    todayAppointments: todayApts,
    todayRevenue: todayApts
      .filter((a) => a.status === "completed" || a.status === "confirmed")
      .reduce((sum, a) => sum + a.priceLei, 0),
  };
}

// Revenue by day for last 30 days chart
export function getRevenueByDay(days = 30) {
  const result: { date: string; revenue: number; label: string }[] = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = addDays(-i);
    d.setHours(0, 0, 0, 0);
    const next = new Date(d);
    next.setDate(next.getDate() + 1);
    const dayRev = APPOINTMENTS.filter(
      (a) =>
        new Date(a.startsAt) >= d &&
        new Date(a.startsAt) < next &&
        a.status === "completed"
    ).reduce((sum, a) => sum + a.priceLei, 0);
    result.push({
      date: d.toISOString().slice(0, 10),
      revenue: dayRev,
      label: d.toLocaleDateString("ro-RO", { day: "2-digit", month: "short" }),
    });
  }
  return result;
}

// Service popularity for pie/bar chart
export function getServicePopularity() {
  return CATEGORIES.map((cat) => {
    const revenue = APPOINTMENTS.filter((a) => {
      if (a.status !== "completed") return false;
      const service = SERVICES.find((s) => s.id === a.serviceId);
      return service?.categoryId === cat.id;
    }).reduce((sum, a) => sum + a.priceLei, 0);
    const bookings = APPOINTMENTS.filter((a) => {
      const service = SERVICES.find((s) => s.id === a.serviceId);
      return service?.categoryId === cat.id;
    }).length;
    return {
      name: cat.name,
      icon: cat.icon,
      revenue,
      bookings,
    };
  }).sort((a, b) => b.revenue - a.revenue);
}

// Staff performance for reports
export function getStaffPerformance() {
  return STAFF.map((s) => {
    const staffApts = APPOINTMENTS.filter((a) => a.staffId === s.id && a.status === "completed");
    const revenue = staffApts.reduce((sum, a) => sum + a.priceLei, 0);
    const uniqueClients = new Set(staffApts.map((a) => a.clientId)).size;
    return {
      ...s,
      completedAppointments: staffApts.length,
      revenue,
      uniqueClients,
      avgTicket: staffApts.length > 0 ? Math.round(revenue / staffApts.length) : 0,
    };
  }).sort((a, b) => b.revenue - a.revenue);
}

// ============================================================================
// HELPERS
// ============================================================================

export function addDays(days: number): Date {
  const d = new Date();
  d.setDate(d.getDate() + days);
  return d;
}

export function formatLei(amount: number): string {
  return new Intl.NumberFormat("ro-RO", {
    maximumFractionDigits: 0,
  }).format(amount) + " lei";
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("ro-RO", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function formatDateShort(iso: string): string {
  return new Date(iso).toLocaleDateString("ro-RO", {
    day: "2-digit",
    month: "short",
  });
}

export function formatTime(iso: string): string {
  return new Date(iso).toLocaleTimeString("ro-RO", {
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function daysBetween(iso1: string, iso2: string = new Date().toISOString()): number {
  return Math.floor((new Date(iso2).getTime() - new Date(iso1).getTime()) / (1000 * 60 * 60 * 24));
}

export function getStaffById(id: string) {
  return STAFF.find((s) => s.id === id);
}

export function getServiceById(id: string) {
  return SERVICES.find((s) => s.id === id);
}

export function getClientById(id: string) {
  return CLIENTS.find((c) => c.id === id);
}

export function getCategoryById(id: string) {
  return CATEGORIES.find((c) => c.id === id);
}
