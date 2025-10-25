'use server';

import { getPayload } from "payload";
import config from "@payload-config";

export default async function getGroupMembers(groupName: string) {
    const payload = await getPayload({ config });

    // First find the Diákbizottság group to get member IDs
    const group = await payload.find({
        collection: "groups",
        where: {
            name: {
                equals: groupName
            }
        },
        depth: 2,
    });

    if (!group.docs || group.docs.length === 0) {
        return null;
    }
    /*
    // Extract member IDs
    const memberEntries = group.docs[0].members || [];
    const memberIds = memberEntries
        .filter(entry => entry && entry.member)
        .map(entry => typeof entry.member === 'object' ? entry.member.id : entry.member);

    if (memberIds.length === 0) {
        return null;
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
    });*/

    if ( !group.docs[0] ) return null;
    return group.docs[0];
}