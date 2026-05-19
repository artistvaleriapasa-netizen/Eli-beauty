"use server";

import { z } from "zod";
import { createClient, createAdminClient } from "@/lib/supabase/server";

const signupSchema = z.object({
  salonName: z.string().min(2, "Numele salonului e prea scurt"),
  slug: z
    .string()
    .min(3, "URL-ul trebuie să aibă minim 3 caractere")
    .max(50)
    .regex(/^[a-z0-9-]+$/, "Doar litere mici, cifre și liniuțe"),
  email: z.string().email("Email invalid"),
  password: z.string().min(8, "Parola trebuie să aibă minim 8 caractere"),
});

export async function signup(formData: FormData) {
  const parsed = signupSchema.safeParse({
    salonName: formData.get("salonName"),
    slug: formData.get("slug"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? "Date invalide" };
  }

  const { salonName, slug, email, password } = parsed.data;

  // 1. Verifică dacă slug-ul e disponibil (folosim admin pentru bypass RLS)
  const admin = createAdminClient();
  const { data: existing } = await admin
    .from("salons")
    .select("id")
    .eq("slug", slug)
    .maybeSingle();

  if (existing) {
    return { error: "URL-ul ales e deja folosit. Alege altul." };
  }

  // 2. Creează user-ul (folosim client normal cu cookies)
  const supabase = await createClient();
  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { display_name: salonName } },
  });

  if (authError || !authData.user) {
    return { error: authError?.message ?? "Eroare la crearea contului" };
  }

  // 3. Creează salonul (admin, bypass RLS)
  const { data: salon, error: salonError } = await admin
    .from("salons")
    .insert({
      slug,
      name: salonName,
      email,
      subscription_status: "trial",
      subscription_tier: "starter",
      subscription_ends_at: new Date(
        Date.now() + 14 * 24 * 60 * 60 * 1000
      ).toISOString(), // +14 zile
    })
    .select()
    .single();

  if (salonError || !salon) {
    // Rollback: șterge user-ul creat
    await admin.auth.admin.deleteUser(authData.user.id);
    return {
      error:
        "Eroare la crearea salonului. Te rugăm să încerci din nou sau să ne contactezi.",
    };
  }

  // 4. Adaugă user-ul ca owner al salonului
  const { error: memberError } = await admin.from("salon_members").insert({
    salon_id: salon.id,
    user_id: authData.user.id,
    role: "owner",
    accepted_at: new Date().toISOString(),
  });

  if (memberError) {
    // Rollback total
    await admin.from("salons").delete().eq("id", salon.id);
    await admin.auth.admin.deleteUser(authData.user.id);
    return { error: "Eroare la asocierea contului cu salonul" };
  }

  return { success: true, salon };
}
