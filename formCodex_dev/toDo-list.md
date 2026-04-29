# 🤖 Cursor Prompt — SpigaZero · Form "Aggiungi o Aggiorna il tuo Ristorante"

> **Stack:** React 18 + Vite + TypeScript + Tailwind CSS v3  
> **Obiettivo:** Implementare il form di segnalazione ristorante per la piattaforma SpigaZero, fedele al design system e ai requisiti funzionali definiti in `prd.md` e `designdoc.md`.

---

## 📋 Istruzioni per Cursor

Sei un senior frontend developer. Implementa il form seguendo la lista di task in ordine. Per ogni task, scrivi codice TypeScript stretto (`strict: true`), componenti React funzionali, e classi Tailwind semantiche. Non usare librerie UI esterne (MUI, Chakra, shadcn) — tutto il design è custom basato sul brand SpigaZero.

---

## ✅ TODO LIST

---

### 🏗️ FASE 1 — Setup Progetto

- [ ] **1.1** Inizializza il progetto con Vite + React + TypeScript:
  ```bash
  npm create vite@latest spiga-zero-form -- --template react-ts
  cd spiga-zero-form
  npm install
  ```

- [ ] **1.2** Installa e configura Tailwind CSS v3:
  ```bash
  npm install -D tailwindcss postcss autoprefixer
  npx tailwindcss init -p
  ```

- [ ] **1.3** Configura `tailwind.config.ts` con il design token SpigaZero:
  - Aggiungi i colori custom del brand nella sezione `theme.extend.colors`:
    - `primary: '#5B3F99'` (viola — header, CTA, focus ring)
    - `accent: '#F5C518'` (giallo/oro — badge icone sezione)
    - `background: '#F5EDDB'` (beige caldo — sfondo globale)
    - `surface: '#FFFFFF'` (sfondo input e card)
    - `border-muted: '#D9CEBA'` (bordi input e divisori)
    - `text-primary: '#1A1A1A'`
    - `text-muted: '#999999'` (placeholder)
    - `error: '#CC3300'` (messaggi errore e asterischi)
    - `primary-hover: '#4A3180'`
    - `primary-focus-ring: 'rgba(91,63,153,0.15)'`
  - Aggiungi `fontFamily`: `sans: ['Nunito', 'sans-serif']`
  - Configura `content` per coprire `./src/**/*.{ts,tsx}`

- [ ] **1.4** Configura `tsconfig.json` con `strict: true` e path alias `@/` → `src/`

- [ ] **1.5** Aggiungi il font **Nunito** da Google Fonts nel file `index.html`:
  ```html
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;600;700&display=swap" rel="stylesheet">
  ```

- [ ] **1.6** Aggiorna `src/index.css` con le direttive Tailwind e imposta `background-color: #F5EDDB` e `font-family: 'Nunito', sans-serif` sul `body`

---

### 🗂️ FASE 2 — Struttura Cartelle e Tipi

- [ ] **2.1** Crea la struttura cartelle nel progetto:
  ```
  src/
  ├── components/
  │   ├── form/
  │   │   ├── FormHeader.tsx
  │   │   ├── SectionWrapper.tsx
  │   │   ├── SectionInformazioniPrincipali.tsx
  │   │   ├── SectionOfferteSenzaGlutine.tsx
  │   │   ├── SectionAltrigenallergenici.tsx
  │   │   ├── SectionNoteAggiuntive.tsx
  │   │   └── SubmitButton.tsx
  │   └── ui/
  │       ├── TextInput.tsx
  │       ├── CheckboxOption.tsx
  │       ├── CheckboxGroup.tsx
  │       ├── AllergenChip.tsx
  │       ├── FieldError.tsx
  │       └── SectionIcon.tsx
  ├── hooks/
  │   └── useSpigaZeroForm.ts
  ├── types/
  │   └── form.ts
  ├── utils/
  │   └── validators.ts
  └── App.tsx
  ```

- [ ] **2.2** Definisci i tipi TypeScript in `src/types/form.ts`:
  ```ts
  export type TipoCucinaGF = 'totalmente_gf' | 'alcuni_piatti_gf' | null

  export type TipologiaPiatto = 'antipasti' | 'primi' | 'secondi' | 'pizze' | 'dessert'

  export type Allergene = 'lattosio' | 'frutta_secca' | 'uova' | 'soia' | 'pesce' | 'altro'

  export interface SpigaZeroFormData {
    nomeRistorante: string
    indirizzo: string
    citta: string
    telefono: string
    email: string
    tipoCucinaGF: TipoCucinaGF
    tipologiePiatti: TipologiaPiatto[]
    certificazioni: string
    attrezzatureSeparate: boolean | null
    allergeniGestiti: Allergene[]
    noteAggiuntive: string
  }

  export interface FormErrors {
    nomeRistorante?: string
    indirizzo?: string
    citta?: string
    telefono?: string
    email?: string
    tipoCucinaGF?: string
    tipologiePiatti?: string
    attrezzatureSeparate?: string
  }

  export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'
  ```

---

### 🔧 FASE 3 — Utilities e Validazione

- [ ] **3.1** Implementa `src/utils/validators.ts` con le seguenti funzioni pure:
  - `isValidEmail(value: string): boolean` — regex RFC 5322 semplificata
  - `isValidPhone(value: string): boolean` — accetta formati nazionali IT e E.164 (es. `+39...`, `3xx...`, `0...`)
  - `validateForm(data: SpigaZeroFormData): FormErrors` — ritorna un oggetto errori:
    - `nomeRistorante`: obbligatorio, min 2 caratteri
    - `indirizzo`: obbligatorio, min 5 caratteri
    - `citta`: obbligatorio, min 2 caratteri
    - `telefono`: obbligatorio + `isValidPhone`
    - `email`: obbligatorio + `isValidEmail`
    - `tipoCucinaGF`: obbligatorio (deve essere `'totalmente_gf'` o `'alcuni_piatti_gf'`)
    - `tipologiePiatti`: obbligatorio, minimo 1 selezionato
    - `attrezzatureSeparate`: obbligatorio (deve essere `true` o `false`, non `null`)

---

### 🪝 FASE 4 — Custom Hook

- [ ] **4.1** Implementa `src/hooks/useSpigaZeroForm.ts`:
  - Stato interno: `formData: SpigaZeroFormData`, `errors: FormErrors`, `touched: Record<keyof FormErrors, boolean>`, `status: FormStatus`
  - `handleChange(field, value)` — aggiorna `formData` e, se il campo è già `touched`, ri-valida on-the-fly
  - `handleBlur(field)` — segna il campo come `touched` e valida solo quel campo
  - `handleSubmit(e: React.FormEvent)` — previene default, valida tutti i campi, se errori li mostra e fa scroll al primo campo errato; se valido imposta `status: 'submitting'`, simula una chiamata API con `setTimeout(1500ms)`, poi imposta `status: 'success'`
  - `isFormValid: boolean` — `true` solo se `validateForm(formData)` ritorna oggetto vuoto
  - Restituisce tutto ciò che i componenti necessitano via oggetto tipizzato

---

### 🎨 FASE 5 — Componenti UI Atomici

- [ ] **5.1** `TextInput.tsx` — props: `id`, `label`, `value`, `onChange`, `onBlur`, `placeholder`, `type?`, `required?`, `error?`, `disabled?`
  - Label sopra con asterisco rosso se `required`
  - Input con bordo `border-border-muted rounded-lg`, focus ring `focus:border-primary focus:ring-2 focus:ring-primary-focus-ring`
  - Stato error: bordo `border-error`, no focus ring viola
  - Stato disabled: `opacity-50 cursor-not-allowed`

- [ ] **5.2** `FieldError.tsx` — mostra il messaggio di errore sotto il campo con icona warning e testo in `text-error text-xs`; animazione `animate-[fadeIn_0.15s_ease-in]`

- [ ] **5.3** `CheckboxOption.tsx` — props: `id`, `label`, `checked`, `onChange`, `name?`
  - Checkbox custom: bordo `border-border-muted rounded`, checked: sfondo `bg-primary` con checkmark SVG bianco
  - Il componente supporta comportamento **radio-like** (via prop `radioLike?: boolean`) — quando è `true`, la onChange notifica il valore selezionato e deseleziona gli altri nello stesso gruppo (da gestire nel hook)

- [ ] **5.4** `AllergenChip.tsx` — props: `id`, `label`, `icon: React.ReactNode`, `checked`, `onChange`
  - Card pill con icona a sinistra, label a destra, sfondo `bg-white border border-border-muted rounded-xl`
  - Stato checked: bordo `border-primary bg-primary/5`
  - Dimensione minima touch target 44×44px

- [ ] **5.5** `SectionIcon.tsx` — props: `icon: React.ReactNode`
  - Badge circolare giallo `bg-accent rounded-full p-2 w-10 h-10 flex items-center justify-center`

- [ ] **5.6** `SectionWrapper.tsx` — props: `icon`, `title`, `children`
  - Layout: separatore `border-t border-border-muted` in cima, poi riga con `SectionIcon` + titolo `font-semibold text-lg`, poi `children`
  - Sfondo: `bg-background` con `px-6 py-6`

---

### 🖼️ FASE 6 — Componenti Form Compositi

- [ ] **6.1** `FormHeader.tsx`
  - Sfondo `bg-primary` full-width, testo bianco
  - Logo SpigaZero a sinistra (placeholder SVG di una spiga stilizzata in `text-accent`)
  - Titolo su 2 righe: "Aggiungi o aggiorna" (bianco, `font-bold text-2xl`) + "il tuo Ristorante" (`text-accent font-bold text-2xl`)
  - Sottotitolo: "Aiutaci a rendere SpigaZero più completo!" (`text-white/70 text-sm`)
  - Padding `px-6 py-5`

- [ ] **6.2** `SectionInformazioniPrincipali.tsx`
  - Usa `SectionWrapper` con icona edificio (Lucide `Building2` o SVG inline)
  - Griglia 2 colonne su `sm:` per: `[Nome Ristorante | Indirizzo]`, `[Città | Telefono]`
  - Email full-width sotto
  - Usa `TextInput` per tutti i campi, passando `error` e `onBlur` dal hook

- [ ] **6.3** `SectionOfferteSenzaGlutine.tsx`
  - Usa `SectionWrapper` con icona spiga barrata (SVG inline o Lucide `WheatOff`)
  - **Domanda 1**: "Il ristorante offre cucina senza glutine?" — 2 `CheckboxOption` in modalità `radioLike`:
    - "Cucina totalmente senza glutine"
    - "Abbiamo alcuni piatti senza glutine"
  - **Domanda 2**: "Quali tipologia di piatti senza glutine proponete?" — 5 `CheckboxOption` in row wrap: Antipasti, Primi, Secondi, Pizze, Dessert
  - **Campo**: `TextInput` per Certificazioni (facoltativo, nessun asterisco)
  - **Domanda 3**: "Usate attrezzature separate?" — 2 `CheckboxOption` radioLike: Sì / No
  - Mostra `FieldError` per ogni gruppo obbligatorio se touched + errore

- [ ] **6.4** `SectionAltriAllergeni.tsx`
  - Usa `SectionWrapper` con icona allergeni (Lucide `Leaf` o SVG)
  - Label domanda: "Quali allergeni gestite?" (opzionale)
  - 6 `AllergenChip` in griglia responsive `grid grid-cols-2 sm:grid-cols-3 gap-3`:
    - Lattosio 🥛, Frutta secca 🥜, Uova 🥚, Soia 🫘, Pesce 🐟, Altro ···
    - Usa le emoji come icone inline nel `AllergenChip`

- [ ] **6.5** `SectionNoteAggiuntive.tsx`
  - Usa `SectionWrapper` con icona `ClipboardList`
  - `<textarea>` stilizzata con le stesse classi di `TextInput`, `rows={4}`, `maxLength={1000}`
  - Contatore caratteri `X/1000` in basso a destra, colore `text-muted`
  - Label: "Altre informazioni utili per chi cerca opzioni senza glutine:"

- [ ] **6.6** `SubmitButton.tsx` — props: `disabled`, `status: FormStatus`
  - Sfondo `bg-primary` arrotondato `rounded-lg`, testo bianco `font-bold`
  - Hover: `hover:bg-primary-hover`
  - Disabled: `opacity-50 cursor-not-allowed`
  - Loading state (`status === 'submitting'`): spinner SVG animato + testo "Invio in corso..."
  - Allineato a destra con `ml-auto`

---

### 🔔 FASE 7 — Feedback Post-Submit

- [ ] **7.1** Crea `SuccessBanner.tsx` — mostrato quando `status === 'success'`:
  - Messaggio: "✅ Grazie! La tua segnalazione è stata ricevuta e sarà revisionata dal team SpigaZero."
  - Sfondo `bg-green-50 border border-green-300 rounded-xl text-green-800 px-6 py-4`
  - Il form scompare e viene sostituito dal banner

- [ ] **7.2** Crea `ErrorBanner.tsx` — mostrato quando `status === 'error'`:
  - Messaggio: "⚠️ Si è verificato un errore. Riprova tra qualche istante."
  - Sfondo `bg-red-50 border border-error rounded-xl text-error px-6 py-4`
  - Il form rimane visibile (l'utente può riprovare)

---

### 🧩 FASE 8 — Composizione Finale

- [ ] **8.1** Assembla tutto in `App.tsx`:
  - Chiama `useSpigaZeroForm()` e distribuisce props ai componenti figli
  - Layout: `<div className="min-h-screen bg-background font-sans">`
  - `FormHeader` full-width
  - `<form>` centrata `max-w-[760px] mx-auto` con le 4 sezioni in ordine
  - `SubmitButton` in fondo al form
  - Logica condizionale: se `status === 'success'` mostra `SuccessBanner` al posto del form

- [ ] **8.2** Implementa lo scroll automatico al primo campo con errore dopo il submit:
  ```ts
  const firstErrorField = Object.keys(errors)[0]
  document.getElementById(firstErrorField)?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  ```

---

### ♿ FASE 9 — Accessibilità e Qualità

- [ ] **9.1** Verifica che ogni `<input>` e `<textarea>` abbia `<label>` associata tramite `htmlFor`/`id`

- [ ] **9.2** Aggiungi `aria-required="true"` a tutti i campi obbligatori

- [ ] **9.3** Collega ogni `FieldError` al campo tramite `aria-describedby={fieldId + '-error'}`

- [ ] **9.4** Assicurati che `CheckboxOption` e `AllergenChip` abbiano touch target ≥ 44×44px

- [ ] **9.5** Aggiungi `role="alert"` a `SuccessBanner` e `ErrorBanner` per screen reader

- [ ] **9.6** Verifica la navigazione da tastiera: Tab ordine logico, checkbox attivabili con Spazio

- [ ] **9.7** Aggiungi `aria-label` all'icona del logo SpigaZero nell'header

---

### 📱 FASE 10 — Responsività

- [ ] **10.1** Verifica layout a 375px (mobile): tutte le griglie collassano a 1 colonna, gli `AllergenChip` restano a 2 colonne

- [ ] **10.2** Verifica layout a 768px (tablet): griglia 2 colonne per i campi affiancati attiva

- [ ] **10.3** Verifica layout a 1280px (desktop): form centrato con `max-w-[760px]`, corretti padding laterali

- [ ] **10.4** Assicurati che il bottone "Invia Segnalazione" sia sempre ben visibile e raggiungibile su mobile senza scroll eccessivo

---

### 🧪 FASE 11 — Testing e Rifinitura

- [ ] **11.1** Testa il flusso **happy path**: compila tutti i campi validi → clicca Invia → vedi SuccessBanner

- [ ] **11.2** Testa la **validazione on-blur**: lascia un campo vuoto e passa al campo successivo → vedi errore inline

- [ ] **11.3** Testa il **submit con errori**: clicca Invia senza compilare → tutti i campi obbligatori mostrano errore + scroll al primo

- [ ] **11.4** Testa il comportamento **radio-like** dei checkbox: seleziona "Cucina totalmente GF" → poi seleziona "Alcuni piatti GF" → il primo si deseleziona

- [ ] **11.5** Testa lo stato **disabled del bottone**: verifica che sia disabilitato finché non sono compilati tutti i campi obbligatori

- [ ] **11.6** Verifica che i placeholder del form (`Es. La Foglia D'oro`, `Es. Via del Ristorante 1`, ecc.) siano presenti e coerenti con il design originale

- [ ] **11.7** Controlla che nessun testo sia inferiore a 12px e che il body text sia almeno 14–16px

---

## 📌 Note Finali per Cursor

- **Non usare** `localStorage` o `sessionStorage`
- **Non installare** librerie UI come shadcn/ui, MUI, Chakra — il design è interamente custom Tailwind
- **Lucide React** è l'unica libreria di icone accettata: `npm install lucide-react`
- Il form usa **stato locale React** (`useState` nel custom hook) — nessuna libreria di state management esterna
- Nessuna integrazione backend reale in v1: il submit simula una chiamata API con `setTimeout`
- Il comportamento dei checkbox "Tipo cucina GF" e "Attrezzature separate" deve essere **mutuamente esclusivo** (radio logic), anche se visivamente rimangono checkbox
- Rispetta rigorosamente la palette colori SpigaZero: **viola `#5B3F99`**, **beige `#F5EDDB`**, **giallo `#F5C518`**
