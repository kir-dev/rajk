import Image from "next/image";
import ActionButton from "@/components/ActionButton";

export default function ApplyPage() {

    return (
        <div className="flex flex-col justify-center my-20">
            <div className="flex flex-col items-center bg-rajk-green">
                <h1 className="text-4xl font-bold mb-4 mt-4 text-center">{"Ajtókat nyitunk a világra"} <br /> {"-Rajk a Szakkollégium-"}</h1>
                <div className="flex flex-row items-center gap-4 justify-center mb-4">
                    <div className="flex flex-col self-end items-end">
                        <p className="text-4xl w-1/4 text-center">Töltsd le a 2025-ös kérdőívet!</p>
                        <ActionButton className="bg-green-700">Kérdőív letöltése</ActionButton>
                    </div>
                    <Image width={450} height={400} src={"/felvi.png"} alt={"Felvételi"} className="flex"></Image>
                </div>
            </div>
        </div>
    )
}