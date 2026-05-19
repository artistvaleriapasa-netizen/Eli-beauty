/**
 * Database types placeholder.
 *
 * IMPORTANT: Acest fișier va fi regenerat automat după ce rulezi migration-ul
 * pe Supabase și execuți: `pnpm db:types`
 *
 * Tipurile de mai jos sunt minimal-stub-uri pentru ca proiectul să compileze
 * imediat după git clone. Înlocuiește cu types reale după primul `db:types`.
 */

export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      salons: {
        Row: {
          id: string;
          slug: string;
          name: string;
          description: string | null;
          logo_url: string | null;
          cover_url: string | null;
          phone: string | null;
          email: string | null;
          address: string | null;
          city: string | null;
          country: string;
          timezone: string;
          currency: string;
          subscription_status: "trial" | "active" | "past_due" | "canceled";
          subscription_tier: "starter" | "pro" | "enterprise";
          subscription_ends_at: string | null;
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["salons"]["Row"]> & {
          slug: string;
          name: string;
        };
        Update: Partial<Database["public"]["Tables"]["salons"]["Row"]>;
      };
      salon_members: {
        Row: {
          id: string;
          salon_id: string;
          user_id: string;
          role: "owner" | "manager" | "staff";
          invited_at: string;
          accepted_at: string | null;
          created_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["salon_members"]["Row"]> & {
          salon_id: string;
          user_id: string;
        };
        Update: Partial<Database["public"]["Tables"]["salon_members"]["Row"]>;
      };
      services: {
        Row: {
          id: string;
          salon_id: string;
          name: string;
          description: string | null;
          category: string | null;
          duration_minutes: number;
          price_cents: number;
          currency: string;
          photo_url: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["services"]["Row"]> & {
          salon_id: string;
          name: string;
          duration_minutes: number;
          price_cents: number;
        };
        Update: Partial<Database["public"]["Tables"]["services"]["Row"]>;
      };
      clients: {
        Row: {
          id: string;
          salon_id: string;
          user_id: string | null;
          name: string;
          phone: string | null;
          email: string | null;
          birthday: string | null;
          notes: string | null;
          total_visits: number;
          last_visit_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["clients"]["Row"]> & {
          salon_id: string;
          name: string;
        };
        Update: Partial<Database["public"]["Tables"]["clients"]["Row"]>;
      };
      staff: {
        Row: {
          id: string;
          salon_id: string;
          user_id: string | null;
          name: string;
          role_title: string | null;
          photo_url: string | null;
          phone: string | null;
          email: string | null;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<Database["public"]["Tables"]["staff"]["Row"]> & {
          salon_id: string;
          name: string;
        };
        Update: Partial<Database["public"]["Tables"]["staff"]["Row"]>;
      };
      appointments: {
        Row: {
          id: string;
          salon_id: string;
          client_id: string;
          staff_id: string | null;
          service_id: string;
          starts_at: string;
          ends_at: string;
          status:
            | "pending"
            | "confirmed"
            | "completed"
            | "cancelled"
            | "no_show";
          notes: string | null;
          price_cents: number;
          currency: string;
          cancellation_reason: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Partial<
          Database["public"]["Tables"]["appointments"]["Row"]
        > & {
          salon_id: string;
          client_id: string;
          service_id: string;
          starts_at: string;
          ends_at: string;
          price_cents: number;
        };
        Update: Partial<Database["public"]["Tables"]["appointments"]["Row"]>;
      };
    };
    Views: Record<string, never>;
    Functions: {
      is_salon_member: {
        Args: { p_salon_id: string };
        Returns: boolean;
      };
      has_salon_role: {
        Args: { p_salon_id: string; p_roles: string[] };
        Returns: boolean;
      };
    };
    Enums: {
      salon_role: "owner" | "manager" | "staff";
      subscription_status: "trial" | "active" | "past_due" | "canceled";
      subscription_tier: "starter" | "pro" | "enterprise";
      appointment_status:
        | "pending"
        | "confirmed"
        | "completed"
        | "cancelled"
        | "no_show";
    };
  };
}
