import { getDB } from "./firebase";

export default async (req: Request) => {
  const { caseId } = await req.json();
  const db = getDB();

  const snap = await db.collection("timeline")
    .where("caseId", "==", caseId)
    .get();

  const data = snap.docs.map(d => d.data());

  return new Response(JSON.stringify(data));
};

export const config = {
  path: "/api/timeline"
};
