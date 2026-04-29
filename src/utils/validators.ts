import type { FormErrors, SpigaZeroFormData } from '@/types'

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const PHONE_REGEX = /^(\+39[\s.]?)?((0[0-9]{1,4}[\s.]?[0-9]{4,8})|(3[0-9]{8,9}))$/

export const isValidEmail = (value: string): boolean => EMAIL_REGEX.test(value.trim())

export const isValidPhone = (value: string): boolean =>
  PHONE_REGEX.test(value.trim().replace(/\s/g, ''))

export const validateForm = (data: SpigaZeroFormData): FormErrors => {
  const errors: FormErrors = {}

  if (!data.nomeRistorante.trim() || data.nomeRistorante.trim().length < 2) {
    errors.nomeRistorante = 'Nome obbligatorio (min 2 caratteri)'
  }
  if (!data.indirizzo.trim() || data.indirizzo.trim().length < 5) {
    errors.indirizzo = 'Indirizzo obbligatorio (min 5 caratteri)'
  }
  if (!data.citta.trim() || data.citta.trim().length < 2) errors.citta = 'Città obbligatoria'
  if (!data.telefono.trim() || !isValidPhone(data.telefono)) {
    errors.telefono = 'Numero di telefono non valido'
  }
  if (!data.email.trim() || !isValidEmail(data.email)) errors.email = 'Email non valida'
  if (!data.tipoCucinaGf) errors.tipoCucinaGf = 'Seleziona il tipo di cucina gluten-free'
  if (data.tipologiePiatti.length === 0) {
    errors.tipologiePiatti = 'Seleziona almeno una tipologia di piatto'
  }
  if (data.attrezzatureSeparate === null) {
    errors.attrezzatureSeparate = 'Indica se usate attrezzature separate'
  }
  return errors
}
