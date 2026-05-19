import Link from "next/link";
import { SignupForm } from "./signup-form";

export default function SignupPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold">
          Înregistrează salonul tău
        </h1>
        <p className="text-muted-foreground mt-2">
          Probă gratuită 14 zile, fără card bancar
        </p>
      </div>

      <SignupForm />

      <p className="text-sm text-center text-muted-foreground">
        Ai deja cont?{" "}
        <Link href="/login" className="text-rose-brand hover:underline font-medium">
          Autentifică-te
        </Link>
      </p>
    </div>
  );
}
