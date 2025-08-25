'use server';

import {getPayload} from "payload";
import config from "@payload-config";

export default async function getTDKs(){
    const payload = await getPayload({ config });
    const tdks = await payload.find({
        collection: "tdks",
    });
    return tdks.docs;
}