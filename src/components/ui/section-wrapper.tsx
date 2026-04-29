import { SectionIcon } from '@/components/ui/section-icon'

interface SectionWrapperProps {
  icon: React.ReactNode
  title: string
  children: React.ReactNode
}

export const SectionWrapper = ({ icon, title, children }: SectionWrapperProps) => (
  <section className="border-t border-border-muted px-6 pb-2 pt-6">
    <div className="mb-5 flex items-center gap-3">
      <SectionIcon icon={icon} />
      <h2 className="text-lg font-semibold text-text-primary">{title}</h2>
    </div>
    {children}
  </section>
)
