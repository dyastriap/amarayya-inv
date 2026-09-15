import type { Metadata } from 'next';
import Link from 'next/link';
import { ALAMAT, JAM, pricing } from '@/lib/site';
import { CtaBand, Faq, PriceGrid, Reveal, SectionHead, Steps } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Self photo studio',
  description:
    'Studio foto mandiri di Bogor. Ruangan, lampu, dan remote di tangan kamu. Cetak keluar dalam 60 detik, file mentah dikirim hari itu juga.',
};

const langkah = [
  { t: 'Pesan slot', d: 'Pilih tanggal dan jam lewat WhatsApp. Slot terkunci setelah DP masuk.' },
  { t: 'Masuk studio', d: 'Kami jelaskan remote dan lampu satu menit, lalu ruangan sepenuhnya milik kamu.' },
  { t: 'Pilih & cetak', d: 'Pilih foto favorit di layar, cetak keluar 60 detik kemudian. File mentah dikirim hari itu.' },
];

/* Warna gulungan latar yang tersedia di studio. Sesuaikan dengan stok aslimu. */
const latar = [
  { nama: 'Putih', hex: '#F2F0EC' },
  { nama: 'Blush', hex: '#EFD8D2' },
  { nama: 'Lilac', hex: '#DFD8EE' },
  { nama: 'Sage', hex: '#D6E3DC' },
  { nama: 'Cokelat susu', hex: '#C9B29B' },
  { nama: 'Hitam', hex: '#1A1520' },
];

const isiRuangan = [
  { t: 'Remote di tangan', d: 'Tombol pemicu ada di genggaman kamu. Tidak ada orang lain di dalam ruangan.' },
  { t: 'Lampu sudah diatur', d: 'Softbox dan lampu isi sudah kami setel. Tidak perlu paham fotografi untuk dapat hasil rata.' },
  { t: 'Layar pratinjau', d: 'Hasil langsung tampil di monitor besar, jadi kamu tahu kapan harus ulang.' },
  { t: 'Kursi, cermin, properti', d: 'Bangku, bunga, papan tulisan, dan topi tersedia. Boleh bawa properti sendiri.' },
  { t: 'Ruang ganti', d: 'Ganti baju di tempat. Paket Rombongan dapat ruang ganti terpisah.' },
  { t: 'Cetak & file', d: 'Cetak 4R keluar 60 detik. Semua file mentah dikirim lewat tautan di hari yang sama.' },
];

const faq = [
  { q: 'Harus booking dulu?', a: `Sangat disarankan. Walk-in dilayani kalau ada slot kosong. Studio buka ${JAM}.` },
  { q: 'Boleh bawa hewan peliharaan?', a: 'Boleh untuk hewan kecil dan jinak, beri tahu saat booking supaya kami siapkan alas.' },
  { q: 'Berapa orang maksimal?', a: 'Sepuluh orang dalam satu sesi. Lebih dari itu sebaiknya dipecah jadi dua slot berurutan.' },
  { q: 'Waktunya dihitung dari kapan?', a: 'Dari saat kamu masuk ruangan. Pemilihan foto dan cetak di luar hitungan itu.' },
  { q: 'Bisa batal atau pindah jadwal?', a: 'Pindah jadwal gratis kalau diberitahu minimal 12 jam sebelumnya. Pembatalan mendadak, DP hangus.' },
];

export default function SelfPhotoStudioPage() {
  return (
    <>
      {/* ------------------------------- HERO ------------------------------ */}
      <section className="sweep-lilac">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:py-24">
          <Reveal>
            <p className="text-[13px] text-[#1A1520]/55">
              <Link href="/" className="hover:text-[#C8203C]">
                Amarayya
              </Link>{' '}
              / Self photo studio
            </p>
            <h1 className="mt-6 max-w-[15ch] font-display text-[clamp(2.5rem,6.5vw,4.5rem)] leading-[0.98]">
              Studionya kamu, <em className="italic text-[#C8203C]">remotenya juga</em>
            </h1>
            <p className="mt-7 max-w-[56ch] text-[15px] leading-relaxed text-[#1A1520]/70">
              Tidak ada fotografer yang mengarahkan gaya. Masuk, atur waktu sendiri, tekan tombolnya sesuka hati.
              Cetak keluar sebelum kamu selesai ganti baju.
            </p>
            <p className="mt-5 text-[13.5px] text-[#1A1520]/55">
              {ALAMAT} · buka {JAM}
            </p>
          </Reveal>
        </div>
      </section>

      {/* ------------------------- WARNA LATAR STUDIO ---------------------- */}
      <section className="bg-[#EFE9E4]">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <SectionHead
            title="Enam gulungan latar"
            body="Ganti latar sesuka kamu selama sesi berjalan. Sebutkan dua warna favorit saat booking supaya sudah terpasang sebelum kamu datang."
          />

          <ul className="mt-12 grid grid-cols-3 gap-4 sm:grid-cols-6">
            {latar.map((w) => (
              <li key={w.nama}>
                <span
                  className="block aspect-[3/4] rounded-[3px] ring-1 ring-inset ring-black/10"
                  style={{ background: w.hex }}
                  aria-hidden
                />
                <span className="mt-2.5 block text-[12.5px] text-[#1A1520]/65">{w.nama}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------------------- ISI RUANGAN -------------------------- */}
      <section className="sweep-lilac">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <SectionHead title="Apa saja yang ada di dalam" />
          <dl className="mt-14 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {isiRuangan.map((f) => (
              <div key={f.t} className="border-t border-[#1A1520]/15 pt-5">
                <dt className="text-[15px] font-semibold">{f.t}</dt>
                <dd className="mt-2 max-w-[38ch] text-[14px] leading-relaxed text-[#1A1520]/70">{f.d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ------------------------------ LANGKAH ---------------------------- */}
      <section className="bg-[#EFE9E4]">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <SectionHead title="Jalannya satu sesi" />
          <div className="mt-14">
            <Steps items={langkah} tone="#DFD8EE" />
          </div>
        </div>
      </section>

      {/* ------------------------------- HARGA ----------------------------- */}
      <section id="harga" className="bg-[#EFE9E4]">
        <div className="mx-auto max-w-6xl px-5 pb-24">
          <SectionHead
            title="Paket per sesi"
            body="Harga per sesi, bukan per orang. Tambah cetak di tempat Rp5.000 per lembar."
          />
          <div className="mt-14">
            <PriceGrid plans={pricing.studio} />
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
        title="Pilih jam, studionya kami tahan"
        sweep="sweep-lilac"
        pesan="Halo Amarayya, saya mau booking self photo studio."
      />
    </>
  );
}