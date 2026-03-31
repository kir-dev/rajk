import Image from "next/image";
import React from "react";
import { GraduationCap, TrendingUp, Users } from "lucide-react";
import Countdown from "@/components/countDown";
import { getPayload } from "payload";
import config from "@payload-config";
import { DownloadQuestionnaire } from "@/components/felveteli/DownloadQuestionnaire";
import { FAQAccordion } from "@/components/felveteli/FAQAccordion";
import MyCarousel from "@/components/MyCarousel";
import { t } from "@/lib/utils";
import { cookies } from "next/headers";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Felvételi | Rajk Szakkollégium",
    description: "Jelentkezz a Rajk Szakkollégiumba!",
};

export default async function ApplyPage() {
    const cookieStore = await cookies();
    const lang = (cookieStore.get("lang")?.value as "HU" | "EN") || "HU";
    
    const payload = await getPayload({ config });
    const recruitmentPictures = await payload.find({
        collection: "recruitment-pictures",
        limit: 10,
    });

    const releaseDate = new Date('2026-04-22T08:00:00');
    const submissionDeadline = new Date('2026-05-13T19:59:59');

    return (
        <div className="bg-bezs overflow-hidden">
            <div className="flex flex-col justify-center pb-20">
                {/* Hero Section */}
                <div className="relative">
                    <Image 
                        src={"/koli.png"} 
                        alt={"Koli"} 
                        width={1920} 
                        height={1080}
                        className="w-full h-screen object-cover object-top brightness-50 z-10"
                        priority
                    />
                    <div className="flex flex-col absolute font-black top-0 left-0 w-full h-full items-center justify-center mt-20 text-white p-4">
                        <h2 className="text-3xl md:text-5xl font-black max-w-2xl text-center self-start mb-12 drop-shadow-lg md:ml-20 lg:ml-32">
                            {t(lang, "Ajtókat nyitunk a világra", "We open doors to the world")}
                        </h2>
                        <Image 
                            className="px-8 mb-8" 
                            src={"/logo-white/Rajk_logo_2025_white_a.svg"} 
                            alt={"Rajk logo"} 
                            width={700}
                            height={400}
                        />
                        <h2 className="text-3xl md:text-5xl font-black mb-16 text-center self-end md:mr-20 lg:mr-32">
                            {t(lang, "Felvételi", "Admission")}
                        </h2>
                        <Countdown targetDate={submissionDeadline} />
                    </div>
                </div>

                {/* Questionnaire Section */}
                <DownloadQuestionnaire 
                    releaseDate={releaseDate}
                    questionnaireUrl="/2026_Rajk-kerdoiv.pdf"
                    archiveUrl="/2025_Rajk-kerdoiv-2.pdf"
                />

                {/* Recruitment Process Section */}
                <div className="flex flex-col items-center justify-center py-24 relative overflow-hidden px-4">
                    <div className="flex flex-col md:flex-row lg:w-3/4 xl:w-1/2 relative z-10 bg-white/40 p-8 rounded-2xl backdrop-blur-sm gap-8">
                        <Image src="/logo-black/rajk_A.svg" alt="Rajk logo" width={200} height={200} />
                        <div className="flex flex-col items-start justify-center">
                            <h2 className="text-3xl font-black mb-6 text-rajk-green underline uppercase tracking-wider">
                                {t(lang, "A Felvételi Menete", "The Admission Process")}
                            </h2>
                            <p className="text-black font-normal leading-relaxed text-lg text-justify">
                                {t(
                                    lang,
                                    "A Rajk Szakkollégiumba első- és másodéves Corvinusos és ELTE TáTK-s hallgatók jelentkezését várjuk. A felvételi folyamata két részből áll: írásbeli és szóbeli fordulóból. Mi nem hiszünk a rossz válaszokban, arra leszünk kíváncsiak, hogyan látod a világot, és magad benne.",
                                    "We welcome applications from first- and second-year students from Corvinus University and ELTE TáTK. The admission process consists of two parts: written and oral rounds. We don’t believe in wrong answers; we are curious about how you see the world and yourself in it."
                                )}
                            </p>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:w-3/4 xl:w-1/2 mt-16 relative z-10">
                        <div className="flex flex-col bg-white/40 p-8 rounded-2xl backdrop-blur-sm border-l-8 border-rajk-green">
                            <div className="flex items-center gap-4 mb-4">
                                <span className="text-6xl font-black text-rajk-green">1</span>
                                <h2 className="text-3xl font-black text-rajk-green underline">
                                    {t(lang, "Írásbeli", "Written Round")}
                                </h2>
                            </div>
                            <p className="text-black font-normal leading-relaxed text-justify">
                                {t(
                                    lang,
                                    "A felvételi első szakasza egy írásbeli, ahol rövidebb -hosszabb szakmai, személyes, kreatív és elgondolkodtató kérdések vannak. A kérdőív április 22-től elérhető ezen az oldalon. Arra kérünk, hogy a kitöltött kérdőívet PDF formátumban küldd el számunkra a rajkfelveteli2026@gmail.com email címre május 13. szerda 19:59-ig!",
                                    "The first stage of admission is a written round with short and long professional, personal, creative, and thought-provoking questions. The questionnaire is available on this site from April 22. We ask you to send the completed questionnaire in PDF format to rajkfelveteli2026@gmail.com by Wednesday, May 13, 19:59!"
                                )}
                            </p>
                        </div>
                        
                        <div className="flex flex-col bg-white/40 p-8 rounded-2xl backdrop-blur-sm border-r-8 border-rajk-green md:text-right">
                            <div className="flex items-center gap-4 mb-4 md:flex-row-reverse">
                                <span className="text-6xl font-black text-rajk-green">2</span>
                                <h2 className="text-3xl font-black text-rajk-green underline">
                                    {t(lang, "Szóbeli", "Oral Round")}
                                </h2>
                            </div>
                            <p className="text-black font-normal leading-relaxed text-justify md:text-right">
                                {t(
                                    lang,
                                    "A szóbeli fordulóra mindenkit behívunk, aki leadta a kérdőívet. Egy személyes beszélgetésre számíthattok majd a kollégium épületében. A részleteket az írásbeli leadása után egyeztetjük a jelentkezőkkel.",
                                    "We invite everyone who submitted the questionnaire to the oral round. You can expect a personal interview in the college building. Details will be coordinated with applicants after the written submission."
                                )}
                            </p>
                        </div>
                    </div>

                    {/* Peaking Strucc */}
                    <div className="absolute right-0 bottom-0 opacity-20 pointer-events-none translate-x-1/4 translate-y-1/4">
                        <Image src="/rajk_strucc_black.png" alt="Ostrich" width={600} height={600} />
                    </div>
                </div>

                {/* Why Rajk Section */}
                <div className="bg-bezs py-24 text-black">
                    <div className="container mx-auto px-4 max-w-5xl">
                        <div className="bg-white/40 p-6 rounded-2xl backdrop-blur-sm transition-transform hover:scale-105 m-4">
                            <h2 className="text-4xl md:text-5xl font-black mb-12 text-center uppercase">
                                {t(lang, "Miért a Rajk?", "Why Rajk?")}
                            </h2>
                            <p className="text-xl leading-relaxed text-center mb-16 max-w-3xl mx-auto opacity-90">
                                {t(lang,
                                    "A Rajk működését magunk formáljuk. A saját szabályaink szerint élünk, amelyeket az egymással folytatott diskurzus formál. A közösségünk diverz, így a vitáinkban sok különböző, egymásnak ellentmondó érték- és érvrendszer merül fel. Minden nap tanulunk egymástól magunkról, csapatmunkáról, közösségi dinamikáról, sikerről és kitartásról. Kis csoportokban, egymást motiválva mélyedünk el szakmailag a társadalomtudomány bármely területén.",
                                    "We shape Rajk's operation ourselves. We live by our own rules, formed by the discourse we have with each other. Our community is diverse, so many different, often contradictory value and argument systems arise in our debates. Every day we learn from each other about ourselves, teamwork, community dynamics, success, and perseverance. In small groups, motivating each other, we immerse ourselves professionally in any field of social science."
                                )}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                            <div className="flex flex-col items-center text-center p-6 bg-white/40 rounded-2xl backdrop-blur-sm transition-transform hover:scale-105">
                                <div className="p-4 bg-white/60 rounded-full mb-6">
                                    <GraduationCap size={40} />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{t(lang, "Szakmai elmélyülés", "Professional Depth")}</h3>
                            </div>
                            <div className="flex flex-col items-center text-center p-6 bg-white/40 rounded-2xl backdrop-blur-sm transition-transform hover:scale-105">
                                <div className="p-4 bg-white/60 rounded-full mb-6">
                                    <TrendingUp size={40} />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{t(lang, "Személyiségfejlődés", "Personal Growth")}</h3>
                            </div>
                            <div className="flex flex-col items-center text-center p-6 bg-white/40 rounded-2xl backdrop-blur-sm transition-transform hover:scale-105">
                                <div className="p-4 bg-white/60 rounded-full mb-6">
                                    <Users size={40} />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{t(lang, "Közösségi élmény", "Community Experience")}</h3>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Gallery Section */}
                <div className="py-24 bg-bezs">
                    <div className="container mx-auto px-4">
                        <div className="text-center mb-12 flex flex-col items-center justify-center gap-4">
                            <h3 className="text-4xl md:text-6xl font-black italic tracking-tighter select-none text-rajk-green">
                                {t(lang, "Vigyázz, Kész, Rajk!", "Ready, Set, Rajk!")}
                            </h3>
                            <h2 className="text-4xl font-black text-rajk-green mb-4">
                                {t(lang, "Nézd meg milyenek a hétköznapok a Rajk falain belül!", "See what daily life is like within the walls of Rajk!")}
                            </h2>
                        </div>
                        <MyCarousel data={recruitmentPictures.docs} clickable={false} />
                    </div>
                </div>

                {/* FAQ Section */}
                <FAQAccordion />

                {/* Accepted Section */}
                <div className="bg-zold py-24 text-white relative overflow-hidden mb-10">
                    <div className="container mx-auto px-4 max-w-5xl relative z-10">
                        <h2 className="text-5xl md:text-7xl font-black mb-12 text-center drop-shadow-lg">
                            {t(lang, "Felvettünk?", "Accepted?")}
                        </h2>
                        <div className="bg-white/10 p-10 rounded-3xl backdrop-blur-md mb-12">
                            <p className="text-2xl font-bold mb-8 leading-relaxed text-center">
                                {t(
                                    lang, 
                                    "Gratulálunk a sikeres felvételihez! Várunk szeretettel a felvételid utáni első vasárnap a kollégiumban, majd július elején a Nyári Táborban.",
                                    "Congratulations on your successful admission! We look forward to seeing you at the college on the first Sunday after your admission, and then at the Summer Camp in early July."
                                )}
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="flex flex-col">
                                <h3 className="text-3xl font-black mb-4 border-b-2 border-white/30 pb-2">
                                    {t(lang, "Kopaszi-gát", "Kopaszi-gát gathering")}
                                </h3>
                                <p className="text-lg leading-relaxed opacity-90">
                                    {t(
                                        lang,
                                        "Összegyűlünk a Rajk udvarán késő délután, és közösen elindulunk egy meglepetés helyszínre, hogy üdvözölhessük a kollégium újonnan felvett tagjait.",
                                        "We gather in Rajk's courtyard in the late afternoon and head together to a surprise location to welcome the college's newly admitted members."
                                    )}
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-3xl font-black mb-4 border-b-2 border-white/30 pb-2">
                                    {t(lang, "Nyári Tábor", "Summer Camp")}
                                </h3>
                                <p className="text-lg leading-relaxed opacity-90">
                                    {t(
                                        lang,
                                        "Vonatra ülünk, irány a Nyári Tábor! Vitázunk a forró levegőben, fürdünk, sportolunk, este kikapcsolódunk, majd a tábortűz fénye mellett elbúcsúztatjuk a végzősöket.",
                                        "We hop on a train, heading to Summer Camp! We debate in the hot air, swim, play sports, relax in the evening, and then bid farewell to the graduates by the campfire light."
                                    )}
                                </p>
                            </div>
                        </div>
                    </div>
                    {/* Decorative Background Image */}
                    <div className="absolute left-0 bottom-0 opacity-10 pointer-events-none scale-150 origin-bottom-left">
                        <Image src="/lap_zold.png" alt="" width={500} height={500} />
                    </div>
                </div>
            </div>
        </div>
    );
}
