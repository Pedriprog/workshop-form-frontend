import logo from '@/assets/images/logo.png'

export const FormHeader = () => (
  <header className="bg-primary px-6 py-5">
    <div className="mx-auto flex max-w-3xl items-center gap-4">
      <img src={logo} alt="SpigaZero" className="h-14 w-14" />
      <div>
        <p className="text-2xl font-bold leading-tight text-white">Aggiungi o aggiorna</p>
        <p className="text-2xl font-bold leading-tight text-accent">il tuo Ristorante</p>
        <p className="mt-0.5 text-sm text-white/70">Aiutaci a rendere SpigaZero piu completo!</p>
      </div>
    </div>
  </header>
)