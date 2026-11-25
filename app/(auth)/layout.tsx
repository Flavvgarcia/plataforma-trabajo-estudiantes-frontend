import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-auth-heading",
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-auth-body",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Talented · Tu primer empleo, con ventaja",
  description:
    "Accede a Talented como estudiante o empresa para conectar talento universitario con sus primeras oportunidades profesionales.",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${spaceGrotesk.variable} ${inter.variable} min-h-screen w-full bg-[#F7F6FC] text-[#12122B] antialiased [color-scheme:light]`}
      style={{
        fontFamily:
          'var(--font-auth-body), "Inter", Arial, Helvetica, sans-serif',
      }}
    >
      {children}
    </div>
  );
}
