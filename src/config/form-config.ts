import type { Allergene, TipoCucinaGf, TipologiaPiatto } from '@/types'

export const NOTE_MAX_LENGTH = 400

export const TIPO_CUCINA_OPTIONS: { value: TipoCucinaGf; label: string }[] = [
  { value: 'totalmente_gf', label: 'Cucina totalmente senza glutine' },
  { value: 'alcuni_piatti_gf', label: 'Abbiamo alcuni piatti senza glutine' },
]

export const TIPOLOGIE_PIATTI_OPTIONS: { value: TipologiaPiatto; label: string }[] =
  [
    { value: 'antipasti', label: 'Antipasti' },
    { value: 'primi', label: 'Primi' },
    { value: 'secondi', label: 'Secondi' },
    { value: 'pizze', label: 'Pizze' },
    { value: 'dessert', label: 'Dessert' },
  ]

export const ATTREZZATURE_OPTIONS: { value: boolean; label: string }[] = [
  { value: true, label: 'Sì' },
  { value: false, label: 'No' },
]

export const ALLERGENI_OPTIONS: {
  value: Allergene
  label: string
  emoji: string
}[] = [
  { value: 'lattosio', label: 'Lattosio', emoji: '🥛' },
  { value: 'frutta_secca', label: 'Frutta secca', emoji: '🥜' },
  { value: 'uova', label: 'Uova', emoji: '🥚' },
  { value: 'soia', label: 'Soia', emoji: '🫘' },
  { value: 'pesce', label: 'Pesce', emoji: '🐟' },
  { value: 'altro', label: 'Altro', emoji: '⚪' },
]
