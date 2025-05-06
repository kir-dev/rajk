"use client";
import Image from "next/image";
import React from "react";
import {Download} from "lucide-react";

export default function ApplyPage() {
    
    
    return (
        <div className = "flex flex-col justify-center my-20 bg-foreground">
            <div className = "flex flex-col items-center bg-rajk-green">
                
                <h1 className = "text-4xl font-bold mb-4 mt-4 text-center">{"Ajtókat nyitunk a világra"}
                    <br/> {"-Rajk a Szakkollégium-"}</h1>
                {/*<div className = "flex flex-row items-center gap-6 justify-center mb-4">*/}
                <div className = "grid grid-cols-1 md:grid-cols-2 gap-6 my-8">
                    <div className = "flex flex-col self-end items-end">
                        <p className = "text-4xl w-1/2 text-right font-bold mr-2 mb-4">Töltsd le a 2025-ös kérdőívet!</p>
                        <a
                            href = "/2025_Rajk-kerdoiv-2.pdf"
                            download
                            className = "m-2 font-bold text-foreground py-2 px-4 rounded-md h-fit flex gap-2 items-center hover:bg-green-700 duration-100 inline-flex bg-green-800"
                        >
                                <Download className = "mr-2" size = {20}/>
                                Letöltés
                        </a>
                    </div>
                    <Image width = {450} height = {400} src = {"/felvi.png"} alt = {"Felvételi"}></Image>
                </div>
            </div>
        </div>
    )
}
