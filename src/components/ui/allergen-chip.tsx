interface AllergenChipProps {
  value: string
  label: string
  emoji: string
  checked: boolean
  onChange: (checked: boolean) => void
}

export const AllergenChip = ({
  value,
  label,
  emoji,
  checked,
  onChange,
}: AllergenChipProps) => (
  <label
    htmlFor={value}
    className={`min-h-[44px] cursor-pointer select-none rounded-chip border px-4 py-3
    ${checked ? 'border-primary bg-primary/5 font-semibold' : 'border-border-muted bg-surface'}
    flex items-center gap-2 transition-all hover:border-primary`}
  >
    <input
      id={value}
      type="checkbox"
      checked={checked}
      onChange={(event) => onChange(event.target.checked)}
      className="sr-only"
    />
    <span className="text-xl" aria-hidden>
      {emoji}
    </span>
    <span className="text-sm text-text-primary">{label}</span>
  </label>
)
