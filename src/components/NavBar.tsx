import React from "react";
import Image from "next/image";
import NavBarItem from "@/components/NavBarItem";
import NavBarDropDown from "@/components/NavBarDropDown";
import LanguageSelector from "@/components/LanguageSelector";

export default function NavBar() {
    return (<div className = 'bg-rajk-green w-full p-4 flex justify-between relative '>
        <div className = 'mt-1'>
            <Image height = {120} width = {120} src = '/rajk_logo2_white.png' alt = 'Rajka'></Image>
        </div>
        <div className = 'flex justify-end w-full gap-2 w-full items-center'>
            <NavBarDropDown text = 'Rólunk' subCategories = {[['Közösség','/community'],['Alumni','/alumni'],['Kisfilmek','/videos']]}></NavBarDropDown>
            <NavBarItem text = 'Szakma' href = '/profession'></NavBarItem>
            <NavBarItem text = 'Társasadalmi felelősségvállalás' href = '/social-responsibility'></NavBarItem>
            <NavBarItem text = 'Díjak' href = '/awards'></NavBarItem>
            <NavBarItem text = 'Jelentkezés' href = '/application' bordered = {true}></NavBarItem>
            <NavBarItem text = 'Támogatás' href = '/support' bordered = {true}></NavBarItem>
            <LanguageSelector/>
        </div>
    </div>)
}

