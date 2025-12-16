"use client"

import {useState} from "react"
import {
    MapPin,
    Building,
    BookOpen,
    Award,
    ExternalLink,
    Download,
    Play,
    FileText, ImageIcon,
} from "lucide-react"
import {cn, t} from "@/lib/utils"
import {GalleryLightbox} from "@/components/Dijak/GalleryLightbox"
import Image from "next/image"
import {Awardee} from "@/payload-types";
import {getMediaUrl} from "@/utils/isMedia";
import {getEmbedUrl} from "@/utils/videoUtils";
import {useLanguage} from "@/components/LanguageProvider";
import {RichText} from "@payloadcms/richtext-lexical/react";
import {AnimatePresence, motion} from "framer-motion";

interface AwardeeCardProps {
    awardee: Awardee
    featured?: boolean
}

type SectionType = 'introduction' | 'videos' | 'gallery' | 'publications' | 'articles' | 'interview'

export function AwardeeCard({awardee}: AwardeeCardProps) {
    const [activeSection, setActiveSection] = useState<SectionType | null>(null)
    const [lightboxOpen, setLightboxOpen] = useState(false)
    const [lightboxIndex, setLightboxIndex] = useState(0)

    const toggleSection = (section: SectionType) => {
        if (activeSection === section) {
            setActiveSection(null)
        } else {
            setActiveSection(section)
        }
    }

    const openLightbox = (index: number) => {
        setLightboxIndex(index)
        setLightboxOpen(true)
    }

    const {lang} = useLanguage();

    const getFieldsOfScienceStr = (awardee: Awardee) => {
        return lang === "HU"
            ? awardee.fields_of_science.map(f => f.field).join(', ')
            : awardee.fields_of_science_en.map(f => f.field).join(', ');
    }

    const getShortJustificationStr = (awardee: Awardee) => {
        return lang === "HU" ? awardee.short_justification : awardee.short_justification_en;
    }

    const getExtendedJustificationStr = (awardee: Awardee) => {
        return lang === "HU" ? awardee.extended_justification : awardee.extended_justification_en;
    }

    const extendedJustification = getExtendedJustificationStr(awardee)

    const hasVideos = Boolean(awardee.ceremony_video_link)
    const hasGallery = Boolean(awardee.image_gallery && awardee.image_gallery.length > 0)
    const hasPublications = Boolean(awardee.publications && awardee.publications.length > 0)
    const hasArticles = Boolean(awardee.articles && awardee.articles.length > 0)
    const hasJustification = Boolean(extendedJustification)
    const hasInterviews = Boolean(awardee.interview_video_link)

    const renderVideosSection = () => {
        return (
            <div className="max-w-5xl mx-auto">
                {awardee.video_description && (
                    <RichText data={awardee.video_description} className="mb-4 text-black"/>
                )}
                {awardee.ceremony_video_link && (
                    <div>
                        <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-2">
                            <iframe
                                src={getEmbedUrl(awardee.ceremony_video_link)}
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
            </div>
        )
    }

    const renderInterviewVideosSection = () => {
        return (
            <div className="max-w-5xl mx-auto">
                {awardee.interview_video_link && (
                    <div>
                        <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-2">
                            <iframe
                                src={getEmbedUrl(awardee.interview_video_link)}
                                className="w-full h-full"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title="Interjú videó"
                            />
                        </div>
                        <p className="text-sm text-muted-foreground">
                            {t(lang, "Díjátadó ünnepség", "Award Ceremony")}
                        </p>
                    </div>
                )}
            </div>
        )
    }

    const renderGallerySection = () => {
        if (!awardee.image_gallery) return null
        return (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {awardee.image_gallery.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => openLightbox(index)}
                        className="aspect-video rounded-lg overflow-hidden hover:ring-2 ring-primary transition-all relative group"
                    >
                        <Image
                            src={getMediaUrl(image.image, "/images/image-placeholder.png")}
                            alt={t(lang, image.caption, image.caption_en)}
                            width={600}
                            height={600}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors" />
                    </button>
                ))}
            </div>
        )
    }

    const renderPublicationsSection = () => {
        if (!awardee.publications) return null
        return (
            <div className="space-y-3">
                {awardee.publications.map((pub, index) => (
                    <div key={index}
                         className="flex items-start justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors group"
                         onClick={() => window.open(pub.link ? pub.link : "#", pub.link ? "_blank" : "_self")}
                         >
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-shrink-0 relative w-24 h-36 shadow-md rounded-sm overflow-hidden bg-background">
                                <Image
                                    src={getMediaUrl(pub.cover_image, "/images/image-placeholder.png")}
                                    alt={t(lang, pub.title, pub.title_en)}
                                    width={200}
                                    height={300}
                                    className="w-full h-fit object-cover aspect-[2/3]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-l from-black/5 to-transparent pointer-events-none" />
                            </div>
                            <div>
                                <p className="font-medium text-background group-hover:text-primary transition-colors">{t(lang, pub.title, pub.title_en)}</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {pub.author} · {new Date(pub.date).toLocaleDateString(lang)}
                                </p>
                                <p className="text-sm text-black mt-1 hidden md:block">
                                    {lang === "HU" ? pub.abstract : pub.abstract_en}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            {pub.link && (
                                <a
                                    href={pub.link}
                                    className="p-2 text-muted-foreground hover:text-primary transition-colors"
                                    aria-label="Link megnyitása"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <ExternalLink className="w-4 h-4"/>
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const renderArticlesSection = () => {
        if (!awardee.articles) return null
        return (
            <div className="space-y-3">
                {awardee.articles.map((article, index) => (
                    <div key={index}
                         className="flex items-start justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted transition-colors group cursor-pointer"
                         onClick={() => {
                             if (article.download) {
                                 window.open(getMediaUrl(article.download), "_blank")
                             } else {
                                 window.open(article.link ? article.link : "#", article.link ? "_blank" : "_self")
                             }
                         }}
                         >
                        <div className="flex flex-col md:flex-row gap-4">
                            <div className="flex-shrink-0 relative w-24 h-36 shadow-md rounded-sm overflow-hidden bg-background">
                                <Image
                                    src={getMediaUrl(article.cover_image, "/images/image-placeholder.png")}
                                    alt={t(lang, article.title, article.title_en)}
                                    width={200}
                                    height={300}
                                    className="w-full h-auto object-cover aspect-[2/3]"
                                />
                                <div className="absolute inset-0 bg-gradient-to-l from-black/5 to-transparent pointer-events-none" />
                            </div>
                            <div>
                                <p className="font-medium text-background group-hover:text-primary transition-colors">{t(lang, article.title, article.title_en)}</p>
                                <p className="text-sm text-muted-foreground mt-1">
                                    {article.author} · {new Date(article.date).toLocaleDateString(lang)}
                                </p>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            {article.download ? (
                                <a
                                    href={getMediaUrl(article.download)}
                                    className="p-2 text-muted-foreground hover:text-primary transition-colors"
                                    aria-label="Letöltés"
                                    download
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <Download className="w-4 h-4"/>
                                </a>
                            ) : article.link && (
                                <a
                                    href={article.link}
                                    className="p-2 text-muted-foreground hover:text-primary transition-colors"
                                    aria-label="Link megnyitása"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <ExternalLink className="w-4 h-4"/>
                                </a>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        )
    }

    const renderIntroductionSection = () => {
         return (
            <p className="text-muted-foreground leading-relaxed">{extendedJustification}</p>
        )
    }

    const sections = [
        {
            id: 'introduction' as SectionType,
            label: t(lang, "Bemutatás", "Introduction"),
            icon: Award,
            available: hasJustification
        },
        {
            id: 'videos' as SectionType,
            label: t(lang, "Díjátadó", "Award Ceremony"),
            icon: Play,
            available: hasVideos
        },
        {
            id: 'gallery' as SectionType,
            label: t(lang, "Galéria", "Image Gallery"),
            icon: ImageIcon,
            available: hasGallery
        },
        {
            id: 'publications' as SectionType,
            label: t(lang, "Kiadvány", "Publication"),
            icon: FileText,
            available: hasPublications
        },
        {
            id: 'articles' as SectionType,
            label: t(lang, "Cikkek", "Articles"),
            icon: FileText,
            available: hasArticles
        },
        {
            id: 'interview' as SectionType,
            label: t(lang, "Interjúk", "Interviews"),
            icon: Play,
            available: hasInterviews
        }
    ].filter(s => s.available);

    return (
        <>
            <div className="bg-card border border-border rounded-lg overflow-hidden flex flex-col">
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
                        <p className="text-lg text-background border-l-2 border-primary pl-4 mb-6">
                            {getShortJustificationStr(awardee)}
                        </p>

                        {/* Action Buttons */}
                        {sections.length > 0 && (
                            <div className="flex flex-wrap gap-2 mb-6">
                                {sections.map((section) => (
                                    <button
                                        key={section.id}
                                        onClick={() => toggleSection(section.id)}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                                            activeSection === section.id
                                                ? "bg-primary text-primary-foreground shadow-sm"
                                                : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-emerald-600"
                                        )}
                                    >
                                        {/*<section.icon className="w-4 h-4"/>*/}
                                        {section.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                </div>

                {/* Sliding Section Content */}
                <AnimatePresence mode="wait">
                    {activeSection && (
                        <motion.div
                            initial={{height: 0, opacity: 0}}
                            animate={{height: "auto", opacity: 1}}
                            exit={{height: 0, opacity: 0}}
                            transition={{duration: 0.3, ease: "easeInOut"}}
                            className="bg-muted/30 overflow-hidden"
                        >
                            <div className="p-6 md:p-8 border-t border-border">
                                {activeSection === 'introduction' && renderIntroductionSection()}
                                {activeSection === 'publications' && renderPublicationsSection()}
                                {activeSection === 'articles' && renderArticlesSection()}
                                {activeSection === 'gallery' && renderGallerySection()}
                                {activeSection === 'videos' && renderVideosSection()}
                                {activeSection === 'interview' && renderInterviewVideosSection()}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Footer with links and downloads */}
                {(awardee.websites) && (
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
                        </div>
                        {/* Downloads */}
                        {awardee.downloads && (
                            <div className="flex flex-wrap gap-4 justify-end">
                                {awardee.downloads.laudation_pdf && (
                                    <a
                                        href={getMediaUrl(awardee.downloads.laudation_pdf)}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium"
                                        download={getMediaUrl(awardee.downloads.laudation_pdf)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Download className="w-4 h-4"/>
                                        {t(lang, "Laudáció PDF", "Laudation PDF")}
                                    </a>
                                )}
                                {awardee.downloads.press_photo_pack && (
                                    <a
                                        href={getMediaUrl(awardee.downloads.press_photo_pack)}
                                        className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg hover:bg-primary/20 transition-colors text-sm font-medium"
                                        download={getMediaUrl(awardee.downloads.press_photo_pack)}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        <Download className="w-4 h-4"/>
                                        {t(lang, "Sajtófotók", "Press Photo Pack")}
                                    </a>
                                )}
                            </div>
                        )}
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
