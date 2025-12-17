"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { X } from "lucide-react"
import { usePathname } from "next/navigation"
import { useLanguage } from "@/components/LanguageProvider"

interface FilterChipsProps {
    years: number[]
    fields: string[]
    fieldsEn: string[]
    institutions: string[]
    filters: {
        year: number | null
        hasNobel: boolean | null
        field: string | null
        institution: string | null
    }
    setFilters: React.Dispatch<
        React.SetStateAction<{
            year: number | null
            hasNobel: boolean | null
            field: string | null
            institution: string | null
        }>
    >
}

export function FilterChips({ years, fields, fieldsEn, institutions, filters, setFilters }: FilterChipsProps) {
    const hasActiveFilters = filters.year || filters.hasNobel !== null || filters.field || filters.institution

    const clearFilters = () => {
        setFilters({
            year: null,
            hasNobel: null,
            field: null,
            institution: null,
        })
    }

    const pathname = usePathname();
    const {lang} = useLanguage();

    return (
        <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground mr-2">{lang === "HU" ? "Szűrés" : "Filter"}:</span>

                {/* Year Filter */}
                <select
                    value={filters.year || ""}
                    onChange={(e) => setFilters((f) => ({ ...f, year: e.target.value ? Number(e.target.value) : null }))}
                    className="bg-secondary text-background px-3 py-1.5 rounded-full text-sm border-0 focus:ring-2 focus:ring-primary cursor-pointer"
                >
                    <option value="">{lang === "HU" ? "Minden év" : "All years"}</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>

                {/* Nobel Filter */}
                {pathname === "/awards/neumann-janos" && (
                    <button
                    onClick={() =>
                        setFilters((f) => ({
                            ...f,
                            hasNobel: f.hasNobel === true ? null : true,
                        }))
                    }
                    className={cn(
                        "px-3 py-1.5 rounded-full text-sm transition-colors",
                        filters.hasNobel === true
                            ? "bg-primary text-primary-background"
                            : "bg-secondary text-background hover:bg-secondary/80",
                    )}
                >
                    {lang === "HU" ? "Nobel-díjas" : "Nobel laureate"}
                </button>
                )}

                {/* Field Filter */}
                <select
                    value={filters.field || ""}
                    onChange={(e) => setFilters((f) => ({ ...f, field: e.target.value || null }))}
                    className="bg-secondary text-background px-3 py-1.5 rounded-full text-sm border-0 focus:ring-2 focus:ring-primary cursor-pointer"
                >
                    <option value="">{lang === "HU" ? "Minden terület" : "All fields"}</option>
                    {fields.map((field) => (
                        <option key={field} value={field}>
                            {lang === "HU" ? field : fieldsEn[fields.indexOf(field)]}
                        </option>
                    ))}
                </select>

                {/* Institution Filter */}
                <select
                    value={filters.institution || ""}
                    onChange={(e) => setFilters((f) => ({ ...f, institution: e.target.value || null }))}
                    className="bg-secondary text-background px-3 py-1.5 rounded-full text-sm border-0 focus:ring-2 focus:ring-primary cursor-pointer"
                >
                    <option value="">{lang === "HU" ? "Minden intézmény" : "All institutions"}</option>
                    {institutions.map((inst) => (
                        <option key={inst} value={inst}>
                            {inst}
                        </option>
                    ))}
                </select>

                {/* Clear Filters */}
                {hasActiveFilters && (
                    <button
                        onClick={clearFilters}
                        className="px-3 py-1.5 rounded-full text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                    >
                        <X className="w-3 h-3" />
                        {lang === "HU" ? "Törlés" : "Clear"}
                    </button>
                )}
            </div>
        </div>
    )
}
