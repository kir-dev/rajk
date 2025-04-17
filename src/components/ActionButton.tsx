import cn from "@/utils/concatenate";
import React from "react";
import Link from "next/link";

export default function ActionButton(
    {onClick, className, children, href}: {
        text?: string;
        onClick?: () => void;
        href?: string;
        className?: string;
        children?: React.ReactNode;
    }
) {
    return (<Link href = {href ? href : ''}>
        <button
            className = {cn('font-bold bg-rajk-green text-foreground py-2 px-4 rounded-md h-fit flex gap-2 items-center hover:bg-green-700 duration-100', className)}
            onClick = {href? () => {} : onClick}>
            {children}
        </button>
    </Link>)
}
