export type TipoCucinaGf = 'totalmente_gf' | 'alcuni_piatti_gf'

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
  nomeRistorante: string
  indirizzo: string
  citta: string
  telefono: string
  email: string
  tipoCucinaGf: TipoCucinaGf | null
  tipologiePiatti: TipologiaPiatto[]
  certificazioni: string
  attrezzatureSeparate: boolean | null
  allergeniGestiti: Allergene[]
  noteAggiuntive: string
}

export type FormErrors = Partial<Record<keyof SpigaZeroFormData, string>>
export type TouchedFields = Partial<Record<keyof SpigaZeroFormData, boolean>>
