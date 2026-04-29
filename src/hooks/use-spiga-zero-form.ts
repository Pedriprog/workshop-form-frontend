import { useMemo, useState } from 'react'
import type {
  Allergene,
  FormErrors,
  FormStatus,
  SpigaZeroFormData,
  TipoCucinaGf,
  TipologiaPiatto,
  TouchedFields,
} from '@/types'
import { scrollToFirstError, validateForm } from '@/utils'

const INITIAL_DATA: SpigaZeroFormData = {
  nomeRistorante: '',
  indirizzo: '',
  citta: '',
  telefono: '',
  email: '',
  tipoCucinaGf: null,
  tipologiePiatti: [],
  certificazioni: '',
  attrezzatureSeparate: null,
  allergeniGestiti: [],
  noteAggiuntive: '',
}

export const useSpigaZeroForm = () => {
  const [formData, setFormData] = useState(INITIAL_DATA)
  const [touched, setTouched] = useState<TouchedFields>({})
  const [status, setStatus] = useState<FormStatus>('idle')
  const errors = useMemo(() => validateForm(formData), [formData])
  const isFormValid = useMemo(() => Object.keys(errors).length === 0, [errors])
  const handleTextField =
    (field: keyof SpigaZeroFormData) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setFormData((prev) => ({ ...prev, [field]: event.target.value }))
  const handleTipoCucina = (value: TipoCucinaGf) =>
    setFormData((prev) => ({ ...prev, tipoCucinaGf: value }))
  const handleTogglePiatto = (value: TipologiaPiatto) =>
    setFormData((prev) => ({
      ...prev,
      tipologiePiatti: prev.tipologiePiatti.includes(value)
        ? prev.tipologiePiatti.filter((item) => item !== value)
        : [...prev.tipologiePiatti, value],
    }))
  const handleAttrezzature = (value: boolean) =>
    setFormData((prev) => ({ ...prev, attrezzatureSeparate: value }))
  const handleToggleAllergene = (value: Allergene) =>
    setFormData((prev) => ({
      ...prev,
      allergeniGestiti: prev.allergeniGestiti.includes(value)
        ? prev.allergeniGestiti.filter((item) => item !== value)
        : [...prev.allergeniGestiti, value],
    }))
  const handleBlur = (field: keyof FormErrors) =>
    setTouched((prev) => ({ ...prev, [field]: true }))
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const nextErrors = validateForm(formData)
    if (Object.keys(nextErrors).length > 0) {
      const touchedAll = Object.keys(formData).reduce<TouchedFields>((acc, key) => {
        acc[key as keyof SpigaZeroFormData] = true
        return acc
      }, {})
      setTouched(touchedAll)
      setStatus('error')
      scrollToFirstError(nextErrors)
      return
    }
    try {
      setStatus('submitting')
      await new Promise((resolve) => setTimeout(resolve, 1500))
      setStatus('success')
    } catch {
      setStatus('error')
    }
  }

  return {
    formData,
    errors,
    touched,
    status,
    isFormValid,
    handleTextField,
    handleTipoCucina,
    handleTogglePiatto,
    handleAttrezzature,
    handleToggleAllergene,
    handleBlur,
    handleSubmit,
  }
}
