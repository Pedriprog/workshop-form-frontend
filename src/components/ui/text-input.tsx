import { FieldError } from '@/components/ui/field-error'

interface TextInputProps {
  id: string
  label: string
  value: string
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  onBlur: () => void
  placeholder?: string
  type?: 'text' | 'email' | 'tel'
  required?: boolean
  error?: string
  disabled?: boolean
}

export const TextInput = ({
  id,
  label,
  value,
  onChange,
  onBlur,
  placeholder,
  type = 'text',
  required = false,
  error,
  disabled = false,
}: TextInputProps) => (
  <div>
    <label htmlFor={id} className="mb-1 block text-sm font-semibold text-text-primary">
      {label}
      {required && <span className="ml-0.5 text-error">*</span>}
    </label>
    <input
      id={id}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      placeholder={placeholder}
      required={required}
      disabled={disabled}
      aria-invalid={Boolean(error)}
      aria-describedby={error ? `${id}-error` : undefined}
      className={`w-full rounded-input border px-3.5 py-2.5 text-sm transition-colors duration-150
      ${error ? 'border-error focus:border-error focus:shadow-none' : 'border-border-muted'}
      bg-surface text-text-primary placeholder:text-text-muted
      focus:border-primary focus:outline-none focus:shadow-focus disabled:cursor-not-allowed disabled:opacity-50`}
    />
    <div id={`${id}-error`}>
      <FieldError message={error} />
    </div>
  </div>
)
