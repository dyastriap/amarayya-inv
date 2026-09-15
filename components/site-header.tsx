'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import { services } from '@/lib/site';
import { EASE, Shutter, WaButton } from './ui';

const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8203C]';

export default function SiteHeader() {
  const [openDesktop, setOpenDesktop] = useState(false);
  const [openMobile, setOpenMobile] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // tutup setiap kali pindah halaman
  useEffect(() => {
    setOpenDesktop(false);
    setOpenMobile(false);
  }, [pathname]);

  // klik di luar & tombol Escape
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (wrap.current && !wrap.current.contains(e.target as Node)) setOpenDesktop(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenDesktop(false);
        setOpenMobile(false);
      }
    };
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const isServicePage = pathname?.startsWith('/layanan');

  return (
    <header className="sticky top-0 z-50 border-b border-[#1A1520]/10 bg-[#EFE9E4]/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5">
        <Link href="/" className={`flex items-center gap-2.5 ${focus}`}>
          <Shutter className="h-6 w-6 text-[#C8203C]" />
          <span className="font-display text-[26px] leading-none">Amarayya</span>
        </Link>

        {/* ---------------------------- desktop ---------------------------- */}
        <nav className="hidden items-center gap-7 text-[13px] text-[#1A1520]/70 md:flex">
          <div
            ref={wrap}
            className="relative"
            onMouseEnter={() => setOpenDesktop(true)}
            onMouseLeave={() => setOpenDesktop(false)}
          >
            <button
              type="button"
              aria-expanded={openDesktop}
              aria-haspopup="true"
              onClick={() => setOpenDesktop((v) => !v)}
              className={`flex items-center gap-1.5 py-2 transition-colors hover:text-[#C8203C] ${
                isServicePage ? 'text-[#C8203C]' : ''
              } ${focus}`}
            >
              Layanan
              <svg
                viewBox="0 0 10 6"
                aria-hidden
                className={`h-[6px] w-[10px] transition-transform duration-200 ${openDesktop ? 'rotate-180' : ''}`}
              >
                <path d="M1 1l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>

            <AnimatePresence>
              {openDesktop && (
                <motion.div
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 6 }}
                  transition={{ duration: 0.18, ease: EASE }}
                  className="absolute left-1/2 top-full w-[420px] -translate-x-1/2 pt-3"
                >
                  <div className="overflow-hidden rounded-[14px] border border-[#1A1520]/10 bg-white shadow-[0_28px_60px_-28px_rgba(26,21,32,0.5)]">
                    {services.map((s) => (
                      <Link
                        key={s.key}
                        href={s.href}
                        className={`group flex items-start gap-4 border-b border-[#1A1520]/8 p-4 last:border-0 transition-colors hover:bg-[#F6F2EE] ${focus}`}
                      >
                        <span
                          className="mt-0.5 h-9 w-9 shrink-0 rounded-[3px] ring-1 ring-inset ring-black/5"
                          style={{ background: s.solid }}
                        />
                        <span className="min-w-0">
                          <span className="block text-[14px] font-semibold text-[#1A1520] group-hover:text-[#C8203C]">
                            {s.label}
                          </span>
                          <span className="mt-0.5 block text-[12.5px] leading-snug text-[#1A1520]/60">
                            {s.line}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <Link className={`transition-colors hover:text-[#C8203C] ${focus}`} href="/#cara">
            Cara pesan
          </Link>
          <Link className={`transition-colors hover:text-[#C8203C] ${focus}`} href="/#harga">
            Harga
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <WaButton tone="ink" className="hidden px-5 py-2.5 text-[13px] md:inline-block">
            Booking
          </WaButton>

          {/* --------------------------- mobile --------------------------- */}
          <button
            type="button"
            aria-expanded={openMobile}
            aria-label="Buka menu"
            onClick={() => setOpenMobile((v) => !v)}
            className={`flex h-10 w-10 flex-col items-center justify-center gap-[5px] md:hidden ${focus}`}
          >
            <span
              className={`h-[1.5px] w-5 bg-[#1A1520] transition-transform duration-200 ${
                openMobile ? 'translate-y-[3.25px] rotate-45' : ''
              }`}
            />
            <span
              className={`h-[1.5px] w-5 bg-[#1A1520] transition-transform duration-200 ${
                openMobile ? '-translate-y-[3.25px] -rotate-45' : ''
              }`}
            />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {openMobile && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="overflow-hidden border-t border-[#1A1520]/10 bg-[#EFE9E4] md:hidden"
          >
            <div className="mx-auto max-w-6xl px-5 py-5">
              <p className="text-[11.5px] text-[#1A1520]/45">Layanan</p>
              <div className="mt-3 space-y-2">
                {services.map((s) => (
                  <Link
                    key={s.key}
                    href={s.href}
                    className={`flex items-center gap-3 rounded-[10px] bg-white p-3.5 ${focus}`}
                  >
                    <span
                      className="h-8 w-8 shrink-0 rounded-[3px] ring-1 ring-inset ring-black/5"
                      style={{ background: s.solid }}
                    />
                    <span>
                      <span className="block text-[14px] font-semibold">{s.label}</span>
                      <span className="block text-[12px] text-[#1A1520]/55">{s.tagline}</span>
                    </span>
                  </Link>
                ))}
              </div>

              <div className="mt-5 flex flex-col gap-3 border-t border-[#1A1520]/10 pt-5 text-[14px]">
                <Link href="/#cara" className={focus}>
                  Cara pesan
                </Link>
                <Link href="/#harga" className={focus}>
                  Harga
                </Link>
              </div>

              <WaButton tone="ink" className="mt-5 w-full text-center">
                Booking lewat WhatsApp
              </WaButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}