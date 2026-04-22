export default async (req: Request) => {
  return new Response("OK");
};
export const config = { path: "/api/upload" };