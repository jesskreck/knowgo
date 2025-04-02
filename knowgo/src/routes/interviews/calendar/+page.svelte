<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';
	import Heading from '../../../components/Heading.svelte';

  // Calendly config
  const calendlyUrl = "https://calendly.com/hallo-jesskreck/30min";
  let isCalendlyLoaded = false;
  
  // Load the Calendly script
  function loadCalendlyScript() {
    return new Promise<void>((resolve) => {
      if (document.getElementById('calendly-script')) {
        isCalendlyLoaded = true;
        resolve();
        return;
      }
      
      const script = document.createElement('script');
      script.id = 'calendly-script';
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = () => {
        isCalendlyLoaded = true;
        resolve();
      };
      
      document.body.appendChild(script);
    });
  }
  
  // Initialize Calendly with advanced options
  function initCalendly() {
    if (!isCalendlyLoaded || !window.Calendly) return;
    
    const container = document.querySelector('.calendly-container');
    if (!container) {
      console.error('Calendly container not found');
      return;
    }
    
    window.Calendly.initInlineWidget({
      url: calendlyUrl,
      parentElement: container,
      prefill: {
        // Optional prefill values
        // email: "test@example.com",
        // name: "John Doe",
      },
      utm: {
        // Optional UTM parameters
        // utmSource: "yourwebsite",
      }
    });
  }

  onMount(async () => {
    if (browser) {
      await loadCalendlyScript();
      initCalendly();
    }
  });
</script>

<svelte:head>
  <!-- Add any required meta tags for the Calendly integration -->
</svelte:head>

<div class="container mx-auto py-8">
  
  <Heading level="h1">Wann passt es dir am besten?</Heading>
  
  <!-- The container for Calendly to initialize into -->
  <div class="calendly-container" style="min-width:320px;height:700px;"></div>
</div>

<!-- Add TypeScript interface for Calendly global object -->
<script lang="ts" context="module">
  declare global {
    interface Window {
      Calendly?: {
        initInlineWidget: (options: {
          url: string;
          parentElement: Element;
          prefill?: {
            email?: string;
            name?: string;
            [key: string]: any;
          };
          utm?: {
            utmSource?: string;
            [key: string]: any;
          };
        }) => void;
      };
    }
  }
</script>