export default async (req: Request) => {
  const { message, caseId } = await req.json();

  return new Response(JSON.stringify({ ok: true }));
};

export const config = {
  path: "/api/chat"
};