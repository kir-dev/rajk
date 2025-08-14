'use client'

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {CourseCategory} from "@/payload-types";
import {
    BookOpen,
    Calculator,
    Globe,
    Palette,
    Code,
    Users,
    TrendingUp,
    Lightbulb,
    Target,
    Database,
    Settings,
    Puzzle,
    Monitor,
    FileText,
    Search,
    BarChart,
    Download,
    MessageCircle,
    PenTool,
    Layers
} from 'lucide-react';

const IconComponent = ({ iconName, className = "", size = 24 }) => {
    const iconMap = {
        BookOpen, Calculator, Globe, Palette, Code, Users, TrendingUp, Lightbulb,
        Target, Database, Settings, Puzzle, Monitor, FileText, Search, BarChart,
        Download, MessageCircle, PenTool, Layers
    };

    const Icon = iconMap[iconName];
    return Icon ? <Icon size={size} className={className} /> : null;
}

interface CourseCircleProps {
    icon: string;
    title: string;
    link: string;
    position: {
        top: string;
        left: string;
    };
    delay?: number;
    category: string | CourseCategory;
    description?: string;
}

export const CourseCircle = ({
    icon,
    title,
    link,
    position,
    delay = 0,
    category = "default",
    description
}: CourseCircleProps) => {
    const [isHovered, setIsHovered] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Use requestAnimationFrame to ensure we're in the browser
        const timeoutId = setTimeout(() => {
            setIsVisible(true);
        }, delay);

        return () => clearTimeout(timeoutId);
    }, [delay]);

    const handleClick = () => {
        window.open(link, '_blank');
    };

    return (
        <div
            className="absolute cursor-pointer group"
            style={{
                top: position.top,
                left: position.left,
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={handleClick}
        >
            {/* Main Circle */}
            <div className="relative">
                <motion.div
                    className={`
                        w-12 h-12 md:w-16 md:h-16 
                        ${(category as CourseCategory).color}
                        bg-zold 
                        rounded-full 
                        flex items-center justify-center 
                        transition-all duration-300
                        shadow-lg hover:shadow-xl
                    `}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={isVisible ? {
                        scale: isHovered ? 1.1 : 1,
                        opacity: 1
                    } : {
                        scale: 0,
                        opacity: 0
                    }}
                    transition={{
                        duration: 0.5,
                        delay: delay / 1000,
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                    }}
                >
                    <IconComponent iconName={icon} className="text-white" size={20} />
                </motion.div>

                {/* Hover Tooltip */}
                <AnimatePresence>
                    {isHovered && (
                        <motion.div
                            className={`
                                absolute -top-16 left-1/2 transform -translate-x-1/2
                                bg-white backdrop-blur-sm bg-opacity-95 border border-gray-200 
                                rounded-lg px-4 py-3
                                text-sm font-medium bg-${(category as CourseCategory).color}
                                bg-zold
                                shadow-xl z-10
                                max-w-[180px] md:max-w-[220px]
                                pointer-events-none
                            `}
                            initial={{ opacity: 0, y: 10, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.9 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="font-semibold mb-1">{title}</div>
                            {description && <p className="text-xs text-gray-600 line-clamp-2">{description}</p>}
                            {/* Tooltip Arrow */}
                            <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-white"></div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Pulse Ring Effect */}
                <AnimatePresence>
                    {isVisible && (
                        <motion.div
                            className={`absolute inset-0 rounded-full border-2 bg-${(category as CourseCategory).color} bg-zold`}
                            initial={{ scale: 1, opacity: 0.3 }}
                            animate={isHovered ? {
                                scale: [1, 1.5, 1.8],
                                opacity: [0.7, 0.4, 0],
                                transition: {
                                    duration: 1.5,
                                    repeat: Infinity,
                                    repeatType: "loop"
                                }
                            } : {
                                scale: 1,
                                opacity: 0.3
                            }}
                        />
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};