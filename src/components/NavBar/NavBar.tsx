import React from "react";
import Image from "next/image";
import NavBarItem from "@/components/NavBar/NavBarItem";
import NavBarDropDown from "@/components/NavBar/NavBarDropDown";
import LanguageSelector from "@/components/NavBar/LanguageSelector";
import MobileNavBar from "@/components/NavBar/MobileNavBar";
import {navItems} from "@/utils/navbar-structure";
import Link from "next/link";

export default function NavBar() {
    return (
        <div className='flex flex-col relative text-white'>
            {/*<ExtraNavBarStrip></ExtraNavBarStrip>*/}
            <div className = 'bg-zold w-full py-2 px-4 flex justify-between  '>
                <Link href={'/'}>
                    <div className='mb-1'>
                        <Image height = {140} width = {140} src = '/logo-white/Rajk_logo_2025_white_a.svg' alt = 'Rajka'></Image>
                    </div>
                </Link>
                <div className = 'max-lg:hidden flex justify-end w-full gap-2 w-full items-center'>
                    {navItems.map((item) => (
                        <div key = {item.label}>
                            {item.subItems && (
                                <NavBarDropDown text = {item.label}
                                                subCategories = {item.subItems.map((sub) => [`↳ ${sub.label}`, sub.href])}/>
                            )}
                            {!item.subItems && (
                                <NavBarItem
                                    text = {item.label}
                                    href = {item.href}
                                    bordered = {item.bordered}
                                />
                            )}
                        </div>
                    ))}
                    <div className = 'mx-4'>
                        <LanguageSelector/>
                    </div>
                </div>
                <div className = 'lg:hidden'>
                    <MobileNavBar/>
                </div>
            </div>
        </div>)
}

