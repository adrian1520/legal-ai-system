export default async (req: Request) => {
  const { caseId, message } = await req.json();

  return new Response(JSON.stringify({
    ok: true,
    caseId,
    message
  }));
};

export const config = {
  path: "/api/chat"
};