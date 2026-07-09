'use client';

import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  const templates = [
    {
      id: 'template1',
      name: 'Template 1 (Javanese Royal Modern)',
      desc: 'Sentuhan sakral adat Jawa berpadu harmoni dengan kemewahan aksen emas dan latar maroon yang agung.',
      demoSlug: 'budi-dan-ani',
      badge: 'Terpopuler',
      emoji: '👑',
      accentColor: 'from-amber-600 to-amber-800'
    },
    {
      id: 'template2',
      name: 'Template 2 (Modern Minimalist)',
      desc: 'Estetika bersih dengan permainan tipografi romantis, transisi anggun, dan fokus pada momen berharga Anda.',
      demoSlug: 'clara-dan-david',
      badge: 'Terbaru',
      emoji: '✨',
      accentColor: 'from-rose-700 to-red-900'
    }
  ];

  return (
    <div className="min-h-screen bg-white text-slate-800 antialiased font-sans selection:bg-rose-900 selection:text-white overflow-x-hidden">
      
      {/* 1. GLASSMORPHISM NAVBAR (Satu Momen Style) */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-white/90 border-b border-stone-200/60 shadow-sm shadow-stone-100/40">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="text-2xl font-black text-rose-950 tracking-tight group cursor-pointer">
            <span className="bg-gradient-to-r from-rose-900 to-red-700 bg-clip-text text-transparent transition-all duration-300 group-hover:from-red-700 group-hover:to-rose-900">
              Amarayya
            </span>
            <span className="text-slate-400 font-light text-xl">.inv</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-8 text-sm font-semibold text-stone-600">
            <a href="#fitur" className="hover:text-rose-900 transition-colors">Products</a>
            <a href="#fitur" className="hover:text-rose-900 transition-colors">Solutions</a>
            <a href="#katalog" className="hover:text-rose-900 transition-colors">Katalog</a>
            <a href="#harga" className="hover:text-rose-900 transition-colors">Harga</a>
          </nav>
          
          <div className="flex items-center space-x-4">
            <a href="#" className="text-sm font-semibold text-stone-600 hover:text-rose-900 transition-colors">Log In</a>
            <a 
              href="https://wa.me/6123456789"
              target="_blank" 
              className="bg-rose-900 hover:bg-rose-950 text-white text-xs font-bold px-6 py-3 rounded-full shadow-md shadow-rose-900/20 transition-all duration-300 hover:-translate-y-0.5"
            >
              Daftar Gratis
            </a>
          </div>
        </div>
      </header>

      {/* =======================================================
          2. NEW HERO SECTION (REPLIKA INTERAKTIF SATU MOMEN)
          ======================================================= */}
      <section className="relative bg-gradient-to-br from-rose-950 via-rose-900 to-red-950 text-white py-16 md:py-24 px-6 overflow-hidden">
        
        {/* Ornamen Kilau Latar Belakang */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent pointer-events-none" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
          
          {/* KOLOM KIRI: TEKS & CTA */}
          <div className="lg:col-span-7 space-y-6 text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-black tracking-tight leading-[1.15] text-white">
              Buat Undangan Online <br />
              Digital Website Untuk <br />
              <span className="text-amber-400 font-sans font-extrabold">Pernikahanmu</span>
            </h1>
            
            <p className="text-sm md:text-base text-stone-200/90 max-w-xl leading-relaxed font-medium">
              Buat undangan online digital website custom dengan Amarayya, meski kamu gaptek tetap bisa bikin undangan website sendiri dari smart phone. Cukup pilih tema, edit detail acara, upload foto, semua bisa selesai dalam hitungan menit.
            </p>
            
            <div className="pt-4">
              <a 
                href="#katalog" 
                className="inline-flex items-center bg-stone-900 hover:bg-stone-950 text-white font-bold text-sm px-8 py-4 rounded-xl border border-stone-800 shadow-xl shadow-black/20 transition-all duration-300 hover:scale-[1.02] gap-3 group"
              >
                <span>Daftar & Coba Gratis</span>
                <span className="bg-white/10 w-6 h-6 rounded-full flex items-center justify-center group-hover:translate-x-1 transition-transform">→</span>
              </a>
            </div>
          </div>

          {/* KOLOM KANAN: FLOATING MOCKUP SMARTPHONE (INTERAKTIF & PREMIUM) */}
          <div className="lg:col-span-5 flex justify-center items-center relative h-[500px] md:h-[550px] w-full">
            
            {/* 1. KARTU FLOATING: UCAPAN TAMU (DONI IRZA) */}
            <div className="absolute top-8 left-0 md:left-[-40px] z-20 bg-white text-stone-800 p-4 rounded-2xl shadow-2xl max-w-[210px] text-left border border-stone-100 animate-[float_5s_ease-in-out_infinite]">
              <p className="text-xs font-bold text-stone-900">Doni Irza</p>
              <p className="text-[11px] text-stone-500 mt-1 leading-relaxed font-medium">
                Semoga Ananda menjadi keluarga yg Sakinah Mawadah dan Warohma, Aamiin YRA 🤲✨
              </p>
            </div>

            {/* 2. BARCODE DIGITAL */}
            <div className="absolute bottom-16 left-6 md:left-2 z-20 bg-white p-3 rounded-xl shadow-2xl border border-stone-100 animate-[float_6s_ease-in-out_infinite_1s]">
              <div className="w-14 h-14 bg-gradient-to-br from-stone-800 to-stone-950 rounded flex items-center justify-center text-white text-2xl font-mono shadow-inner">
                🔳
              </div>
            </div>

            {/* 3. CENTERPIECE: SMARTPHONE MOCKUP (MAROON THEME) */}
            <div className="relative w-[240px] h-[480px] bg-stone-900 rounded-[40px] p-3 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] border-4 border-stone-800 z-10 overflow-hidden transform hover:scale-[1.01] transition-transform duration-500">
              {/* Screen Content */}
              <div className="w-full h-full bg-gradient-to-b from-rose-950 to-rose-900 rounded-[32px] overflow-hidden p-4 flex flex-col justify-between text-center relative border border-white/5">
                
                {/* Background Line Art Motif */}
                <div className="absolute inset-0 opacity-10 flex items-center justify-center text-7xl select-none pointer-events-none">⚜️</div>
                
                <div className="space-y-1 mt-6">
                  <p className="text-[9px] uppercase tracking-widest text-amber-300 font-bold">The Wedding of</p>
                  <p className="font-serif text-lg font-bold text-amber-100">Atma & Fahmi</p>
                </div>

                {/* Foto Pengantin Dummy di Tengah Mockup */}
                <div className="w-28 h-28 bg-white/10 border border-white/20 rounded-full mx-auto flex items-center justify-center text-4xl shadow-inner my-auto">
                  👩‍❤️‍👨
                </div>

                <div className="space-y-3 mb-4 z-10">
                  <div className="text-[9px] text-stone-300 font-medium">
                    Kepada Yth. <br />
                    Bapak/Ibu/Saudara/i
                  </div>
                  <div className="text-xs font-bold text-white bg-black/20 py-1.5 px-3 rounded-lg border border-white/5 inline-block min-w-[120px]">
                    Nama Tamu
                  </div>
                  <div>
                    <button className="bg-amber-400 text-stone-900 text-[10px] font-black uppercase tracking-wider px-4 py-2 rounded-full shadow-md">
                      Open Invitation
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* 4. KARTU FLOATING: STATISTIK KEHADIRAN (180 HADIR) */}
            <div className="absolute top-24 right-0 md:right-[-20px] z-20 flex gap-2 animate-[float_5.5s_ease-in-out_infinite_0.5s]">
              <div className="bg-amber-400 text-stone-950 p-2.5 rounded-xl text-center min-w-[55px] shadow-xl border border-amber-300">
                <span className="block text-sm font-black">180</span>
                <span className="text-[8px] font-bold uppercase tracking-wider block opacity-80">Hadir</span>
              </div>
              <div className="bg-rose-500 text-white p-2.5 rounded-xl text-center min-w-[55px] shadow-xl border border-rose-400">
                <span className="block text-sm font-black">26</span>
                <span className="text-[8px] font-bold uppercase tracking-wider block opacity-80">Absen</span>
              </div>
            </div>

            {/* 5. KARTU FLOATING: UCAPAN TAMU (EVITA) */}
            <div className="absolute bottom-10 right-0 md:right-[-50px] z-20 bg-white text-stone-800 p-4 rounded-2xl shadow-2xl max-w-[190px] text-left border border-stone-100 animate-[float_7s_ease-in-out_infinite_1.5s]">
              <p className="text-xs font-bold text-stone-900">Evita</p>
              <p className="text-[11px] text-stone-500 mt-1 leading-relaxed font-medium">
                Selamat menempuh hidup baru bro, semoga menjadi keluarga yg sakinah, mawaddah, warohmah, amiin
              </p>
            </div>

          </div>
        </div>
      </section>
      {/* =======================================================
          2.5 SECTION DETAIL EDUKASI (ZIG-ZAG STYLE)
          ======================================================= */}
      <section className="bg-white py-20 px-6 border-b border-stone-100">
        <div className="max-w-6xl mx-auto space-y-28">
          
          {/* BARIS 1: GAMBAR KIRI - TEKS KANAN */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Ilustrasi Mockup Kiri */}
            <div className="lg:col-span-6 flex justify-center relative min-h-[300px] w-full group">
              {/* Desktop Browser Dummy */}
              <div className="w-[70%] h-[200px] bg-slate-50 border border-stone-200 rounded-xl p-3 shadow-md absolute left-4 top-4 transform group-hover:-translate-x-1 group-hover:-translate-y-1 transition-transform duration-500">
                <div className="flex gap-1.5 mb-3">
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-900/40 block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-900/30 block"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-rose-900/20 block"></span>
                </div>
                <div className="space-y-2">
                  <div className="h-4 bg-stone-200/60 rounded w-1/3"></div>
                  <div className="grid grid-cols-3 gap-2 pt-2">
                    <div className="h-16 bg-stone-200/40 rounded"></div>
                    <div className="h-16 bg-stone-200/40 rounded"></div>
                    <div className="h-16 bg-stone-200/40 rounded"></div>
                  </div>
                </div>
              </div>
              
              {/* Smartphone Dummy Tumpang Tindih */}
              <div className="w-[40%] h-[240px] bg-stone-900 border-4 border-stone-800 rounded-[24px] p-2 shadow-2xl absolute right-12 bottom-0 transform group-hover:scale-[1.03] transition-transform duration-500 overflow-hidden flex flex-col justify-between">
                <div className="w-full h-full bg-gradient-to-b from-rose-950 to-rose-900 rounded-[18px] p-2 flex flex-col justify-between">
                  <div className="space-y-1">
                    <div className="h-2 bg-white/20 rounded w-1/2 mx-auto"></div>
                    <div className="h-2 bg-white/10 rounded w-2/3 mx-auto"></div>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/10 mx-auto"></div>
                  <div className="h-3 bg-amber-400 rounded-md w-3/4 mx-auto"></div>
                </div>
              </div>

              {/* Tag URL amarrayya.inv */}
              <div className="absolute left-10 bottom-4 bg-white border border-stone-200 px-4 py-2 rounded-xl shadow-lg font-bold text-xs tracking-wide text-rose-900 animate-pulse">
                amarrayya.inv
              </div>
            </div>

            {/* Teks Kanan */}
            <div className="lg:col-span-6 text-left space-y-4">
              <h2 className="text-3xl md:text-4xl font-serif font-black text-rose-950 leading-tight">
                Buat Undangan Online <br />
                Digital Website 10 Menit <br />
                Cukup Pake HP Aja
              </h2>
              <p className="text-sm md:text-base text-stone-500 leading-relaxed font-medium">
                Buat undangan website praktis dan nyaman. Tanpa harus didepan laptop berjam-jam. Cukup pilih tema, edit detail acara, upload foto, semua bisa selesai dalam hitungan menit.
              </p>
            </div>
          </div>

          {/* BARIS 2: TEKS KIRI - GAMBAR KANAN */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center pt-8">
            {/* Teks Kiri */}
            <div className="lg:col-span-6 text-left space-y-4 order-2 lg:order-1">
              <h2 className="text-3xl md:text-4xl font-serif font-black text-rose-950 leading-tight">
                Kirim Undangan Ke Semua <br />
                Tamu Dalam Sekali Klik
              </h2>
              <p className="text-sm md:text-base text-stone-500 leading-relaxed font-medium">
                Amarayya dilengkapi fitur WhatsApp broadcast yang memudahkan kamu mengirim undangan digital ke semua tamu hanya dalam sekilas klik saja. Dapatkan harga promo undangan digital terbaik sekarang juga!
              </p>
            </div>

            {/* Ilustrasi Mockup Kanan (WhatsApp Theme) */}
            <div className="lg:col-span-6 flex justify-center relative min-h-[300px] w-full order-1 lg:order-2 group">
              {/* WhatsApp Notification Bubble */}
              <div className="absolute top-0 left-6 md:left-12 z-20 bg-white/95 border border-stone-100 p-3.5 rounded-2xl shadow-xl max-w-[210px] text-left backdrop-blur-sm transform group-hover:-translate-y-1 transition-transform duration-500">
                <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 font-bold">
                  <span>💬</span> Terkirim <span className="text-stone-400 font-normal">08.35</span>
                </div>
                <p className="text-[11px] font-bold text-stone-900 mt-1">Kepada Yth;</p>
                <p className="text-[11px] font-black text-rose-900">Aldi & Lina</p>
                <p className="text-[10px] text-stone-400 mt-1 truncate">Kami mengundang Anda untuk menghadiri...</p>
              </div>

              {/* Phone Mockup WA */}
              <div className="w-[45%] h-[240px] bg-stone-900 border-4 border-stone-800 rounded-[28px] p-2 shadow-2xl transform group-hover:rotate-1 transition-transform duration-500 overflow-hidden flex flex-col justify-between my-auto">
                <div className="w-full h-full bg-stone-100 rounded-[20px] relative overflow-hidden flex flex-col">
                  {/* WA Header Green */}
                  <div className="bg-emerald-800 h-6 w-full flex items-center px-2">
                    <div className="w-2 h-2 bg-white/40 rounded-full"></div>
                  </div>
                  {/* Chat Content Body */}
                  <div className="flex-1 p-2 space-y-2 bg-stone-50">
                    <div className="bg-emerald-100 p-2 rounded-lg text-[9px] w-3/4 shadow-sm border border-emerald-200/40 text-left">
                      Halo! Kami mengundang Anda...
                    </div>
                  </div>
                </div>
              </div>

              {/* WhatsApp Label Floating */}
              <div className="absolute right-4 md:right-10 top-16 bg-white/90 border border-stone-200 px-5 py-2.5 rounded-xl shadow-xl font-bold text-xs text-emerald-600 tracking-wide backdrop-blur-sm transform group-hover:translate-x-1 transition-transform duration-500">
                WhatsApp
              </div>

              {/* Tangan / Aksen dekorasi di bawah */}
              <div className="absolute -bottom-6 w-24 h-24 bg-gradient-to-tr from-rose-900/10 to-transparent blur-xl pointer-events-none" />
            </div>
          </div>

        </div>
      </section>

      {/* 3. PREMIUM FEATURES WITH HOVER EFFECTS */}
      <section id="fitur" className="bg-white py-24 border-y border-stone-200/50 shadow-inner">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 tracking-tight">Fitur Eksklusif Pilihan</h2>
            <p className="text-stone-500 mt-3 text-sm md:text-base">Seluruh detail kemudahan interaksi disiapkan matang demi kenyamanan para tamu kehormatan.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="p-8 bg-stone-50/50 rounded-3xl border border-stone-200/60 hover:bg-white hover:border-rose-900/30 transition-all duration-500 group hover:shadow-2xl hover:shadow-rose-950/5 hover:-translate-y-1.5">
              <div className="w-14 h-14 bg-rose-50 text-rose-900 flex items-center justify-center rounded-2xl font-bold text-2xl mb-6 shadow-sm group-hover:bg-rose-900 group-hover:text-white transition-all duration-500 group-hover:rotate-6">🎵</div>
              <h3 className="font-serif font-bold text-xl text-stone-900">Cinematic Symphony</h3>
              <p className="text-stone-600 text-sm mt-3 leading-relaxed">Alunan simfoni melodi romantis mengalun secara anggun mengiringi langkah para tamu menelusuri lembar undangan.</p>
            </div>
            <div className="p-8 bg-stone-50/50 rounded-3xl border border-stone-200/60 hover:bg-white hover:border-rose-900/30 transition-all duration-500 group hover:shadow-2xl hover:shadow-rose-950/5 hover:-translate-y-1.5">
              <div className="w-14 h-14 bg-rose-50 text-rose-900 flex items-center justify-center rounded-2xl font-bold text-2xl mb-6 shadow-sm group-hover:bg-rose-900 group-hover:text-white transition-all duration-500 group-hover:rotate-6">📝</div>
              <h3 className="font-serif font-bold text-xl text-stone-900">Real-Time RSVP</h3>
              <p className="text-stone-600 text-sm mt-3 leading-relaxed">Sistem pencatatan kehadiran otomatis serta doa restu terintegrasi, aman, dan dapat dipantau setiap detik.</p>
            </div>
            <div className="p-8 bg-stone-50/50 rounded-3xl border border-stone-200/60 hover:bg-white hover:border-rose-900/30 transition-all duration-500 group hover:shadow-2xl hover:shadow-rose-950/5 hover:-translate-y-1.5">
              <div className="w-14 h-14 bg-rose-50 text-rose-900 flex items-center justify-center rounded-2xl font-bold text-2xl mb-6 shadow-sm group-hover:bg-rose-900 group-hover:text-white transition-all duration-500 group-hover:rotate-6">📍</div>
              <h3 className="font-serif font-bold text-xl text-stone-900">Live Navigation</h3>
              <p className="text-stone-600 text-sm mt-3 leading-relaxed">Peta digital presisi tinggi yang menuntun sanak saudara menuju lokasi pelaminan dengan akurat dan mudah.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE CATALOGUE SECTION */}
      <section id="katalog" className="max-w-6xl mx-auto px-6 py-24">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-stone-900 tracking-tight">Katalog Karya Agung</h2>
          <p className="text-stone-500 mt-3 text-sm md:text-base">Rasakan langsung kemewahan alur interaksi animasi dengan meninjau demo di bawah ini.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-16">
          {templates.map((template) => (
            <div key={template.id} className="bg-white border border-stone-200 rounded-[32px] overflow-hidden hover:border-rose-900/20 transition-all duration-500 flex flex-col justify-between group hover:shadow-2xl hover:shadow-rose-950/5">
              <div className="bg-gradient-to-b from-stone-100 to-stone-50 h-64 flex items-center justify-center border-b border-stone-200/60 relative overflow-hidden">
                <span className="absolute top-5 left-5 bg-white text-rose-900 border border-rose-100/80 font-bold text-[10px] px-3 py-1.5 rounded-full tracking-wider uppercase shadow-sm">
                  {template.badge}
                </span>
                <div className={`w-16 h-16 rounded-3xl bg-gradient-to-br ${template.accentColor} flex items-center justify-center text-3xl shadow-xl shadow-amber-900/25 transform group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                  {template.emoji}
                </div>
              </div>
              <div className="p-8">
                <h3 className="font-serif font-bold text-2xl text-stone-900 tracking-tight">{template.name}</h3>
                <p className="text-stone-600 text-sm mt-3 leading-relaxed font-medium">{template.desc}</p>
                <div className="mt-8 pt-6 border-t border-stone-100">
                  <Link 
                    href={`/inv/${template.demoSlug}`} 
                    target="_blank"
                    className="w-full inline-flex items-center justify-center bg-stone-900 hover:bg-rose-900 text-white font-bold text-sm py-4 px-5 rounded-2xl text-center transition-all duration-300 gap-2 group/btn shadow-md hover:shadow-xl hover:shadow-rose-900/20"
                  >
                    <span>👁️</span> Live Preview Demo 
                    <span className="transform group-hover/btn:translate-x-1.5 transition-transform duration-300">→</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 5. 3-TIER LUXURY PRICING SECTION */}
      <section id="harga" className="bg-stone-900 text-white py-24 border-t border-stone-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-rose-950/40 via-transparent to-transparent pointer-events-none" />
        <div className="max-w-6xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-white tracking-tight">Investasi Sekali, Kenangan Abadi</h2>
          <p className="text-stone-400 mt-3 text-sm md:text-base">Miliki kebebasan penuh mengatur rancangan hari istimewa Anda lewat pilihan paket esensial kami.</p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-5xl mx-auto items-stretch">
            {/* Paket Hemat */}
            <div className="bg-stone-950/60 border border-stone-800 rounded-[32px] p-8 shadow-xl flex flex-col justify-between hover:border-stone-700 transition-all duration-300 hover:scale-[1.01]">
              <div>
                <h3 className="font-bold text-xs uppercase tracking-widest text-stone-400">Paket Hemat</h3>
                <div className="mt-5 flex items-baseline justify-center">
                  <span className="text-4xl font-black text-white">Rp49.000</span>
                </div>
                <p className="text-[11px] text-stone-500 mt-2 font-medium">Masa Aktif 3 Bulan Kontrak</p>
                <ul className="mt-8 space-y-4 text-left text-xs md:text-sm text-stone-400 border-t border-stone-800 pt-6">
                  <li className="flex items-center gap-3"><span className="text-amber-600 text-base font-bold">✓</span> Pilihan Template Standard</li>
                  <li className="flex items-center gap-3"><span className="text-amber-600 text-base font-bold">✓</span> Fitur Informasi Acara Utama</li>
                  <li className="flex items-center gap-3"><span className="text-amber-600 text-base font-bold">✓</span> Integrasi Google Maps Presisi</li>
                  <li className="flex items-center gap-3"><span className="text-amber-600 text-base font-bold">✓</span> Protokol Kesehatan Elegan</li>
                  <li className="flex items-center gap-3 text-stone-700 line-through"><span className="text-stone-700 text-base">✕</span> Background Music Audio</li>
                  <li className="flex items-center gap-3 text-stone-700 line-through"><span className="text-stone-700 text-base">✕</span> Buku Tamu & Dashboard RSVP</li>
                </ul>
              </div>
              <a href="https://wa.me/6123456789" target="_blank" className="mt-8 w-full block bg-stone-800 hover:bg-rose-900 border border-stone-700 hover:border-rose-800 text-white font-bold py-3.5 px-4 rounded-xl text-center transition-all duration-300 text-xs tracking-wider uppercase">Pilih Paket Hemat</a>
            </div>

            {/* Paket Standard */}
            <div className="bg-white text-stone-900 border-2 border-rose-900 rounded-[32px] p-8 shadow-2xl flex flex-col justify-between relative transform md:-translate-y-4 group transition-all duration-300 hover:scale-[1.02]">
              <span className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-rose-900 to-red-700 text-white font-extrabold text-[10px] px-5 py-2 rounded-full uppercase tracking-widest shadow-lg shadow-rose-900/30">Paling Diminati</span>
              <div>
                <h3 className="font-bold text-xs uppercase tracking-widest text-rose-900 mt-2">Paket Standard</h3>
                <div className="mt-5 flex items-baseline justify-center">
                  <span className="text-5xl font-black text-rose-950">Rp79.000</span>
                </div>
                <p className="text-[11px] text-rose-800/70 mt-2 font-semibold">Masa Aktif 6 Bulan Kontrak</p>
                <ul className="mt-8 space-y-4 text-left text-xs md:text-sm text-stone-600 border-t border-stone-100 pt-6">
                  <li className="flex items-center gap-3"><span className="text-rose-900 text-base font-bold">✓</span> Bebas Pilih Semua Template</li>
                  <li className="flex items-center gap-3"><span className="text-rose-900 text-base font-bold">✓</span> Background Music (1 Sound Link)</li>
                  <li className="flex items-center gap-3"><span className="text-rose-900 text-base font-bold">✓</span> Integrasi Google Maps & RSVP System</li>
                  <li className="flex items-center gap-3"><span className="text-rose-900 text-base font-bold">✓</span> Galeri Album Estetik (Maks 5 Foto)</li>
                  <li className="flex items-center gap-3"><span className="text-rose-900 text-base font-bold">✓</span> Kuota Sebar Nama Tamu Otomatis</li>
                  <li className="flex items-center gap-3 text-stone-300 line-through"><span className="text-stone-300 text-base">✕</span> Amplop Digital & Premium Storyline</li>
                </ul>
              </div>
              <a href="https://wa.me/6123456789" target="_blank" className="mt-8 w-full block bg-rose-900 hover:bg-rose-950 text-white font-black py-4 px-4 rounded-xl text-center transition-all duration-300 text-xs tracking-wider uppercase shadow-lg shadow-rose-900/20">Ambil Paket Standard</a>
            </div>

            {/* Paket Premium */}
            <div className="bg-stone-950/60 border border-stone-800 rounded-[32px] p-8 shadow-xl flex flex-col justify-between hover:border-stone-700 transition-all duration-300 hover:scale-[1.01]">
              <div>
                <h3 className="font-bold text-xs uppercase tracking-widest text-stone-400">Paket Premium</h3>
                <div className="mt-5 flex items-baseline justify-center">
                  <span className="text-4xl font-black text-white">Rp99.000</span>
                </div>
                <p className="text-[11px] text-stone-500 mt-2 font-medium">Masa Aktif 1 Tahun Penuh</p>
                <ul className="mt-8 space-y-4 text-left text-xs md:text-sm text-stone-400 border-t border-stone-800 pt-6">
                  <li className="flex items-center gap-3"><span className="text-amber-600 text-base font-bold">✓</span> Seluruh Akses Fitur Paket Standard++</li>
                  <li className="flex items-center gap-3"><span className="text-amber-600 text-base font-bold">✓</span> Unlimited Upload Galeri Foto & Video</li>
                  <li className="flex items-center gap-3"><span className="text-amber-600 text-base font-bold">✓</span> Rangkaian Kisah Asmara (Love Journey)</li>
                  <li className="flex items-center gap-3"><span className="text-amber-600 text-base font-bold">✓</span> Kado Amplop Digital (Instant Transfer Bank)</li>
                  <li className="flex items-center gap-3"><span className="text-amber-600 text-base font-bold">✓</span> Countdown Timer Desain Premium</li>
                  <li className="flex items-center gap-3"><span className="text-amber-600 text-base font-bold">✓</span> Skala Prioritas Penuh Dukungan Admin</li>
                </ul>
              </div>
              <a href="https://wa.me/6123456789" target="_blank" className="mt-8 w-full block bg-stone-800 hover:bg-rose-900 border border-stone-700 hover:border-rose-800 text-white font-bold py-3.5 px-4 rounded-xl text-center transition-all duration-300 text-xs tracking-wider uppercase">Pilih Paket Premium</a>
            </div>
          </div>
        </div>
      </section>

      {/* 6. MINIMALIST FOOTER */}
      <footer className="bg-stone-950 text-stone-500 py-10 border-t border-stone-900 text-xs text-center relative z-10">
        <p>&copy; 2026 Amarayya Invitation. Crafted with elegance, precision, and beauty.</p>
      </footer>

      {/* GLOBAL KEYFRAMES FOR FLOATING CARDS */}
      <style jsx global>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
      `}</style>

    </div>
  );
}