import { createClient } from '@supabase/supabase-js';

export type Database = {
  public: {
    Tables: {
      hot_offers: {
        Row: {
          id: string;
          title: string;
          price: number;
          location: string;
          condition: string;
          images: string[] | null;
          copart_url: string | null;
          active: boolean | null;
          carfax_verified: boolean | null;
          description: string | null;
          year: number | null;
          mileage: number | null;
          vin: string | null;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          title: string;
          price: number;
          location: string;
          condition: string;
          images?: string[] | null;
          copart_url?: string | null;
          active?: boolean | null;
          carfax_verified?: boolean | null;
          description?: string | null;
          year?: number | null;
          mileage?: number | null;
          vin?: string | null;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          title?: string;
          price?: number;
          location?: string;
          condition?: string;
          images?: string[] | null;
          copart_url?: string | null;
          active?: boolean | null;
          carfax_verified?: boolean | null;
          description?: string | null;
          year?: number | null;
          mileage?: number | null;
          vin?: string | null;
          created_at?: string | null;
        };
        Relationships: [];
      };
      contact_inquiries: {
        Row: {
          id: string;
          name: string;
          email: string | null;
          phone: string | null;
          car: string | null;
          budget: string | null;
          message: string;
          created_at: string | null;
        };
        Insert: {
          id?: string;
          name: string;
          email?: string | null;
          phone?: string | null;
          car?: string | null;
          budget?: string | null;
          message: string;
          created_at?: string | null;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string | null;
          phone?: string | null;
          car?: string | null;
          budget?: string | null;
          message?: string;
          created_at?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'http://localhost:54321';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'public-anon-key';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export type HotOffer = Database['public']['Tables']['hot_offers']['Row'];
export type ContactInquiry = Database['public']['Tables']['contact_inquiries']['Row'];
