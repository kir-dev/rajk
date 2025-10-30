import React from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { MessageCircle, Users, DoorOpen, Lightbulb } from "lucide-react";
import { motion, useInView } from "framer-motion";

/**
 * SzakmaSection – Rajk style feature block with animated distribution bars
 *
 * How to use:
 * <SzakmaSection
 *   title="SZAKMA"
 *   subtitle="A szakmaiság meghatározó pillére..."
 *   description="A kollégiumon belüli szakmai munka színesíti..."
 *   distribution={defaultDistribution}
 * />
 *
 * Change percentages by editing the `distribution` prop or defaultDistribution below.
 */

export type FacultyShare = {
    id: string;
    label: string;
    value: number; // percentage 0–100
};

export const defaultDistribution: FacultyShare[] = [
    { id: "kgtk", label: "Közgazdaságtudományi Kar", value: 35 },
    { id: "gdtk", label: "Gazdálkodástudományi Kar", value: 38 },
    { id: "tsdk", label: "Társadalomtudományi Kar", value: 27 },
];

const green = "#55a867"; // Rajk-ish green

function useCountUp(target: number, run: boolean, durationMs = 1000) {
    const [n, setN] = useState(0);
    useEffect(() => {
        if (!run) return;
        const start = performance.now();
        let raf = 0;
        const tick = (t: number) => {
            const p = Math.min(1, (t - start) / durationMs);
            setN(Math.round(p * target));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [target, run, durationMs]);
    return n;
}

const ProgressBar: React.FC<{
    label: string;
    value: number;
    index: number;
}> = ({ label, value, index }) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const inView = useInView(ref, { once: true, margin: "-20% 0px" });
    const pct = useCountUp(value, inView, 1100 + index * 150);

    return (
        <div className="w-full">
            <div className="mb-2 text-lg font-semibold text-slate-800">{label}</div>
            <div className="relative h-10 w-full overflow-hidden rounded-full bg-slate-100">
                <motion.div
                    ref={ref}
                    initial={{ width: 0 }}
                    animate={{ width: inView ? `${value}%` : 0 }}
                    transition={{ duration: 1.1 + index * 0.15, ease: "easeOut" }}
                    className="absolute left-0 top-0 h-full rounded-full"
                    style={{ backgroundColor: green }}
                />
                <div className="relative z-10 flex h-full items-center justify-between px-4 text-sm font-semibold text-white">
                    <span className="opacity-90">{pct}%</span>
                </div>
            </div>
        </div>
    );
};

const Point: React.FC<{
    Icon: React.ElementType;
    title: string;
    text: string;
}> = ({ Icon, title, text }) => (
    <div className="flex flex-col items-center gap-4 text-center">
        <div
            className="flex size-28 items-center justify-center rounded-full"
            style={{ backgroundColor: green }}
        >
            <Icon className="size-12 text-white" />
        </div>
        <div className="space-y-1">
            <div className="text-xl font-semibold text-slate-800">{title}</div>
            <div className="text-slate-600">{text}</div>
        </div>
    </div>
);

export default function SzakmaSection({
                                          title = "SZAKMA",
                                          subtitle = "A szakmaiság meghatározó pillére a Rajk Szakkollégium nevelési modelljének.",
                                          description =
                                          "A kollégiumon belüli szakmai munka színesíti, kiegészíti és mélyíti az egyetemen megszerzett tudást.",
                                          distribution = defaultDistribution,
                                      }: {
    title?: string;
    subtitle?: string;
    description?: string;
    distribution?: FacultyShare[];
}) {
    const safeDistribution = useMemo(
        () =>
            distribution
                .map((d) => ({ ...d, value: Math.max(0, Math.min(100, d.value)) }))
                .slice(0, 6), // safety cap
        [distribution]
    );

    return (
        <section className="mx-auto max-w-6xl px-4 py-16">
            {/* Header */}
            <div className="mb-10 flex flex-col items-center">
                <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">{title}</h2>
                <div className="mt-2 h-1 w-16 rounded-full" style={{ backgroundColor: green }} />
            </div>

            <div className="grid gap-12 lg:grid-cols-2">
                {/* Left: Text + Bars */}
                <div className="space-y-2">
                    <p className="text-lg font-semibold text-slate-800">{subtitle}</p>
                    <p className="max-w-2xl text-slate-600">{description}</p>

                    <div className="mt-6 space-y-6">
                        {safeDistribution.map((d, i) => (
                            <ProgressBar key={d.id} label={d.label} value={d.value} index={i} />)
                        )}
                    </div>
                </div>

                {/* Right: Points */}
                <div className="grid gap-12 md:grid-cols-2">
                    <Point
                        Icon={Users}
                        title="Kis létszámú, 4–8 fős kurzusok"
                        text="Személyre szabott figyelem, aktív részvétel."
                    />
                    <Point
                        Icon={DoorOpen}
                        title="Látókör tágítás, kitekintés"
                        text="Külsős előadók, szakmai programok."
                    />
                    <Point
                        Icon={MessageCircle}
                        title="Szakmai viták, beszélgetések"
                        text="Kritikus gondolkodás, közösségi tanulás."
                    />
                    <Point
                        Icon={Lightbulb}
                        title="Közös TDK-k, publikációk, versenyek"
                        text="Eredményorientált közös munka."
                    />
                </div>
            </div>
        </section>
    );
}
