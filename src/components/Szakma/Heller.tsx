import { Group, Person } from "@/payload-types";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import getGroupMembers from "@/payload-find/getGroups";

export default function Heller() {
    const [loading, setLoading] = useState<boolean>(true);
    const [awardees, setAwards] = useState<Group | null>(null);

    useEffect(() => {
        async function fetchAwards() {
            setLoading(true);
            try {
                const res = await getGroupMembers("Heller-díj");
                if (!res) {
                    console.error('Failed to fetch group');
                    setAwards(null);
                } else {
                    setAwards(res as Group);
                }
            } catch (error) {
                console.error("Error fetching Heller-díj awardees:", error);
            } finally {
                setLoading(false);
            }
        }
        void fetchAwards();
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
        <div className="flex flex-col items-center justify-center min-h-screen p-4 md:p-8 mb-20">
            <div className="mb-8 text-center">
                <h2 className="text-4xl font-extrabold tracking-tight text-slate-900">Heller-díj</h2>
                <div className="mx-auto mt-2 h-1 w-24 rounded-full bg-emerald-600" />
            </div>
            <p className="px-6 md:px-30 text-center">A kollégiumban végzett kreatív munka elismerésének és elismertségének érdekében a Szakkollégium Heller Farkas-díjat alapított. A díj odaítélésének kritériuma, hogy a díjazott nyújtson a Szakkollégiumban érvényes mércék szerint kiemelkedő szakmai teljesítményt. A díj odaítéléséről az Szakmai Munka Tanácsa (SZMT) jelölése alapján a Kollégiumi Gyűlés határoz.</p>
            <div className="relative">

                {/* Image with text overlay */}
                <div className="relative hidden lg:block">
                    <Image
                        src={"/heller.png"}
                        alt={"Heller-díj background image"}
                        width={1000}
                        height={1000}
                    />

                    {/* Text overlay positioned on the white box area */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="p-4 rounded-md max-w-[100%] max-h-[40%]">

                            {loading ? (
                                <div className="flex justify-center py-4">
                                    <p className="text-muted-foreground">Loading...</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
                                    {columns.map((column, columnIndex) => (
                                        <div key={columnIndex} className="space-y-2">
                                            {column.map((awardee, personIndex) => {
                                                const memberName = typeof awardee.member === 'object' && awardee.member !== null
                                                    ? (awardee.member as Person).name
                                                    : 'Unknown';

                                                const yearDisplay = awardee.joined_at
                                                    ? new Date(awardee.joined_at).getFullYear()
                                                    : 'N/A';

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
                <div className="relative lg:hidden w-full">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2">
                        {members.map((awardee, personIndex) => {
                            const memberName = typeof awardee.member === 'object' && awardee.member !== null
                                ? (awardee.member as Person).name
                                : 'Unknown';

                            const yearDisplay = awardee.joined_at
                                ? new Date(awardee.joined_at).getFullYear()
                                : 'N/A';

                            return (
                                <div key={personIndex} className="text-black text-sm flex flex-row justify-between sm:justify-start items-center border-b border-gray-100 py-2 sm:border-none sm:py-0">
                                    <span className="font-medium">{memberName}</span>
                                    <span className="text-gray-500 text-xs ml-2 bg-gray-100 px-2 py-0.5 rounded-full">
                                        {yearDisplay}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}