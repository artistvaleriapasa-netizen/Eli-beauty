import Link from "next/link";

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Stânga: form */}
      <div className="flex flex-col p-8">
        <Link href="/" className="flex items-center gap-2 mb-12">
          <span className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-rose-brand">
            Eli
          </span>
          <span className="text-sm tracking-wider text-muted-foreground uppercase">
            Beauty OS
          </span>
        </Link>
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full max-w-sm">{children}</div>
        </div>
      </div>

      {/* Dreapta: visual */}
      <div className="hidden lg:block relative bg-gradient-to-br from-rose-brand via-rose-brand-dark to-gold-brand-dark">
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white p-12 text-center">
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl font-bold mb-4 max-w-md">
            Salonul tău merită un sistem ca el
          </h2>
          <p className="text-rose-brand-light max-w-md">
            Aplicația completă, construită special pentru saloane din Moldova și
            România.
          </p>
        </div>
      </div>
    </div>
  );
}
