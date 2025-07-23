"use client";

import {Menu, X} from "lucide-react";
import {useState} from "react";
import {navItems} from "@/utils/navbar-structure";
import NavBarItem from "./NavBarItem";
import LanguageSelector from "@/components/NavBar/LanguageSelector";

export default function MobileNavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    
    return (<div className='h-full'>
        <button onClick = {() => setMenuOpen(!menuOpen)} className='h-full mr-2'>
            {menuOpen ? <X size = {32} color = "white"/> : <Menu size = {32} color = "white"/>}
        </button>
        {menuOpen && (
        <div className="absolute left-0 top-full w-full bg-white shadow-md animate-slide-down z-50">
          <div className="flex flex-col gap-2 px-4 bg-rajk-green pb-4 pl-8 w-full">
            {navItems.map((item) => (
              <div key={item.label}>
                <NavBarItem
                  text={item.label}
                  href={item.href}
                  bordered={item.bordered}
                  onClick={() => setMenuOpen(false)}
                />
                {item.subItems && (
                  <div className="ml-4 mt-1 flex flex-col gap-0 w-full">
                    {item.subItems.map((sub) => (
                      <NavBarItem
                        key={sub.href}
                        text={`${sub.label}`}
                        href={sub.href}
                        onClick={() => setMenuOpen(false)}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-4">
              <LanguageSelector />
            </div>
          </div>
        </div>
        )}
    </div>)
}
