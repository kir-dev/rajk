'use client'

import {ArrowRightIcon, LucideIcon} from "lucide-react"
import ActionButton from "@/components/ActionButton";

interface PillarCardProps {
    title: string
    description: string
    icon: LucideIcon
    buttonText: string
    onAction?: () => void
}

export function PillarCard({ title, description, icon: Icon, buttonText, onAction }: PillarCardProps) {
    return (
        <div className="flex flex-col gap-4 h-full transition-all font-bold duration-200 hover:shadow-md text-black border-2 rounded-2xl p-4">
            <div className="flex flex-col items-center h-full rounded-2xl ">
                <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-2xl">
                    <Icon className="w-12 h-12 rounded-2xl text-rajk-green" />
                </div>
                <div>{title}</div>
            </div>
            <div className="flex flex-col h-full rounded-2xl">
                <div className="mt-2">{description}</div>
                <ActionButton onClick={onAction} className="ml-auto">
                    {buttonText}
                    <ArrowRightIcon className="w-6 h-6" />
                </ActionButton>
            </div>
        </div>
    )
}
