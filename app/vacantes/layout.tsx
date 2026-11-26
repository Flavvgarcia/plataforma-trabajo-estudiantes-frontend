import type { Metadata } from 'next';
import { Inter, Space_Grotesk } from 'next/font/google';
import type { ReactNode } from 'react';

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['600', '700'],
  variable: '--font-talented-grotesk',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-talented-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Vacantes | Talented',
  description:
    'Explora vacantes compatibles con tu perfil, revisa tus gaps y prepárate para postularte.',
};

export default function VacantesLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={`${spaceGrotesk.variable} ${inter.variable} min-h-screen bg-[#F7F6FC] text-[#12122B] antialiased [color-scheme:light]`}
      style={{
        fontFamily: 'var(--font-talented-inter), "Inter", sans-serif',
      }}
    >
      {children}
    </div>
  );
}
