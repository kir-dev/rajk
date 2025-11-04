import React from "react";
import MemberPicture from "@/components/MemberPicture";
import { motion, AnimatePresence } from "framer-motion";
import { Person } from "@/../src/payload-types";

export type TeachersSectionProps = {
    title?: string;
    lead?: string;
    people: Array<{ person: Person; joined_at: string | null }>;
    showMax?: number;
    className?: string;
};

export default function TeachersSection({
    title = "Állandó tanáraink",
    lead = "A rajkos kurzusvezetők munkájának elismerésére minden évben adományozzuk az \"Állandó Tanár\" címet.",
    people,
    showMax,
    className,
}: TeachersSectionProps) {
    const [hoveredId, setHoveredId] = React.useState<number | null>(null);
    const items = showMax ? people.slice(0, showMax) : people;

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.06, delayChildren: 0.1 },
        },
    };

    const itemVariant = {
        hidden: { opacity: 0, scale: 0.9, y: 10 },
        show: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: { duration: 0.25, ease: "easeOut" as const }
        },
    };

    return (
        <section className={"mx-auto max-w-6xl px-4 py-16 " + (className ?? "")}>
            <div className="mb-8 text-center">
                <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">{title}</h2>
                <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-emerald-600" />
                {lead && <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600">{lead}</p>}
            </div>

            <motion.ul
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-10%" }}
                className="grid grid-cols-2 place-items-center gap-x-8 gap-y-10 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
            >
                {items.map((item) => (
                    <motion.li
                        key={item.person.id}
                        variants={itemVariant}
                        className="relative flex flex-col items-center"
                        onMouseEnter={() => setHoveredId(item.person.id)}
                        onMouseLeave={() => setHoveredId(null)}
                    >
                        <div className="transition-transform hover:scale-105">
                            <MemberPicture member={item.person} />
                        </div>

                        {/* Tooltip popup */}
                        <AnimatePresence>
                            {hoveredId === item.person.id && item.joined_at && (
                                <motion.div
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute z-50 bottom-full mb-2 w-20 px-4 py-3 bg-zold text-white text-sm rounded-lg shadow-xl pointer-events-none"
                                >
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-zold rotate-45" />
                                    <p className="leading-relaxed text-center w-full">{new Date(item.joined_at).getFullYear()}</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.li>
                ))}
            </motion.ul>
        </section>
    );
}