import { json } from '@sveltejs/kit';
import { generateFollowUpQuestions } from '../../../../lib/openai-common';

export async function POST({ request }) {
  try {
    const body = await request.json();
    const { taskDescription, audioTranscript, chaosCheck } = body;
    
    if (!taskDescription || !audioTranscript || !chaosCheck) {
      return json({ error: 'Alle erforderlichen Felder müssen angegeben werden' }, { status: 400 });
    }
    
    const questions = await generateFollowUpQuestions(taskDescription, audioTranscript, chaosCheck);
    return json({ result: questions });
  } catch (error) {
    console.error('Fehler bei den Rückfragen:', error);
    return json({ 
      error: error instanceof Error ? error.message : 'Ein unbekannter Fehler ist aufgetreten' 
    }, { status: 500 });
  }
}