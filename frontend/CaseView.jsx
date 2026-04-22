import React, { useEffect, useState } from "react";

export default function CaseView({ caseId, goBack }) {
  const [data, setData] = useState(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);

  async function load() {
    const res = await fetch("/api/case/full-context", {
      method: "POST",
      body: JSON.stringify({ caseId })
    });
    const json = await res.json();
    setData(json);
    setMessages(json.messages || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function sendMessage() {
    if (!input) return;

    const res = await fetch("/api/gpt", {
      method: "POST",
      body: JSON.stringify({
        caseId,
        message: input
      })
    });

    const result = await res.json();

    const newMessages = [
      ...messages,
      { role: "user", content: input },
      { role: "assistant", content: result.reply }
    ];

    setMessages(newMessages);
    setInput("");
  }

  if (!data) {
    return <div className="text-white p-4">Ładowanie...</div>;
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white p-4">
      <button onClick={goBack} className="mb-2 text-sm opacity-70">
        ← Powrót
      </button>

      <h2 className="text-purple-500 text-lg font-semibold">
        Sprawa: {caseId}
      </h2>

      {/* Timeline */}
      <div className="mt-4">
        <h3 className="text-sm opacity-70 mb-1">Timeline</h3>
        {data.timeline?.map((t, i) => (
          <div key={i} className="text-xs opacity-80">
            {t.event || JSON.stringify(t)}
          </div>
        ))}
      </div>

      {/* Chat */}
      <div className="mt-4">
        <h3 className="text-sm opacity-70 mb-1">AI</h3>
        <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto">
          {messages.map((m, i) => (
            <div key={i} className="text-xs">
              <b>{m.role}:</b> {m.content}
            </div>
          ))}
        </div>

        <div className="mt-2 flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="bg-[#121212] px-2 py-1 flex-1 text-xs"
            placeholder="Zadaj pytanie..."
          />
          <button
            onClick={sendMessage}
            className="bg-purple-600 px-3 py-1 text-xs rounded"
          >
            Wyślij
          </button>
        </div>
      </div>
    </div>
  );
}
