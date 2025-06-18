import {getPayload} from "payload";
import config from "@payload-config";
import MultiImageCarousel from "@/components/MultiImageCarousel";

export default async function getEvents(){
    const payload = await getPayload({ config });
    const events = await payload.find({
        collection: "events",
    });

    return (
        <MultiImageCarousel events={events.docs} />
    )
}