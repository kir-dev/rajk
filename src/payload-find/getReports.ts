// File: src/payload-find/getReports.ts
import { getPayload } from "payload";
import config from "@payload-config";

type ReportDoc = {
  id: string;
  title: string;
  topic: string | null;
  link: string;
};

export type ReportsGroup = {
  topic: string;
  items: ReportDoc[];
};

export default async function getReportsGrouped(): Promise<ReportsGroup[]> {
  const payload = await getPayload({ config });
  const res = await payload.find({ collection: "reports", limit: 1000 });
  const docs = (res.docs || []) as ReportDoc[];

  const map = new Map<string, ReportDoc[]>();
  for (const d of docs) {
    const topic = (d.topic ?? "Ungrouped").toString().trim() || "Ungrouped";
    if (!map.has(topic)) map.set(topic, []);
    map.get(topic)!.push(d);
  }

  // Optional: sort groups by topic name
  const groups = Array.from(map.entries())
    .sort(([a], [b]) => a.localeCompare(b, undefined, { sensitivity: "base" }))
    .map(([topic, items]) => ({ topic, items }));

  return groups;
}