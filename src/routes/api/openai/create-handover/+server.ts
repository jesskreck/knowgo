import { json } from '@sveltejs/kit';
import { createHandoverDocument } from '../../../../lib/openai-common';

export async function POST({ request }) {
  try {
    const body = await request.json();
    const { taskDescription, audioTranscript, followUpQuestions, questionAnswers } = body;
    
    if (!taskDescription || !audioTranscript || !followUpQuestions || !questionAnswers) {
      return json({ error: 'Alle erforderlichen Felder müssen angegeben werden' }, { status: 400 });
    }
    
    const document = await createHandoverDocument(taskDescription, audioTranscript, followUpQuestions, questionAnswers);
    return json({ result: document });
  } catch (error) {
    console.error('Fehler beim Erstellen des Übergabedokuments:', error);
    return json({ 
      error: error instanceof Error ? error.message : 'Ein unbekannter Fehler ist aufgetreten' 
    }, { status: 500 });
  }
}