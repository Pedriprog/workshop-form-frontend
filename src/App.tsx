import {
  ErrorBanner,
  SubmitButton,
  SuccessBanner,
} from '@/components/ui'
import {
  FormHeader,
  SectionAltriAllergeni,
  SectionInfoPrincipali,
  SectionNoteAggiuntive,
  SectionOfferteGf,
} from '@/components/form'
import { useSpigaZeroForm } from '@/hooks'

export default function App() {
  const form = useSpigaZeroForm()

  return (
    <div className="min-h-screen bg-background font-sans">
      <FormHeader />
      <main className="mx-auto max-w-form pb-10">
        {form.status === 'success' ? (
          <SuccessBanner />
        ) : (
          <form onSubmit={form.handleSubmit} noValidate className="rounded-b-card bg-surface pb-4 shadow-sm">
            {form.status === 'error' && <ErrorBanner />}
            <SectionInfoPrincipali
              formData={form.formData}
              errors={form.errors}
              touched={form.touched}
              handleTextField={form.handleTextField}
              handleBlur={form.handleBlur}
            />
            <SectionOfferteGf
              formData={form.formData}
              errors={form.errors}
              touched={form.touched}
              handleTextField={form.handleTextField}
              handleBlur={form.handleBlur}
              handleTipoCucina={form.handleTipoCucina}
              handleTogglePiatto={form.handleTogglePiatto}
              handleAttrezzature={form.handleAttrezzature}
            />
            <SectionAltriAllergeni
              formData={form.formData}
              handleToggleAllergene={form.handleToggleAllergene}
            />
            <SectionNoteAggiuntive
              formData={form.formData}
              handleTextField={form.handleTextField}
            />
            <div className="flex justify-end px-6 py-6">
              <SubmitButton disabled={!form.isFormValid} status={form.status} />
            </div>
          </form>
        )}
      </main>
    </div>
  )
}

