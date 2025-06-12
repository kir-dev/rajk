'use client'

import {ArrowRightIcon, LucideIcon} from "lucide-react"
import ActionButton from "@/components/ActionButton";
import Image from "next/image";

interface PillarCardProps {
    title: string
    description: string
    icon: LucideIcon
    buttonText: string
    onAction?: () => void
}

export function PillarCard({ title, description, icon: Icon, buttonText, onAction }: PillarCardProps) {
    return (
        <div className="flex flex-col gap-4 h-full w-full transition-all font-bold duration-200 text-black rounded-2xl mb-20">
            <div className="flex flex-col items-center h-full rounded-2xl ">
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-2xl">
                    <Icon className="w-12 h-12 rounded-2xl text-rajk-green" />
                </div>
                <div>{title}</div>
            </div>
            <div className="flex flex-row px-4">
                <div className="flex flex-col h-full rounded-2xl">
                    <div className="mt-2">{description}</div>
                    <ActionButton onClick={onAction} className="ml-auto">
                        {buttonText}
                        <ArrowRightIcon className="w-6 h-6" />
                    </ActionButton>
                </div>
                <Image src={"/koli.png"} alt={"Koli"} width={200} height={200}
                        className="rounded-2xl" />
            </div>
        </div>
    )
}
