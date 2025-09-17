'use server';

import { getPayload } from 'payload';
import config from "@payload-config";


export default async function getCourses(){
    const payload = await getPayload({ config });
    const courses = await payload.find({
        collection: 'courses',
        limit: 100,
        sort: '-displayOrder',
    });

    return courses.docs;
}