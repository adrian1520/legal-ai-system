export default async (req: Request) => {
  const { caseId } = await req.json();

  return new Response(JSON.stringify({
    case: { id: caseId, title: "Example" },
    documents: [],
    messages: [],
    timeline: []
  }));
};

export const config = {
  path: "/api/case/full-context"
};