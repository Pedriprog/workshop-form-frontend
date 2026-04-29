interface SectionIconProps {
  icon: React.ReactNode
}

export const SectionIcon = ({ icon }: SectionIconProps) => (
  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent text-text-primary">
    {icon}
  </div>
)
