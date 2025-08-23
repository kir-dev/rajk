import {getPayload} from "payload";
import config from "@/payload.config";
import {Award} from "@/payload-types";

export async function fetchAwards() {
    const payload = await getPayload({config})
    const awards = await payload.find({
        collection: "awards",
        limit: 20,
        depth: 0,
        sort: "-createdAt",
    });
    
    return awards.docs as Award[];
}
