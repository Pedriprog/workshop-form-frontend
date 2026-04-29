import { ClipboardList } from 'lucide-react'
import { NOTE_MAX_LENGTH } from '@/config'
import { SectionWrapper } from '@/components/ui'
import type { SpigaZeroFormData } from '@/types'

interface SectionNoteAggiuntiveProps {
  formData: SpigaZeroFormData
  handleTextField: (
    field: keyof SpigaZeroFormData,
  ) => (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

export const SectionNoteAggiuntive = ({
  formData,
  handleTextField,
}: SectionNoteAggiuntiveProps) => (
  <SectionWrapper icon={<ClipboardList size={20} aria-hidden />} title="Note aggiuntive">
    <label htmlFor="noteAggiuntive" className="mb-1 block text-sm font-semibold text-text-primary">
      Altre informazioni utili per chi cerca opzioni senza glutine:
    </label>
    <textarea
      id="noteAggiuntive"
      value={formData.noteAggiuntive}
      onChange={handleTextField('noteAggiuntive')}
      rows={4}
      maxLength={NOTE_MAX_LENGTH}
      className="w-full rounded-input border border-border-muted bg-surface px-3.5 py-2.5 text-sm
      text-text-primary placeholder:text-text-muted transition-colors duration-150
      focus:border-primary focus:outline-none focus:shadow-focus"
    />
    <p className="mt-1 text-right text-xs text-text-muted">
      {formData.noteAggiuntive.length}/{NOTE_MAX_LENGTH}
    </p>
  </SectionWrapper>
)
