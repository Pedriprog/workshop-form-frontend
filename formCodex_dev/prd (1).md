# PRD — Form "Aggiungi o Aggiorna il tuo Ristorante" · SpigaZero

## Executive Summary

SpigaZero è una piattaforma dedicata alla ricerca di ristoranti con offerte senza glutine e a basso contenuto allergenico. Questo documento definisce i requisiti di prodotto per il form di segnalazione/aggiornamento ristorante, che consente a utenti e gestori di contribuire al database della piattaforma con informazioni strutturate e verificabili.

---

## Obiettivi di Prodotto

- Permettere a chiunque (utente o ristoratore) di aggiungere un nuovo ristorante al database di SpigaZero.
- Permettere di aggiornare le informazioni di un ristorante già esistente.
- Raccogliere dati sufficienti a costruire profili affidabili per persone celiache o con intolleranze alimentari.
- Ridurre le segnalazioni incomplete tramite validazione lato client e campo obbligatori chiari.

---

## Utenti Target

| Segmento | Descrizione | Motivazione principale |
|---|---|---|
| Celiaci / intolleranti | Persone con celiachia o intolleranza al glutine | Trovare ristoranti sicuri |
| Ristoratori | Titolari o gestori di ristoranti | Aumentare la propria visibilità |
| Utenti generici | Chiunque voglia segnalare un locale | Contribuire alla community |

---

## Scope del Form

### In Scope

- Raccolta dati anagrafici del ristorante (nome, indirizzo, città, telefono, email).
- Classificazione dell'offerta gluten-free (totale o parziale).
- Tipologie di piatti senza glutine offerti (antipasti, primi, secondi, pizze, dessert).
- Certificazioni e riconoscimenti (es. AIC — Associazione Italiana Celiachia).
- Uso di attrezzature separate per la preparazione senza glutine.
- Gestione di altri allergeni principali (lattosio, frutta secca, uova, soia, pesce, altro).
- Note aggiuntive in testo libero.
- Invio segnalazione tramite bottone "Invia Segnalazione".

### Out of Scope (v1)

- Upload di foto del menu o del locale.
- Sistema di verifica automatica delle certificazioni.
- Login obbligatorio per l'invio.
- Integrazione con Google Maps o geocoding automatico.
- Notifiche email di conferma all'utente.

---

## Requisiti Funzionali

### RF-01 — Sezione Informazioni Principali

| ID | Campo | Tipo | Obbligatorio | Validazione |
|---|---|---|---|---|
| RF-01.1 | Nome Ristorante | Text input | ✅ | Min 2 caratteri |
| RF-01.2 | Indirizzo | Text input | ✅ | Min 5 caratteri |
| RF-01.3 | Città | Text input | ✅ | Min 2 caratteri |
| RF-01.4 | Telefono | Text input | ✅ | Formato E.164 o nazionale IT |
| RF-01.5 | Email | Email input | ✅ | Formato email valido |

### RF-02 — Sezione Offerte Senza Glutine

| ID | Campo | Tipo | Obbligatorio | Note |
|---|---|---|---|---|
| RF-02.1 | Tipo di cucina gluten-free | Checkbox (2 opzioni) | ✅ | Selezione singola logica: "Totalmente GF" / "Alcuni piatti GF" |
| RF-02.2 | Tipologie di piatti GF | Checkbox multiplo | ✅ | Antipasti, Primi, Secondi, Pizze, Dessert |
| RF-02.3 | Certificazioni | Text input | ❌ | Campo libero (es. AIC, ISO) |
| RF-02.4 | Attrezzature separate | Checkbox (Sì/No) | ✅ | Selezione singola |

### RF-03 — Sezione Altri Allergeni Gestiti

| ID | Campo | Tipo | Obbligatorio | Note |
|---|---|---|---|---|
| RF-03.1 | Allergeni gestiti | Checkbox multiplo | ❌ | Lattosio, Frutta secca, Uova, Soia, Pesce, Altro |

### RF-04 — Sezione Note Aggiuntive

| ID | Campo | Tipo | Obbligatorio | Note |
|---|---|---|---|---|
| RF-04.1 | Note libere | Textarea | ❌ | Max 1000 caratteri consigliati |

### RF-05 — Invio

- Il bottone "Invia Segnalazione" è attivo solo se tutti i campi obbligatori sono compilati e validi.
- Al submit, il sistema deve mostrare un feedback di conferma (successo o errore).
- Le segnalazioni entrano in uno stato "in revisione" prima della pubblicazione nel database.

---

## Requisiti Non Funzionali

- **Accessibilità**: Il form deve rispettare le linee guida WCAG 2.1 livello AA (label associate, contrasto colori, navigazione da tastiera).
- **Responsività**: Il layout deve adattarsi a mobile (< 768px), tablet e desktop.
- **Performance**: Il form deve caricarsi in meno di 2 secondi su connessione 4G.
- **Privacy**: I dati raccolti devono essere trattati in conformità al GDPR. L'email del segnalante non deve essere pubblicata nel profilo pubblico del ristorante.
- **Sicurezza**: Protezione anti-spam (es. honeypot o reCAPTCHA v3) sull'invio del form.

---

## Flusso Utente (Happy Path)

1. L'utente accede alla pagina del form tramite CTA nella piattaforma SpigaZero.
2. Compila i campi della sezione "Informazioni principali".
3. Seleziona il tipo di offerta gluten-free e le tipologie di piatti.
4. (Opzionale) Inserisce certificazioni e seleziona gli allergeni gestiti.
5. (Opzionale) Aggiunge note aggiuntive.
6. Clicca "Invia Segnalazione".
7. Riceve un messaggio di conferma: la segnalazione è in attesa di revisione.

---

## Criteri di Accettazione

- [ ] Tutti i campi obbligatori mostrano un asterisco rosso e un messaggio di errore inline se lasciati vuoti al submit.
- [ ] Il campo email valida il formato prima dell'invio.
- [ ] Il form non permette la selezione contemporanea di "Cucina totalmente senza glutine" e "Abbiamo alcuni piatti senza glutine" come se fossero indipendenti (comportamento radio logico).
- [ ] Il bottone "Invia Segnalazione" è disabilitato fino al completamento dei campi obbligatori.
- [ ] Il form è completamente navigabile da tastiera.
- [ ] Il design è fedele all'identità visiva SpigaZero (palette viola/beige/giallo, icone illustrative).

---

## Metriche di Successo

- **Tasso di completamento form**: ≥ 70% degli utenti che iniziano il form lo completano.
- **Tasso di errore al submit**: < 15% degli invii genera errori di validazione.
- **Segnalazioni approvate**: ≥ 60% delle segnalazioni ricevute supera la revisione senza necessità di integrazione dati.
- **Time-to-complete**: Tempo medio di compilazione ≤ 3 minuti.
