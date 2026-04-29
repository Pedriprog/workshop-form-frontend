import type { FormStatus } from '@/types'

interface SubmitButtonProps {
  disabled: boolean
  status: FormStatus
}

const BUTTON_LABELS: Record<Exclude<FormStatus, 'success' | 'submitting'>, string> = {
  idle: 'Invia Segnalazione',
  error: 'Invia Segnalazione',
}

export const SubmitButton = ({ disabled, status }: SubmitButtonProps) => {
  if (status === 'success') return null
  return (
    <button
      type="submit"
      disabled={disabled || status === 'submitting'}
      className="ml-auto flex items-center gap-2 rounded-input bg-primary px-6 py-3 text-sm font-bold
      text-white transition-colors hover:bg-primary-hover disabled:cursor-not-allowed disabled:opacity-50"
    >
      {status === 'submitting' && (
        <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
      )}
      {status === 'submitting' ? 'Invio in corso...' : BUTTON_LABELS[status]}
    </button>
  )
}
