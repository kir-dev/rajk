import MukodesCard from "@/components/Intezmeny/MukodesCard";
import {BookText, Feather, Send, Sofa} from "lucide-react";
import Image from "next/image";
import InteractiveBuilding from "@/components/Intezmeny/InteractiveBuilding";

export default function Mukodes() {
    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 md:grid-rows-2 gap-10 mt-3 px-4">
                <div className="relative">
                    <InteractiveBuilding/>
                </div>
                <MukodesCard title={"Minidemokrácia"} text={"A Rajk egy demokratikus alapokra épülő intézmény, ahol mindenről magunk dönthetünk. Éppen ezért a kollégium legfontosabb döntéshozó szerve a Kollégiumi Gyűlés, ahol a kollégium minden tagja részt vesz, majd vitákat követően döntéseket hoz. Ezen a fórumon választjuk meg a kollégium vezető bizottságait is, mint a Diákbizottságot, a Szakmai Munka Tanácsát, vagy a Felvételi Bizottságot."} Icon={Feather} />
                <MukodesCard title={"Aktivitás"} Icon={Send} text={"A Rajk célja, hogy társadalmi problémák iránt érzékeny értelmiségieket neveljen. Vitázunk közéletről, Magyarország társadalmi problémáiról, nemzetközi konfliktusokról, az aktualitásoktól függően. De törekszünk arra is, hogy ne álljunk meg a vitáknál, hanem tegyünk aktívan a változásért: ennek érdekében jött létre számtalan társadalmi projektünk."} />
                <MukodesCard title={"Tanulósarok"} Icon={BookText} text={"A kollégium egy szakmai műhely. Tagjaink a társadalomtudományok széles spektrumáról érkeznek, ezzel bővítve egymás tudástárát is. A legjobb magyar oktatóktól tanulunk, a díjainkkal pedig megcélozzuk a külföldi színvonalat. A jelenlegi és volt szakkollégisták szakmai sikerei magukért beszélnek."} />
                <MukodesCard title={"Élettér"} text={"A rajkosok számára a kollégium otthonként is szolgál. 3-5 fős szobákban élünk együtt és díszítjük fel kedvünk szerint. A szobáink mellett azonban nagyon fontosak számunkra a közös tereink is: szintvacsorákat tartunk a konyhában, medencébe lógatjuk a lábunk az udvaron, tanulunk a könyvtárban és bulizunk a pincében."} Icon={Sofa} />
                <Image src={"/rajk_szoptato.svg"} alt={"rajk szék"} width={400} height={400} />
            </div>
        </div>
    )
}