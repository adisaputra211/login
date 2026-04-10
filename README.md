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
Pastikan service MySQL Anda sudah berjalan. Jalankan skrip berikut untuk membuat database, tabel, dan data demo secara otomatis:
```bash
npm run db:init
```
Skrip ini menggunakan `tsx` untuk menjalankan file JavaScript modern secara langsung. Jika berhasil, Anda akan melihat pesan `Database initialization completed successfully!`.

### 4. Mulai Server Development
Lakukan start pada local environment server:
```bash
npm run dev
```
Akses hasil run pada browser menuju alamat **[http://localhost:3000](http://localhost:3000)**.

---

## 🧪 Unit Testing (Bonus)
Aplikasi ini sudah dilengkapi dengan unit test untuk memvalidasi fungsi *auth* dan *form validation*. Gunakan perintah berikut:
```bash
npm test
```
Fitur testing menggunakan **Jest** dan **React Testing Library**.

## 🔑 Akun Demo (Default Seed)
Setelah langkah nomor 3 (Inisialisasi Database) telah ter-eksekusi, sistem secara otomatis mendaftarkan akun ini:
- **Email/Username**: `admin@example.com` atau `admin`
- **Password**: `password123`

---

## 📸 Screenshot Aplikasi
### 1. Tampilan Mobile
<img width="720" height="1600" alt="image" src="https://github.com/user-attachments/assets/9bb7bb7c-0539-436b-93d4-13e0094675b5" />
<img width="720" height="1600" alt="image" src="https://github.com/user-attachments/assets/39134a1a-9947-4054-a9d8-c123be82cfb7" />

### 2. Tampilan Laptop/Desktop
<img width="1907" height="966" alt="pc1" src="https://github.com/user-attachments/assets/f23afa72-10d5-4da0-9624-c0805993fa40" />

### 3. Validasi Password Salah
<img width="985" height="531" alt="image" src="https://github.com/user-attachments/assets/c7f0d78a-223a-43a9-9398-88bdb10391ae" />

### 4. Halaman Dashboard
<img width="1024" height="476" alt="image" src="https://github.com/user-attachments/assets/b03d8ddd-c1f9-4c17-abb5-26f887202595" />

### 5. Rate Limit
<img width="1913" height="984" alt="image" src="https://github.com/user-attachments/assets/ad08e2a4-bb97-418a-86d4-84317ac4e525" />

---



