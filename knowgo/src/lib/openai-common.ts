import OpenAI from "openai";
import { z } from "zod";
import { zodResponseFormat } from "openai/helpers/zod";
import { CHAOS_CHECK_PROMPT, FOLLOW_UP_QUESTIONS_PROMPT, HANDOVER_DOCUMENT_PROMPT } from "./prompts";
import { OPENAI_API_KEY } from '$env/static/private';

// Initialisiere den OpenAI Client
export const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

// Schema für den Chaos-Check
export const ChaosCheckSchema = z.object({
  chaos_score: z.number(),
  clarity_score: z.number(),
  category: z.string(),
  weaknesses: z.array(z.object({
    quote: z.string(),
    explanation: z.string()
  })),
  overall_assessment: z.string()
});
export type ChaosCheckResponse = z.infer<typeof ChaosCheckSchema>;

// Schema für KI-generierte Rückfragen
export const FollowUpQuestionsSchema = z.object({
  questions: z.array(z.object({
    question: z.string(),
    context: z.string(),
    importance: z.number()
  })).transform(questions => {
    // Ensure at least 3 and at most 5 questions
    if (questions.length < 3 || questions.length > 5) {
      throw new Error('Questions must be between 3 and 5');
    }
    
    // Additional validation for importance if needed
    questions.forEach(q => {
      if (q.importance < 1 || q.importance > 5) {
        throw new Error('Importance must be between 1 and 5');
      }
    });
    
    return questions;
  })
});
export type FollowUpQuestionsResponse = z.infer<typeof FollowUpQuestionsSchema>;

// Schema für die finale Übergabe
export const HandoverDocumentSchema = z.object({
  title: z.string(),
  summary: z.string(),
  steps: z.array(z.object({
    title: z.string(),
    description: z.string()
  })),
  faq: z.array(z.object({
    question: z.string(),
    answer: z.string()
  })),
  resources: z.array(z.object({
    name: z.string(),
    description: z.string().optional()
  })),
  contacts: z.array(z.object({
    name: z.string(),
    role: z.string().optional(),
    contact_info: z.string().optional()
  })),
  notes: z.string().optional()
});
export type HandoverDocumentResponse = z.infer<typeof HandoverDocumentSchema>;

/**
 * Analysiert die Qualität einer Aufgabenübergabe
 * @param taskDescription - Beschreibung der Aufgabe
 * @param audioTranscript - Transkript der Audioaufnahme
 * @returns Analyse der Qualität der Aufgabenübergabe
 */
export async function analyzeChaos(
  taskDescription: string, 
  audioTranscript: string
): Promise<ChaosCheckResponse | null> {
  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini",
    messages: [
      { 
        role: "system", 
        content: CHAOS_CHECK_PROMPT
      },
      { 
        role: "user", 
        content: `Aufgabe: ${taskDescription}\n\nÜbergabebeschreibung (Transkript):\n${audioTranscript}` 
      },
    ],
    response_format: zodResponseFormat(ChaosCheckSchema, "chaos_check"),
  });
  return completion.choices[0].message.parsed;
}

/**
 * Generiert intelligente Rückfragen basierend auf der Aufgabenbeschreibung und der Chaos-Analyse
 * @param taskDescription - Beschreibung der Aufgabe
 * @param audioTranscript - Transkript der Audioaufnahme
 * @param chaosCheck - Ergebnis der Chaos-Analyse
 * @returns Rückfragen zur Verbesserung der Aufgabenübergabe
 */
export async function generateFollowUpQuestions(
  taskDescription: string, 
  audioTranscript: string, 
  chaosCheck: ChaosCheckResponse
): Promise<FollowUpQuestionsResponse | null> {
  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini",
    messages: [
      { 
        role: "system", 
        content: FOLLOW_UP_QUESTIONS_PROMPT 
      },
      { 
        role: "user", 
        content: `Aufgabe: ${taskDescription}\n\nÜbergabebeschreibung (Transkript):\n${audioTranscript}\n\nErkannte Schwächen:\n${JSON.stringify(chaosCheck.weaknesses)}` 
      },
    ],
    response_format: zodResponseFormat(FollowUpQuestionsSchema, "follow_up_questions"),
  });
  return completion.choices[0].message.parsed;
}

/**
 * Erstellt ein strukturiertes Übergabedokument
 * @param taskDescription - Beschreibung der Aufgabe
 * @param audioTranscript - Transkript der Audioaufnahme
 * @param followUpQuestions - Generierte Rückfragen
 * @param questionAnswers - Antworten auf die Rückfragen
 * @returns Strukturiertes Übergabedokument
 */
export async function createHandoverDocument(
  taskDescription: string,
  audioTranscript: string,
  followUpQuestions: FollowUpQuestionsResponse,
  questionAnswers: Record<string, string>
): Promise<HandoverDocumentResponse | null> {
  // Formatiere die Fragen und Antworten für den Prompt
  const qaFormatted = followUpQuestions.questions.map((q, i) => {
    const index = i.toString();
    return `Frage: ${q.question}\nAntwort: ${questionAnswers[index] || "Keine Antwort bereitgestellt"}`;
  }).join("\n\n");
  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-mini",
    messages: [
      { 
        role: "system", 
        content: HANDOVER_DOCUMENT_PROMPT,
      },
      { 
        role: "user", 
        content: `Aufgabe: ${taskDescription}\n\nUrsprüngliche Beschreibung (Transkript):\n${audioTranscript}\n\nBeantwortete Fragen:\n${qaFormatted}` 
      },
    ],
    response_format: zodResponseFormat(HandoverDocumentSchema, "handover_document"),
  });
  return completion.choices[0].message.parsed;
}

/**
 * Hilfsfunktion für benutzerfreundliche Fehlermeldungen
 * @param error - Der aufgetretene Fehler
 * @returns Eine benutzerfreundliche Fehlermeldung
 */
export function getUserFriendlyErrorMessage(error: unknown): string {
  return error instanceof Error 
    ? `Fehler: ${error.message}` 
    : 'Ein unbekannter Fehler ist aufgetreten';
}
