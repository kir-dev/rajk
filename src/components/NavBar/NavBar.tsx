import React from "react";
import Image from "next/image";
import NavBarItem from "@/components/NavBar/NavBarItem";
import NavBarDropDown from "@/components/NavBar/NavBarDropDown";
import LanguageSelector from "@/components/NavBar/LanguageSelector";
import MobileNavBar from "@/components/NavBar/MobileNavBar";
import {navItems} from "@/utils/navbar-structure";
import ExtraNavBarStrip from "@/components/NavBar/ExtraNavBarStrip";

export default function NavBar() {
    return (
        <div className='flex flex-col relative'>
            <ExtraNavBarStrip></ExtraNavBarStrip>
            <div className = 'bg-rajk-green w-full p-4 flex justify-between  '>
                <div className = 'mt-1'>
                    <Image height = {120} width = {120} src = '/rajk_logo2_white.png' alt = 'Rajka'></Image>
                </div>
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

