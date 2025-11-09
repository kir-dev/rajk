// typescript
'use server';

import { getPayload } from 'payload';
import config from '@payload-config';
import {Group, Person, Media} from '@/../src/payload-types';


export default async function getGroupMembers(groupName: string): Promise<Group | null> {
  const payload = await getPayload({ config });

  const groupRaw = await payload.find({
      collection: 'groups',
      where: { name: { equals: groupName } },
      // fetch minimal depth here and explicitly populate nested relations below
      depth: 1,
  });

  const group = groupRaw.docs[0] as Group | undefined;
  if (!group) return null;

  const members = group.members ?? [];

  // Populate each member.member (Person) and that person's picture (Media) when they are numeric IDs
  const populatedMembers = await Promise.all(members.map(async (m) => {
    let person: Person | null = null;

    // If the member reference is a numeric ID, fetch the full person
    if (typeof m.member === 'number') {
      try {
        const p = await payload.findByID({ collection: 'people', id: String(m.member), depth: 1 });
        person = p as unknown as Person;
      } catch {
        person = null;
      }
    } else if (typeof m.member === 'object' && m.member !== null) {
      person = m.member as Person;
    }

    // If person exists and picture is a numeric id, fetch the media object
    if (person && person.picture && typeof person.picture === 'number') {
      try {
        const media = await payload.findByID({ collection: 'media', id: String(person.picture), depth: 0 });
        person.picture = media as unknown as Media;
      } catch {
        // leave picture as-is (id) if fetching failed
      }
    }

    return {
      ...m,
      member: person,
    };
  }));

  return {
    ...group,
    members: populatedMembers as unknown as typeof members,
  } as Group;
}