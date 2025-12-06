"use server";

import { getPayload } from "payload";
import config from "@payload-config";
import { Event } from "@/payload-types";

const PAGE_SIZE = 5;

export type GetArchiveEventsResult = {
  events: Event[];
  hasMore: boolean;
  totalDocs: number;
};

export async function getArchiveEvents(
  offset: number = 0,
  search: string = "",
  year: number | "all" = "all"
): Promise<GetArchiveEventsResult> {
  const payload = await getPayload({ config });

  const today = new Date();
  const thirtyDaysAgo = new Date(today);
  thirtyDaysAgo.setDate(today.getDate() - 30);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const where: any = {
    and: [
      {
        date: {
          less_than: thirtyDaysAgo.toISOString(),
        },
      },
    ],
  };

  if (search) {
    where.and.push({
      name: {
        contains: search,
      },
    });
  }

  if (year !== "all") {
    const startOfYear = new Date(year, 0, 1).toISOString();
    const endOfYear = new Date(year + 1, 0, 1).toISOString();
    where.and.push({
      date: {
        greater_than_equal: startOfYear,
        less_than: endOfYear,
      },
    });
  }

  const result = await payload.find({
    collection: "events",
    where,
    sort: "-date", // Descending order
    limit: PAGE_SIZE,
    page: Math.floor(offset / PAGE_SIZE) + 1, // Payload uses 1-based page index
  });

  return {
    events: result.docs,
    hasMore: result.hasNextPage,
    totalDocs: result.totalDocs,
  };
}
