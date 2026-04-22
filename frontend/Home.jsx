import React from "react";
import {
  FileText,
  Search,
  Brain,
  AlertTriangle,
  Folder,
  PenTool,
  Scale
} from "lucide-react";

const Tile = React.memo(function Tile({ label, sublabel, icon: Icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-[#121212] flex-1 rounded-xl px-4 py-3 flex flex-col justify-center items-center text-center hover:bg-[#1a1a1a] active:bg-[#222] active:scale-[0.98] transition cursor-pointer"
    >
      {Icon && <Icon className="text-white mb-2" size={22} />}
      <div className="text-base font-semibold text-purple-500">{label}</div>
      {sublabel && (
        <div className="text-xs text-purple-400/80">{sublabel}</div>
      )}
    </button>
  );
});

function Header() {
  return (
    <div className="flex items-center justify-center gap-3 mb-4 text-center">
      <Scale className="text-white" size={22} />
      <div className="leading-tight">
        <div className="text-base text-purple-500 font-semibold">
          AKTA / ANALITYK
        </div>
        <div className="text-xs text-purple-400/80">
          Wydział Rodzinny i Nieletnich
        </div>
      </div>
    </div>
  );
}

export default function Home({ handleAction }) {
  const tiles = [
    {
      id: 1,
      label: "Akta",
      sublabel: "Utwórz / Aktualizuj",
      icon: FileText,
      action: "AKTA_CREATE"
    },
    {
      id: 2,
      label: "Analiza",
      sublabel: "Pismo / Notatka",
      icon: Search,
      action: "ANALYZE"
    },
    {
      id: 3,
      label: "Strategia",
      sublabel: "Plan działania",
      icon: Brain,
      action: "STRATEGY"
    },
    {
      id: 4,
      label: "Ryzyka",
      sublabel: "Ocena sprawy",
      icon: AlertTriangle,
      action: "RISKS"
    },
    {
      id: 5,
      label: "Moje Akta",
      sublabel: "Lista spraw",
      icon: Folder,
      action: "CASES_LIST"
    },
    {
      id: 6,
      label: "Pisma",
      sublabel: "Utwórz / Edytuj",
      icon: PenTool,
      action: "WRITE_DOC"
    }
  ];

  return (
    <div className="min-h-screen bg-[#050505] px-4 overflow-y-auto font-sans">
      <div className="mx-auto my-6 bg-[#0d0d0d] rounded-2xl p-4 w-full max-w-[420px] shadow-2xl flex flex-col min-h-[560px]">
        <Header />

        <div className="flex flex-col gap-3 flex-1 overflow-y-auto">
          {tiles.map((tile) => (
            <Tile
              key={tile.id}
              label={tile.label}
              sublabel={tile.sublabel}
              icon={tile.icon}
              onClick={() => handleAction(tile.action)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
