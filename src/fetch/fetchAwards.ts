import {getPayload} from "payload";
import config from "@/payload.config";

export async function fetchAwards() {
    const payload = await getPayload({config})
    const members = await payload.find({
        collection: "awards",
        limit: 20,
        depth: 0,
        sort: "-createdAt",
    });
    
    return members.docs;
}
