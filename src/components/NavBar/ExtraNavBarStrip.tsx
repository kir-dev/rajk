"use client";
import React from "react";

export default function ExtraNavBarStrip() {
    const [isOpen, setIsOpen] = React.useState(true);
    if(!isOpen) return null;
    return (<div className = 'w-full px-4 py-1 bg-foreground md:flex justify-center items-center'>
        <p>
            Ez a Rajk átmeneti oldala, amíg a régi oldalunkat kihozzuk az intenzívről. Okosba összedobta: Marci és Máté a Kir-Dev-ből.
            <span onClick={()=>setIsOpen(false)} className='font-bold ml-4 text-rajk-green underline cursor-pointer'>Bezárás</span>
        </p>
    </div>)
}
