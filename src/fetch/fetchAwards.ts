import {getPayload} from "payload";
import config from "@/payload.config";
import {Award, Awardee} from "@/payload-types";

export async function fetchAwards() {
    const payload = await getPayload({config})
    const awards = await payload.find({
        collection: "awards",
        limit: 20,
        depth: 1,
        sort: "-createdAt",
    });

    return awards.docs as Award[];
}

export async function fetchAward(id: string) {
    const payload = await getPayload({config})
    const award = await payload.findByID({
        collection: "awards",
        id: id,
        depth: 2,
    });

    return award as Award;
}

const awardUrlToAwardName = new Map<string, string>([
    ["neumann-janos", "Neumann János-díj"],
    ["herbert-simon", "Herbert Simon-díj"],
]);

export async function fetchAwardBySlug(slug: string): Promise<Award | null> {
    const awardName = awardUrlToAwardName.get(slug);
    if (!awardName) {
        throw new Error("Invalid award slug");
    }
    return fetchAwardByName(awardName);
}

/**
 * Fetches the award by its name and sorts awardees by year descending.
 * @param name - The name of the award to fetch.
 * @returns The award object with sorted awardees or null if not found.
 */
async function fetchAwardByName(name: string): Promise<Award | null> {
    const payload = await getPayload({config})
    const awards = await payload.find({
        collection: "awards",
        limit: 1,
        depth: 2,
        where: {
            name: {
                equals: name,
            },
        },
    });

    if (awards.docs.length === 0) {
        return null;
    }

    const award = awards.docs[0] as Award;

    if (award.awardees) {
        award.awardees = (award.awardees as Awardee[]).sort((a, b) => {
            return (b.year || 0) - (a.year || 0);
        });
    }

    return award;
}