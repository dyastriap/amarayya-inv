'use client';

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';

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
  eventName?: string;
  eventTime?: string;
  monogram?: string;
  groomIg?: string;
  brideIg?: string;
  groomBankNumber?: string;
  groomBankHolder?: string;
  brideBankNumber?: string;
  brideBankHolder?: string;
  groomPhoto?: string;
  bridePhoto?: string;
  audioUrl?: string;
}

interface TemplateProps {
  data: ClientData;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

interface CombinedForm {
  name: string;
  phone: string;
  guests: number;
  attendance: string;
  address: string;
  message: string;
}

interface WishItem {
  name: string;
  address: string;
  message: string;
  attendance: string;
}

const ASSETS = {
  cloudSkyBg: "https://cdn-builder.viding.co/2502/Sky-2(1).png",
  mountainBg: "https://cdn-builder.viding.co/2514/BG-2.png",
  sakuraTreeLeft: "https://cdn-builder.viding.co/2504/Tree-2-1.png",
  treeRimbun: "https://cdn-builder.viding.co/2503/Tree-New-copy-9.png",
  rumahLimas: "https://cdn-builder.viding.co/2506/Rumah-Limas-Palembang.png",
  pucukRebungLeft: "https://cdn-builder.viding.co/2516/Pucek-rebung-2-Long(1).png",
  pucukRebungRight: "https://cdn-builder.viding.co/2517/Pucek-rebung-2-Long.png",
  pucukRebungTop: "https://cdn-builder.viding.co/2520/Pucuk-Rebung-2-Full.png",
  pucukRebungBottom: "https://cdn-builder.viding.co/2525/Pucuk-Rebung-2-copy.png",
  roseGif: "https://cdn-builder.viding.co/2509/Roses.gif",
  lotusGif: "https://cdn-builder.viding.co/2512/Lotus-2.gif",
  purpleLotusGif: "https://cdn-builder.viding.co/2513/lotus-copy-3.gif",
  rosePatternBg: "https://cdn-builder.viding.co/2521/Rose-pattern.png",
  
  defaultGroomPhoto: "/image/client1/FotoPria.jpeg",
  defaultBridePhoto: "/image/client1/FotoWanita.jpg",
  
  igIcon: "https://cdn-builder.viding.co/2524/IG(1).png",
  
  // DEFAULT MUSIC: TULUS - TEMAN HIDUP (Atau bisa ganti ke '/audio/teman-hidup.mp3')
  defaultMusic: "/audio/teman-hidup.mp3"
};

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' as const } }
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function Template1({ data }: TemplateProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [formData, setFormData] = useState<CombinedForm>({
    name: '',
    phone: '',
    guests: 1,
    attendance: 'Hadir',
    address: '',
    message: ''
  });

  const [wishesList, setWishesList] = useState<WishItem[]>([
    { 
      name: 'Doni Irza', 
      address: 'Jakarta', 
      attendance: 'Hadir',
      message: `Selamat untuk ${data.clientName}, semoga menjadi keluarga Sakinah Mawaddah Warahmah! 🤲✨` 
    }
  ]);

  const rawNames = data.clientName ? data.clientName.split(/&|dan/i) : [];
  const groomFirst = data.groomName 
    ? data.groomName.split(' ')[0] 
    : (rawNames[0] ? rawNames[0].trim() : 'Mustofa');
  
  const brideFirst = data.brideName 
    ? data.brideName.split(' ')[0] 
    : (rawNames[1] ? rawNames[1].trim() : 'Firsta');
  
  const monogramText = data.monogram || `${groomFirst.charAt(0)}${brideFirst.charAt(0)}`;

  useEffect(() => {
    setIsMounted(true);

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

  const handleOpenInvitation = () => {
    setIsOpen(true);
    if (audioRef.current) {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((err) => {
        console.log("Autoplay ditahan oleh browser:", err);
      });
    }
  };

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name) {
      if (formData.message) {
        setWishesList([
          { 
            name: formData.name, 
            address: formData.address || 'Tamu Undangan', 
            attendance: formData.attendance,
            message: formData.message 
          }, 
          ...wishesList
        ]);
      }
      alert(`Terima kasih ${formData.name}, konfirmasi kehadiran & ucapan Anda telah terkirim!`);
      setFormData({ name: '', phone: '', guests: 1, attendance: 'Hadir', address: '', message: '' });
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`Nomor Rekening ${label} (${text}) berhasil disalin!`);
  };

  return (
    <div className="min-h-screen bg-[#4d0a13] text-white font-sans antialiased overflow-x-hidden selection:bg-amber-500 selection:text-black">
      
      {/* AUDIO ELEMENT: TEMAN HIDUP BY TULUS */}
      <audio 
        ref={audioRef} 
        src={data.audioUrl || ASSETS.defaultMusic} 
        loop 
        preload="auto" 
      />

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Alex+Brush&family=Cinzel:wght@500;600;700&family=Great+Vibes&family=Italianno&family=Pinyon+Script&family=Nunito:ital,wght@0,300;0,400;0,600;0,700;1,400&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap');
        
        .font-monogram {
          font-family: 'Alex Brush', 'Great Vibes', cursive;
        }
        .font-wedding-title {
          font-family: 'Great Vibes', cursive;
        }
        .font-serif-wedding {
          font-family: 'Playfair Display', Georgia, serif;
        }
        .font-cinzel {
          font-family: 'Cinzel', serif;
        }
        .font-body-wedding {
          font-family: 'Nunito', sans-serif;
        }
      `}</style>

      {/* FLOATING MUSIC DISC BUTTON */}
      {isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-[#3f070e]/90 hover:bg-[#2e040a] text-amber-200 border-2 border-amber-400/60 rounded-full shadow-2xl flex items-center justify-center backdrop-blur-md cursor-pointer group"
          title={isPlaying ? "Matikan Musik (Tulus - Teman Hidup)" : "Putar Musik (Tulus - Teman Hidup)"}
        >
          <span className={`text-lg transition-transform duration-700 ${isPlaying ? 'animate-spin' : ''}`}>
            🎵
          </span>
          {!isPlaying && (
            <span className="absolute w-full h-0.5 bg-red-500 rotate-45 rounded-full" />
          )}
        </motion.button>
      )}

      {/* 1. COVER DEPAN */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            key="cover-overlay"
            initial={{ y: 0 }}
            exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-50 max-w-md mx-auto min-h-screen flex flex-col justify-between items-center bg-[#4d0a13] overflow-hidden text-center shadow-2xl font-body-wedding border-x border-amber-900/40"
          >
            <div 
              className="absolute inset-0 bg-cover bg-top opacity-40 pointer-events-none z-0" 
              style={{ backgroundImage: `url(${ASSETS.cloudSkyBg})` }} 
            />

            <div className="absolute inset-0 pointer-events-none z-0">
              <img 
                src={ASSETS.mountainBg} 
                alt="Pegunungan" 
                className="w-full h-full object-cover opacity-65" 
              />
            </div>

            <img src={ASSETS.sakuraTreeLeft} alt="Sakura Left" className="absolute -top-10 -left-10 w-72 h-72 object-contain opacity-95 z-0 pointer-events-none" />
            <img src={ASSETS.sakuraTreeLeft} alt="Sakura Right" className="absolute -top-10 -right-10 w-72 h-72 object-contain opacity-95 z-0 pointer-events-none transform scale-x-[-1]" />

            <img src={ASSETS.treeRimbun} alt="Pohon Rimbun" className="absolute left-[-60px] top-44 w-56 h-72 object-contain opacity-80 z-0 pointer-events-none" />
            <img src={ASSETS.treeRimbun} alt="Pohon Rimbun" className="absolute right-[-60px] top-44 w-56 h-72 object-contain opacity-80 z-0 pointer-events-none transform scale-x-[-1]" />

            <img src={ASSETS.pucukRebungLeft} alt="Pucuk Rebung Left" className="absolute left-0 top-0 h-full w-8 sm:w-10 object-cover z-30 pointer-events-none" />
            <img src={ASSETS.pucukRebungRight} alt="Pucuk Rebung Right" className="absolute right-0 top-0 h-full w-8 sm:w-10 object-cover z-30 pointer-events-none" />

            <div className="pt-6 z-10">
              <span className="font-wedding-title text-2xl text-pink-500 font-bold tracking-wider">Amarayya Inv</span>
            </div>

            <div className="relative z-10 w-[84%] max-w-xs bg-[#3f070e]/20 rounded-t-[160px] pt-12 pb-28 px-5 border border-amber-300/30 shadow-2xl space-y-3 mt-6 mb-[-100px]">
              <img src={ASSETS.roseGif} alt="Mawar Left" className="absolute -left-6 top-16 w-20 h-20 opacity-80 pointer-events-none rotate-12" />
              <img src={ASSETS.roseGif} alt="Mawar Right" className="absolute -right-6 top-16 w-20 h-20 opacity-80 pointer-events-none -rotate-12 transform scale-x-[-1]" />

              <p className="text-[11px] text-stone-200 font-medium tracking-wide pt-2 drop-shadow">
                We Invite You to The Wedding of
              </p>

              <h1 className="font-serif-wedding text-2xl sm:text-3xl font-normal text-white tracking-wide leading-tight py-1 drop-shadow-md">
                {data.clientName || 'Nama Mempelai'}
              </h1>

              <div className="space-y-1 pt-1 text-stone-200 drop-shadow">
                <p className="text-xs font-semibold">{data.eventName || 'Resepsi Nikah'}</p>
                <p className="text-xs font-medium">{data.weddingDate || '06 September 2026'}</p>
                <p className="text-xs font-medium text-stone-300">{data.eventTime || '10:00-13:00'}</p>
              </div>

              <div className="pt-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenInvitation}
                  className="inline-flex items-center justify-center gap-2 bg-[#3f070e] hover:bg-[#2e040a] text-amber-200 font-semibold text-xs py-2.5 px-6 rounded-full border border-amber-400/40 shadow-xl transition-all cursor-pointer"
                >
                  <span>Buka Undangan</span>
                  <span className="text-xs">✉️</span>
                </motion.button>
              </div>
            </div>

            {/* RUMAH LIMAS & BUNGA BERVARIASI */}
            <div className="relative w-full h-80 z-20 overflow-hidden mt-auto pointer-events-none">
              <img 
                src={ASSETS.rumahLimas} 
                alt="Rumah Limas" 
                className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-[120%] max-w-none opacity-95 object-contain z-0 pointer-events-auto" 
              />
              
              <img src={ASSETS.purpleLotusGif} alt="Daun Ungu Kiri" className="absolute -left-2 bottom-12 w-32 h-40 object-contain z-10 opacity-90" />
              <img src={ASSETS.purpleLotusGif} alt="Daun Ungu Kanan" className="absolute -right-2 bottom-12 w-32 h-40 object-contain z-10 opacity-90 transform scale-x-[-1]" />
              
              <img src={ASSETS.roseGif} alt="Red Rose Left" className="absolute -left-8 bottom-[-10px] w-40 h-40 object-contain z-30 rotate-12" />
              <img src={ASSETS.roseGif} alt="Red Rose Right" className="absolute -right-8 bottom-[-10px] w-40 h-40 object-contain z-30 transform scale-x-[-1] -rotate-12" />
              
              <img src={ASSETS.roseGif} alt="Red Rose Mid Left" className="absolute left-[22%] bottom-[-15px] w-28 h-28 object-contain z-25 -rotate-6 opacity-90" />
              <img src={ASSETS.roseGif} alt="Red Rose Mid Right" className="absolute right-[22%] bottom-[-15px] w-28 h-28 object-contain z-25 rotate-6 opacity-90 transform scale-x-[-1]" />

              <img src={ASSETS.lotusGif} alt="Lotus White Left" className="absolute left-6 bottom-[-8px] w-32 h-32 object-contain z-40" />
              <img src={ASSETS.lotusGif} alt="Lotus White Center" className="absolute left-1/2 transform -translate-x-1/2 bottom-[-18px] w-28 h-28 object-contain z-35 opacity-90" />
              <img src={ASSETS.lotusGif} alt="Lotus White Right" className="absolute right-6 bottom-[-8px] w-32 h-32 object-contain z-40 transform scale-x-[-1]" />
            </div>

          </motion.div>
        )}
      </AnimatePresence>

      {/* 2. HERO UTAMA SAAT DIBUKA */}
      <main className={`max-w-md mx-auto bg-[#4d0a13] min-h-screen relative shadow-2xl border-x border-amber-900/30 font-body-wedding ${!isOpen ? 'hidden' : 'block'}`}>

        <section className="fixed-layout relative min-h-screen flex flex-col justify-between items-center text-center overflow-hidden border-b border-amber-500/20">
          
          <div 
            className="absolute inset-0 bg-cover bg-top opacity-40 pointer-events-none z-0" 
            style={{ backgroundImage: `url(${ASSETS.cloudSkyBg})` }} 
          />

          <div className="absolute inset-0 pointer-events-none z-0">
            <img 
              src={ASSETS.mountainBg} 
              alt="Pegunungan" 
              className="w-full h-full object-cover opacity-65" 
            />
          </div>

          <img src={ASSETS.sakuraTreeLeft} alt="Sakura Left" className="absolute -top-10 -left-10 w-72 h-72 object-contain opacity-95 z-0 pointer-events-none" />
          <img src={ASSETS.sakuraTreeLeft} alt="Sakura Right" className="absolute -top-10 -right-10 w-72 h-72 object-contain opacity-95 z-0 pointer-events-none transform scale-x-[-1]" />

          <img src={ASSETS.treeRimbun} alt="Pohon Rimbun Kiri" className="absolute left-[-60px] top-44 w-56 h-72 object-contain opacity-80 z-0 pointer-events-none" />
          <img src={ASSETS.treeRimbun} alt="Pohon Rimbun Kanan" className="absolute right-[-60px] top-44 w-56 h-72 object-contain opacity-80 z-0 pointer-events-none transform scale-x-[-1]" />

          <img src={ASSETS.pucukRebungLeft} alt="Pucuk Rebung Left" className="absolute left-0 top-0 h-full w-8 sm:w-10 object-cover z-30 pointer-events-none" />
          <img src={ASSETS.pucukRebungRight} alt="Pucuk Rebung Right" className="absolute right-0 top-0 h-full w-8 sm:w-10 object-cover z-30 pointer-events-none" />

          <div className="pt-6 z-10">
            <span className="font-wedding-title text-2xl text-pink-500 font-bold tracking-wider">Amarayya Inv</span>
          </div>

          <div className="relative z-10 w-[84%] max-w-xs bg-[#3f070e]/20 rounded-t-[160px] pt-10 pb-32 px-5 border border-amber-300/30 shadow-2xl space-y-3 mt-4 mb-[-110px]">
            
            <img src={ASSETS.roseGif} alt="Mawar Left" className="absolute -left-6 top-16 w-20 h-20 opacity-80 pointer-events-none rotate-12" />
            <img src={ASSETS.roseGif} alt="Mawar Right" className="absolute -right-6 top-16 w-20 h-20 opacity-80 pointer-events-none -rotate-12 transform scale-x-[-1]" />

            <div className="w-16 h-24 mx-auto rounded-full border border-amber-300 flex items-center justify-center p-1 bg-[#4d0a13]/30 shadow-inner">
              <span className="font-monogram text-3xl font-normal text-amber-100 tracking-tighter drop-shadow">
                {monogramText}
              </span>
            </div>

            <div className="space-y-0.5 pt-2">
              <h1 className="font-serif-wedding text-3xl sm:text-4xl font-normal text-white tracking-wide drop-shadow-md">
                {groomFirst}
              </h1>
              <div className="font-wedding-title text-3xl text-amber-200 py-0.5 drop-shadow">&</div>
              <h1 className="font-serif-wedding text-3xl sm:text-4xl font-normal text-white tracking-wide drop-shadow-md">
                {brideFirst}
              </h1>
            </div>

            <p className="text-xs text-stone-200 font-medium tracking-wide pt-3 drop-shadow">
              We're getting married
            </p>
          </div>

          <div className="relative w-full h-80 z-20 overflow-hidden mt-auto pointer-events-none">
            <img 
              src={ASSETS.rumahLimas} 
              alt="Rumah Limas" 
              className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-[120%] max-w-none opacity-95 object-contain z-0 pointer-events-auto" 
            />
            
            <img src={ASSETS.purpleLotusGif} alt="Daun Ungu Kiri" className="absolute -left-2 bottom-12 w-32 h-40 object-contain z-10 opacity-90" />
            <img src={ASSETS.purpleLotusGif} alt="Daun Ungu Kanan" className="absolute -right-2 bottom-12 w-32 h-40 object-contain z-10 opacity-90 transform scale-x-[-1]" />
            
            <img src={ASSETS.roseGif} alt="Red Rose Left" className="absolute -left-8 bottom-[-10px] w-40 h-40 object-contain z-30 rotate-12" />
            <img src={ASSETS.roseGif} alt="Red Rose Right" className="absolute -right-8 bottom-[-10px] w-40 h-40 object-contain z-30 transform scale-x-[-1] -rotate-12" />
            
            <img src={ASSETS.roseGif} alt="Red Rose Mid Left" className="absolute left-[22%] bottom-[-15px] w-28 h-28 object-contain z-25 -rotate-6 opacity-90" />
            <img src={ASSETS.roseGif} alt="Red Rose Mid Right" className="absolute right-[22%] bottom-[-15px] w-28 h-28 object-contain z-25 rotate-6 opacity-90 transform scale-x-[-1]" />

            <img src={ASSETS.lotusGif} alt="Lotus White Left" className="absolute left-6 bottom-[-8px] w-32 h-32 object-contain z-40" />
            <img src={ASSETS.lotusGif} alt="Lotus White Center" className="absolute left-1/2 transform -translate-x-1/2 bottom-[-18px] w-28 h-28 object-contain z-35 opacity-90" />
            <img src={ASSETS.lotusGif} alt="Lotus White Right" className="absolute right-6 bottom-[-8px] w-32 h-32 object-contain z-40 transform scale-x-[-1]" />
          </div>

        </section>

        {/* 3. PROFIL DETAIL MEMPELAI */}
        <section className="relative w-full max-w-md mx-auto bg-[#641823] text-white overflow-hidden py-10 font-sans">
          
          <div 
            className="absolute inset-0 bg-repeat opacity-25 pointer-events-none z-0" 
            style={{ backgroundImage: `url(${ASSETS.rosePatternBg})`, backgroundSize: '320px' }} 
          />

          <img 
            src={ASSETS.pucukRebungTop} 
            alt="Pucuk Rebung Header" 
            className="absolute top-0 inset-x-0 w-full object-contain opacity-90 pointer-events-none z-10" 
          />

          <div className="relative z-10 px-6 pt-16 pb-12 space-y-16 text-center">
            
            {/* MEMPELAI PRIA */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="space-y-4">
              <div className="w-[78%] mx-auto aspect-[3/4] bg-[#52121c] p-1.5 rounded-sm shadow-2xl border border-amber-300/40 overflow-hidden relative">
                <img 
                  src={data.groomPhoto || ASSETS.defaultGroomPhoto} 
                  alt={groomFirst} 
                  className="w-full h-full object-cover object-center" 
                />
              </div>

              <div className="space-y-1.5 pt-2">
                <h2 className="font-serif-wedding text-2xl sm:text-3xl font-bold text-white tracking-wide leading-snug drop-shadow-md">
                  {data.groomName || 'Mustofa Abdulmajid, S.E.'}
                </h2>

                <p className="text-xs text-stone-200/90 font-light max-w-xs mx-auto pt-1 leading-relaxed">
                  {data.groomParents || 'Putra ke-4 dari Bapak Ustad Yeyep Abu Bakar Soleh dan Ibu Rohimah'}
                </p>
              </div>

              {data.groomIg && (
                <div className="pt-1">
                  <a href={data.groomIg} target="_blank" rel="noreferrer" className="inline-block transition-transform hover:scale-110 active:scale-95">
                    <img src={ASSETS.igIcon} alt="Instagram" className="w-8 h-8 mx-auto object-contain drop-shadow-md" />
                  </a>
                </div>
              )}
            </motion.div>

            {/* MEMPELAI WANITA */}
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="space-y-4 pt-4">
              <div className="w-[78%] mx-auto aspect-[3/4] bg-[#52121c] p-1.5 rounded-sm shadow-2xl border border-amber-300/40 overflow-hidden relative">
                <img 
                  src={data.bridePhoto || ASSETS.defaultBridePhoto} 
                  alt={brideFirst} 
                  className="w-full h-full object-cover object-center" 
                />
              </div>

              <div className="space-y-1.5 pt-2">
                <h2 className="font-serif-wedding text-2xl sm:text-3xl font-bold text-white tracking-wide leading-snug drop-shadow-md">
                  {data.brideName || 'Ns. Firsta Hilwa, S.Kep.'}
                </h2>

                <p className="text-xs text-stone-200/90 font-light max-w-xs mx-auto pt-1 leading-relaxed">
                  {data.brideParents || 'Putri Pertama dari Bapak Djumino dan Ibu Aenah'}
                </p>
              </div>

              {data.brideIg && (
                <div className="pt-1">
                  <a href={data.brideIg} target="_blank" rel="noreferrer" className="inline-block transition-transform hover:scale-110 active:scale-95">
                    <img src={ASSETS.igIcon} alt="Instagram" className="w-8 h-8 mx-auto object-contain drop-shadow-md" />
                  </a>
                </div>
              )}
            </motion.div>

          </div>

          <img 
            src={ASSETS.pucukRebungBottom} 
            alt="Pucuk Rebung Footer" 
            className="absolute bottom-0 inset-x-0 w-full object-contain opacity-90 pointer-events-none z-10" 
          />

        </section>

        {/* 4. COUNTDOWN TIMER */}
        <section className="px-6 py-14 text-center relative overflow-hidden bg-[#4d0a13]">
          
          <div 
            className="absolute inset-0 bg-cover bg-top opacity-30 pointer-events-none z-0" 
            style={{ backgroundImage: `url(${ASSETS.cloudSkyBg})` }} 
          />

          <div className="absolute inset-0 pointer-events-none z-0">
            <img 
              src={ASSETS.mountainBg} 
              alt="Mountain Background" 
              className="w-full h-full object-cover opacity-50" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-[#4d0a13]/70 via-[#4d0a13]/50 to-[#4d0a13]/80" />
          </div>

          <img src={ASSETS.sakuraTreeLeft} alt="Sakura Left" className="absolute -top-12 -left-12 w-48 h-48 object-contain opacity-70 pointer-events-none z-0" />
          <img src={ASSETS.sakuraTreeLeft} alt="Sakura Right" className="absolute -top-12 -right-12 w-48 h-48 object-contain opacity-70 pointer-events-none transform scale-x-[-1] z-0" />

          <img src={ASSETS.roseGif} alt="Rose Left" className="absolute -left-8 top-12 w-28 h-28 opacity-70 pointer-events-none rotate-12 z-10" />
          <img src={ASSETS.roseGif} alt="Rose Right" className="absolute -right-8 bottom-4 w-28 h-28 opacity-70 pointer-events-none transform scale-x-[-1] -rotate-12 z-10" />

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="space-y-6 relative z-10 pt-2">
            <h2 className="font-serif-wedding text-3xl font-bold text-amber-200 tracking-wide drop-shadow-md">
              Save The Date
            </h2>
            <p className="text-xs font-semibold text-amber-300/90 tracking-wider drop-shadow">
              {data.weddingDate || 'Minggu, 6 September 2026'}
            </p>
            
            <div className="grid grid-cols-4 gap-2.5 max-w-xs mx-auto pt-2 min-h-[88px]">
              {isMounted && [
                { label: 'HARI', value: timeLeft.days },
                { label: 'JAM', value: timeLeft.hours },
                { label: 'MENIT', value: timeLeft.minutes },
                { label: 'DETIK', value: timeLeft.seconds },
              ].map((item, idx) => (
                <div key={idx} className="bg-[#3f070e]/80 backdrop-blur-sm p-3 rounded-2xl border border-amber-400/30 shadow-2xl">
                  <span className="block font-serif-wedding text-2xl font-bold text-amber-300 drop-shadow">{item.value}</span>
                  <span className="text-[9px] text-stone-200 uppercase tracking-widest font-semibold">{item.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 5. ACARA & LOKASI */}
        <section className="px-6 py-16 text-center space-y-8 relative overflow-hidden bg-gradient-to-b from-[#4d0a13] to-[#3a060d]">
          <img 
            src={ASSETS.mountainBg} 
            alt="Mountain Background" 
            className="absolute inset-0 w-full h-full object-cover opacity-25 pointer-events-none" 
          />
          <img 
            src={ASSETS.rumahLimas} 
            alt="Rumah Limas" 
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[120%] max-w-none opacity-25 pointer-events-none" 
          />

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="space-y-3 relative z-10">
            <h2 className="font-wedding-title text-5xl text-amber-200">Acara & Lokasi</h2>
            <p className="text-xs text-stone-300">Merupakan suatu kehormatan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir.</p>
          </motion.div>

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-6 relative z-10">
            <motion.div variants={fadeInUp} className="bg-[#4d0a13]/90 p-6 rounded-3xl border border-amber-500/30 text-left space-y-2 backdrop-blur-sm shadow-xl">
              <div className="text-amber-400 font-bold text-sm uppercase tracking-wider font-cinzel">
                {data.eventName || 'Resepsi Nikah'}
              </div>
              <p className="text-xs text-stone-300">{data.weddingDate}</p>
              <p className="text-xs font-semibold text-white">{data.eventTime || '10:00 WIB - Selesai'}</p>
              <div className="pt-2 text-xs text-stone-300">
                <strong className="text-amber-200">{data.location || 'Kediaman Mempelai Pria'}</strong><br />
                {data.address || 'Kota BNI, Jl. Jend. Sudirman No. Kav 1, Tanah Abang, Jakarta Pusat'}
              </div>
            </motion.div>

            <motion.a
              variants={fadeInUp}
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="inline-block bg-[#851824] hover:bg-[#641823] text-amber-200 font-bold py-3 px-8 rounded-full text-xs uppercase tracking-wider transition-all duration-300 shadow-lg border border-amber-400/40"
            >
              📍 Buka Google Maps
            </motion.a>
          </motion.div>
        </section>

        {/* 6. GABUNGAN: RSVP & UCAPAN DOA */}
        <section className="px-6 py-16 bg-gradient-to-b from-[#3a060d] via-[#4d0a13] to-[#3a060d] border-t border-amber-500/20 relative overflow-hidden">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="space-y-8 relative z-10">
            <div className="text-center space-y-2">
              <h2 className="font-wedding-title text-5xl text-amber-200">Kehadiran & Doa Restu</h2>
              <p className="text-xs text-stone-300">Mohon konfirmasi kehadiran dan berikan ucapan doa restu Anda.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 max-w-sm mx-auto bg-[#3f070e]/60 backdrop-blur-md p-6 rounded-3xl border border-amber-500/30 shadow-2xl">
              <div>
                <label className="block text-[11px] text-amber-200 mb-1 text-left">Nama Lengkap *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Masukkan nama Anda"
                  className="w-full bg-[#641823]/90 border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-amber-200 mb-1 text-left">Nomor WhatsApp</label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="0812xxxx"
                    className="w-full bg-[#641823]/90 border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div>
                  <label className="block text-[11px] text-amber-200 mb-1 text-left">Kota / Alamat</label>
                  <input
                    type="text"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Contoh: Jakarta"
                    className="w-full bg-[#641823]/90 border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] text-amber-200 mb-1 text-left">Konfirmasi Kehadiran</label>
                  <select
                    value={formData.attendance}
                    onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                    className="w-full bg-[#641823]/90 border border-amber-500/30 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Hadir" className="bg-[#4d0a13]">Hadir</option>
                    <option value="Tidak Hadir" className="bg-[#4d0a13]">Tidak Hadir</option>
                    <option value="Ragu-Ragu" className="bg-[#4d0a13]">Ragu-Ragu</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[11px] text-amber-200 mb-1 text-left">Jumlah Tamu</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={formData.guests}
                    onChange={(e) => setFormData({ ...formData, guests: parseInt(e.target.value) || 1 })}
                    className="w-full bg-[#641823]/90 border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] text-amber-200 mb-1 text-left">Ucapan & Doa Restu</label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tuliskan doa & ucapan untuk kedua mempelai..."
                  className="w-full bg-[#641823]/90 border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-white placeholder-stone-400 focus:outline-none focus:border-amber-400"
                />
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                className="w-full bg-[#851824] hover:bg-[#641823] border border-amber-400/40 text-amber-200 font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
              >
                Kirim Konfirmasi & Ucapan
              </motion.button>
            </form>

            <div className="space-y-3 max-w-sm mx-auto max-h-72 overflow-y-auto pr-1 pt-2">
              {wishesList.map((item, idx) => (
                <div key={idx} className="bg-[#641823] p-3.5 rounded-2xl border border-amber-500/20 text-left space-y-1 shadow-md">
                  <div className="flex justify-between items-center border-b border-amber-500/10 pb-1.5">
                    <span className="font-bold text-xs text-amber-300">{item.name}</span>
                    <div className="flex items-center gap-1.5">
                      <span className={`text-[9px] px-2 py-0.5 rounded-full font-semibold ${item.attendance === 'Hadir' ? 'bg-emerald-900/80 text-emerald-200 border border-emerald-500/30' : 'bg-stone-800 text-stone-300'}`}>
                        {item.attendance}
                      </span>
                      {item.address && <span className="text-[10px] text-stone-400">&bull; {item.address}</span>}
                    </div>
                  </div>
                  <p className="text-xs text-stone-200 leading-relaxed pt-1">{item.message}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 7. DIGITAL GIFT */}
        <section className="px-6 py-16 text-center space-y-6 relative overflow-hidden bg-[#3a060d]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <h2 className="font-wedding-title text-5xl text-amber-200">Hadiah Digital</h2>
              <p className="text-xs text-stone-300 leading-relaxed max-w-xs mx-auto">
                Doa restu Anda merupakan karunia yang sangat berarti bagi kami. Namun jika ingin memberikan tanda kasih, Anda dapat menyalurkannya melalui:
              </p>
            </div>

            <div className="space-y-5 max-w-xs mx-auto">
              
              {/* REKENING BCA MEMPELAI PRIA */}
              <div className="bg-[#4d0a13] p-6 rounded-3xl border border-amber-500/30 space-y-4 text-left shadow-2xl relative">
                <div className="flex justify-between items-center">
                  <span className="font-black text-xl tracking-widest text-blue-400">BCA</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-400/30 px-2.5 py-1 rounded-full font-semibold">
                    Bank Transfer
                  </span>
                </div>
                <div>
                  <p className="text-[11px] text-stone-400 uppercase tracking-wider">Pengantin </p>
                  <p className="font-mono text-lg font-bold text-amber-200 tracking-wider pt-0.5">
                    {data.groomBankNumber || '7005805091'}
                  </p>
                  <p className="text-xs text-stone-300">
                    a.n. {data.groomBankHolder || data.groomName || 'Mustofa Abdulmajid'}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(data.groomBankNumber || '7005805091', `BCA`)}
                  className="w-full bg-[#641823] hover:bg-[#851824] border border-amber-400/40 text-amber-200 text-xs font-bold py-2.5 rounded-xl transition-colors text-center shadow-md cursor-pointer"
                >
                  📋 Salin Rekening 
                </button>
              </div>

              {/* REKENING BCA MEMPELAI WANITA */}
              <div className="bg-[#4d0a13] p-6 rounded-3xl border border-amber-500/30 space-y-4 text-left shadow-2xl relative">
                <div className="flex justify-between items-center">
                  <span className="font-black text-xl tracking-widest text-blue-400">BCA</span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-400/30 px-2.5 py-1 rounded-full font-semibold">
                    Bank Transfer
                  </span>
                </div>
                <div>
                  <p className="text-[11px] text-stone-400 uppercase tracking-wider">Orang Tua</p>
                  <p className="font-mono text-lg font-bold text-amber-200 tracking-wider pt-0.5">
                    {data.brideBankNumber || '7005245265'}
                  </p>
                  <p className="text-xs text-stone-300">
                    a.n. {data.brideBankHolder || data.brideName || 'Siti Latifah Sadiah'}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(data.brideBankNumber || '7005245265', `BCA`)}
                  className="w-full bg-[#641823] hover:bg-[#851824] border border-amber-400/40 text-amber-200 text-xs font-bold py-2.5 rounded-xl transition-colors text-center shadow-md cursor-pointer"
                >
                  📋 Salin Rekening 
                </button>
              </div>

            </div>
          </motion.div>
        </section>

        {/* FOOTER */}
        <footer className="px-6 py-10 text-center border-t border-amber-500/20 text-[11px] text-stone-400 space-y-2 relative overflow-hidden bg-[#2c0409]">
          <img src={ASSETS.pucukRebungTop} alt="Footer Border" className="absolute bottom-0 inset-x-0 w-full opacity-30 transform rotate-180 pointer-events-none" />
          <p className="font-wedding-title text-3xl text-amber-200 relative z-10">{data.clientName}</p>
          <p className="relative z-10">Terima kasih atas doa & restu Anda.</p>
          <p className="text-[9px] opacity-60 relative z-10">Crafted with ❤️ by Amarayya Invitation</p>
        </footer>

      </main>
    </div>
  );
}