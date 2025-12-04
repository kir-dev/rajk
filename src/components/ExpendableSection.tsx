import {ReactNode, useState} from "react";
import {ChevronDown} from "lucide-react";
import {cn} from "@/lib/utils";

interface ExpandableSectionProps {
    title: string
    icon?: ReactNode
    children: ReactNode
    className?: string
}

export function ExpandableSection({title, icon, children, className}: ExpandableSectionProps) {
    const [isOpen, setIsOpen] = useState(true)

    return (
        <div className={className}>
            <button
                type="button"
                className="flex w-full items-center justify-between gap-4 py-2 text-left"
                onClick={() => setIsOpen(prev => !prev)}
                aria-expanded={isOpen}
            >
                <span className="flex items-center gap-2 text-lg font-semibold text-background">
                    {icon}
                    {title}
                </span>
                <ChevronDown
                    className={cn(
                        "w-5 h-5 text-muted-foreground transition-transform",
                        isOpen && "rotate-180",
                    )}
                />
            </button>
            {isOpen && <div className="mt-4">{children}</div>}
        </div>
    )
}