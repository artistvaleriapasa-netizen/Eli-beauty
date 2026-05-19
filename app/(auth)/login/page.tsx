import Link from "next/link";
import { LoginForm } from "./login-form";

export const dynamic = "force-dynamic";

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold">
          Bine ai revenit
        </h1>
        <p className="text-muted-foreground mt-2">
          Autentifică-te în contul tău de salon
        </p>
      </div>

      <LoginForm />

      <p className="text-sm text-center text-muted-foreground">
        Nu ai cont?{" "}
        <Link href="/signup" className="text-rose-brand hover:underline font-medium">
          Înregistrează salonul tău
        </Link>
      </p>
    </div>
  );
}
