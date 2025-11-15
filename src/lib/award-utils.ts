import {Award} from "@/payload-types";
import {Lang} from "@/components/LanguageProvider";

/**
 * Returns a title for the given award in the specified language.
 */
export function getAwardDescription(award: Award, lang: Lang): string {
    switch (award.name) {
        case "Neumann János-díj": {
            if (lang === "HU") {
                return "A Neumann János-díjat a Rajk László Szakkollégium alapította 1994-ben, és évente ítélik oda egy kiemelkedő tudósnak a pontos társadalomtudományok területén, akinek munkássága hosszú időn keresztül jelentős hatást gyakorolt a szakkollégium hallgatóinak tanulmányaira és szellemi tevékenységére. 2013-ban, az éves díjtól elkülönítve, Kenneth J. Arrow kapta a tiszteletbeli Neumann János-díjat.";
            }
            return "The John von Neumann Award, named after John von Neumann is given annually by the Rajk College for Advanced Studies (Budapest, Hungary), to an outstanding scholar in the exact social sciences, whose works have had substantial influence over a long period of time on the studies and intellectual activity of the students of the college. The award was established in 1994 and is given annually. In 2013, separately from the annual prize, Kenneth J. Arrow was given the Honorary John von Neumann Award.";

        }
        case "Herbert Simon-díj": {
            if (lang === "HU") {
                return "A Herbert Simon-díjat a Rajk László Szakkollégium évente ítéli oda egy olyan tudósnak, aki jelentős hozzájárulást tett a döntéshozatal és problémamegoldás területén, tükrözve Herbert A. Simon munkásságának interdiszciplináris jellegét. A díj elismeri azokat a kiemelkedő kutatásokat, amelyek tartós hatást gyakoroltak mind az akadémiai tudományos életre, mind a gyakorlati alkalmazásokra különböző területeken.";
            }
            return "The Herbert Simon Award is given annually by the Rajk College for Advanced Studies to a scholar who has made significant contributions to the field of decision-making and problem-solving, reflecting the interdisciplinary nature of Herbert A. Simon's work. The award recognizes outstanding research that has had a lasting impact on both academic scholarship";
        }
    }

    throw new Error("Unknown award name: " + award.name);
}

export function getAwardLocalizedName(award: Award, lang: Lang): string {
    switch (award.name) {
        case "Neumann János-díj": {
            return lang === "HU" ? "Neumann János-díj" : "John von Neumann Award";
        }
        case "Herbert Simon-díj": {
            return lang === "HU" ? "Herbert Simon-díj" : "Herbert Simon Award";
        }
    }

    throw new Error("Unknown award name: " + award.name);
}