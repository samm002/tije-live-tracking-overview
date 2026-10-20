# Aset — Versi 2

## dashboard-redacted-2.png — wajib, placeholder

- Path: `dist/assets/dashboard-redacted-2.png`
- Adegan: 1, visual cover.
- Tujuan: contoh aktual hasil akhir live tracking.
- Status: **placeholder**. File belum tersedia. Website menampilkan kotak berlabel sampai file diletakkan di path ini.
- Redaksi: kotak opak di atas piksel asli, bukan suntingan AI.
- Yang ditutup: identitas pramudi, NIK, nomor penugasan, nomor polisi, kode bodi, toolbar browser.
- Yang tetap terlihat: nama koridor dan halte, status GPS, kecepatan, ETA, peta, marker.
- Screenshot asli tidak dikemas di source maupun `dist/`.
- `dashboard-redacted.png` versi 1 (suntingan AI) tidak dipakai lagi.

## gps-device.jpg — opsional, placeholder

- Path: `dist/assets/gps-device.jpg`
- Adegan: 2, samping payload.
- Tujuan: menghubungkan laporan dengan perangkat di bus.
- Status: **placeholder opsional**. Cerita lengkap tanpa foto.
- Hindari nomor seri, kredensial, dan identitas individu.

## Diagram dan ikon

SVG asli untuk materi. Lintasan A–B–C adalah skema, bukan peta geografis.

Warna peran: biru laporan/dashboard, ungu referensi/state, jingga raw, hijau kebiruan hasil pencocokan, abu-abu penyimpanan.

Favicon: `dist/assets/favicon.svg`.

## Raw Payload — pembaruan adegan 2

- Renderer aktif: `src/app.js`, dengan nilai JSON di `src/content.js` (`rawPayload`).
- Judul kartu: **Raw Payload**; isi menggunakan nama field dan nilai yang diberikan pengguna.
- Identitas contoh payload: `TJ-743`; sumber: `OBU`; timestamp perangkat dipertahankan sebagai angka `1792401704000`.
- Tampilan sebelumnya (LAPORAN GPS) disimpan utuh di `archive/gps-report-before-json/`, termasuk renderer, konten, stylesheet, dan asetnya. Arsip tidak dimuat oleh website.
- Nilai demo pada adegan lain tetap menggunakan ilustrasi A–B–C yang sudah ada.
