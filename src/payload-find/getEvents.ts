import {getPayload} from "payload";
import config from "@payload-config";

export default async function getEvents(){
    const payload = await getPayload({ config });
    const events = await payload.find({
        collection: "events",
    });
    return events.docs;
}

export function getEventById(id: string) {
    return getPayload({ config }).then((payload) =>
        payload.findByID({
            collection: "events",
            id: id,
        })
    );
}