'use client'

import { CourseSection } from "@/components/Szakma/CourseSection";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {Course, CourseCategory} from "@/payload-types";
import getCourses from "@/payload-find/getCourses";
import getCourseCategories from "@/payload-find/getCourseCategories";
import TDK from "@/components/Szakma/TDK";
import IconTitle from "@/components/IconTitle";
import OdysseyProgram from "@/components/Szakma/Odyssey";
import Heller from "@/components/Szakma/Heller";
import { useLanguage } from '@/components/LanguageProvider';
import { t } from '@/lib/utils';

export default function SzakmaPage() {
    const { lang } = useLanguage();
    const [isMounted, setIsMounted] = useState(false);
    const [courses, setCourses] = useState<Course[]>([]);
    const [categories, setCategories] = useState<CourseCategory[]>([]);

    async function fetchData() {
        setCourses(await getCourses());
        setCategories(await getCourseCategories());
    }

    useEffect(() => {
        setIsMounted(true);
        fetchData();
    }, []);

    return (
        <main className="min-h-screen flex flex-col pb-40 pt-20 bg-bezs text-black">
            {/* Page wrapper with nice padding and full height */}
            {isMounted ? (
                <motion.div
                    className="py-12 md:py-20 px-4 max-w-[1440px] mx-auto"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <CourseSection courses={courses} categories={categories} />

                    {/* Additional content can be added here */}
                </motion.div>
            ) : (
                <div className="py-12 md:py-20 px-4 max-w-[1440px] mx-auto">
                    <CourseSection courses={courses} categories={categories} />

                    {/* Additional content can be added here */}
                </div>
            )}
            <div className="flex flex-col items-center text-black">
                <IconTitle title={t(lang, 'Büszkeségeink', 'Our achievements')} />
                <TDK/>
                <OdysseyProgram/>
                <Heller/>
            </div>
            <div className="flex flex-col items-center">
                <iframe
                    src="https://www.youtube.com/embed/lJgPfSw4w2c?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1"
                    title="YouTube video player"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="aspect-video w-2/3"
                />
            </div>
        </main>
    );
}