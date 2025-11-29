import { Award as AwardIcon, Users, Trophy, Sparkles } from "lucide-react"
import {Award} from "@/payload-types";
import Section from "@/components/Section";

/*interface AwardAboutSectionProps {
    award: Award
}*/

export default function AwardAboutSection() {
    const stats = [
        {
            icon: AwardIcon,
            value: "1995",
            label: "Alapítás éve",
            description: "Magyarország",
        },
        {
            icon: Users,
            value: "28",
            label: "Díjazott",
            description: "tudós eddig",
        },
        {
            icon: Trophy,
            value: "5",
            label: "Nobel-díjas",
            description: "a díjazottak közül",
        },
    ]

    return (
        <Section id={"about"} title={"About"} className="py-24 px-4 border-t border-border">
            <div className="max-w-7xl mx-auto">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-border border border-border rounded-lg mb-16">
                    {stats.map((stat, index) => (
                        <div key={index} className="bg-card p-8 md:p-12 text-center md:text-left">
                            <stat.icon className="w-6 h-6 text-primary mb-4 mx-auto md:mx-0" />
                            <div className="text-4xl md:text-5xl font-bold text-background mb-2">{stat.value}</div>
                            <div className="text-lg text-background font-medium">{stat.label}</div>
                            <div className="text-sm text-muted-foreground">{stat.description}</div>
                        </div>
                    ))}
                </div>

                {/* Unique Feature Box */}
                <div className="bg-card border border-border rounded-lg p-8 md:p-12">
                    <div className="flex items-start gap-4 mb-6">
                        <div className="p-3 bg-primary/10 rounded-lg">
                            <Sparkles className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h2 className="text-2xl md:text-3xl font-bold text-background mb-2">Miben egyedi?</h2>
                            <p className="text-md text-muted-foreground">A díjazási folyamat, ami megkülönbözteti a Neumann-díjat</p>
                        </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-background">Hallgatói jelölés</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                A Rajk Szakkollégium hallgatói maguk jelölhetik azokat a tudósokat, akiknek munkája meghatározó hatást
                                gyakorolt az egzakt társadalomtudományok fejlődésére. Ez a bottom-up megközelítés egyedülálló a
                                tudományos díjak között.
                            </p>
                        </div>
                        <div className="space-y-4">
                            <h3 className="text-lg font-semibold text-background">Demokratikus szavazás</h3>
                            <p className="text-muted-foreground leading-relaxed">
                                A jelöltek közül demokratikus szavazással választják ki a díjazottat. Ez a folyamat biztosítja, hogy a
                                díj valóban azokat a tudósokat ismerje el, akik inspirálják a következő generációt.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Section>
    )
}
