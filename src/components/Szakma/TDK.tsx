'use client'

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import getTDKs from "@/payload-find/getTDKs";
import {Person, Tdk} from "@/payload-types";

// Dropdown props interface
interface DropdownProps {
    options: { id: number, author: Person[], title: string, sectionName: string }[];
    placeholder?: string;
    onChange?: (value: string) => void;
    className?: string;
}

// Dropdown component
const Dropdown = ({ options, placeholder = "Select an option", className = "" }: DropdownProps) => {
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

    return (
        <div className={`relative ${className} text-black`} ref={dropdownRef}>
            <button
                type="button"
                className="flex items-center justify-between w-full px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => setIsOpen(!isOpen)}
                aria-haspopup="listbox"
                aria-expanded={isOpen}
            >
                <span className="block truncate">{placeholder}</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {isOpen && (
                <div className="z-10 w-full mt-1 bg-white rounded-md shadow-lg max-h-60 overflow-auto">
                    <ul className="py-1" role="listbox">
                        {options.map((option) => (
                            <li
                                key={option.id}
                                className="px-4 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                                role="option"
                            >
                                <div className="flex flex-row items-center justify-between">
                                    <div className={`flex flex-col`}>
                                        {option.author.map((author, index) => (
                                            <div key={index} className="flex items-center">
                                                <span className="ml-2">{author.name}</span>
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex flex-col items-end">
                                        <span className="font-semibold">{option.title}</span>
                                        <span className="text-xs text-gray-500">{option.sectionName}</span>
                                    </div>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default function TDK() {
    const [tdks, setTdks] = useState<Tdk[]>([]);

    useEffect(() => {
        async function fetchTDKs() {
            const fetchedTDKs = await getTDKs();
            setTdks(fetchedTDKs);
        }
        fetchTDKs();
    }, []);

    const dropdownContent = tdks.map(tdk => ({
        id: tdk.id,
        author: tdk.author || "",
        title: tdk.title || "Untitled TDK",
        sectionName: tdk.section_name || "Unknown Section",
        placement: tdk.placement,
    }));

    return (
        <div className="min-h-screen container mx-auto p-8 text-black">
            <div className="flex flex-row justify-between items-center">
                <Image src={"/tdk.png"} alt={"Trophy"} width={500} height={500} />
                <div className="w-full">
                    <h2 className="text-2xl font-bold mb-4">TDK</h2>
                    <Dropdown
                        options={dropdownContent.filter(tdk => {return tdk.placement == 1})}
                        placeholder="Első helyezetek"
                    />
                    <Dropdown
                        options={dropdownContent.filter(tdk => {return tdk.placement == 2})}
                        placeholder="Második helyezetek"
                    />
                    <Dropdown
                        options={dropdownContent.filter(tdk => {return tdk.placement == 3})}
                        placeholder="Harmadik helyezetek"
                    />
                </div>
            </div>
        </div>
    );
}