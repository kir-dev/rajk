'use server';

import {getPayload} from "payload";
import config from "@payload-config";

export default async function getSponsorImages(){
    const payload = await getPayload({ config });
    const sponsors = await payload.find({
        collection: "sponsors",
    });
    return sponsors.docs;
}