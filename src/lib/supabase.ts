import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

if (!isSupabaseConfigured) {
  console.warn("Missing Supabase URL or Anon Key. Copy .env.example to .env and fill it in.");
}

// createClient throws on an empty URL, which would leave the whole app on a white
// screen. Without a .env it gets a local address that nothing answers on instead,
// so the pages render and only the analysis fails (see lib/gemini.ts).
export const supabase = createClient(
  supabaseUrl || "http://127.0.0.1:54321",
  supabaseAnonKey || "not-configured"
);
