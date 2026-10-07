import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PUDO Code System — Operating Layer for AI Coding Agents",
  description: "Standardize coding workflows across Claude, Cursor, Windsurf, Roo, and Codex. Enforce quality gates, context handoffs, and 100-point repository readiness.",
  keywords: ["AI agents", "MCP server", "Cursor", "Windsurf", "Claude Code", "developer tools", "code quality", "PUDO"],
  authors: [{ name: "Dong Duong", url: "https://github.com/DongDuong2001" }],
  openGraph: {
    title: "PUDO Code System — Operating Layer for AI Coding Agents",
    description: "Standardize coding workflows across Claude, Cursor, Windsurf, Roo, and Codex with interactive MCP prompts and evidence-based quality gates.",
    url: "https://pudo-code-system.vercel.app",
    siteName: "PUDO Code System",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen bg-[#09090b] text-[#fafafa] antialiased selection:bg-zinc-800 selection:text-white">
        {children}
      </body>
    </html>
  );
}
