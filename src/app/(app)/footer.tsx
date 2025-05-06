"use client"

import Link from "next/link"
import {ArrowUp, Facebook, Instagram, Youtube} from "lucide-react"
import {useEffect, useState} from "react"
import Image from "next/image"

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
        window.scrollTo({ top: 0, behavior: "smooth" })
    }

    return (
        <footer className="relative bg-rajk-green text-white">
            {/* Wavy border */}
            <div className=" bg-transparent absolute top-0 left-0 w-full overflow-hidden leading-0 transform translate-y-[-98%]">
                <svg
                    className="relative block w-full h-[70px]"
                    data-name="Layer 1"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >

                    <path
                        d="M985.66,92.83C906.67,72,823.78,31,743.84,14.19c-82.26-17.34-168.06-16.33-250.45.39-57.84,11.73-114,31.07-172,41.86A600.21,600.21,0,0,1,0,27.35V120H1200V95.8C1132.19,118.92,1055.71,111.31,985.66,92.83Z"
                        fill="#23A455"
                    ></path>
                </svg>
            </div>

            <div className="container mx-auto px-6 pt-16 pb-8">
            <div className="flex items-end justify-between max-lg:flex-col max-lg:items-start gap-8">
                    {/* Logo and left column */}
                    <div className="space-y-6">
                        <Image
                            src="/rajk_logo2_white.png"
                            alt="Rajk Szakkollégium Logo"
                            width={150}
                            height={150}
                            className="mb-4"
                        />
                        <div className="">
                            <p>Rajk Szakkollégium Alapítvány</p>
                            <p>1085, Budapest, Horánszky u. 6.</p>
                            <p>Adószám: 19624806-2-42</p>
                            <p>Bankszámlaszám: 10700347-69549474-51100005 (CIB)</p>
                        </div>
                    </div>

                    {/* Middle column */}
                    {/*<div className="space-y-6">
                        <h3 className="text-xl font-semibold mb-4">Projektjeink</h3>
                        <div className="space-y-2">
                            <p>
                                Szabó Kálmán
                                <br />
                                Tehetségprogram
                            </p>
                            <p></p>
                            <p className="mt-6">Szexi Közgáz Blog</p>
                            <p className="mt-6">Rajk Agóra</p>
                        </div>
                    </div>*/}

                    {/* Right column */}
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold mb-4">Elérhetőségünk</h3>
                        <div>
                            <p className="font-bold">diakbizottsag@rajk.eu</p>
                            <p>Diákbizottság</p>
                            <p className = "mt-6 font-bold">+36303508715</p>
                            <p>Főző Zsolt, kollégiumi igazgató</p>
                        </div>
                    </div>
                <div></div>
            </div>

                {/* Social media icons */}
                <div className="flex justify-end mt-16 space-x-6">
                    <Link href="#" className="hover:opacity-80 transition-opacity">
                        <Facebook size={28} />
                    </Link>
                    <Link href="#" className="hover:opacity-80 transition-opacity">
                        <Instagram size={28} />
                    </Link>
                    <Link href="#" className="hover:opacity-80 transition-opacity">
                        <Youtube size={28} />
                    </Link>
                </div>

                {/* Scroll to top button */}
                {showScrollTop && (
                    <button
                        onClick={scrollToTop}
                        className="fixed bottom-8 right-8 bg-white text-rajk-green p-3 rounded-md shadow-md hover:bg-gray-100 transition-all"
                        aria-label="Scroll to top"
                    >
                        <ArrowUp size={24} />
                    </button>
                )}
            </div>
        </footer>
    )
}
