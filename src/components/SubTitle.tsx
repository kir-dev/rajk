import React from "react";
import cn from "@/utils/concatenate";

export default function SubTitle(
    {children, text, className}: {
        children?: React.ReactNode,
        text?: string;
        className?: string;
    }
) {
    return (<div className={cn('w-full flex flex-col items-center', className)}>
        {text && <h2 className = 'text-black font-bold text-3xl mt-4 mb-2'>{text}</h2>}
        {!text && children}
        <div className='bg-rajk-green w-20 h-1'></div>
    </div>)
}
