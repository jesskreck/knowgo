<script lang="ts">
	import type { AudioRecorderService } from "$lib/audio-recorder-service.svelte";

  
  type QuestionItemProps = {
    question: {
      index: number;
      question: string;
      context?: string;
      importance: number;
    };
    audioRecorderService: AudioRecorderService;
    onRecordingComplete: (index: number, blob: Blob, duration: number) => void;
  };
  
  let { 
    question, 
    audioRecorderService,
    onRecordingComplete 
  }: QuestionItemProps = $props();
  
  // Extrahiere reaktiven Zustand aus dem Service
  let recorderState = $derived(audioRecorderService.state);
  let isActiveQuestion = $derived(
    recorderState.isRecording && recorderState.currentRecordingId === question.index
  );
  
  // Starte die Aufnahme für diese Frage
  async function handleStartRecording() {
    try {
      await audioRecorderService.startRecording(question.index);
    } catch (error) {
      console.error('Fehler beim Starten der Aufnahme:', error);
    }
  }
  
  // Stoppe die Aufnahme
  async function handleStopRecording() {
    try {
      const result = await audioRecorderService.stopRecording();
      onRecordingComplete(question.index, result.blob, result.duration);
    } catch (error) {
      console.error('Fehler beim Stoppen der Aufnahme:', error);
    }
  }

  // Hilfsfunktionen für Darstellung
  function getImportanceLabel(importance: number): string {
    switch (importance) {
      case 5: return 'Kritisch';
      case 4: return 'Sehr wichtig';
      case 3: return 'Wichtig';
      case 2: return 'Hilfreich';
      case 1: return 'Optional';
      default: return '';
    }
  }
  
  function getImportanceClass(importance: number): string {
    switch (importance) {
      case 5: return 'badge-error';
      case 4: return 'badge-warning';
      case 3: return 'badge-primary';
      case 2: return 'badge-info';
      case 1: return 'badge-ghost';
      default: return '';
    }
  }
</script>

<div class="bg-base-200 p-6 rounded-lg">
  <div class="flex justify-between items-start mb-4">
    <h4 class="font-bold text-lg">Frage {question.index + 1}:</h4>
    <span class="badge {getImportanceClass(question.importance)}">
      {getImportanceLabel(question.importance)}
    </span>
  </div>
  
  <p class="mb-4">{question.question}</p>
  
  {#if question.context}
    <div class="bg-base-300 p-3 rounded mb-4 text-sm">
      <span class="font-medium">Kontext:</span> {question.context}
    </div>
  {/if}
  
  <!-- Aufnahme-Steuerung -->
  <div class="mt-4">
    {#if isActiveQuestion}
      <div class="flex items-center gap-3">
        <button class="btn btn-error" onclick={handleStopRecording}>
          ⏹ Aufnahme stoppen
        </button>
        <span class="font-mono text-lg">{audioRecorderService.formatTime(recorderState.recordingTime)}</span>
        
        <!-- Aufnahme-Visualisierung -->
        <div class="flex items-center h-8 gap-1 ml-2">
          <div class="recording-animation">
            <div class="bar"></div>
            <div class="bar"></div>
            <div class="bar"></div>
          </div>
        </div>
      </div>
    {:else}
      <button 
        class="btn btn-primary" 
        onclick={handleStartRecording}
        disabled={recorderState.isRecording}
      >
        🎙️ Antwort aufnehmen
      </button>
    {/if}
  </div>
</div>

<style>
  .recording-animation {
    display: flex;
    align-items: center;
    gap: 2px;
  }
  
  .bar {
    width: 3px;
    height: 10px;
    background-color: currentColor;
    border-radius: 1px;
    animation: soundVisualize 0.5s linear infinite alternate;
  }
  
  .bar:nth-child(1) { animation-delay: 0.0s; }
  .bar:nth-child(2) { animation-delay: 0.2s; }
  .bar:nth-child(3) { animation-delay: 0.1s; }
  
  @keyframes soundVisualize {
    0% { height: 5px; }
    100% { height: 20px; }
  }
</style>
