"use client";

import NewsletterPreview from "./NewsletterPreview";
import { useState } from "react";

export default function EditorPage() {

  const [template, setTemplate] = useState({
    width: 600,
    rows: [] // your existing template data
  });

  const [selectedCellId, setSelectedCellId] = useState(null);


  //  EXPORT FUNCTIONS


  function getEmailHTML() {
    const element = document.getElementById("email-preview");

    if (!element) return "";

    return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>Email</title>
</head>
<body>
${element.innerHTML}
</body>
</html>
    `;
  }

  // COPY HTML
  async function handleCopyHTML() {
    const html = getEmailHTML();

    try {
      await navigator.clipboard.writeText(html);
      alert(" Copied to clipboard!");
    } catch (err) {
      console.error(err);
      alert(" Copy failed");
    }
  }

  //  DOWNLOAD HTML
  function handleDownloadHTML() {
    const html = getEmailHTML();

    const blob = new Blob([html], { type: "text/html" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "test-email.html";
    a.click();

    URL.revokeObjectURL(url);
  }

  //  PREVIEW IN NEW TAB (BONUS)
  function handlePreview() {
    const html = getEmailHTML();
    const newWindow = window.open();
    newWindow.document.write(html);
    newWindow.document.close();
  }


  //  HANDLERS 


  function handleSelectCell(id) {
    setSelectedCellId(id);
  }

  function handleCellChange(id, html) {
    console.log(id, html);
  }

  function handleSelectionChange() {
    console.log("selection changed");
  }

  
  // UI

  return (
    <div style={{ padding: "20px" }}>

      {/*  EXPORT BUTTONS */}
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
        
        <button
          onClick={handleCopyHTML}
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid #2563eb",
            background: "#2563eb",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          Copy HTML
        </button>

        <button
          onClick={handleDownloadHTML}
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid #16a34a",
            background: "#16a34a",
            color: "#fff",
            cursor: "pointer"
          }}
        >
           Download HTML
        </button>

        <button
          onClick={handlePreview}
          style={{
            padding: "8px 12px",
            borderRadius: "8px",
            border: "1px solid #111",
            background: "#111",
            color: "#fff",
            cursor: "pointer"
          }}
        >
          👀 Preview
        </button>

      </div>

      {/* YOUR PREVIEW */}
      <NewsletterPreview
        template={template}
        selectedCellId={selectedCellId}
        onSelectCell={handleSelectCell}
        onCellHtmlChange={handleCellChange}
        onSelectionChange={handleSelectionChange}
      />

    </div>
  );
}
