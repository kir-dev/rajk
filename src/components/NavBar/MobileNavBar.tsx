"use client";

import {Menu, X} from "lucide-react";
import {useState} from "react";
import {navItems} from "@/utils/navbar-structure";
import NavBarItem from "./NavBarItem";
import LanguageSelector from "@/components/NavBar/LanguageSelector";

export default function MobileNavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className='h-full'>
            <button
                onClick={() => setMenuOpen(!menuOpen)}
                className='h-full mr-2 transition-transform duration-200 active:scale-95'
                aria-label="Toggle menu"
            >
                {menuOpen ? <X size={32} color="white"/> : <Menu size={32} color="white"/>}
            </button>

            {menuOpen && (
                <>
                    <div
                        className="fixed inset-0 z-40 animate-fade-in"
                        onClick={() => setMenuOpen(false)}
                    />

                    <div className="absolute left-0 top-full w-full bg-rajk-green shadow-2xl animate-slide-down z-50 rounded-b-lg overflow-hidden">
                        <div className="flex flex-col gap-1 px-6 py-6">
                            {navItems.map((item, index) => (
                                <div
                                    key={item.label}
                                    className=""
                                    style={{animationDelay: `${index * 50}ms`}}
                                >
                                    <NavBarItem
                                        text={item.label}
                                        href={item.href}
                                        bordered={item.bordered}
                                        onClick={() => setMenuOpen(false)}
                                    />
                                    {item.subItems && (
                                        <div className="ml-6 mt-1 mb-2 flex flex-col gap-0.5 border-l-2 border-white/30 pl-4">
                                            {item.subItems.map((sub) => (
                                                <NavBarItem
                                                    key={sub.href}
                                                    text={sub.label}
                                                    href={sub.href}
                                                    onClick={() => setMenuOpen(false)}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}

                            <div className="mt-6 pt-4 border-t border-white/30">
                                <LanguageSelector />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}