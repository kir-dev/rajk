import {getPayload} from "payload";
import config from "@payload-config";

export default async function getCommunityPictures() {
    const payload = await getPayload({ config });
    const events = await payload.find({
        collection: "community-pictures",
    });
    return events.docs;
}