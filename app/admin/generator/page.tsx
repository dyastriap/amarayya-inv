'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function LinkGeneratorPage() {
  const [baseUrl, setBaseUrl] = useState<string>('https://amarayya.com');
  const [guestNames, setGuestNames] = useState<string>('');
  const [generatedList, setGeneratedList] = useState<{ name: string; link: string }[]>([]);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Fungsi untuk memproses daftar nama menjadi link
  const handleGenerate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestNames.trim()) return;

    // Pisahkan nama berdasarkan baris baru (Enter)
    const namesArray = guestNames.split('\n').map((name) => name.trim()).filter((name) => name.length > 0);

    const results = namesArray.map((name) => {
      // Format URL dengan parameter ?to=Nama+Tamu
      const formattedNameForUrl = encodeURIComponent(name);
      const link = `${baseUrl.trim().replace(/\/$/, '')}/?to=${formattedNameForUrl}`;
      return { name, link };
    });

    setGeneratedList(results);
  };

  // Fungsi untuk menyalin link ke clipboard
  const handleCopy = (link: string, index: number) => {
    navigator.clipboard.writeText(link);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000); // Reset status "Disalin!" setelah 2 detik
  };

  // Fungsi untuk membuat format pesan WhatsApp siap kirim
  const handleWhatsAppShare = (name: string, link: string) => {
    const message = `Halo ${name},\n\nTanpa mengurangi rasa hormat, kami mengundang Bapak/Ibu/Saudara/i untuk menghadiri acara pernikahan kami.\n\nBerikut link undangan digital kami:\n${link}\n\nMerupakan suatu kehormatan dan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.\n\nTerima kasih banyak.\n\nSalam,\n[Nama Mempelai]`;
    const waUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(waUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-[#4d0a13] text-white font-sans antialiased p-6 md:p-12">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="font-serif text-3xl font-bold text-amber-200">Generator Link Tamu Undangan</h1>
          <p className="text-xs text-stone-300">Buat ratusan link undangan personal dalam hitungan detik.</p>
        </div>

        {/* Form Input */}
        <form onSubmit={handleGenerate} className="bg-[#3f070e]/80 backdrop-blur-md p-6 rounded-3xl border border-amber-500/30 shadow-2xl space-y-5">
          
          <div>
            <label className="block text-xs font-semibold text-amber-200 mb-1">Domain / URL Dasar Website Undangan</label>
            <input 
              type="text" 
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://amarayya.com"
              className="w-full bg-[#641823]/90 border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-amber-400"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-amber-200 mb-1">
              Daftar Nama Tamu <span className="text-[10px] text-stone-300 font-normal">(1 nama per baris / tekan Enter untuk nama berikutnya)</span>
            </label>
            <textarea 
              rows={6}
              value={guestNames}
              onChange={(e) => setGuestNames(e.target.value)}
              placeholder={"Bapak Budi\nKeluarga Andi\nSobat Rian"}
              className="w-full bg-[#641823]/90 border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-amber-400 leading-relaxed"
              required
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full bg-[#851824] hover:bg-[#641823] border border-amber-400/40 text-amber-200 font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
          >
            Generate Link Tamu
          </motion.button>
        </form>

        {/* Hasil Generate */}
        {generatedList.length > 0 && (
          <div className="space-y-4">
            <div className="flex justify-between items-center px-2">
              <h2 className="font-serif text-lg text-amber-200 font-bold">Daftar Link Hasil ({generatedList.length} Tamu)</h2>
            </div>

            <div className="space-y-3 max-h-[500px] overflow-y-auto pr-1">
              {generatedList.map((item, idx) => (
                <div key={idx} className="bg-[#641823] p-4 rounded-2xl border border-amber-500/20 space-y-2 shadow-md">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-xs text-amber-300 capitalize">👤 {item.name}</span>
                    <span className="text-[10px] text-stone-300 bg-black/20 px-2 py-0.5 rounded">Tamu #{idx + 1}</span>
                  </div>
                  
                  <div className="bg-[#4d0a13] p-2.5 rounded-xl border border-amber-500/10 text-[11px] font-mono text-stone-200 break-all select-all">
                    {item.link}
                  </div>

                  <div className="flex gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => handleCopy(item.link, idx)}
                      className="flex-1 bg-[#851824] hover:bg-[#3f070e] text-amber-200 text-[10px] font-bold py-2 px-3 rounded-lg border border-amber-400/30 transition-all cursor-pointer text-center"
                    >
                      {copiedIndex === idx ? '✅ Berhasil Disalin!' : '📋 Salin Link'}
                    </button>

                    <button
                      type="button"
                      onClick={() => handleWhatsAppShare(item.name, item.link)}
                      className="flex-1 bg-emerald-800 hover:bg-emerald-900 text-emerald-100 text-[10px] font-bold py-2 px-3 rounded-lg border border-emerald-500/30 transition-all cursor-pointer text-center"
                    >
                      💬 Kirim WA
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}