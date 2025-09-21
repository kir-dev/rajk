import MukodesCard from "@/components/Intezmeny/MukodesCard";
import {Sofa} from "lucide-react";
import InteractiveBuilding from "@/components/Intezmeny/InteractiveBuilding";

export default function Mukodes() {
    const text = "A Rajk mindig is érzékenyen reagált a közéleti folyamatokra – a rendszerváltás előtti fórumoktól egészen a napjainkban felmerülő társadalmi kérdésekig. A kollégiumban rendszeresen tartunk előadásokat, vitákat és saját kezdeményezésű projekteket, amelyek arra ösztönöznek, hogy túllépjünk a szűken vett szakmai nézőponton, és felelősen gondolkodjunk a közélet és a társadalom egészéről. A cél nem pusztán az ismeretszerzés, hanem az, hogy a tagok készek legyenek aktívan alakítani a környezetüket – és ez a szemlélet a végzés után is meghatározza a rajkosok gondolkodását."
    return (
        <div className="container mx-auto">
            <div className="flex flex-row gap-10 mt-10 px-4">
                <div className="relative w-full">
                    <InteractiveBuilding/>
                </div>
                <MukodesCard title={""} text={text} Icon={Sofa} />
            </div>
        </div>
    )
}