import {getPayload} from "payload";
import config from "@/payload.config";
import {Award} from "@/payload-types";

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
        depth: 1,
    });
    
    return award as Award;
}


