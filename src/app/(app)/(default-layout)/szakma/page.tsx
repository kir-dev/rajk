'use client'

import { CourseSection } from "@/components/Szakma/CourseSection";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import {Course, CourseCategory, Group, Person} from "@/payload-types";
import getCourses from "@/payload-find/getCourses";
import getCourseCategories from "@/payload-find/getCourseCategories";
import IconTitle from "@/components/IconTitle";
import SzakmaSection, {defaultDistribution} from "@/components/Szakma/FacultyShare";
import TeachersSection from "@/components/Szakma/TeachersSection";
import getGroupMembers from "@/payload-find/getGroups";

export default function SzakmaPage() {
    const [isMounted, setIsMounted] = useState(false);
    const [courses, setCourses] = useState<Course[]>([]);
    const [categories, setCategories] = useState<CourseCategory[]>([]);
    const [teachers, setTeachers] = useState<Group | null>(null);

    useEffect(() => {
        async function fetchAwards() {
            try {
                const response = await getGroupMembers("Állandó tanárok");
                if (!response) {
                    setTeachers(null);
                }
                setTeachers(response);
            } catch (error){
                console.error("Error fetching Heller-díj awardees:", error);
            }
        }
        fetchAwards();
    }, []);

    const members = teachers?.members || [];

    // Map to include both person and role
    // Remove unused peopleArray variable and fix type predicate
    const peopleWithRoles = members
        .map(m => {
            const person = typeof m.member === 'object' ? m.member : null;
            return person ? { person, role: m.role || null } : null;
        })
        .filter((item): item is { person: Person; role: string | null } => item !== null);


    async function fetchData() {
        setCourses(await getCourses());
        setCategories(await getCourseCategories());
    }

    useEffect(() => {
        setIsMounted(true);
        fetchData();
    }, []);

    return (
        <main className="min-h-screen flex flex-col py-20 bg-bezs text-black">
            <SzakmaSection
                title="Kurzusrendszer"
                distribution={defaultDistribution}
            />
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
                <TeachersSection
                    people={peopleWithRoles}
                    lead={"A rajkos kurzusvezetők munkájának elismerésére évente a \„Rajk Szakkollégium Állandó Tanára\" címet adományozzuk. A címet olyan jelenlegi és volt kurzusvezetők kapják, akik nagy hatást gyakoroltak a kollégisták szakmai fejlődésére. Ezúton is köszönjük sokéves munkájukat!"}
                    showMax={peopleWithRoles.length}
                        />
                {/*<TDK/>
                    <OdysseyProgram/>
                    <Heller/>*/}
            </div>
            {/*<div className="flex flex-col items-center">
                <iframe
                    src="https://www.youtube.com/embed/lJgPfSw4w2c?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&disablekb=1"
                    title="YouTube video player"
                    allow="autoplay; encrypted-media"
                    allowFullScreen
                    className="aspect-video w-2/3"
                />
            </div>*/}
        </main>
    );
}