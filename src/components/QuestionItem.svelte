<script lang="ts">
	import PrivacyTooltip from './PrivacyTooltip.svelte';
	import QuestionAudioRecorder from './QuestionAudioRecorder.svelte';

	type QuestionItemProps = {
		question: {
			index: number;
			question: string;
			context?: string;
			importance: number;
		};
		onRecordingComplete: (index: number, blob: Blob) => void;
		totalQuestions?: number;
	};

	let { question, onRecordingComplete, totalQuestions = 5 }: QuestionItemProps = $props();

	// Hilfsfunktionen für Darstellung
	function getImportanceLabel(importance: number): string {
		switch (importance) {
			case 5:
				return 'Kritisch';
			case 4:
				return 'Sehr wichtig';
			case 3:
				return 'Wichtig';
			case 2:
				return 'Hilfreich';
			case 1:
				return 'Optional';
			default:
				return '';
		}
	}

	function getImportanceClass(importance: number): string {
		switch (importance) {
			case 5:
				return 'badge-error';
			case 4:
				return 'badge-warning';
			case 3:
				return 'badge-primary';
			case 2:
				return 'badge-info';
			case 1:
				return 'badge-ghost';
			default:
				return '';
		}
	}
</script>

<div class="bg-base-200 rounded-lg p-6">
	<div class="mb-4">
		<h4 class="text-lg font-bold">{question.question}</h4>
	</div>

	{#if question.context}
		<div class="bg-base-300 mb-4 rounded p-3 text-sm">
			<span class="font-medium">Kontext:</span>
			{question.context}
		</div>
	{/if}

	<!-- Aufnahme-Komponente -->
	<div class="mt-4">
		<QuestionAudioRecorder
			questionIndex={question.index}
			onRecordingComplete={onRecordingComplete}
		/>
	</div>
    
    <div class="mt-3 flex items-center justify-between">
        <div class="flex gap-2">
            <span class="badge badge-neutral">Frage {question.index + 1}/{totalQuestions}</span>
            <span class="badge {getImportanceClass(question.importance)}">
                {getImportanceLabel(question.importance)}
            </span>
        </div>
        
        <PrivacyTooltip
          note="Deine Aufnahme geht einmalig an OpenAI zur Transkription.
Der Text fließt ins Übergabedokument ein. Die Audiospur wird nicht gespeichert.
Hinweis: OpenAI kann Audiodaten zu Trainingszwecken speichern."
        />
    </div>
</div>