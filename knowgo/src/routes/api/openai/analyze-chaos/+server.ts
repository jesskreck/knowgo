import { json } from '@sveltejs/kit';
import { analyzeChaos } from '../../../../lib/openai-common';

export async function POST({ request }) {
  try {
    const body = await request.json();
    const { taskDescription, audioTranscript } = body;
    
    if (!taskDescription || !audioTranscript) {
      return json({ error: 'Aufgabenbeschreibung und Transkript sind erforderlich' }, { status: 400 });
    }
    
    const chaosCheck = await analyzeChaos(taskDescription, audioTranscript);
    return json({ result: chaosCheck });
  } catch (error) {
    console.error('Fehler bei der Chaos-Analyse:', error);
    return json({ 
      error: error instanceof Error ? error.message : 'Ein unbekannter Fehler ist aufgetreten' 
    }, { status: 500 });
  }
}