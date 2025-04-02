import { createClient } from '@supabase/supabase-js';
import { SUPABASE_ANON_KEY } from '$env/static/private';

const supabaseUrl = "https://uqpnpkjnzqcvlraohkod.supabase.co";

export const supabase = createClient(supabaseUrl, SUPABASE_ANON_KEY);