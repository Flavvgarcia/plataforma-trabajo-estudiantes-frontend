import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import type { ReactNode } from "react";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["600", "700"],
  variable: "--font-talented-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-talented-inter",
});

export const metadata: Metadata = {
  title: "Mi perfil | Talented",
  description:
    "Gestiona tu perfil profesional, CV analizado por IA y privacidad.",
};

export default function MiPerfilLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${spaceGrotesk.variable} ${inter.variable} min-h-screen bg-[#F7F6FC] text-[#12122B]`}
      style={{ fontFamily: "var(--font-talented-inter), sans-serif" }}
    >
      {children}
    </div>
  );
}
