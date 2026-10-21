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
      "do_number": "DO-DEMO-001",
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
      "do_number": "DO-DEMO-001",
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
      "do_number": "DO-DEMO-001",
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
      "do_number": "DO-DEMO-001",
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
      "do_number": "DO-DEMO-001",
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
  "pipeline": [
    "Enrich + history",
    "Stop position",
    "Out-of-route",
    "Snap",
    "ETA",
    "Stopping point",
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
      "terms": [],
      "chapter": 0,
      "kicker": "02 / 18",
      "badge": "illustration"
    },
    {
      "id": "live-tracking",
      "title": "Apa itu live tracking?",
      "takeaway": "Pembaruan posisi berkala yang diberi context perjalanan.",
      "visual": "overview",
      "stages": "all",
      "steps": [
        "Perangkat melaporkan posisi dan waktu secara berkala.",
        "Consumer mengolah dan publish ke destination broker; dashboard menerima update, sementara downstream services melakukan persist / process."
      ],
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
      "kicker": "04 / 18",
      "badge": "illustration"
    },
    {
      "id": "brokers",
      "title": "MQTT broker",
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
      "kicker": "05 / 18",
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
      "kicker": "06 / 18",
      "badge": "illustration"
    },
    {
      "id": "consumer",
      "title": "Consumer: parallel processing",
      "takeaway": "Pemrosesan paralel tetap membutuhkan urutan per bus.",
      "visual": "consumer",
      "stages": [
        "rabbitmq",
        "consumer"
      ],
      "steps": [
        "Setiap queue memiliki worker pool untuk mengolah pesan.",
        "Hash body number memilih worker yang konsisten di dalam pool.",
        "Prefetch membatasi pesan belum di-ACK; ACK mengonfirmasi penanganan delivery.",
        "Setiap laporan melewati enrichment, perhitungan, penyimpanan history cache di Redis, lalu publishing."
      ],
      "terms": [
        {
          "term": "worker pool",
          "def": "Sekumpulan pelaksana tugas yang berbagi pekerjaan.",
          "step": 0
        },
        {
          "term": "worker",
          "def": "Pelaksana processing; implementasinya menggunakan goroutine Go.",
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
      "title": "Enrichment: melengkapi context",
      "takeaway": "Consumer melengkapi raw GPS message menggunakan reference data di Redis.",
      "visual": "enrichment",
      "stages": [
        "consumer"
      ],
      "steps": [
        "Mulai dari raw GPS message yang sudah dinormalisasi.",
        "Consumer lookup reference data di Redis dengan key bus, route, atau trip untuk menghindari database read per report.",
        "Enriched message membawa raw GPS beserta context kendaraan dan perjalanan."
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
      "kicker": "08 / 18",
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
      "kicker": "09 / 18",
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
      "kicker": "10 / 18",
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
      "kicker": "11 / 18",
      "badge": "illustration"
    },
    {
      "id": "state-and-publish",
      "title": "Update state dan publish",
      "takeaway": "Satu hasil pengolahan mendukung laporan berikutnya dan banyak penerima.",
      "visual": "publish",
      "stages": [
        "consumer",
        "output-broker"
      ],
      "steps": [
        "Perbarui history:<bus> di Redis untuk laporan berikutnya.",
        "Publishingkan generic dan vehicle update sesuai kebutuhan penerima.",
        "Terbitkan pula GPS history, arrival, dan travel time ketika syaratnya terpenuhi.",
        "Payload kini memuat observasi, context, posisi, snap, dan estimasi."
      ],
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
        },
        {
          "term": "position meter",
          "def": "Posisi sepanjang acuan route geometry dalam meter.",
          "step": 3
        },
        {
          "term": "headway",
          "def": "Jarak waktu atau posisi antarbus dalam context layanan.",
          "step": 3
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
      "title": "Dashboard dan downstream services",
      "takeaway": "Kondisi tersimpan memberi awal; stream membawa pembaruan.",
      "visual": "receivers",
      "stages": [
        "output-broker",
        "dashboard"
      ],
      "steps": [
        "Saat halaman dibuka, API memberi snapshot kondisi tersimpan.",
        "MQTT memperbarui kendaraan dan headway setelah data awal siap.",
        "Celah halte menggabungkan informasi arrival/generic dengan sensor."
      ],
      "terms": [
        {
          "term": "snapshot",
          "def": "Salinan kondisi tersimpan pada saat dibaca.",
          "step": 0
        },
        {
          "term": "page prefetch",
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
      "title": "Data persistence",
      "takeaway": "Keadaan terakhir dan riwayat memiliki pola storage berbeda.",
      "visual": "storage",
      "stages": [
        "output-broker"
      ],
      "steps": [
        "tije-bus-tracking melakukan upsert kondisi terakhir per bus.",
        "tije-bus-historyes menambah record GPS dan arrival.",
        "Travel time antarsegmen juga dipersist untuk analisis perjalanan."
      ],
      "terms": [
        {
          "term": "upsert",
          "def": "Menambah atau memperbarui record dengan identitas yang sama.",
          "step": 0
        },
        {
          "term": "insert",
          "def": "Menambahkan record baru ke storage.",
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
      "title": "Historical data dan storage",
      "takeaway": "Frekuensi laporan dan masa simpan menentukan banyaknya record.",
      "visual": "tradeoff",
      "stages": [
        "output-broker"
      ],
      "steps": [
        "Setiap sampel atau kejadian historys menambah record.",
        "Kebutuhan analisis perlu diseimbangkan dengan biaya simpan dan baca.",
        "Retention, partitioning, dan archiving adalah opsi pengelolaan sesuai kebutuhan."
      ],
      "terms": [
        {
          "term": "retention",
          "def": "Kebijakan berapa lama data disimpan.",
          "step": 2
        },
        {
          "term": "partitioning / archiving",
          "def": "Pilihan mengelompokkan dan memindahkan data historys.",
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
      "kicker": "16 / 18",
      "badge": "illustration"
    },
    {
      "id": "recap",
      "title": "Satu report, banyak informasi",
      "takeaway": "Setiap tahap mengubah laporan sederhana menjadi context yang berguna.",
      "visual": "recap",
      "stages": "all",
      "steps": [
        "Bus mengirim identitas, coordinate, dan waktu.",
        "Worker menambahkan context, menghitung, serta mengingat state.",
        "Hasilnya menggerakkan dashboard, layanan operasional, dan riwayat."
      ],
      "terms": [],
      "recapStep": 2,
      "chapter": 5,
      "kicker": "17 / 18",
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
      "kicker": "18 / 18",
      "badge": "illustration"
    }
  ],
  "sourceTopic": "emq/gps/<source>/<busBodyNo>",
  "sourceTopicExample": "emq/gps/OBU/TJ-123",
  "sourceSubscription": "emq/gps/#"
};
