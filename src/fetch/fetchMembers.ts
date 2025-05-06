import {getPayload} from "payload";
import config from "@/payload.config";

export async function fetchMembers() {
    const payload = await getPayload({config})
    const members = await payload.find({
        collection: "people",
        limit: 100,
        depth: 0,
        sort: "-createdAt",
    });
    
    return members.docs;
}
