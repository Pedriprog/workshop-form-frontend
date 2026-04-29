# Design Document — Form "Aggiungi o Aggiorna il tuo Ristorante" · SpigaZero

## Overview

Questo documento descrive le decisioni di design visivo, UX e architettura delle componenti per il form di segnalazione ristorante della piattaforma SpigaZero. Il form è costruito attorno a un'identità visiva calda e rassicurante, pensata per utenti con esigenze alimentari specifiche che cercano fiducia e chiarezza nelle informazioni.

---

## Design Language & Brand Identity

### Palette Colori

| Token | Valore | Utilizzo |
|---|---|---|
| `color-primary` | `#5B3F99` (viola) | Header, bottone CTA, accenti |
| `color-background` | `#F5EDDB` (beige caldo) | Sfondo sezioni e form |
| `color-accent` | `#F5C518` (giallo/oro) | Icone badge di sezione, highlights |
| `color-text-primary` | `#1A1A1A` | Testi principali, label |
| `color-error` | `#CC3300` (rosso arancio) | Asterischi obbligatori, messaggi di errore |
| `color-border` | `#D9CEBA` | Bordi input e separatori |
| `color-white` | `#FFFFFF` | Sfondo input, testo su viola |

### Tipografia

| Ruolo | Font | Peso | Dimensione |
|---|---|---|---|
| Titolo header | Sans-serif arrotondata (es. Nunito) | 700 | 28–32px |
| Titoli sezione | Sans-serif | 600 | 18px |
| Label campo | Sans-serif | 600 | 14px |
| Placeholder | Sans-serif | 400 | 14px, colore `#999` |
| Bottone CTA | Sans-serif | 700 | 15px |

### Iconografia

Le icone di sezione sono illustrative, in stile outline con sfondo badge circolare giallo (`color-accent`). Ogni sezione del form ha una propria icona tematica:

- **Informazioni principali**: icona edificio/ristorante
- **Offerte senza glutine**: icona spiga barrata
- **Altri allergeni gestiti**: icona foglia/allergeni
- **Note aggiuntive**: icona foglio con matita

Le icone degli allergeni (Lattosio, Frutta secca, Uova, Soia, Pesce, Altro) sono pictogrammi inline accanto alla label della checkbox, per favorire il riconoscimento visivo rapido.

---

## Layout & Struttura

### Griglia

Il form è a **singola colonna centrata** con larghezza massima di `760px`. All'interno delle sezioni si usa una griglia a **2 colonne** per i campi affiancati (es. Nome + Indirizzo, Città + Telefono), che collassa a 1 colonna su mobile (< 600px).

```
┌────────────────────────────────────────────────────┐
│  HEADER (viola, full-width)                        │
├────────────────────────────────────────────────────┤
│  SEZIONE 1: Informazioni principali                │
│  ┌──────────────────┐  ┌──────────────────┐        │
│  │ Nome Ristorante  │  │ Indirizzo        │        │
│  └──────────────────┘  └──────────────────┘        │
│  ┌──────────────────┐  ┌──────────────────┐        │
│  │ Città            │  │ Telefono         │        │
│  └──────────────────┘  └──────────────────┘        │
│  ┌──────────────────────────────────────────┐      │
│  │ Email                                    │      │
│  └──────────────────────────────────────────┘      │
├────────────────────────────────────────────────────┤
│  SEZIONE 2: Offerte senza glutine                  │
│  ...                                               │
├────────────────────────────────────────────────────┤
│  SEZIONE 3: Altri allergeni gestiti                │
│  ...                                               │
├────────────────────────────────────────────────────┤
│  SEZIONE 4: Note aggiuntive                        │
│  ...                                               │
├────────────────────────────────────────────────────┤
│                        [ Invia Segnalazione ]      │
└────────────────────────────────────────────────────┘
```

### Separatori di Sezione

Ogni sezione è separata da un divider orizzontale sottile (`color-border`). Il titolo di sezione è preceduto dall'icona badge circolare gialla e dal testo in bold.

---

## Componenti UI

### Input di Testo

```
border: 1px solid #D9CEBA
border-radius: 8px
padding: 10px 14px
background: #FFFFFF
font-size: 14px
placeholder-color: #999999

:focus →
  border-color: #5B3F99
  box-shadow: 0 0 0 3px rgba(91,63,153,0.15)

:error →
  border-color: #CC3300
  + messaggio di errore inline sotto il campo
```

### Checkbox

Le checkbox hanno uno stile custom:
- Bordo: `1px solid #D9CEBA`, `border-radius: 4px`
- Stato checked: sfondo `#5B3F99`, checkmark bianca
- Le opzioni di tipo "Sì/No" e "tipo cucina GF" si comportano logicamente come radio button (selezione mutuamente esclusiva) pur mantenendo l'aspetto checkbox per coerenza visiva.
- Le checkbox con icona allergene hanno layout `flex` con icona a sinistra (20×20px) e label a destra.

### Bottone "Invia Segnalazione"

```
background: #5B3F99
color: #FFFFFF
border-radius: 8px
padding: 12px 24px
font-weight: 700
float: right (allineato a destra)

:hover → background: #4A3180
:disabled → background: #C0B8D0, cursor: not-allowed
```

---

## Comportamento & Interazioni

### Validazione

- **On blur**: ogni campo obbligatorio viene validato quando l'utente lascia il campo.
- **On submit**: validazione completa di tutti i campi obbligatori; scroll automatico al primo campo con errore.
- I messaggi di errore appaiono sotto il campo, in colore `#CC3300`, con icona di warning opzionale.

### Feedback Post-Invio

Al submit avvenuto con successo:
- Il form viene sostituito (o si mostra un overlay/banner) con un messaggio di conferma:
  > *"Grazie! La tua segnalazione è stata ricevuta e sarà revisionata dal team SpigaZero."*
- Colore del banner: verde soft o viola chiaro, coerente con il brand.

In caso di errore server:
- Banner rosso con messaggio: *"Si è verificato un errore. Riprova tra qualche istante."*

### Stato Hover/Focus

- Tutti gli elementi interattivi mostrano chiaramente lo stato `:focus` con un ring viola per rispettare i requisiti di accessibilità WCAG 2.1 AA.

---

## Responsività

| Breakpoint | Layout |
|---|---|
| Desktop (≥ 768px) | Griglia 2 colonne per i campi affiancati, form centrato max 760px |
| Tablet (480–767px) | Griglia 2 colonne ridotta, padding laterale 16px |
| Mobile (< 480px) | Singola colonna, tutti i campi full-width, checkbox allergeni su 2 colonne |

---

## Accessibilità (WCAG 2.1 AA)

- Ogni `<input>` e `<textarea>` ha un `<label>` associato tramite `for`/`id`.
- I campi obbligatori sono marcati con `aria-required="true"` oltre all'asterisco visivo.
- I messaggi di errore sono collegati al campo tramite `aria-describedby`.
- Il contrasto testo/sfondo rispetta il rapporto minimo 4.5:1 per il testo normale.
- Il form è completamente navigabile via tastiera (Tab, Shift+Tab, Spazio per checkbox).
- Le icone decorative hanno `aria-hidden="true"`.

---

## Architettura dei Dati del Form

```json
{
  "ristorante": {
    "nome": "string (required)",
    "indirizzo": "string (required)",
    "citta": "string (required)",
    "telefono": "string (required)",
    "email": "string (required, format: email)"
  },
  "offerte_gluten_free": {
    "tipo_cucina": "enum: ['totalmente_gf', 'alcuni_piatti_gf'] (required)",
    "tipologie_piatti": "array: ['antipasti','primi','secondi','pizze','dessert'] (required, min 1)",
    "certificazioni": "string (optional)",
    "attrezzature_separate": "boolean (required)"
  },
  "allergeni_gestiti": {
    "lista": "array: ['lattosio','frutta_secca','uova','soia','pesce','altro'] (optional)"
  },
  "note_aggiuntive": "string (optional, max 1000 chars)"
}
```

---

## Decisioni di Design Notevoli

### Checkbox vs Radio per il tipo di cucina GF

La UI mostra due checkbox ("Cucina totalmente senza glutine" / "Abbiamo alcuni piatti senza glutine"), ma semanticamente si tratta di un'opzione mutuamente esclusiva. La scelta di mantenere l'aspetto checkbox (invece di radio button) è probabile per coerenza stilistica. In implementazione, si raccomanda di gestirle come radio logici oppure di usare reali `<input type="radio">` con styling custom che imiti le checkbox, per correttezza semantica e accessibilità.

### Separazione Allergeni da Gluten-Free

La sezione "Altri allergeni gestiti" è separata dalla sezione "Offerte senza glutine" per chiarezza concettuale: il glutine è trattato come il filtro primario della piattaforma, mentre gli altri allergeni sono informazioni complementari. Questa gerarchia visiva aiuta gli utenti celiaci a trovare subito le informazioni critiche.

### Form come contributo community

Il fatto che il form si intitoli "Invia Segnalazione" (non "Registra Ristorante") suggerisce un modello community-driven con revisione editoriale. Il design deve comunicare fiducia e trasparenza: l'utente deve capire che il suo contributo sarà verificato prima della pubblicazione.
