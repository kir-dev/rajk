"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { X } from "lucide-react"

interface FilterChipsProps {
    years: number[]
    fields: string[]
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

export function FilterChips({ years, fields, institutions, filters, setFilters }: FilterChipsProps) {
    const hasActiveFilters = filters.year || filters.hasNobel !== null || filters.field || filters.institution

    const clearFilters = () => {
        setFilters({
            year: null,
            hasNobel: null,
            field: null,
            institution: null,
        })
    }

    return (
        <div className="mb-8 space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
                <span className="text-sm text-muted-foreground mr-2">Szűrés:</span>

                {/* Year Filter */}
                <select
                    value={filters.year || ""}
                    onChange={(e) => setFilters((f) => ({ ...f, year: e.target.value ? Number(e.target.value) : null }))}
                    className="bg-secondary text-background px-3 py-1.5 rounded-full text-sm border-0 focus:ring-2 focus:ring-primary cursor-pointer"
                >
                    <option value="">Minden év</option>
                    {years.map((year) => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>

                {/* Nobel Filter */}
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
                    Nobel-díjas
                </button>

                {/* Field Filter */}
                <select
                    value={filters.field || ""}
                    onChange={(e) => setFilters((f) => ({ ...f, field: e.target.value || null }))}
                    className="bg-secondary text-background px-3 py-1.5 rounded-full text-sm border-0 focus:ring-2 focus:ring-primary cursor-pointer"
                >
                    <option value="">Minden terület</option>
                    {fields.map((field) => (
                        <option key={field} value={field}>
                            {field}
                        </option>
                    ))}
                </select>

                {/* Institution Filter */}
                <select
                    value={filters.institution || ""}
                    onChange={(e) => setFilters((f) => ({ ...f, institution: e.target.value || null }))}
                    className="bg-secondary text-background px-3 py-1.5 rounded-full text-sm border-0 focus:ring-2 focus:ring-primary cursor-pointer"
                >
                    <option value="">Minden intézmény</option>
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
                        Törlés
                    </button>
                )}
            </div>
        </div>
    )
}
