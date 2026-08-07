// app/api/wishes/route.ts
import { NextResponse } from 'next/server';
import pool from '@/lib/db';

// GET: Ambil data ucapan
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const clientName = searchParams.get('clientName');

    let query = 'SELECT * FROM wishes ORDER BY createdAt DESC';
    let values: any[] = [];

    // Filter berdasarkan clientName jika ada
    if (clientName) {
      query = 'SELECT * FROM wishes WHERE clientName = ? ORDER BY createdAt DESC';
      values = [clientName];
    }

    const [rows] = await pool.query(query, values);
    return NextResponse.json(rows, { status: 200 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Gagal mengambil data" }, { status: 500 });
  }
}

// POST: Simpan ucapan baru
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { clientName, name, attendance, message } = body;

    if (!name || !message) {
      return NextResponse.json({ error: "Nama dan ucapan wajib diisi" }, { status: 400 });
    }

    // Query untuk insert data
    const query = 'INSERT INTO wishes (clientName, name, attendance, message) VALUES (?, ?, ?, ?)';
    const values = [clientName, name, attendance, message];

    const [result]: any = await pool.query(query, values);

    // Ambil kembali data yang baru saja dimasukkan untuk ditampilkan di Frontend
    const [newWish]: any = await pool.query('SELECT * FROM wishes WHERE id = ?', [result.insertId]);

    return NextResponse.json(newWish[0], { status: 201 });
  } catch (error) {
    console.error("Database Error:", error);
    return NextResponse.json({ error: "Gagal menyimpan data" }, { status: 500 });
  }
}