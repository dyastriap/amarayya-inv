import type { Metadata } from 'next';
import { Instrument_Serif, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import SiteShell from '@/components/site-shell';

const display = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const body = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Amarayya — Undangan digital, self photo studio, photobooth event',
    template: '%s — Amarayya',
  },
  description:
    'Amarayya mengurus tiga bagian dari satu acara: undangan digital yang disebar lewat WhatsApp, self photo studio, dan photobooth yang kami bawa ke lokasi acara.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id" className={`${display.variable} ${body.variable}`}>
      <body className="bg-[#EFE9E4] font-body text-[#1A1520] antialiased selection:bg-[#C8203C] selection:text-white">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}