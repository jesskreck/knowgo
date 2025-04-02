import { json } from '@sveltejs/kit';
import { openai } from '../../../lib/openai-common';
import { knowgoState } from "../../../lib/knowgo-state.svelte";

/**
 * Haupt-Endpunkt für die Transkription von Audiodateien
 */
export async function POST({ request }) {
  try {
    const formData = await request.formData();
    const audioBlob = formData.get('audio') as File;
    const language = formData.get('language') as string || 'de';
    const taskDescription = formData.get('taskDescription') as string || '';
    
    if (!audioBlob) {
      return json({ error: 'Keine Audiodatei erhalten' }, { status: 400 });
    }
    
    const transcription = await openai.audio.transcriptions.create({
      file: audioBlob,
      model: 'gpt-4o-mini-transcribe',
      language,
      prompt: `Hallo, darum geht es in diesem Transkript: ${taskDescription}. `
    });
    
    return json({ text: transcription.text });
  } catch (error) {
    console.error('Fehler bei der Audio-Transkription:', error);
    return json({ 
      error: error instanceof Error ? error.message : 'Ein unbekannter Fehler ist aufgetreten' 
    }, { status: 500 });
  }
}