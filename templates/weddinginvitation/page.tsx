'use client';

import React, { useState, useEffect } from 'react';
import { motion, Variants } from 'framer-motion';

// --- INTERFACE KLIEN DARI SLUG ROUTE ---
export interface ClientData {
  clientName: string;
  weddingDate: string;
  templateId: string;
  groomName?: string;
  brideName?: string;
  groomParents?: string;
  brideParents?: string;
  location?: string;
  address?: string;
}

interface TemplateProps {
  data: ClientData;
}

// --- TYPE DEFINITIONS FOR INTERNAL STATE ---
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface RsvpForm {
  name: string;
  phone: string;
  guests: number;
  attendance: string;
}

interface WishForm {
  name: string;
  address: string;
  message: string;
}

// --- FRAMER MOTION VARIANTS ---
const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { 
    opacity: 1, 
    y: 0, 
    transition: { duration: 0.8, ease: 'easeOut' as const } 
  }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

export default function Template1({ data }: TemplateProps) {
  // State Buka Undangan / Cover Screen
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  // State Countdown
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // State Form RSVP & Wishes
  const [rsvp, setRsvp] = useState<RsvpForm>({ name: '', phone: '', guests: 1, attendance: 'attend-0' });
  const [wish, setWish] = useState<WishForm>({ name: '', address: '', message: '' });
  const [wishesList, setWishesList] = useState<WishForm[]>([
    { name: 'Doni Irza', address: 'Jakarta', message: `Selamat untuk ${data.clientName}, semoga menjadi keluarga Sakinah Mawaddah Warahmah! 🤲✨` }
  ]);

  // Target Date Countdown (Parse tanggal dari props data)
  useEffect(() => {
    // Parse tanggal atau default ke 2027 jika tidak valid
    const targetDate = new Date(data.weddingDate).getTime() || new Date('2027-11-27T10:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [data.weddingDate]);

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Terima kasih ${rsvp.name}, konfirmasi kehadiran Anda telah tersimpan.`);
    setRsvp({ name: '', phone: '', guests: 1, attendance: 'attend-0' });
  };

  const handleWishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (wish.name && wish.message) {
      setWishesList([wish, ...wishesList]);
      setWish({ name: '', address: '', message: '' });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert(`Nomor Rekening ${text} berhasil disalin!`);
  };

  return (
    <div className="min-h-screen bg-[#4d0a13] text-white font-sans antialiased overflow-x-hidden selection:bg-amber-500 selection:text-black">
      
      {/* 1. OVERLAY / COVER SCREEN (TAMPILAN AWAL) */}
      {!isOpen && (
        <motion.div 
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -1000 }}
          transition={{ duration: 0.8 }}
          className="fixed inset-0 z-50 flex flex-col justify-between items-center bg-[#641823] px-6 py-12 text-center border-8 border-[#a9954f]/30"
        >
          <div className="space-y-2 mt-8">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-200">The Wedding Of</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-amber-100 tracking-wide">
              {data.clientName}
            </h1>
          </div>

          <div className="my-auto space-y-4 max-w-sm w-full bg-[#4d0a13]/80 p-6 rounded-3xl border border-amber-500/20 backdrop-blur-sm shadow-2xl">
            <p className="text-xs text-stone-300">Kepada Yth. Bapak/Ibu/Saudara/i</p>
            <div className="bg-black/30 py-2.5 px-4 rounded-xl text-amber-300 font-bold text-sm">
              Tamu Undangan
            </div>
            <p className="text-[11px] text-stone-400 italic">
              KAMI MENGUNDANG ANDA UNTUK HADIR DI HARI BAHAGIA KAMI
            </p>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsOpen(true)}
              className="mt-4 w-full bg-[#a9954f] hover:bg-amber-600 text-stone-950 font-bold py-3 px-6 rounded-full text-xs uppercase tracking-wider transition-all duration-300 shadow-lg shadow-amber-900/40"
            >
              ✉️ Buka Undangan
            </motion.button>
          </div>

          <p className="text-[10px] text-amber-200/60">Amarayya Invitation &bull; Javanese Royal Modern</p>
        </motion.div>
      )}

      {/* UTAMA CONTAINER UNDANGAN */}
      <main className={`max-w-md mx-auto bg-[#641823] min-h-screen relative shadow-2xl border-x border-amber-900/30 ${!isOpen ? 'hidden' : 'block'}`}>

        {/* 2. HERO / BRIDE & GROOM SECTION */}
        <section className="relative px-6 py-20 text-center bg-gradient-to-b from-[#4d0a13] to-[#641823] border-b border-amber-500/20 overflow-hidden">
          <motion.div initial="hidden" animate="visible" variants={fadeInUp} className="space-y-4">
            <p className="text-xs uppercase tracking-[0.25em] text-amber-300">We Are Getting Married</p>
            <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-amber-100">
              {data.clientName}
            </h1>
            <p className="text-xs text-stone-300 italic max-w-xs mx-auto pt-2">
              "Dan di antara tanda-tanda kekuasaan-Nya ialah Dia menciptakan untukmu pasangan dari jenismu sendiri..."
            </p>
          </motion.div>
        </section>

        {/* 3. PROFIL MEMPELAI (BRIDE & GROOM DETAIL) */}
        <section className="px-6 py-16 text-center space-y-12">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-10">
            
            {/* Groom */}
            <motion.div variants={fadeInUp} className="space-y-3">
              <div className="w-32 h-32 rounded-full border-2 border-amber-400 p-1 mx-auto shadow-xl overflow-hidden bg-stone-800">
                <img src="https://cdn-proxy.viding.co/DlhjpewrQJSgRPqJ0Za3WigTVykxd5EfUJ9URGHRNzQ/rs:fit::/f:jpg/q:65/aHR0cHM6Ly9jZG4tYnVpbGRlci52aWRpbmcuY28vMjUyMy9Hcm9vbS5qcGc.jpg" alt="Groom" className="w-full h-full object-cover rounded-full" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-amber-200">
                {data.groomName || 'Mempelai Pria'}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Putra dari <br />
                <span className="font-semibold text-white">{data.groomParents || 'Bpk. Lorem & Ibu Ipsum'}</span>
              </p>
            </motion.div>

            <div className="text-2xl font-serif text-amber-400 font-bold">&</div>

            {/* Bride */}
            <motion.div variants={fadeInUp} className="space-y-3">
              <div className="w-32 h-32 rounded-full border-2 border-amber-400 p-1 mx-auto shadow-xl overflow-hidden bg-stone-800">
                <img src="https://cdn-proxy.viding.co/8qB1HXhd5yJZJtjzxt3ZXL5ZIIuf83Kj6jYqGQVWPew/rs:fit::/f:jpg/q:65/aHR0cHM6Ly9jZG4tYnVpbGRlci52aWRpbmcuY28vMjUyMi9Hcm9vbSgxKS5qcGc.jpg" alt="Bride" className="w-full h-full object-cover rounded-full" />
              </div>
              <h3 className="font-serif text-2xl font-bold text-amber-200">
                {data.brideName || 'Mempelai Wanita'}
              </h3>
              <p className="text-xs text-stone-300 leading-relaxed">
                Putri dari <br />
                <span className="font-semibold text-white">{data.brideParents || 'Bpk. Dolor & Ibu Sit Amet'}</span>
              </p>
            </motion.div>

          </motion.div>
        </section>

        {/* 4. COUNTDOWN TIMER */}
        <section className="px-6 py-12 bg-[#4d0a13] text-center border-y border-amber-500/20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="space-y-6">
            <h2 className="font-serif text-2xl font-bold text-amber-200">Save The Date</h2>
            <p className="text-xs font-semibold text-amber-300">{data.weddingDate}</p>
            
            <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
              {[
                { label: 'Hari', value: timeLeft.days },
                { label: 'Jam', value: timeLeft.hours },
                { label: 'Menit', value: timeLeft.minutes },
                { label: 'Detik', value: timeLeft.seconds },
              ].map((item, idx) => (
                <div key={idx} className="bg-[#641823] p-3 rounded-2xl border border-amber-500/30 shadow-md">
                  <span className="block font-serif text-xl font-bold text-amber-300">{item.value}</span>
                  <span className="text-[10px] text-stone-300 uppercase tracking-wider">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 5. ACARA & LOKASI (EVENT & VENUE) */}
        <section className="px-6 py-16 text-center space-y-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="space-y-3">
            <h2 className="font-serif text-3xl font-bold text-amber-200">Acara & Lokasi</h2>
            <p className="text-xs text-stone-300">Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-6">
            <motion.div variants={fadeInUp} className="bg-[#4d0a13] p-6 rounded-3xl border border-amber-500/30 text-left space-y-2 relative overflow-hidden">
              <div className="text-amber-400 font-bold text-sm uppercase tracking-wider">Syukuran Pernikahan</div>
              <p className="text-xs text-stone-300">{data.weddingDate}</p>
              <p className="text-xs font-semibold text-white">09.00 WIB - Selesai</p>
              <div className="pt-2 text-xs text-stone-300">
                <strong>{data.location || 'Lokasi Acara'}</strong><br />
                {data.address || 'Alamat lengkap acara pernikahan.'}
              </div>
            </motion.div>

            <motion.a
              variants={fadeInUp}
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-[#a9954f] hover:bg-amber-600 text-stone-950 font-bold py-3 px-8 rounded-full text-xs uppercase tracking-wider transition-all duration-300 shadow-md"
            >
              📍 Buka Google Maps
            </motion.a>
          </motion.div>
        </section>

        {/* 6. RSVP FORM */}
        <section className="px-6 py-16 bg-[#4d0a13] border-t border-amber-500/20">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="font-serif text-3xl font-bold text-amber-200">Konfirmasi Kehadiran</h2>
              <p className="text-xs text-stone-300">Mohon isi form berikut untuk konfirmasi kehadiran Anda.</p>
            </div>

            <form onSubmit={handleRsvpSubmit} className="space-y-4 max-w-sm mx-auto">
              <div>
                <label className="block text-[11px] text-amber-200 mb-1 text-left">Nama Lengkap</label>
                <input
                  type="text"
                  required
                  value={rsvp.name}
                  onChange={(e) => setRsvp({ ...rsvp, name: e.target.value })}
                  placeholder="Masukkan nama Anda"
                  className="w-full bg-[#641823] border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div>
                <label className="block text-[11px] text-amber-200 mb-1 text-left">Nomor WhatsApp</label>
                <input
                  type="tel"
                  required
                  value={rsvp.phone}
                  onChange={(e) => setRsvp({ ...rsvp, phone: e.target.value })}
                  placeholder="0812xxxx"
                  className="w-full bg-[#641823] border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-amber-200 mb-1 text-left">Jumlah Tamu</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={rsvp.guests}
                    onChange={(e) => setRsvp({ ...rsvp, guests: parseInt(e.target.value) || 1 })}
                    className="w-full bg-[#641823] border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-amber-200 mb-1 text-left">Konfirmasi</label>
                  <select
                    value={rsvp.attendance}
                    onChange={(e) => setRsvp({ ...rsvp, attendance: e.target.value })}
                    className="w-full bg-[#641823] border border-amber-500/30 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="attend-0">Hadir</option>
                    <option value="attend-1">Tidak Hadir</option>
                  </select>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-[#a9954f] hover:bg-amber-600 text-stone-950 font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-colors"
              >
                Kirim Konfirmasi
              </motion.button>
            </form>
          </motion.div>
        </section>

        {/* 7. DIGITAL GIFT / ANGPAO */}
        <section className="px-6 py-16 text-center space-y-6">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="space-y-4">
            <h2 className="font-serif text-3xl font-bold text-amber-200">Hadiah Digital</h2>
            <p className="text-xs text-stone-300 leading-relaxed max-w-xs mx-auto">
              Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika ingin memberikan tanda kasih, Anda dapat menyalurkannya melalui:
            </p>

            <div className="bg-[#4d0a13] p-6 rounded-3xl border border-amber-500/30 max-w-xs mx-auto space-y-4 text-left">
              <div className="flex justify-between items-center">
                <span className="font-black text-lg tracking-widest text-blue-400">BCA</span>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 px-2 py-1 rounded-md">Bank Transfer</span>
              </div>
              <div>
                <p className="text-xs text-stone-400">Nomor Rekening</p>
                <p className="font-mono text-base font-bold text-white tracking-wider">2211987723</p>
                <p className="text-xs text-stone-300">a.n. Mempelai</p>
              </div>
              <button
                onClick={() => copyToClipboard('2211987723')}
                className="w-full bg-[#641823] hover:bg-rose-900 border border-amber-500/40 text-amber-200 text-xs font-bold py-2 rounded-xl transition-colors text-center"
              >
                📋 Salin Nomor Rekening
              </button>
            </div>
          </motion.div>
        </section>

        {/* 8. KARTU UCAPAN & DOA (GREETINGS & WISHES) */}
        <section className="px-6 py-16 bg-[#4d0a13] border-t border-amber-500/20 space-y-8">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="font-serif text-3xl font-bold text-amber-200">Ucapan & Doa</h2>
              <p className="text-xs text-stone-300">Tinggalkan pesan ucapan untuk kedua mempelai.</p>
            </div>

            <form onSubmit={handleWishSubmit} className="space-y-3 max-w-sm mx-auto">
              <input
                type="text"
                required
                value={wish.name}
                onChange={(e) => setWish({ ...wish, name: e.target.value })}
                placeholder="Nama Anda"
                className="w-full bg-[#641823] border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-amber-400"
              />
              <input
                type="text"
                value={wish.address}
                onChange={(e) => setWish({ ...wish, address: e.target.value })}
                placeholder="Kota / Alamat"
                className="w-full bg-[#641823] border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-amber-400"
              />
              <textarea
                required
                rows={3}
                value={wish.message}
                onChange={(e) => setWish({ ...wish, message: e.target.value })}
                placeholder="Tuliskan doa & ucapan Anda..."
                className="w-full bg-[#641823] border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-amber-400"
              />
              <button
                type="submit"
                className="w-full bg-[#a9954f] hover:bg-amber-600 text-stone-950 font-bold py-2.5 rounded-xl text-xs uppercase tracking-wider transition-colors"
              >
                Kirim Ucapan
              </button>
            </form>

            {/* List Ucapan */}
            <div className="space-y-3 max-w-sm mx-auto max-h-60 overflow-y-auto pr-1">
              {wishesList.map((item, idx) => (
                <div key={idx} className="bg-[#641823] p-3.5 rounded-2xl border border-amber-500/20 text-left space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs text-amber-300">{item.name}</span>
                    {item.address && <span className="text-[10px] text-stone-400">{item.address}</span>}
                  </div>
                  <p className="text-xs text-stone-200 leading-relaxed">{item.message}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="px-6 py-10 text-center border-t border-amber-500/20 text-[11px] text-stone-400 space-y-2">
          <p className="font-serif text-amber-200 text-sm font-bold">{data.clientName}</p>
          <p>Terima kasih atas doa & restu Anda.</p>
          <p className="text-[9px] opacity-60">Crafted with ❤️ by Amarayya Invitation</p>
        </footer>

      </main>
    </div>
  );
}