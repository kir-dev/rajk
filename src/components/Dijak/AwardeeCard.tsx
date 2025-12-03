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
import Image from "next/image"
import {Awardee} from "@/payload-types";
import {getMediaUrl} from "@/utils/isMedia";
import {useLanguage} from "@/components/LanguageProvider";
import {t} from "@/lib/utils";
import {RichText} from "@payloadcms/richtext-lexical/react";

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

    const {lang} = useLanguage();

    const getFieldsOfScienceStr = (awardee: Awardee) => {
        return lang === "HU" ? awardee.fields_of_science.join(', ') : awardee.fields_of_science_en.join(', ');
    }

    const getShortJustificationStr = (awardee: Awardee) => {
        return lang === "HU" ? awardee.short_justification : awardee.short_justification_en;
    }

    const getExtendedJustificationStr = (awardee: Awardee) => {
        return lang === "HU" ? awardee.extended_justification : awardee.extended_justification_en;
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
                                src={getMediaUrl(awardee.picture)}
                                alt={awardee.name}
                                width={600}
                                height={600}
                                className="w-full h-full object-cover rounded-lg"
                            />
                            {awardee.has_nobel && (
                                <div
                                    className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center gap-1">
                                    <Award className="w-4 h-4"/>
                                    Nobel {awardee.nobel_year}
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
                    {awardee.origin_country}
                </span>
                                <span className="flex items-center gap-1">
                  <Building className="w-4 h-4"/>
                                    {awardee.institution}
                </span>
                                <span className="flex items-center gap-1">
                  <BookOpen className="w-4 h-4"/>
                                    {getFieldsOfScienceStr(awardee)}
                </span>
                            </div>

                            {/* Short justification */}
                            <p className="text-lg text-background italic border-l-2 border-primary pl-4 mb-6">
                                &#34;{getShortJustificationStr(awardee)}&#34;
                            </p>

                            {/* Description and full bio */}
                            <RichText data={lang === "HU" ? awardee.about : awardee.about_en} className="text-background leading-relaxed mb-6"/>
                        </div>
                    </div>

                    {/* Extended content section */}
                    <div className="border-t border-border p-6 md:p-8 space-y-10">
                        {/* Videos section */}
                        {(awardee.lecture_video_link || awardee.ceremony_video_link) && (
                            <div>
                                <h4 className="text-lg font-semibold text-background mb-4 flex items-center gap-2">
                                    <Play className="w-5 h-5 text-primary"/>
                                    Videók
                                </h4>
                                <div className="grid md:grid-cols-2 gap-6">
                                    {awardee.ceremony_video_link && (
                                        <div>
                                            <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-2">
                                                <iframe
                                                    src={awardee.ceremony_video_link}
                                                    className="w-full h-full"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                    title="Díjátadó videó"
                                                />
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {t(lang, "Díjátadó ünnepség", "Award Ceremony")}
                                            </p>
                                        </div>
                                    )}
                                    {awardee.lecture_video_link && (
                                        <div>
                                            <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-2">
                                                <iframe
                                                    src={awardee.lecture_video_link}
                                                    className="w-full h-full"
                                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                    allowFullScreen
                                                    title="Előadás videó"
                                                />
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {t(lang, "Díjazott előadása", "Awardee Lecture")}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Gallery section */}
                        {awardee.image_gallery && awardee.image_gallery.length > 0 && (
                            <div>
                                <h4 className="text-lg font-semibold text-background mb-4">Galéria</h4>
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                    {awardee.image_gallery.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => openLightbox(index)}
                                            className="aspect-video rounded-lg overflow-hidden hover:ring-2 ring-primary transition-all"
                                        >
                                            <Image
                                                src={getMediaUrl(image.image, "/images/image-placeholder.png")}
                                                alt={t(lang, image.caption, image.caption_en)}
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
                        {awardee.related_content && awardee.related_content.length > 0 && (
                            <div>
                                <h4 className="text-lg font-semibold text-background mb-4">
                                    {t(lang, "Kapcsolódó tartalmak", "Related Content")}
                                </h4>
                                <div className="grid md:grid-cols-3 gap-4">
                                    {awardee.related_content.map((content, index) => (
                                        <a
                                            key={index}
                                            href={content.url}
                                            className="group flex items-start gap-3 p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                                        >
                                            <div
                                                className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                                                {content.type === "interview" && <Mic className="w-5 h-5"/>}
                                                {content.type === "video" && <Video className="w-5 h-5"/>}
                                                {content.type === "article" && <FileText className="w-5 h-5"/>}
                                                {content.type === "other" && <FileText className="w-5 h-5"/>}
                                            </div>
                                            <div>
                                                <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
                                                    {content.type === "interview" && t(lang, "Interjú", "Interview")}
                                                    {content.type === "video" && t(lang, "Videó", "Video")}
                                                    {content.type === "article" && t(lang, "Cikk", "Article")}
                                                    {content.type === "other" && t(lang, "Egyéb", "Other")}
                                                </p>
                                                <p className="text-sm font-medium text-background group-hover:text-primary transition-colors">
                                                    {t(lang, content.title, content.title_en)}
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
                                    {t(lang, "Kiadványok és cikkek", "Publications and Articles")}
                                </h4>
                                <div className="space-y-3">
                                    {awardee.publications.map((pub, index) => (
                                        <div key={index}
                                             className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                                            <div>
                                                <p className="font-medium text-background">{t(lang, pub.title, pub.title_en)}</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {pub.author} · {pub.date}
                                                </p>
                                            </div>
                                            <div className="flex gap-2">
                                                {pub.link && (
                                                    <a
                                                        href={pub.link}
                                                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                                                        aria-label="Link megnyitása"
                                                    >
                                                        <ExternalLink className="w-4 h-4"/>
                                                    </a>
                                                )}
                                                {/*pub.pdfUrl && (
                                                    <a
                                                        href={pub.pdfUrl}
                                                        className="p-2 text-muted-foreground hover:text-primary transition-colors"
                                                        aria-label="PDF letöltése"
                                                    >
                                                        <Download className="w-4 h-4"/>
                                                    </a>
                                                )*/}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Extended justification */}
                        {getExtendedJustificationStr(awardee) && (
                            <div>
                                <h4 className="text-lg font-semibold text-background mb-4">{t(lang, "Indoklás", "Justification")}</h4>
                                <p className="text-muted-foreground leading-relaxed">{getExtendedJustificationStr(awardee)}</p>
                            </div>
                        )}
                    </div>

                    {/* Footer with links and downloads */}
                    {(awardee.websites || awardee.downloads) && (
                        <div className="border-t border-border p-6 md:p-8 bg-muted/30">
                            <div className="flex flex-wrap items-center justify-between gap-6">
                                {/* Links */}
                                {awardee.websites && (
                                    <div className="flex flex-wrap gap-4">
                                        {awardee.websites.institution_website_link && (
                                            <a
                                                href={awardee.websites.institution_website_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                                            >
                                                <Building className="w-4 h-4"/>
                                                {t(lang, "Intézményi oldal", "Institutional Page")}
                                            </a>
                                        )}
                                        {awardee.websites.google_scholar_link && (
                                            <a
                                                href={awardee.websites.google_scholar_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                                            >
                                                <BookOpen className="w-4 h-4"/>
                                                Google Scholar
                                            </a>
                                        )}
                                        {awardee.websites.nobel_website_link && (
                                            <a
                                                href={awardee.websites.nobel_website_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                                            >
                                                <Award className="w-4 h-4"/>
                                                {t(lang, "Nobel-oldal", "Nobel Page")}
                                            </a>
                                        )}
                                        {awardee.websites.personal_website_link && (
                                            <a
                                                href={awardee.websites.personal_website_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                                            >
                                                <ExternalLink className="w-4 h-4"/>
                                                {t(lang, "Személyes weboldal", "Personal website")}
                                            </a>
                                        )}
                                    </div>
                                )}

                                {/* Downloads */}
                                {awardee.downloads && (
                                    <div className="flex flex-wrap gap-4">
                                        {awardee.downloads.laudation_pdf && (
                                            <a
                                                href={getMediaUrl(awardee.downloads.laudation_pdf)}
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium"
                                            >
                                                <Download className="w-4 h-4"/>
                                                {t(lang, "Laudáció PDF", "Laudation PDF")}
                                            </a>
                                        )}
                                        {awardee.downloads.press_photo_pack && (
                                            <a
                                                href={getMediaUrl(awardee.downloads.press_photo_pack)}
                                                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium"
                                            >
                                                <Download className="w-4 h-4"/>
                                                {t(lang, "Sajtófotók", "Press Photo Pack")}
                                            </a>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Lightbox */}
                {lightboxOpen && awardee.image_gallery && (
                    <GalleryLightbox
                        images={awardee.image_gallery}
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
                            src={getMediaUrl(awardee.picture, "/images/image-placeholder.png")}
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
                            {awardee.has_nobel && (
                                <span
                                    className="bg-primary/20 text-primary px-2 py-0.5 rounded text-xs font-medium flex-shrink-0">
                  Nobel {awardee.nobel_year}
                </span>
                            )}
                        </div>
                        <div className="text-sm text-muted-foreground truncate">
                            {awardee.institution} · {awardee.origin_country}
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
                    {getFieldsOfScienceStr(awardee)}
                </span>
                            </div>

                            <p className="text-background italic border-l-2 border-primary pl-4 mb-4">
                                    &#34;{getShortJustificationStr(awardee)}&#34;
                            </p>

                            {getExtendedJustificationStr(awardee) && (
                                <RichText data={lang === "HU" ? awardee.about : awardee.about_en} className="text-background leading-relaxed mb-6"/>
                            )}

                            {/* Compact gallery preview */}
                            {awardee.image_gallery && awardee.image_gallery.length > 0 && (
                                <div className="mb-6">
                                    <div className="flex gap-2 overflow-x-auto pb-2">
                                        {awardee.image_gallery.slice(0, 4).map((image, index) => (
                                            <button
                                                key={index}
                                                onClick={() => openLightbox(index)}
                                                className="w-20 h-20 flex-shrink-0 rounded-lg overflow-hidden hover:ring-2 ring-primary transition-all"
                                            >
                                                <Image
                                                    src={getMediaUrl(image.image, "/images/image-placeholder.png")}
                                                    alt={t(lang, image.caption, image.caption_en)}
                                                    width={600}
                                                    height={600}
                                                    className="w-full h-full object-cover"
                                                />
                                            </button>
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
                                                    {pub.link && (
                                                        <a
                                                            href={pub.link}
                                                            className="p-2 text-muted-foreground hover:text-primary transition-colors"
                                                            aria-label="Link megnyitása"
                                                        >
                                                            <ExternalLink className="w-4 h-4"/>
                                                        </a>
                                                    )}
                                                    {/*pub.pdfUrl && (
                                                        <a
                                                            href={pub.pdfUrl}
                                                            className="p-2 text-muted-foreground hover:text-primary transition-colors"
                                                            aria-label="PDF letöltése"
                                                        >
                                                            <Download className="w-4 h-4"/>
                                                        </a>
                                                    )*/}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Links footer */}
                            {awardee.websites && (
                                <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                                    {awardee.websites.institution_website_link && (
                                        <a
                                            href={awardee.websites.institution_website_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                                        >
                                            <Building className="w-4 h-4"/>
                                            {t(lang, "Intézményi oldal", "Institutional Page")}
                                        </a>
                                    )}
                                    {awardee.websites.google_scholar_link && (
                                        <a
                                            href={awardee.websites.google_scholar_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                                        >
                                            <BookOpen className="w-4 h-4"/>
                                            Google Scholar
                                        </a>
                                    )}
                                    {awardee.websites.nobel_website_link && (
                                        <a
                                            href={awardee.websites.nobel_website_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                                        >
                                            <Award className="w-4 h-4"/>
                                            {t(lang, "Nobel-oldal", "Nobel Page")}
                                        </a>
                                    )}
                                    {awardee.websites.personal_website_link && (
                                        <a
                                            href={awardee.websites.personal_website_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-1"
                                        >
                                            <ExternalLink className="w-4 h-4"/>
                                            Személyes weboldal
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Lightbox for non-featured cards */}
            {lightboxOpen && awardee.image_gallery && (
                <GalleryLightbox
                    images={awardee.image_gallery}
                    initialIndex={lightboxIndex}
                    onClose={() => setLightboxOpen(false)}
                />
            )}
        </>
    )
}
