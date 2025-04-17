import React from "react";
import cn from "@/utils/concatenate";
import * as Icons from "lucide-react";
import {LucideIcon} from "lucide-react";
import {black} from "colorette";

export default function IconTitle(
    {icon, text, className}: {
        icon?: string,
        text?: string;
        className?: string;
    }
) {
    const Icona = Icons[icon as keyof typeof Icons] as LucideIcon;
    return (<div className={cn('w-full flex flex-col items-center black gap-2 mt-4 mb-2', className)}>
        {Icona && <Icona size={36} color={'black'}/>}
        {!Icona && icon}
        {text && <h3 className = 'text-black font-bold text-2xl'>{text}</h3>}
    </div>)
}
