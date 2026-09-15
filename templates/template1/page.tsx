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
  /** Foto sampul di layar pembuka. Opsional — tanpa ini, sampul memakai motif emas. */
  coverPhoto?: string;
  /** URL galeri. Kalau kosong, section galeri disembunyikan (bukan tampil rusak). */
  galleryPhotos?: string[];
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

/* -------------------------------------------------------------------------- */
/*  Token warna & motion                                                      */
/* -------------------------------------------------------------------------- */

const INK = '#2c0409'; // maroon tergelap, dasar halaman
const WINE = '#4d0a13'; // maroon utama
const WINE_LIGHT = '#641823'; // maroon panel
const GOLD = '#eab308';
const GOLD_SOFT = 'rgba(234,179,8,0.6)';

const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: 'easeOut' } },
};

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } },
};

/* -------------------------------------------------------------------------- */
/*  Ornamen — semua digambar dari CSS/SVG, tidak ada gambar eksternal          */
/* -------------------------------------------------------------------------- */

/** Border "pucuk rebung" versi CSS: zig-zag tipis di kiri/kanan sebuah section. */
function ZigzagBorder({ side }: { side: 'left' | 'right' }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute top-0 z-20 h-full w-3 sm:w-4 ${
        side === 'left' ? 'left-0' : 'right-0'
      }`}
      style={{
        backgroundImage:
          side === 'left'
            ? `repeating-linear-gradient(115deg, ${GOLD_SOFT} 0 3px, transparent 3px 22px)`
            : `repeating-linear-gradient(65deg, ${GOLD_SOFT} 0 3px, transparent 3px 22px)`,
        opacity: 0.55,
      }}
    />
  );
}

/** Siluet gunung/bukit tipis di dasar sebuah section, pengganti mountainBg. */
function HillSilhouette({ className = '' }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 400 80"
      preserveAspectRatio="none"
      className={`pointer-events-none absolute inset-x-0 bottom-0 h-20 w-full ${className}`}
    >
      <path
        d="M0 80 L0 55 L40 30 L80 50 L130 15 L180 45 L230 25 L280 55 L330 20 L370 48 L400 35 L400 80 Z"
        fill={INK}
        opacity="0.55"
      />
    </svg>
  );
}

/** Siluet atap joglo sederhana, pengganti foto "Rumah Limas". */
function JogloSilhouette() {
  return (
    <svg aria-hidden viewBox="0 0 220 110" className="mx-auto h-28 w-auto opacity-90">
      <path d="M110 6 L200 60 L180 60 L110 26 L40 60 L20 60 Z" fill={GOLD} opacity="0.85" />
      <path d="M110 26 L170 60 L155 60 L110 40 L65 60 L50 60 Z" fill={GOLD} opacity="0.6" />
      <rect x="55" y="60" width="110" height="40" rx="2" fill={INK} opacity="0.7" />
      <rect x="70" y="70" width="18" height="30" fill={WINE} />
      <rect x="132" y="70" width="18" height="30" fill={WINE} />
      <rect x="101" y="72" width="18" height="28" fill={WINE} />
    </svg>
  );
}

/** Lingkaran monogram bergaya cap emas. */
function MonogramSeal({ text, size = 'md' }: { text: string; size?: 'sm' | 'md' }) {
  const dims = size === 'sm' ? 'w-14 h-20 text-2xl' : 'w-16 h-24 text-3xl';
  return (
    <div
      className={`flex items-center justify-center rounded-full border p-1 shadow-inner ${dims}`}
      style={{ borderColor: GOLD_SOFT, background: 'rgba(0,0,0,0.35)' }}
    >
      <span className="font-serif tracking-tighter text-amber-200 drop-shadow">{text}</span>
    </div>
  );
}

/** Bingkai foto dengan fallback otomatis — tidak pernah tampil sebagai ikon gambar rusak. */
function PhotoFrame({
  src,
  alt,
  fallbackInitial,
}: {
  src?: string;
  alt: string;
  fallbackInitial: string;
}) {
  const [broken, setBroken] = useState(false);
  const showPhoto = Boolean(src) && !broken;

  return (
    <div
      className="mx-auto aspect-[3/4] w-[70%] max-w-[220px] overflow-hidden rounded border p-1.5 shadow-xl"
      style={{ borderColor: 'rgba(234,179,8,0.4)', background: WINE_LIGHT }}
    >
      {showPhoto ? (
        <img
          src={src}
          alt={alt}
          onError={() => setBroken(true)}
          className="h-full w-full object-cover object-center"
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center rounded-sm"
          style={{ background: `linear-gradient(160deg, ${WINE} 0%, ${INK} 100%)` }}
        >
          <span className="font-serif text-5xl text-amber-200/60">{fallbackInitial}</span>
        </div>
      )}
    </div>
  );
}

/** Satu ubin galeri dengan fallback pola emas kalau foto belum ada / gagal muat. */
function GalleryTile({ src, index }: { src: string; index: number }) {
  const [broken, setBroken] = useState(false);

  return (
    <div
      className="aspect-[3/4] overflow-hidden rounded-lg border shadow"
      style={{ borderColor: 'rgba(234,179,8,0.2)', background: 'rgba(0,0,0,0.2)' }}
    >
      {!broken ? (
        <img
          src={src}
          alt={`Momen ${index + 1}`}
          onError={() => setBroken(true)}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center text-lg text-amber-300/40"
          style={{ backgroundImage: `repeating-linear-gradient(45deg, ${GOLD_SOFT} 0 2px, transparent 2px 12px)` }}
        >
          ⚜
        </div>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Komponen utama                                                            */
/* -------------------------------------------------------------------------- */

export default function Template1({ data }: TemplateProps) {
  const [isMounted, setIsMounted] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [guestName, setGuestName] = useState<string>('Tamu Undangan');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const hasAudio = Boolean(data?.audioUrl);

  const [formData, setFormData] = useState<CombinedForm>({
    name: '',
    phone: '',
    guests: 1,
    attendance: 'Hadir',
    address: '',
    message: '',
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [wishesList, setWishesList] = useState<WishItem[]>([]);

  const rawNames = data?.clientName ? data.clientName.split(/&|dan/i) : [];
  const groomFirst = data?.groomName ? data.groomName.split(' ')[0] : rawNames[0]?.trim() || 'Mempelai Pria';
  const brideFirst = data?.brideName ? data.brideName.split(' ')[0] : rawNames[1]?.trim() || 'Mempelai Wanita';
  const monogramText = data?.monogram || `${groomFirst.charAt(0)}${brideFirst.charAt(0)}`;
  const defaultAddress = 'Alamat lengkap acara akan diinformasikan lebih lanjut.';
  const galleryImages = data?.galleryPhotos ?? [];

  const fetchWishes = async () => {
    try {
      const res = await fetch(`/api/wishes?clientName=${encodeURIComponent(data?.clientName || '')}`);
      if (res.ok) {
        const fetchedData = await res.json();
        setWishesList(fetchedData);
      }
    } catch (error) {
      console.error('Gagal memuat ucapan:', error);
    } finally {
      setIsFetching(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
    fetchWishes();

    const params = new URLSearchParams(window.location.search);
    const to = params.get('to');
    if (to) setGuestName(to);

    const targetDate = data?.weddingDate
      ? new Date(data.weddingDate).getTime()
      : new Date('2027-11-27T10:00:00').getTime();

    const interval = setInterval(() => {
      const difference = targetDate - Date.now();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000),
        });
      }
    }, 1000);

    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.weddingDate, data?.clientName]);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    if (hasAudio && audioRef.current) {
      audioRef.current
        .play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.warn('Autoplay dibatasi peramban:', err));
    }
  };

  const toggleMusic = () => {
    if (!hasAudio || !audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
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
          clientName: data?.clientName,
          name: formData.name,
          attendance: formData.attendance,
          message: formData.message,
        }),
      });

      if (response.ok) {
        const newWish = await response.json();
        setWishesList((prev) => [newWish, ...prev]);
        setFormData({ name: '', phone: '', guests: 1, attendance: 'Hadir', address: '', message: '' });
      }
    } catch (error) {
      console.error('Gagal mengirim ucapan:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const [copied, setCopied] = useState<string | null>(null);
  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopied(label);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div
      className="min-h-screen overflow-x-hidden font-sans text-white antialiased selection:bg-amber-500 selection:text-black"
      style={{ background: WINE }}
    >
      {hasAudio && <audio ref={audioRef} src={data.audioUrl} loop preload="none" />}

      {/* Tombol musik mengambang — cuma tampil kalau ada audioUrl */}
      {isOpen && hasAudio && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4 }}
          onClick={toggleMusic}
          className="fixed bottom-6 right-6 z-50 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full border-2 border-amber-400/60 text-amber-200 shadow-2xl backdrop-blur-md"
          style={{ background: 'rgba(63,7,14,0.9)' }}
          title={isPlaying ? 'Jeda Musik' : 'Putar Musik'}
        >
          <span className={`text-lg transition-transform duration-700 ${isPlaying ? 'animate-spin' : ''}`}>🎵</span>
          {!isPlaying && <span className="absolute h-0.5 w-full rotate-45 rounded-full bg-red-500" />}
        </motion.button>
      )}

      {/* ---------------------------- COVER / SAMPUL --------------------------- */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            key="cover-overlay"
            initial={{ y: 0 }}
            exit={{ y: '-100%', transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } }}
            className="fixed inset-0 z-50 mx-auto flex min-h-screen max-w-md flex-col items-center justify-between overflow-hidden border-x text-center shadow-2xl"
            style={{ background: WINE, borderColor: 'rgba(120,53,15,0.4)' }}
          >
            {/* Latar sampul: foto kalau ada, kalau tidak motif emas radial */}
            {data?.coverPhoto ? (
              <div
                className="absolute inset-0 z-0 bg-cover bg-center brightness-[0.55]"
                style={{ backgroundImage: `url(${data.coverPhoto})` }}
              />
            ) : (
              <div
                className="absolute inset-0 z-0"
                style={{
                  background: `radial-gradient(120% 70% at 50% 15%, ${WINE_LIGHT} 0%, ${WINE} 55%, ${INK} 100%)`,
                }}
              />
            )}
            <ZigzagBorder side="left" />
            <ZigzagBorder side="right" />

            <div className="z-10 w-full pt-12">
              <MonogramSeal text={monogramText} />
            </div>

            <div className="relative z-10 flex w-full flex-grow flex-col items-center justify-center space-y-4 px-6">
              <div className="space-y-1 text-center">
                <h1 className="font-serif text-4xl font-normal leading-tight tracking-wide text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] sm:text-5xl">
                  {groomFirst}
                </h1>
                <div className="py-0.5 font-serif text-3xl text-amber-300 drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
                  &amp;
                </div>
                <h1 className="font-serif text-4xl font-normal leading-tight tracking-wide text-white drop-shadow-[0_4px_10px_rgba(0,0,0,0.9)] sm:text-5xl">
                  {brideFirst}
                </h1>
              </div>

              <p className="pt-1 text-xs font-medium tracking-wide text-stone-200 drop-shadow">
                Kami mengundang Anda untuk merayakan hari bahagia kami
              </p>

              <div className="w-full max-w-[260px] pb-2 pt-6 text-center">
                <p className="mb-1 text-[11px] font-light text-stone-300 drop-shadow">
                  Kepada Yth. Bapak/Ibu/Saudara/i:
                </p>
                <p className="py-1 font-serif text-2xl font-bold capitalize tracking-wide text-amber-300 drop-shadow">
                  {guestName}
                </p>
              </div>

              <div className="pt-2">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleOpenInvitation}
                  className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full border px-8 py-3 text-xs font-bold uppercase tracking-widest text-amber-200 shadow-xl backdrop-blur-sm transition-all"
                  style={{ background: '#851824', borderColor: 'rgba(251,191,36,0.6)' }}
                >
                  <span>Buka Undangan</span>
                  <span>✉️</span>
                </motion.button>
              </div>
            </div>

            <div className="z-10 w-full pb-8 text-center">
              <p className="text-[11px] tracking-wider text-stone-300 drop-shadow">
                Terima kasih atas kehadiran &amp; doa restu Anda
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ------------------------------ ISI UNDANGAN ---------------------------- */}
      {isOpen && (
        <main className="relative mx-auto min-h-screen max-w-md border-x shadow-2xl" style={{ background: WINE, borderColor: 'rgba(120,53,15,0.3)' }}>
          {/* 1. HERO */}
          <section
            className="relative flex min-h-[85vh] flex-col items-center justify-between overflow-hidden border-b pt-8 text-center"
            style={{ borderColor: 'rgba(234,179,8,0.2)' }}
          >
            <div
              className="pointer-events-none absolute inset-0 z-0"
              style={{ background: `radial-gradient(120% 60% at 50% 0%, ${WINE_LIGHT} 0%, ${WINE} 65%)` }}
            />
            <ZigzagBorder side="left" />
            <ZigzagBorder side="right" />

            <div className="z-10 pt-2">
              <span className="font-serif text-2xl italic tracking-wider text-amber-300">The Wedding Of</span>
            </div>

            <div
              className="relative z-10 my-auto w-[82%] max-w-xs space-y-4 rounded-t-[140px] border px-5 pb-10 pt-8 shadow-2xl backdrop-blur-sm"
              style={{ background: 'rgba(63,7,14,0.45)', borderColor: 'rgba(252,211,77,0.3)' }}
            >
              <div className="mx-auto">
                <MonogramSeal text={monogramText} />
              </div>
              <div className="space-y-1">
                <h1 className="font-serif text-3xl font-normal tracking-wide text-white drop-shadow-md">
                  {groomFirst}
                </h1>
                <div className="font-serif text-2xl text-amber-200">&amp;</div>
                <h1 className="font-serif text-3xl font-normal tracking-wide text-white drop-shadow-md">
                  {brideFirst}
                </h1>
              </div>
            </div>

            <div className="relative z-10 flex h-40 w-full items-end justify-center overflow-hidden pb-4">
              <JogloSilhouette />
            </div>
            <HillSilhouette />
          </section>

          {/* 2. MUKADIMAH & MEMPELAI */}
          <section className="relative overflow-hidden py-14 text-white" style={{ background: WINE_LIGHT }}>
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 z-0 opacity-[0.07]"
              style={{
                backgroundImage: `radial-gradient(${GOLD} 1px, transparent 1px)`,
                backgroundSize: '18px 18px',
              }}
            />

            <div className="relative z-10 space-y-12 px-6 pb-6 pt-10 text-center">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                className="mx-auto max-w-xs space-y-3 border-b pb-8"
                style={{ borderColor: 'rgba(251,191,36,0.2)' }}
              >
                <h2 className="font-serif text-3xl font-normal tracking-wide text-amber-200">Mukadimah</h2>
                <p className="text-xs font-light leading-relaxed text-stone-200">
                  Dengan memohon rahmat dan ridho Allah SWT, kami bermaksud melangsungkan akad serta resepsi
                  pernikahan kami. Kehadiran dan doa restu Bapak/Ibu/Saudara/i menjadi kebahagiaan tersendiri
                  bagi kami berdua.
                </p>
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="space-y-3">
                <PhotoFrame src={data?.groomPhoto} alt={groomFirst} fallbackInitial={groomFirst.charAt(0)} />
                <h3 className="pt-1 font-serif text-2xl font-bold text-white">{data?.groomName || groomFirst}</h3>
                <p className="mx-auto max-w-xs text-xs font-light leading-relaxed text-stone-200/90">
                  {data?.groomParents || 'Putra dari kedua orang tua yang berbahagia'}
                </p>
                {data?.groomIg && (
                  <a
                    href={data.groomIg}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block pt-1 text-xs text-amber-300 underline-offset-2 transition-transform hover:scale-110 hover:underline"
                  >
                    @{data.groomIg.replace(/^https?:\/\/(www\.)?instagram\.com\//i, '').replace(/\/$/, '')}
                  </a>
                )}
              </motion.div>

              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="space-y-3 pt-4">
                <PhotoFrame src={data?.bridePhoto} alt={brideFirst} fallbackInitial={brideFirst.charAt(0)} />
                <h3 className="pt-1 font-serif text-2xl font-bold text-white">{data?.brideName || brideFirst}</h3>
                <p className="mx-auto max-w-xs text-xs font-light leading-relaxed text-stone-200/90">
                  {data?.brideParents || 'Putri dari kedua orang tua yang berbahagia'}
                </p>
                {data?.brideIg && (
                  <a
                    href={data.brideIg}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-block pt-1 text-xs text-amber-300 underline-offset-2 transition-transform hover:scale-110 hover:underline"
                  >
                    @{data.brideIg.replace(/^https?:\/\/(www\.)?instagram\.com\//i, '').replace(/\/$/, '')}
                  </a>
                )}
              </motion.div>
            </div>
          </section>

          {/* 3. COUNTDOWN */}
          <section className="relative overflow-hidden px-6 py-14 text-center" style={{ background: WINE }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="relative z-10 space-y-6">
              <h2 className="font-serif text-3xl font-bold tracking-wide text-amber-200">Save The Date</h2>
              <p className="text-xs font-semibold tracking-wider text-amber-300/90">
                {data?.weddingDate ? new Date(data.weddingDate).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : 'Tanggal menyusul'}
              </p>

              <div className="mx-auto grid max-w-xs grid-cols-4 gap-2 pt-2">
                {isMounted &&
                  [
                    { label: 'HARI', value: timeLeft.days },
                    { label: 'JAM', value: timeLeft.hours },
                    { label: 'MENIT', value: timeLeft.minutes },
                    { label: 'DETIK', value: timeLeft.seconds },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border p-2.5 shadow-lg"
                      style={{ background: 'rgba(63,7,14,0.9)', borderColor: 'rgba(251,191,36,0.3)' }}
                    >
                      <span className="block font-serif text-2xl font-bold text-amber-300">{item.value}</span>
                      <span className="text-[9px] uppercase tracking-widest text-stone-300">{item.label}</span>
                    </div>
                  ))}
              </div>
            </motion.div>
          </section>

          {/* 4. ACARA & LOKASI */}
          <section className="relative px-6 py-16 text-center" style={{ background: INK }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="relative z-10 mx-auto max-w-xs space-y-6 rounded-3xl border p-6 shadow-2xl"
              style={{ background: WINE, borderColor: 'rgba(234,179,8,0.4)' }}
            >
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-400">
                  {data?.eventName || 'Resepsi Pernikahan'}
                </span>
                <div className="mx-auto h-px w-16" style={{ background: 'rgba(251,191,36,0.6)' }} />
              </div>

              <div className="space-y-2">
                <p className="font-serif text-xl text-white">
                  {data?.weddingDate
                    ? new Date(data.weddingDate).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })
                    : 'Tanggal menyusul'}
                </p>
                <span
                  className="inline-block rounded-full border px-4 py-1.5 text-[11px] font-semibold text-amber-300"
                  style={{ background: INK, borderColor: 'rgba(234,179,8,0.2)' }}
                >
                  {data?.eventTime || 'Waktu menyusul'}
                </span>
              </div>

              <div className="space-y-2 text-xs">
                <h4 className="font-serif text-lg font-bold text-amber-300">
                  {data?.location || 'Lokasi Acara'}
                </h4>
                <p className="leading-relaxed text-stone-300">{data?.address || defaultAddress}</p>
              </div>

              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(data?.address || data?.location || '')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 text-xs font-bold uppercase tracking-wider shadow-md transition-all"
                style={{ background: GOLD, color: INK }}
              >
                📍 Lihat Peta Lokasi
              </a>
            </motion.div>
          </section>

          {/* 5. OUR STORY */}
          <section className="relative border-t px-6 py-16 text-center" style={{ background: WINE, borderColor: 'rgba(234,179,8,0.2)' }}>
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="mx-auto max-w-sm space-y-4 rounded-2xl border p-6 shadow-lg"
              style={{ background: 'rgba(100,24,35,0.5)', borderColor: 'rgba(234,179,8,0.3)' }}
            >
              <h2 className="font-serif text-3xl italic text-amber-300">Our Story</h2>
              <p className="text-xs font-light leading-relaxed text-stone-200">
                Berawal dari perjumpaan yang sederhana, kami percaya takdir mempertemukan kami untuk saling
                mengisi. Setiap momen yang terlewati meneguhkan niat kami untuk melangkah bersama ke jenjang
                pernikahan.
              </p>
            </motion.div>
          </section>

          {/* 6. GALLERY — hanya tampil kalau ada fotonya */}
          {galleryImages.length > 0 && (
            <section className="relative border-t px-4 py-16 text-center" style={{ background: INK, borderColor: 'rgba(234,179,8,0.2)' }}>
              <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={staggerContainer} className="space-y-6">
                <div className="space-y-1">
                  <h2 className="font-serif text-3xl italic text-amber-300">Galeri Momen</h2>
                  <p className="text-xs text-stone-300">Potret kebahagiaan dalam bingkai kenangan.</p>
                </div>

                <div className="mx-auto grid max-w-[340px] grid-cols-3 gap-2">
                  {galleryImages.map((src, idx) => (
                    <motion.div key={src + idx} variants={fadeInUp}>
                      <GalleryTile src={src} index={idx} />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </section>
          )}

          {/* 7. RSVP & UCAPAN */}
          <section className="border-t px-6 py-16" style={{ background: WINE, borderColor: 'rgba(234,179,8,0.2)' }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mx-auto max-w-sm space-y-6">
              <div className="space-y-1 text-center">
                <h2 className="font-serif text-3xl italic text-amber-200">Kehadiran &amp; Doa Restu</h2>
                <p className="text-xs text-stone-300">Konfirmasi kehadiran dan ucapan Anda sangat berarti bagi kami.</p>
              </div>

              <form
                onSubmit={handleSubmit}
                className="space-y-3 rounded-2xl border p-5"
                style={{ background: 'rgba(63,7,14,0.8)', borderColor: 'rgba(234,179,8,0.3)' }}
              >
                <div>
                  <label className="mb-1 block text-[11px] text-amber-200">Nama Lengkap *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full rounded-lg border px-3 py-2 text-xs text-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    style={{ background: WINE_LIGHT, borderColor: 'rgba(234,179,8,0.3)' }}
                    placeholder="Nama Anda"
                  />
                </div>

                <div>
                  <label className="mb-1 block text-[11px] text-amber-200">Konfirmasi Kehadiran</label>
                  <select
                    value={formData.attendance}
                    onChange={(e) => setFormData({ ...formData, attendance: e.target.value })}
                    className="w-full rounded-lg border px-3 py-2 text-xs text-white focus:outline-none"
                    style={{ background: WINE_LIGHT, borderColor: 'rgba(234,179,8,0.3)' }}
                  >
                    <option value="Hadir">Hadir</option>
                    <option value="Tidak Hadir">Tidak Hadir</option>
                    <option value="Ragu-Ragu">Ragu-Ragu</option>
                  </select>
                </div>

                <div>
                  <label className="mb-1 block text-[11px] text-amber-200">Ucapan &amp; Doa</label>
                  <textarea
                    rows={3}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-lg border px-3 py-2 text-xs text-white placeholder-stone-400 focus:outline-none focus:ring-1 focus:ring-amber-400"
                    style={{ background: WINE_LIGHT, borderColor: 'rgba(234,179,8,0.3)' }}
                    placeholder="Tulis ucapan dan doa Anda..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full cursor-pointer rounded-lg border py-2.5 text-xs font-bold uppercase tracking-wider text-amber-200 transition-colors disabled:opacity-50"
                  style={{ background: '#851824', borderColor: 'rgba(251,191,36,0.4)' }}
                >
                  {isLoading ? 'Mengirim...' : 'Kirim Ucapan'}
                </button>
              </form>

              <div className="max-h-60 space-y-2.5 overflow-y-auto pr-1">
                {isFetching ? (
                  <p className="py-3 text-center text-xs text-amber-200">Memuat ucapan...</p>
                ) : wishesList.length === 0 ? (
                  <p className="py-3 text-center text-xs text-stone-400">Belum ada ucapan.</p>
                ) : (
                  wishesList.map((item, idx) => (
                    <div
                      key={idx}
                      className="rounded-xl border p-3 text-xs"
                      style={{ background: 'rgba(63,7,14,0.6)', borderColor: 'rgba(234,179,8,0.2)' }}
                    >
                      <div className="mb-1 flex items-center justify-between">
                        <span className="font-bold text-amber-300">{item.name}</span>
                        <span className="text-[10px] text-stone-400">{item.attendance}</span>
                      </div>
                      <p className="font-light leading-relaxed text-stone-200">{item.message}</p>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          </section>

          {/* 8. AMPLOP DIGITAL */}
          <section className="space-y-6 px-6 py-16 text-center" style={{ background: INK }}>
            <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeInUp} className="mx-auto max-w-xs space-y-4">
              <h2 className="font-serif text-3xl italic text-amber-200">Kirim Hadiah</h2>
              <p className="text-xs leading-relaxed text-stone-300">
                Tanda kasih dan doa restu dapat dikirimkan melalui saluran berikut:
              </p>

              {(data?.groomBankNumber || data?.brideBankNumber) && (
                <div className="space-y-2 rounded-2xl border p-4 text-left" style={{ background: WINE, borderColor: 'rgba(234,179,8,0.3)' }}>
                  <span className="text-xs font-bold text-amber-300">Transfer Bank</span>
                  <p className="font-mono text-base font-bold text-amber-200">
                    {data?.groomBankNumber || data?.brideBankNumber}
                  </p>
                  <p className="text-xs text-stone-300">
                    a.n. {data?.groomBankHolder || data?.brideBankHolder || data?.groomName || groomFirst}
                  </p>
                  <button
                    onClick={() => copyToClipboard(data?.groomBankNumber || data?.brideBankNumber || '', 'Nomor Rekening')}
                    className="w-full cursor-pointer rounded-lg border py-1.5 text-xs text-amber-200 transition-colors hover:brightness-110"
                    style={{ background: WINE_LIGHT, borderColor: 'rgba(251,191,36,0.4)' }}
                  >
                    {copied === 'Nomor Rekening' ? 'Tersalin ✓' : 'Salin Rekening'}
                  </button>
                </div>
              )}

              <div className="space-y-2 rounded-2xl border p-4 text-left" style={{ background: WINE, borderColor: 'rgba(234,179,8,0.3)' }}>
                <span className="text-xs font-bold text-amber-300">Kirim Kado Fisik</span>
                <p className="text-xs leading-relaxed text-stone-200">{data?.giftAddress || defaultAddress}</p>
                <button
                  onClick={() => copyToClipboard(data?.giftAddress || defaultAddress, 'Alamat')}
                  className="w-full cursor-pointer rounded-lg border py-1.5 text-xs text-amber-200 transition-colors hover:brightness-110"
                  style={{ background: WINE_LIGHT, borderColor: 'rgba(251,191,36,0.4)' }}
                >
                  {copied === 'Alamat' ? 'Tersalin ✓' : 'Salin Alamat'}
                </button>
              </div>
            </motion.div>
          </section>

          {/* FOOTER */}
          <footer className="space-y-4 border-t px-6 py-12 text-center text-xs text-stone-300" style={{ background: INK, borderColor: 'rgba(234,179,8,0.2)' }}>
            <h3 className="font-serif text-3xl italic text-amber-200">Terima Kasih</h3>
            <p className="mx-auto max-w-xs text-xs font-light text-stone-300">
              Atas kehadiran dan doa restu Bapak/Ibu/Saudara/i sekalian.
            </p>
            <p className="pt-2 font-serif text-xl text-amber-200">
              {groomFirst} &amp; {brideFirst}
            </p>
            <p className="border-t pt-4 text-[10px] opacity-60" style={{ borderColor: 'rgba(234,179,8,0.1)' }}>
              Amarayya Invitation
            </p>
          </footer>
        </main>
      )}
    </div>
  );
}