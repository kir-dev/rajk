'use client'

import { useEffect, useRef, useState } from 'react'

export default function ScrollRevealComponent() {
    const [isVisible, setIsVisible] = useState(false)
    const triggerRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting)
            },
            {
                threshold: 0.5, // 50% látszódjon a trigger elem
            }
        )

        if (triggerRef.current) {
            observer.observe(triggerRef.current)
        }

        return () => {
            if (triggerRef.current) {
                observer.unobserve(triggerRef.current)
            }
        }
    }, [])

    return (
        <div className="space-y-10">
            <div style={{ height: '100vh' }}>🔼 Görgess le!</div>

            <div ref={triggerRef} className="h-32 bg-red-100">
                👁 Trigger pont
            </div>

            {isVisible && (
                <div className="p-4 bg-green-300 transition-opacity duration-500 ease-in-out">
                    ✅ Ez a komponens csak akkor látszik, ha a trigger pont megjelent!
                </div>
            )}
        </div>
    )
}