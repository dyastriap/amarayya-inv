// src/templates/template1/index.tsx
import React from 'react';

interface TemplateProps {
  data: {
    clientName: string;
    weddingDate: string;
  };
}

export default function Template1({ data }: TemplateProps) {
  return (
    <div className="min-h-screen bg-amber-50 text-amber-900 flex flex-col items-center justify-center p-6 text-center">
      <div className="border-4 border-amber-600 p-8 rounded-xl max-w-md bg-white shadow-xl">
        <p className="tracking-widest text-sm uppercase mb-2">The Wedding of</p>
        <h1 className="text-4xl font-serif font-bold my-4 text-amber-800">
          {data.clientName}
        </h1>
        <p className="text-sm italic">Save the Date</p>
        <p className="font-semibold mt-2">{data.weddingDate}</p>
        <div className="mt-6 text-xs text-amber-700">
          *Pilihan Tema: Template 1*
        </div>
      </div>
    </div>
  );
}