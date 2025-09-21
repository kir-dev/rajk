import MukodesCard from "@/components/Intezmeny/MukodesCard";
import {Sofa} from "lucide-react";
import InteractiveBuilding from "@/components/Intezmeny/InteractiveBuilding";

export default function Mukodes() {
    const text = "A Rajk Szakkollégium mint intézmény egy demokratikusan működő, hallgatók által irányított közösség, amely az önszerveződés elvére épülve biztosítja tagjai számára a magas színvonalú szakmai fejlődés és a közösségi felelősségvállalás egyedülálló kombinációját. A legfőbb döntéshozó testület a minden tag szavazati jogával működő Kollégiumi Gyűlés, a mindennapi működést pedig az évente választott Diákbizottság koordinálja. A szakmai életet a Szakmai Munka Tanácsa irányítja, amely évente 40–50, kis létszámú, interaktív kurzust szervez a hallgatók igényeire építve. A rendszerszintű hallgatói autonómia mellett a korábbi szakkollégisták – igazgatók, nevelőtanárok és szakmai mentorok – támogató szerepe biztosítja a hagyományok folytonosságát, így a Rajk a kiemelkedő teljesítményre épülő, dinamikusan megújuló intézményként működik, és ezen belül további bizottságokra is szegmentálódik különböző funkciók mentén, mint például a kommunikáció, az épület vagy a pénzügyek."
    return (
        <div className="container mx-auto">
            <div className="flex flex-col md:flex-row gap-6 md:gap-10 mt-10 px-2 sm:px-4 mb-10">
                <div className="relative w-full mb-6 md:mb-0">
                    <InteractiveBuilding/>
                </div>
                <MukodesCard title={""} text={text} Icon={Sofa} />
            </div>
        </div>
    )
}