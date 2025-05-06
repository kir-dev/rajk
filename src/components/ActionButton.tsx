"use client";
import cn from "@/utils/concatenate";
import React from "react";
import Link from "next/link";

export default function ActionButton(
    {onClick, className, children, href, text}: {
        text?: string;
        onClick?: () => void;
        href?: string;
        className?: string;
        children?: React.ReactNode;
    }
) {
    return (<Link href = {href ? href : ''}>
        <button
            className = {cn('m-2 font-bold bg-rajk-green text-foreground py-2 px-4 rounded-md h-fit flex gap-2 items-center hover:bg-green-700 duration-100', className)}
            onClick = {href? () => {} : onClick}>
            {text}
            {children}
        </button>
    </Link>)
}
