/* Versi 3 — sumber tunggal konten layar dan contoh sintetis. */
window.TRACKING = {
  "version": 3,
  "title": "A Glimpse Behind Live Tracking: From Bus to Dashboard",
  "chapters": [
    "Introduction",
    "Device to queue",
    "Consumer processing",
    "Outputs and consumers",
    "Tradeoffs and operations",
    "Closing"
  ],
  "stages": [
    {
      "id": "bus",
      "label": "Bus"
    },
    {
      "id": "broker",
      "label": "Source broker"
    },
    {
      "id": "forwarder",
      "label": "Forwarder"
    },
    {
      "id": "rabbitmq",
      "label": "Queue"
    },
    {
      "id": "consumer",
      "label": "Consumer"
    },
    {
      "id": "output-broker",
      "label": "Destination broker"
    },
    {
      "id": "dashboard",
      "label": "Dashboard"
    }
  ],
  "branches": {
    "storage": "Storage",
    "uses": "Services"
  },
  "assets": {
    "device": {
      "file": "assets/OBU.png",
      "label": "OBU di kendaraan",
      "alt": "Perangkat OBU terpasang di kabin bus dengan layar informasi perjalanan.",
      "required": true
    },
    "busPhoto": {
      "file": "assets/bus-on-road.jpg",
      "label": "Bus on the road",
      "alt": "Foto asli bus yang sedang berada di jalan.",
      "required": false,
      "placeholder": true
    },
    "dashboardPhoto": {
      "file": "assets/dashboard-live-tracking.png",
      "label": "Live tracking dashboard",
      "alt": "Screenshot asli dashboard live tracking.",
      "required": false,
      "placeholder": true
    },
    "coverBackground": {
      "file": "assets/dashboard-title-background.png",
      "label": "Title background",
      "alt": "Tampilan dashboard live tracking dengan peta tiga dimensi dan kendaraan.",
      "required": true
    },
    "busStopGapPhoto": {
      "file": "assets/celah-halte.png",
      "label": "Dashboard celah bus–halte",
      "alt": "Screenshot dashboard pemantauan celah bus dengan halte.",
      "required": false,
      "placeholder": true
    },
    "headwayPhoto": {
      "file": "assets/headway-monitoring.png",
      "label": "Dashboard headway monitoring",
      "alt": "Screenshot dashboard pemantauan jarak antarbus atau headway.",
      "required": false,
      "placeholder": true
    }
  },
  "demo": {
    "bus": "TJ-123",
    "trip": "10-R01",
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
    "busBodyNo": "TJ-123",
    "latitude": -6.18125,
    "longitude": 106.8111,
    "speed": 24,
    "bearing": 135,
    "ignition": 1,
    "source": "OBU",
    "deviceTimestamp": 1792551600000
  },
  "payloads": {
    "raw": {
      "busBodyNo": "TJ-123",
      "latitude": -6.18125,
      "longitude": 106.8111,
      "speed": 24,
      "bearing": 135,
      "ignition": 1,
      "source": "OBU",
      "deviceTimestamp": 1792551600000
    },
    "normalized": {
      "bus_body_no": "TJ-123",
      "latitude": -6.18125,
      "longitude": 106.8111,
      "speed": 24,
      "bearing": 135,
      "ignition": 1,
      "source": "OBU",
      "deviceTimestamp": 1792551600000
    },
    "context": {
      "bus_body_no": "TJ-123",
      "latitude": -6.18125,
      "longitude": 106.8111,
      "speed": 24,
      "bearing": 135,
      "ignition": 1,
      "source": "OBU",
      "deviceTimestamp": 1792551600000,
      "route_code": "10",
      "trip_id": "10-R01",
      "driver_name": "Driver Demo",
      "do_number": "DO-ABCD-001",
      "do_category": "DO Reguler"
    },
    "position": {
      "bus_body_no": "TJ-123",
      "latitude": -6.18125,
      "longitude": 106.8111,
      "speed": 24,
      "bearing": 135,
      "ignition": 1,
      "source": "OBU",
      "deviceTimestamp": 1792551600000,
      "route_code": "10",
      "trip_id": "10-R01",
      "driver_name": "Driver Demo",
      "do_number": "DO-ABCD-001",
      "do_category": "DO Reguler",
      "prev_stops": "B",
      "curr_stops": "",
      "next_stops": "C",
      "position_type": "departure",
      "is_out_of_route": false
    },
    "snap": {
      "bus_body_no": "TJ-123",
      "latitude": -6.18125,
      "longitude": 106.8111,
      "speed": 24,
      "bearing": 135,
      "ignition": 1,
      "source": "OBU",
      "deviceTimestamp": 1792551600000,
      "route_code": "10",
      "trip_id": "10-R01",
      "driver_name": "Driver Demo",
      "do_number": "DO-ABCD-001",
      "do_category": "DO Reguler",
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
      "bus_body_no": "TJ-123",
      "latitude": -6.18125,
      "longitude": 106.8111,
      "speed": 24,
      "bearing": 135,
      "ignition": 1,
      "source": "OBU",
      "deviceTimestamp": 1792551600000,
      "route_code": "10",
      "trip_id": "10-R01",
      "driver_name": "Driver Demo",
      "do_number": "DO-ABCD-001",
      "do_category": "DO Reguler",
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
      "bus_body_no": "TJ-123",
      "latitude": -6.18125,
      "longitude": 106.8111,
      "speed": 24,
      "bearing": 135,
      "ignition": 1,
      "source": "OBU",
      "deviceTimestamp": 1792551600000,
      "route_code": "10",
      "trip_id": "10-R01",
      "driver_name": "Driver Demo",
      "do_number": "DO-ABCD-001",
      "do_category": "DO Reguler",
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
      "driver_name",
      "do_number",
      "do_category"
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
  "enrichmentComparison": {
    "inputFields": [
      "bus_body_no",
      "latitude",
      "longitude",
      "speed"
    ],
    "addedFields": [
      {
        "key": "route_code",
        "label": "route_id"
      },
      {
        "key": "trip_id",
        "label": "trip_id"
      },
      {
        "key": "do_number",
        "label": "do_number"
      },
      {
        "key": "do_category",
        "label": "do_type"
      }
    ],
    "resultStep": 2
  },
  "pipeline": [
    "Enrich + history",
    "Stop position",
    "Snap",
    "ETA",
    "Position meter",
    "Headway",
    "Update History Cache",
    "Publish"
  ],
  "scenes": [
    {
      "id": "behind-the-dot",
      "title": "A Glimpse Behind Live Tracking: From Bus to Dashboard",
      "takeaway": "From Bus to Dashboard",
      "visual": "cover",
      "stages": [],
      "steps": [
        "Ikuti satu bus dan perjalanan datanya."
      ],
      "terms": [],
      "chapter": 0,
      "kicker": "01 / 20",
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
      "terms": [],
      "chapter": 0,
      "kicker": "02 / 20",
      "badge": "illustration"
    },
    {
      "id": "live-tracking",
      "title": "Apa itu live tracking?",
      "takeaway": "Posisi bus diperbarui secara berkala dan dilengkapi informasi perjalanan.",
      "visual": "overview",
      "stages": "all",
      "steps": [
        "Perangkat melaporkan posisi dan waktu secara berkala.",
        "Consumer mengolah laporan bus, lalu membagikan hasilnya ke dashboard dan layanan lain."
      ],
      "terms": [
        {
          "term": "live tracking",
          "def": "Penyajian posisi yang terus diperbarui dari laporan perangkat.",
          "step": 0
        }
      ],
      "chapter": 0,
      "kicker": "03 / 20",
      "badge": "illustration"
    },
    {
      "id": "gps-report",
      "title": "Data source: perangkat di bus",
      "takeaway": "OBU / modul GPS mengirim laporan melalui MQTT.",
      "visual": "source",
      "stages": [
        "bus"
      ],
      "steps": [
        "Identitas menghubungkan laporan dengan bus yang sama.",
        "Coordinate, speed, dan bearing menggambarkan observasi perangkat.",
        "Timestamp menandai waktu observasi; publish ke emq/gps/<source>/<busBodyNo>."
      ],
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
      "kicker": "04 / 20",
      "badge": "illustration"
    },
    {
      "id": "brokers",
      "title": "Broker",
      "takeaway": "Menerima publishing dan meneruskan ke subscriber yang sesuai.",
      "visual": "broker",
      "stages": [
        "bus",
        "broker",
        "forwarder"
      ],
      "steps": [
        "OBU / GPS Module memublikasikan laporan ke topic sumber.",
        "Source broker menerima message dan mencocokkan subscription.",
        "Forwarder menerima pesan melalui koneksi MQTT sebagai subscriber."
      ],
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
          "def": "Bersubscription pesan sesuai topic atau pola.",
          "step": 2
        }
      ],
      "chapter": 1,
      "kicker": "05 / 20",
      "badge": "illustration"
    },
    {
      "id": "forwarder",
      "title": "Forwarder dan RabbitMQ",
      "takeaway": "Seragamkan laporan, lalu bagi pekerjaan ke queue.",
      "visual": "forwarder",
      "stages": [
        "forwarder",
        "rabbitmq"
      ],
      "steps": [
        "Normalization mengubah tipe field speed, misalnya string \"24\" menjadi number 24.",
        "Forwarder publish ke exchange di dalam RabbitMQ melalui AMQP.",
        "Consistent-hash exchange memilih queue berdasarkan busBodyNo.",
        "Bus yang sama mengikuti jalur yang konsisten selama topologi stabil."
      ],
      "terms": [
        {
          "term": "normalization",
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
          "def": "Queue pesan yang menunggu diproses.",
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
      "kicker": "06 / 20",
      "badge": "illustration"
    },
    {
      "id": "consumer",
      "title": "Consumer: mengolah laporan bus",
      "takeaway": "Banyak bus bisa diproses bersamaan, dengan urutan laporan per bus tetap dijaga.",
      "visual": "consumer",
      "stages": [
        "rabbitmq",
        "consumer"
      ],
      "steps": [
        "Consumer membagi laporan bus ke beberapa worker agar pekerjaan bisa berjalan bersamaan.",
        "Nomor body bus menentukan worker yang menangani laporan tersebut.",
        "Jumlah laporan per worker dibatasi agar worker tidak kewalahan.",
        "Consumer melengkapi informasi, menghitung kondisi perjalanan, lalu membagikan hasilnya."
      ],
      "terms": [
        {
          "term": "consumer",
          "def": "Bagian sistem yang menerima dan mengolah laporan bus.",
          "step": 0
        },
        {
          "term": "worker",
          "def": "Pelaksana tugas pengolahan di dalam consumer.",
          "step": 1
        }
      ],
      "chapter": 2,
      "kicker": "07 / 20",
      "badge": "illustration"
    },
    {
      "id": "enrichment",
      "title": "Enrichment: melengkapi context",
      "takeaway": "Consumer melengkapi raw GPS message menggunakan reference data di Redis.",
      "visual": "enrichment",
      "stages": [
        "consumer"
      ],
      "steps": [
        "Laporan awal berisi identitas bus, posisi GPS, dan kecepatan.",
        "Consumer membaca referensi kendaraan dan perjalanan dari Redis.",
        "Data awal dilengkapi informasi rute, trip, nomor DO, dan jenis DO."
      ],
      "terms": [
        {
          "term": "enrichment",
          "def": "Menambahkan context pada data yang sudah diterima.",
          "step": 0
        },
        {
          "term": "Redis / cache",
          "def": "Storage cepat untuk referensi dan state yang siap dibaca.",
          "step": 1
        }
      ],
      "payload": "context",
      "substage": "Enrichment",
      "chapter": 2,
      "kicker": "08 / 20",
      "badge": "illustration"
    },
    {
      "id": "stop-context",
      "title": "Position dan stop status",
      "takeaway": "Kedekatan, urutan, arah, dan state dibaca bersama.",
      "visual": "position",
      "stages": [
        "consumer"
      ],
      "steps": [
        "GeoRadius mencari kandidat halte di sekitar coordinate raw.",
        "Jarak, arah, dan trip sequence membantu memilih kandidat.",
        "State membedakan menuju, tiba, dan meninggalkan halte.",
        "Pemeriksaan out-of-route menilai jarak terhadap route geometry trip."
      ],
      "terms": [
        {
          "term": "GeoRadius",
          "def": "Mencari kandidat di sekitar coordinate dalam radius tertentu.",
          "step": 0
        },
        {
          "term": "Haversine",
          "def": "Menghitung jarak permukaan bumi antara dua coordinate.",
          "step": 1
        },
        {
          "term": "state",
          "def": "Hasil sebelumnya yang dipakai mengolah laporan berikutnya.",
          "step": 2
        },
        {
          "term": "out-of-route",
          "def": "Indikasi posisi berjarak dari route geometry trip.",
          "step": 3
        }
      ],
      "payload": "position",
      "substage": "Stop position",
      "chapter": 2,
      "kicker": "09 / 20",
      "badge": "illustration"
    },
    {
      "id": "snapping",
      "title": "Snapping ke route geometry",
      "takeaway": "Raw adalah observasi; snap adalah estimasi pencocokan.",
      "visual": "snap",
      "stages": [
        "consumer"
      ],
      "steps": [
        "Coordinate raw dapat bergeser dari route geometry.",
        "HMM menilai kandidat lewat jarak, arah, dan kesinambungan.",
        "Jika pencocokan tidak valid, sistem dapat kembali ke raw.",
        "Marker dan stop status dapat berbeda karena acuan perhitungannya berbeda."
      ],
      "terms": [
        {
          "term": "snapping",
          "def": "Mencocokkan observasi GPS dengan route geometry yang diketahui.",
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
      "kicker": "10 / 20",
      "badge": "illustration"
    },
    {
      "id": "eta",
      "title": "ETA: rumus dan contoh",
      "takeaway": "Jarak tersisa pada route geometry dibagi kecepatan perhitungan.",
      "visual": "eta",
      "stages": [
        "consumer"
      ],
      "steps": [
        "ETA dihitung dari jarak tersisa dibagi kecepatan perhitungan.",
        "Implementasi memakai kecepatan minimum 30 km/jam; speed 24 dihitung sebagai 30.",
        "Dengan jarak dalam meter dan speed dalam km/jam: ETA detik = (jarak / 1.000) / speed × 3.600.",
        "Contoh 1.000 meter pada 30 km/jam menghasilkan 120 detik atau 2 menit."
      ],
      "terms": [
        {
          "term": "ETA",
          "def": "Perkiraan waktu tiba di pemberhentian.",
          "step": 0
        }
      ],
      "substage": "ETA",
      "chapter": 2,
      "kicker": "11 / 20",
      "badge": "illustration"
    },
    {
      "id": "position-meter-headway",
      "title": "Position meter dan headway",
      "takeaway": "Progres perjalanan membantu membaca jarak antarbus.",
      "visual": "progress-headway",
      "stages": [
        "consumer"
      ],
      "steps": [
        "Position meter menyatakan posisi bus di sepanjang acuan lintasan dalam meter.",
        "Data posisi membantu membandingkan jarak antarbus pada layanan dan arah yang sama.",
        "Contoh: posisi TJ-123 di 1.240 m dan TJ-201 di 1.640 m memiliki selisih 400 m."
      ],
      "terms": [
        {
          "term": "position meter",
          "def": "Ukuran posisi bus di sepanjang acuan lintasan.",
          "step": 0
        },
        {
          "term": "headway",
          "def": "Jarak antarbus yang dapat dilihat dalam ukuran posisi atau waktu.",
          "step": 1
        }
      ],
      "substage": "Position meter dan headway",
      "chapter": 2,
      "badge": "illustration",
      "kicker": "12 / 20"
    },
    {
      "id": "state-and-publish",
      "title": "Kondisi terakhir dan pembaruan informasi",
      "takeaway": "Consumer mengingat kondisi bus, lalu membagikan hasil pengolahannya.",
      "visual": "publish",
      "stages": [
        "consumer",
        "output-broker"
      ],
      "steps": [
        "Kondisi terakhir bus menjadi acuan saat laporan berikutnya datang.",
        "Consumer membagikan posisi dan informasi perjalanan terbaru kepada layanan yang membutuhkan.",
        "Saat bus tiba di halte, sistem juga mengirim kabar kedatangan untuk dicatat.",
        "Contoh: bus sudah meninggalkan B dan menuju C. Laporan berikutnya melanjutkan perjalanan ini."
      ],
      "terms": [],
      "substage": "Kondisi terakhir dan hasil pengolahan",
      "branch": "uses",
      "chapter": 3,
      "kicker": "13 / 20",
      "badge": "illustration"
    },
    {
      "id": "dashboard",
      "title": "Pembaruan informasi di dashboard",
      "takeaway": "Dashboard memulai dari data yang tersedia, lalu menerima kabar berikutnya.",
      "visual": "receivers",
      "stages": [
        "output-broker",
        "dashboard"
      ],
      "steps": [
        "Saat halaman dibuka, dashboard menampilkan kondisi bus yang sudah tersimpan.",
        "Saat data baru datang, posisi bus di layar diperbarui.",
        "Identitas dan koordinat pada hasil olahan worker menentukan titik bus yang ditampilkan."
      ],
      "terms": [],
      "branch": "uses",
      "chapter": 3,
      "kicker": "14 / 20",
      "badge": "illustration"
    },
    {
      "id": "operational-monitoring",
      "title": "Pemantauan celah halte dan headway",
      "takeaway": "Informasi perjalanan membantu memantau posisi bus di halte dan jarak antarbus.",
      "visual": "monitoring",
      "stages": [
        "output-broker",
        "dashboard"
      ],
      "steps": [
        "Celah bus–halte menggabungkan kabar kedatangan dengan sensor jarak untuk membantu pemantauan posisi bus di halte.",
        "Headway monitoring memantau posisi antarbus dalam rute yang sama."
      ],
      "terms": [],
      "branch": "uses",
      "chapter": 3,
      "badge": "illustration",
      "views": [
        {
          "title": "Celah bus–halte",
          "input": "Kedatangan + sensor",
          "description": "Membantu mengetahui posisi bus di halte.",
          "asset": "busStopGapPhoto"
        },
        {
          "title": "Headway monitoring",
          "input": "Posisi dan informasi perjalanan",
          "description": "Memantau posisi antarbus dalam rute yang sama.",
          "asset": "headwayPhoto"
        }
      ],
      "kicker": "15 / 20"
    },
    {
      "id": "persistence",
      "title": "Manfaat hasil pengolahan consumer",
      "takeaway": "Informasi perjalanan membantu operasional dan layanan penumpang.",
      "visual": "impact",
      "stages": [
        "consumer",
        "output-broker",
        "dashboard"
      ],
      "steps": [
        "Riwayat perjalanan menjadi bahan pemeriksaan jarak tempuh bus.",
        "Command Center memanfaatkan informasi posisi dan perjalanan untuk memantau layanan.",
        "TJ Apps dan PIS memanfaatkan informasi perjalanan untuk membantu penumpang merencanakan perjalanan."
      ],
      "terms": [
        {
          "term": "PIS",
          "def": "Passenger Information System: sistem informasi untuk penumpang.",
          "step": 2
        }
      ],
      "branch": "uses",
      "chapter": 3,
      "kicker": "16 / 20",
      "badge": "illustration"
    },
    {
      "id": "storage-tradeoff",
      "title": "Riwayat perjalanan untuk evaluasi",
      "takeaway": "Riwayat membantu evaluasi layanan dan membutuhkan ruang simpan.",
      "visual": "tradeoff",
      "stages": [
        "output-broker"
      ],
      "steps": [
        "Data riwayat GPS, kedatangan, dan perjalanan membantu menelusuri layanan yang sudah lewat.",
        "Semakin sering laporan dicatat dan semakin lama disimpan, semakin besar ruang yang dibutuhkan.",
        "Lama penyimpanan perlu disesuaikan dengan kebutuhan pemeriksaan dan evaluasi layanan."
      ],
      "terms": [],
      "branch": "storage",
      "chapter": 4,
      "kicker": "17 / 20",
      "badge": "illustration"
    },
    {
      "id": "issues",
      "title": "Live tracking issues",
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
        "Marker berbeda dari stop status: periksa raw/snap, referensi, dan state."
      ],
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
      "kicker": "18 / 20",
      "badge": "illustration"
    },
    {
      "id": "recap",
      "title": "Satu laporan, banyak manfaat",
      "takeaway": "Laporan posisi menjadi informasi perjalanan yang bisa dimanfaatkan.",
      "visual": "recap",
      "stages": "all",
      "steps": [
        "Bus mengirim identitas, posisi, dan waktu.",
        "Consumer melengkapi informasi dan menghitung kondisi perjalanan.",
        "Hasilnya membantu pemantauan layanan, pemeriksaan perjalanan, dan informasi penumpang."
      ],
      "terms": [],
      "recapStep": 2,
      "chapter": 5,
      "kicker": "19 / 20",
      "badge": "illustration"
    },
    {
      "id": "qa",
      "title": "Q&A",
      "takeaway": "Questions & discussion.",
      "visual": "qa",
      "stages": [],
      "steps": [
        "Pertanyaan?"
      ],
      "terms": [],
      "chapter": 5,
      "kicker": "20 / 20",
      "badge": "illustration"
    }
  ],
  "sourceTopic": "emq/gps/<source>/<busBodyNo>",
  "sourceTopicExample": "emq/gps/OBU/TJ-123",
  "sourceSubscription": "emq/gps/#",
  "dashboardExample": {
    "uid": "TJ-123",
    "position": {
      "coordinate": {
        "latitude": -6.18145,
        "longitude": 106.8109
      },
      "speed_kph": 24,
      "bearing": 135
    },
    "stop": {
      "in_transit_to": "C",
      "stopped_at": "",
      "previous": "B"
    }
  },
  "progressExample": {
    "bus": "TJ-123",
    "positionMeters": 1240,
    "otherBus": "TJ-201",
    "otherPositionMeters": 1640,
    "routeLengthMeters": 2000
  }
};
