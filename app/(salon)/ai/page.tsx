"use client";

import { useState, useRef, useEffect } from "react";
import {
  Bot,
  Send,
  Sparkles,
  TrendingUp,
  Users,
  Gift,
  Calendar,
  DollarSign,
  Zap,
  User,
} from "lucide-react";
import { formatLei, CLIENTS, APPOINTMENTS } from "@/lib/demo-data";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  chips?: { label: string; icon?: string }[]; // Suggested follow-ups
  card?: {
    title: string;
    items: { label: string; value: string; color?: string }[];
    action?: string;
  };
}

const SUGGESTED_QUESTIONS = [
  { icon: "💰", label: "Care sunt cele mai profitabile servicii?" },
  { icon: "👥", label: "Ce cliente ar trebui să contactăm?" },
  { icon: "📅", label: "Când e cea mai aglomerată zi?" },
  { icon: "🎯", label: "Cum să cresc veniturile luna viitoare?" },
  { icon: "⚠️", label: "Ce cliente pierd?" },
  { icon: "🎂", label: "Cine are aniversarea săptămâna asta?" },
];

// Pre-canned intelligent responses
const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "Bună, Elena! 👋 Sunt asistentul tău AI. Analizez zilnic datele salonului și îți propun acțiuni concrete.\n\nAm identificat câteva insights importante — vrei să discutăm?",
    chips: SUGGESTED_QUESTIONS.slice(0, 3),
  },
];

// Response templates keyed by user input keywords
const AI_RESPONSES: Record<string, () => Message> = {
  profitabile: () => ({
    id: `ai-${Date.now()}`,
    role: "assistant",
    content:
      "Analiza celor mai profitabile servicii luna asta:\n\n1. **Balayage** — 550 lei/programare · 12 rezervări = 6.600 lei\n2. **Vopsit rădăcini** — 250 lei · 33 rezervări = 8.250 lei 🏆\n3. **Mesoterapie** — 450 lei · 9 rezervări = 4.050 lei\n\n💡 **Observație**: Deși mesoterapia are cel mai mare preț per programare, Vopsit rădăcini generează cel mai mult venit total. Ar trebui să menținem accent pe reveniri regulate (la 6-8 săptămâni).",
    card: {
      title: "Recomandare acțiune",
      items: [
        { label: "Serviciu de promovat", value: "Mesoterapie" },
        { label: "Motiv", value: "Preț mare, cerere mică — potențial neexploatat" },
        { label: "Impact prognozat", value: "+5.500 lei/lună", color: "text-emerald-700" },
      ],
      action: "Creează campanie -30% mesoterapie",
    },
    chips: [
      { label: "Creează campanie", icon: "🚀" },
      { label: "Vezi și alte servicii" },
    ],
  }),
  contact: () => ({
    id: `ai-${Date.now()}`,
    role: "assistant",
    content:
      "Am identificat 8 cliente care merită contact imediat:\n\n**🎂 3 cliente** cu aniversarea în 7 zile — trimite voucher automat.\n**💌 4 cliente VIP** care n-au mai fost de peste 60 zile — Cristina Rusu (era cliente Cristinei), Ana Munteanu, Elena Bejan, Diana Georgescu.\n**⭐ 1 cliente nouă** care a lăsat review de 5 stele — cere-i să te recomande.\n\nPot să pregătesc mesajele personalizate pentru fiecare?",
    card: {
      title: "Impact estimat",
      items: [
        { label: "Cliente contactate", value: "8" },
        { label: "Rate răspuns estimată", value: "40-60%" },
        { label: "Venit potențial", value: formatLei(3200), color: "text-emerald-700" },
      ],
      action: "Trimite toate mesajele automat",
    },
    chips: [
      { label: "Da, trimite toate", icon: "✨" },
      { label: "Doar VIP-urile" },
      { label: "Arată-mi mesajele întâi" },
    ],
  }),
  aglomer: () => ({
    id: `ai-${Date.now()}`,
    role: "assistant",
    content:
      "Analiza săptămânii tale:\n\n**Cele mai aglomerate zile**:\n📅 **Vineri** — 12 programări/zi în medie · 82% grad de ocupare\n📅 **Sâmbătă** — 10 programări/zi · 75% grad de ocupare\n\n**Cele mai libere**:\n📅 **Marți** dimineața — doar 30% ocupare\n\n💡 **Sugestie**: Introdu o promoție 'Marți dimineața -20%' pentru a redistribui cererea. Alternativ, poți da liber în ziua respectivă și să economisești pe utilități.",
    chips: [
      { label: "Creează promoție Marți -20%", icon: "🎯" },
      { label: "Ce ore libere avem?" },
    ],
  }),
  cresc: () => ({
    id: `ai-${Date.now()}`,
    role: "assistant",
    content:
      "Am pregătit un plan concret pentru creștere venituri luna viitoare:\n\n**1. Recuperare cliente pierdute** — 15 cliente inactive de peste 90 zile.\n→ Potențial: **+3.300 lei**\n\n**2. Upsell design unghii** — Adaugă design la manichiură simplă (20 lei extra).\n→ 60 clientele lună × 20 lei = **+1.200 lei/lună**\n\n**3. Loyalty program** — După 5 vizite, a 6-a cu -50% la orice serviciu <200 lei.\n→ Crește retenția cu 25% = **+2.800 lei/lună**\n\n**4. Referral automat** — Client existent primește -10% pentru fiecare prietenă adusă.\n→ 3-5 clienți noi/lună = **+1.600 lei**\n\n**Total impact prognozat: +8.900 lei luna viitoare** (~34% creștere)",
    card: {
      title: "Setup automat",
      items: [
        { label: "Cere confirmarea ta", value: "4 acțiuni" },
        { label: "Timp de setup", value: "5 minute" },
        { label: "Impact prognozat", value: "+8.900 lei", color: "text-emerald-700" },
      ],
      action: "Activează toate cele 4 acțiuni",
    },
    chips: [
      { label: "Activează toate", icon: "🚀" },
      { label: "Doar loyalty program" },
    ],
  }),
  pierd: () => ({
    id: `ai-${Date.now()}`,
    role: "assistant",
    content:
      "⚠️ **15 cliente cu risc de pierdere** identificate:\n\nAcestea sunt cliente care în trecut veneau regulat (la 4-6 săptămâni) dar nu au mai fost de peste 90 zile.\n\n**Top 5 din listă**:\n1. Cristina Rusu — VIP · nu a mai fost de 127 zile · a cheltuit total 6.800 lei\n2. Ana Iancu — Regular · 105 zile · 3.000 lei\n3. Elena Marin — VIP · 98 zile · 5.800 lei\n4. Maria Popescu — Regular · 94 zile · 2.300 lei\n5. Diana Bunea — VIP · 91 zile · 4.500 lei\n\n**Cauze probabile** (pe baza istoricului):\n• Vopsit rădăcini: ciclu tipic 6-8 săptămâni — au trecut la un salon mai apropiat?\n• Manichiură cu gel: 3-4 săptămâni — poate face-o acasă acum?\n\n💡 Vrei să lansez o campanie 'Ne-a fost dor' cu -20% doar pentru aceste 15?",
    chips: [
      { label: "Da, lansează campanie", icon: "💌" },
      { label: "Vezi lista completă" },
    ],
  }),
  aniversar: () => ({
    id: `ai-${Date.now()}`,
    role: "assistant",
    content:
      "🎂 **3 cliente cu aniversarea în 7 zile**:\n\n1. **Maria Popescu** — 24 anul acesta · în 2 zile · cliente VIP din 2022\n2. **Elena Ivanov** — 32 anul acesta · în 5 zile · Regular, 12 vizite\n3. **Ana-Maria Cojocaru** — 28 anul acesta · în 6 zile · Nouă (doar 1 vizită)\n\nToate cele 3 vor primi automat un voucher de -15% valabil în luna aniversării. Deja e configurat în campania 'Cadou de aniversare'.\n\nPentru Ana-Maria (client nouă) — te recomand să pregătești personal un mesaj mai atent, pentru că e o oportunitate de fidelizare timpurie.",
    chips: [
      { label: "Scrie mesaj special pentru Ana-Maria" },
      { label: "Vezi voucherele generate" },
    ],
  }),
};

function matchResponse(text: string): Message {
  const lower = text.toLowerCase();
  for (const [key, fn] of Object.entries(AI_RESPONSES)) {
    if (lower.includes(key)) return fn();
  }
  // Fallback
  return {
    id: `ai-${Date.now()}`,
    role: "assistant",
    content:
      "Interesantă întrebare! Momentan analizez datele tale pentru un răspuns detaliat. Iată câteva insights rapide bazate pe activitatea salonului:\n\n• Ai crescut veniturile cu ~12% față de luna trecută 📈\n• Balayage e serviciul cu cel mai mare potențial neexploatat\n• Marti e cea mai liberă zi — oportunitate pentru promoții\n\nÎntreabă-mă ceva mai specific — de exemplu despre servicii, cliente sau strategii de creștere.",
    chips: SUGGESTED_QUESTIONS.slice(0, 3),
  };
}

export default function AIPage() {
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: "user",
      content: text,
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const response = matchResponse(text);
      setMessages((m) => [...m, response]);
      setIsTyping(false);
    }, 1200);
  };

  return (
    <div className="h-[calc(100vh-4rem)] lg:h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <div className="mb-6 flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-600 via-rose-600 to-amber-500 flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="font-serif text-3xl font-bold text-gray-900 flex items-center gap-2">
                Assistant AI
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-gradient-to-r from-amber-400 to-amber-600 text-white font-bold">
                  PRO
                </span>
              </h1>
              <p className="text-sm text-gray-500">Powered by Claude · Analizează datele salonului în timp real</p>
            </div>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          ONLINE
        </div>
      </div>

      {/* Chat area */}
      <div className="flex-1 bg-white rounded-2xl border border-rose-100 flex flex-col overflow-hidden shadow-sm">
        <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6">
          {messages.map((msg) => (
            <MessageBubble
              key={msg.id}
              message={msg}
              onChipClick={(chipLabel) => handleSend(chipLabel)}
            />
          ))}

          {isTyping && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 via-rose-600 to-amber-500 flex items-center justify-center shrink-0">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-100 rounded-2xl rounded-tl-none px-4 py-3">
                <div className="flex gap-1">
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Input */}
        <div className="p-4 border-t border-rose-100 bg-rose-50/30">
          {messages.length <= 1 && (
            <div className="mb-3 flex gap-2 flex-wrap">
              {SUGGESTED_QUESTIONS.map((q, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(q.label)}
                  className="text-xs px-3 py-1.5 rounded-full bg-white border border-rose-200 hover:border-rose-400 hover:bg-rose-50 text-gray-700 transition-colors"
                >
                  <span className="mr-1">{q.icon}</span>
                  {q.label}
                </button>
              ))}
            </div>
          )}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend(input);
            }}
            className="flex gap-2"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Întreabă orice despre salonul tău..."
              className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:border-rose-400 focus:outline-none focus:ring-2 focus:ring-rose-100 text-sm"
            />
            <button
              type="submit"
              disabled={!input.trim() || isTyping}
              className="px-4 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-rose-600 to-amber-500 text-white font-medium disabled:opacity-50 hover:shadow-md transition-shadow"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

function MessageBubble({
  message,
  onChipClick,
}: {
  message: Message;
  onChipClick: (label: string) => void;
}) {
  const isUser = message.role === "user";

  if (isUser) {
    return (
      <div className="flex items-start gap-3 justify-end">
        <div className="bg-gradient-to-br from-rose-600 to-rose-700 text-white rounded-2xl rounded-tr-none px-4 py-3 max-w-[85%] shadow-sm">
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
        </div>
        <div className="w-8 h-8 rounded-full bg-rose-100 text-rose-800 flex items-center justify-center font-bold text-xs shrink-0">
          E
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3">
      <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-600 via-rose-600 to-amber-500 flex items-center justify-center shrink-0">
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="min-w-0 flex-1 space-y-3">
        <div className="bg-gray-50 border border-gray-100 rounded-2xl rounded-tl-none px-4 py-3 max-w-[95%]">
          <div className="text-sm text-gray-900 whitespace-pre-wrap leading-relaxed">
            {formatMessage(message.content)}
          </div>
        </div>

        {message.card && (
          <div className="bg-gradient-to-br from-amber-50 to-rose-50 border border-amber-200 rounded-2xl p-4 max-w-[95%]">
            <div className="flex items-center gap-2 mb-3">
              <Zap className="w-4 h-4 text-amber-700" />
              <h4 className="font-semibold text-sm text-amber-900">
                {message.card.title}
              </h4>
            </div>
            <div className="space-y-2">
              {message.card.items.map((item, i) => (
                <div key={i} className="flex justify-between text-sm">
                  <span className="text-gray-600">{item.label}</span>
                  <span className={`font-semibold ${item.color || "text-gray-900"}`}>
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
            {message.card.action && (
              <button className="w-full mt-4 px-4 py-2 rounded-lg bg-gradient-to-r from-amber-600 to-rose-600 text-white text-sm font-semibold hover:shadow-md transition-shadow">
                ✨ {message.card.action}
              </button>
            )}
          </div>
        )}

        {message.chips && message.chips.length > 0 && (
          <div className="flex flex-wrap gap-2 max-w-[95%]">
            {message.chips.map((chip, i) => (
              <button
                key={i}
                onClick={() => onChipClick(chip.label)}
                className="text-xs px-3 py-1.5 rounded-full bg-white border border-rose-200 hover:border-rose-400 hover:bg-rose-50 text-gray-700 transition-colors"
              >
                {chip.icon && <span className="mr-1">{chip.icon}</span>}
                {chip.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Simple markdown-like formatter for bold, bullets
function formatMessage(text: string) {
  const parts = text.split("\n");
  return parts.map((line, i) => {
    // Bold
    const boldParts = line.split(/(\*\*[^*]+\*\*)/);
    const rendered = boldParts.map((p, j) => {
      if (p.startsWith("**") && p.endsWith("**")) {
        return <strong key={j}>{p.slice(2, -2)}</strong>;
      }
      return <span key={j}>{p}</span>;
    });

    return (
      <div key={i} className={i < parts.length - 1 ? "mb-1" : ""}>
        {line === "" ? <br /> : rendered}
      </div>
    );
  });
}
