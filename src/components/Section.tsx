import {forwardRef, type ReactNode} from "react"
import cn from "@/utils/concatenate";

export interface SectionProps {
    id: string
    title: string
    children: ReactNode
    lucideIconName?: string,
    className?: string
}

export interface SectionLabelProps {
    id: string
    title: string
    lucideIconName?: string
}

const Section = forwardRef<HTMLElement, SectionProps>(({ id, children, className }, ref) => {
    return (
        <section id={id} className={cn("pt-10 w-full h-fit scroll-mt-8 mb-16",className)} ref={ref}>
            {children}
        </section>
    )
})

Section.displayName = "Section"

export default Section