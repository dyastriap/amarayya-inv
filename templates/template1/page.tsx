'use client';

import React, { useState, useEffect } from 'react';

interface TemplateProps {
  data: {
    clientName: string;
    weddingDate: string;
    // Kamu bisa menambahkan data spesifik lain dari database ke sini nantinya
  };
}

export default function Template1({ data }: TemplateProps) {
  // State untuk mengontrol apakah undangan sudah dibuka oleh tamu atau belum
  const [isOpen, setIsOpen] = useState(false);
  
  // State untuk hitung mundur (Countdown)
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  // Simulasi Target Waktu Pernikahan (Bisa diganti dinamis nanti)
  useEffect(() => {
    const targetDate = new Date('December 17, 2026 09:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const difference = targetDate - now;

      if (difference < 0) {
        clearInterval(interval);
      } else {
        const d = Math.floor(difference / (1000 * 60 * 60 * 24));
        const h = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const s = Math.floor((difference % (1000 * 60)) / 1000);
        setTimeLeft({ days: d, hours: h, minutes: m, seconds: s });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // --- HALAMAN SAMPUL / COVER (Sebelum dibuka) ---
  if (!isOpen) {
    return (
      <div className="fixed inset-0 z-50 bg-amber-950 text-amber-100 flex flex-col items-center justify-between p-8 text-center bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-900 via-amber-950 to-stone-950">
        {/* Ornamen Atas */}
        <div className="text-amber-500 opacity-60 text-xl tracking-widest mt-4">⚜️ ⚜️ ⚜️</div>

        <div className="space-y-4 max-w-md">
          <p className="text-sm tracking-widest uppercase text-amber-400 font-medium">Walimatul 'Ursy</p>
          <h1 className="text-4xl md:text-5xl font-serif font-bold my-4 text-amber-300 drop-shadow-md">
            {data.clientName}
          </h1>
          <p className="text-sm text-stone-300">Kepada Yth. Bapak/Ibu/Saudara/i</p>
          <div className="bg-amber-900/40 border border-amber-500/30 backdrop-blur-sm px-6 py-4 rounded-xl my-4">
            <span className="font-semibold text-lg text-white">Tamu Undangan</span>
          </div>
          <p className="text-xs text-stone-400 italic">*Mohon maaf apabila ada kesalahan penulisan nama/gelar</p>
        </div>

        {/* Tombol Buka Undangan */}
        <button
          onClick={() => setIsOpen(true)}
          className="mb-8 bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-bold px-8 py-3 rounded-full shadow-lg shadow-amber-900/50 transition transform hover:scale-105 flex items-center gap-2 text-sm uppercase tracking-wider"
        >
          💌 Buka Undangan
        </button>
      </div>
    );
  }

  // --- HALAMAN UTAMA UNDANGAN (Setelah klik buka) ---
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 antialiased font-sans pb-20 selection:bg-amber-200">
      
      {/* 1. HERO SECTION */}
      <section className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 bg-gradient-to-b from-amber-900/10 via-transparent to-stone-50 relative">
        <div className="absolute top-6 text-amber-700 text-2xl">✨</div>
        <p className="tracking-widest text-xs uppercase text-amber-800 font-semibold mb-2">The Wedding of</p>
        <h2 className="text-5xl md:text-7xl font-serif font-bold my-4 text-amber-900">
          {data.clientName}
        </h2>
        <p className="font-serif italic text-stone-600">-{data.weddingDate}-</p>
      </section>

      {/* 2. BAGIAN PENGANTIN */}
      <section className="max-w-2xl mx-auto px-4 py-16 text-center space-y-12">
        <div className="space-y-4">
          <p className="text-sm text-amber-800 font-medium">Assalamu’alaikum Wr. Wb.</p>
          <p className="text-sm text-stone-600 leading-relaxed">
            Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud mengundang Bapak/Ibu/Saudara/i ke acara pernikahan kami:
          </p>
        </div>

        {/* Detail Mempelai */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          <div className="p-6 bg-white rounded-2xl border border-amber-100 shadow-sm">
            <span className="text-3xl">🤵</span>
            <h3 className="font-serif font-bold text-xl text-amber-900 mt-2">Mempelai Pria</h3>
            <p className="text-sm text-stone-500 italic mt-1">Putra dari Bapak Fulan & Ibu Fulanah</p>
          </div>
          <div className="p-6 bg-white rounded-2xl border border-amber-100 shadow-sm">
            <span className="text-3xl">👰</span>
            <h3 className="font-serif font-bold text-xl text-amber-900 mt-2">Mempelai Wanita</h3>
            <p className="text-sm text-stone-500 italic mt-1">Putri dari Bapak Ali & Ibu Aminah</p>
          </div>
        </div>
      </section>

      {/* 3. COUNTDOWN TIMER */}
      <section className="bg-amber-900 text-amber-50 py-12 px-4 text-center my-8 shadow-inner">
        <h3 className="font-serif font-semibold text-lg tracking-wide mb-6">Menuju Hari Bahagia</h3>
        <div className="flex justify-center gap-4 max-w-sm mx-auto">
          <div className="bg-amber-950/50 p-3 rounded-xl min-w-[70px]">
            <span className="block text-2xl font-bold">{timeLeft.days}</span>
            <span className="text-[10px] uppercase text-amber-400">Hari</span>
          </div>
          <div className="bg-amber-950/50 p-3 rounded-xl min-w-[70px]">
            <span className="block text-2xl font-bold">{timeLeft.hours}</span>
            <span className="text-[10px] uppercase text-amber-400">Jam</span>
          </div>
          <div className="bg-amber-950/50 p-3 rounded-xl min-w-[70px]">
            <span className="block text-2xl font-bold">{timeLeft.minutes}</span>
            <span className="text-[10px] uppercase text-amber-400">Menit</span>
          </div>
          <div className="bg-amber-950/50 p-3 rounded-xl min-w-[70px]">
            <span className="block text-2xl font-bold">{timeLeft.seconds}</span>
            <span className="text-[10px] uppercase text-amber-400">Detik</span>
          </div>
        </div>
      </section>

      {/* 4. ACARA & LOKASI */}
      <section className="max-w-2xl mx-auto px-4 py-12 space-y-8 text-center">
        <h2 className="text-3xl font-serif font-bold text-amber-900">Rangkaian Acara</h2>
        
        <div className="bg-white border border-amber-100 rounded-3xl p-8 shadow-sm space-y-6">
          <div>
            <h4 className="font-serif font-bold text-lg text-amber-800">💍 Akad Nikah</h4>
            <p className="text-sm text-stone-600 mt-1">Pukul 08.00 - 10.00 WIB</p>
          </div>
          <hr className="border-amber-100" />
          <div>
            <h4 className="font-serif font-bold text-lg text-amber-800">🎉 Resepsi</h4>
            <p className="text-sm text-stone-600 mt-1">Pukul 11.00 - selesai</p>
          </div>
          <hr className="border-amber-100" />
          <div className="space-y-2">
            <p className="text-sm font-semibold text-stone-700">📍 Lokasi Gedung</p>
            <p className="text-xs text-stone-500">Gedung Pernikahan Agung Bahagia, Jl. Raya No. 123, Kota Bogor</p>
            
            {/* Embed Google Maps Dummy / Tombol Navigasi */}
            <div className="pt-4">
              <a 
                href="https://maps.google.com" 
                target="_blank" 
                className="inline-block bg-amber-800 hover:bg-amber-900 text-white text-xs font-medium px-6 py-2.5 rounded-xl shadow transition"
              >
                🗺️ Buka Google Maps
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FORM RSVP & BUKU TAMU */}
      <section className="max-w-2xl mx-auto px-4 py-12">
        <div className="bg-stone-100 border border-stone-200 rounded-3xl p-8 shadow-inner">
          <h3 className="text-2xl font-serif font-bold text-center text-amber-900 mb-2">Konfirmasi Kehadiran</h3>
          <p className="text-xs text-stone-500 text-center mb-6">Mohon konfirmasi kehadiran Anda melalui form di bawah ini:</p>
          
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">Nama Lengkap</label>
              <input type="text" placeholder="Contoh: Andi Wijaya" className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-amber-600 bg-white" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">Konfirmasi Kehadiran</label>
              <select className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-amber-600 bg-white">
                <option>Hadir</option>
                <option>Ragu-ragu</option>
                <option>Tidak Dapat Hadir</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-stone-600 mb-1">Ucapan & Doa Restu</label>
              <textarea rows={3} placeholder="Tulis ucapan selamat..." className="w-full px-4 py-2.5 rounded-xl border border-stone-300 text-sm focus:outline-amber-600 bg-white"></textarea>
            </div>
            <button className="w-full bg-amber-800 hover:bg-amber-900 text-white font-medium py-3 rounded-xl transition text-sm shadow">
              Kirimi Ucapan
            </button>
          </form>
        </div>
      </section>

      {/* 6. AMPLOP DIGITAL (KADO DIGITAL) */}
      <section className="max-w-2xl mx-auto px-4 py-12 text-center space-y-6">
        <h3 className="text-2xl font-serif font-bold text-amber-900">Wedding Gift</h3>
        <p className="text-sm text-stone-600 max-w-sm mx-auto leading-relaxed">
          Bagi Anda yang ingin memberikan tanda kasih, dapat mengirimkannya dompet digital / transfer bank berikut:
        </p>
        
        <div className="bg-white border border-amber-100 rounded-3xl p-6 shadow-sm max-w-xs mx-auto space-y-2">
          <p className="text-xs font-bold uppercase tracking-wider text-stone-400">BANK BCA</p>
          <p className="text-lg font-mono font-bold text-amber-900">1234567890</p>
          <p className="text-xs text-stone-600 font-medium">a.n. Mempelai Pria</p>
        </div>
      </section>

    </div>
  );
}