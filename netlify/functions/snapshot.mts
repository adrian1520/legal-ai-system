import { getDB } from "./firebase";

export default async (req: Request) => {
  const { caseId, snapshot } = await req.json();
  const db = getDB();

  await db.collection("snapshots").add({
    caseId,
    snapshot,
    createdAt: new Date()
  });

  return new Response(JSON.stringify({ ok: true }));
};

export const config = {
  path: "/api/snapshot/save"
};
