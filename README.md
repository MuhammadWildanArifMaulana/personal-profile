# Personal Profile — Wildan Arif

Sebuah portofolio personal yang dirancang untuk memamerkan karya desain dan proyek web dengan tampilan profesional dan modern. Fokus pada pengalaman pengguna (UX), estetika UI, dan performa — sehingga pengunjung langsung mendapatkan kesan profesional.

## Sorotan

- Desain bersih, responsif, dan estetis.
- Komponen terstruktur dan dapat digunakan ulang untuk kecepatan pengembangan.
- Performa diperhatikan: lazy-loading, ukuran bundle yang efisien, dan praktik pencegahan layout shift.

Teknologi utama: React, Tailwind CSS, Create React App.

## Persyaratan

- Node.js v16 atau lebih tinggi direkomendasikan
- npm (atau yarn) tersedia

## Instalasi

1. Pasang dependency:

```powershell
npm install
```

2. Jalankan development server:

```powershell
npm start
```

Halaman akan tersedia di http://localhost:3000 dan akan reload otomatis saat kamu mengubah kode.

## Build untuk production

Untuk membuat bundle production:

```powershell
npm run build
```

Hasil build akan berada di folder `build/`.

## Responsivitas

Proyek ini dirancang agar tampil baik di berbagai ukuran layar menggunakan Tailwind CSS.

- Breakpoint Tailwind: gunakan kelas responsif seperti `sm:`, `md:`, `lg:`, `xl:` untuk menyesuaikan tata letak pada lebar tertentu (mis. `flex-col lg:flex-row`).
- Kontainer fleksibel: gunakan utilitas `w-full`, `max-w-...`, `mx-auto`, dan grid/flex untuk membuat layout fleksibel.
- Gambar dan media: gunakan `object-cover`, ukuran kontainer yang responsif (mis. `h-36 sm:h-44 lg:h-48`) atau utility aspect-ratio untuk menjaga rasio dan mencegah layout shift.
- Hindari Cumulative Layout Shift (CLS): tetapkan `width`/`height` atau gunakan class aspect-ratio (Tailwind plugin) sehingga ruang gambar sudah dipesankan sebelum gambar dimuat.
- Testing: cek tampilan responsif dengan DevTools (Device Toolbar), serta uji pada perangkat nyata bila memungkinkan.
- Lazy-loading: gambar pada proyek ini sudah diberi `loading="lazy"` untuk mengurangi beban awal halaman.

## .gitignore dan keamanan

## Struktur Folder & Praktik Penulisan Kode

Bagian ini menjelaskan bagaimana folder dan komponen tersusun serta beberapa praktik coding yang disarankan untuk menjaga konsistensi dan keterbacaan kode.

- Folder dan komponen tersusun rapi: simpan komponen UI di `src/components/`, halaman di `src/pages/`, aset di `src/assets/` (mis. `images`, `fonts`). Pisahkan logic besar ke folder `utils/` atau `services/` bila perlu.
- Styling menggunakan Tailwind secara efisien: gunakan utility classes Tailwind untuk membangun layout dan styling. Hindari membuat class CSS kustom berlebihan jika utility sudah mencukupi. Manfaatkan `@apply` hanya jika perlu untuk komponen yang sering dipakai.
- Setiap bagian dibuat terpisah dan reusable: buat komponen kecil dan terpisah (isolated), berikan props yang jelas, dan hindari komponen monolitik. Contoh: `HeroSection`, `Navbar`, `Footer`, `PortfolioCard`.
- Penamaan class, indentasi, dan struktur kode bersih: gunakan penamaan yang konsisten (kebab-case untuk file jika perlu, PascalCase untuk komponen React), 2 spasi atau 2 tabs sesuai konsistensi proyek, dan tambahkan komentar singkat bila sebuah blok kompleks.

  - Best practices:

    - Komponen menerima props yang jelas dan memiliki default props bila perlu.
    - Pisahkan presentational dan logic (hooks atau container components) jika logika kompleks diperlukan.
    - Tambahkan PropTypes atau TypeScript untuk dokumentasi tipe (opsional tetapi direkomendasikan untuk project yang berkembang).

  - Semua gambar menggunakan WebP:
    - Direkomendasikan menyimpan versi WebP dari semua aset gambar (lebih kecil dan efisien). Jika sumber masih dalam JPG/PNG, konversi sebelum deploy atau saat pipeline CI.
    - Jika kamu butuh fallback untuk browser yang tidak mendukung WebP, gunakan pattern `<picture>` + `<source type="image/webp" ...>` dan fallback `<img>`.

- File `.env` dan variannya diabaikan oleh `.gitignore`. Jangan commit kredensial atau API keys. Gunakan fitur environment variables di hosting kamu (Vercel/Netlify/GitHub Actions).
- `node_modules/`, `build/`, dan `coverage/` juga diabaikan.

## Deploy

Beberapa opsi umum:

- Vercel: pilih repository, set build command `npm run build` (Vercel melakukan instalasi otomatis). Tambahkan env vars di dashboard.
- Netlify: hubungkan repo, set build command `npm run build` dan publish directory `build/`.
- GitHub Pages: gunakan paket `gh-pages` atau workflow GitHub Actions yang menjalankan `npm run build` dan mem-push `build/` ke branch `gh-pages`.

## Testing & Linting

- Jalankan tes (jika ada):

```powershell
npm test
```

- Jika ada script linter di `package.json`, jalankan:

```powershell
npm run lint
```

## Contributing

- Buat branch baru untuk fitur/bugfix.
- Pastikan build lulus dan tidak ada error linting.
- Buat PR dengan deskripsi perubahan.

## Kontak

Jika butuh bantuan lebih lanjut atau ingin menyarankan perbaikan, hubungi pemilik repo.
