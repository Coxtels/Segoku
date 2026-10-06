# 🍱 Pawon Selera Catering — Landing Page & Order Calculator

Web landing page modern dan interaktif untuk layanan katering nusantara (*Pawon Selera*). Dilengkapi dengan katalog menu dinamis, kalkulator estimasi biaya *real-time*, dan generator pesanan instan ke WhatsApp.

Didesain dengan pendekatan **mobile-first**, aksesibilitas yang baik, serta struktur kode modular tanpa ketergantungan framework berat (*pure Vanilla Web Stack*).

---

## Fitur Utama

1. **Hero Section & Nilai Kepercayaan (Trust Signals)**
   - Copywriting fokus solusi untuk kebutuhan rapat kantor, acara keluarga, dan syukuran.
   - Badge jaminan mutu: *100% Halal*, *Dapur Higienis*, dan *Garansi Tiba Tepat Waktu*.
   - Tombol Call-to-Action (CTA) langsung menuju kalkulator atau katalog menu.

2. **Katalog Menu Dinamis**
   - Filter kategori cepat (*Semua Menu*, *Nasi Box*, *Prasmanan*, *Snack Box*).
   - Kartu menu interaktif dilengkapi foto, harga per pax, info minimal order, dan deskripsi paket.
   - Tombol *"Pilih Menu & Hitung"* yang langsung mengarahkan dan mengisi pilihan ke kalkulator.

3. **Kalkulator Simulasi Biaya Transparan (Live Calculation)**
   - Pilihan paket menu dari dropdown yang terhubung dengan data master.
   - Pengatur jumlah porsi (pax) dengan tombol stepper (`-5`, `-1`, input manual, `+1`, `+5`).
   - Validasi batas minimum pemesanan (*minimum order protection*).
   - Opsi menu pelengkap (*add-ons*) fleksibel yang dihitung proporsional per pax.
   - Formulir jadwal pengantaran (tanggal acara minimal H+1, pilihan jam santap/coffee break, alamat pengiriman, dan catatan khusus).
   - Panel ringkasan rincian biaya transparan (*subtotal menu*, *rincian add-ons*, *biaya per pax*, dan *estimasi total*).

4. **Generator Pesanan WhatsApp Otomatis**
   - Menghasilkan format pesan WhatsApp yang rapi, detail, dan profesional dalam sekali klik tanpa perlu mengetik ulang rincian pesanan.

5. **Sticky Mobile Order Bar**
   - Bar ringkasan mengambang di bagian bawah khusus layar smartphone, memudahkan pengguna melihat estimasi total biaya dan melanjutkan pesanan kapan saja.

6. **Panduan Pemesanan & Informasi Dapur**
   - 3 langkah praktis alur pemesanan (Pilih & Hitung -> Konfirmasi WA -> Masak Fresh & Antar).
   - Komitmen kualitas bahan dan ketentuan pembayaran fleksibel (DP 50%).
   - Alamat fisik dapur, jam operasional layanan, dan tombol chat konsultasi.

---

## Teknologi yang Digunakan

- **HTML5:** Struktur semantik, aksesibel, dan ramah SEO.
- **CSS / Tailwind CSS:** Utility-first CSS framework via CDN dengan kustomisasi tema palet kuliner (*brand warmth*).
- **Vanilla JavaScript (ES6+):** Logika kalkulator, manipulasi DOM reaktif, dan penanganan event tanpa dependensi pihak ketiga.
- **Google Fonts:** Tipografi modern menggunakan *Plus Jakarta Sans*.

---

## Struktur Direktori & Berkas

```text
Segoku/
├── index.html              # Struktur utama markup HTML landing page
├── css/
│   └── style.css           # Styling kustom (focus-visible states & touch targets)
├── js/
│   ├── tailwind-config.js  # Konfigurasi tema, palet warna katering, & font
│   ├── data.js             # Data master katering (brand, kategori, menu, & add-ons)
│   ├── calculator.js       # Logika kalkulasi biaya, add-on, & format pesan WhatsApp
│   └── app.js              # Siklus render katalog, filter kategori, & event listeners
├── Catatan.md              # Dokumen handoff & spesifikasi API untuk Backend Developer
└── README.md               # Dokumentasi umum proyek landing page
```

---

## Cara Menjalankan Proyek

Proyek ini tidak memerlukan proses *build* atau instalasi `npm`. Anda dapat menjalankannya langsung:

### Opsi 1: Buka Langsung di Browser
Klik dua kali berkas `index.html` atau buka melalui browser pilihan Anda.

### Opsi 2: Menggunakan VS Code Live Server
1. Buka folder proyek di VS Code.
2. Klik kanan pada berkas `index.html` -> pilih **"Open with Live Server"**.

### Opsi 3: Menggunakan Python Local Server
Jalankan perintah berikut di terminal:
```bash
python -m http.server 8000
```
Lalu buka browser di `http://localhost:8000`.

### Opsi 4: Menggunakan Node.js
```bash
npx serve .
```

---
