import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database";

/**
 * Supabase client pentru Server Components, Server Actions și Route Handlers.
 * Citește/scrie cookies prin Next.js headers API.
 */
export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // The `setAll` method was called from a Server Component.
            // Poate fi ignorat dacă există middleware care refresh-uiește sesiunile.
          }
        },
      },
    }
  );
}

/**
 * Client admin folosind service_role key.
 * !!! ATENȚIE: NU expune niciodată la client. Folosit doar în server pentru
 * operațiuni admin (ex: invitări de utilizatori, migrations, etc.)
 */
export function createAdminClient() {
  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      cookies: {
        getAll() {
          return [];
        },
        setAll() {
          // no-op pentru admin client
        },
      },
    }
  );
}
