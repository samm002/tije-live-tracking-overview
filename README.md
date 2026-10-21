# A Glimpse Behind Live Tracking: From Bus to Dashboard

Versi 3 — presentasi berbahasa Indonesia tentang perjalanan laporan GPS bus menjadi informasi dashboard. 18 slide dengan 55 langkah; alokasi narasi 23:15 di luar Q&A. Angka waktu merupakan target latihan, belum pengukuran penyampaian manusia.

## Menjalankan

Dari folder repository ini:

```sh
python3 -m http.server 9037 --bind 127.0.0.1 --directory src
```

Buka [preview lokal](http://127.0.0.1:9037/). Port dapat diganti sesuai kebutuhan. Website statis tanpa dependency runtime eksternal atau koneksi ke sistem produksi.

## Navigasi

Panah kanan atau Space membuka langkah berikutnya, lalu slide berikutnya. Panah kiri membalik urutan. Cover dan Q&A masing-masing satu langkah. Tombol Kembali/Lanjut dan fullscreen muncul ketika mouse/touch aktif atau kontrol mendapat fokus keyboard. Animasi menghormati reduced motion.

URL menyimpan ID slide, misalnya `#stop-context`; membuka URL memulai dari langkah pertama. ID tidak dikenal kembali ke cover. Judul tab selalu mengikuti judul materi.

## Mengubah materi

- `src/content.js`: judul, 18 slide, langkah reveal, definisi, minimap, pipeline, aset, dan payload sintetis.
- `src/app.js`: renderer diagram, panel field, cover/Q&A, kontrol, dan navigasi.
- `src/style.css`: layout dan warna raw/snap/state.
- `src/navigation.js`: aturan perpindahan langkah dan URL.
- `src/assets/OBU.png`: foto perangkat dari pengguna, ditampilkan pada slide sumber data.

Payload dipakai sebagai ringkasan pedagogis field pilihan, bukan kontrak integrasi. Perhatikan bahwa source dan keluaran dapat memakai bentuk field berbeda. Raw dan snap tetap dipisahkan. Field ignition bernilai integer 1 diteruskan pada seluruh contoh snapshot. Panel context dan publish memakai enam field pilihan yang sama; catatan publish menyebut hasil processing lainnya. Nama do_number/do_category adalah label presentasi untuk no_do/pdo_category pada DTO checkout. Driver Demo, DO-DEMO-001, route 10 / trip 10-R01 dan skema A–B–C adalah contoh ilustratif, bukan data operasional. Slide ETA berfokus pada rumus distance / speed, minimum speed 30 km/jam, konversi unit, serta contoh 1.000 m menghasilkan 120 detik = dua menit; tidak memakai panel payload.

## Dokumen pendamping dan arsip

Dokumen aktif berada **di luar root Git website**, pada parent `Materi`: [storyboard](../storyboard.md), [rencana website](../website-plan.md), [catatan pembicara](../speaker-notes.md), [bukti](../evidence-notes.md), [bahan Q&A](../qa-notes.md), dan [hasil pemeriksaan](../validation.md). Dokumen ini tidak muncul di UI atau disertakan pada repository website.

Snapshot sebelum revisi, termasuk perubahan lokal pengguna, disimpan pada `../Draft/idea-2/`: dokumen bernama `*-2.md` dan source website tanpa metadata Git. Arsip versi sebelumnya tetap di `../Draft/`. Salinan repository website saja tidak mencakup dokumen/arsip parent tersebut.

## Pemeriksaan

```sh
node --test tests/check.test.mjs
node --check src/app.js
node --check src/content.js
node --check src/navigation.js
```

Pengujian utama tidak memerlukan dokumen di luar repository. Pemeriksaan durasi/storyboard dan browser dilakukan terpisah dan dicatat di `../validation.md`.

Pengerjaan mengikuti skill Sites dengan preview lokal. Revisi ini tidak melakukan deployment atau push. Identitas hosting lama pada arsip merupakan catatan historis.

Analogi hanya tersedia pada catatan pembicara. Placeholder foto bus dan screenshot dashboard pada slide 2 dapat diganti dengan menaruh file sesuai ASSETS.md.

Cover memakai screenshot dashboard yang diberikan pengguna sebagai background dekoratif opacity 12%; teks sebelum/sesudah titik dua memakai warna berbeda. Aset wajibnya src/assets/dashboard-title-background.png. Pipeline berjudul 1 GPS Point Journey; tahap 9 Update History Cache.
