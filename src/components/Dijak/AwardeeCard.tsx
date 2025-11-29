"use client"

import {useState} from "react"
import {
    ChevronDown,
    MapPin,
    Building,
    BookOpen,
    Award,
    ExternalLink,
    Download,
    Play,
    Mic,
    Video,
    FileText,
} from "lucide-react"
import {cn} from "@/lib/utils"
import {GalleryLightbox} from "@/components/Dijak/GalleryLightbox"
import type {Awardee} from "@/components/Dijak/AwardAwardeesSection"
import Image from "next/image"

interface AwardeeCardProps {
    awardee: Awardee
    featured?: boolean
}

export function AwardeeCard({awardee, featured = false}: AwardeeCardProps) {
    const [isExpanded, setIsExpanded] = useState(featured)
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [lightboxIndex, setLightboxIndex] = useState(0)

    const openLightbox = (index: number) => {
        setLightboxIndex(index)
        setLightboxOpen(true)
    }

    if (featured) {
        return (
            <>
                <div className="bg-card border border-border rounded-lg overflow-hidden">
                    {/* Header section with portrait and basic info */}
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

                        {/* Basic Info */}
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

                            {/* Short justification */}
                            {awardee.shortJustification && (
                                <p className="text-lg text-background italic border-l-2 border-primary pl-4 mb-6">
                                    &#34;{awardee.shortJustification}&#34;
                                </p>
                            )}

                            <p className="text-muted-foreground leading-relaxed">{awardee.fullBio}</p>
                        </div>
                    </div>

                    {/* Extended content section */}
                    <div className="border-t border-border p-6 md:p-8 space-y-10">
                        {/* Videos section */}
                        {(awardee.ceremonyVideoUrl || awardee.lectureVideoUrl) && (
                            <div>
                                <h4 className="text-lg font-semibold text-background mb-4 flex items-center gap-2">
                                    <Play className="w-5 h-5 text-primary"/>
                                    Videók
                                </h4>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {awardee.ceremonyVideoUrl && (
                                        <div>
                                            <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-2">
                                                <iframe
                                                    src={awardee.ceremonyVideoUrl}
                                                    className="w-full h-full"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                    title="Díjátadó videó"
                                                />
                                            </div>
                                            <p className="text-sm text-muted-foreground">Díjátadó ünnepség</p>
                                        </div>
                                    )}
                                    {awardee.lectureVideoUrl && (
                                        <div>
                                            <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-2">
                                                <iframe
                                                    src={awardee.lectureVideoUrl}
                                                    className="w-full h-full"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                    title="Előadás videó"
                                                />
                                            </div>
                                            <p className="text-sm text-muted-foreground">Nobel-előadás</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Gallery section */}
                        {awardee.gallery && awardee.gallery.length > 0 && (
                            <div>
                                <h4 className="text-lg font-semibold text-background mb-4">Galéria</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {awardee.gallery.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => openLightbox(index)}
                                            className="aspect-video rounded-lg overflow-hidden hover:ring-2 ring-primary transition-all"
                                        >
                                            <Image
                                                src={image.src || "/placeholder.svg"}
                                                alt={image.alt}
                                                width={600}
                                                height={600}
                                                className="w-full h-full object-cover"
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Related content section */}
                        {awardee.relatedContent && awardee.relatedContent.length > 0 && (
                            <div>
                                <h4 className="text-lg font-semibold text-background mb-4">Kapcsolódó tartalmak</h4>
                                <div className="grid md:grid-cols-3 gap-4">
                                    {awardee.relatedContent.map((content, index) => (
                                        <a
                                            key={index}
                                            href={content.url}
                                            className="group flex items-start gap-3 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                                        >
                                            <div
                                                className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                {content.type === "interview" && <Mic className="w-5 h-5"/>}
                                                {content.type === "video" && <Video className="w-5 h-5"/>}
                                                {content.type === "podcast" && <Mic className="w-5 h-5"/>}
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                                                    {content.type === "interview" && "Interjú"}
                                                    {content.type === "video" && "Videó"}
                                                    {content.type === "podcast" && "Podcast"}
                                                </p>
                                                <p className="text-sm font-medium text-background group-hover:text-primary transition-colors">
                                                    {content.title}
                                                </p>
                                            </div>
                                        </a>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Publications section */}
                        {awardee.publications && awardee.publications.length > 0 && (
                            <div>
                                <h4 className="text-lg font-semibold text-background mb-4 flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-primary"/>
                                    Kiadványok és cikkek
                                </h4>
                                <div className="space-y-3">
                                    {awardee.publications.map((pub, index) => (
                                        <div key={index}
                                             className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                                            <div>
                                                <p className="font-medium text-background">{pub.title}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {pub.author} · {pub.date}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                {pub.url && (
                                                    <a
                                                        href={pub.url}
                                                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                                                        aria-label="Link megnyitása"
                                                    >
                                                        <ExternalLink className="w-4 h-4"/>
                                                    </a>
                                                )}
                                                {pub.pdfUrl && (
                                                    <a
                                                        href={pub.pdfUrl}
                                                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                                                        aria-label="PDF letöltése"
                                                    >
                                                        <Download className="w-4 h-4"/>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Extended justification */}
                        {awardee.extendedJustification && (
                            <div>
                                <h4 className="text-lg font-semibold text-background mb-4">Indoklás</h4>
                                <p className="text-muted-foreground leading-relaxed">{awardee.extendedJustification}</p>
                            </div>
                        )}
                    </div>

                    {/* Footer with links and downloads */}
                    {(awardee.links || awardee.downloads) && (
                        <div className="border-t border-border p-6 md:p-8 bg-muted/30">
                            <div className="flex flex-wrap items-center justify-between gap-6">
                                {/* Links */}
                                {awardee.links && (
                                    <div className="flex flex-wrap gap-4">
                                        {awardee.links.institutional && (
                                            <a
                                                href={awardee.links.institutional}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                                            >
                                                <Building className="w-4 h-4"/>
                                                Intézményi oldal
                                            </a>
                                        )}
                                        {awardee.links.googleScholar && (
                                            <a
                                                href={awardee.links.googleScholar}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                                            >
                                                <BookOpen className="w-4 h-4"/>
                                                Google Scholar
                                            </a>
                                        )}
                                        {awardee.links.nobel && (
                                            <a
                                                href={awardee.links.nobel}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                                            >
                                                <Award className="w-4 h-4"/>
                                                Nobel-oldal
                                            </a>
                                        )}
                                        {awardee.links.rajk && (
                                            <a
                                                href={awardee.links.rajk}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                                            >
                                                <ExternalLink className="w-4 h-4"/>
                                                Rajk oldal
                                            </a>
                                        )}
                                    </div>
                                )}

                                {/* Downloads */}
                                {awardee.downloads && (
                                    <div className="flex flex-wrap gap-4">
                                        {awardee.downloads.laudationPdf && (
                                            <a
                                                href={awardee.downloads.laudationPdf}
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium"
                                            >
                                                <Download className="w-4 h-4"/>
                                                Laudáció PDF
                                            </a>
                                        )}
                                        {awardee.downloads.pressPhotoPack && (
                                            <a
                                                href={awardee.downloads.pressPhotoPack}
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium"
                                            >
                                                <Download className="w-4 h-4"/>
                                                Sajtófotók
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Lightbox */}
                {lightboxOpen && awardee.gallery && (
                    <GalleryLightbox
                        images={awardee.gallery}
                        initialIndex={lightboxIndex}
                        onClose={() => setLightboxOpen(false)}
                    />
                )}
            </>
        )
    }

    return (
        <>
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
                            src={awardee.image || "/placeholder.svg"}
                            alt={awardee.name}
                            width={600}
                            height={600}
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
                        className={cn(
                            "w-5 h-5 text-muted-foreground transition-transform flex-shrink-0",
                            isExpanded && "rotate-180",
                        )}
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

                            {awardee.shortJustification && (
                                <p className="text-background italic border-l-2 border-primary pl-4 mb-4">
                                    &#34;{awardee.shortJustification}&#34;
                                </p>
                            )}

                            <p className="text-background leading-relaxed mb-4">{awardee.description}</p>
                            <p className="text-muted-foreground leading-relaxed mb-6">{awardee.fullBio}</p>

                            {/* Compact gallery preview */}
                            {awardee.gallery && awardee.gallery.length > 0 && (
                                <div className="mb-6">
                                    <div className="flex gap-2 overflow-x-auto pb-2">
                                        {awardee.gallery.slice(0, 4).map((image, index) => (
                                            <button
                                                key={index}
                                                onClick={() => openLightbox(index)}
                                                className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden hover:ring-2 ring-primary transition-all"
                                            >
                                                <Image 
                                                    src={image.src || "/placeholder.svg"} 
                                                    alt={image.alt} 
                                                    width={600}
                                                    height={600}
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Links footer */}
                            {awardee.links && (
                                <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                                    {awardee.links.institutional && (
                                        <a
                                            href={awardee.links.institutional}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                                        >
                                            <Building className="w-4 h-4"/>
                                            Intézményi oldal
                                        </a>
                                    )}
                                    {awardee.links.nobel && (
                                        <a
                                            href={awardee.links.nobel}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                                        >
                                            <Award className="w-4 h-4"/>
                                            Nobel-oldal
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Lightbox for non-featured cards */}
            {lightboxOpen && awardee.gallery && (
                <GalleryLightbox
                    images={awardee.gallery}
                    initialIndex={lightboxIndex}
                    onClose={() => setLightboxOpen(false)}
                />
            )}
        </>
    )
}
