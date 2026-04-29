import { WheatOff } from 'lucide-react'
import {
  ATTREZZATURE_OPTIONS,
  TIPO_CUCINA_OPTIONS,
  TIPOLOGIE_PIATTI_OPTIONS,
} from '@/config'
import { CheckboxOption, FieldError, SectionWrapper, TextInput } from '@/components/ui'
import type {
  FormErrors,
  SpigaZeroFormData,
  TouchedFields,
  TipoCucinaGf,
  TipologiaPiatto,
} from '@/types'

interface SectionOfferteGfProps {
  formData: SpigaZeroFormData
  errors: FormErrors
  touched: TouchedFields
  handleTextField: (
    field: keyof SpigaZeroFormData,
  ) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleBlur: (field: keyof FormErrors) => void
  handleTipoCucina: (value: TipoCucinaGf) => void
  handleTogglePiatto: (value: TipologiaPiatto) => void
  handleAttrezzature: (value: boolean) => void
}

export const SectionOfferteGf = ({
  formData, errors, touched, handleTextField, handleBlur, handleTipoCucina, handleTogglePiatto, handleAttrezzature,
}: SectionOfferteGfProps) => (
  <SectionWrapper icon={<WheatOff size={20} aria-hidden />} title="Offerte gluten-free">
    <div className="space-y-5">
      <div>
        <p className="mb-2 text-sm font-semibold text-text-primary">Il ristorante offre cucina senza glutine? <span className="text-error">*</span></p>
        <div className="flex flex-wrap gap-3" id="tipoCucinaGf">
          {TIPO_CUCINA_OPTIONS.map((option) => (
            <CheckboxOption key={option.value} id={option.value} label={option.label}
              checked={formData.tipoCucinaGf === option.value} onChange={() => handleTipoCucina(option.value)} />
          ))}
        </div>
        <FieldError message={touched.tipoCucinaGf ? errors.tipoCucinaGf : undefined} />
      </div>
      <div>
        <p className="mb-2 text-sm font-semibold text-text-primary">Quali tipologie di piatti proponete? <span className="text-error">*</span></p>
        <div className="flex flex-wrap gap-3" id="tipologiePiatti">
          {TIPOLOGIE_PIATTI_OPTIONS.map((option) => (
            <CheckboxOption key={option.value} id={option.value} label={option.label}
              checked={formData.tipologiePiatti.includes(option.value)} onChange={() => handleTogglePiatto(option.value)} />
          ))}
        </div>
        <FieldError message={touched.tipologiePiatti ? errors.tipologiePiatti : undefined} />
      </div>
      <TextInput id="certificazioni" label="Certificazioni (opzionale)" value={formData.certificazioni}
        onChange={handleTextField('certificazioni')} onBlur={() => handleBlur('certificazioni')} />
      <div>
        <p className="mb-2 text-sm font-semibold text-text-primary">Usate attrezzature separate? <span className="text-error">*</span></p>
        <div className="flex flex-wrap gap-3" id="attrezzatureSeparate">
          {ATTREZZATURE_OPTIONS.map((option) => (
            <CheckboxOption key={option.label} id={`attrezzature-${option.label}`} label={option.label}
              checked={formData.attrezzatureSeparate === option.value} onChange={() => handleAttrezzature(option.value)} />
          ))}
        </div>
        <FieldError message={touched.attrezzatureSeparate ? errors.attrezzatureSeparate : undefined} />
      </div>
    </div>
  </SectionWrapper>
)
