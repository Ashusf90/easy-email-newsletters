"use client";

export default function TemplateCard({ template, onSelect }) {
  return (
    <div
      onClick={() => onSelect(template)}
      style={{
        width: "260px",
        borderRadius: "12px",
        border: "1px solid #e5e7eb",
        overflow: "hidden",
        cursor: "pointer",
        background: "#ffffff",
        transition: "all 0.2s ease",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "scale(1.03)";
        e.currentTarget.style.boxShadow = "0 10px 25px rgba(0,0,0,0.1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "scale(1)";
        e.currentTarget.style.boxShadow = "none";
      }}
    >
      {/* Thumbnail Preview */}
      <div
        style={{
          height: "180px",
          overflow: "hidden",
          background: "#f3f4f6",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            transform: "scale(0.4)",
            transformOrigin: "top",
            pointerEvents: "none",
          }}
        >
          {/*  Mini email preview */}
          <table
            width={template.width}
            style={{
              borderCollapse: "collapse",
              background: "#fff",
            }}
          >
            <tbody>
              {template.rows.slice(0, 3).map((row) => (
                <tr key={row.id}>
                  {row.columns.map((cell) => (
                    <td
                      key={cell.id}
                      style={{
                        padding: "8px",
                        border: "1px solid #ddd",
                        fontSize: "10px",
                        background: "#fafafa",
                      }}
                    >
                      {cell.content?.slice(0, 20) || "Text"}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/*  Footer */}
      <div style={{ padding: "10px" }}>
        <h4 style={{ fontSize: "14px", fontWeight: "600" }}>
          {template.name || "Template"}
        </h4>
        <p style={{ fontSize: "12px", color: "#6b7280" }}>
          {template.description || "Click to use"}
        </p>
      </div>
    </div>
  );
}
