import { getPayload } from "payload";
import config from "@payload-config";
import { Person } from "@/payload-types";

export default async function getGroupMembers(groupName: string): Promise<Person[]> {
    const payload = await getPayload({ config });

    // First find the Diákbizottság group to get member IDs
    const group = await payload.find({
        collection: "groups",
        where: {
            name: {
                equals: groupName
            }
        },
        depth: 1,
    });

    if (!group.docs || group.docs.length === 0) {
        return [];
    }

    // Extract member IDs
    const memberEntries = group.docs[0].members || [];
    const memberIds = memberEntries
        .filter(entry => entry && entry.member)
        .map(entry => typeof entry.member === 'object' ? entry.member.id : entry.member);

    if (memberIds.length === 0) {
        return [];
    }

    // Directly query the people collection with their pictures
    const peopleResult = await payload.find({
        collection: "people",
        where: {
            id: {
                in: memberIds
            }
        },
        depth: 1, // Ensure pictures are populated
    });

    return peopleResult.docs as Person[];
}