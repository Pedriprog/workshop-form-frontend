# 🎯 Cursor Agent Prompt — SpigaZero Form
> Progetto: `formSpigaZero` · Stack: React 18 + Vite + TypeScript (strict) + Tailwind CSS v3

---

## 🧠 Contesto

Stai implementando il form **"Aggiungi o Aggiorna il tuo Ristorante"** per la piattaforma **SpigaZero** — una directory di ristoranti gluten-free e allergen-friendly. Il design e i requisiti sono definiti in `prd.md` e `designdoc.md` nella root del progetto. Leggi entrambi prima di iniziare.

---

## ⚙️ Regole Assolute — Rispettale in ogni file

Queste regole hanno priorità su qualsiasi altra considerazione. Non fare eccezioni.

```
RULE-01  File naming:         kebab-case per tutto  →  text-input.tsx, use-form.ts, form-types.ts
RULE-02  Max righe per file:  100 righe di codice (esclusi commenti e righe vuote)
         → Se un file supera le 100 righe, spezzalo in sotto-componenti o utility
RULE-03  Single Responsibility: ogni file fa UNA cosa sola
RULE-04  No `any`:            TypeScript strict, zero `any` impliciti o espliciti
RULE-05  Barrel files:        ogni cartella espone i propri moduli via index.ts
RULE-06  Stili centralizzati: zero valori hardcoded nelle classi Tailwind
         → Usa solo i token definiti in tailwind.config.ts
RULE-07  No librerie UI:      niente shadcn, MUI, Chakra — solo Tailwind custom
RULE-08  Icone:               solo lucide-react
RULE-09  No default export:   usa named exports ovunque (eccetto App.tsx e pagine)
RULE-10  Componenti puri:     nessun side-effect diretto nei componenti → tutto nel hook
```

---

## 📁 Struttura del Progetto

Crea esattamente questa struttura in `c:\Users\rikyc\Desktop\formSpigaZero\`:

```
formSpigaZero/
├── public/
├── src/
│   ├── assets/
│   │   └── logo.svg                        # Logo SpigaZero (spiga stilizzata)
│   │
│   ├── styles/
│   │   └── index.css                       # Direttive Tailwind + reset globale
│   │
│   ├── config/
│   │   └── form-config.ts                  # Costanti: opzioni piatti, allergeni, etc.
│   │
│   ├── types/
│   │   ├── form-types.ts                   # Tutti i tipi del dominio form
│   │   └── index.ts                        # Barrel
│   │
│   ├── utils/
│   │   ├── validators.ts                   # Funzioni pure di validazione
│   │   ├── form-helpers.ts                 # Helpers (scroll-to-error, etc.)
│   │   └── index.ts                        # Barrel
│   │
│   ├── hooks/
│   │   ├── use-spiga-zero-form.ts          # Custom hook centrale del form
│   │   └── index.ts                        # Barrel
│   │
│   ├── components/
│   │   ├── ui/                             # Componenti atomici riusabili
│   │   │   ├── text-input.tsx
│   │   │   ├── field-error.tsx
│   │   │   ├── checkbox-option.tsx
│   │   │   ├── allergen-chip.tsx
│   │   │   ├── section-icon.tsx
│   │   │   ├── section-wrapper.tsx
│   │   │   ├── submit-button.tsx
│   │   │   ├── success-banner.tsx
│   │   │   ├── error-banner.tsx
│   │   │   └── index.ts                    # Barrel
│   │   │
│   │   └── form/                           # Sezioni composte del form
│   │       ├── form-header.tsx
│   │       ├── section-info-principali.tsx
│   │       ├── section-offerte-gf.tsx
│   │       ├── section-altri-allergeni.tsx
│   │       ├── section-note-aggiuntive.tsx
│   │       └── index.ts                    # Barrel
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── tailwind.config.ts
├── tsconfig.json
├── vite.config.ts
├── prd.md
└── designdoc.md
```

---

## 🎨 Design Tokens — `tailwind.config.ts`

Crea questo file **prima di qualsiasi componente**. Tutti gli stili devono referenziare questi token.

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary:     { DEFAULT: '#5B3F99', hover: '#4A3180', ring: '#5B3F9926' },
        accent:      '#F5C518',
        background:  '#F5EDDB',
        surface:     '#FFFFFF',
        'border-muted': '#D9CEBA',
        'text-primary':  '#1A1A1A',
        'text-muted':    '#999999',
        error:       { DEFAULT: '#CC3300', bg: '#FFF5F5', border: '#FFC5B0' },
        success:     { DEFAULT: '#2D7D46', bg: '#F0FFF4', border: '#86EFAC' },
      },
      fontFamily: {
        sans: ['Nunito', 'sans-serif'],
      },
      borderRadius: {
        input: '8px',
        chip:  '12px',
        card:  '16px',
      },
      boxShadow: {
        focus: '0 0 0 3px #5B3F9926',
      },
      maxWidth: {
        form: '760px',
      },
    },
  },
  plugins: [],
}

export default config
```

---

## 📐 Tipi — `src/types/form-types.ts`

```ts
// src/types/form-types.ts

export type TipoCucinaGF =
  | 'totalmente_gf'
  | 'alcuni_piatti_gf'

export type TipologiaPiatto =
  | 'antipasti'
  | 'primi'
  | 'secondi'
  | 'pizze'
  | 'dessert'

export type Allergene =
  | 'lattosio'
  | 'frutta_secca'
  | 'uova'
  | 'soia'
  | 'pesce'
  | 'altro'

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export interface SpigaZeroFormData {
  nomeRistorante:       string
  indirizzo:            string
  citta:                string
  telefono:             string
  email:                string
  tipoCucinaGF:         TipoCucinaGF | null
  tipologiePiatti:      TipologiaPiatto[]
  certificazioni:       string
  attrezzatureSeparate: boolean | null
  allergeniGestiti:     Allergene[]
  noteAggiuntive:       string
}

export type FormErrors = Partial<Record<keyof SpigaZeroFormData, string>>
export type TouchedFields = Partial<Record<keyof SpigaZeroFormData, boolean>>
```

---

## ⚙️ Costanti — `src/config/form-config.ts`

Centralizza **tutti** i dati statici del form qui. I componenti non devono contenere array o label hardcoded.

```ts
// src/config/form-config.ts
import type { TipoCucinaGF, TipologiaPiatto, Allergene } from '@/types'

export const TIPO_CUCINA_OPTIONS: { value: TipoCucinaGF; label: string }[] = [
  { value: 'totalmente_gf',  label: 'Cucina totalmente senza glutine' },
  { value: 'alcuni_piatti_gf', label: 'Abbiamo alcuni piatti senza glutine' },
]

export const TIPOLOGIE_PIATTI_OPTIONS: { value: TipologiaPiatto; label: string }[] = [
  { value: 'antipasti', label: 'Antipasti' },
  { value: 'primi',     label: 'Primi'     },
  { value: 'secondi',   label: 'Secondi'   },
  { value: 'pizze',     label: 'Pizze'     },
  { value: 'dessert',   label: 'Dessert'   },
]

export const ALLERGENI_OPTIONS: { value: Allergene; label: string; emoji: string }[] = [
  { value: 'lattosio',     label: 'Lattosio',     emoji: '🥛' },
  { value: 'frutta_secca', label: 'Frutta secca',  emoji: '🥜' },
  { value: 'uova',         label: 'Uova',          emoji: '🥚' },
  { value: 'soia',         label: 'Soia',          emoji: '🫘' },
  { value: 'pesce',        label: 'Pesce',         emoji: '🐟' },
  { value: 'altro',        label: 'Altro',         emoji: '···' },
]

export const ATTREZZATURE_OPTIONS: { value: boolean; label: string }[] = [
  { value: true,  label: 'Sì' },
  { value: false, label: 'No' },
]

export const NOTE_MAX_LENGTH = 1000
```

---

## ✅ Validatori — `src/utils/validators.ts`

Ogni funzione è pura, testabile, senza side-effect.

```ts
// src/utils/validators.ts
import type { SpigaZeroFormData, FormErrors } from '@/types'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^(\+39[\s.]?)?((0[0-9]{1,4}[\s.]?[0-9]{4,8})|(3[0-9]{8,9}))$/

export const isValidEmail = (v: string): boolean => EMAIL_REGEX.test(v.trim())
export const isValidPhone = (v: string): boolean => PHONE_REGEX.test(v.replace(/\s/g, ''))

export const validateForm = (data: SpigaZeroFormData): FormErrors => {
  const errors: FormErrors = {}
  if (!data.nomeRistorante.trim() || data.nomeRistorante.trim().length < 2)
    errors.nomeRistorante = 'Nome obbligatorio (min 2 caratteri)'
  if (!data.indirizzo.trim() || data.indirizzo.trim().length < 5)
    errors.indirizzo = 'Indirizzo obbligatorio (min 5 caratteri)'
  if (!data.citta.trim() || data.citta.trim().length < 2)
    errors.citta = 'Città obbligatoria'
  if (!data.telefono.trim() || !isValidPhone(data.telefono))
    errors.telefono = 'Numero di telefono non valido'
  if (!data.email.trim() || !isValidEmail(data.email))
    errors.email = 'Email non valida'
  if (!data.tipoCucinaGF)
    errors.tipoCucinaGF = 'Seleziona il tipo di cucina gluten-free'
  if (data.tipologiePiatti.length === 0)
    errors.tipologiePiatti = 'Seleziona almeno una tipologia di piatto'
  if (data.attrezzatureSeparate === null)
    errors.attrezzatureSeparate = 'Indica se usate attrezzature separate'
  return errors
}
```

---

## 🪝 Custom Hook — `src/hooks/use-spiga-zero-form.ts`

Il cuore logico del form. **Nessun componente ha logica propria** — tutto passa da qui.

```ts
// src/hooks/use-spiga-zero-form.ts
// Implementa le seguenti responsabilità (< 100 righe: spezza in use-form-state.ts
// e use-form-submit.ts se necessario):

// STATO INIZIALE
// const INITIAL_DATA: SpigaZeroFormData = { nomeRistorante: '', indirizzo: '',
//   citta: '', telefono: '', email: '', tipoCucinaGF: null, tipologiePiatti: [],
//   certificazioni: '', attrezzatureSeparate: null, allergeniGestiti: [], noteAggiuntive: '' }

// HOOK API — deve restituire:
// {
//   formData, errors, touched, status,
//   isFormValid,          // boolean: validateForm(formData) ha 0 chiavi
//   handleTextField,      // (field: keyof SpigaZeroFormData) => (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement>) => void
//   handleTipoCucina,     // (value: TipoCucinaGF) => void
//   handleTogglePiatto,   // (value: TipologiaPiatto) => void
//   handleAttrezzature,   // (value: boolean) => void
//   handleToggleAllergene,// (value: Allergene) => void
//   handleBlur,           // (field: keyof FormErrors) => void
//   handleSubmit,         // (e: React.FormEvent) => void
// }

// LOGICA handleBlur: marca il campo touched e valida solo quel campo
// LOGICA handleSubmit:
//   1. valida tutto
//   2. se errori: setTouched tutti true + scrollToFirstError()
//   3. se valido: status = 'submitting'
//   4. simula API: await new Promise(r => setTimeout(r, 1500))
//   5. status = 'success' (o 'error' se throw)
```

---

## 🧩 Componenti UI Atomici

Per ogni componente sotto, Cursor deve creare il file corrispondente rispettando RULE-01→10.

### `src/components/ui/text-input.tsx`
```
Props (interfaccia named TextInputProps):
  id, label, value, onChange, onBlur,
  placeholder?, type?: 'text'|'email'|'tel', required?, error?, disabled?

Classi base input:
  w-full border border-border-muted rounded-input px-3.5 py-2.5
  bg-surface text-text-primary text-sm placeholder:text-text-muted
  transition-colors duration-150
  focus:outline-none focus:border-primary focus:shadow-focus
  disabled:opacity-50 disabled:cursor-not-allowed

Classi error input: border-error focus:border-error focus:shadow-none

Label: block text-sm font-semibold text-text-primary mb-1
  + asterisco: text-error ml-0.5 (se required)
```

### `src/components/ui/field-error.tsx`
```
Props: message?: string
Render solo se message è definito
Classe: flex items-center gap-1 mt-1 text-xs text-error
Icona: <AlertCircle size={12} /> da lucide-react
aria-live="polite"
```

### `src/components/ui/checkbox-option.tsx`
```
Props (CheckboxOptionProps):
  id, label, checked, onChange: (checked: boolean) => void, disabled?

Custom checkbox: w-5 h-5 rounded border-border-muted
  checked → bg-primary border-primary + checkmark SVG bianco inline
Wrapper: flex items-center gap-2.5 cursor-pointer select-none
  border border-border-muted rounded-input px-4 py-2.5
  hover:border-primary transition-colors
  checked wrapper → border-primary bg-primary/5
Min touch target: min-h-[44px]
```

### `src/components/ui/allergen-chip.tsx`
```
Props (AllergenChipProps):
  value, label, emoji, checked, onChange: (checked: boolean) => void

Layout: flex items-center gap-2 px-4 py-3 rounded-chip cursor-pointer
  border border-border-muted bg-surface select-none transition-all
  hover:border-primary
  checked → border-primary bg-primary/5 font-semibold
Emoji: text-xl aria-hidden
Min touch target: min-h-[44px]
```

### `src/components/ui/section-icon.tsx`
```
Props: icon: React.ReactNode
Wrapper: w-10 h-10 rounded-full bg-accent flex items-center justify-center
  text-text-primary shrink-0
```

### `src/components/ui/section-wrapper.tsx`
```
Props: icon, title: string, children: React.ReactNode
Layout:
  <section> con border-t border-border-muted pt-6 pb-2 px-6
  Header: flex items-center gap-3 mb-5
    <SectionIcon> + <h2 className="text-lg font-semibold text-text-primary">
  Body: children
```

### `src/components/ui/submit-button.tsx`
```
Props: disabled, status: FormStatus
Stati:
  idle/error:    "Invia Segnalazione"
  submitting:    spinner SVG animato + "Invio in corso..."
  success:       nascosto (il parent mostra SuccessBanner)
Classe base: ml-auto flex items-center gap-2 px-6 py-3 rounded-input
  bg-primary hover:bg-primary-hover text-white font-bold text-sm
  transition-colors disabled:opacity-50 disabled:cursor-not-allowed
```

### `src/components/ui/success-banner.tsx`
```
Role: alert, aria-live: assertive
Classe: flex items-start gap-3 p-5 rounded-card
  bg-success-bg border border-success-border text-success
Icona: <CheckCircle2 size={20} /> da lucide-react
Testo: "Grazie! La tua segnalazione è stata ricevuta e sarà revisionata dal team SpigaZero."
```

### `src/components/ui/error-banner.tsx`
```
Role: alert, aria-live: assertive
Classe: flex items-start gap-3 p-5 rounded-card
  bg-error-bg border border-error-border text-error
Icona: <AlertTriangle size={20} /> da lucide-react
Testo: "Si è verificato un errore. Riprova tra qualche istante."
```

---

## 🖼️ Componenti Form Compositi

### `src/components/form/form-header.tsx`
```
Layout: bg-primary px-6 py-5 flex items-center gap-4
Logo: <img src={logo} alt="SpigaZero" className="w-14 h-14" />
Titolo blocco:
  <p className="text-white font-bold text-2xl leading-tight">
    Aggiungi o aggiorna
  </p>
  <p className="text-accent font-bold text-2xl leading-tight">
    il tuo Ristorante
  </p>
Sottotitolo: text-white/70 text-sm mt-0.5
  "Aiutaci a rendere SpigaZero più completo!"
```

### `src/components/form/section-info-principali.tsx`
```
Icona sezione: <Building2 /> (lucide)
Griglia interna: grid grid-cols-1 sm:grid-cols-2 gap-4
Campi: [NomeRistorante | Indirizzo] | [Città | Telefono] | [Email — full width col-span-2 sm]
Usa TextInput per ogni campo, passa error solo se touched[field]
```

### `src/components/form/section-offerte-gf.tsx`
```
Icona sezione: <WheatOff /> (lucide)
Sotto-sezione 1 — "Il ristorante offre cucina senza glutine?" (required)
  flex flex-wrap gap-3
  Mappa TIPO_CUCINA_OPTIONS → <CheckboxOption> con onChange → handleTipoCucina
  Comportamento radio: checked = formData.tipoCucinaGF === option.value
  Se touched.tipoCucinaGF + error → <FieldError>

Sotto-sezione 2 — "Quali tipologie di piatti proponete?" (required)
  flex flex-wrap gap-3
  Mappa TIPOLOGIE_PIATTI_OPTIONS → <CheckboxOption>
  onChange → handleTogglePiatto
  Se touched.tipologiePiatti + error → <FieldError>

Sotto-sezione 3 — Certificazioni (opzionale)
  <TextInput> senza asterisco

Sotto-sezione 4 — "Usate attrezzature separate?" (required)
  flex gap-3
  Mappa ATTREZZATURE_OPTIONS → <CheckboxOption> radio-like
  onChange → handleAttrezzature
  Se touched.attrezzatureSeparate + error → <FieldError>
```

### `src/components/form/section-altri-allergeni.tsx`
```
Icona sezione: <Leaf /> (lucide)
Griglia: grid grid-cols-2 sm:grid-cols-3 gap-3
Mappa ALLERGENI_OPTIONS → <AllergenChip>
onChange → handleToggleAllergene
Nessun campo obbligatorio in questa sezione
```

### `src/components/form/section-note-aggiuntive.tsx`
```
Icona sezione: <ClipboardList /> (lucide)
Label: "Altre informazioni utili per chi cerca opzioni senza glutine:"
<textarea>:
  stesse classi di TextInput
  rows={4}, maxLength={NOTE_MAX_LENGTH}
  onChange → handleTextField('noteAggiuntive')
Contatore: <p className="text-right text-xs text-text-muted mt-1">
  {formData.noteAggiuntive.length}/{NOTE_MAX_LENGTH}
```

---

## 🧩 Composizione — `App.tsx`

```tsx
// App.tsx
// Assembla il form usando useSpigaZeroForm()
// Distribuisce i handler ai componenti figli via props esplicite (no context in v1)
//
// Layout:
// <div className="min-h-screen bg-background font-sans">
//   <FormHeader />
//   <main className="max-w-form mx-auto">
//     {status === 'success'
//       ? <SuccessBanner />
//       : (
//         <form onSubmit={handleSubmit} noValidate>
//           {status === 'error' && <ErrorBanner />}
//           <SectionInfoPrincipali ... />
//           <SectionOfferteGF ... />
//           <SectionAltriAllergeni ... />
//           <SectionNoteAggiuntive ... />
//           <div className="flex justify-end px-6 py-6">
//             <SubmitButton disabled={!isFormValid} status={status} />
//           </div>
//         </form>
//       )
//     }
//   </main>
// </div>
```

---

## 📦 Barrel Files

Crea un `index.ts` in ogni cartella che riesporta tutto con named export:

```ts
// src/types/index.ts
export * from './form-types'

// src/utils/index.ts
export * from './validators'
export * from './form-helpers'

// src/hooks/index.ts
export * from './use-spiga-zero-form'

// src/components/ui/index.ts
export * from './text-input'
export * from './field-error'
// ... tutti gli altri componenti ui

// src/components/form/index.ts
export * from './form-header'
// ... tutte le sezioni
```

---

## 🔗 Path Alias — `vite.config.ts` + `tsconfig.json`

```ts
// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: { alias: { '@': path.resolve(__dirname, './src') } },
})
```

```json
// tsconfig.json (sezione compilerOptions)
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  }
}
```

---

## 🚀 Ordine di Esecuzione

Segui **strettamente** questo ordine. Non creare un file del passo N+1 prima di aver completato il passo N.

- [ ] **STEP 1** — Setup: `npm create vite@latest`, installa dipendenze (`tailwindcss`, `lucide-react`)
- [ ] **STEP 2** — Configura `tailwind.config.ts` con tutti i token del brand
- [ ] **STEP 3** — Configura `vite.config.ts` e `tsconfig.json` con path alias `@/`
- [ ] **STEP 4** — Crea `src/styles/index.css` con direttive Tailwind + font Nunito import
- [ ] **STEP 5** — Crea `src/types/form-types.ts` + barrel `src/types/index.ts`
- [ ] **STEP 6** — Crea `src/config/form-config.ts`
- [ ] **STEP 7** — Crea `src/utils/validators.ts` + `src/utils/form-helpers.ts` + barrel
- [ ] **STEP 8** — Crea `src/hooks/use-spiga-zero-form.ts` + barrel
- [ ] **STEP 9** — Crea tutti i componenti `src/components/ui/*` + barrel
- [ ] **STEP 10** — Crea tutti i componenti `src/components/form/*` + barrel
- [ ] **STEP 11** — Assembla `App.tsx`
- [ ] **STEP 12** — Verifica: nessun file supera 100 righe, zero `any`, tutti i barrel corretti
- [ ] **STEP 13** — `npm run dev` → verifica rendering a 375px, 768px, 1280px
- [ ] **STEP 14** — Testa happy path, validazione on-blur, submit con errori

---

## 🔍 Checklist Finale (Cursor auto-verifica)

Prima di considerare il task completato, verifica ogni punto:

- [ ] Nessun file supera 100 righe (usa `wc -l src/**/*.tsx` o equivalente)
- [ ] `grep -r "any" src/` non produce risultati
- [ ] `grep -r "hardcoded color\|#5B3F\|#F5ED" src/components/` non produce risultati (i token sono solo in `tailwind.config.ts`)
- [ ] Ogni cartella ha il suo `index.ts` barrel
- [ ] Tutti gli import usano `@/` invece di percorsi relativi `../..`
- [ ] Nessun componente contiene array di dati o label statiche (tutto viene da `form-config.ts`)
- [ ] Il form è navigabile interamente da tastiera
- [ ] `npm run build` termina senza errori TypeScript
