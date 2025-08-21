import {Group, Person} from "@/payload-types";
import {useEffect, useState} from "react";
import Image from "next/image";
import getGroupMembers from "@/payload-find/getGroups";

export default function Heller() {
    const [loading, setLoading] = useState<boolean>(true);
    const [awardees, setAwards] = useState<Group>();

    useEffect(() => {
        async function fetchAwards() {
            setLoading(true);
            try {
                const response = await getGroupMembers("Heller-díj");
                if (!response) {
                    throw new Error("No awardees found");
                }
                setAwards(response);
            } catch (error){
                console.error("Error fetching Heller-díj awardees:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchAwards();
    }, [])
    return (
        <div className="relative">
          <Image
            src={"/hellerdij.jpg"}
            alt={"Heller-díj"}
            width={500}
            height={500}
            className="rounded-lg mb-4"
          />
          <div className="absolute inset-10 -top-1/4 rounded-lg">
            <div className="grid grid-cols-3 gap-2 p-4 h-full">
              {awardees?.members?.map((awardee) => {
                const memberName = typeof awardee.member === 'object' && awardee.member !== null
                  ? (awardee.member as Person).name
                  : 'Unknown';

                const yearDisplay = awardee.joined_at
                  ? new Date(awardee.joined_at).getFullYear()
                  : 'N/A';

                return (
                  <div key={awardee.id} className="flex items-center justify-center">
                    <p className="whitespace-nowrap overflow-hidden text-ellipsis px-2 py-1 bg-white/80 rounded text-black text-sm">
                      {memberName} ({yearDisplay})
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
    )
}