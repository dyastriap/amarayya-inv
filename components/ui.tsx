'use client';

import React from 'react';
import { motion, Variants } from 'framer-motion';
import { Plan, WA, JAM } from '@/lib/site';

/* ----------------------------- token motion ------------------------------ */

export const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export const rise: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export const group: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

/** Pembungkus seksi yang muncul sekali saat masuk viewport. */
export function Reveal({
  children,
  className = '',
  stagger = false,
}: {
  children: React.ReactNode;
  className?: string;
  stagger?: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-70px' }}
      variants={stagger ? group : rise}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* --------------------------------- logo ---------------------------------- */

export function Shutter({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className}>
      <circle cx="12" cy="12" r="10.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M12 12 L12 1.5 M12 12 L21 6.8 M12 12 L21 17.2 M12 12 L12 22.5 M12 12 L3 17.2 M12 12 L3 6.8"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* -------------------------------- tombol --------------------------------- */

const focus =
  'focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8203C]';

export function WaButton({
  children = 'Booking lewat WhatsApp',
  pesan,
  tone = 'accent',
  className = '',
}: {
  children?: React.ReactNode;
  /** teks yang sudah terisi di kolom chat */
  pesan?: string;
  tone?: 'accent' | 'ink' | 'outline';
  className?: string;
}) {
  const href = pesan ? `${WA}?text=${encodeURIComponent(pesan)}` : WA;
  const tones = {
    accent:
      'bg-[#C8203C] text-white shadow-[0_10px_30px_-12px_rgba(200,32,60,0.9)] hover:-translate-y-0.5',
    ink: 'bg-[#1A1520] text-[#EFE9E4] hover:bg-[#C8203C]',
    outline: 'border border-[#1A1520]/25 hover:border-[#1A1520]',
  }[tone];

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={`inline-block rounded-full px-7 py-3.5 text-sm font-semibold transition-all ${tones} ${focus} ${className}`}
    >
      {children}
    </a>
  );
}

/* ----------------------------- judul seksi ------------------------------- */

export function SectionHead({
  title,
  body,
  align = 'left',
}: {
  title: string;
  body?: string;
  align?: 'left' | 'center';
}) {
  return (
    <Reveal className={align === 'center' ? 'mx-auto max-w-[46ch] text-center' : 'max-w-[46ch]'}>
      <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05]">{title}</h2>
      {body && <p className="mt-4 text-[15px] leading-relaxed text-[#1A1520]/70">{body}</p>}
    </Reveal>
  );
}

/* ------------------------------ grid harga ------------------------------- */

export function PriceGrid({ plans }: { plans: Plan[] }) {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {plans.map((p) => (
        <motion.div
          key={p.name}
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: EASE }}
          className={`flex flex-col justify-between rounded-[4px] p-8 ${
            p.featured ? 'bg-[#1A1520] text-[#EFE9E4] ring-2 ring-[#C8203C]' : 'bg-white text-[#1A1520]'
          }`}
        >
          <div>
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-[15px] font-semibold">{p.name}</h3>
              {p.featured && (
                <span className="rounded-full bg-[#C8203C] px-2.5 py-1 text-[10.5px] font-semibold text-white">
                  Paling sering diambil
                </span>
              )}
            </div>

            <p className="mt-5 font-display text-[40px] leading-none">{p.price}</p>
            <p className={`mt-2 text-[12.5px] ${p.featured ? 'text-[#EFE9E4]/55' : 'text-[#1A1520]/50'}`}>
              {p.unit}
            </p>

            <ul
              className={`mt-7 space-y-3 border-t pt-6 text-[13.5px] ${
                p.featured ? 'border-white/15 text-[#EFE9E4]/80' : 'border-[#1A1520]/10 text-[#1A1520]/75'
              }`}
            >
              {p.items.map((it) => (
                <li key={it} className="flex gap-2.5">
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#C8203C]" />
                  {it}
                </li>
              ))}
            </ul>
          </div>

          <WaButton
            tone={p.featured ? 'accent' : 'outline'}
            pesan={`Halo Amarayya, saya mau ambil paket ${p.name}.`}
            className="mt-8 w-full text-center"
          >
            Ambil paket {p.name}
          </WaButton>
        </motion.div>
      ))}
    </div>
  );
}

/* ---------------------------- daftar langkah ----------------------------- */

export function Steps({ items, tone }: { items: { t: string; d: string }[]; tone: string }) {
  return (
    <Reveal stagger>
      <ol className="grid gap-px overflow-hidden rounded-[4px] bg-[#1A1520]/15 md:grid-cols-3">
        {items.map((s, i) => (
          <motion.li key={s.t} variants={rise} className="p-8" style={{ background: tone }}>
            <span className="font-display text-5xl text-[#C8203C]">{i + 1}</span>
            <h3 className="mt-4 text-[17px] font-semibold">{s.t}</h3>
            <p className="mt-2 text-[14px] leading-relaxed text-[#1A1520]/70">{s.d}</p>
          </motion.li>
        ))}
      </ol>
    </Reveal>
  );
}

/* --------------------------------- FAQ ----------------------------------- */

export function Faq({ items }: { items: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-[#1A1520]/12 border-y border-[#1A1520]/12">
      {items.map((f) => (
        <details key={f.q} className="group py-5">
          <summary
            className={`flex cursor-pointer list-none items-center justify-between gap-6 text-[15px] font-semibold ${focus}`}
          >
            {f.q}
            <span className="shrink-0 text-[#C8203C] transition-transform duration-300 group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 max-w-[68ch] text-[14px] leading-relaxed text-[#1A1520]/70">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

/* --------------------------------- CTA ----------------------------------- */

export function CtaBand({
  title,
  body = `Balasan paling lama 15 menit di jam kerja, ${JAM}.`,
  sweep = 'sweep-blush',
  pesan,
}: {
  title: string;
  body?: string;
  sweep?: string;
  pesan?: string;
}) {
  return (
    <section className={sweep}>
      <div className="mx-auto max-w-6xl px-5 py-24 text-center">
        <Reveal>
          <h2 className="mx-auto max-w-[16ch] font-display text-[clamp(2.25rem,5.5vw,4rem)] leading-[1.02]">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-[48ch] text-[15px] leading-relaxed text-[#1A1520]/70">{body}</p>
          <WaButton tone="ink" pesan={pesan} className="mt-9 px-9 py-4">
            Chat Amarayya sekarang
          </WaButton>
        </Reveal>
      </div>
    </section>
  );
}