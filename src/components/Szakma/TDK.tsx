'use client'

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import getTDKs from "@/payload-find/getTDKs";
import { Person, Tdk } from "@/payload-types";
import { motion, AnimatePresence } from "framer-motion";

// Updated interface to match the data structure
interface DropdownProps {
    options: {
        id: number,
        author: Person[],
        title: string,
        sectionName: string
    }[];
    placement: number;
    placeholder?: string;
    className?: string;
}

// Improved dropdown component
const Dropdown = ({ options, placement, placeholder = "Select an option", className = "" }: DropdownProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Close dropdown when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    // Color themes based on placement
    const getTheme = (place: number) => {
        switch (place) {
            case 1: return "bg-amber-100 border-amber-500 hover:bg-amber-50";
            case 2: return "bg-gray-100 border-gray-400 hover:bg-gray-50";
            case 3: return "bg-orange-100 border-orange-400 hover:bg-orange-50";
            default: return "bg-white border-gray-300 hover:bg-gray-50";
        }
    };

    return (
        <div className={`relative mb-4 ${className} text-black`} ref={dropdownRef}>
            <button
                type="button"
                className={`flex items-center justify-between w-full px-4 py-3 text-left 
                   border-2 rounded-lg shadow-sm focus:outline-none focus:ring-2 
                   focus:ring-blue-400 transition-all duration-200 ${getTheme(placement)}`}
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
        <span className="flex items-center">
          <span className="block font-medium">{placeholder}</span>
        </span>
                <motion.svg
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="w-5 h-5 ml-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="z-20 w-full mt-2 bg-white rounded-lg shadow-xl max-h-80 overflow-auto border border-gray-200"
                    >
                        {options.length > 0 ? (
                            <ul className="py-1" role="listbox">
                                {options.map((option) => (
                                    <motion.li
                                        whileHover={{ backgroundColor: "#f3f4f6" }}
                                        key={option.id}
                                        className="px-4 py-3 text-sm cursor-pointer border-b last:border-b-0 border-gray-100"
                                        role="option"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                                            <div className="font-medium mb-1 md:mb-0 text-lg">{option.title}</div>
                                            <div className="text-sm text-gray-600">{option.sectionName}</div>
                                        </div>
                                        <div className="mt-2 flex flex-wrap gap-1">
                                            {option.author.map((author, index) => (
                                                <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-50 text-rajk-green">
                                                  {author.name}
                                                </span>
                                            ))}
                                        </div>
                                    </motion.li>
                                ))}
                            </ul>
                        ) : (
                            <div className="p-4 text-center text-gray-500">No entries found</div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function TDK() {
    const [tdks, setTdks] = useState<Tdk[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchTDKs() {
            setLoading(true);
            try {
                const fetchedTDKs = await getTDKs();
                setTdks(fetchedTDKs);
            } catch (error) {
                console.error("Error fetching TDKs:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchTDKs();
    }, []);

    // Helper function to convert any author format to Person[]
    const convertToPersonArray = (author: any): Person[] => {
        if (!author) return [];
        if (Array.isArray(author)) {
            return author
                .filter(a => typeof a === 'object' && a !== null)
                .map(a => ({
                    id: a.id || 0,
                    name: a.name || 'Unknown',
                    updatedAt: a.updatedAt || '',
                    createdAt: a.createdAt || ''
                }));
        }
        if (typeof author === 'object' && author !== null) {
            return [{
                id: author.id || 0,
                name: author.name || 'Unknown',
                updatedAt: author.updatedAt || '',
                createdAt: author.createdAt || ''
            }];
        }
        return [];
    };

    // Process TDKs for each placement category
    const processTdksByPlacement = (placement: number) => {
        return tdks
            .filter(tdk => tdk.placement === placement)
            .map(tdk => ({
                id: typeof tdk.id === 'number' ? tdk.id : 0,
                author: convertToPersonArray(tdk.author),
                title: tdk.title || "Untitled TDK",
                sectionName: tdk.section_name || "Unknown Section",
            }));
    };

    return (
        <div className="min-h-screen container mx-auto p-4 md:p-8 text-black">
            <h1 className="text-3xl font-bold mb-8 text-center">TDK Eredmények</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                <div className="hidden md:block">
                    <Image
                        src="/tdk.png"
                        alt="TDK Trophy"
                        width={500}
                        height={500}
                        className="w-full max-w-md mx-auto rounded-lg"
                    />
                </div>

                <div className="w-full">
                    {loading ? (
                        <div className="flex items-center justify-center h-40">
                            <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : (
                        <>
                            <Dropdown
                                options={processTdksByPlacement(1)}
                                placement={1}
                                placeholder="Első helyezettek"
                                className="mb-4"
                            />
                            <Dropdown
                                options={processTdksByPlacement(2)}
                                placement={2}
                                placeholder="Második helyezettek"
                                className="mb-4"
                            />
                            <Dropdown
                                options={processTdksByPlacement(3)}
                                placement={3}
                                placeholder="Harmadik helyezettek"
                            />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}