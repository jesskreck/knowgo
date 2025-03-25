import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

export async function GET() {
    const { data, error } = await supabase
        .from('survey_responses')
        .select('option, intensity');

    if (error) {
        return json({ success: false, error: error.message }, { status: 500 });
    }

    return json({ success: true, results: data });
}
