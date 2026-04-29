import { AlertTriangle } from 'lucide-react'

export const ErrorBanner = () => (
  <div
    role="alert"
    aria-live="assertive"
    className="mx-6 mt-6 flex items-start gap-3 rounded-card border border-error-border bg-error-bg p-5 text-error"
  >
    <AlertTriangle size={20} aria-hidden />
    <p>Si e verificato un errore. Riprova tra qualche istante.</p>
  </div>
)
