import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

export async function POST({ request }) {
	try {
		const body = await request.json();
		const { rating } = body;

		if (typeof rating !== 'number' || rating < 0 || rating > 10) {
			return json({ success: false, error: 'Ungültige Bewertung' }, { status: 400 });
		}

		const { error } = await supabase
			.from('rating_submissions')
			.insert([{ rating }]);

		if (error) {
			return json({ success: false, error: error.message }, { status: 500 });
		}

		return json({ success: true });
	} catch (err) {
		console.error('Fehler beim Speichern des Ratings:', err);
		return json({ success: false, error: 'Serverfehler' }, { status: 500 });
	}
}
