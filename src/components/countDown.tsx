// components/Countdown.tsx
'use client';

import {useEffect, useState} from 'react'
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
        <div className={cn("text-white text-3xl flex gap-4 font-bold", className)}>
            <CountdownElement value={timeLeft.days} label="nap" />
            <CountdownElement value={timeLeft.hours} label="óra" />
            <CountdownElement value={timeLeft.minutes} label="perc" />
            <CountdownElement value={timeLeft.seconds} label="mp" />
        </div>
    )
}

function CountdownElement({ value, label }: { value: number, label: string }) {
    return (
        <div className={`flex flex-col items-center border-2 p-2 rounded-lg w-28`}>
            <span className="text-4xl md:text-7xl">{value}</span> <span className="md:text-2xl font-normal">{label}</span>
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
