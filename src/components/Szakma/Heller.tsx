import {Group, Person} from "@/payload-types";
import {useEffect, useState} from "react";
import getGroupMembers from "@/payload-find/getGroups";
import Image from "next/image";
import { useLanguage } from '@/components/LanguageProvider';
import { t } from '@/lib/utils';

export default function Heller() {
    const { lang } = useLanguage();
    const [loading, setLoading] = useState<boolean>(true);
    const [awardees, setAwards] = useState<Group | null>(null);

    useEffect(() => {
        async function fetchAwards() {
            setLoading(true);
            try {
                const response = await getGroupMembers("Heller-díj");
                if (!response) {
                    setAwards(null);
                }
                setAwards(response);
            } catch (error){
                console.error("Error fetching Heller-díj awardees:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchAwards();
    }, []);

    const members = awardees?.members || [];
    members.sort((a, b) => new Date(a.joined_at || 0).getFullYear() - new Date(b.joined_at || 0).getFullYear())
    const memberCount = members.length;
    const columnSize = Math.ceil(memberCount / 3);

    const columns = [
        members.slice(0, columnSize),
        members.slice(columnSize, columnSize * 2),
        members.slice(columnSize * 2)
    ];

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-8 mb-20">
            <h1 className="text-3xl font-bold mb-8 text-center">{t(lang,'Heller-díj','Heller Prize')}</h1>
            <div className="relative p-16">

                {/* Image with text overlay */}
                <div className="relative">
                    <Image
                        src={"/hellerdij.jpg"}
                        alt={t(lang,'Heller-díj háttérkép','Heller Prize background image')}
                        width={750}
                        height={750}
                        className="rounded-lg"
                    />

                    {/* Text overlay positioned on the white box area */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/80 p-6 rounded-md max-w-[80%] max-h-[80%] overflow-auto">

                            {loading ? (
                                <div className="flex justify-center py-4">
                                    <p className="text-muted-foreground">{t(lang,'Betöltés...','Loading...')}</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                                    {columns.map((column, columnIndex) => (
                                        <div key={columnIndex} className="space-y-2">
                                            {column.map((awardee, personIndex) => {
                                                const memberName = typeof awardee.member === 'object' && awardee.member !== null
                                                    ? (awardee.member as Person).name
                                                    : t(lang,'Ismeretlen','Unknown');

                                                const yearDisplay = awardee.joined_at
                                                    ? new Date(awardee.joined_at).getFullYear()
                                                    : t(lang,'N/A','N/A');

                                                return (
                                                    <div key={personIndex} className="text-black text-sm">
                                                        <span className="font-medium">{memberName}</span>
                                                        <span className="text-gray-600 ml-1">
                                                            ({yearDisplay})
                                                        </span>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}