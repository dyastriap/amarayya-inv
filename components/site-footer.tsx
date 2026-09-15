import React from 'react';
import Link from 'next/link';
import { ALAMAT, IG, WA, services } from '@/lib/site';
import { Shutter } from './ui';

export default function SiteFooter() {
  return (
    <footer className="bg-[#1A1520] text-[#EFE9E4]">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-2.5">
            <Shutter className="h-6 w-6 text-[#C8203C]" />
            <span className="font-display text-[26px] leading-none">Amarayya</span>
          </div>
          <p className="mt-4 max-w-[34ch] text-[13.5px] leading-relaxed text-[#EFE9E4]/55">
            Undangan digital, self photo studio, dan photobooth event. Berbasis di Bogor, melayani Jabodetabek.
          </p>
        </div>

        <div className="text-[13.5px]">
          <p className="mb-4 font-semibold">Layanan</p>
          <ul className="space-y-2.5 text-[#EFE9E4]/60">
            {services.map((s) => (
              <li key={s.key}>
                <Link className="hover:text-[#C8203C]" href={s.href}>
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-[13.5px]">
          <p className="mb-4 font-semibold">Kontak</p>
          <ul className="space-y-2.5 text-[#EFE9E4]/60">
            <li>
              <a className="hover:text-[#C8203C]" href={WA} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </li>
            <li>
              <a className="hover:text-[#C8203C]" href={IG} target="_blank" rel="noreferrer">
                Instagram
              </a>
            </li>
            <li>Studio: {ALAMAT}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-6 text-center text-[12px] text-[#EFE9E4]/40">
        © {new Date().getFullYear()} Amarayya
      </div>
    </footer>
  );
}