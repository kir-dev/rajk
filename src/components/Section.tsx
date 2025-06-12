import { type ReactNode, forwardRef } from "react"

interface SectionProps {
    id: string
    title: string
    children: ReactNode
}

const Section = forwardRef<HTMLElement, SectionProps>(({ id, children }, ref) => {
    return (
        <section id={id} className="pt-10 w-full" ref={ref}>
            {children}
        </section>
    )
})

Section.displayName = "Section"

export default Section
