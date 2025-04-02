import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

export async function POST({ request }) {
    try {
        const body = await request.json();

        const { data, error } = await supabase
            .from('survey_responses')
            .insert([body]);

        if (error) {
            console.error('Supabase INSERT Error:', JSON.stringify(error, null, 2));
            return json({ success: false, error: error.message || 'Unbekannter Fehler' }, { status: 500 });
        }

        console.log('Supabase INSERT Success:', data);
        return json({ success: true, data });

    } catch (err) {
        console.error('Unerwarteter Fehler:', err);
        return json({ success: false, error: 'Server-Absturz', details: String(err) }, { status: 500 });
    }
}
