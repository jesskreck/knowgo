<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
	import QuestionItem from './QuestionItem.svelte';
	import AnsweredQuestions from './AnsweredQuestions.svelte';
	import type { FollowUpQuestionsResponse } from '$lib/openai-common';
	import PrivacyTooltip from './PrivacyTooltip.svelte';
  
  type FollowUpQuestionsProps = {
    questions: FollowUpQuestionsResponse | null;
    loading: boolean;
    onFinished?: (answers: Record<number, { blob: Blob | null, text: string | null }>) => void;
    onTranscribeRequest?: (index: number, blob: Blob) => void;
  };
  
  let { 
    questions, 
    loading,
    onFinished = (answers: Record<number, { blob: Blob | null, text: string | null }>) => {},
    onTranscribeRequest = (index: number, blob: Blob) => {}
  }: FollowUpQuestionsProps = $props();
  
  // State für die Antworten
  let questionAnswers = $state<Record<number, { blob: Blob | null, text: string | null }>>({}); 
  let answeredQuestions = $state<Set<number>>(new Set());
  let allQuestionsAnswered = $derived(
    questions && questions.questions.every((_, idx) => !!questionAnswers[idx]?.blob)
  );
  
  // Neuer Zustand für die Animation
  let justAnswered = $state<number | null>(null);
  
  // Umgang mit fertiger Aufnahme
  function handleRecordingComplete(index: number, blob: Blob, duration: number) {
    // Antwort speichern
    questionAnswers[index] = {
      blob: blob,
      text: null // Wird später durch Transkription ersetzt
    };
    
    // Animation auslösen
    justAnswered = index;
    
    // Nach kurzer Zeit den Animation-Zustand zurücksetzen
    setTimeout(() => {
      justAnswered = null;
      
      // Explizites Update des Antworten-Sets für Reaktivität
      answeredQuestions = new Set(answeredQuestions);
      answeredQuestions.add(index);
    }, 500); // Dauer für die Animation
    
    // Transkriptionsanfrage auslösen
    onTranscribeRequest(index, blob);
  }
  
  // Beenden und Übergabe erstellen
  function handleFinish() {
    onFinished(questionAnswers);
  }

  // Ohne Fixes fertigstellen
  function handleFinishWithoutFixes() {
    onFinished(questionAnswers);
  }
  
  // Sortierte und gefilterte Fragen
  function getUnansweredQuestions() {
    if (!questions) return [];
    
    return questions.questions
      .map((q, i) => ({ ...q, index: i }))
      .filter(q => !answeredQuestions.has(q.index))
      .sort((a, b) => b.importance - a.importance); // Nach Wichtigkeit sortieren, wichtigste zuerst
  }
  
  // Zähle die Gesamtzahl der Fragen
  function getTotalQuestionCount() {
    return questions?.questions.length || 0;
  }
  
  function getAnsweredQuestions() {
    if (!questions) return [];
    
    return questions.questions
      .map((q, i) => ({ ...q, index: i }))
      .filter(q => answeredQuestions.has(q.index))
      .sort((a, b) => a.index - b.index); // Nach ursprünglicher Reihenfolge sortieren
  }
</script>

<div class="follow-up-questions w-full">
  {#if loading}
    <div class="w-full flex flex-col items-center justify-center p-8">
      <span class="loading loading-spinner loading-lg text-primary"></span>
      <p class="mt-4 text-lg font-medium">Intelligente Rückfragen werden generiert...</p>
    </div>
  {:else if questions?.questions.length}
    <div class="w-full">     
      
      <!-- Fragen mit Beantwortungsmöglichkeit -->
      <div class="space-y-8 mb-8">
        {#each getUnansweredQuestions() as question (question.index)}
          <div 
            class="question-item" 
            class:sliding-right={justAnswered === question.index}
          >
            <QuestionItem
              question={question}
              onRecordingComplete={handleRecordingComplete}
              totalQuestions={getTotalQuestionCount()}
            />
          </div>
        {/each}

        <!-- Wenn alle Fragen beantwortet wurden -->
        {#if questions.questions.length > 0 && answeredQuestions.size === questions.questions.length}
          <div class="bg-success p-4 rounded-lg text-center text-success-content">
            <p class="font-semibold">🎉 Alle Fragen beantwortet!</p>
          </div>
        {/if}
      </div>
      
      <!-- Fertig-Buttons -->
      <div class="flex flex-col items-center">
        <button 
          class="btn btn-primary btn-lg" 
          disabled={!allQuestionsAnswered}
          onclick={handleFinish}
        >
          ✓ Fertig, Übergabe erstellen
        </button>
        <PrivacyTooltip note="Die Übergabe wird mithilfe der beantworteten Fragen erstellt. Wir speichern keine Antworten - nicht lokal, nicht extern." />


        <button 
          class="btn btn-outline" 
          onclick={handleFinishWithoutFixes}
        >
          Ohne Fixes fertigstellen
        </button>
        <PrivacyTooltip note="Die Übergabe wird nur auf Basis der Analyse erstellt - keine Rückfrage fließt mit ein. Wir speichern nichts." />
      </div>

      <!-- Beantwortete Fragen -->
      <AnsweredQuestions
        questions={getAnsweredQuestions()} 
        answers={questionAnswers}
      />
    </div>
  {:else}
    <div class="w-full flex flex-col items-center justify-center p-8">
      <p class="text-error">Keine Rückfragen verfügbar. Bitte versuche es erneut.</p>
    </div>
  {/if}
</div>

<style>
  .question-item {
    transition: transform 0.5s ease-out, opacity 0.5s ease-out;
  }
  
  .sliding-right {
    transform: translateX(100%);
    opacity: 0;
  }
</style>