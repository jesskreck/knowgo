import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://uqpnpkjnzqcvlraohkod.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseServiceKey = import.meta.env.VITE_SUPABASE_SERVICE_KEY;

export const supabase = createClient(supabaseUrl, supabaseServiceKey);
