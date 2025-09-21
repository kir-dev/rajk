import {getPayload} from "payload";
import config from "@payload-config";
import {Media} from "@/payload-types";

export default async function getEvents(){
    const payload = await getPayload({ config });
    const events = await payload.find({
        collection: "events",
    });

    const mediaData = {
        docs: events.docs.map((event) => ({
            url: (event.picture as Media).url ?? '',
            alt: (event.picture as Media).alt ?? ''
        }))
    };
    return mediaData;
}