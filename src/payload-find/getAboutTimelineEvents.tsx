import {getPayload} from "payload";
import config from "@payload-config";

export default async function getAboutTimelineEvents(collection: ("about-timeline-event" | "apply-timeline-event")) {
    const payload = await getPayload({ config });
    const events = await payload.find({
        collection: collection,
        sort: 'date',
    });
    return events;
}