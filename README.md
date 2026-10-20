# A Glimpse Behind Live Tracking

Materi presentasi dalam bahasa Indonesia tentang perjalanan laporan GPS bus hingga menjadi marker di dashboard. Website menggunakan HTML, CSS, dan JavaScript statis serta dapat dijalankan secara lokal.

## Menjalankan

Dari direktori `website`:

```sh
python3 -m http.server 9000 --directory src
```
*9000 adalah port contoh, ganti sesuai kebutuhan*

Buka `http://localhost:<port>` sesuai port yang Anda pilih. Tautan langsung memakai identitas adegan, misalnya `/#stop-context`. Setiap tautan membuka langkah pertama adegan tersebut.

## Navigasi

Gunakan tombol Lanjut/Kembali, panah kanan/kiri, atau Space. Tombol kontrol tersembunyi ketika mouse diam. Tersedia pilihan layar penuh dan tombol Ulangi ilustrasi pada adegan animasi. Animasi mengikuti pengaturan `prefers-reduced-motion`.

## Mengubah materi

- `src/content.js`: judul, langkah visual, definisi mikro, badge, peta mini, aset, dan nilai contoh.
- `src/app.js`: tampilan presentasi, diagram, dan kontrol.
- `src/style.css`: tata letak dan gaya visual.
- `src/assets/`: aset yang digunakan website.
- `tests/check.test.mjs`: pemeriksaan konten, navigasi, dan aset.
- `archive/`: salinan tampilan sebelumnya yang tetap disimpan.

Aset yang belum tersedia tampil sebagai placeholder berlabel. Letakkan file pada path yang tercatat di `ASSETS.md`; placeholder hilang setelah gambar berhasil dimuat.

## Pemeriksaan

Jalankan dari direktori `website` setelah mengubah materi:

```sh
node --test tests/check.test.mjs
node --check src/app.js
node --check src/content.js
node --check src/navigation.js
```

## Catatan materi

Target durasi dan narasi acuan tersedia di `../storyboard-2.md`. Catatan pembicara disusun terpisah. Website tidak menampilkan mode Baca, catatan pembicara, atau timer.

Nilai pada ilustrasi bukan pengukuran kapasitas, akurasi, atau SLA produksi. Aset dan versi sebelumnya dipertahankan saat materi diperbarui.
