"use client";
import React from "react";
import ActionButton from "../ActionButton";

export default function ExtraNavBarStrip() {
    const [isOpen, setIsOpen] = React.useState(false);
    if(!isOpen) return null;
    return (<div className = 'w-full h-10 bg-foreground md:flex justify-between'>
        <p>
            Ez a Rajk átmeneti oldala, hiszen a régi beszart.
        </p>
        <p>
            Okosba összedobta Marci és Máté a Kir-Dev-ből.
        </p>
        <ActionButton onClick={() => setIsOpen(false)}>Bezárás</ActionButton>
    </div>)
}
