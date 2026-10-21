/* Versi 3 — sumber tunggal konten layar dan contoh sintetis. */
window.TRACKING = {
  "version": 3,
  "title": "Tijempolan: Live Tracking Overview",
  "chapters": [
    "Pembuka",
    "Dari perangkat ke antrean",
    "Di dalam consumer",
    "Hasil dan pemanfaatan",
    "Tradeoff dan operasi",
    "Penutup"
  ],
  "stages": [
    {
      "id": "bus",
      "label": "Bus"
    },
    {
      "id": "broker",
      "label": "Broker MQTT"
    },
    {
      "id": "forwarder",
      "label": "Forwarder"
    },
    {
      "id": "rabbitmq",
      "label": "RabbitMQ"
    },
    {
      "id": "consumer",
      "label": "Consumer"
    },
    {
      "id": "publish",
      "label": "Publish"
    },
    {
      "id": "dashboard",
      "label": "Dashboard"
    }
  ],
  "branches": {
    "storage": "Penyimpanan",
    "uses": "Pemanfaatan"
  },
  "assets": {
    "device": {
      "file": "assets/OBU.png",
      "label": "OBU di kendaraan",
      "alt": "Perangkat OBU terpasang di kabin bus dengan layar informasi perjalanan.",
      "required": true
    }
  },
  "demo": {
    "bus": "BUS-DEMO-01",
    "trip": "TRIP-DEMO-ABC",
    "raw": {
      "latitude": -6.18125,
      "longitude": 106.8111
    },
    "snap": {
      "latitude": -6.18145,
      "longitude": 106.8109
    },
    "speed": 24,
    "bearing": 135,
    "deviceTime": "10:00:00",
    "observations": [
      {
        "time": "09:59:40",
        "previous": "A",
        "current": "",
        "next": "B",
        "status": "departure"
      },
      {
        "time": "09:59:50",
        "previous": "A",
        "current": "B",
        "next": "C",
        "status": "arrival"
      },
      {
        "time": "10:00:00",
        "previous": "B",
        "current": "",
        "next": "C",
        "status": "departure"
      }
    ]
  },
  "rawPayload": {
    "busBodyNo": "BUS-DEMO-01",
    "latitude": -6.18125,
    "longitude": 106.8111,
    "speed": 24,
    "bearing": 135,
    "source": "OBU",
    "deviceTimestamp": 1792551600000
  },
  "payloads": {
    "raw": {
      "busBodyNo": "BUS-DEMO-01",
      "latitude": -6.18125,
      "longitude": 106.8111,
      "speed": 24,
      "bearing": 135,
      "source": "OBU",
      "deviceTimestamp": 1792551600000
    },
    "normalized": {
      "bus_body_no": "BUS-DEMO-01",
      "latitude": -6.18125,
      "longitude": 106.8111,
      "speed": 24,
      "bearing": 135,
      "source": "OBU",
      "deviceTimestamp": 1792551600000
    },
    "context": {
      "bus_body_no": "BUS-DEMO-01",
      "latitude": -6.18125,
      "longitude": 106.8111,
      "speed": 24,
      "bearing": 135,
      "source": "OBU",
      "deviceTimestamp": 1792551600000,
      "route_code": "R-DEMO",
      "trip_id": "TRIP-DEMO-ABC",
      "bus_status": "on",
      "pdo_category": "DO Reguler"
    },
    "position": {
      "bus_body_no": "BUS-DEMO-01",
      "latitude": -6.18125,
      "longitude": 106.8111,
      "speed": 24,
      "bearing": 135,
      "source": "OBU",
      "deviceTimestamp": 1792551600000,
      "route_code": "R-DEMO",
      "trip_id": "TRIP-DEMO-ABC",
      "bus_status": "on",
      "pdo_category": "DO Reguler",
      "prev_stops": "B",
      "curr_stops": "",
      "next_stops": "C",
      "position_type": "departure",
      "is_out_of_route": false
    },
    "snap": {
      "bus_body_no": "BUS-DEMO-01",
      "latitude": -6.18125,
      "longitude": 106.8111,
      "speed": 24,
      "bearing": 135,
      "source": "OBU",
      "deviceTimestamp": 1792551600000,
      "route_code": "R-DEMO",
      "trip_id": "TRIP-DEMO-ABC",
      "bus_status": "on",
      "pdo_category": "DO Reguler",
      "prev_stops": "B",
      "curr_stops": "",
      "next_stops": "C",
      "position_type": "departure",
      "is_out_of_route": false,
      "snap_latitude": -6.18145,
      "snap_longitude": 106.8109,
      "snap_distance": 31.3
    },
    "eta": {
      "bus_body_no": "BUS-DEMO-01",
      "latitude": -6.18125,
      "longitude": 106.8111,
      "speed": 24,
      "bearing": 135,
      "source": "OBU",
      "deviceTimestamp": 1792551600000,
      "route_code": "R-DEMO",
      "trip_id": "TRIP-DEMO-ABC",
      "bus_status": "on",
      "pdo_category": "DO Reguler",
      "prev_stops": "B",
      "curr_stops": "",
      "next_stops": "C",
      "position_type": "departure",
      "is_out_of_route": false,
      "snap_latitude": -6.18145,
      "snap_longitude": 106.8109,
      "snap_distance": 31.3,
      "estimated_distance_next_stops": 1000,
      "estimated_time_next_stops": 120,
      "accumulated_distance": 1240,
      "last_stopping_point_uid": "STOP-DEMO-B"
    },
    "final": {
      "bus_body_no": "BUS-DEMO-01",
      "latitude": -6.18125,
      "longitude": 106.8111,
      "speed": 24,
      "bearing": 135,
      "source": "OBU",
      "deviceTimestamp": 1792551600000,
      "route_code": "R-DEMO",
      "trip_id": "TRIP-DEMO-ABC",
      "bus_status": "on",
      "pdo_category": "DO Reguler",
      "prev_stops": "B",
      "curr_stops": "",
      "next_stops": "C",
      "position_type": "departure",
      "is_out_of_route": false,
      "snap_latitude": -6.18145,
      "snap_longitude": 106.8109,
      "snap_distance": 31.3,
      "estimated_distance_next_stops": 1000,
      "estimated_time_next_stops": 120,
      "accumulated_distance": 1240,
      "last_stopping_point_uid": "STOP-DEMO-B"
    }
  },
  "additions": {
    "context": [
      "route_code",
      "trip_id",
      "bus_status",
      "pdo_category"
    ],
    "position": [
      "prev_stops",
      "curr_stops",
      "next_stops",
      "position_type",
      "is_out_of_route"
    ],
    "snap": [
      "snap_latitude",
      "snap_longitude",
      "snap_distance"
    ],
    "eta": [
      "estimated_distance_next_stops",
      "estimated_time_next_stops",
      "accumulated_distance",
      "last_stopping_point_uid"
    ]
  },
  "pipeline": [
    "Enrich + history",
    "Posisi halte",
    "Out-of-route",
    "HMM snap",
    "ETA",
    "Stopping point",
    "Posisi meter",
    "Headway",
    "Simpan state",
    "Publish"
  ],
  "scenes": [
    {
      "id": "behind-the-dot",
      "title": "Tijempolan: Live Tracking Overview",
      "takeaway": "Perjalanan laporan GPS bus hingga menjadi informasi di dashboard.",
      "visual": "cover",
      "stages": [],
      "steps": [
        "Ikuti satu bus dan perjalanan datanya."
      ],
      "analogy": "",
      "terms": [],
      "chapter": 0,
      "kicker": "01 / 18",
      "badge": "illustration"
    },
    {
      "id": "bus-to-dashboard",
      "title": "Bus berjalan. Titik bergerak.",
      "takeaway": "Bagaimana perjalanan di jalan bisa terlihat di layar?",
      "visual": "hook",
      "stages": [
        "bus",
        "dashboard"
      ],
      "steps": [
        "Bus bergerak di jalan.",
        "Dashboard menerima representasi posisi bus.",
        "Apa saja yang terjadi di antara keduanya?"
      ],
      "analogy": "Seperti melihat lokasi kurir: titik di layar berasal dari laporan perangkat yang terus diperbarui.",
      "terms": [],
      "chapter": 0,
      "kicker": "02 / 18",
      "badge": "illustration"
    },
    {
      "id": "live-tracking",
      "title": "Apa itu live tracking?",
      "takeaway": "Pembaruan posisi berkala yang diberi konteks perjalanan.",
      "visual": "overview",
      "stages": "all",
      "steps": [
        "Perangkat melaporkan posisi dan waktu secara berkala.",
        "Di Transjakarta, laporan diolah menjadi konteks perjalanan dan informasi operasional."
      ],
      "analogy": "Seperti rangkaian kabar perjalanan: setiap laporan memberi keadaan pada waktu tertentu.",
      "terms": [
        {
          "term": "live tracking",
          "def": "Penyajian posisi yang terus diperbarui dari laporan perangkat.",
          "step": 0
        }
      ],
      "chapter": 0,
      "kicker": "03 / 18",
      "badge": "illustration"
    },
    {
      "id": "gps-report",
      "title": "Asal data: perangkat di bus",
      "takeaway": "OBU / modul GPS mengirim laporan melalui MQTT.",
      "visual": "source",
      "stages": [
        "bus"
      ],
      "steps": [
        "Identitas menghubungkan laporan dengan bus yang sama.",
        "Koordinat, speed, dan bearing menggambarkan observasi perangkat.",
        "Timestamp menunjukkan kapan observasi dibuat; payload dikirim ke topic sumber."
      ],
      "analogy": "Seperti kartu pos: ada pengirim, isi kabar, dan waktu penulisan.",
      "terms": [
        {
          "term": "OBU",
          "def": "On-board unit: perangkat komputasi di kendaraan.",
          "step": 0
        },
        {
          "term": "payload",
          "def": "Isi pesan yang dikirim perangkat.",
          "step": 1
        },
        {
          "term": "MQTT",
          "def": "Protokol pesan ringan berbasis publish–subscribe.",
          "step": 2
        }
      ],
      "aside": "device",
      "payload": "raw",
      "chapter": 1,
      "kicker": "04 / 18",
      "badge": "illustration"
    },
    {
      "id": "brokers",
      "title": "Broker MQTT",
      "takeaway": "Menerima publikasi dan meneruskan ke subscriber yang sesuai.",
      "visual": "broker",
      "stages": [
        "bus",
        "broker",
        "forwarder"
      ],
      "steps": [
        "OBU / Module GPS memublikasikan laporan ke topic sumber.",
        "Broker terpusat menerima pesan dan mencocokkan langganan.",
        "Forwarder menerima pesan melalui koneksi MQTT sebagai subscriber."
      ],
      "analogy": "Saluran pengumuman: pengirim memilih kanal, pelanggan memilih kanal yang ingin didengar.",
      "terms": [
        {
          "term": "topic",
          "def": "Nama kanal untuk mengelompokkan pesan.",
          "step": 0
        },
        {
          "term": "publish",
          "def": "Mengirim pesan ke topic.",
          "step": 0
        },
        {
          "term": "broker",
          "def": "Perantara yang menerima dan mendistribusikan pesan.",
          "step": 1
        },
        {
          "term": "subscribe",
          "def": "Berlangganan pesan sesuai topic atau pola.",
          "step": 2
        }
      ],
      "chapter": 1,
      "kicker": "05 / 18",
      "badge": "illustration"
    },
    {
      "id": "forwarder",
      "title": "Forwarder dan RabbitMQ",
      "takeaway": "Seragamkan laporan, lalu bagi pekerjaan ke antrean.",
      "visual": "forwarder",
      "stages": [
        "forwarder",
        "rabbitmq"
      ],
      "steps": [
        "Normalisasi menyeragamkan bentuk dan tipe nilai payload.",
        "Forwarder meneruskan pesan ke RabbitMQ melalui AMQP.",
        "Consistent-hash exchange memilih queue berdasarkan busBodyNo.",
        "Bus yang sama mengikuti jalur yang konsisten selama topologi stabil."
      ],
      "analogy": "Seperti pembagian loket: identitas bus menentukan jalur antrean yang konsisten.",
      "terms": [
        {
          "term": "normalisasi",
          "def": "Menyeragamkan bentuk dan tipe data.",
          "step": 0
        },
        {
          "term": "AMQP",
          "def": "Protokol pesan yang dipakai pada koneksi RabbitMQ ini.",
          "step": 1
        },
        {
          "term": "queue",
          "def": "Antrean pesan yang menunggu diproses.",
          "step": 1
        },
        {
          "term": "exchange",
          "def": "Komponen RabbitMQ yang menentukan tujuan routing pesan.",
          "step": 2
        },
        {
          "term": "consistent hashing",
          "def": "Pemetaan ke jalur yang mengurangi perpindahan saat anggota berubah.",
          "step": 2
        }
      ],
      "chapter": 1,
      "kicker": "06 / 18",
      "badge": "illustration"
    },
    {
      "id": "consumer",
      "title": "Consumer: banyak bus, kerja terbagi",
      "takeaway": "Pemrosesan paralel tetap membutuhkan urutan per bus.",
      "visual": "consumer",
      "stages": [
        "rabbitmq",
        "consumer"
      ],
      "steps": [
        "Setiap queue memiliki worker pool untuk mengolah pesan.",
        "Hash identitas bus memilih goroutine di dalam pool.",
        "Prefetch membatasi pesan belum di-ACK; ACK mengonfirmasi penanganan delivery.",
        "Setiap laporan melewati rangkaian pengayaan, perhitungan, state, lalu publikasi."
      ],
      "analogy": "Seperti beberapa petugas: bus berbeda bisa dilayani bersamaan, berkas bus yang sama mengikuti petugas yang sama.",
      "terms": [
        {
          "term": "worker pool",
          "def": "Sekumpulan pelaksana tugas yang berbagi pekerjaan.",
          "step": 0
        },
        {
          "term": "goroutine",
          "def": "Unit eksekusi ringan di Go.",
          "step": 1
        },
        {
          "term": "prefetch RabbitMQ",
          "def": "Batas delivery yang belum diakui oleh consumer.",
          "step": 2
        },
        {
          "term": "ACK",
          "def": "Pengakuan penanganan sebuah delivery.",
          "step": 2
        }
      ],
      "chapter": 2,
      "kicker": "07 / 18",
      "badge": "illustration"
    },
    {
      "id": "enrichment",
      "title": "Enrichment: memberi konteks",
      "takeaway": "Koordinat memperoleh kendaraan, penugasan, trip, dan halte.",
      "visual": "enrichment",
      "stages": [
        "consumer"
      ],
      "steps": [
        "Mulai dari laporan GPS dan state bus sebelumnya.",
        "Consumer membaca referensi dan konteks dari Redis.",
        "Tambahkan penugasan, rute, trip, lintasan, dan urutan halte."
      ],
      "analogy": "Seperti berkas referensi di meja petugas: cepat dibaca tanpa mengambil ulang dari gudang.",
      "terms": [
        {
          "term": "enrichment",
          "def": "Menambahkan konteks pada data yang sudah diterima.",
          "step": 0
        },
        {
          "term": "Redis / cache",
          "def": "Penyimpanan cepat untuk referensi dan state yang siap dibaca.",
          "step": 1
        }
      ],
      "payload": "context",
      "substage": "Enrichment",
      "chapter": 2,
      "kicker": "08 / 18",
      "badge": "illustration"
    },
    {
      "id": "stop-context",
      "title": "Posisi dan status halte",
      "takeaway": "Kedekatan, urutan, arah, dan state dibaca bersama.",
      "visual": "position",
      "stages": [
        "consumer"
      ],
      "steps": [
        "GeoRadius mencari kandidat halte di sekitar koordinat raw.",
        "Jarak, arah, dan urutan perjalanan membantu memilih kandidat.",
        "State membedakan menuju, tiba, dan meninggalkan halte.",
        "Pemeriksaan out-of-route menilai jarak terhadap lintasan trip."
      ],
      "analogy": "Seperti membaca urutan halaman: posisi sekarang lebih masuk akal bila halaman sebelumnya diketahui.",
      "terms": [
        {
          "term": "GeoRadius",
          "def": "Mencari kandidat di sekitar koordinat dalam radius tertentu.",
          "step": 0
        },
        {
          "term": "Haversine",
          "def": "Menghitung jarak permukaan bumi antara dua koordinat.",
          "step": 1
        },
        {
          "term": "state",
          "def": "Hasil sebelumnya yang dipakai mengolah laporan berikutnya.",
          "step": 2
        },
        {
          "term": "out-of-route",
          "def": "Indikasi posisi berjarak dari lintasan trip.",
          "step": 3
        }
      ],
      "payload": "position",
      "substage": "Posisi halte",
      "chapter": 2,
      "kicker": "09 / 18",
      "badge": "illustration"
    },
    {
      "id": "snapping",
      "title": "Snapping ke lintasan",
      "takeaway": "Raw adalah observasi; snap adalah estimasi pencocokan.",
      "visual": "snap",
      "stages": [
        "consumer"
      ],
      "steps": [
        "Koordinat raw dapat bergeser dari lintasan.",
        "HMM menilai kandidat lewat jarak, arah, dan kesinambungan.",
        "Jika pencocokan tidak valid, sistem dapat kembali ke raw.",
        "Marker dan status halte dapat berbeda karena acuan perhitungannya berbeda."
      ],
      "analogy": "Seperti merapikan jejak pensil ke jalur yang cocok sambil melihat arah goresan sebelumnya.",
      "terms": [
        {
          "term": "snapping",
          "def": "Mencocokkan observasi GPS dengan lintasan yang diketahui.",
          "step": 0
        },
        {
          "term": "HMM",
          "def": "Model yang menilai kandidat posisi dan transisi antarobservasi.",
          "step": 1
        },
        {
          "term": "fallback",
          "def": "Jalur pengganti saat hasil utama tidak dapat digunakan.",
          "step": 2
        }
      ],
      "payload": "snap",
      "substage": "Snapping",
      "chapter": 2,
      "kicker": "10 / 18",
      "badge": "illustration"
    },
    {
      "id": "eta",
      "title": "ETA dan konteks operasional",
      "takeaway": "Jarak, kecepatan, posisi lintasan, dan hubungan antarbus.",
      "visual": "eta",
      "stages": [
        "consumer"
      ],
      "steps": [
        "Hitung sisa jarak mengikuti lintasan menuju halte berikutnya.",
        "ETA memakai jarak / kecepatan, dengan minimum perhitungan 30 km/jam.",
        "Stopping point dan posisi meter memberi konteks lokasi pada lintasan.",
        "Headway membaca hubungan antarbus; ETA tetap sebuah perkiraan."
      ],
      "analogy": "Seperti memperkirakan waktu berjalan: jarak dibagi asumsi kecepatan, dengan kondisi perjalanan yang bisa berubah.",
      "terms": [
        {
          "term": "ETA",
          "def": "Perkiraan waktu tiba di pemberhentian.",
          "step": 0
        },
        {
          "term": "position meter",
          "def": "Posisi sepanjang acuan lintasan dalam meter.",
          "step": 2
        },
        {
          "term": "headway",
          "def": "Jarak waktu atau posisi antarbus dalam konteks layanan.",
          "step": 3
        }
      ],
      "payload": "eta",
      "substage": "ETA · progres · headway",
      "chapter": 2,
      "kicker": "11 / 18",
      "badge": "illustration"
    },
    {
      "id": "state-and-publish",
      "title": "Simpan state, sebarkan hasil",
      "takeaway": "Satu hasil pengolahan mendukung laporan berikutnya dan banyak penerima.",
      "visual": "publish",
      "stages": [
        "consumer",
        "publish"
      ],
      "steps": [
        "Perbarui history:<bus> di Redis untuk laporan berikutnya.",
        "Publikasikan generic dan vehicle update sesuai kebutuhan penerima.",
        "Terbitkan pula GPS history, arrival, dan travel time ketika syaratnya terpenuhi.",
        "Payload kini memuat observasi, konteks, posisi, snap, dan estimasi."
      ],
      "analogy": "Seperti catatan serah-terima: simpan progres kerja, lalu bagikan informasi kepada penerima yang perlu.",
      "terms": [
        {
          "term": "state Redis",
          "def": "Keadaan terakhir proses untuk membantu laporan berikutnya.",
          "step": 0
        },
        {
          "term": "fan-out",
          "def": "Menyebarkan hasil ke beberapa jalur pemanfaatan.",
          "step": 1
        }
      ],
      "payload": "final",
      "substage": "State → publish",
      "branch": "uses",
      "chapter": 3,
      "kicker": "12 / 18",
      "badge": "illustration"
    },
    {
      "id": "dashboard",
      "title": "Dashboard dan layanan penerima",
      "takeaway": "Kondisi tersimpan memberi awal; stream membawa pembaruan.",
      "visual": "receivers",
      "stages": [
        "publish",
        "dashboard"
      ],
      "steps": [
        "Saat halaman dibuka, API memberi snapshot kondisi tersimpan.",
        "MQTT memperbarui kendaraan dan headway setelah data awal siap.",
        "Celah halte menggabungkan informasi arrival/generic dengan sensor."
      ],
      "analogy": "Seperti membuka papan informasi terakhir, lalu menerima kabar terbaru melalui saluran langsung.",
      "terms": [
        {
          "term": "snapshot",
          "def": "Salinan kondisi tersimpan pada saat dibaca.",
          "step": 0
        },
        {
          "term": "prefetch halaman",
          "def": "Mengambil data awal agar tampilan segera terisi.",
          "step": 0
        }
      ],
      "branch": "uses",
      "chapter": 3,
      "kicker": "13 / 18",
      "badge": "illustration"
    },
    {
      "id": "persistence",
      "title": "Data juga disimpan",
      "takeaway": "Keadaan terakhir dan riwayat memiliki pola penyimpanan berbeda.",
      "visual": "storage",
      "stages": [
        "publish"
      ],
      "steps": [
        "tije-bus-tracking melakukan upsert kondisi terakhir per bus.",
        "tije-bus-histories menambah rekaman GPS dan arrival.",
        "Travel time antarsegmen juga dipersist untuk analisis perjalanan."
      ],
      "analogy": "Papan posisi terakhir diperbarui; buku perjalanan mendapat catatan tambahan.",
      "terms": [
        {
          "term": "upsert",
          "def": "Menambah atau memperbarui rekaman dengan identitas yang sama.",
          "step": 0
        },
        {
          "term": "insert",
          "def": "Menambahkan rekaman baru ke penyimpanan.",
          "step": 1
        }
      ],
      "branch": "storage",
      "chapter": 3,
      "kicker": "14 / 18",
      "badge": "illustration"
    },
    {
      "id": "storage-tradeoff",
      "title": "Histori berguna, storage bertumbuh",
      "takeaway": "Frekuensi laporan dan masa simpan menentukan banyaknya rekaman.",
      "visual": "tradeoff",
      "stages": [
        "publish"
      ],
      "steps": [
        "Setiap sampel atau kejadian historis menambah rekaman.",
        "Kebutuhan analisis perlu diseimbangkan dengan biaya simpan dan baca.",
        "Retensi, partisi, dan arsip adalah opsi pengelolaan sesuai kebutuhan."
      ],
      "analogy": "Seperti buku log: makin sering menulis dan makin lama menyimpan, makin banyak halaman.",
      "terms": [
        {
          "term": "retensi",
          "def": "Kebijakan berapa lama data disimpan.",
          "step": 2
        },
        {
          "term": "partisi / arsip",
          "def": "Pilihan mengelompokkan dan memindahkan data historis.",
          "step": 2
        }
      ],
      "branch": "storage",
      "chapter": 4,
      "kicker": "15 / 18",
      "badge": "illustration"
    },
    {
      "id": "issues",
      "title": "Ketika live tracking bermasalah",
      "takeaway": "Baca gejala, telusuri penyebab, lalu pilih mitigasi.",
      "visual": "issues",
      "stages": [
        "rabbitmq",
        "consumer",
        "dashboard"
      ],
      "steps": [
        "Queue menumpuk: bandingkan laju masuk dengan kemampuan proses.",
        "Data terlambat atau terputus: periksa timestamp, koneksi, dan aliran pesan.",
        "Marker berbeda dari status halte: periksa raw/snap, referensi, dan state."
      ],
      "analogy": "Antrean panjang menunjukkan ada ketidakseimbangan; memperbesar ruang tunggu tidak mempercepat proses.",
      "terms": [
        {
          "term": "backlog",
          "def": "Pekerjaan yang menunggu karena pemrosesan tertinggal.",
          "step": 0
        },
        {
          "term": "freshness",
          "def": "Seberapa baru observasi yang sedang ditampilkan.",
          "step": 1
        }
      ],
      "chapter": 4,
      "kicker": "16 / 18",
      "badge": "illustration"
    },
    {
      "id": "recap",
      "title": "Satu laporan, banyak informasi",
      "takeaway": "Setiap tahap mengubah laporan sederhana menjadi konteks yang berguna.",
      "visual": "recap",
      "stages": "all",
      "steps": [
        "Bus mengirim identitas, koordinat, dan waktu.",
        "Worker menambahkan konteks, menghitung, serta mengingat state.",
        "Hasilnya menggerakkan dashboard, layanan operasional, dan riwayat."
      ],
      "analogy": "",
      "terms": [],
      "recapStep": 2,
      "chapter": 5,
      "kicker": "17 / 18",
      "badge": "illustration"
    },
    {
      "id": "qa",
      "title": "Q&A",
      "takeaway": "Mari lanjutkan percakapannya.",
      "visual": "qa",
      "stages": [],
      "steps": [
        "Pertanyaan?"
      ],
      "analogy": "",
      "terms": [],
      "chapter": 5,
      "kicker": "18 / 18",
      "badge": "illustration"
    }
  ]
};
