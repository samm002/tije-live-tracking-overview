# Aset — Versi 3

## OBU.png

- Path aktif: `src/assets/OBU.png`.
- Sumber: aset pengguna yang sudah tersedia sebelum revisi.
- Dipakai pada slide 4, Asal data: perangkat di bus.
- Ditampilkan utuh dengan `object-fit: contain` dan label Contoh perangkat OBU. Foto tidak diedit.
- Foto mengilustrasikan perangkat terpasang di bus; tidak membuktikan seluruh deployment atau tipe perangkat yang digunakan.

## Diagram dan contoh data

Diagram semantik dirender sebagai SVG native dalam `src/app.js`: bus → marker, protokol MQTT/AMQP, antrean dan worker pool, cache, urutan halte, raw/snap, ETA, publish, snapshot, penyimpanan, tradeoff, masalah operasional, dan rangkuman. Diagram/mockup dashboard diberi label Ilustrasi.

Lintasan A–B–C adalah skema, bukan peta geografis. Nilai sintetis berada pada `src/content.js`: BUS-DEMO-01, TRIP-DEMO-ABC, R-DEMO, timestamp 21 Oktober 2026 10:00 WIB, raw/snap berbeda, speed 24 km/jam, sisa jarak 1.000 m, dan ETA hitung 120 detik.

Warna: laporan/aliran biru; state/referensi ungu; raw jingga; snap teal; penyimpanan abu. `src/assets/favicon.svg` dipertahankan.

## Screenshot dashboard

Tidak ada screenshot dashboard produksi pada bundle. Hook memakai mockup ilustratif sehingga tidak bergantung pada aset screenshot yang belum tersedia. Konfigurasi placeholder screenshot versi 2 dipertahankan hanya pada snapshot arsip.

## Pengarsipan

Versi 2 beserta OBU.png sudah disalin dan diverifikasi ke `../Draft/idea-2/website/`. Arsip lama pre-JSON tetap berada di `../Draft/archive/gps-report-before-json/`. Tidak ada folder archive aktif di repository website ini.
