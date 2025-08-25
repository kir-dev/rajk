'use server';

import {getPayload} from "payload";
import config from "@payload-config";

export default async function getOdysseys(){
    const payload = await getPayload({ config });
    const odysseys = await payload.find({
        collection: "odyssey",
    });
    return odysseys.docs;
}