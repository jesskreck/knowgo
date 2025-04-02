import type { ChaosCheckResponse, FollowUpQuestionsResponse, HandoverDocumentResponse } from '../routes/api/openai/+server';

// Zentraler State für den gesamten Übergabe-Prozess
export const knowgoState = $state({
  // Basis-Eingaben
  taskDescription: '',
  
  // Audio und Transkription
  recordingBlob: null as Blob | null,
  transcript: '',
  
  // Analyse-Schritte
  chaosCheck: null as ChaosCheckResponse | null,
  questions: null as FollowUpQuestionsResponse | null,
  
  // Antworten auf Rückfragen
  answers: {} as Record<number, { blob: Blob | null, text: string | null }>,
  
  // Finales Dokument
  document: null as HandoverDocumentResponse | null,
  
  // Status-Flags
  currentStep: 'start' as 'start' | 'record' | 'chaos' | 'questions' | 'result',
  loading: false,
  error: ''
});

$: console.log("currentStep:", knowgoState.currentStep)
$: console.log("Task Description:", knowgoState.taskDescription)
$: console.log("recordingBlob:", knowgoState.recordingBlob)
$: console.log("transcript:", knowgoState.transcript)
$: console.log("chaosCheck:", knowgoState.chaosCheck)
$: console.log("answers:", knowgoState.answers)
$: console.log("document:", knowgoState.document)

// Hilfsfunktionen zum Aktualisieren des States

export function updateTaskDescription(task: string) {
  knowgoState.taskDescription = task;
  knowgoState.currentStep = 'record';
}

export function updateRecording(blob: Blob) {
  knowgoState.recordingBlob = blob;
}

export function updateTranscript(transcript: string) {
  knowgoState.transcript = transcript;
  knowgoState.currentStep = 'record';
}

export function updateChaosCheck(chaosCheck: ChaosCheckResponse) {
  knowgoState.chaosCheck = chaosCheck;
  knowgoState.currentStep = 'chaos';
}

export function updateQuestions(questions: FollowUpQuestionsResponse) {
  knowgoState.questions = questions;
  knowgoState.currentStep = 'questions';
}

export function updateAnswer(index: number, blob: Blob | null, text: string | null = null) {
  knowgoState.answers[index] = { blob, text };
}

export function updateAnswerText(index: number, text: string) {
  if (knowgoState.answers[index]) {
    knowgoState.answers[index].text = text;
  }
}

export function updateDocument(document: HandoverDocumentResponse) {
  knowgoState.document = document;
  knowgoState.currentStep = 'result';
}

export function setLoading(isLoading: boolean) {
  knowgoState.loading = isLoading;
}

export function setError(errorMessage: string) {
  knowgoState.error = errorMessage;
}

export function clearError() {
  knowgoState.error = '';
}

export function resetState() {
  knowgoState.taskDescription = '';
  knowgoState.recordingBlob = null;
  knowgoState.transcript = '';
  knowgoState.chaosCheck = null;
  knowgoState.questions = null;
  knowgoState.answers = {};
  knowgoState.document = null;
  knowgoState.currentStep = 'start';
  knowgoState.loading = false;
  knowgoState.error = '';
}

// Navigation zum nächsten oder vorherigen Schritt
export function goToNextStep() {
  const steps: Array<'start' | 'record' | 'chaos' | 'questions' | 'result'> = [
    'start', 'record', 'chaos', 'questions', 'result'
  ];
  
  const currentIndex = steps.indexOf(knowgoState.currentStep);
  if (currentIndex < steps.length - 1) {
    knowgoState.currentStep = steps[currentIndex + 1];
  }
}

export function goToPreviousStep() {
  const steps: Array<'start' | 'record' | 'chaos' | 'questions' | 'result'> = [
    'start', 'record', 'chaos', 'questions', 'result'
  ];
  
  const currentIndex = steps.indexOf(knowgoState.currentStep);
  if (currentIndex > 0) {
    knowgoState.currentStep = steps[currentIndex - 1];
  }
}