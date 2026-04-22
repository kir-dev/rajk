// File: `src/components/Intezmeny/Documents.tsx`
import * as React from "react";
import Link from "next/link";
import type { ReportsGroup } from "@/payload-find/getReports";
import type {Route} from "next";

export type ReportsItem = {
    title: string;
    subtitle?: string;
    href?: string;
    targetBlank?: boolean;
};

export type ReportsColumn = {
    heading: string;
    subheading?: string;
    description?: string[];
    items?: ReportsItem[];
};

export type ReportsGridProps = {
    columns?: ReportsColumn[];
    groups?: ReportsGroup[];
    className?: string;
};

export default function ReportsGrid({ columns, groups, className }: ReportsGridProps) {
    const resolvedColumns: ReportsColumn[] = groups
        ? groups.map((g) => ({
              heading: g.topic,
              items: g.items.map((it) => ({
                  title: it.title,
                  href: it.link,
                  targetBlank: true,
              })),
          }))
        : (columns ?? []);

    const colCount = resolvedColumns.length;
    const isPartial = colCount > 0 && colCount < 4; // center only when fewer than full 4 columns
    const mdCols = Math.min(Math.max(colCount, 1), 2); // 1..2 at md
    const lgCols = Math.min(Math.max(colCount, 1), 4); // 1..4 at lg

    // When partial, use inline-grid so its intrinsic width can be centered by parent flex.
    const partialGridClass = `inline-grid grid-cols-1 md:grid-cols-${mdCols} lg:grid-cols-${lgCols} gap-x-10 gap-y-12`;
    const fullGridClass = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12";

    return (
        <section className={"w-full " + (className ?? "")}>
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
                {/* if partial columns, center the inline-grid; otherwise use full-width grid */}
                <div className={isPartial ? "flex justify-center" : ""}>
                    <div className={isPartial ? partialGridClass : fullGridClass}>
                        {resolvedColumns.map((col, idx) => (
                            <div key={idx} className="min-w-0">
                                <h2 className="text-emerald-700 font-semibold text-3xl leading-snug">
                                    {col.heading}
                                </h2>
                                {col.subheading && (
                                    <p className="text-neutral-800 font-semibold mt-1 leading-snug">{col.subheading}</p>
                                )}

                                {col.description && col.description.length > 0 && (
                                    <div className="mt-4 space-y-3 text-neutral-700">
                                        {col.description.map((p, i) => (
                                            <p key={i} className="leading-relaxed">{p}</p>
                                        ))}
                                    </div>
                                )}

                                {col.items && col.items.length > 0 && (
                                    <ul className="mt-6 space-y-4">
                                        {col.items.map((it, i) => (
                                            <li key={i}>
                                                {it.href ? (
                                                    <Link
                                                        href={it.href as Route}
                                                        target={it.targetBlank ? "_blank" : undefined}
                                                        rel={it.targetBlank ? "noreferrer noopener" : undefined}
                                                        className="group block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-600/60 focus-visible:ring-offset-2"
                                                    >
                                                        <span className="block font-semibold text-neutral-900 group-hover:text-emerald-700 transition-colors">
                                                            {it.title}
                                                        </span>
                                                        {it.subtitle && (
                                                            <span className="block text-neutral-700">{it.subtitle}</span>
                                                        )}
                                                    </Link>
                                                ) : (
                                                    <div className="block">
                                                        <span className="block font-semibold text-neutral-900">{it.title}</span>
                                                        {it.subtitle && (
                                                            <span className="block text-neutral-700">{it.subtitle}</span>
                                                        )}
                                                    </div>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}