import { getPayload } from "payload";
import config from "@payload-config";

export default async function getFAQs() {
    const payload = await getPayload({ config });
    const faqs = await payload.find({
        collection: "faqs",
    });

    return faqs.docs;
}