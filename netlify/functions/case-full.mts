import { getDB } from "./firebase";

export default async (req: Request) => {
  const { caseId } = await req.json();
  const db = getDB();

  const [documentsSnap, messagesSnap, timelineSnap, snapshotsSnap] = await Promise.all([
    db.collection("documents").where("caseId", "==", caseId).get(),
    db.collection("messages").where("caseId", "==", caseId).get(),
    db.collection("timeline").where("caseId", "==", caseId).get(),
    db.collection("snapshots").where("caseId", "==", caseId).get(),
  ]);

  return new Response(JSON.stringify({
    documents: documentsSnap.docs.map(d => d.data()),
    messages: messagesSnap.docs.map(d => d.data()),
    timeline: timelineSnap.docs.map(d => d.data()),
    snapshots: snapshotsSnap.docs.map(d => d.data())
  }));
};

export const config = {
  path: "/api/case/full-context"
};