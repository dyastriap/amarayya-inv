// src/app/[slug]/page.tsx
import { notFound } from 'next/navigation';
import Template1 from '@/templates/template1/page';
import Template2 from '@/templates/template2/page';

// 1. Tipe Data Client
export interface ClientData {
  clientName: string;
  weddingDate: string;
  templateId: string;
}

// 2. Mock Database
const mockDatabase: Record<string, ClientData> = {
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
  'mustopa-dan-firsta': {
    clientName: 'Mustopa dan Firsta',
    weddingDate: 'Minggu, 06 September 2026',
    templateId: 'template2',
  },
};

// 3. Mapping Komponen Template
const TEMPLATE_COMPONENTS: Record<string, React.ComponentType<{ data: ClientData }>> = {
  template1: Template1,
  template2: Template2,
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function InvitationPage({ params }: PageProps) {
  // Await params (Wajib di Next.js 15)
  const { slug } = await params;
  
  // Ambil data klien dari database
  const clientData = mockDatabase[slug];

  // Jika slug tidak ditemukan, lempar ke halaman 404
  if (!clientData) {
    notFound();
  }

  // Pilih komponen template berdasarkan templateId
  const SelectedTemplate = TEMPLATE_COMPONENTS[clientData.templateId];

  if (!SelectedTemplate) {
    return (
      <div className="min-h-screen flex items-center justify-center p-10 text-center">
        <p className="text-stone-500 font-medium">
          Template <code className="text-rose-600 font-bold">{clientData.templateId}</code> belum dikonfigurasi.
        </p>
      </div>
    );
  }

  return <SelectedTemplate data={clientData} />;
}