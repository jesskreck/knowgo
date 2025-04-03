import { json } from '@sveltejs/kit';
import { supabase } from '$lib/supabase';

export async function POST({ request }) {
	try {
		const body = await request.json();
		const { email } = body;

		if (!email || typeof email !== 'string') {
			return json({ success: false, error: 'Ungültige E-Mail-Adresse' }, { status: 400 });
		}

		// Hier wird die E-Mail in die Tabelle "email_submissions" geschrieben.
		const { data, error } = await supabase
			.from('email_submissions')
			.insert([{ email }]);

		if (error) {
			return json({ success: false, error: error.message || 'Unbekannter Fehler' }, { status: 500 });
		}

		return json({ success: true, data });
	} catch (err) {
		console.error('Fehler beim Speichern der E-Mail:', err);
		return json({ success: false, error: 'Serverfehler' }, { status: 500 });
	}
}
