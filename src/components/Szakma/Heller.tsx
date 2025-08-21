import {Group, Person} from "@/payload-types";
import {useEffect, useState} from "react";
import getGroupMembers from "@/payload-find/getGroups";
import {Card, CardContent} from "@/components/Card";
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

    return (
        <div className="flex items-center justify-center min-h-screen p-8 mb-20">
            <div className="relative p-8">
                <Image
                    src={"/hellerdij.jpg"}
                    alt={"Heller-díj background image"}
                    width={500}
                    height={500}
                    className="absolute"
                />

                {/* Main card */}
                <Card className="relative z-10 max-w-4xl">
                    <CardContent>
                        {loading ? (
                            <div className="flex justify-center py-8">
                                <p className="text-muted-foreground">Loading...</p>
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                                {columns.map((column, columnIndex) => (
                                    <div key={columnIndex} className="space-y-3">
                                        {column.map((awardee, personIndex) => {
                                            const memberName = typeof awardee.member === 'object' && awardee.member !== null
                                                ? (awardee.member as Person).name
                                                : 'Unknown';

                                            const yearDisplay = awardee.joined_at
                                                ? new Date(awardee.joined_at).getFullYear()
                                                : 'N/A';

                                            return (
                                                <div key={personIndex} className="text-black">
                                                    <span className="font-medium">{memberName}</span>
                                                    <span className="text-muted-foreground ml-2">
                                                        ({yearDisplay})
                                                    </span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}