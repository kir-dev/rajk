import {Odyssey, Person} from "@/payload-types";
import {useEffect, useState} from "react";
import getOdysseys from "@/payload-find/getOdysseys";
import Image from "next/image";
import WawyBorder from "@/components/WawyBorder";
import { useLanguage } from '@/components/LanguageProvider';
import { t } from '@/lib/utils';

export default function OdysseyProgram() {
    const { lang } = useLanguage();
    const [loading, setLoading] = useState(true);
    const [odysseyPosts, setOdysseyPosts] = useState<Odyssey[]>([]);

    useEffect(() => {
        const fetchOdysseyPosts = async () => {
            setLoading(true);
            try {
                const fetchedOdysseyPosts = await getOdysseys();
                setOdysseyPosts(fetchedOdysseyPosts);
            } catch (error) {
                console.error("Error fetching Odyssey Posts:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchOdysseyPosts();
    }, [])

    const getPicture = (participant: Person | number) => {
        if (typeof participant === "number") {
            return null; // Handle case where participant is just an ID
        }
        if (participant.picture && typeof participant.picture === "object") {
            console.log(participant.picture.url);
            return participant.picture.url; // Assuming picture is an object with a url property
        }
    }
    return (
        <div className="flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-8 text-center">{t(lang,'Odüsszeusz Program','Odysseus Program')}</h1>
            <p className="w-1/2 text-center">{t(lang,
                'Az Odüsszeusz program célja a szakmai kiválóság elismerése. A program keretében a kollégisták olyan hazai és külföldi szakmai eseményekre vagy akár infrastruktúrára pályázhatnak, melyet önerőből nem engedhetnének meg maguknak, pedig komoly értékkel bírnak szakmai fejlődésük támogatásában. A győztes pályázatok anyagi költségeit biztosítja a kollégium, így ösztönözve a kollégistákat a szakmai kiválóságra, hangsúlyt fektetve a program keretében elsajátított szakmai tapasztalatok kollégiumi visszacsatolására is.',
                'The Odysseus Program recognizes academic excellence. Through it, members can apply for domestic or international professional events or even infrastructure they could not otherwise afford but which significantly support their development. The College covers the costs of winning applications, encouraging excellence while emphasizing that gained knowledge is shared back with the community.')}</p>
            <div className="relative w-full my-25">
                <WawyBorder direction={"top"} color={"green"} szin={"zold"}/>
                <div className="w-full bg-flekk-zold text-4xl font-bold text-gray-300 text-center">{t(lang,'Odüsszeusz','Odysseus')} {new Date().getFullYear()}</div>
                <WawyBorder direction={"bottom"} color={"green"} szin={"zold"}/>
            </div>
            {loading ? (
                <p>{t(lang,'Betöltés...','Loading...')}</p>
            ) : (
                <div className="flex flex-row">
                    {odysseyPosts.map((post) => (
                        <div key={post.id} className="flex flex-col items-center mb-4 w-1/4 text-center">
                            {post.participants?.map((participant) => (
                                <Image key={participant.id} src={getPicture(participant.participant) || "/user-round.svg"} alt={t(lang,'Személy','Person')} width={24} height={24}/>
                            ))}
                            <h3 className="text-xl font-semibold">{post.title}</h3>
                            <p className="text-wrap">{post.description}</p>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}