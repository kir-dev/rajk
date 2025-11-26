import React from "react";
import Section, {SectionLabelProps, SectionProps} from "@/components/Section";
import VertNavbar from "@/components/VertNavbar";


export default function VertNavBarLayout({children}: { children: React.ReactNode }) {
    const sections = React.Children.toArray(children)
        .map((child) => {
            if (React.isValidElement(child) && child.type === Section) {
                const props = child.props as SectionProps
                return {id: props.id, title: props.title, lucideIconName: props.lucideIconName} as SectionLabelProps
            }
            return null
        })
        .filter(Boolean) as SectionLabelProps[]

    ;

    return (
        <div className = "flex flex-row h-fit w-full relative">
            <div className = "absolute left-0 top-0 h-full z-30 md:block max-md:hidden">
                <VertNavbar sections = {sections}/>
            </div>
            <div className = "h-fit w-full flex flex-col px-4">
                {children}
            </div>
        </div>
    )
}