"use client";

import React from "react";
import Image from "next/image";

export default function GalleryPage() {
    const images = [
        "/images/480049921_963164562459517_8598428656334044422_n.jpg",
        "/images/480695926_967740262001947_8914616869647242352_n.jpg",
        "/images/481206606_968280881947885_3211944167194042401_n.jpg",
        "/images/487699152_993802712729035_8276642340931754630_n.jpg",
    ];
    
    return (
        <>
            <div className = "w-full">
                <div className = "flex flex-col w-full items-center">
                    {images.map((image, index) => (
                        <div key = {index} className = "w-1/2 p-2">
                            <Image
                                src = {image}
                                alt = {`Gallery image ${index + 1}`}
                                className = "w-full h-auto"
                                width = {2000}
                                height = {2000}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}

