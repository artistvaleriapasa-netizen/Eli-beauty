"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { signup } from "./actions";

export function SignupForm() {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  function onSubmit(formData: FormData) {
    setError(null);
    startTransition(async () => {
      const result = await signup(formData);
      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/dashboard");
        router.refresh();
      }
    });
  }

  return (
    <form action={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="salonName">Numele salonului</Label>
        <Input
          id="salonName"
          name="salonName"
          required
          placeholder="ex: Beauty by Maria"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="slug">URL public</Label>
        <div className="flex items-center text-sm">
          <span className="text-muted-foreground">eli-beauty.app/</span>
          <Input
            id="slug"
            name="slug"
            required
            placeholder="beauty-by-maria"
            pattern="^[a-z0-9\-]+$"
            className="ml-1"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          Doar litere mici, cifre și liniuțe. Min. 3 caractere.
        </p>
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email proprietar</Label>
        <Input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="tu@salonul-tau.md"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Parolă</Label>
        <Input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          required
          minLength={8}
        />
        <p className="text-xs text-muted-foreground">Min. 8 caractere.</p>
      </div>

      {error && (
        <p className="text-sm text-destructive bg-destructive/10 border border-destructive/20 rounded-md px-3 py-2">
          {error}
        </p>
      )}

      <Button type="submit" className="w-full" disabled={isPending}>
        {isPending ? "Se creează contul..." : "Începe proba gratuit"}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        Prin înregistrare accepți{" "}
        <a href="/termeni" className="underline">
          Termenii
        </a>{" "}
        și{" "}
        <a href="/confidentialitate" className="underline">
          Politica GDPR
        </a>
        .
      </p>
    </form>
  );
}
