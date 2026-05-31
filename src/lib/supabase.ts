import { createClient } from '@supabase/supabase-js';

const supabaseUrl = (import.meta.env.VITE_SUPABASE_URL as string) ?? 'http://localhost:54321';
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY as string) ?? 'public-anon-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type HotOffer = {
  id: string;
  title: string;
  price: number;
  location: string;
  condition: string;
  images: string[];
  copart_url: string | null;
  active: boolean;
  carfax_verified: boolean;
  created_at: string;
};
