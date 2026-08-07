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
  giftAddress?: string;
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
  buketBunga: "https://cdn-builder.viding.co/2503/Tree-New-copy-9.png",
  
  defaultGroomPhoto: "/image/client1/FotoPria.jpeg",
  defaultBridePhoto: "/image/client1/FotoWanita.jpg",
  foto1: "/image/client1/foto1.webp",
  foto2: "/image/client1/foto2.webp",
  foto3: "/image/client1/foto3.webp",
  foto4: "/image/client1/foto4.webp",
  foto5: "/image/client1/foto5.webp",
  foto6: "/image/client1/foto6.webp",
  
  igIcon: "https://cdn-builder.viding.co/2524/IG(1).png",
  defaultMusic: "/audio/teman-hidup.mp3",
  bcaLogo: "/image/client1/logo_bca.png",
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
  const [guestName, setGuestName] = useState<string>('Tamu Undangan');
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [formData, setFormData] = useState<CombinedForm>({
    name: '',
    phone: '',
    guests: 1,
    attendance: 'Hadir',
    address: '',
    message: ''
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [wishesList, setWishesList] = useState<WishItem[]>([]);

  const rawNames = data.clientName ? data.clientName.split(/&|dan/i) : [];
  const groomFirst = data.groomName 
    ? data.groomName.split(' ')[0] 
    : (rawNames[0] ? rawNames[0].trim() : 'Mustofa');
  
  const brideFirst = data.brideName 
    ? data.brideName.split(' ')[0] 
    : (rawNames[1] ? rawNames[1].trim() : 'Firsta');
  
  const monogramText = data.monogram || `${groomFirst.charAt(0)}${brideFirst.charAt(0)}`;

  const tempGalleryImages = [
    ASSETS.foto1,
    ASSETS.foto2,
    ASSETS.foto3,
    ASSETS.foto4,
    ASSETS.foto5,
    ASSETS.foto6,
  ];

  const defaultAddress = "Kp. Bojong Kaum, Rt. 01/02 Ds. Bojong Kec. Kemang Kab. Bogor kode pos 16310";

  const fetchWishes = async () => {
    try {
      const res = await fetch(`/api/wishes?clientName=${encodeURIComponent(data.clientName)}`);
      if (res.ok) {
        const fetchedData = await res.json();
        setWishesList(fetchedData);
      }
    } catch (error) {
      console.error("Gagal memuat ucapan:", error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    fetchWishes();

    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    if (to) {
      setGuestName(to);
    }

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
  }, [data.weddingDate, data.clientName]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.message) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/wishes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName: data.clientName,
          name: formData.name,
          attendance: formData.attendance,
          message: formData.message,
        }),
      });

      if (response.ok) {
        const newWish = await response.json();
        setWishesList([newWish, ...wishesList]);
        alert(`Terima kasih ${formData.name}, konfirmasi kehadiran & ucapan Anda telah terkirim!`);
        setFormData({ name: '', phone: '', guests: 1, attendance: 'Hadir', address: '', message: '' });
      } else {
        alert("Terjadi kesalahan saat mengirim ucapan.");
      }
    } catch (error) {
      alert("Gagal terhubung ke server.");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    alert(`${label} berhasil disalin!`);
  };

  return (
    <div className="min-h-screen bg-[#4d0a13] text-white font-sans antialiased overflow-x-hidden selection:bg-amber-500 selection:text-black">
      
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

      {isOpen && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-50 w-12 h-12 bg-[#3f070e]/90 hover:bg-[#2e040a] text-amber-200 border-2 border-amber-400/60 rounded-full shadow-2xl flex items-center justify-center backdrop-blur-md cursor-pointer group"
          title={isPlaying ? "Matikan Musik" : "Putar Musik"}
        >
          <span className={`text-lg transition-transform duration-700 ${isPlaying ? 'animate-spin' : ''}`}>
            🎵
          </span>
          {!isPlaying && (
            <span className="absolute w-full h-0.5 bg-red-500 rotate-45 rounded-full" />
          )}
        </motion.button>
      )}

      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            key="cover-overlay"
            initial={{ y: 0 }}
            exit={{ y: '-100%', transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-50 max-w-md mx-auto min-h-screen flex flex-col justify-between items-center bg-[#4d0a13] overflow-hidden text-center shadow-2xl font-body-wedding border-x border-amber-900/40"
          >
            {/* Background menggunakan foto3 dengan penggelapan agar teks kontras */}
            <div 
              className="absolute inset-0 bg-cover bg-center z-0 filter brightness-[0.65]" 
              style={{ backgroundImage: `url(${ASSETS.foto3})` }} 
            />

            {/* Monogram Atas */}
            <div className="pt-10 z-10 w-full flex flex-col items-center">
              <div className="w-16 h-24 rounded-full border border-amber-300 flex items-center justify-center p-1 bg-black/30 shadow-md">
                <span className="font-monogram text-3xl font-normal text-amber-200 tracking-tighter drop-shadow">
                  {monogramText}
                </span>
              </div>
            </div>

            {/* Kontainer Polosan tanpa Shape Rumah */}
            <div className="relative z-10 w-full px-6 flex flex-col items-center justify-center flex-grow space-y-4">
              
              <div className="space-y-1 text-center">
                <h1 className="font-serif-wedding text-4xl sm:text-5xl font-normal text-white tracking-wide leading-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
                  {groomFirst}
                </h1>
                <div className="font-wedding-title text-4xl text-amber-300 py-0.5 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">&</div>
                <h1 className="font-serif-wedding text-4xl sm:text-5xl font-normal text-white tracking-wide leading-tight drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)]">
                  {brideFirst}
                </h1>
              </div>

              

              <div className="pt-6 pb-2 w-full max-w-[240px] text-center">
                <p className="text-[11px] text-stone-300 font-light drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] mb-1">
                  Kepada Yth. Bapak/Ibu/Saudara/i:
                </p>
                <p className="font-serif-wedding text-2xl text-amber-300 font-bold tracking-wide py-1 drop-shadow-[0_3px_8px_rgba(0,0,0,0.9)] capitalize">
                  {guestName}
                </p>
              </div>

              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenInvitation}
                  className="inline-flex items-center justify-center gap-2 bg-[#851824]/90 hover:bg-[#641823] backdrop-blur-sm text-amber-200 font-bold text-xs py-3.5 px-10 rounded-full border border-amber-400/60 shadow-[0_4px_15px_rgba(0,0,0,0.6)] transition-all cursor-pointer uppercase tracking-widest"
                >
                  <span>Buka Undangan</span>
                  <span className="text-sm">✉️</span>
                </motion.button>
              </div>
            </div>

            <div className="pb-10 z-10 w-full text-center">
              <p className="text-[11px] text-stone-300 tracking-wider drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                Terima kasih atas kehadiran & doa restu Anda
              </p>
            </div>

          </motion.div>
        )}
      </AnimatePresence>

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

        <section className="relative w-full max-w-md mx-auto bg-[#641823] text-white overflow-hidden py-12 font-sans">
          
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
            
            <motion.div 
              initial="hidden" 
              whileInView="visible" 
              viewport={{ once: true }} 
              variants={fadeInUp} 
              className="relative py-6 px-4 text-center border-b border-amber-400/20"
            >
              <motion.img 
                src={ASSETS.buketBunga}
                alt="Buket Bunga Kiri" 
                className="absolute -left-20 sm:-left-24 top-1/2 -translate-y-1/2 w-40 sm:w-48 h-auto object-contain pointer-events-none z-0 opacity-90 origin-bottom-left" 
                animate={{ 
                  rotate: [0, 6, -3, 8, 0],
                  x: [-15, 5, -5, 8, -15],
                  y: [0, -6, 2, -4, 0],
                  scale: [1, 1.03, 0.98, 1.02, 1]
                }} 
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              />

              <motion.img 
                src={ASSETS.buketBunga}
                alt="Buket Bunga Kanan" 
                className="absolute -right-20 sm:-right-24 top-1/2 -translate-y-1/2 w-40 sm:w-48 h-auto object-contain pointer-events-none z-0 opacity-90 origin-bottom-right" 
                initial={{ scaleX: -1 }}
                animate={{ 
                  rotate: [0, -6, 3, -8, 0],
                  x: [15, -5, 5, -8, 15],
                  y: [0, -5, 3, -6, 0], 
                  scaleX: -1,
                  scaleY: [1, 1.03, 0.98, 1.02, 1]
                }} 
                transition={{ duration: 6.5, repeat: Infinity, ease: "easeInOut", delay: 0.8 }}
              />

              <div className="relative z-10 max-w-[260px] sm:max-w-xs mx-auto space-y-4">
                <h2 className="font-serif-wedding text-3xl sm:text-4xl font-normal text-amber-200 tracking-wide drop-shadow">
                  Mukadimah
                </h2>

                <p className="text-xs sm:text-xs text-stone-100 font-light leading-relaxed tracking-wide text-center drop-shadow-sm">
                  Cinta mempertemukan kami, kepercayaan menguatkan kami, dan komitmen menjadi alasan kami melangkah bersama. Pernikahan bukan sekadar mengucapkan janji, tetapi tentang memilih satu sama lain setiap hari dalam suka maupun duka. Dengan kebersamaan, ketulusan, dan keyakinan, kami memulai perjalanan baru sebagai satu keluarga.
                </p>
              </div>
            </motion.div>

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
                  {data.groomParents || 'Putra ke-4 ( bungsu ) dari Bapak Ustad Yeyep Abu Bakar Soleh dan Ibu Rohimah'}
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
        <section className="relative w-full max-w-md mx-auto py-24 px-6 text-center overflow-hidden bg-[#3a060d] z-0">
          
          <div 
            className="absolute inset-0 bg-repeat opacity-[0.15] pointer-events-none z-0" 
            style={{ backgroundImage: `url(${ASSETS.rosePatternBg})`, backgroundSize: '180px' }} 
          />
          
          <img src={ASSETS.pucukRebungTop} alt="Ornamen Atas" className="absolute top-0 inset-x-0 w-full object-contain opacity-80 pointer-events-none z-10" />
          <img src={ASSETS.pucukRebungBottom} alt="Ornamen Bawah" className="absolute bottom-0 inset-x-0 w-full object-contain opacity-80 pointer-events-none z-10" />

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.2 }} variants={staggerContainer} className="relative z-20 space-y-10 pt-4">
            
            <motion.div 
              variants={fadeInUp} 
              className="relative bg-[#3f070e] rounded-t-[140px] rounded-b-3xl border border-amber-500/40 p-[5px] shadow-2xl mx-auto max-w-[320px]"
            >
              <div className="border border-amber-500/30 rounded-t-[140px] rounded-b-3xl px-6 pt-16 pb-12 flex flex-col items-center space-y-7 relative overflow-hidden bg-[#4d0a13]">
                
                <div className="absolute top-0 left-0 w-full h-32 opacity-20 pointer-events-none bg-gradient-to-b from-black/50 to-transparent"></div>
                
                <div className="space-y-2 z-10">
                  <span className="font-cinzel text-amber-400 font-bold text-sm tracking-[0.2em] uppercase drop-shadow-md">
                    {data.eventName || 'Resepsi Nikah'}
                  </span>
                  <div className="w-20 h-[1px] bg-amber-400/60 mx-auto"></div>
                </div>

                <div className="space-y-3 z-10 w-full">
                  <div className="font-serif-wedding text-[24px] leading-snug text-white tracking-wide drop-shadow-md px-2">
                    <p>Minggu,</p>
                    <p className="text-amber-200">06 September 2026</p>
                  </div>
                  <div className="inline-flex items-center justify-center gap-2 bg-[#2a0307] px-6 py-2.5 rounded-full border border-amber-500/10 text-amber-300 text-[11px] font-bold tracking-widest shadow-inner mt-2">
                    {data.eventTime || '10:00 WIB - Selesai'}
                  </div>
                </div>

                <div className="w-full flex items-center justify-center gap-4 opacity-90 py-1 z-10">
                  <div className="h-[1px] w-14 bg-amber-500/40"></div>
                  <span className="text-amber-400 text-lg">❦</span>
                  <div className="h-[1px] w-14 bg-amber-500/40"></div>
                </div>

                <div className="space-y-3 z-10">
                  <h3 className="font-serif-wedding text-[22px] font-bold text-amber-400 drop-shadow-md">
                    {data.location || 'Kediaman Mempelai Pria'}
                  </h3>
                  <p className="text-[11.5px] text-stone-200/90 leading-relaxed max-w-[250px] mx-auto">
                    {data.address || defaultAddress}
                  </p>
                </div>

                <motion.a
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  href="https://maps.app.goo.gl/cGiXjHXsbDug16q57"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex items-center gap-2 bg-[#eab308] hover:bg-[#ca8a04] text-[#3f070e] font-black py-3.5 px-8 rounded-full text-[10px] uppercase tracking-widest shadow-[0_0_15px_rgba(234,179,8,0.4)] transition-all cursor-pointer z-10 border border-amber-300/50"
                >
                  <span>📍 Lihat Peta Lokasi</span>
                </motion.a>

              </div>
            </motion.div>
            
          </motion.div>
        </section>

        {/* 6. SECTION: OUR STORY */}
        <section className="relative px-6 py-24 bg-gradient-to-b from-[#3a060d] to-[#4d0a13] text-center overflow-hidden border-t border-amber-500/20">
          
          <img src={ASSETS.roseGif} alt="Rose Left" className="absolute -left-12 top-10 w-40 h-40 opacity-70 pointer-events-none rotate-12 z-0" />
          <img src={ASSETS.roseGif} alt="Rose Right" className="absolute -right-12 bottom-10 w-40 h-40 opacity-70 pointer-events-none transform scale-x-[-1] -rotate-12 z-0" />
          
          <img src={ASSETS.lotusGif} alt="Lotus Top" className="absolute left-1/2 -translate-x-1/2 -top-12 w-48 h-48 opacity-40 pointer-events-none z-0" />

          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true }} 
            variants={fadeInUp} 
            className="space-y-6 relative z-10 bg-[#641823]/60 backdrop-blur-md p-8 rounded-3xl border border-amber-500/30 max-w-sm mx-auto shadow-2xl"
          >
            <div className="space-y-2">
              <h2 className="font-wedding-title text-5xl text-amber-300 drop-shadow-lg">Our Story</h2>
              <div className="w-12 h-[1px] bg-amber-400/50 mx-auto"></div>
            </div>
            
            <p className="text-[11px] text-stone-200/95 leading-relaxed text-center font-light drop-shadow-sm">
              Berawal dari perjumpaan yang sederhana, kami tak pernah menyangka bahwa takdir akan mengikat hati kami begitu kuat. Setiap tawa, setiap ujian, dan setiap momen yang kami lalui bersama telah menumbuhkan keyakinan bahwa kami diciptakan untuk saling melengkapi. Kini, dengan restu keluarga dan doa dari orang-orang tersayang, kami siap melangkah ke pelaminan, memulai lembaran baru dalam ikatan suci pernikahan yang kekal abadi.
            </p>
          </motion.div>
        </section>

        {/* 7. SECTION: GALLERY */}
        <section className="relative px-4 pt-24 pb-36 bg-[#3a060d] text-center overflow-hidden border-t border-amber-500/20">
          
          <div 
            className="absolute inset-0 bg-repeat opacity-[0.15] pointer-events-none z-0" 
            style={{ backgroundImage: `url(${ASSETS.rosePatternBg})`, backgroundSize: '180px' }} 
          />
          
          <img src={ASSETS.pucukRebungTop} alt="Ornamen Atas" className="absolute top-0 inset-x-0 w-full object-contain opacity-80 pointer-events-none z-10" />
          <img src={ASSETS.pucukRebungBottom} alt="Ornamen Bawah" className="absolute bottom-0 inset-x-0 w-full object-contain opacity-80 pointer-events-none z-10" />

          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-8 relative z-20">
            <motion.div variants={fadeInUp} className="space-y-2">
              <h2 className="font-wedding-title text-5xl text-amber-300 drop-shadow-lg">Galeri Momen</h2>
              <p className="text-xs text-stone-300/90">Potret kebahagiaan kami dalam bingkai kenangan.</p>
            </motion.div>

            <div className="grid grid-cols-3 gap-1.5 max-w-[340px] mx-auto">
              {tempGalleryImages.map((imgUrl, idx) => (
                <motion.div 
                  key={idx} 
                  variants={fadeInUp}
                  className="relative w-full aspect-[3/4] overflow-hidden rounded-xl shadow-md border border-amber-500/20"
                >
                  <img 
                    src={imgUrl} 
                    alt={`Galeri ${idx + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-110" 
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* 8. GABUNGAN: RSVP & UCAPAN DOA */}
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

              <div>
                <label className="block text-[11px] text-amber-200 mb-1 text-left">Konfirmasi Kehadiran</label>
                <select
                  value={formData.attendance}
                  onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                  className="w-full bg-[#641823]/90 border border-amber-500/30 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="Hadir" className="bg-[#4d0a13]">Hadir</option>
                  <option value="Tidak Hadir" className="bg-[#4d0a13]">Tidak Hadir</option>
                  <option value="Ragu-Ragu" className="bg-[#4d0a13]">Ragu-Ragu</option>
                </select>
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
                disabled={isLoading}
                className="w-full bg-[#851824] hover:bg-[#641823] disabled:opacity-50 border border-amber-400/40 text-amber-200 font-bold py-3 rounded-xl text-xs uppercase tracking-wider transition-colors shadow-lg cursor-pointer"
              >
                {isLoading ? 'Mengirim...' : 'Kirim Konfirmasi & Ucapan'}
              </motion.button>
            </form>

            <div className="space-y-3 max-w-sm mx-auto max-h-72 overflow-y-auto pr-1 pt-2">
              {isFetching ? (
                <p className="text-xs text-amber-200 text-center animate-pulse py-4">Memuat ucapan dan doa...</p>
              ) : wishesList.length === 0 ? (
                <p className="text-xs text-stone-300 text-center py-4">Belum ada ucapan. Jadilah yang pertama memberikan doa restu!</p>
              ) : (
                wishesList.map((item, idx) => (
                  <div key={idx} className="bg-[#641823] p-3.5 rounded-2xl border border-amber-500/20 text-left space-y-1 shadow-md">
                    <div className="flex justify-between items-center border-b border-amber-500/10 pb-1.5">
                      <span className="font-bold text-xs text-amber-300">{item.name}</span>
                      <div className="flex items-center gap-1.5">
                        <span className={`text-[9px] px-2 py-0.5 rounded-full font-semibold ${item.attendance === 'Hadir' ? 'bg-emerald-900/80 text-emerald-200 border border-emerald-500/30' : 'bg-stone-800 text-stone-300'}`}>
                          {item.attendance}
                        </span>
                      </div>
                    </div>
                    <p className="text-xs text-stone-200 leading-relaxed pt-1 whitespace-pre-wrap">{item.message}</p>
                  </div>
                ))
              )}
            </div>
          </motion.div>
        </section>

        {/* 9. DIGITAL GIFT & PHYSICAL GIFT */}
        <section className="px-6 py-16 text-center space-y-6 relative overflow-hidden bg-[#3a060d]">
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="space-y-6 relative z-10">
            <div className="space-y-2">
              <h2 className="font-wedding-title text-5xl text-amber-200">Kirim Hadiah</h2>
              <p className="text-xs text-stone-300 leading-relaxed max-w-xs mx-auto">
                Doa restu Anda merupakan karunia yang sangat berarti. Namun jika Anda ingin memberikan tanda kasih, Anda dapat menyalurkannya melalui:
              </p>
            </div>

            <div className="space-y-5 max-w-xs mx-auto">
              
              {/* REKENING BCA MEMPELAI PRIA */}
              <div className="bg-[#4d0a13] p-6 rounded-3xl border border-amber-500/30 space-y-4 text-left shadow-2xl relative">
                <div className="flex justify-between items-center">
                  <div className="bg-white/90 p-1.5 rounded-md shadow-sm flex items-center justify-center">
                    <img src={ASSETS.bcaLogo} alt="BCA" className="h-4 object-contain" />
                  </div>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-400/30 px-2.5 py-1 rounded-full font-semibold">
                    Bank Transfer
                  </span>
                </div>
                <div>
                  <p className="text-[11px] text-stone-400 uppercase tracking-wider">Pengantin</p>
                  <p className="font-mono text-lg font-bold text-amber-200 tracking-wider pt-0.5">
                    {data.groomBankNumber || '7005805091'}
                  </p>
                  <p className="text-xs text-stone-300">
                    a.n. {data.groomBankHolder || data.groomName || 'Mustofa Abdulmajid'}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(data.groomBankNumber || '7005805091', `Rekening Pengantin Pria`)}
                  className="w-full bg-[#641823] hover:bg-[#851824] border border-amber-400/40 text-amber-200 text-xs font-bold py-2.5 rounded-xl transition-colors text-center shadow-md cursor-pointer"
                >
                  📋 Salin Rekening 
                </button>
              </div>

              {/* REKENING BCA MEMPELAI WANITA */}
              <div className="bg-[#4d0a13] p-6 rounded-3xl border border-amber-500/30 space-y-4 text-left shadow-2xl relative">
                <div className="flex justify-between items-center">
                  <div className="bg-white/90 p-1.5 rounded-md shadow-sm flex items-center justify-center">
                    <img src={ASSETS.bcaLogo} alt="BCA" className="h-4 object-contain" />
                  </div>
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
                  onClick={() => copyToClipboard(data.brideBankNumber || '7005245265', `Rekening Pengantin Wanita`)}
                  className="w-full bg-[#641823] hover:bg-[#851824] border border-amber-400/40 text-amber-200 text-xs font-bold py-2.5 rounded-xl transition-colors text-center shadow-md cursor-pointer"
                >
                  📋 Salin Rekening 
                </button>
              </div>

              {/* KIRIM HADIAH FISIK (ALAMAT) */}
              <div className="bg-[#4d0a13] p-6 rounded-3xl border border-amber-500/30 space-y-4 text-left shadow-2xl relative">
                <div className="flex justify-between items-center">
                  <span className="font-black text-lg tracking-wide text-amber-300 drop-shadow-md">
                    Hadiah Fisik
                  </span>
                  <span className="text-[10px] bg-amber-500/20 text-amber-300 border border-amber-400/30 px-2.5 py-1 rounded-full font-semibold">
                    Alamat Rumah
                  </span>
                </div>
                <div>
                  <p className="text-[11px] text-stone-400 uppercase tracking-wider mb-1">Kirim Ke Alamat:</p>
                  <p className="text-xs text-stone-200 leading-relaxed">
                    {data.giftAddress || defaultAddress}
                  </p>
                </div>
                <button
                  onClick={() => copyToClipboard(data.giftAddress || defaultAddress, `Alamat Pengiriman`)}
                  className="w-full bg-[#641823] hover:bg-[#851824] border border-amber-400/40 text-amber-200 text-xs font-bold py-2.5 rounded-xl transition-colors text-center shadow-md cursor-pointer"
                >
                  📍 Salin Alamat
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