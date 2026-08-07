// lib/db.ts
import mysql from 'mysql2/promise';

// Sesuaikan dengan konfigurasi Laragon kamu
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Kosongkan jika Laragon default tanpa password
  database: 'wedding_db',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

export default pool;