<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
	import QuestionItem from './QuestionItem.svelte'
	import AnsweredQuestions from './AnsweredQuestions.svelte';
	import { createAudioRecorderService } from '$lib/audio-recorder-service.svelte';
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
  
  // Audio-Recorder-Service
  const audioRecorder = createAudioRecorderService();
  
  // Umgang mit fertiger Aufnahme
  function handleRecordingComplete(index: number, blob: Blob, duration: number) {
    // Antwort speichern
    questionAnswers[index] = {
      blob: blob,
      text: null // Wird später durch Transkription ersetzt
    };
    
    // Explizites Update des Antworten-Sets für Reaktivität
    answeredQuestions = new Set(answeredQuestions);
    answeredQuestions.add(index);
    
    // Transkriptionsanfrage auslösen
    onTranscribeRequest(index, blob);
  }
  
  // Beenden und Übergabe erstellen
  function handleFinish() {
    // Falls noch eine Aufnahme läuft, diese beenden
    if (audioRecorder.state.isRecording) {
      audioRecorder.stopRecording().then(({ blob, duration }) => {
        if (audioRecorder.state.currentRecordingId !== null) {
          const index = audioRecorder.state.currentRecordingId as number;
          handleRecordingComplete(index, blob, duration);
          // Nach kurzem Delay fortfahren, damit die UI Zeit hat, sich zu aktualisieren
          setTimeout(() => onFinished(questionAnswers), 100);
        }
      }).catch(error => {
        console.error('Fehler beim Beenden der Aufnahme:', error);
        onFinished(questionAnswers);
      });
    } else {
      onFinished(questionAnswers);
    }
  }

  // Ohne Fixes fertigstellen
  function handleFinishWithoutFixes() {
    // Falls noch eine Aufnahme läuft, diese beenden
    if (audioRecorder.state.isRecording) {
      audioRecorder.stopRecording().catch(error => {
        console.error('Fehler beim Beenden der Aufnahme:', error);
      }).finally(() => {
        onFinished(questionAnswers);
      });
    } else {
      onFinished(questionAnswers);
    }
  }
  
  // Sortierte und gefilterte Fragen
  function getUnansweredQuestions() {
    if (!questions) return [];
    
    return questions.questions
      .map((q, i) => ({ ...q, index: i }))
      .filter(q => !answeredQuestions.has(q.index))
      .sort((a, b) => b.importance - a.importance);
  }
  
  function getAnsweredQuestions() {
    if (!questions) return [];
    
    return questions.questions
      .map((q, i) => ({ ...q, index: i }))
      .filter(q => answeredQuestions.has(q.index))
      .sort((a, b) => b.importance - a.importance);
  }
  
  // Ressourcen freigeben beim Zerstören der Komponente
  onDestroy(() => {
    audioRecorder.cleanup();
  });
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
        {#each getUnansweredQuestions() as question}
          <QuestionItem
            question={question}
            audioRecorderService={audioRecorder}
            onRecordingComplete={handleRecordingComplete}
          />
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