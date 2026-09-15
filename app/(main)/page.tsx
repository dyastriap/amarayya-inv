'use client';

import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { pricing, services } from '@/lib/site';
import { CtaBand, EASE, Reveal, SectionHead, Shutter, Steps, WaButton, rise } from '@/components/ui';

/* Satu frame di strip hero. Ganti <div> gradasi dengan <Image /> milikmu. */
function Frame({ caption, tone, delay }: { caption: string; tone: string; delay: number }) {
  return (
    <motion.figure
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.45, ease: EASE }}
      className="relative"
    >
      <div className={`relative aspect-[4/3] overflow-hidden rounded-[3px] bg-gradient-to-br ${tone}`}>
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.95, 0] }}
          transition={{ delay, duration: 0.5, times: [0, 0.12, 1] }}
          className="absolute inset-0 bg-white"
        />
        <span className="absolute inset-x-0 bottom-0 p-2 text-[10px] font-medium tracking-wide text-white/90">
          {caption}
        </span>
      </div>
    </motion.figure>
  );
}

const langkah = [
  { t: 'Pilih layanan', d: 'Chat kami di WhatsApp, sebutkan tanggal dan jumlah tamu atau peserta.' },
  { t: 'Kunci jadwal', d: 'Bayar DP 30%. Slot studio dan tanggal event langsung kami tahan atas nama kamu.' },
  { t: 'Hari-H', d: 'Undangan tayang, studio siap, atau tim photobooth datang satu jam sebelum acara mulai.' },
];

export default function Home() {
  return (
    <>
      {/* ------------------------------- HERO ------------------------------ */}
      <section className="sweep-blush overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-5 py-20 lg:grid-cols-12 lg:py-28">
          <div className="lg:col-span-7">
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-5 flex items-center gap-2 text-[13px] text-[#1A1520]/60"
            >
              <span className="inline-block h-1.5 w-1.5 animate-pulse rounded-full bg-[#C8203C]" />
              Bogor &amp; Jabodetabek
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="font-display text-[clamp(2.75rem,7vw,5rem)] leading-[0.95] tracking-[-0.01em]"
            >
              Undang mereka,
              <br />
              rayakan harinya,
              <br />
              <em className="italic text-[#C8203C]">bawa pulang cetakannya.</em>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.7, ease: EASE }}
              className="mt-7 max-w-[54ch] text-[15px] leading-relaxed text-[#1A1520]/70"
            >
              Amarayya mengurus tiga bagian dari satu acara: undangan digital yang disebar lewat WhatsApp,
              self photo studio untuk sesi foto tanpa fotografer, dan photobooth yang kami bawa ke lokasi.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.28, duration: 0.7, ease: EASE }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <WaButton />
              <a
                href="#layanan"
                className="rounded-full border border-[#1A1520]/25 px-7 py-3.5 text-sm font-semibold transition-colors hover:border-[#1A1520] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8203C]"
              >
                Lihat tiga layanan
              </a>
            </motion.div>
          </div>

          {/* Strip photobooth: satu-satunya animasi otomatis besar di situs */}
          <div className="lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30, rotate: -3 }}
              animate={{ opacity: 1, y: 0, rotate: -2 }}
              transition={{ duration: 0.8, ease: EASE }}
              className="relative mx-auto w-[248px] rounded-[6px] bg-white p-3 pb-16 shadow-[0_35px_70px_-30px_rgba(26,21,32,0.55)]"
            >
              <div className="space-y-2">
                <Frame caption="Undangan" tone="from-[#7A2E3C] to-[#2A0C10]" delay={0.6} />
                <Frame caption="Self studio" tone="from-[#8E7FB8] to-[#3B3252]" delay={1.0} />
                <Frame caption="Photobooth" tone="from-[#4F7A66] to-[#1E3329]" delay={1.4} />
                <Frame caption="Cetak" tone="from-[#C8203C] to-[#66101E]" delay={1.8} />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 pb-4">
                <span className="font-display text-xl leading-none">Amarayya</span>
                <span className="text-[10px] text-[#1A1520]/45">2026</span>
              </div>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2.2, duration: 0.6 }}
              className="mt-6 text-center text-[13px] text-[#1A1520]/55"
            >
              Strip 4 frame, keluar 60 detik setelah tombol ditekan.
            </motion.p>
          </div>
        </div>
      </section>

      {/* --------------------------- FILM LEADER --------------------------- */}
      <div className="overflow-hidden border-y border-[#1A1520]/12 bg-[#1A1520] py-3 text-[#EFE9E4]">
        <div className="marquee flex w-max gap-10 whitespace-nowrap text-[12px] tracking-[0.18em]">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex items-center gap-10">
              <span>3 · 2 · 1 · SENYUM</span>
              <Shutter className="h-3.5 w-3.5 text-[#C8203C]" />
              <span>CETAK DI TEMPAT</span>
              <Shutter className="h-3.5 w-3.5 text-[#C8203C]" />
              <span>FILE DIKIRIM HARI ITU</span>
              <Shutter className="h-3.5 w-3.5 text-[#C8203C]" />
            </span>
          ))}
        </div>
      </div>

      {/* ----------------------------- LAYANAN ----------------------------- */}
      <section id="layanan" className="sweep-lilac">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <SectionHead
            title="Tiga layanan, satu tim"
            body="Bisa diambil terpisah, bisa sekaligus. Kalau ambil dua atau lebih untuk acara yang sama, harganya kami gabung."
          />

          <Reveal stagger className="mt-14 grid gap-6 md:grid-cols-3">
            {services.map((s, i) => (
              <motion.article
                key={s.key}
                variants={rise}
                className={[
                  'flex flex-col justify-between bg-white p-7 transition-transform duration-300 hover:-translate-y-1',
                  // bentuk mengikuti wujud produknya: layar HP / bingkai foto / strip
                  i === 0 ? 'rounded-[28px]' : i === 1 ? 'rounded-[4px]' : 'rounded-[4px] border-y-[10px] border-[#1A1520]',
                ].join(' ')}
              >
                <div>
                  <h3 className="font-display text-[26px] leading-tight">{s.label}</h3>
                  <p className="mt-3 text-[14px] leading-relaxed text-[#1A1520]/70">{s.line}</p>

                  <ul className="mt-6 space-y-2.5 border-t border-[#1A1520]/10 pt-5 text-[13.5px] text-[#1A1520]/75">
                    {s.points.map((p) => (
                      <li key={p} className="flex gap-2.5">
                        <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-[#C8203C]" />
                        {p}
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={s.href}
                  className="mt-7 inline-flex w-fit border-b border-[#C8203C] pb-0.5 text-[13.5px] font-semibold text-[#C8203C] transition-opacity hover:opacity-70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8203C]"
                >
                  Pelajari {s.label.toLowerCase()}
                </Link>
              </motion.article>
            ))}
          </Reveal>
        </div>
      </section>

      {/* ---------------------------- CARA PESAN --------------------------- */}
      <section id="cara" className="sweep-mint">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <SectionHead title="Tiga langkah dari chat sampai hari-H" />
          <div className="mt-14">
            <Steps items={langkah} tone="#D6E3DC" />
          </div>
        </div>
      </section>

      {/* ---------------------- HARGA (ringkas per layanan) ---------------- */}
      <section id="harga" className="bg-[#EFE9E4]">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <SectionHead
            title="Harga mulai dari"
            body="Rincian paket lengkap ada di halaman masing-masing layanan. Semua harga sudah termasuk pajak."
          />

          <Reveal stagger className="mt-14 grid gap-6 md:grid-cols-3">
            {services.map((s) => {
              const termurah = pricing[s.key][0];
              return (
                <motion.div key={s.key} variants={rise} className="rounded-[4px] bg-white p-8">
                  <span
                    className="block h-1.5 w-12 rounded-full"
                    style={{ background: s.solid }}
                    aria-hidden
                  />
                  <h3 className="mt-5 text-[15px] font-semibold">{s.label}</h3>
                  <p className="mt-4 font-display text-[40px] leading-none">{termurah.price}</p>
                  <p className="mt-2 text-[12.5px] text-[#1A1520]/50">{termurah.unit}</p>
                  <p className="mt-5 text-[13.5px] leading-relaxed text-[#1A1520]/70">{s.tagline}.</p>

                  <Link
                    href={`${s.href}#harga`}
                    className="mt-7 block rounded-full border border-[#1A1520]/20 px-5 py-3.5 text-center text-[13.5px] font-semibold transition-colors hover:bg-[#1A1520] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8203C]"
                  >
                    Lihat semua paket
                  </Link>
                </motion.div>
              );
            })}
          </Reveal>
        </div>
      </section>

      <CtaBand
        title="Sebutkan tanggalnya, kami tahan slotnya"
        pesan="Halo Amarayya, saya mau tanya soal layanan kalian."
      />
    </>
  );
}