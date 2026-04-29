import { CheckCircle2 } from 'lucide-react'

export const SuccessBanner = () => (
  <div
    role="alert"
    aria-live="assertive"
    className="m-6 flex items-start gap-3 rounded-card border border-success-border bg-success-bg p-5 text-success"
  >
    <CheckCircle2 size={20} aria-hidden />
    <p>Grazie! La tua segnalazione è stata ricevuta e sarà revisionata dal team SpigaZero.</p>
  </div>
)
