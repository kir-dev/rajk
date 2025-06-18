'use client'

import {ArrowRightIcon, LucideIcon} from "lucide-react"
import ActionButton from "@/components/ActionButton";
import Image from "next/image";

interface PillarCardProps {
    title: string
    description: string
    icon: LucideIcon
    buttonText: string
    href?: string
    onAction?: () => void
}

export function PillarCard({ title, description, icon: Icon, buttonText, href }: PillarCardProps) {
    return (
        <div className="container mx-auto px-4">
            <div className="group flex flex-col gap-4 h-full w-full max-w-6xl mx-auto md:ml-[calc(50%_-_30rem)] p-6 transition-all duration-300 text-black rounded-2xl mb-20 hover:shadow-lg hover:-translate-y-1 mt-10">
                <div className="flex flex-col md:flex-row items-center gap-6">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-rajk-green to-green-600 text-white p-4 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8" />
                    </div>
                    <h3 className="text-2xl md:text-3xl font-bold">{title}</h3>
                </div>
                <div className="flex flex-col md:flex-row gap-6 mt-4">
                    <div className="flex flex-col flex-1">
                        <p className="text-lg leading-relaxed mb-6">{description}</p>
                        <ActionButton href={href} className="mt-auto self-start group-hover:bg-green-800 transition-colors">
                            {buttonText}
                            <ArrowRightIcon className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                        </ActionButton>
                    </div>
                    <div className="flex-shrink-0 overflow-hidden rounded-2xl h-[200px] w-[200px] relative md:mr-4">
                        <Image
                            src="/koli.png"
                            alt="Koli"
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}