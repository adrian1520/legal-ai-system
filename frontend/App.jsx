import React, { useState } from "react";
import Home from "./Home";
import CaseView from "./CaseView";

export default function App() {
  const [screen, setScreen] = useState("HOME");
  const [caseId, setCaseId] = useState(null);

  const handleAction = (type) => {
    switch (type) {
      case "AKTA_CREATE":
        setScreen("CASE");
        setCaseId("case_1");
        break;
      default:
        break;
    }
  };

  if (screen === "CASE") {
    return <CaseView caseId={caseId} goBack={() => setScreen("HOME")} />;
  }

  return <Home handleAction={handleAction} />;
}
