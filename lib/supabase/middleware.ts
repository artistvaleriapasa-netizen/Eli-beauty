import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import type { Database } from "@/types/database";

/**
 * Helper pentru middleware Next.js — refresh-uiește sesiunea Supabase
 * la fiecare request și protejează rutele salon dashboard.
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Important: refreshează sesiunea
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;

  // Rute protejate salon (necesită auth + membership)
  const isSalonRoute =
    pathname.startsWith("/dashboard") ||
    pathname.startsWith("/programari") ||
    pathname.startsWith("/servicii") ||
    pathname.startsWith("/clienti") ||
    pathname.startsWith("/setari");

  const isAuthRoute =
    pathname.startsWith("/login") || pathname.startsWith("/signup");

  // Neautentificat încearcă rutele salon → redirect la login
  if (!user && isSalonRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/login";
    url.searchParams.set("redirect", pathname);
    return NextResponse.redirect(url);
  }

  // Autentificat încearcă login/signup → redirect la dashboard
  if (user && isAuthRoute) {
    const url = request.nextUrl.clone();
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
