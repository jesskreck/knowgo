import { json } from '@sveltejs/kit';
import { createHandoverDocument } from '../../../../lib/openai-common';

export async function POST({ request }) {
  console.log('[NETLIFY] Function started');
  
  try {
    console.log('[NETLIFY] Parsing request...');
    const body = await request.json();
    
    console.log('[NETLIFY] Request parsed, calling OpenAI...');
    const document = await createHandoverDocument(
      body.taskDescription, 
      body.audioTranscript, 
      body.followUpQuestions, 
      body.questionAnswers
    );
    
    console.log('[NETLIFY] OpenAI call successful');
    return json({ result: document });
    
  } catch (error) {
    console.error('[NETLIFY] Error:', String(error));
    console.error('[NETLIFY] Error details:', JSON.stringify(error, Object.getOwnPropertyNames(error)));
    
    return json({ 
      error: 'Server error: ' + String(error)
    }, { status: 500 });
  }
}