import { Check } from 'lucide-react'

interface CheckboxOptionProps {
  id: string
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
}

export const CheckboxOption = ({
  id,
  label,
  checked,
  onChange,
  disabled = false,
}: CheckboxOptionProps) => (
  <label
    htmlFor={id}
    className={`min-h-[44px] cursor-pointer select-none rounded-input border px-4 py-2.5
    ${checked ? 'border-primary bg-primary/5' : 'border-border-muted'}
    flex items-center gap-2.5 transition-colors hover:border-primary`}
  >
    <input
      id={id}
      type="checkbox"
      checked={checked}
      onChange={(event) => onChange(event.target.checked)}
      disabled={disabled}
      className="sr-only"
    />
    <span
      className={`flex h-5 w-5 items-center justify-center rounded border
      ${checked ? 'border-primary bg-primary text-white' : 'border-border-muted bg-surface'}`}
      aria-hidden
    >
      {checked && <Check size={14} />}
    </span>
    <span className="text-sm text-text-primary">{label}</span>
  </label>
)
