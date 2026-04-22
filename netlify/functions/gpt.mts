export default async (req: Request) => {
  const { message, caseId } = await req.json();

  // 🔹 pobierz kontekst sprawy
  const ctxRes = await fetch(`${process.env.URL}/api/case/full-context`, {
    method: "POST",
    body: JSON.stringify({ caseId })
  });

  const context = await ctxRes.json();

  // 🔹 zapytanie do OpenAI
  const aiRes = await fetch("https://api.openai.com/v1/responses", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "gpt-5",
      input: `
Masz dane sprawy:

${JSON.stringify(context)}

Użytkownik:
${message}

Zrób:
- analizę
- strategię
- ryzyka
- rekomendację
`
    })
  });

  const data = await aiRes.json();
  const reply = data.output?.[0]?.content?.[0]?.text || "Brak odpowiedzi";

  return new Response(JSON.stringify({ reply }));
};

export const config = {
  path: "/api/gpt"
};