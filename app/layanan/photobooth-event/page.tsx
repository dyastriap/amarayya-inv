import type { Metadata } from 'next';
import Link from 'next/link';
import { pricing } from '@/lib/site';
import { CtaBand, Faq, PriceGrid, Reveal, SectionHead, Steps } from '@/components/ui';

export const metadata: Metadata = {
  title: 'Photobooth event',
  description:
    'Photobooth untuk resepsi, ulang tahun, dan acara kantor di Jabodetabek. Booth, printer, properti, dan operator kami bawa ke lokasi.',
};

const langkah = [
  { t: 'Kunci tanggal', d: 'Sebutkan tanggal, jam, dan alamat acara. DP 30% mengunci tim dan alat untuk hari itu.' },
  { t: 'Setujui desain frame', d: 'Kami kirim dua draf frame sesuai tema acara. Revisi sampai kamu cocok, paling lambat H-3.' },
  { t: 'Tim datang', d: 'Kami tiba satu jam sebelum acara, pasang booth, dan mulai tepat saat tamu masuk.' },
];

const bawaan = [
  { t: 'Booth & kamera', d: 'Kamera mirrorless, lampu kontinu, dan layar sentuh untuk tamu memilih gaya.' },
  { t: 'Printer di lokasi', d: 'Cetak keluar 12 detik setelah foto diambil, tanpa batas jumlah selama jam sewa.' },
  { t: 'Backdrop & properti', d: 'Backdrop setinggi 2,4 meter plus keranjang properti yang kami samakan dengan tema acara.' },
  { t: 'Frame custom', d: 'Nama, tanggal, dan warna acara tercetak di setiap lembar. Desain kami siapkan sebelum hari-H.' },
  { t: 'Operator', d: 'Satu sampai dua orang menjaga booth, mengarahkan antrean, dan mengganti kertas.' },
  { t: 'Galeri online', d: 'Semua hasil naik ke satu tautan yang bisa tamu unduh sendiri, maksimal H+2.' },
];

const acara = ['Resepsi pernikahan', 'Ulang tahun', 'Gathering kantor', 'Wisuda', 'Peluncuran produk', 'Reuni sekolah'];

const faq = [
  { q: 'Butuh ruang seberapa luas?', a: 'Sekitar 3×2 meter dan satu stop kontak. Kalau area terbatas, beri tahu supaya kami bawa booth versi ramping.' },
  { q: 'Di luar Jabodetabek bisa?', a: 'Bisa. Ada biaya transportasi yang kami hitung sesuai jarak dan kami sebutkan di penawaran awal, bukan di akhir.' },
  { q: 'Kalau acara molor?', a: 'Jam sewa dihitung dari waktu mulai yang disepakati. Perpanjangan di tempat Rp400.000 per jam kalau jadwal kami kosong.' },
  { q: 'Berapa lama pemasangan?', a: 'Satu jam. Kami minta akses ke lokasi minimal 60 menit sebelum tamu masuk.' },
  { q: 'Kapan pelunasan?', a: 'DP 30% saat booking, sisanya paling lambat di hari acara sebelum booth dibongkar.' },
];

export default function PhotoboothEventPage() {
  return (
    <>
      {/* ------------------------------- HERO ------------------------------ */}
      <section className="sweep-mint">
        <div className="mx-auto max-w-6xl px-5 py-20 lg:py-24">
          <Reveal>
            <p className="text-[13px] text-[#1A1520]/55">
              <Link href="/" className="hover:text-[#C8203C]">
                Amarayya
              </Link>{' '}
              / Photobooth event
            </p>
            <h1 className="mt-6 max-w-[16ch] font-display text-[clamp(2.5rem,6.5vw,4.5rem)] leading-[0.98]">
              Booth-nya kami bawa, <em className="italic text-[#C8203C]">tamu tinggal antre</em>
            </h1>
            <p className="mt-7 max-w-[56ch] text-[15px] leading-relaxed text-[#1A1520]/70">
              Kamera, printer, backdrop, properti, dan operator datang satu paket ke lokasi acara kamu. Tamu pulang
              bawa cetakan bernama dan bertanggal, kamu pulang bawa galeri lengkapnya.
            </p>

            <ul className="mt-9 flex flex-wrap gap-2">
              {acara.map((a) => (
                <li
                  key={a}
                  className="rounded-full border border-[#1A1520]/20 px-3.5 py-1.5 text-[12.5px] text-[#1A1520]/70"
                >
                  {a}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* ------------------------- APA YANG KAMI BAWA ---------------------- */}
      <section className="bg-[#1A1520] text-[#EFE9E4]">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <Reveal className="max-w-[46ch]">
            <h2 className="font-display text-[clamp(2rem,4.5vw,3.25rem)] leading-[1.05]">Yang datang ke lokasi</h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[#EFE9E4]/65">
              Kamu tidak perlu menyiapkan apa pun selain ruang 3×2 meter dan satu stop kontak.
            </p>
          </Reveal>

          <dl className="mt-14 grid gap-x-10 gap-y-9 sm:grid-cols-2 lg:grid-cols-3">
            {bawaan.map((f) => (
              <div key={f.t} className="border-t border-white/15 pt-5">
                <dt className="text-[15px] font-semibold">{f.t}</dt>
                <dd className="mt-2 max-w-[38ch] text-[14px] leading-relaxed text-[#EFE9E4]/65">{f.d}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ------------------------------ LANGKAH ---------------------------- */}
      <section className="sweep-mint">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <SectionHead title="Dari booking sampai bongkar booth" />
          <div className="mt-14">
            <Steps items={langkah} tone="#D6E3DC" />
          </div>
        </div>
      </section>

      {/* ------------------------------- HARGA ----------------------------- */}
      <section id="harga" className="bg-[#EFE9E4]">
        <div className="mx-auto max-w-6xl px-5 py-24">
          <SectionHead
            title="Paket sewa"
            body="Dihitung per jam sewa, bukan per lembar cetak. Biaya transportasi di luar Jabodetabek kami sebutkan di penawaran awal."
          />
          <div className="mt-14">
            <PriceGrid plans={pricing.photobooth} />
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
        title="Tanggal acaranya kapan?"
        sweep="sweep-mint"
        pesan="Halo Amarayya, saya mau sewa photobooth untuk acara."
      />
    </>
  );
}