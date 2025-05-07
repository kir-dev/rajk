// components/Countdown.tsx
'use client'

import { useEffect, useState } from 'react'
import cn from "@/utils/concatenate";

export default function Countdown({ targetDate, className }: { targetDate: Date, className?: string }) {
    const [timeLeft, setTimeLeft] = useState(getTimeRemaining(targetDate))

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getTimeRemaining(targetDate))
        }, 1000)

        return () => clearInterval(timer)
    }, [targetDate])

    if (timeLeft.total <= 0) {
        return <p className="text-2xl font-bold text-green-500">Times up!</p>
    }

    return (
        <div className={cn("text-white text-3xl flex gap-8 font-mono", className)}>
            <div className="flex flex-col items-center">
                <span className="text-7xl">{timeLeft.days}</span> <span className="text-2xl">Nap</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-7xl">{timeLeft.hours}</span> <span className="text-2xl">óra</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-7xl">{timeLeft.minutes}</span> <span className="text-2xl">perc</span>
            </div>
            <div className="flex flex-col items-center">
                <span className="text-7xl">{timeLeft.seconds}</span> <span className="text-2xl">sec</span>
            </div>
        </div>
    )
}

function getTimeRemaining(target: Date) {
    const total = target.getTime() - new Date().getTime()
    const seconds = Math.floor((total / 1000) % 60)
    const minutes = Math.floor((total / 1000 / 60) % 60)
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24)
    const days = Math.floor(total / (1000 * 60 * 60 * 24))

    return { total, days, hours, minutes, seconds }
}