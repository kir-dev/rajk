// typescript
'use server';

import { getPayload } from 'payload';
import config from '@payload-config';
import { Person } from '@/../src/payload-types';

export type MemberEntryRaw = { role: string, joined_at: Date, member?: number | string | Person | { id?: number | string } };
export type GroupDoc = {
  id?: number | string;
  members?: MemberEntryRaw[];
  [k: string]: unknown;
};

export default async function getGroupMembers(groupName: string): Promise<GroupDoc | null> {
  const payload = await getPayload({ config });

    const groupRaw = await payload.find({
        collection: 'groups',
        where: { name: { equals: groupName } },
        depth: 2,
    });
    const group = groupRaw as unknown as { docs?: GroupDoc[] };

    if (!Array.isArray(group.docs) || group.docs.length === 0) return null;
    const groupDoc = group.docs[0];

    const memberEntries: MemberEntryRaw[] = Array.isArray(groupDoc.members) ? groupDoc.members : [];

    const getIdFromMember = (member: unknown): string | number | null => {
    if (member === undefined || member === null) return null;
    if (typeof member === 'string' || typeof member === 'number') return member;
    if (typeof member === 'object') {
      const obj = member as Record<string, unknown>;
      if ('id' in obj && (typeof obj.id === 'string' || typeof obj.id === 'number')) {
        return obj.id as string | number;
      }
    }
    return null;
  };

  const memberIds: (string | number)[] = memberEntries
    .map((entry) => getIdFromMember(entry.member))
    .filter((id): id is string | number => id !== null);

  if (memberIds.length === 0) return groupDoc;

  const peopleResult = (await payload.find({
    collection: 'people',
    where: { id: { in: memberIds } },
    depth: 1,
  })) as { docs?: Person[] };

  const peopleById = new Map<string | number, Person>();
  (peopleResult.docs || []).forEach((p) => {
    if (p && (typeof (p as Person).id === 'string' || typeof (p as Person).id === 'number')) {
      // cast only for index access assurance; map remains strongly typed
      peopleById.set((p as Person).id, p);
    }
  });

  const populatedMembers = memberEntries.map((entry) => {
    const rawId = entry?.member;
    const id = getIdFromMember(rawId);
    const populatedPerson = id !== null ? (peopleById.get(id) ?? rawId) : rawId;
    return { ...entry, member: populatedPerson };
  });

  return { ...groupDoc, members: populatedMembers };
}