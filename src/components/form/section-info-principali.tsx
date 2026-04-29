import { Building2 } from 'lucide-react'
import { SectionWrapper, TextInput } from '@/components/ui'
import type { FormErrors, SpigaZeroFormData, TouchedFields } from '@/types'

interface SectionInfoPrincipaliProps {
  formData: SpigaZeroFormData
  errors: FormErrors
  touched: TouchedFields
  handleTextField: (
    field: keyof SpigaZeroFormData,
  ) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleBlur: (field: keyof FormErrors) => void
}

export const SectionInfoPrincipali = ({
  formData,
  errors,
  touched,
  handleTextField,
  handleBlur,
}: SectionInfoPrincipaliProps) => (
  <SectionWrapper icon={<Building2 size={20} aria-hidden />} title="Informazioni principali">
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      <TextInput id="nomeRistorante" label="Nome ristorante" value={formData.nomeRistorante}
        onChange={handleTextField('nomeRistorante')} onBlur={() => handleBlur('nomeRistorante')}
        required error={touched.nomeRistorante ? errors.nomeRistorante : undefined} />
      <TextInput id="indirizzo" label="Indirizzo" value={formData.indirizzo}
        onChange={handleTextField('indirizzo')} onBlur={() => handleBlur('indirizzo')}
        required error={touched.indirizzo ? errors.indirizzo : undefined} />
      <TextInput id="citta" label="Citta" value={formData.citta}
        onChange={handleTextField('citta')} onBlur={() => handleBlur('citta')}
        required error={touched.citta ? errors.citta : undefined} />
      <TextInput id="telefono" label="Telefono" type="tel" value={formData.telefono}
        onChange={handleTextField('telefono')} onBlur={() => handleBlur('telefono')}
        required error={touched.telefono ? errors.telefono : undefined} />
      <div className="sm:col-span-2">
        <TextInput id="email" label="Email" type="email" value={formData.email}
          onChange={handleTextField('email')} onBlur={() => handleBlur('email')}
          required error={touched.email ? errors.email : undefined} />
      </div>
    </div>
  </SectionWrapper>
)
