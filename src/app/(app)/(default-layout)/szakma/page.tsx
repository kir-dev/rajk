'use client'

import { CourseSection } from "@/components/Szakma/CourseSection";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {Course, CourseCategory} from "@/payload-types";
import getCourses from "@/payload-find/getCourses";
import getCourseCategories from "@/payload-find/getCourseCategories";
import TDK from "@/components/Szakma/TDK";
import IconTitle from "@/components/IconTitle";

export default function SzakmaPage() {
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
        <main className="min-h-screen bg-bezs">
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
                <IconTitle title={"Büszkeségeink"} />
                <TDK/>
            </div>
        </main>
    );
}