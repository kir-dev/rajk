"use client"

import {useState} from "react"
import Section from "@/components/Section";
import {AwardeeCard} from "@/components/Dijak/AwardeeCard";
import {FilterChips} from "@/components/Dijak/FilterChips";
import {useLanguage} from "@/components/LanguageProvider";
import {t} from "@/lib/utils"
import {Award, Awardee} from "@/payload-types";

interface AwardAwardeesSectionProps {
    award: Award
}

export default function AwardAwardeesSection({award}: AwardAwardeesSectionProps) {

    const awardees = award.awardees as Awardee[] || [];

    const {lang} = useLanguage();

    const years = [...new Set(awardees.map((l) => l.year))].sort((a, b) => b - a)
    const institutions = [...new Set(awardees.map((l) => l.institution))]
    const fields = [...new Set(awardees.flatMap((l) => l.fields_of_science.map(f => f.field)))]


    const [filters, setFilters] = useState({
        year: null as number | null,
        hasNobel: null as boolean | null,
        field: null as string | null,
        institution: null as string | null,
    })

    const filteredAwardees = awardees.filter((l) => {
        if (filters.year && l.year !== filters.year) return false
        if (filters.hasNobel !== null && l.has_nobel !== filters.hasNobel) return false
        if (filters.field) {
            const fieldsOfScience = (l.fields_of_science || []).map(f => f.field);
            if (!fieldsOfScience.includes(filters.field)) return false
        }
        return !(filters.institution && l.institution !== filters.institution);

    })

    const latestAwardee = awardees.length > 0 ? awardees[0] : null;

    return (
        <Section id={"awardees"} title={"Awardees"} className="py-24 px-4 border-t border-border">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl md:text-4xl font-bold text-background mb-4">{t(lang, "Díjazottak", "Awardees")}</h2>
                <p className="text-muted-foreground mb-12 max-w-2xl">
                    {t(lang,
                        `A ${award.name} eddigi kitüntetettjei, akik kiemelkedő hozzájárulást tettek az egzakt társadalomtudományok fejlődéséhez.`,
                        `The past recipients of the ${award.name}, who have made outstanding contributions to the development of exact social sciences.`
                    )}
                </p>

                {/* Latest Laureate Feature */}
                <div className="mb-16">
                    {latestAwardee && (
                        <>
                            <div className="text-sm text-primary font-medium mb-4 flex items-center gap-2">
                                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"/>
                                {t(lang, "Legfrissebb díjazott", "Latest Award Winner")}
                            </div>
                            <AwardeeCard awardee={latestAwardee} featured/>
                        </>
                    )}
                </div>

                {/* Filters */}
                <FilterChips
                    years={years}
                    fields={fields}
                    institutions={institutions}
                    filters={filters}
                    setFilters={setFilters}
                />

                {/* Timeline */}
                <div className="space-y-4">
                    {filteredAwardees.slice(1).map((awardee) => (
                        <AwardeeCard key={awardee.id} awardee={awardee}/>
                    ))}
                </div>

                {filteredAwardees.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground">
                        {t(lang, "Nincs találat a megadott szűrőkkel", "No matches with the current filters")}.
                    </div>
                )}
            </div>
        </Section>
    )
}
