import { AlertCircle } from 'lucide-react'

interface FieldErrorProps {
  message?: string
}

export const FieldError = ({ message }: FieldErrorProps) => {
  if (!message) return null
  return (
    <p className="mt-1 flex items-center gap-1 text-xs text-error" aria-live="polite">
      <AlertCircle size={12} aria-hidden />
      <span>{message}</span>
    </p>
  )
}
