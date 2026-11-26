import { Inter, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";

const heading = Space_Grotesk({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-talented-grotesk",
});

const body = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-talented-inter",
});

export function StudentLayout({ children }: { children: ReactNode }) {
  return (
    <div
      lang="es"
      className={`${heading.variable} ${body.variable} min-h-screen bg-[#F7F6FC] text-[#12122B] [font-family:var(--font-talented-inter),Arial,sans-serif] [color-scheme:light]`}
    >
      {children}
    </div>
  );
}
