'use server';

import { getPayload } from 'payload';
import config from "@payload-config";

export default async function getCourseCategories(){
    const payload = await getPayload({ config });
    const courseCategories = await payload.find({
        collection: 'course-categories',
        limit: 100,
        sort: '-displayOrder',
    });

    return courseCategories.docs;
}