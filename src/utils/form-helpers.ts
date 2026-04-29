import type { FormErrors } from '@/types'

const FIELD_ORDER: (keyof FormErrors)[] = [
  'nomeRistorante',
  'indirizzo',
  'citta',
  'telefono',
  'email',
  'tipoCucinaGf',
  'tipologiePiatti',
  'attrezzatureSeparate',
]

export const scrollToFirstError = (errors: FormErrors): void => {
  const firstError = FIELD_ORDER.find((field) => Boolean(errors[field]))
  if (!firstError) return
  const element = document.getElementById(firstError)
  element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  if ('focus' in (element ?? {})) (element as HTMLElement).focus()
}
