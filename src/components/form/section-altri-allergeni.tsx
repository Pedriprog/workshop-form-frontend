import { Leaf } from 'lucide-react'
import { ALLERGENI_OPTIONS } from '@/config'
import { AllergenChip, SectionWrapper } from '@/components/ui'
import type { Allergene, SpigaZeroFormData } from '@/types'

interface SectionAltriAllergeniProps {
  formData: SpigaZeroFormData
  handleToggleAllergene: (value: Allergene) => void
}

export const SectionAltriAllergeni = ({
  formData,
  handleToggleAllergene,
}: SectionAltriAllergeniProps) => (
  <SectionWrapper icon={<Leaf size={20} aria-hidden />} title="Altri allergeni gestiti">
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
      {ALLERGENI_OPTIONS.map((option) => (
        <AllergenChip
          key={option.value}
          value={option.value}
          label={option.label}
          emoji={option.emoji}
          checked={formData.allergeniGestiti.includes(option.value)}
          onChange={() => handleToggleAllergene(option.value)}
        />
      ))}
    </div>
  </SectionWrapper>
)
