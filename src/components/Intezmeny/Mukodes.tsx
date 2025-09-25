import MukodesCard from "@/components/Intezmeny/MukodesCard";
import {Sofa} from "lucide-react";
import InteractiveBuilding from "@/components/Intezmeny/InteractiveBuilding";
import type { Lang } from "@/components/LanguageProvider";
import { t } from "@/lib/utils";

export default function Mukodes({ lang }: { lang: Lang }) {
    const text = t(
        lang,
        "A Rajk Szakkollégium mint intézmény egy demokratikusan működő, hallgatók által irányított közösség, amely az önszerveződés elvére épülve biztosítja tagjai számára a magas színvonalú szakmai fejlődés és a közösségi felelősségvállalás egyedülálló kombinációját. A legfőbb döntéshozó testület a minden tag szavazati jogával működő Kollégiumi Gyűlés, a mindennapi működést pedig az évente választott Diákbizottság koordinálja. A szakmai életet a Szakmai Munka Tanácsa irányítja, amely évente 40–50, kis létszámú, interaktív kurzust szervez a hallgatók igényeire építve. A rendszerszintű hallgatói autonómia mellett a korábbi szakkollégisták – igazgatók, nevelőtanárok és szakmai mentorok – támogató szerepe biztosítja a hagyományok folytonosságát, így a Rajk a kiemelkedő teljesítményre épülő, dinamikusan megújuló intézményként működik, és ezen belül további bizottságokra is szegmentálódik különböző funkciók mentén, mint például a kommunikáció, az épület vagy a pénzügyek.",
        "Rajk College is a democratically run, student-led institution built on the principle of self-organization, offering a unique combination of high-level academic development and social responsibility. The main decision-making body is the College Assembly, where every member has voting rights, while day-to-day operations are coordinated by the annually elected Student Committee. Academic life is guided by the Council for Academic Work, which organizes 40–50 small, interactive courses each year tailored to students’ needs. Alongside strong student autonomy, former members—directors, resident tutors, and academic mentors—play a supportive role, ensuring continuity of traditions. As a result, Rajk functions as a high-performance, continuously renewing institution, with additional committees overseeing areas such as communications, facilities, and finance."
    )

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