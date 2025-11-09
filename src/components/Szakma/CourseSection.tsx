'use client'

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CourseCircle } from "./CourseCircle";
import {
    Filter,
    ChevronDown,
    Info
} from "lucide-react";
import Image from "next/image";
import {CourseCategory, Course} from "@/payload-types";

export const CourseSection = (props: {categories: CourseCategory[], courses: Course[]}) => {
    const [isVisible, setIsVisible] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState<string>("all");
    const [showFilterMenu, setShowFilterMenu] = useState(false);
    const [showInfo, setShowInfo] = useState(false);

    const isLoading = false;
    const categories = props.categories || [];
    const courses = props.courses || [];

    useEffect(() => {
        // Small delay to ensure we're on the client side
        const timer = setTimeout(() => {
            setIsVisible(true);
        }, 10);

        return () => clearTimeout(timer);
    }, []);

    const filteredCourses = selectedCategory === "all"
        ? courses
        : courses.filter(course => (course.category as CourseCategory).id === selectedCategory);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-course-background py-8 md:py-16 flex items-center justify-center">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-course-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-600">Kurzusok betöltése...</p>
                </div>
            </div>
        );
    }

    return (
        <section className="min-h-screen bg-course-background py-8 md:py-16 overflow-hidden">
            <div className="container mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-8 md:mb-12">
                    <motion.h2
                        className="text-4xl font-extrabold tracking-tight text-slate-900"
                        initial={{ opacity: 0, y: 20 }}
                        animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                        transition={{ duration: 0.7 }}
                    >
                        Kurzustérkép
                    </motion.h2>

                    <motion.div
                        className="w-24 h-1 bg-rajk-green mx-auto mb-6"
                        initial={{ width: 0 }}
                        animate={isVisible ? { width: 96 } : { width: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    />

                    <motion.p
                        className="text-lg md:text-xl text-gray-700 max-w-4xl mx-auto leading-relaxed"
                        initial={{ opacity: 0 }}
                        animate={isVisible ? { opacity: 1 } : { opacity: 0 }}
                        transition={{ delay: 0.2, duration: 0.7 }}
                    >
                        A kollégiumi szakmaiság gerincét az évente több, mint 45 megszervezett kurzus adja. A heti rendszerességgel megtartott, kis létszámú, intenzív és nem utolsó sorban interaktív, fél-egyéves kurzusokat – akárcsak a különböző előadásokat, konferenciákat és blokkszemináriumokat – a kollégisták maguknak szervezik, azokat saját érdeklődésükhöz és igényeikhez igazítják.
                    </motion.p>

                    {categories.length > 0 && (
                        <div className="flex items-center justify-center mt-6 relative hidden md:block">
                            <motion.div
                                className="flex flex-wrap justify-center items-center gap-2 md:gap-4"
                                initial={{ opacity: 0, y: 10 }}
                                animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
                                transition={{ delay: 0.3, duration: 0.7 }}
                            >
                                {/* Mobile filter dropdown */}
                                <div className="relative md:hidden">
                                    <button
                                        onClick={() => setShowFilterMenu(!showFilterMenu)}
                                        className="flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-md text-sm font-medium"
                                    >
                                        <Filter size={16} />
                                        {categories.find(c => c.id === selectedCategory)?.name || "Összes"}
                                        <ChevronDown size={16} className={`transition-transform ${showFilterMenu ? 'rotate-180' : ''}`} />
                                    </button>

                                    {showFilterMenu && (
                                        <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl z-20 py-2">
                                            {categories.map(category => (
                                                <button
                                                    key={category.id}
                                                    className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2
                                                        ${selectedCategory === category.id ? 'font-semibold' : 'font-normal'}`}
                                                    onClick={() => {
                                                        setSelectedCategory(category.id);
                                                        setShowFilterMenu(false);
                                                    }}
                                                >
                                                    <span className={`w-3 h-3 rounded-full bg-${category.color}-500`}></span>
                                                    {category.name}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>

                                {/* Desktop category pills */}
                                <div className="hidden md:flex gap-2 flex-wrap justify-center">
                                    <button
                                        className={`
                                                px-4 py-2 rounded-full text-sm transition-all duration-300
                                                flex items-center gap-2
                                                ${selectedCategory === 'all'
                                            ? 'bg-gray-800 text-white font-medium shadow-md'
                                            : 'bg-white text-gray-700 hover:bg-gray-100'}
                                            `}
                                        onClick={() => setSelectedCategory('all')}
                                    >
                                        <span className={`w-3 h-3 rounded-full bg-kek`}></span>
                                        All Courses
                                    </button>
                                    {categories.map(category => (
                                        <button
                                            key={category.id}
                                            className={`
                                                px-4 py-2 rounded-full text-sm transition-all duration-300
                                                flex items-center gap-2
                                                ${selectedCategory === category.id
                                                    ? 'bg-gray-800 text-white font-medium shadow-md'
                                                    : 'bg-white text-gray-700 hover:bg-gray-100'}
                                            `}
                                            onClick={() => setSelectedCategory(category.id)}
                                        >
                                            <span className={'w-3 h-3 rounded-full'} style={{ backgroundColor: (category as CourseCategory).color ?? '#97D7FB' }}></span>
                                            {category.name}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setShowInfo(!showInfo)}
                                    className="ml-2 p-2 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors"
                                    aria-label="Információ a kurzusokról"
                                >
                                    <Info size={18} className="text-gray-600" />
                                </button>
                            </motion.div>
                        </div>
                    )}

                    {/* Info card */}
                    <AnimatePresence>
                        {showInfo && (
                            <motion.div
                                className="bg-white rounded-lg shadow-lg p-4 mt-4 max-w-2xl mx-auto text-left relative"
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.3 }}
                            >
                                <button
                                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                                    onClick={() => setShowInfo(false)}
                                >
                                    ✕
                                </button>
                                <h3 className="font-bold text-lg mb-2">Tudnivalók a kurzusokról</h3>
                                <p className="text-sm text-gray-700 mb-2">
                                    A kurzustérképen az idei kurzusaink egy részét jelentettük meg. Kattints az ikonokra a részletes tematikáért!
                                </p>
                                <p className="text-sm text-gray-700">
                                    A kurzusok színkódolása segít eligazodni a különböző tudományterületek között. Használd a szűrőket a könnyebb böngészéshez.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Interactive Course Map */}
                <div className="relative w-full max-w-6xl mx-auto rounded-xl shadow-2xl hidden md:block">
                    {/* Background Image */}
                    <div className="relative w-full" style={{ paddingBottom: '60%' }}>
                        <Image
                            src="/course-map.jpg"
                            alt="Kurzusok háttér"
                            className="absolute inset-0 w-full h-full object-cover"
                            width={1200}
                            height={720}
                            priority
                        />

                        {/* Course Circles Overlay */}
                        <div className="absolute inset-0">
                            {filteredCourses.map((course, index) => (
                                <CourseCircle
                                    key={course.id}
                                    icon={course.icon}
                                    title={course.title}
                                    link={course.link ? course.link : `/szakma`}
                                    position={course.position}
                                    delay={index * 100}
                                    category={course.category}
                                    description={course.description!}
                                />
                            ))}
                        </div>
                    </div>
                </div>

                {/* Course count indicator */}
                <motion.div
                    className="mt-6 text-center text-gray-600 text-sm hidden md:block"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: isVisible ? 1 : 0 }}
                    transition={{ delay: 0.8 }}
                >
                    {selectedCategory === "all"
                        ? `Összesen ${courses.length} kurzus`
                        : `${filteredCourses.length} kurzus a(z) "${categories.find(c => c.id === selectedCategory)?.name}" kategóriában`}
                </motion.div>
            </div>
        </section>
    );
};