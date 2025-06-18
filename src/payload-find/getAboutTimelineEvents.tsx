import {getPayload} from "payload";
import config from "@payload-config";

export default async function getAboutTimelineEvents(){
    const payload = await getPayload({ config });
    const events = await payload.find({
        collection: "about-timeline-event",
        sort: 'date',
    });
    return events;
}