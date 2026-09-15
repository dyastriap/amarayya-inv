import type { Metadata } from 'next';
import Link from 'next/link';
import { pricing, templates } from '@/lib/site';
import { CtaBand, Faq, PriceGrid, Reveal, SectionHead, Steps } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Undangan digital',
  description:
    'Undangan website yang disebar lewat WhatsApp. Nama tamu terisi otomatis, RSVP masuk real-time, peta lokasi dan amplop digital.',
};

const fitur = [
  { t: 'Nama tamu otomatis', d: 'Satu tautan per tamu. Nama mereka sudah tertulis di halaman pembuka, tidak perlu diketik manual.' },
  { t: 'RSVP real-time', d: 'Jawaban hadir atau tidak langsung masuk ke dashboard. Bisa diunduh jadi Excel untuk katering.' },
  { t: 'Peta & jadwal', d: 'Tombol arahkan ke Google Maps, plus hitung mundur dan tombol simpan ke kalender.' },
  { t: 'Amplop digital', d: 'Nomor rekening dan QRIS dengan tombol salin, supaya tamu jauh tetap bisa kirim hadiah.' },
  { t: 'Buku ucapan', d: 'Doa dari tamu tampil di halaman undangan dan tersimpan sebagai arsip setelah acara.' },
  { t: 'Musik latar', d: 'Satu lagu pilihan kamu, dengan tombol jeda supaya tamu tetap pegang kendali.' },
];

const langkah = [
  { t: 'Pilih template', d: 'Buka dua demo di bawah dari HP. Tentukan mana yang paling dekat dengan konsep acara kamu.' },
  { t: 'Kirim data', d: 'Nama, tanggal, lokasi, foto, dan daftar tamu lewat formulir yang kami kirimkan.' },
  { t: 'Tayang', d: 'Undangan jadi dalam 1×24 jam kerja. Revisi teks gratis sampai hari-H.' },
];

const faq = [
  { q: 'Berapa lama undangan selesai?', a: 'Satu hari kerja setelah data dan foto lengkap kami terima. Kalau butuh lebih cepat, sebutkan di awal.' },
  { q: 'Bisa revisi setelah tayang?', a: 'Bisa. Revisi teks dan foto gratis sampai hari acara. Setelah itu dikenakan biaya kecil per perubahan.' },
  { q: 'Tamu perlu install aplikasi?', a: 'Tidak. Undangan terbuka di browser HP mana pun, cukup dari tautan WhatsApp.' },
  { q: 'Domainnya seperti apa?', a: 'Bentuknya amarayya.id/inv/nama-kalian. Kalau mau domain sendiri, bisa kami pasangkan dengan biaya tambahan.' },
  { q: 'Setelah masa aktif habis?', a: 'Halaman dinonaktifkan, tapi data ucapan dan RSVP kami kirimkan ke kamu. Perpanjangan bisa kapan saja.' },
];

export default function UndanganDigitalPage() {
  return (
    <>
      {/* ------------------------------- HERO ------------------------------ */}
      <section className="sweep-blush">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:py-24">
          <Reveal>
            <p className="text-[13px] text-[#1A1520]/55">
              <Link href="/" className="hover:text-[#C8203C]">
                Amarayya
              </Link>{' '}
              / Undangan digital
            </p>
            <h1 className="mt-6 max-w-[16ch] font-display text-[clamp(2.5rem,6.5vw,4.5rem)] leading-[0.98]">
              Undangan yang tamu buka <em className="italic text-[#C8203C]">dari HP mereka sendiri</em>
            </h1>
            <p className="mt-7 max-w-[56ch] text-[15px] leading-relaxed text-[#1A1520]/70">
              Satu tautan per tamu, dikirim lewat WhatsApp. Nama mereka sudah tertulis, jawaban kehadiran langsung
              masuk ke daftarmu, dan tidak ada yang perlu dicetak.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ----------------------------- KATALOG ----------------------------- */}
      <section id="katalog" className="bg-[#1A1520] text-[#EFE9E4]">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <h2 className="max-w-[18ch] font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05]">
              Coba dulu undangannya, baru bayar
            </h2>
            <p className="max-w-[40ch] text-[14px] leading-relaxed text-[#EFE9E4]/60">
              Dua demo di bawah ini versi utuh, bukan gambar. Buka dari HP supaya terasa seperti yang tamu lihat nanti.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-2">
            {templates.map((t) => (
              <div
                key={t.id}
                className="overflow-hidden rounded-[20px] border border-white/10 bg-white/[0.04] transition-colors hover:border-white/25"
              >
                {/* Ganti blok gradasi ini dengan screenshot template */}
                <div className={`relative flex h-56 items-end bg-gradient-to-br p-6 ${t.swatch}`}>
                  <span className="font-display text-4xl text-white/95">{t.name}</span>
                </div>

                <div className="p-7">
                  <p className="text-[12.5px] text-[#EFE9E4]/50">{t.style}</p>
                  <p className="mt-3 text-[14px] leading-relaxed text-[#EFE9E4]/80">{t.desc}</p>
                  <Link
                    href={`/inv/${t.demoSlug}`}
                    target="_blank"
                    className="mt-7 inline-flex w-full items-center justify-center rounded-full bg-[#EFE9E4] px-5 py-3.5 text-[13.5px] font-semibold text-[#1A1520] transition-colors hover:bg-[#C8203C] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#C8203C]"
                  >
                    Buka demo {t.name}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------ FITUR ------------------------------ */}
      <section className="bg-[#EFE9E4]">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <SectionHead title="Yang ada di dalam undangan" />
          <dl className="mt-14 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {fitur.map((f) => (
              <div key={f.t} className="border-t border-[#1A1520]/15 pt-5">
                <dt className="text-[15px] font-semibold">{f.t}</dt>
                <dd className="mt-2 max-w-[38ch] text-[14px] leading-relaxed text-[#1A1520]/70">{f.d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ------------------------------ LANGKAH ---------------------------- */}
      <section className="sweep-blush">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <SectionHead title="Dari pilih template sampai tayang" />
          <div className="mt-14">
            <Steps items={langkah} tone="#EFD8D2" />
          </div>
        </div>
      </section>

      {/* ------------------------------- HARGA ----------------------------- */}
      <section id="harga" className="bg-[#EFE9E4]">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <SectionHead
            title="Paket undangan digital"
            body="Bayar sekali di awal, tidak ada biaya per tamu. Masa aktif dihitung sejak undangan tayang."
          />
          <div className="mt-14">
            <PriceGrid plans={pricing.undangan} />
          </div>
        </div>
      </section>

      {/* -------------------------------- FAQ ------------------------------ */}
      <section className="bg-[#EFE9E4]">
        <div className="mx-auto max-w-4xl px-5 pb-24">
          <h2 className="mb-10 font-display text-[clamp(1.75rem,4vw,2.5rem)]">Pertanyaan yang sering masuk</h2>
          <Faq items={faq} />
        </div>
      </section>

      <CtaBand
        title="Kirim tanggalnya, undangan tayang besok"
        sweep="sweep-blush"
        pesan="Halo Amarayya, saya mau pesan undangan digital."
      />
    </>
  );
}