import { createClient } from '@supabase/supabase-js';
import { SUPABASE_SERVICE_KEY } from '$env/static/private';

const supabaseUrl = "https://uqpnpkjnzqcvlraohkod.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const supabaseServiceKey = SUPABASE_SERVICE_KEY;



export const supabase = createClient(supabaseUrl, supabaseServiceKey);
