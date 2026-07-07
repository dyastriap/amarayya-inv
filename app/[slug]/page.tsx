// src/app/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Template1 from '@/templates/template1/page';
import Template2 from '@/templates/template2/page';

// Pastikan datanya diketik persis seperti ini (case-sensitive)
const mockDatabase: Record<string, { clientName: string; weddingDate: string; templateId: string }> = {
  'budi-dan-ani': {
    clientName: 'Budi & Ani',
    weddingDate: 'Senin, 17 Agustus 2026',
    templateId: 'template1',
  },
  'clara-dan-david': {
    clientName: 'Clara & David',
    weddingDate: 'Sabtu, 12 September 2026',
    templateId: 'template2',
  },
};

// Di Next.js 15, params dibungkus di dalam Promise
interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function InvitationPage({ params }: PageProps) {
  // 1. Wajib pakai await untuk mengambil isi slug-nya
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  
  // 2. Ambil data dari mockDatabase berdasarkan slug
  const clientData = mockDatabase[slug];

  // 3. Jika data tidak ketemu, jalankan fungsi notFound() bawaan Next.js
  if (!clientData) {
    return notFound();
  }

  // 4. Render template sesuai templateId
  if (clientData.templateId === 'template1') {
    return <Template1 data={clientData} />;
  }

  if (clientData.templateId === 'template2') {
    return <Template2 data={clientData} />;
  }

  return <div className="p-10 text-center">Template belum dikonfigurasi.</div>;
}