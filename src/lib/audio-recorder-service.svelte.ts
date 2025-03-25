// src/lib/audio-recorder-service.svelte.ts
// Wiederverwendbarer Dienst für Audio-Aufnahmen in Svelte 5
// Stellt reaktive Logik zur Audio-Aufnahme bereit

// Typ-Definitionen
export type RecordingState = {
  isRecording: boolean;
  recordingTime: number;
  currentRecordingId: string | number | null;
  hasRecordingPermission: boolean;
};

export type RecordingResult = {
  blob: Blob;
  duration: number;
};

// Fehlertyp für Aufnahmefehler
export class RecordingError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'RecordingError';
  }
}

// Audio-Recorder-Dienst mit Runes
export function createAudioRecorderService() {
  // Zustandsvariablen
  let isRecording = $state(false);
  let recordingTime = $state(0);
  let currentRecordingId = $state<string | number | null>(null);
  let hasRecordingPermission = $state(true);
  
  // Private Variablen (nicht reaktiv)
  let mediaRecorder: MediaRecorder | null = null;
  let mediaStream: MediaStream | null = null;
  let audioChunks: Blob[] = [];
  let timerInterval: number | null = null;
  
  // Timer-Funktionen
  function startTimer() {
    recordingTime = 0;
    if (timerInterval) clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
      recordingTime++;
    }, 1000) as unknown as number;
  }
  
  function stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }
  
  // Format-Hilfsfunktion
  function formatTime(seconds: number): string {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }
  
  // Hauptfunktionen
  async function startRecording(id: string | number): Promise<void> {
    if (isRecording) return;
    
    try {
      // Bestehenden Stream beenden
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
      
      // Neuen Stream anfordern
      mediaStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      hasRecordingPermission = true;
      
      // Aufnahme vorbereiten
      audioChunks = [];
      mediaRecorder = new MediaRecorder(mediaStream);
      
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunks.push(event.data);
        }
      };
      
      // Aufnahme starten
      mediaRecorder.start();
      isRecording = true;
      currentRecordingId = id;
      startTimer();
    } catch (error) {
      console.error('Fehler beim Starten der Aufnahme:', error);
      if ((error as Error).name === 'NotAllowedError') {
        hasRecordingPermission = false;
      }
      isRecording = false;
      currentRecordingId = null;
      throw new RecordingError((error as Error).message);
    }
  }
  
  function stopRecording(): Promise<RecordingResult> {
    return new Promise((resolve, reject) => {
      if (!isRecording || !mediaRecorder) {
        reject(new RecordingError('Keine aktive Aufnahme'));
        return;
      }
      
      const recordingId = currentRecordingId;
      const duration = recordingTime;
      
      // Event-Handler für Aufnahme-Ende
      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks, { type: 'audio/webm' });
        resolve({ blob, duration });
      };
      
      // Aufnahme beenden
      isRecording = false;
      stopTimer();
      
      try {
        if (mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
        }
        
        // Stream beenden
        if (mediaStream) {
          mediaStream.getTracks().forEach(track => track.stop());
        }
      } catch (error) {
        reject(new RecordingError((error as Error).message));
      }
    });
  }
  
  // Cleanup-Funktion
  function cleanup() {
    if (isRecording) {
      try {
        if (mediaRecorder && mediaRecorder.state === 'recording') {
          mediaRecorder.stop();
        }
        
        if (mediaStream) {
          mediaStream.getTracks().forEach(track => track.stop());
        }
      } catch (error) {
        console.error('Fehler beim Cleanup:', error);
      }
    }
    
    if (timerInterval) {
      clearInterval(timerInterval);
    }
    
    isRecording = false;
    currentRecordingId = null;
  }
  
  // Öffentliche API
  return {
    // Reaktive Zustände
    get state(): RecordingState {
      return {
        isRecording,
        recordingTime,
        currentRecordingId,
        hasRecordingPermission
      };
    },
    
    // Methoden
    startRecording,
    stopRecording,
    formatTime,
    cleanup
  };
}

// Export eines Typs für die Rückgabe des Services
export type AudioRecorderService = ReturnType<typeof createAudioRecorderService>;