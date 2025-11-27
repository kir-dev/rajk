"use client"

import {useState} from "react"
import {ChevronDown, MapPin, Building, BookOpen, Award} from "lucide-react"
import {cn} from "@/lib/utils"
import type {Awardee} from "@/components/Dijak/AwardAwardeesSectionTemplate";
import Image from "next/image";

interface AwardeeCardProps {
    awardee: Awardee
    featured?: boolean
}

export function AwardeeCard({awardee, featured = false}: AwardeeCardProps) {
    const [isExpanded, setIsExpanded] = useState(featured)

    if (featured) {
        return (
            <div className="bg-card border border-border rounded-lg overflow-hidden">
                <div className="grid md:grid-cols-[300px_1fr] gap-6 p-6 md:p-8">
                    {/* Portrait */}
                    <div className="relative aspect-square md:aspect-auto">
                        <Image
                            src={awardee.image}
                            alt={awardee.name}
                            width={600}
                            height={600}
                            className="w-full h-full object-cover rounded-lg"
                        />
                        {awardee.hasNobel && (
                            <div
                                className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                                <Award className="w-4 h-4"/>
                                Nobel {awardee.nobelYear}
                            </div>
                        )}
                    </div>

                    {/* Info */}
                    <div className="flex flex-col justify-center">
                        <div className="text-primary font-medium mb-2">{awardee.year}</div>
                        <h3 className="text-2xl md:text-3xl font-bold text-background mb-4">{awardee.name}</h3>

                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4"/>
                  {awardee.country}
              </span>
                            <span className="flex items-center gap-1">
                <Building className="w-4 h-4"/>
                                {awardee.institution}
              </span>
                            <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4"/>
                                {awardee.field}
              </span>
                        </div>

                        <p className="text-background leading-relaxed mb-4">{awardee.description}</p>

                        <p className="text-muted-foreground leading-relaxed">{awardee.fullBio}</p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="border border-border rounded-lg overflow-hidden bg-card/50 hover:bg-card transition-colors">
            <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="w-full p-4 md:p-6 flex items-center gap-4 md:gap-6 text-left"
            >
                {/* Year */}
                <div
                    className="text-2xl md:text-3xl font-bold text-primary w-16 md:w-20 flex-shrink-0">{awardee.year}</div>

                {/* Portrait */}
                <div className="w-12 h-12 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                        src={awardee.image}
                        alt={awardee.name}
                        width={200}
                        height={200}
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Basic Info */}
                <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                        <h3 className="text-lg md:text-xl font-semibold text-background truncate">{awardee.name}</h3>
                        {awardee.hasNobel && (
                            <span
                                className="bg-primary/20 text-primary px-2 py-0.5 rounded text-xs font-medium flex-shrink-0">
                Nobel {awardee.nobelYear}
              </span>
                        )}
                    </div>
                    <div className="text-sm text-muted-foreground truncate">
                        {awardee.institution} · {awardee.country}
                    </div>
                </div>

                {/* Expand Icon */}
                <ChevronDown
                    className={cn("w-5 h-5 text-muted-foreground transition-transform flex-shrink-0", isExpanded && "rotate-180")}
                />
            </button>

            {/* Expanded Content */}
            {isExpanded && (
                <div className="px-4 md:px-6 pb-6 pt-0">
                    <div className="border-t border-border pt-6 ml-0 md:ml-[calc(5rem+1.5rem)]">
                        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-4">
              <span className="flex items-center gap-1">
                <BookOpen className="w-4 h-4"/>
                  {awardee.field}
              </span>
                        </div>
                        <p className="text-background leading-relaxed mb-4">{awardee.description}</p>
                        <p className="text-muted-foreground leading-relaxed">{awardee.fullBio}</p>
                    </div>
                </div>
            )}
        </div>
    )
}
