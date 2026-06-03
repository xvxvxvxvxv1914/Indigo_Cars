import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? 'http://localhost:54321';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? 'public-anon-key';

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
