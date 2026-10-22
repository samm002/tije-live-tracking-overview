# A Glimpse Behind Live Tracking: From Bus to Dashboard

Versi 3 — presentasi berbahasa Indonesia tentang perjalanan laporan GPS bus menjadi informasi dashboard. 20 slide dengan 60 langkah; alokasi narasi 26:15 di luar Q&A. Angka waktu merupakan target latihan, belum pengukuran penyampaian manusia.

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

- `src/content.js`: judul, 20 slide, langkah reveal, definisi, minimap, pipeline, aset, dan payload sintetis.
- `src/app.js`: renderer diagram, panel field, cover/Q&A, kontrol, dan navigasi.
- `src/style.css`: layout dan warna raw/snap/state.
- `src/navigation.js`: aturan perpindahan langkah dan URL.
- `src/assets/OBU.png`: foto perangkat dari pengguna, ditampilkan pada slide sumber data.

Payload dipakai sebagai ringkasan pedagogis field pilihan, bukan kontrak integrasi. Perhatikan bahwa source dan keluaran dapat memakai bentuk field berbeda. Raw dan snap tetap dipisahkan. Field ignition bernilai integer 1 diteruskan pada seluruh contoh snapshot. Panel enrichment memperlihatkan empat field GPS awal pada langkah 1–2, lalu menambahkan empat field perjalanan pada langkah 3 sambil mempertahankan data awal. Slide kondisi terakhir/pembaruan informasi menggunakan diagram sederhana tanpa panel payload atau nama topic. Nama do_number adalah label presentasi untuk no_do pada DTO checkout. Pada panel enrichment, route_id dan do_type adalah label layar yang mengambil nilai route_code dan do_category pada snapshot sintetis; kategori DO memakai pdo_category pada DTO checkout. Driver Demo, DO-ABCD-001, route 10 / trip 10-R01 dan skema A–B–C adalah contoh ilustratif, bukan data operasional. Slide ETA berfokus pada rumus distance / speed, minimum speed 30 km/jam, konversi unit, serta contoh 1.000 m menghasilkan 120 detik = dua menit; tidak memakai panel payload.

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

## Revisi bahasa — 22 Oktober 2026

Audiens utama adalah umum, termasuk PM dan designer. Slide data persistence diganti manfaat consumer untuk verifikasi jarak tempuh, Command Center, TJ Apps, dan PIS. Diagram menunjukkan pemanfaatan informasi, bukan koneksi langsung antarlayanan yang telah diverifikasi. URL lama #persistence tetap membuka slide manfaat. Update state/publish dijelaskan sebagai mengingat kondisi terakhir dan membagikan informasi terbaru. Consumer, dashboard, riwayat, overview, dan penutup ikut diselaraskan. Stopping point tetap pada pipeline sesuai arahan sementara; argumen revisinya ada di catatan pembicara. Jumlah slide/langkah tetap 18/55.

Panel enrichment kini memakai satu daftar vertikal dengan seluruh field rata kiri. Empat field baru tetap hijau. Caption penjelas pada ketiga langkah dan judul pemisah kelompok di dalam panel dihapus.

## Dashboard dan pemantauan operasional — revisi terkini

Slide 13 fokus pada data tersimpan dan pembaruan menuju dashboard. Langkah terakhir memperlihatkan JSON vehicle update terpilih di kiri dan titik TJ-123 pada skema live tracking di kanan. Slide 14 baru memisahkan celah bus–halte dan headway monitoring, satu contoh per langkah. Keduanya memakai placeholder screenshot sesuai arahan pengguna. Manfaat consumer menjadi slide 15; riwayat menjadi slide 16. Total terkini 19 slide / 57 langkah, target latihan 24:45. ID URL lama tetap dipertahankan.

## Revisi 12 komentar consumer dan vehicle update — acuan terkini

Materi menjadi 20 slide / 60 langkah, alokasi latihan 26:15. Broker menjadi judul slide 5. Diagram consumer memakai Queue, dasar pembagian nomor body bus, Worker 1/TJ-123 dan Worker...N. Kalimat pembatasan pekerjaan mengikuti permintaan pengguna; catatan membedakan buffer worker yang terbatas dengan prefetch per consumer RabbitMQ. Pipeline dipadatkan menjadi delapan tahap dengan menghapus node Out-of-route dan Stopping point. Pemeriksaan keluar rute tetap dijelaskan pada posisi halte; stopping point tetap tersedia sebagai detail teknis di catatan. Slide 12 baru menjelaskan position meter dan headway memakai progres ilustratif 1.240 m dan 1.640 m dengan selisih 400 m. Tidak menyatakan angka ini jarak tempuh resmi atau bahwa fungsi consumer langsung membandingkan dua bus.

Dashboard bergeser ke slide 14 dan memakai label Data terbaru serta Snippet vehicle update · JSON. Objek stop menampilkan in_transit_to, stopped_at, previous sebagai string untuk kejelasan sesuai permintaan pengguna; DTO aslinya memakai objek. Nilai C/kosong/B konsisten dengan contoh bus meninggalkan B menuju C. Slide pemantauan menjadi 15, manfaat consumer 16, riwayat 17. URL slide lama dipertahankan. Berkas gambar baru milik pengguna tidak diubah.
