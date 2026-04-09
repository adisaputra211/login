# Next.js Authentication System (MySQL)

Aplikasi autentikasi (login/register) berbasis **Next.js** menggunakan database **MySQL** murni tanpa ORM, diamankan dengan enkripsi `bcrypt` dan JSON Web Tokens (`jose`). Diperuntukkan sebagai referensi setup custom auth stack.

## 🚀 Fitur Utama
- **Custom Authentication**: Login dan pendataan user menggunakan Bcrypt & JWT (`jose`).
- **MySQL Integration**: Menggunakan `mysql2/promise` tanpa abstraksi ekstra (raw SQL queries).
- **Auto-Initialization**: Terdapat script helper untuk membuat database dan tabel yang dibutuhkan secara instan.
- **Demo User Seed**: Otomatis menyediakan akun demo saat inisialisasi awal.

## 🛠️ Stack Teknologi
- [Next.js](https://nextjs.org/) (App Router)
- [React](https://react.dev/)
- [MySQL2](https://www.npmjs.com/package/mysql2)
- [Bcrypt](https://www.npmjs.com/package/bcrypt) & [Jose](https://www.npmjs.com/package/jose) (JWT)

---

## ⚙️ Persyaratan Sistem (Prerequisites)
Sebelum menjalankan, pastikan Anda telah menginstal:
- [Node.js](https://nodejs.org/) (Disarankan versi 18.x ke atas)
- [MySQL Server](https://www.mysql.com/) lokal yang sedang berjalan (aktif)

---

## 📦 Panduan Instalasi (Getting Started)

Langkah-langkah untuk menyiapkan dan menjalankan project ini di komputer Anda (Local Environment).

### 1. Instalasi Package
Buka terminal di dalam folder project ini, lalu install semua dependensi:
```bash
npm install
```

### 2. Pengaturan Database (.env.local)
Karena file `.env.local` tidak disertakan di Git demi keamanan, silakan buat filenya dari contoh yang tersedia:
```bash
# Windows (CMD/Powershell)
copy .env.example .env.local

# Mac/Linux (Terminal)
cp .env.example .env.local
```
> **Penting:** Buka file `.env.local` lalu pastikan variabel kredensial (seperti `DB_USER`, `DB_PASSWORD`, dan `DB_NAME`) sudah disesuaikan dengan MySQL lokal Anda.

### 3. Inisialisasi Database
Pastikan bahwa service MySQL sudah berjalan di belakang layar. Anda dapat mengeksekusi script helper ini yang secara otomatis membuat *database*, *table*, hingga akun sampel:
```bash
npx tsx src/lib/init-db.js
```
Jika sukses, terminal akan menampilkan pesan `Database initialization completed successfully!`.

### 4. Mulai Server Development
Lakukan start pada local environment server:
```bash
npm run dev
```
Akses hasil run pada browser menuju alamat **[http://localhost:3000](http://localhost:3000)**.

---

## 🔑 Akun Demo (Default Seed)
Setelah langkah nomor 3 (Inisialisasi Database) telah ter-eksekusi, sistem secara otomatis mendaftarkan akun ini:
- **Email/Username**: `admin@example.com` atau `admin`
- **Password**: `password123`


