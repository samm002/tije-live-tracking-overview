/* Satu sumber konten layar: judul, langkah visual, definisi mikro, badge, peta mini, aset, dan nilai demo. */
window.TRACKING = {
  version: 2,
  title: 'A Glimpse Behind Live Tracking: From Bus to Dashboard',
  chapters: ['Di balik dashboard', 'Dari bus ke worker', 'Memberi konteks perjalanan', 'Menjadi marker', 'Cabang perjalanan data', 'Kesegaran & rangkuman'],
  stages: [
    {id: 'bus', label: 'Bus'},
    {id: 'broker', label: 'Broker'},
    {id: 'worker', label: 'Worker'},
    {id: 'enrichment', label: 'Enrichment'},
    {id: 'state', label: 'State'},
    {id: 'publish', label: 'Publish'},
    {id: 'dashboard', label: 'Dashboard'}
  ],
  branches: {storage: 'Penyimpanan', uses: 'Pemanfaatan lain'},
  assets: {
    dashboard: {
      file: 'assets/dashboard-redacted-2.png', required: true,
      label: 'Screenshot dashboard live tracking (diredaksi)',
      alt: 'Screenshot dashboard live tracking dengan identitas dan nomor kendaraan ditutup kotak opak',
      purpose: 'Contoh aktual hasil akhir live tracking pada adegan pembuka.',
      requirements: [
        'Kotak opak di atas piksel asli, bukan suntingan AI.',
        'Tutup: identitas pramudi, NIK, nomor penugasan, nomor polisi, kode bodi, toolbar browser.',
        'Biarkan terlihat: koridor, halte, status GPS, kecepatan, ETA, peta, marker.'
      ]
    },
    device: {
      file: 'assets/gps-device.jpg', required: false,
      label: 'Foto perangkat GPS/OBU di bus',
      alt: 'Foto perangkat GPS/OBU yang terpasang di bus',
      purpose: 'Menghubungkan laporan dengan perangkat di bus.',
      requirements: ['Tanpa nomor seri, kredensial, atau identitas individu.']
    }
  },
  rawPayload: {
    busBodyNo: "TJ-743",
    latitude: -6.311107,
    longitude: 107.133023,
    speed: 56.7,
    bearing: 298,
    source: "OBU",
    deviceTimestamp: 1792401704000
  },
  demo: {
    bus: 'BUS-DEMO-01', trip: 'TRIP-DEMO-ABC',
    raw: {latitude: -6.18125, longitude: 106.81110},
    snap: {latitude: -6.18145, longitude: 106.81090},
    speed: 24, bearing: 135, deviceTime: '10:00:00',
    observations: [
      {time: '09:59:40', label: 'Menuju B', previous: 'A', current: '—', next: 'B', status: 'departure', point: [365,160]},
      {time: '09:59:50', label: 'Tiba di B', previous: 'A', current: 'B', next: 'C', status: 'arrival', point: [440,160]},
      {time: '10:00:00', label: 'Meninggalkan B', previous: 'B', current: '—', next: 'C', status: 'departure', point: [550,210]}
    ]
  },
  scenes: [
    {
      id:'behind-the-dot', chapter:0, kicker:'Mulai dari yang terlihat', title:'Sebelum titik itu bergerak.',
      takeaway:'Satu marker adalah ujung dari perjalanan data yang lebih panjang.', visual:'cover', badge:'actual',
      stages:['dashboard'],
      steps:['Lihat representasi bus pada dashboard.', 'Ikuti satu laporan GPS sampai representasi itu diperbarui.']
    },
    {
      id:'gps-report', chapter:1, kicker:'01 / Laporan dari lapangan', title:'Bus mengirim laporan, bukan marker.',
      takeaway:'Identitas + koordinat + waktu membuat satu observasi dapat dikenali.', visual:'payload', badge:'illustration',
      stages:['bus'], aside:'device',
      steps:['Kenali bus yang melapor.', 'Baca posisi, kecepatan, dan arah.', 'Simpan waktu menurut perangkat.'],
      terms:[{term:'GPS / payload', def:'Laporan posisi dari perangkat; payload adalah isi datanya.', step:0}]
    },
    {
      id:'brokers', chapter:1, kicker:'02 / Distribusi pesan', title:'Broker menghubungkan pengirim dan penerima.',
      takeaway:'Publish/subscribe membagikan pesan kepada pihak yang berlangganan.', visual:'broker', badge:'illustration',
      stages:['broker'],
      steps:['Laporan berasal dari jalur sumber.', 'Broker menerima publikasi.', 'Forwarder berlangganan laporan yang diperlukan.'],
      terms:[
        {term:'broker', def:'Perantara pesan antara pengirim dan penerima.', step:1},
        {term:'MQTT', def:'Protokol pesan ringan yang umum dipakai perangkat.', step:1},
        {term:'publish–subscribe', def:'Pengirim menerbitkan ke topik; penerima berlangganan topik yang relevan.', step:2}
      ]
    },
    {
      id:'workers', chapter:1, kicker:'03 / Pembagian pekerjaan', title:'Worker: pekerjaan berjalan di belakang layar.',
      takeaway:'Forwarder menyiapkan aliran; consumer memberi konteks perjalanan.', visual:'workers', badge:'illustration',
      stages:['worker'],
      steps:['Forwarder menerima laporan.', 'Normalisasi membuat bentuk data konsisten.', 'Consumer mengolahnya bersama konteks.'],
      terms:[{term:'worker', def:'Program yang mengerjakan tugas di belakang layar.', step:0}]
    },
    {
      id:'queues', chapter:1, kicker:'04 / Antrean & jalur pemrosesan', title:'Banyak laporan, pekerjaan yang terbagi.',
      takeaway:'Antrean menampung pekerjaan; hashing membantu konsistensi jalur per bus.', visual:'queues', badge:'illustration',
      stages:['worker'],
      steps:['Laporan masuk ke antrean pekerjaan.', 'Pemetaan membantu memilih jalur antrean.', 'Di consumer, identitas bus dipetakan ke worker.'],
      terms:[
        {term:'antrean (queue)', def:'Tempat pekerjaan menunggu sebelum diproses.', step:0},
        {term:'hashing', def:'Mengubah identitas menjadi angka untuk memilih jalur yang konsisten.', step:1}
      ]
    },
    {
      id:'enrichment', chapter:2, kicker:'05 / Enrichment & penugasan', title:'Koordinat memperoleh konteks perjalanan.',
      takeaway:'Trip berasal dari penugasan yang diketahui, bukan tebakan GPS semata.', visual:'enrichment', badge:'illustration',
      stages:['enrichment'],
      steps:['Mulai dari identitas dan koordinat.', 'Tambahkan kendaraan dan penugasan.', 'Baca referensi trip, lintasan, dan halte.'],
      terms:[
        {term:'enrichment', def:'Menambahkan konteks yang tidak ada di laporan asli.', step:1},
        {term:'Redis', def:'Penyimpanan data di memori yang cepat dibaca.', step:2}
      ]
    },
    {
      id:'previous-state', chapter:2, kicker:'06 / Ingatan pengolahan', title:'Satu titik tidak menceritakan seluruh perjalanan.',
      takeaway:'State sebelumnya membantu memahami laporan berikutnya.', visual:'state', badge:'illustration',
      stages:['state'],
      steps:['Ingat observasi sebelum laporan utama.', 'Terima laporan 10:00:00.', 'Gabungkan observasi baru dengan state sebelumnya.'],
      terms:[{term:'state', def:'Hal yang sudah diketahui dari pengolahan sebelumnya.', step:0}]
    },
    {
      id:'stop-context', chapter:2, kicker:'07 / Tiga observasi, satu perjalanan', title:'Dekat halte belum cukup untuk memahami status.',
      takeaway:'Konteks halte mengikuti urutan perjalanan dan state yang diketahui.', visual:'stops', badge:'illustration',
      stages:['enrichment','state'],
      steps:['Menuju B: sebelumnya A, berikutnya B.', 'Tiba di B: saat ini B, berikutnya C.', 'Meninggalkan B: sebelumnya B, berikutnya C.']
    },
    {
      id:'raw-and-snap', chapter:2, kicker:'08 / Mencocokkan posisi', title:'Raw dan snap menjawab hal yang berbeda.',
      takeaway:'Snap adalah estimasi pencocokan ke lintasan trip yang ditugaskan.', visual:'snap', badge:'illustration',
      stages:['enrichment'],
      steps:['Lihat koordinat mentah yang bergeser.', 'Cocokkan dengan lintasan trip.', 'Simpan perbedaan antara pengukuran dan estimasi.'],
      terms:[{term:'snap', def:'Estimasi posisi yang dicocokkan ke lintasan.', step:1}]
    },
    {
      id:'matching-context', chapter:2, kicker:'09 / Intuisi di balik HMM', title:'Yang masuk akal bukan selalu yang terdekat.',
      takeaway:'Kedekatan, arah, dan kesinambungan membantu penilaian kandidat. Bila tidak ada yang masuk akal, ada jalan mundur.', visual:'hmm', badge:'illustration',
      stages:['enrichment'],
      steps:[
        'Pertimbangkan kedekatan posisi.',
        'Perhatikan arah pergerakan.',
        'Pertahankan kesinambungan antarobservasi.',
        'Tidak ada kandidat yang masuk akal? Posisi kembali ke GPS mentah — marker bisa tampak tidak sejalan dengan status halte.'
      ],
      terms:[{term:'HMM', def:'Model yang menilai rangkaian observasi, bukan satu titik saja.', step:0}]
    },
    {
      id:'eta-progress', chapter:2, kicker:'10 / Informasi pelengkap', title:'Kapan mendekati halte? Sejauh mana di lintasan?',
      takeaway:'ETA adalah estimasi; position meter adalah posisi sepanjang acuan lintasan.', visual:'eta', badge:'illustration',
      stages:['enrichment'],
      steps:['Perkenalkan estimasi menuju halte berikutnya.', 'Bedakan progres lintasan dari total jarak tempuh.'],
      terms:[{term:'ETA', def:'Perkiraan waktu tiba.', step:0}]
    },
    {
      id:'state-and-publish', chapter:2, kicker:'11 / Dari pengolahan ke distribusi', title:'Ingat konteksnya. Sebarkan hasilnya.',
      takeaway:'State berikutnya dan publikasi hasil memiliki tujuan yang berbeda.', visual:'publish', badge:'illustration',
      stages:['state','publish'],
      steps:['Perbarui state perjalanan untuk laporan berikutnya.', 'Siapkan keluaran sesuai kebutuhan penerima.', 'Publikasikan hasil; aliran dapat bercabang.']
    },
    {
      id:'initial-snapshot', chapter:3, kicker:'12 / Ketika dashboard dibuka', title:'Posisi awal berasal dari kondisi yang tersimpan.',
      takeaway:'API memberi titik awal; pembaruan berikutnya datang melalui stream.', visual:'snapshot', badge:'illustration',
      stages:['dashboard'],
      steps:['Browser meminta data kendaraan melalui API.', 'API membaca kondisi tersimpan.', 'Browser membangun representasi awal.'],
      terms:[{term:'API / snapshot', def:'Permintaan data; snapshot adalah keadaan pada satu waktu.', step:0}]
    },
    {
      id:'same-bus', chapter:3, kicker:'13 / Pembaruan berkelanjutan', title:'Laporan baru. Bus yang sama.',
      takeaway:'Identitas menghubungkan pesan baru dengan model dan marker yang sudah dikenal.', visual:'identity', badge:'illustration',
      stages:['publish','dashboard'],
      steps:['Browser menerima hasil publikasi.', 'Cocokkan identitas BUS-DEMO-01.', 'Perbarui model dan representasi bus.']
    },
    {
      id:'marker-animation', chapter:3, kicker:'14 / Gerak di layar', title:'Animasi menghubungkan dua posisi yang diketahui.',
      takeaway:'Posisi selama transisi visual bukan pengukuran GPS baru.', visual:'animation', badge:'illustration',
      stages:['dashboard'],
      steps:['Browser mengetahui posisi sebelumnya.', 'Pesan memberi posisi keluaran berikutnya.', 'Transisi visual memperlihatkan perpindahan marker.']
    },
    {
      id:'four-kinds-of-state', chapter:4, kicker:'15 / Empat hal yang berbeda', title:'Mengingat, mencatat, dan menampilkan.',
      takeaway:'State worker, histori, kondisi terakhir, dan model browser bukan hal yang sama.', visual:'storage', badge:'illustration',
      stages:['publish'], branch:'storage',
      steps:['Worker mengingat konteks pengolahan.', 'Histori menyimpan rangkaian catatan.', 'Kondisi terakhir dan browser memiliki pengetahuan masing-masing.']
    },
    {
      id:'many-uses', chapter:4, kicker:'16 / Satu aliran, banyak pertanyaan', title:'Koordinat yang punya konteks lebih berguna.',
      takeaway:'Kebutuhan pemakai berbeda, meskipun berangkat dari aliran data perjalanan.', visual:'fanout', badge:'illustration',
      stages:['publish'], branch:'uses',
      steps:['Dashboard membutuhkan representasi kendaraan.', 'Analisis dapat memerlukan rangkaian perjalanan.', 'Operasional membutuhkan konteks antarbus dan halte.']
    },
    {
      id:'freshness-and-recap', chapter:5, kicker:'17 / Kembali ke pertanyaan pembuka', title:'Seberapa segar posisi yang sedang kita lihat?',
      takeaway:'Baru diterima tidak selalu berarti baru diukur. Ada proses di dalamnya.', visual:'freshness', badge:'illustration',
      stages:'all', recapStep:2,
      steps:['Perangkat mencatat posisi pada 10:00:00.', 'Server memproses pada 10:00:08; browser menerima pada 10:00:10.', 'Rangkai kembali perjalanan laporan sampai marker.']
    }
  ]
};
