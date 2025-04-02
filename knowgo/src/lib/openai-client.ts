// Client-seitige Funktionen für die OpenAI-API
import type { ChaosCheckResponse, FollowUpQuestionsResponse, HandoverDocumentResponse } from './openai-common';

/**
 * Transkribiert Audio-Dateien mit der OpenAI Transcriptions API
 * @param audioBlob - Audio-Blob aus der Aufnahme
 * @param language - Die Sprache des Audios (ISO-639-1 Format)
 * @param taskDescription - Beschreibung der Aufgabe für Kontext
 * @returns Eine Promise mit dem transkribierten Text
 */
export async function transcribeAudio(
  audioBlob: Blob,
  language: string = 'de',
  taskDescription: string = ''
): Promise<string> {
  const formData = new FormData();
  formData.append('audio', audioBlob);
  formData.append('language', language);
  formData.append('taskDescription', taskDescription);

  const response = await fetch('/api/openai', {
    method: 'POST',
    body: formData
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Transkriptionsfehler');
  }

  const data = await response.json();
  return data.text;
}

/**
 * Analysiert die Qualität einer Aufgabenübergabe
 * @param taskDescription - Beschreibung der Aufgabe
 * @param audioTranscript - Transkript der Audioaufnahme
 * @returns Analyse der Qualität der Aufgabenübergabe
 */
export async function analyzeChaos(
  taskDescription: string,
  audioTranscript: string
): Promise<ChaosCheckResponse> {
  const response = await fetch('/api/openai/analyze-chaos', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ taskDescription, audioTranscript })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Analysefehler');
  }

  const data = await response.json();
  return data.result;
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
): Promise<FollowUpQuestionsResponse> {
  const response = await fetch('/api/openai/follow-up-questions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ taskDescription, audioTranscript, chaosCheck })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Fehler beim Generieren der Rückfragen');
  }

  const data = await response.json();
  return data.result;
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
): Promise<HandoverDocumentResponse> {
  const response = await fetch('/api/openai/create-handover', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ taskDescription, audioTranscript, followUpQuestions, questionAnswers })
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Fehler beim Erstellen des Übergabedokuments');
  }

  const data = await response.json();
  return data.result;
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