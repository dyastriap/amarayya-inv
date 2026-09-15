/* Satu sumber kebenaran untuk seluruh halaman. Ubah angka & teks di sini saja. */

export const WA = 'https://wa.me/6281234567890';
export const IG = 'https://instagram.com/amarayya';
export const ALAMAT = 'Jl. Contoh No. 12, Bogor';
export const JAM = '09.00–21.00 WIB';

export type ServiceKey = 'undangan' | 'studio' | 'photobooth';

export type Service = {
  key: ServiceKey;
  label: string;
  href: string;
  tagline: string;
  line: string;
  points: string[];
  /** kelas latar "seamless paper" milik layanan ini */
  sweep: string;
  /** warna isi latar polos yang serasi dengan sweep di atas */
  solid: string;
};

export const services: Service[] = [
  {
    key: 'undangan',
    label: 'Undangan digital',
    href: '/layanan/undangan-digital',
    tagline: 'Sebar lewat WhatsApp',
    line: 'Undangan website yang dibuka tamu langsung dari HP, lengkap dengan nama mereka.',
    points: ['Nama tamu otomatis', 'RSVP masuk real-time', 'Peta lokasi & amplop digital'],
    sweep: 'sweep-blush',
    solid: '#EFD8D2',
  },
  {
    key: 'studio',
    label: 'Self photo studio',
    href: '/layanan/self-photo-studio',
    tagline: 'Foto tanpa fotografer',
    line: 'Ruangan, lampu, dan remote di tangan kamu. Cetak keluar sebelum kamu selesai ganti baju.',
    points: ['Sesi 15–40 menit', 'Cetak jadi dalam 60 detik', 'File mentah dikirim hari itu'],
    sweep: 'sweep-lilac',
    solid: '#DFD8EE',
  },
  {
    key: 'photobooth',
    label: 'Photobooth event',
    href: '/layanan/photobooth-event',
    tagline: 'Kami datang ke lokasi',
    line: 'Booth, printer, properti, dan operator kami bawa ke tempat acara kamu.',
    points: ['Frame custom sesuai tema', 'Cetak tanpa batas selama sewa', 'Operator standby di lokasi'],
    sweep: 'sweep-mint',
    solid: '#D6E3DC',
  },
];

export const serviceByKey = (k: ServiceKey) => services.find((s) => s.key === k)!;

/* -------------------------------------------------------------------------- */

export type Plan = {
  name: string;
  price: string;
  unit: string;
  items: string[];
  featured?: boolean;
};

export const pricing: Record<ServiceKey, Plan[]> = {
  undangan: [
    {
      name: 'Hemat',
      price: 'Rp49.000',
      unit: 'aktif 3 bulan',
      items: ['Template standar', 'Info acara & hitung mundur', 'Peta Google Maps', 'Tanpa musik dan RSVP'],
    },
    {
      name: 'Standard',
      price: 'Rp79.000',
      unit: 'aktif 6 bulan',
      featured: true,
      items: [
        'Semua template terbuka',
        'Musik latar 1 lagu',
        'RSVP & buku tamu',
        'Galeri 5 foto',
        'Sebar nama tamu otomatis',
      ],
    },
    {
      name: 'Premium',
      price: 'Rp99.000',
      unit: 'aktif 1 tahun',
      items: [
        'Semua fitur Standard',
        'Galeri foto & video tanpa batas',
        'Love story timeline',
        'Amplop digital',
        'Admin prioritas',
      ],
    },
  ],
  studio: [
    {
      name: 'Solo',
      price: 'Rp45.000',
      unit: '1–2 orang, 15 menit',
      items: ['15 menit di dalam studio', '2 lembar cetak 4R', 'Semua file mentah', 'Properti dasar'],
    },
    {
      name: 'Friends',
      price: 'Rp85.000',
      unit: '3–5 orang, 25 menit',
      featured: true,
      items: [
        '25 menit di dalam studio',
        '4 lembar cetak + 1 strip',
        'Semua file mentah',
        'Pilihan 3 warna latar',
        'Properti lengkap',
      ],
    },
    {
      name: 'Rombongan',
      price: 'Rp135.000',
      unit: '6–10 orang, 40 menit',
      items: ['40 menit di dalam studio', '8 lembar cetak', 'Semua file mentah', 'Studio dipakai sendiri', 'Ruang ganti'],
    },
  ],
  photobooth: [
    {
      name: '3 jam',
      price: 'Rp1.500.000',
      unit: 'ulang tahun, gathering kecil',
      items: ['Booth + printer di lokasi', 'Cetak tanpa batas 3 jam', 'Frame custom 1 desain', '1 operator'],
    },
    {
      name: '5 jam',
      price: 'Rp2.500.000',
      unit: 'resepsi & acara kantor',
      featured: true,
      items: [
        'Booth + printer di lokasi',
        'Cetak tanpa batas 5 jam',
        'Frame custom 2 desain',
        'Backdrop & properti tema',
        '2 operator',
        'Galeri online untuk tamu',
      ],
    },
    {
      name: 'Full day',
      price: 'Rp4.000.000',
      unit: '8 jam, akad sampai resepsi',
      items: [
        'Booth + printer di lokasi',
        'Cetak tanpa batas 8 jam',
        'Frame bebas',
        'Album tamu fisik',
        '2 operator',
        'Video boomerang',
      ],
    },
  ],
};

/* -------------------------------------------------------------------------- */

export const templates = [
  {
    id: 'template1',
    name: 'Kirana',
    style: 'Adat Jawa, aksen emas',
    desc: 'Ornamen ukir dan tipografi klasik untuk resepsi adat. Cocok kalau acaranya pakai pakem tradisional.',
    demoSlug: 'budi-dan-ani',
    swatch: 'from-[#7A2E3C] to-[#2A0C10]',
  },
  {
    id: 'template2',
    name: 'Lumen',
    style: 'Minimalis, banyak ruang kosong',
    desc: 'Foto jadi bintang utama, teks seperlunya. Pilihan aman untuk konsep garden atau intimate wedding.',
    demoSlug: 'clara-dan-david',
    swatch: 'from-[#DFD8EE] to-[#B9AED6]',
  },
];