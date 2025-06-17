import {getPayload} from "payload";
import config from "@payload-config";

export default async function getDiakbizottsag(){
    const payload = await getPayload({ config });
    const diakbizottsag = await payload.find({
        collection: "groups",
        where: {
            name: {
                equals: "Diákbizottság"
            }
        },
        depth: 1,
    });
    if (diakbizottsag.docs && diakbizottsag.docs.length > 0) {
        // Return the members of the first matching group
        return diakbizottsag.docs[0].members || [];
    }
    return [];
}