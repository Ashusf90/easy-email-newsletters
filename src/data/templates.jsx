import React from "react";

export const TEMPLATE_DEFINITIONS = [
  {
    id: "classic-newsletter",
    name: "Classic Newsletter",
    description: "Header, large body, banner row, three-column footer.",
    width: 700,
    thumb: (
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" fill="#f5f5f5" />
        <rect x="8" y="8" width="384" height="36" fill="#e6e6e6" stroke="#bdbdbd" />
        <rect x="8" y="44" width="384" height="170" fill="#ededed" stroke="#bdbdbd" />
        <rect x="8" y="214" width="384" height="44" fill="#e8e8e8" stroke="#bdbdbd" />
        <rect x="8" y="258" width="128" height="34" fill="#e6e6e6" stroke="#bdbdbd" />
        <rect x="136" y="258" width="128" height="34" fill="#e6e6e6" stroke="#bdbdbd" />
        <rect x="264" y="258" width="128" height="34" fill="#e6e6e6" stroke="#bdbdbd" />
      </svg>
    ),
    rows: [
      {
        id: "r1",
        minHeight: 70,
        columns: [
          {
            id: "c1",
            width: "100%",
            padding: 22,
            backgroundColor: "#ffffff",
            type: "text",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: 28,
            color: "#111111",
            textAlign: "left",
            html: '<h1 style="margin:0;font-size:28px;line-height:1.2;">Your Newsletter Title</h1>',
          },
        ],
      },
      {
        id: "r2",
        minHeight: 420,
        columns: [
          {
            id: "c2",
            width: "100%",
            padding: 24,
            backgroundColor: "#ffffff",
            type: "text",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: 16,
            color: "#222222",
            textAlign: "left",
            html:
              '<h2 style="margin:0 0 14px;font-size:24px;line-height:1.25;">Main Story or Feature</h2><p style="margin:0 0 12px;line-height:1.6;">Click into this cell and start typing. This larger content block is good for a feature story, introduction, or hero section of your email.</p><p style="margin:0;line-height:1.6;">Background colors, safe fonts, and images can all be edited from the sidebar once the cell is selected.</p>',
          },
        ],
      },
      {
        id: "r3",
        minHeight: 90,
        columns: [
          {
            id: "c3",
            width: "100%",
            padding: 20,
            backgroundColor: "#f3f4f6",
            type: "text",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: 16,
            color: "#111111",
            textAlign: "center",
            html:
              '<p style="margin:0;font-size:18px;line-height:1.5;"><strong>Secondary highlight:</strong> Add an announcement, a featured quote, or a callout band here.</p>',
          },
        ],
      },
      {
        id: "r4",
        minHeight: 110,
        columns: [
          {
            id: "c4",
            width: "33.33%",
            padding: 18,
            backgroundColor: "#ffffff",
            type: "text",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: 14,
            color: "#222222",
            textAlign: "left",
            html:
              '',
          },


        ],
      },
    ],
  },

  {
    id: "docs-split-banner",
    name: "Docs Split Banner",
    description: "Inspired by your Google Docs layout with top bar, nested middle, bottom bar.",
    width: 700,
    thumb: (
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" fill="#f5f5f5" />
        <rect x="8" y="8" width="384" height="38" fill="#4a78ff" stroke="#bdbdbd" />
        <rect x="8" y="46" width="384" height="208" fill="#ededed" stroke="#bdbdbd" />
        <rect x="22" y="74" width="170" height="150" fill="#f8f8f8" stroke="#bdbdbd" />
        <rect x="208" y="74" width="170" height="150" fill="#f8f8f8" stroke="#bdbdbd" />
        <rect x="8" y="254" width="384" height="38" fill="#4a78ff" stroke="#bdbdbd" />
      </svg>
    ),
    rows: [
      {
        id: "dr1",
        minHeight: 58,
        columns: [
          {
            id: "dc1",
            width: "100%",
            padding: 16,
            backgroundColor: "#4d73ff",
            type: "text",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: 24,
            color: "#ffffff",
            textAlign: "center",
            html: "",
          },
        ],
      },
      {
        id: "dr2",
        minHeight: 288,
        columns: [
          {
            id: "dc2-wrapper",
            width: "100%",
            padding: 18,
            backgroundColor: "#ffffff",
            type: "nested",
            nestedTable: {
              rows: [
                {
                  id: "nested-row-1",
                  minHeight: 180,
                  columns: [
                    {
                      id: "dc2",
                      width: "50%",
                      padding: 22,
                      backgroundColor: "#ffffff",
                      type: "text",
                      fontFamily: "Arial, Helvetica, sans-serif",
                      fontSize: 16,
                      color: "#222222",
                      textAlign: "left",
                      html: "",
                    },
                    {
                      id: "dc3",
                      width: "50%",
                      padding: 22,
                      backgroundColor: "#ffffff",
                      type: "text",
                      fontFamily: "Arial, Helvetica, sans-serif",
                      fontSize: 16,
                      color: "#222222",
                      textAlign: "left",
                      html: "",
                    },
                  ],
                },
              ],
            },
          },
        ],
      },
      {
        id: "dr3",
        minHeight: 58,
        columns: [
          {
            id: "dc4",
            width: "100%",
            padding: 16,
            backgroundColor: "#4d73ff",
            type: "text",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: 18,
            color: "#ffffff",
            textAlign: "center",
            html: "",
          },
        ],
      },
    ],
  },

  {
    id: "blank-canvas",
    name: "Blank Canvas",
    description: "A simple starter with one big editable row.",
    width: 700,
    thumb: (
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <rect width="400" height="300" fill="#f5f5f5" />
        <rect x="8" y="8" width="384" height="284" fill="#ededed" stroke="#bdbdbd" />
      </svg>
    ),
    rows: [
      {
        id: "br1",
        minHeight: 400,
        columns: [
          {
            id: "bc1",
            width: "100%",
            padding: 24,
            backgroundColor: "#ffffff",
            type: "text",
            fontFamily: "Arial, Helvetica, sans-serif",
            fontSize: 16,
            color: "#222222",
            textAlign: "left",
            html:
              '<h2 style="margin:0 0 12px;font-size:24px;line-height:1.25;">Start Here</h2><p style="margin:0;line-height:1.6;">This blank layout gives you one large email-safe cell to build from.</p>',
          },
        ],
      },
    ],
  },
];