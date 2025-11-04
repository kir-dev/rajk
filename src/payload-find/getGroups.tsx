// typescript
'use server';

import { getPayload } from 'payload';
import config from '@payload-config';
import {Group} from '@/../src/payload-types';


export default async function getGroupMembers(groupName: string): Promise<Group | null> {
  const payload = await getPayload({ config });

  const groupRaw = await payload.find({
      collection: 'groups',
      where: { name: { equals: groupName } },
      depth: 5,
  });

  return groupRaw.docs[0];
}