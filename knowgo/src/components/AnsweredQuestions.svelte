<script lang="ts">
  type AnsweredQuestionsProps = {
    questions: Array<{
      index: number;
      question: string;
      importance: number;
    }>;
    answers: Record<number, { blob: Blob | null; text: string | null }>;
  };
  
  let { questions, answers }: AnsweredQuestionsProps = $props();
  
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

{#if questions.length > 0}
  <div class="mt-8">
    <div class="collapse collapse-arrow bg-base-200">
      <input type="checkbox" /> 
      <div class="collapse-title font-medium">
        Beantwortete Fragen ({questions.length})
      </div>
      <div class="collapse-content">
        <div class="space-y-4">
          {#each questions as question}
            <div class="bg-base-100 p-4 rounded-lg">
              <div class="flex justify-between items-start mb-2">
                <h5 class="font-medium">Frage {question.index + 1} beantwortet 👌</h5>
                <span class="badge badge-sm {getImportanceClass(question.importance)}">
                  {getImportanceLabel(question.importance)}
                </span>
              </div>
              <p class="text-sm mb-2">{question.question}</p>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
{/if}
