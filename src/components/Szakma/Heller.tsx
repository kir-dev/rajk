import {Group, Person} from "@/payload-types";
import {useEffect, useState} from "react";
import getGroupMembers from "@/payload-find/getGroups";
import {LeafDecoration} from "@/components/Szakma/LeafDecoration";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/Card";
import Image from "next/image";

export default function Heller() {
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

    // CSS variables for leaf colors
    const leafStyles = {
        "--leaf-primary": "140, 100%, 70%",
        "--leaf-secondary": "160, 100%, 40%",
        "--leaf-accent": "120, 100%, 30%"
    } as React.CSSProperties;

    return (
        <div className="flex items-center justify-center min-h-screen p-8 mb-20" style={leafStyles}>
            <div className="relative p-16">
                {/* Decorative leaves */}
                <LeafDecoration className="z-50" position="top-left" />
                <LeafDecoration className="z-50" position="top-right" />
                <LeafDecoration className="z-50" position="bottom-left" />
                <LeafDecoration className="z-50" position="bottom-right" />

                {/* Image with text overlay */}
                <div className="relative">
                    <Image
                        src={"/hellerdij.jpg"}
                        alt={"Heller-díj background image"}
                        width={500}
                        height={500}
                        className="rounded-lg"
                    />

                    {/* Text overlay positioned on the white box area */}
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/80 p-6 rounded-md max-w-[80%] max-h-[80%] overflow-auto">
                            <h3 className="text-xl font-semibold text-center mb-4">Heller-díjasok</h3>

                            {loading ? (
                                <div className="flex justify-center py-4">
                                    <p className="text-muted-foreground">Loading...</p>
                                </div>
                            ) : (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
            </div>
        </div>
    );
}