export default async (req: Request) => {
  const { caseId, snapshot } = await req.json();

  return new Response(JSON.stringify({
    ok: true,
    caseId,
    snapshot
  }));
};

export const config = {
  path: "/api/snapshot/save"
};