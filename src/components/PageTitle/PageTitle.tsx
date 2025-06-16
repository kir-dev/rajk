import React from "react";
import cn from "@/utils/concatenate";
import Strip from "@/components/PageTitle/Strip";

export default function PageTitle({text, className}: {
    className?: string,
    text: string;
}) {
    return (
        <div className = {cn('relative w-full flex flex-col items-center h-fit py-32 overflow-hidden', className)}>
            {/* Background strips */}
            <div
                className = "absolute top-0 left-0 w-full h-full -z-10 flex flex-col gap-4 pointer-events-none bg-rajk-green">
                <Strip text = {"Rajk"} color={'purple'}/>
                <Strip text = {text}  color={'blue'}/>
                <Strip text = {text}  color={'blue'}/>
                <Strip text = {"Sose érhet véget"}  color={'purple'}/>
                <Strip text = {text}  color={'blue'}/>
            </div>
            
            <div className = 'py-2 pb-4 px-8 bg-rajk-cream flex flex-col items-center '>
                
                <h2 className = "text-foreground font-bold text-6xl mt-4 mb-2 z-10">{text}</h2>
                <div className = "bg-rajk-green w-20 h-1 z-10"></div>
            </div>
        </div>
    );
}
