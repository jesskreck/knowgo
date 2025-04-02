# KnowGo - Smarte Übergaben leicht gemacht

Eine Svelte 5 Anwendung zur Verbesserung von Wissenstransfer und Aufgabenübergaben mit KI-Unterstützung.

## Features

- 🎙️ **Audio-basierte Übergaben**: Nimm deine Erklärung einfach auf und lass die KI das Chaos strukturieren
- 🤖 **KI-Analyse**: Automatische Bewertung der Qualität und Klarheit deiner Übergabe
- 🧠 **Intelligente Rückfragen**: Identifiziert fehlende Informationen und generiert gezielte Nachfragen
- 📄 **Strukturierte Dokumentation**: Erstellt ein vollständiges Übergabedokument mit allen wichtigen Informationen

## Technologien

- [Svelte 5](https://svelte.dev) mit den neuen Runes-Features
- [SvelteKit 2](https://kit.svelte.dev) für Routing und Serverless-Funktionen
- [TailwindCSS 4](https://tailwindcss.com) und [DaisyUI](https://daisyui.com) für das UI
- [OpenAI API](https://openai.com) für Transkription und KI-Analyse
- [TypeScript](https://www.typescriptlang.org) für typsichere Entwicklung

## Einrichtung

1. Repo klonen:
   ```bash
   git clone https://github.com/yourusername/knowgo.git
   cd knowgo
   ```

2. Abhängigkeiten installieren:
   ```bash
   npm install
   ```

3. Umgebungsvariablen einrichten:
   Erstelle eine `.env`-Datei im Wurzelverzeichnis mit folgendem Inhalt:
   ```
   VITE_OPENAI_API_KEY=dein_openai_api_key
   VITE_SUPABASE_ANON_KEY=dein_supabase_anon_key
   VITE_SUPABASE_SERVICE_KEY=dein_supabase_service_key
   ```

4. Entwicklungsserver starten:
   ```bash
   npm run dev
   ```

## Deployment

Die Anwendung ist für das Deployment auf Netlify optimiert:

1. Stelle sicher, dass `@sveltejs/adapter-static` korrekt konfiguriert ist:
   ```js
   // svelte.config.js
   import adapter from '@sveltejs/adapter-static';
   
   export default {
     kit: {
       adapter: adapter({
         fallback: 'index.html' // Wichtig für SPA-Modus
       })
     }
   };
   ```

2. Erstelle eine `_redirects`-Datei im `static`-Verzeichnis:
   ```
   /* /index.html 200
   ```

3. Baue die Anwendung:
   ```bash
   npm run build
   ```

## Projektstruktur

- `/src/components` - Wiederverwendbare UI-Komponenten
- `/src/lib` - Shared utilities und runes-basierte Services
- `/src/routes` - Seitenstruktur und Routing
- `/static` - Statische Assets und Dateien

## Lizenz

MIT

## Kontakt

Jessica Krecker - [https://github.com/yourusername](https://github.com/yourusername)
