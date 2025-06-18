'use client';

import { useState, useEffect, useRef } from "react";
import WawyBorder from "@/components/WawyBorder";

interface StatisticsProps {
    isLast?: boolean;
    color: "green" | "blue" | "purple" | "cream";
    szin: "zold" | "kek" | "lila" | "bezs";
}

export default function Statistics(props: StatisticsProps) {
    // Final values for the statistics
    const finalValues = {
        courses: 48,
        tdkSubmitted: 201,
        tdkWinners: 93
    };

    // Current animated values
    const [courseCount, setCourseCount] = useState(0);
    const [tdkSubmittedCount, setTdkSubmittedCount] = useState(0);
    const [tdkWinnersCount, setTdkWinnersCount] = useState(0);

    // Refs to track animation state
    const animationTriggered = useRef(false);
    const statsRef = useRef<HTMLDivElement>(null);

    // Background class based on props
    const bgClass = (() => {
        switch (props.szin) {
            case "bezs": return "bg-bezs";
            case "kek": return "bg-kek";
            case "lila": return "bg-lila";
            case "zold": return "bg-zold";
            default: return "bg-zold";
        }
    })();

    useEffect(() => {
        if (!statsRef.current) return;

        // Store a reference to the current DOM node
        const currentRef = statsRef.current;

        const observer = new IntersectionObserver(
            (entries) => {
                // If the stats component is in view and animation hasn't run yet
                if (entries[0].isIntersecting && !animationTriggered.current) {
                    animationTriggered.current = true;

                    // Animation durations (ms)
                    const animationDuration = 1500;
                    const fps = 30;
                    const totalFrames = animationDuration / (1000 / fps);

                    let frame = 0;

                    const interval = setInterval(() => {
                        frame++;
                        const progress = 1 - Math.pow(2, -10 * frame / totalFrames);

                        setCourseCount(Math.min(
                            Math.round(finalValues.courses * progress),
                            finalValues.courses
                        ));

                        setTdkSubmittedCount(Math.min(
                            Math.round(finalValues.tdkSubmitted * progress),
                            finalValues.tdkSubmitted
                        ));

                        setTdkWinnersCount(Math.min(
                            Math.round(finalValues.tdkWinners * progress),
                            finalValues.tdkWinners
                        ));

                        if (frame >= totalFrames) {
                            clearInterval(interval);
                        }
                    }, 1000 / fps);

                    return () => clearInterval(interval);
                }
            },
            { threshold: 0.6 }
        );

        observer.observe(currentRef);

        return () => {
            observer.unobserve(currentRef);
        };
    }, [finalValues.courses, finalValues.tdkSubmitted, finalValues.tdkWinners]);

    return(
        <div className="relative w-full">
            <WawyBorder direction={"top"} color={props.color} szin={props.szin}/>
            <div className={`${bgClass} text-white py-16 w-full`}>
                {/* Content container with adjusted positioning */}
                <div className="max-w-6xl mx-auto md:ml-[calc(50%_-_30rem)] px-8" ref={statsRef}>
                    {/* Header */}
                    <div className="text-center mb-16">
                        <h2 className="text-4xl md:text-5xl font-bold mb-2">SZAKMA</h2>
                        <div className="w-20 h-1 mx-auto"></div>
                    </div>

                    {/* Statistics Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        {/* First Stat */}
                        <div className="space-y-4">
                            <p className="text-lg md:text-xl font-light">A 2022/23-es tanévben</p>
                            <div className="text-6xl md:text-7xl font-bold relative">
                                <span className="inline-block transform transition-all hover:scale-110 duration-300">
                                    {courseCount}
                                </span>
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-white opacity-50"></div>
                            </div>
                            <p className="text-lg md:text-xl font-light">Kurzus</p>
                        </div>

                        {/* Second Stat */}
                        <div className="space-y-4">
                            <p className="text-lg md:text-xl font-light">Az elmúlt 5 évben</p>
                            <div className="text-6xl md:text-7xl font-bold relative">
                                <span className="inline-block transform transition-all hover:scale-110 duration-300">
                                    {tdkSubmittedCount}
                                </span>
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-white opacity-50"></div>
                            </div>
                            <p className="text-lg md:text-xl font-light">Leadott TDK</p>
                        </div>

                        {/* Third Stat */}
                        <div className="space-y-4">
                            <p className="text-lg md:text-xl font-light">Az elmúlt 5 év alatt</p>
                            <div className="text-6xl md:text-7xl font-bold relative">
                                <span className="inline-block transform transition-all hover:scale-110 duration-300">
                                    {tdkWinnersCount}
                                </span>
                                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-12 h-1 bg-white opacity-50"></div>
                            </div>
                            <p className="text-lg md:text-xl font-light">Helyezett TDK</p>
                        </div>
                    </div>
                </div>
            </div>
            {props.isLast ? null : <WawyBorder direction={"bottom"} color={props.color} szin={props.szin}/>}
        </div>
    );
}