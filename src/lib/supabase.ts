import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY!;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Supabase URL and API Key are missing. Please provide them in your .env.local file.");
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');

// Temporary Test to check if Everything Works
(async () => {
  try {
    const { data, error } = await supabase.from('users').select('*');
    console.log("Supabase Test - Data:", data, "Error:", error);
  } catch (err) {
    console.error("Supabase Test - Exception:", err);
  }
})();

