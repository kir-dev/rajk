"use client"

import Link from "next/link"
import {ArrowUp, Facebook, Instagram, Youtube, Linkedin} from "lucide-react"
import {useEffect, useState} from "react"
import Image from "next/image"
import WawyBorder from "@/components/WawyBorder";

/*
Alternative SVG path for the wavy border
<path
d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
fill="#5EB25E"
opacity="1"
></path>
 */

export default function Footer() {
    const [showScrollTop, setShowScrollTop] = useState(false)
    
    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 300) {
                setShowScrollTop(true)
            } else {
                setShowScrollTop(false)
            }
        }
        
        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])
    
    const scrollToTop = () => {
        window.scrollTo({top: 0, behavior: "smooth"})
    }
    
    return (
        <footer className = "relative bg-zold text-white w-full">
            {/* Wavy border */}
            <WawyBorder direction={"top"} color={"green"} szin={"zold"} backgroundColor={"bg-bezs"}/>

            <div className = "px-6 pt-4 pb-8 w-full">
                {/* Logo and left column */}
                <div
                    className = "flex items-end justify-between max-lg:flex-col max-lg:items-start gap-8 w-full">
                    <div>
                        <Image
                            src = "/logo-white/Rajk_logo_2025_white_a.svg"
                            alt = "Rajk Szakkollégium Logo"
                            width = {150}
                            height = {150}
                            className = "mb-4"
                        />
                        <div>
                            <p>Rajk Szakkollégium Alapítvány</p>
                            <p>1085, Budapest, Horánszky u. 6.</p>
                            <p>Adószám: 19624806-2-42</p>
                            <p>Bankszámlaszám: 10700347-69549474-51100005 (CIB)</p>
                        </div>
                    </div>

                    <div>
                        <h3 className = "text-xl font-semibold mb-4">Elérhetőségünk</h3>
                        <div>
                            <p className = "font-bold">diakbizottsag@rajk.eu</p>
                            <p>Diákbizottság</p>
                            <p className = "mt-6 font-bold">+36306452537</p>
                            <p>Kaderják Anita, kollégiumi igazgató</p>
                        </div>
                    </div>

                    {/* Social media icons */}
                    <div className = "flex justify-end mt-16 mr-24 gap-8">
                        <Link target="_blank" href = "https://www.facebook.com/rajkofficial/" className = "hover:opacity-80 transition-opacity">
                            <Facebook size = {28}/>
                        </Link>
                        <Link target="_blank" href = "https://www.instagram.com/rajkofficial/" className = "hover:opacity-80 transition-opacity">
                            <Instagram size = {28}/>
                        </Link>
                        <Link target="_blank" href = "https://www.youtube.com/@rajkcollegeforadvancedstud1420" className = "hover:opacity-80 transition-opacity">
                            <Youtube size = {28}/>
                        </Link>
                        <Link target="_blank" href = "https://www.linkedin.com/school/rajk" className = "hover:opacity-80 transition-opacity">
                            <Linkedin size = {28}/>
                        </Link>
                        {showScrollTop && (
                            <button
                                onClick = {scrollToTop}
                                className = "fixed bottom-8 right-8 bg-white text-rajk-green p-3 rounded-md shadow-md hover:bg-gray-100 transition-all z-50"
                                aria-label = "Scroll to top"
                            >
                                <ArrowUp size = {24}/>
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </footer>
    )
}
