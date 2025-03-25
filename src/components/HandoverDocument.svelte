<script lang="ts">
	import type { HandoverDocumentResponse } from "$lib/openai-common";

  
  // Korrekte Prop-Deklaration für Svelte 5
  type HandoverDocumentProps = {
    document: HandoverDocumentResponse | null;
    loading: boolean;
    onRate?: (rating: number) => void;
    onNext?: () => void;
  };
  
  let { 
    document, 
    loading,
    onRate = (rating: number) => {},
    onNext = () => {}
  }: HandoverDocumentProps = $props();
  
  // Status für erfolgreiche Kopier-Aktion
  let copySuccess = $state(false);
  let rating = $state(0);
  
  // Funktion zum Kopieren in die Zwischenablage
  function copyToClipboard() {
    if (!document) return;
    
    // Konvertiere das Dokument in einen formatierten Text
    const text = formatDocumentAsText(document);
    
    navigator.clipboard.writeText(text)
      .then(() => {
        copySuccess = true;
        setTimeout(() => {
          copySuccess = false;
        }, 2000);
      })
      .catch(err => {
        console.error('Fehler beim Kopieren:', err);
      });
  }
  
  // Formatiert das Dokument als Text
  function formatDocumentAsText(doc: HandoverDocumentResponse): string {
    let text = `# ${doc.title}\n\n`;
    text += `## Zusammenfassung\n${doc.summary}\n\n`;
    
    text += `## Schritte\n`;
    doc.steps.forEach((step, index) => {
      text += `${index + 1}. **${step.title}**: ${step.description}\n`;
    });
    text += '\n';
    
    text += `## Häufig gestellte Fragen\n`;
    doc.faq.forEach(item => {
      text += `**F: ${item.question}**\nA: ${item.answer}\n\n`;
    });
    
    if (doc.resources.length > 0) {
      text += `## Ressourcen\n`;
      doc.resources.forEach(res => {
        text += `- **${res.name}**${res.description ? `: ${res.description}` : ''}\n`;
      });
      text += '\n';
    }
    
    if (doc.contacts.length > 0) {
      text += `## Kontakte\n`;
      doc.contacts.forEach(contact => {
        text += `- **${contact.name}**${contact.role ? ` (${contact.role})` : ''}${contact.contact_info ? `: ${contact.contact_info}` : ''}\n`;
      });
      text += '\n';
    }
    
    if (doc.notes) {
      text += `## Hinweise\n${doc.notes}\n\n`;
    }
    
    text += '---\nErstellt mit KnowGo. Die Übergabe ist erledigt, now go enjoy!';
    
    return text;
  }
  
  // Funktion zum Herunterladen als PDF
  function downloadAsPDF() {
    // In einer realen Anwendung würde hier die PDF-Generierung stattfinden
    // Zum Beispiel mit jsPDF oder durch Serveranfrage
    alert('PDF-Download ist in dieser Demo noch nicht implementiert.');
  }
  
  // Bewertung abgeben
  function submitRating() {
    if (rating > 0) {
      onRate(rating);
    }
  }
  
  $effect(() => {
    if (rating > 0) {
      submitRating();
    }
  });
</script>

<div class="handover-document w-full">
  {#if loading}
    <div class="w-full flex flex-col items-center justify-center p-8">
      <span class="loading loading-spinner loading-lg text-primary"></span>
      <p class="mt-4 text-lg font-medium">Deine strukturierte Übergabe wird erstellt...</p>
    </div>
  {:else if document}
    <div class="w-full">
      <div class="flex justify-between items-center mb-6">
        <div class="flex gap-2">
          <button class="btn btn-sm" onclick={downloadAsPDF}>
            📄 PDF
          </button>
          <button class="btn btn-sm btn-primary" onclick={copyToClipboard}>
            {#if copySuccess}
              ✓ Kopiert!
            {:else}
              📋 Kopieren
            {/if}
          </button>
        </div>
      </div>
      
      <div class="bg-base-200 p-6 rounded-lg mb-8">
        <h3 class="text-xl font-bold text-center mb-2">{document.title}</h3>
        <p class="text-center italic mb-4">{document.summary}</p>
        
        <div class="divider"></div>
        
        <!-- Schritte -->
        <div class="mb-6">
          <h4 class="font-bold text-lg mb-3">Schritt für Schritt Anleitung</h4>
          <ol class="list-decimal pl-5 space-y-2">
            {#each document.steps as step, index}
              <li>
                <span class="font-medium">{step.title}</span>: {step.description}
              </li>
            {/each}
          </ol>
        </div>
        
        <!-- FAQs -->
        <div class="mb-6">
          <h4 class="font-bold text-lg mb-3">Häufig gestellte Fragen</h4>
          <div class="space-y-4">
            {#each document.faq as item}
              <div class="collapse collapse-arrow bg-base-100">
                <input type="checkbox" /> 
                <div class="collapse-title font-medium">
                  {item.question}
                </div>
                <div class="collapse-content"> 
                  <p>{item.answer}</p>
                </div>
              </div>
            {/each}
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Ressourcen -->
          {#if document.resources.length > 0}
            <div>
              <h4 class="font-bold text-lg mb-3">Ressourcen</h4>
              <ul class="list-disc pl-5 space-y-1">
                {#each document.resources as resource}
                  <li>
                    <span class="font-medium">{resource.name}</span>
                    {#if resource.description}
                      <br><span class="text-sm">{resource.description}</span>
                    {/if}
                  </li>
                {/each}
              </ul>
            </div>
          {/if}
          
          <!-- Kontakte -->
          {#if document.contacts.length > 0}
            <div>
              <h4 class="font-bold text-lg mb-3">Kontakte</h4>
              <ul class="list-disc pl-5 space-y-1">
                {#each document.contacts as contact}
                  <li>
                    <span class="font-medium">{contact.name}</span>
                    {#if contact.role}<span> ({contact.role})</span>{/if}
                    {#if contact.contact_info}<br><span class="text-sm">{contact.contact_info}</span>{/if}
                  </li>
                {/each}
              </ul>
            </div>
          {/if}
        </div>
        
        <!-- Hinweise -->
        {#if document.notes}
          <div class="mt-6">
            <h4 class="font-bold text-lg mb-3">Hinweise</h4>
            <p>{document.notes}</p>
          </div>
        {/if}
        
        <!-- Footer -->
        <div class="divider mt-6"></div>
        <p class="text-center text-sm text-base-content/70">
          Erstellt mit KnowGo. Die Übergabe ist erledigt, now go enjoy!
        </p>
      </div>
      
      <!-- Bewertung -->
      <div class="flex flex-col items-center mt-8 mb-4">
        <h4 class="font-medium mb-2">Wie hilfreich war diese Übergabe?</h4>
        <div class="rating rating-lg">
          {#each Array(5) as _, i}
            <input 
              type="radio" 
              name="rating-5" 
              class="mask mask-star-2 bg-orange-400" 
              checked={rating === i + 1}
              onclick={() => rating = i + 1}
            />
          {/each}
        </div>
      </div>
      
      <!-- Weiter Button -->
      <div class="flex justify-center mt-6">
        <button class="btn btn-primary btn-lg" onclick={onNext}>
          Weiter
        </button>
      </div>
    </div>
  {:else}
    <div class="w-full flex flex-col items-center justify-center p-8">
      <p class="text-error">Keine Übergabe verfügbar. Bitte versuche es erneut.</p>
    </div>
  {/if}
</div>