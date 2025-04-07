# KnowGo - Smarte Übergaben leicht gemacht

KnowGo ist eine moderne Webanwendung, die Wissenstransfer und Aufgabenübergaben mit KI-Unterstützung vereinfacht. Das Tool nimmt gesprochene Erklärungen auf, strukturiert diese automatisch und erstellt daraus ein klares Übergabedokument.

**Demo**: [https://knowgo.jesskreck.de/](https://knowgo.jesskreck.de/)

## Features

- 🎙️ **Audio-basierte Übergaben**: Nimm deine Erklärung einfach auf und lass die KI das Chaos strukturieren
- 🤖 **KI-Analyse**: Automatische Bewertung der Qualität und Klarheit deiner Übergabe
- 🧠 **Intelligente Rückfragen**: Identifiziert fehlende Informationen und generiert gezielte Nachfragen
- 📄 **Strukturierte Dokumentation**: Erstellt ein vollständiges Übergabedokument mit allen wichtigen Informationen

## Technologie-Stack

- **Frontend**: Svelte 5 mit reaktivem State-Management über Runes
- **Server-Routing**: SvelteKit 2 mit API-Endpunkten für OpenAI-Integration
- **UI/UX**: TailwindCSS 4 mit DaisyUI-Komponenten für konsistentes Design
- **KI**: OpenAI GPT-4-basierte Analyse und Whisper für Audio-Transkription
- **Datenstrukturierung**: Zod für Schema-Validierung der KI-Responses
- **Deployment**: Optimiert für Netlify mit automatischen Redirects und Cache-Strategien

## Privacy by Default

KnowGo setzt konsequent auf "Privacy by Default" durch:

- **Transparente Privacy-Tooltips**: Jeder Datenflusspunkt ist mit einem Privacy-Tooltip versehen, der exakt erklärt, was mit den Daten passiert
- **Keine Datenspeicherung**: Alle Daten (Aufnahmen, Transkripte, Analysen) existieren nur im Browser-Speicher
- **Minimale API-Kommunikation**: Nur notwendige Daten werden an OpenAI zur Verarbeitung gesendet
- **Explizite Hinweise**: Benutzer werden über potenzielle Datennutzung durch Drittanbieter (z.B. OpenAI) informiert
- **Selbstlöschender Inhalt**: Bei Seitenverlassen oder Neuladen werden alle Daten automatisch entfernt

Die Privacy-Komponente (`PrivacyTooltip.svelte`) wird konsistent an allen kritischen Interaktionspunkten eingesetzt und stellt sicher, dass Benutzer jederzeit informiert sind, ohne den Workflow zu unterbrechen.

## Projektstruktur

```
├── src/
│   ├── components/         # UI-Komponenten
│   ├── lib/                # Shared Utilities und Services
│   │   ├── assets/         # Statische Assets
│   │   ├── utils/          # Hilfsfunktionen
│   │   ├── openai-common.ts # OpenAI API Schnittstelle
│   │   ├── prompts.ts      # KI-Prompts
│   │   └── knowgo-state.svelte.ts # Zentraler Zustand
│   └── routes/             # SvelteKit Routing
│       ├── api/            # API-Endpunkte
│       ├── knowgo/         # Hauptfunktionalität
│       └── interviews/     # Marketing/Feedback-Seiten
├── static/                 # Statische Dateien
└── ...                     # Konfigurationsdateien
```

## Installation

1. Repository klonen:
   ```bash
   git clone https://github.com/yourusername/knowgo.git
   cd knowgo
   ```

2. Abhängigkeiten installieren:
   ```bash
   npm install
   ```

3. Umgebungsvariablen einrichten:
   Erstelle eine `.env`-Datei im Wurzelverzeichnis:
   ```
   OPENAI_API_KEY=dein_openai_api_key
   SUPABASE_ANON_KEY=dein_supabase_anon_key
   VITE_SUPABASE_SERVICE_KEY=dein_supabase_service_key
   ```

4. Entwicklungsserver starten:
   ```bash
   npm run dev
   ```

## Workflow

1. **Aufgabenbeschreibung**: Benutzer geben eine kurze Beschreibung der zu übergebenden Aufgabe ein
2. **Audio-Aufnahme**: Sie nehmen eine mündliche Erklärung auf
3. **Chaos-Check**: Die KI analysiert die Qualität der Erklärung
4. **Rückfragen**: Intelligente Fragen werden generiert, um Informationslücken zu schließen
5. **Übergabedokument**: Ein strukturiertes Dokument wird erstellt

## Deployment

Die Anwendung ist für das Deployment auf Netlify konfiguriert:

```bash
npm run build
```

## Anpassung und Weiterentwicklung

Das Projekt ist modular aufgebaut und kann erweitert werden:
- Anpassung der KI-Prompts in `src/lib/prompts.ts`
- Hinzufügen neuer Komponenten in `src/components/`
- Erweiterung der API-Endpunkte in `src/routes/api/`

## Lizenz

MIT