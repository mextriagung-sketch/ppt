import { EducationLevel } from "./types";

export interface ThemePalette {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  font: 'sans-serif' | 'serif' | 'monospace';
}

export const THEME_PALETTES: ThemePalette[] = [
  {
    id: 'modern-blue',
    name: 'Modern Blue',
    primary: '#2563eb', // blue-600
    secondary: '#1e3a8a', // blue-900
    accent: '#60a5fa', // blue-400
    font: 'sans-serif'
  },
  {
    id: 'elegant-serif',
    name: 'Elegant Serif',
    primary: '#1e293b', // slate-800
    secondary: '#475569', // slate-600
    accent: '#94a3b8', // slate-400
    font: 'serif'
  },
  {
    id: 'eco-green',
    name: 'Eco Green',
    primary: '#16a34a', // green-600
    secondary: '#14532d', // green-900
    accent: '#4ade80', // green-400
    font: 'sans-serif'
  },
  {
    id: 'vibrant-orange',
    name: 'Vibrant Orange',
    primary: '#ea580c', // orange-600
    secondary: '#7c2d12', // orange-900
    accent: '#fb923c', // orange-400
    font: 'sans-serif'
  },
  {
    id: 'tech-mono',
    name: 'Tech Mono',
    primary: '#0f172a', // slate-900
    secondary: '#334155', // slate-700
    accent: '#38bdf8', // sky-400
    font: 'monospace'
  },
  {
    id: 'playful-pink',
    name: 'Playful Pink',
    primary: '#db2777', // pink-600
    secondary: '#831843', // pink-900
    accent: '#f472b6', // pink-400
    font: 'sans-serif'
  }
];

export const EDUCATION_LEVELS: EducationLevel[] = ['SD', 'SMP', 'SMA', 'SMK', 'Kuliah'];

export const CURRICULUM_TOPICS: Record<string, Record<string, string[]>> = {
  'SD': {
    'Pendidikan Agama dan Budi Pekerti': [
      'Kisah Teladan Para Nabi',
      'Mengenal Rukun Iman dan Islam',
      'Adab Terhadap Orang Tua dan Guru',
      'Thaharah (Bersuci)',
      'Hafalan Surah Pendek'
    ],
    'Pendidikan Pancasila': [
      'Simbol dan Sila Pancasila',
      'Aturan di Rumah dan Sekolah',
      'Keberagaman Suku dan Budaya',
      'Musyawarah Mencapai Mufakat',
      'Hak dan Kewajiban Anak'
    ],
    'IPAS': [
      'Bagian Tubuh Tumbuhan',
      'Wujud Zat dan Perubahannya',
      'Gaya di Sekitar Kita',
      'Energi dan Perubahannya',
      'Sistem Tata Surya',
      'Indonesiaku Kaya Budaya',
      'Cerita Tentang Daerahku',
      'Membangun Masyarakat yang Beradab'
    ],
    'Matematika': [
      'Bilangan Cacah sampai 10.000',
      'Pecahan Senilai',
      'FPB dan KPK',
      'Geometri Bangun Datar',
      'Pengukuran Luas dan Keliling',
      'Penyajian Data (Diagram Batang)'
    ],
    'Bahasa Indonesia': [
      'Menyimak Instruksi',
      'Membaca Teks Narasi',
      'Berdiskusi dengan Sopan',
      'Menulis Laporan Pengamatan',
      'Unsur Intrinsik Cerita'
    ],
    'PJOK': [
      'Gerak Lokomotor',
      'Aktivitas Senam Lantai',
      'Pola Hidup Sehat',
      'Permainan Bola Besar'
    ],
    'Informatika': [
      'Mengenal Perangkat Komputer',
      'Belajar Mengetik Dasar',
      'Logika Pemrograman Visual Sederhana (Scratch Jr)',
      'Etika Berinternet Aman',
      'Mencari Informasi di Internet'
    ],
    'Bahasa Inggris': [
      'Greetings and Introductions',
      'Numbers and Colors',
      'My Family and My House',
      'Animals and Plants',
      'Action Verbs Dasar'
    ],
    'Seni dan Prakarya': [
      'Mengenal Garis dan Warna',
      'Membuat Kerajinan Tangan',
      'Bernyanyi Lagu Nasional',
      'Gerak Tari Tradisional',
      'Teknik Menempel dan Menggunting'
    ],
    'Bahasa Arab': [
      'Mengenal Huruf Hijaiyah',
      'Isim Isyarah (Kata Tunjuk)',
      'Kosa Kata Anggota Keluarga',
      'Angka 1-20 dalam Bahasa Arab',
      'Percakapan Perkenalan Dasar'
    ]
  },
  'SMP': {
    'Pendidikan Agama dan Budi Pekerti': [
      'Al-Quran dan Sunnah sebagai Pedoman',
      'Sejarah Pertumbuhan Ilmu Pengetahuan Islam',
      'Sikap Jujur, Amanah, dan Istiqamah',
      'Tata Cara Shalat Berjamaah',
      'Zakat, Puasa, dan Haji'
    ],
    'Pendidikan Pancasila': [
      'Kedudukan dan Fungsi Pancasila',
      'Bentuk dan Kedaulatan Negara',
      'Tata Urutan Peraturan Perundang-undangan',
      'Sumpah Pemuda dan Semangat Kebangsaan',
      'Semangat dan Komitmen Mempertahankan NKRI'
    ],
    'Informatika': [
      'Berpikir Komputasional (Struktur Data, Tree/Graph)',
      'TIK (Integrasi Aplikasi Perkantoran)',
      'Sistem Komputer (Hardware, OS)',
      'Jaringan Komputer dan Internet',
      'Analisis Data (Web Scraping, Visualisasi)',
      'Algoritma dan Pemrograman (Visual Programming)',
      'Dampat Sosial Informatika',
      'Praktik Lintas Bidang'
    ],
    'IPA': [
      'Sel dan Mikroskop',
      'Sistem Koordinasi dan Reproduksi',
      'Tekanan Zat dan Penerapannya',
      'Listrik Statis dan Dinamis',
      'Kemagnetan dan Induksi',
      'Pewarisan Sifat (Genetika)',
      'Teknologi Ramah Lingkungan'
    ],
    'IPS': [
      'Kondisi Geografis Indonesia',
      'Pembangunan Ekonomi dan Pemberdayaan Masyarakat',
      'Nasionalisme dan Jati Diri Bangsa',
      'Interaksi Antarruang di Lingkungan Global',
      'Kehidupan Masyarakat pada Masa Praaksara'
    ],
    'Matematika': [
      'Bilangan Berpangkat dan Akar',
      'Persamaan dan Fungsi Kuadrat',
      'Transformasi Geometri (Translasi, Rotasi)',
      'Kekongruenan dan Kesebangunan',
      'Statistika dan Peluang'
    ],
    'Bahasa Indonesia': [
      'Teks Laporan Hasil Observasi',
      'Teks Eksposisi dalam Media Massa',
      'Teks Puisi Modern',
      'Teks Eksplanasi Fenomena Alam',
      'Teks Ulasan Karya Seni'
    ],
    'Bahasa Inggris': [
      'Describing People and Objects',
      'Recounting Past Events',
      'Procedural Texts (Manuals/Recipes)',
      'Sharing Opinions properly',
      'Identifying Main Ideas in Narratives'
    ],
    'PJOK': [
      'Teknik Dasar Bola Voli',
      'Atletik Lari Jarak Pendek',
      'Pencak Silat: Jurus Dasar',
      'Kebugaran Jasmani Lanjutan',
      'Bahaya Pergaulan Bebas dan Narkoba'
    ],
    'Seni dan Prakarya': [
      'Menggambar Ragam Hias',
      'Ansambel Musik Campuran',
      'Tari Kreasi Baru',
      'Seni Peran dan Teater Modern',
      'Pengolahan Bahan Serealia dan Kacang-kacangan'
    ],
    'Bahasa Arab': [
      'Hobi (Al-Hiwayah)',
      'Kegiatan di Sekolah (Al-Ansyithah Fil Madrasah)',
      'Profesi (Al-Mihan)',
      'Rumah dan Alamat (Al-Bait wal Unwan)',
      'Jam dan Keseharian (As-Sa\'ah)'
    ]
  },
  'SMA': {
    'Pendidikan Agama dan Budi Pekerti': [
      'Berpikir Kritis dan Demokratis',
      'Saling Menasihati dalam Kebenaran',
      'Peradaban Islam di Dunia',
      'Hukum Waris dalam Islam',
      'Pernikahan dalam Islam'
    ],
    'Pendidikan Pancasila': [
      'Pancasila sebagai Ideologi Terbuka',
      'Pelanggaran HAM dalam Perspektif Pancasila',
      'Sistem Hukum dan Peradilan di Indonesia',
      'Peran Indonesia dalam Hubungan Internasional',
      'Strategi Menghadapi Ancaman Terhadap Negara'
    ],
    'Bahasa Indonesia': [
      'Mengonstruksi Informasi dalam Teks Prosedur',
      'Menganalisis Sistematika Teks Eksplanasi',
      'Menilai Karya Melalui Resensi',
      'Menulis Artikel Opini',
      'Menganalisis Unsur Kebahasaan Novel'
    ],
    'Bahasa Inggris': [
      'Analytical Exposition Texts',
      'Hortatory Exposition',
      'Narrative Texts: Legends and Myths',
      'Discussion Texts on Controversial Issues',
      'News Items and Information Reporting'
    ],
    'PJOK': [
      'Strategi Permainan Bola Basket',
      'Teknik Senam Ketangkasan',
      'Penyusunan Program Latihan Fisik',
      'Pencegahan dan Perawatan Cedera Olahraga',
      'Analisis Bahaya HIV/AIDS'
    ],
    'Seni dan Prakarya': [
      'Apresiasi Seni Rupa Kontemporer',
      'Kritik Musik Modern',
      'Koreografi Tari Kelompok',
      'Manajemen Pergelaran Teater',
      'Wirausaha Kerajinan untuk Pasar Global'
    ],
    'Informatika': [
      'Strategi Algoritmik Lanjut',
      'Berpikir Komputasional SMA',
      'Sistem Komputer Terintegrasi',
      'Jaringan Komputer dan Keamanan Data',
      'Analisis Data Besar (Big Data)',
      'Artificial Intelligence Sederhana'
    ],
    'Matematika': [
      'Eksponen dan Logaritma',
      'Vektor Lanjutan',
      'Sistem Persamaan Linear Tiga Variabel',
      'Fungsi Kuadrat dan Trigonometri',
      'Limit Fungsi Aljabar',
      'Turunan dan Integral'
    ],
    'Fisika': [
      'Hakikat Fisika dan Prosedur Ilmiah',
      'Besaran, Satuan, dan Dimensi',
      'Kinematika Gerak Lurus',
      'Dinamika Gerak (Hukum Newton)',
      'Hukum Grawitasi Newton',
      'Usaha dan Energi',
      'Momentum and Impuls',
      'Gelombang Elektromagnetik'
    ],
    'Biologi': [
      'Virus dan Peranannya',
      'Keanekaragaman Hayati',
      'Ekosistem dan Perubahan Lingkungan',
      'Inovasi Teknologi Biologi (Bioteknologi)',
      'Sel sebagai Unit Terkecil Kehidupan',
      'Evolusi dan Biologi Molekuler'
    ],
    'Kimia': [
      'Metode Ilmiah dan Keselamatan Kerja Lab',
      'Struktur Atom dan Konfigurasi Elektron',
      'Hukum Dasar Kimia',
      'Laju Reaksi',
      'Kesetimbangan Kimia',
      'Termokimia'
    ],
    'Ekonomi': [
      'Konsep Ilmu Ekonomi Dasar',
      'Keseimbangan Pasar dan Struktur Pasar',
      'Lembaga Keuangan dan OJK',
      'Manajemen dan Kewirausahaan',
      'Akuntansi Perusahaan Jasa'
    ],
    'Sosiologi': [
      'Identitas Diri dalam Masyarakat',
      'Tindakan Sosial dan Interaksi',
      'Lembaga Sosial',
      'Ragam Gejala Sosial',
      'Penelitian Sosial Sederhana'
    ],
    'Bahasa Arab': [
      'Kesehatan (Ash-Shihhah)',
      'Pemuda (Asy-Syabab)',
      'Sastra Arab Modern',
      'Islam di Dunia Modern',
      'Balaghah Dasar'
    ]
  },
  'SMK': {
    'Program Keahlian TKR': [
      'Cara Kerja Mesin 4 Tak dan 2 Tak',
      'Sistem Injeksi Bahan Bakar (EFI)',
      'Sistem Transmisi Manual/Otomatis',
      'Diagnosis Kerusakan Engine',
      'Kesehatan dan Keselamatan Kerja (K3)'
    ],
    'Program Keahlian TKJ': [
      'Instalasi Sistem Operasi Jaringan',
      'Setting Mikrotik Lanjutan',
      'Keamanan Jaringan Nirkabel',
      'Troubleshooting LAN dan WAN',
      'Cloud Computing Dasar'
    ],
    'Program Keahlian Akuntansi': [
      'Siklus Akuntansi Perusahaan Dagang',
      'Perpajakan Indonesia',
      'Akuntansi Pemerintah',
      'Audit dan Pemeriksaan Keuangan',
      'Aplikasi Komputer Akuntansi (MYOB/Zahir)'
    ],
    'Produk Kreatif & Kewirausahaan': [
      'Perencanaan Produksi Massal',
      'Media Promosi Digital',
      'Analisis Laporan Keuangan Bisnis',
      'Paten dan Hak Kekayaan Intelektual'
    ]
  },
  'Kuliah': {
    'Metodologi Penelitian': [
      'Menyusun Latar Belakang Masalah',
      'Tinjauan Pustaka & Kerangka Teori',
      'Metode Kualitatif vs Kuantitatif',
      'Teknik Analisis Data Penelitian',
      'Sitasi dan Penulisan Daftar Pustaka'
    ],
    'Teknik Informatika': [
      'Struktur Data dan Algoritma Kompleks',
      'Pemrograman Berorientasi Objek (OOP)',
      'Basis Data Relasional dan Non-Relasional',
      'Arsitektur Komputer dan Organisasi',
      'User Experience (UX) Design'
    ],
    'Manajemen Bisnis': [
      'Manajemen Strategis Perusahaan',
      'Perilaku Organisasi Lanjutan',
      'Manajemen Rantai Pasok (SCM)',
      'Digital Marketing Strategy',
      'Analisis Investasi dan Portofolio'
    ],
    'Tugas Akhir/Skripsi': [
      'Seminar Proposal (Sempro)',
      'Presentasi Hasil Penelitian',
      'Sidang Akhir Skripsi',
      'Publikasi Jurnal Ilmiah'
    ]
  }
};

