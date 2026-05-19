import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import {
  LayoutDashboard,
  Calendar,
  Scissors,
  Users,
  Settings,
  LogOut,
} from "lucide-react";
import { logout } from "@/app/(auth)/login/actions";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/programari", label: "Programări", icon: Calendar },
  { href: "/servicii", label: "Servicii", icon: Scissors },
  { href: "/clienti", label: "Clienți", icon: Users },
  { href: "/setari", label: "Setări", icon: Settings },
] as const;

export default async function SalonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Ia salonul curent (primul în care e user-ul membru; în viitor poate fi un selector)
  const { data: membership } = await supabase
    .from("salon_members")
    .select("salon_id, role, salons(id, name, slug)")
    .eq("user_id", user.id)
    .limit(1)
    .maybeSingle();

  if (!membership) {
    redirect("/signup");
  }

  const salon = membership.salons as unknown as {
    id: string;
    name: string;
    slug: string;
  };

  return (
    <div className="min-h-screen flex bg-muted/30">
      {/* Sidebar */}
      <aside className="w-64 bg-background border-r border-border flex flex-col">
        <div className="p-6 border-b border-border">
          <Link href="/dashboard" className="flex items-center gap-2 mb-4">
            <span className="font-[family-name:var(--font-playfair)] text-xl font-bold text-rose-brand">
              Eli
            </span>
            <span className="text-xs tracking-wider text-muted-foreground uppercase">
              Beauty OS
            </span>
          </Link>
          <div>
            <p className="text-sm font-medium truncate">{salon.name}</p>
            <p className="text-xs text-muted-foreground">@{salon.slug}</p>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors"
            >
              <item.icon className="h-4 w-4 text-muted-foreground" />
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="p-3 border-t border-border">
          <p className="text-xs text-muted-foreground px-3 mb-1">{user.email}</p>
          <form action={async () => {
            "use server";
            await logout();
            redirect("/login");
          }}>
            <button
              type="submit"
              className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm hover:bg-accent transition-colors text-left"
            >
              <LogOut className="h-4 w-4 text-muted-foreground" />
              Deconectare
            </button>
          </form>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 overflow-auto">
        <div className="container max-w-6xl mx-auto p-8">{children}</div>
      </main>
    </div>
  );
}
