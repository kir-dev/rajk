"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import NavBarItem from "@/components/NavBar/NavBarItem";
import NavBarDropDown from "@/components/NavBar/NavBarDropDown";
import LanguageSelector from "@/components/NavBar/LanguageSelector";
import MobileNavBar from "@/components/NavBar/MobileNavBar";
import { getNavItems } from "@/utils/navbar-structure";
import Link from "next/link";
import { useLanguage } from "@/components/LanguageProvider";

export default function NavBar() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [atTop, setAtTop] = useState(true);
  const { lang } = useLanguage();
  const navItems = getNavItems(lang);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;

      // Determine if we're at the top of the page
      const isAtTop = currentScrollPos < 10;
      setAtTop(isAtTop);

      // Show navbar when scrolling up or at the top
      const isVisible = prevScrollPos > currentScrollPos || isAtTop;

      // Update state
      setVisible(isVisible);
      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <div
      className={`fixed top-0 left-0 right-0 z-50 transition-transform duration-300 bg-bezs ${
        visible ? "translate-y-0" : "-translate-y-full"
      } ${!atTop ? "shadow-md" : ""}`}
    >
      <div className="flex flex-col relative text-white">
        <div className="bg-zold w-full py-2 px-4 flex justify-between">
          <Link href={"/"}>
            <div className="mb-1">
              <Image
                height={140}
                width={140}
                src="/logo-white/Rajk_logo_2025_white_a.svg"
                alt="Rajka"
              />
            </div>
          </Link>
          <div className="max-lg:hidden flex justify-end w-full gap-2 items-center">
            {navItems.map((item) => (
              <div key={item.label}>
                {item.subItems && (
                  <NavBarDropDown
                    text={item.label}
                    href={item.href}
                    bordered={item.bordered}
                    subCategories={item.subItems.map((sub) => [
                      `${sub.label}`,
                      sub.href,
                    ])}
                  />
                )}
                {!item.subItems && (
                  <NavBarItem
                    text={item.label}
                    href={item.href}
                    bordered={item.bordered}
                  />
                )}
              </div>
            ))}
            <div className="mx-4">
              <LanguageSelector />
            </div>
          </div>
          <div className="lg:hidden">
            <MobileNavBar />
          </div>
        </div>
      </div>
    </div>
  );
}