'use client';

import React, { useState, useEffect } from 'react';
import { 
  Award, Brain, CheckCircle, Clock, Download, Plus, 
  Printer, ShieldCheck, Sparkles, UserPlus, ArrowRight, Info, Briefcase,
  Lock, KeyRound, LogOut, Eye, EyeOff, Calculator, Palette, Megaphone, Trash2
} from 'lucide-react';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

// =========================================================================
// 1. BANK SOAL UMUM (DISC & MBTI)
// =========================================================================
const BASE_QUESTIONS = [
  // --- DISC (8 Soal) ---
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Gaya Kerja & Komunikasi (DISC)',
    moduleBadge: 'Modul 1 (DISC)',
    instruction: 'Pilih 1 opsi yang PALING sesuai (Most) dan 1 opsi yang PALING TIDAK sesuai (Least) dengan karakter kerja Anda:',
    options: [
      { key: 'D', text: 'Tegas, cepat mengambil keputusan, dan berorientasi hasil nyata.' },
      { key: 'I', text: 'Antusias, kreatif, persuasif, dan senang memotivasi tim.' },
      { key: 'S', text: 'Tenang, sabar, setia kawan, dan menyukai stabilitas tim.' },
      { key: 'C', text: 'Teliti, analitis, taat SOP, dan mengutamakan ketepatan data.' }
    ]
  },
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Gaya Kerja & Komunikasi (DISC)',
    moduleBadge: 'Modul 1 (DISC)',
    instruction: 'Saat menghadapi deadline ketat atau target kampanye yang mendesak:',
    options: [
      { key: 'D', text: 'Mengambil kendali alur kerja dan mengeksekusi secepat mungkin.' },
      { key: 'I', text: 'Membangun semangat tim agar tetap positif dan memicu ide-ide segar.' },
      { key: 'S', text: 'Bekerja dengan ritme stabil dan memastikan seluruh anggota tim sinkron.' },
      { key: 'C', text: 'Memverifikasi ulang seluruh checklist dan parameter teknis agar tanpa celah.' }
    ]
  },
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Gaya Kerja & Komunikasi (DISC)',
    moduleBadge: 'Modul 1 (DISC)',
    instruction: 'Dalam situasi perbedaan pendapat dengan rekan tim/klien:',
    options: [
      { key: 'D', text: 'Menyampaikan argumen secara lugas, to-the-point, dan fokus solusi.' },
      { key: 'I', text: 'Mencairkan suasana dengan komunikasi diplomatis agar tetap akrab.' },
      { key: 'S', text: 'Mendengarkan semua pihak dengan sabar demi keharmonisan bersama.' },
      { key: 'C', text: 'Menyajikan data, fakta objektif, dan landasan aturan resmi.' }
    ]
  },
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Gaya Kerja & Komunikasi (DISC)',
    moduleBadge: 'Modul 1 (DISC)',
    instruction: 'Hal yang paling membuat Anda merasa puas setelah bekerja:',
    options: [
      { key: 'D', text: 'Target performa KPI atau omzet berhasil terlampaui maksimal.' },
      { key: 'I', text: 'Konten viral, interaksi audiens tinggi, dan respon positif melimpah.' },
      { key: 'S', text: 'Proyek berjalan lancar, aman, dan hubungan tim solid.' },
      { key: 'C', text: 'Laporan metrik data 100% rapi, terstruktur, dan akurat.' }
    ]
  },
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Gaya Kerja & Komunikasi (DISC)',
    moduleBadge: 'Modul 1 (DISC)',
    instruction: 'Hal yang paling membuat Anda kurang nyaman saat bekerja:',
    options: [
      { key: 'D', text: 'Ritme kerja lamban dan keraguan bertele-tele dalam mengambil keputusan.' },
      { key: 'I', text: 'Suasana kerja kaku, monoton, dan tidak ada ruang untuk ide kreatif.' },
      { key: 'S', text: 'Perubahan rencana mendadak tanpa koordinasi yang jelas.' },
      { key: 'C', text: 'Keputusan impulsif tanpa dasar data dan standar mutu yang jelas.' }
    ]
  },
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Gaya Kerja & Komunikasi (DISC)',
    moduleBadge: 'Modul 1 (DISC)',
    instruction: 'Bagaimana rekan kerja biasanya menilai kepribadian Anda:',
    options: [
      { key: 'D', text: 'Percaya diri, berani memimpin, dan tegas.' },
      { key: 'I', text: 'Kreatif, komunikatif, dan berjiwa sosial tinggi.' },
      { key: 'S', text: 'Sabar, dapat diandalkan, dan pendengar yang baik.' },
      { key: 'C', text: 'Rapi, disiplin, dan telaten menjaga kualitas.' }
    ]
  },
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Gaya Kerja & Komunikasi (DISC)',
    moduleBadge: 'Modul 1 (DISC)',
    instruction: 'Ketika hasil kampanye/proyek tidak sesuai ekspektasi:',
    options: [
      { key: 'D', text: 'Langsung mengganti strategi baru dan melipatgandakan eksekusi.' },
      { key: 'I', text: 'Melakukan sesi brainstorming ulang bersama tim untuk mencari angle menarik.' },
      { key: 'S', text: 'Menenangkan tim dan mengevaluasi beban kerja secara bertahap.' },
      { key: 'C', text: 'Melakukan audit analitik mendalam pada funnel dan data teknis.' }
    ]
  },
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Gaya Kerja & Komunikasi (DISC)',
    moduleBadge: 'Modul 1 (DISC)',
    instruction: 'Gaya Anda saat menyelesaikan proyek baru:',
    options: [
      { key: 'D', text: 'Membagi tugas dengan cepat dan memastikan selesai tepat waktu.' },
      { key: 'I', text: 'Menyuntikkan ide-ide out-of-the-box agar hasil karya unik.' },
      { key: 'S', text: 'Menuntaskan pekerjaan dengan telaten dari awal sampai tuntas.' },
      { key: 'C', text: 'Memastikan semua detail desain/output sesuai panduan standar brand.' }
    ]
  },

  // --- MBTI (8 Soal) ---
  {
    module: 'mbti',
    dim: 'EI',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 (MBTI)',
    instruction: 'Pilih pernyataan yang paling mencerminkan cara Anda mengisi ulang energi:',
    options: [
      { key: 'E', text: 'Saya merasa bersemangat dan segar saat bertukar ide dalam forum interaktif.' },
      { key: 'I', text: 'Saya merasa lebih fokus dan tajam saat merenung dan fokus berpikir mandiri.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'EI',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 (MBTI)',
    instruction: 'Kecenderungan Anda saat mengkomunikasikan konsep baru:',
    options: [
      { key: 'E', text: 'Langsung menyampaikan secara lisan, berdiskusi, dan membangun antusiasme.' },
      { key: 'I', text: 'Menyusun konsep tertulis secara matang terlebih dahulu sebelum dipresentasikan.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'SN',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 (MBTI)',
    instruction: 'Pilih bagaimana Anda melihat peluang konten atau tren:',
    options: [
      { key: 'S', text: 'Fokus pada data performa konten masa lalu yang sudah terbukti menghasilkan.' },
      { key: 'N', text: 'Fokus pada tren baru yang akan meledak di masa depan dan ide-ide eksperimental.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'SN',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 (MBTI)',
    instruction: 'Saat merancang strategi pemasaran:',
    options: [
      { key: 'S', text: 'Menggunakan format panduan baku yang jelas langkah demi langkah.' },
      { key: 'N', text: 'Menciptakan konsep visual & narasi cerita baru yang belum pernah dicoba kompetitor.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'TF',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 (MBTI)',
    instruction: 'Dasar utama Anda dalam menilai keberhasilan sebuah konten/proyek:',
    options: [
      { key: 'T', text: 'Metrik objektif (angka konversi, ROAS, CTR, dan rasio biaya).' },
      { key: 'F', text: 'Dampak emosional, kedekatan brand dengan audiens, dan sentimen positif.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'TF',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 (MBTI)',
    instruction: 'Ketika harus memberikan kritik atau masukan kreatif kepada tim:',
    options: [
      { key: 'T', text: 'Menyampaikan kelemahan secara to-the-point berbasis data efektivitas.' },
      { key: 'F', text: 'Menyampaikan dengan kalimat suportif agar tidak mematikan semangat kreatif mereka.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'JP',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 (MBTI)',
    instruction: 'Bagaimana Anda mengatur rencana kerja (Editorial Plan / Calendar):',
    options: [
      { key: 'J', text: 'Memiliki jadwal kalender terstruktur rapi untuk 1 bulan ke depan sejak awal.' },
      { key: 'P', text: 'Menyiapkan rencana garis besar namun tetap fleksibel mengikuti momen viral spontan.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'JP',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 (MBTI)',
    instruction: 'Respon Anda terhadap aturan atau guideline brand yang sangat kaku:',
    options: [
      { key: 'J', text: 'Merasa nyaman karena ada batasan yang jelas agar konsistensi terjaga.' },
      { key: 'P', text: 'Lebih suka jika diberi kebebasan bereksplorasi di luar batasan standar.' }
    ]
  }
];

// =========================================================================
// 2. BANK SOAL KHUSUS DIGITAL MARKETING & KREATIVITAS (8 SOAL)
// =========================================================================
const DIGITAL_MARKETING_QUESTIONS = [
  {
    module: 'marketing',
    moduleTitle: 'Modul Khusus: Digital Marketing & Creative Strategy',
    moduleBadge: 'Tes Khusus Digital Marketing',
    instruction: 'Analisis Metrik Ads: Iklan Meta/TikTok Ads memiliki Impressions 10.000 kali dan Link Clicks sebanyak 300 kali. Berapakah nilai Click-Through Rate (CTR) iklan tersebut?',
    correct: 'B',
    options: [
      { key: 'A', text: '0.3%' },
      { key: 'B', text: '3.0% (Rumus: [300 / 10.000] x 100% = 3.0%)' },
      { key: 'C', text: '30%' },
      { key: 'D', text: '1.5%' }
    ]
  },
  {
    module: 'marketing',
    moduleTitle: 'Modul Khusus: Digital Marketing & Creative Strategy',
    moduleBadge: 'Tes Khusus Digital Marketing',
    instruction: 'Formula Copywriting: Dalam formula AIDA (Attention, Interest, Desire, Action), bagian manakah yang berfungsi sebagai "Hook" 3 detik pertama pada video reels/TikTok?',
    correct: 'A',
    options: [
      { key: 'A', text: 'Attention (Menangkap fokus audiens agar berhenti scrolling)' },
      { key: 'B', text: 'Interest (Menjelaskan fitur produk secara detail)' },
      { key: 'C', text: 'Desire (Memberikan testimoni dan diskon)' },
      { key: 'D', text: 'Action (Mengajak klik link di bio)' }
    ]
  },
  {
    module: 'marketing',
    moduleTitle: 'Modul Khusus: Digital Marketing & Creative Strategy',
    moduleBadge: 'Tes Khusus Digital Marketing',
    instruction: 'Evaluasi ROAS (Return on Ad Spend): Biaya iklan yang dikeluarkan adalah Rp2.000.000 dan menghasilkan omzet penjualan langsung sebesar Rp8.000.000. Berapa nilai ROAS kampanye tersebut?',
    correct: 'C',
    options: [
      { key: 'A', text: '2x' },
      { key: 'B', text: '3x' },
      { key: 'C', text: '4x (Rumus: Rp8.000.000 / Rp2.000.000 = 4x ROAS)' },
      { key: 'D', text: '6x' }
    ]
  },
  {
    module: 'marketing',
    moduleTitle: 'Modul Khusus: Digital Marketing & Creative Strategy',
    moduleBadge: 'Tes Khusus Digital Marketing',
    instruction: 'Kreativitas Judul (Hook Angle): Manakah judul konten video kuliner yang paling memiliki potensi Click-Through Rate (CTR) & retensi tinggi di media sosial?',
    correct: 'C',
    options: [
      { key: 'A', text: 'Menu Makanan Enak dan Murah Tersedia di Restoran Kami Hari Ini' },
      { key: 'B', text: 'Informasi Jam Buka dan Lokasi Cabang Baru Kami' },
      { key: 'C', text: 'Jangan Beli Menu Ini Kalau Nggak Mau Ketagihan! Rahasia Sambal yang Bikin Antre 2 Jam' },
      { key: 'D', text: 'Kunjungi Restoran Kami untuk Mendapatkan Diskon Menarik' }
    ]
  },
  {
    module: 'marketing',
    moduleTitle: 'Modul Khusus: Digital Marketing & Creative Strategy',
    moduleBadge: 'Tes Khusus Digital Marketing',
    instruction: 'Strategi Funnel Marketing: Konten tipe "Top of Funnel" (TOFU) paling efektif bertujuan untuk apa?',
    correct: 'A',
    options: [
      { key: 'A', text: 'Brand Awareness & Menjangkau audiens baru yang belum kenal produk' },
      { key: 'B', text: 'Hard Selling langsung meminta transfer rekening' },
      { key: 'C', text: 'Customer Retention untuk pelanggan lama' },
      { key: 'D', text: 'Klaim garansi dan layanan pelanggan' }
    ]
  },
  {
    module: 'marketing',
    moduleTitle: 'Modul Khusus: Digital Marketing & Creative Strategy',
    moduleBadge: 'Tes Khusus Digital Marketing',
    instruction: 'Optimasi Retensi Video: Jika grafik retensi video TikTok Anda mengalami penurunan tajam (drop) di detik ke-3, perbaikan kreatif apa yang paling krusial dilakukan?',
    correct: 'B',
    options: [
      { key: 'A', text: 'Mengubah Call-to-Action (CTA) di bagian akhir video' },
      { key: 'B', text: 'Mengganti visual hook 3 detik awal dengan pergerakan cepat, teks kontras, atau pertanyaan provokatif' },
      { key: 'C', text: 'Memperpanjang durasi video menjadi 5 menit' },
      { key: 'D', text: 'Menghapus deskripsi caption video' }
    ]
  },
  {
    module: 'marketing',
    moduleTitle: 'Modul Khusus: Digital Marketing & Creative Strategy',
    moduleBadge: 'Tes Khusus Digital Marketing',
    instruction: 'A/B Testing Kreatif: Saat menjalankan A/B testing iklan berbayar, aturan paling baku agar hasil pengujian valid adalah:',
    correct: 'A',
    options: [
      { key: 'A', text: 'Hanya mengubah 1 variabel kreatif (misal: hanya beda Thumbnail atau Hook) dengan target audiens & budget yang sama' },
      { key: 'B', text: 'Mengubah semua copy, video, audiens, dan budget sekaligus bersamaan' },
      { key: 'C', text: 'Menjalankan iklan hanya selama 1 jam saja' },
      { key: 'D', text: 'Memilih pemenang hanya berdasarkan jumlah likes bukan konversi' }
    ]
  },
  {
    module: 'marketing',
    moduleTitle: 'Modul Khusus: Digital Marketing & Creative Strategy',
    moduleBadge: 'Tes Khusus Digital Marketing',
    instruction: 'Pilar Konten (Content Pillar): Komposisi kalender konten media sosial brand bisnis yang sehat umumnya mengombinasikan:',
    correct: 'D',
    options: [
      { key: 'A', text: '100% Promo jualan produk setiap hari tanpa konten edukasi' },
      { key: 'B', text: '100% Konten meme lucu tanpa mengenalkan produk sama sekali' },
      { key: 'C', text: 'Hanya repost berita viral luar negeri' },
      { key: 'D', text: 'Edukasi / Solusi Masalah (40%), Hiburan / Relatable (30%), Bukti Sosial / Testimoni (20%), Promosi Penjualan (10%)' }
    ]
  }
];

// =========================================================================
// 3. BANK SOAL POSISI UMUM / CREW (LOGIKA IQ & BERHITUNG KASIR)
// =========================================================================
const GENERAL_OPERATIONAL_QUESTIONS = [
  // IQ
  {
    module: 'iq',
    moduleTitle: 'Modul 3: Logika & Penalaran Kognitif (IQ)',
    moduleBadge: 'Modul 3 (IQ)',
    instruction: 'Silogisme Logika: Semua bahan makanan beku harus disimpan di freezer. Semua daging ayam adalah bahan makanan beku. Kesimpulan yang PASTI BENAR:',
    correct: 'B',
    options: [
      { key: 'A', text: 'Semua yang disimpan di freezer adalah daging ayam.' },
      { key: 'B', text: 'Semua daging ayam harus disimpan di freezer.' },
      { key: 'C', text: 'Sebagian bahan makanan beku tidak perlu freezer.' },
      { key: 'D', text: 'Freezer hanya digunakan untuk daging ayam.' }
    ]
  },
  {
    module: 'iq',
    moduleTitle: 'Modul 3: Logika & Penalaran Kognitif (IQ)',
    moduleBadge: 'Modul 3 (IQ)',
    instruction: 'Deret Angka: Tentukan angka selanjutnya: 4, 8, 16, 32, ?',
    correct: 'C',
    options: [
      { key: 'A', text: '48' },
      { key: 'B', text: '56' },
      { key: 'C', text: '64 (Pola perkalian 2: 32 x 2 = 64)' },
      { key: 'D', text: '72' }
    ]
  },
  // Berhitung Kasir
  {
    module: 'math',
    moduleTitle: 'Modul 4: Tes Berhitung Cepat & Kasir Outlet',
    moduleBadge: 'Modul 4 (Berhitung Kasir)',
    instruction: 'Hitung Uang Kembalian: Pembeli memesan 2 porsi makanan seharga total Rp46.500. Pembeli membayar dengan uang pecahan Rp100.000. Berapa uang kembalian yang harus Anda serahkan?',
    correct: 'B',
    options: [
      { key: 'A', text: 'Rp54.500' },
      { key: 'B', text: 'Rp53.500 (Rp100.000 - Rp46.500 = Rp53.500)' },
      { key: 'C', text: 'Rp52.500' },
      { key: 'D', text: 'Rp53.000' }
    ]
  },
  {
    module: 'math',
    moduleTitle: 'Modul 4: Tes Berhitung Cepat & Kasir Outlet',
    moduleBadge: 'Modul 4 (Berhitung Kasir)',
    instruction: 'Hitung Diskon Promo: Menu Paket Family seharga Rp150.000 mendapat potongan diskon promo 20%. Berapa harga yang harus dibayar pelanggan?',
    correct: 'A',
    options: [
      { key: 'A', text: 'Rp120.000 (Diskon 20% x 150rb = 30rb -> 150rb - 30rb = 120rb)' },
      { key: 'B', text: 'Rp130.000' },
      { key: 'C', text: 'Rp125.000' },
      { key: 'D', text: 'Rp115.000' }
    ]
  }
];

export default function Home() {
  const [view, setView] = useState('applicant-form');
  const [db, setDb] = useState([]);
  
  // HR Auth State
  const [isHrAuthenticated, setIsHrAuthenticated] = useState(false);
  const [hrPasswordInput, setHrPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [hrPinCode, setHrPinCode] = useState('admin123');

  // Posisi (Hanya dikelola oleh HR)
  const [positionsList, setPositionsList] = useState([
    { title: 'Digital Marketing & Content Specialist', dept: 'Growth & Marketing' },
    { title: 'Social Media & Creative Copywriter', dept: 'Creative & Branding' },
    { title: 'Crew Outlet / Kasir / Server', dept: 'Outlet Operations' },
    { title: 'Cook / Kitchen Crew', dept: 'Kitchen Operations' },
    { title: 'Leader / Supervisor Outlet', dept: 'Outlet Operations' },
    { title: 'Product Lead / Senior PM', dept: 'Product & Tech' }
  ]);

  const [showAddPosModal, setShowAddPosModal] = useState(false);
  const [newPosTitle, setNewPosTitle] = useState('');
  const [newPosDept, setNewPosDept] = useState('');

  // Form Pelamar
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: 'Digital Marketing & Content Specialist',
    dept: 'Growth & Marketing'
  });

  const [currentApplicant, setCurrentApplicant] = useState(null);
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1200);
  const [activeReport, setActiveReport] = useState(null);

  // Load Saved Data
  useEffect(() => {
    const savedDb = localStorage.getItem('tm_assessment_db_v6');
    const savedPos = localStorage.getItem('tm_custom_positions_v6');
    const savedPin = localStorage.getItem('tm_hr_pin');
    
    if (savedPin) setHrPinCode(savedPin);
    if (savedPos) {
      try { setPositionsList(JSON.parse(savedPos)); } catch (e) {}
    }

    if (savedDb) {
      try { setDb(JSON.parse(savedDb)); } catch (e) {}
    } else {
      const seed = [
        {
          id: 'APP-2026-DM01',
          name: 'Yohanes Oktaviano Fernandez',
          email: 'yohanes.fernandez@email.com',
          phone: '081234567890',
          position: 'Digital Marketing & Content Specialist',
          dept: 'Growth & Marketing',
          date: '28 Ags 2026',
          disc: { d: 82, i: 90, s: 45, c: 68, dom: 'I-D (Creative Promoter)' },
          mbti: { type: 'ENTP', title: 'The Visionary / Campaigner', desc: 'Sangat kreatif, berani bereksperimen dengan konten viral, dan adaptif terhadap algoritma baru.' },
          marketing: { score: 100, correct: 8, total: 8, cat: 'Expert (Creative & Analytical)' },
          match: 96,
          status: 'STRONGLY RECOMMENDED'
        }
      ];
      setDb(seed);
      localStorage.setItem('tm_assessment_db_v6', JSON.stringify(seed));
    }
  }, []);

  // Timer Effect
  useEffect(() => {
    let timer = null;
    if (view === 'test-runner' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            clearInterval(timer);
            calculateResults();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [view, timeLeft]);

  // HR Login
  const handleHrLogin = (e) => {
    e.preventDefault();
    if (hrPasswordInput === hrPinCode) {
      setIsHrAuthenticated(true);
      setLoginError('');
      setHrPasswordInput('');
      setView('hr-dashboard');
    } else {
      setLoginError('Password / PIN HRD salah! Silakan coba lagi.');
    }
  };

  const handleHrLogout = () => {
    setIsHrAuthenticated(false);
    setView('applicant-form');
  };

  const handleChangePin = () => {
    const newPin = prompt('Masukkan Password / PIN HRD Baru:');
    if (newPin && newPin.trim().length >= 4) {
      setHrPinCode(newPin.trim());
      localStorage.setItem('tm_hr_pin', newPin.trim());
      alert('Password HRD berhasil diubah menjadi: ' + newPin.trim());
    } else if (newPin) {
      alert('Password minimal 4 karakter!');
    }
  };

  const navigateToHrPortal = () => {
    if (isHrAuthenticated) setView('hr-dashboard');
    else {
      setLoginError('');
      setHrPasswordInput('');
      setView('hr-login');
    }
  };

  // Tambah & Hapus Posisi (HR)
  const handleAddNewPosition = (e) => {
    e.preventDefault();
    if (!newPosTitle.trim()) return;
    const newPos = {
      title: newPosTitle.trim(),
      dept: newPosDept.trim() || 'General Department'
    };
    const updated = [...positionsList, newPos];
    setPositionsList(updated);
    localStorage.setItem('tm_custom_positions_v6', JSON.stringify(updated));
    setNewPosTitle('');
    setNewPosDept('');
    setShowAddPosModal(false);
    alert(`Posisi "${newPos.title}" berhasil ditambahkan!`);
  };

  const handleDeletePosition = (idxToDelete) => {
    if (positionsList.length <= 1) {
      alert('Minimal harus ada 1 posisi aktif di sistem!');
      return;
    }
    if (confirm(`Hapus posisi "${positionsList[idxToDelete].title}" dari daftar lowongan?`)) {
      const updated = positionsList.filter((_, idx) => idx !== idxToDelete);
      setPositionsList(updated);
      localStorage.setItem('tm_custom_positions_v6', JSON.stringify(updated));
    }
  };

  // Mulai Tes Dinamis Sesuai Posisi
  const handleStartTest = (e) => {
    e.preventDefault();
    const applicant = {
      ...form,
      id: 'APP-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    setCurrentApplicant(applicant);

    // Cek apakah pelamar melamar posisi Digital Marketing / Creative
    const isDigitalMarketing = applicant.position.toLowerCase().includes('marketing') || applicant.position.toLowerCase().includes('social media') || applicant.position.toLowerCase().includes('creative');

    // Routing Soal Dinamis
    let questionsForApplicant = [];
    if (isDigitalMarketing) {
      // DISC + MBTI + Khusus Digital Marketing (TANPA TES HITUNG KASIR)
      questionsForApplicant = [...BASE_QUESTIONS, ...DIGITAL_MARKETING_QUESTIONS];
    } else {
      // Posisi Outlet / Lainnya: DISC + MBTI + Logika & Hitung Kasir
      questionsForApplicant = [...BASE_QUESTIONS, ...GENERAL_OPERATIONAL_QUESTIONS];
    }

    setActiveQuestions(questionsForApplicant);
    setAnswers({});
    setQIndex(0);
    setTimeLeft(1200);
    setView('test-runner');
  };

  // Kalkulasi Skor
  const calculateResults = () => {
    // 1. DISC Scoring
    let d = 40, i = 35, s = 30, c = 45;
    Object.keys(answers).forEach(k => {
      if (k.endsWith('_most')) {
        const val = answers[k];
        if (val === 'D') d += 8;
        if (val === 'I') i += 8;
        if (val === 'S') s += 8;
        if (val === 'C') c += 8;
      }
      if (k.endsWith('_least')) {
        const val = answers[k];
        if (val === 'D') d -= 3;
        if (val === 'I') i -= 3;
        if (val === 'S') s -= 3;
        if (val === 'C') c -= 3;
      }
    });
    d = Math.min(95, Math.max(20, d));
    i = Math.min(95, Math.max(20, i));
    s = Math.min(95, Math.max(20, s));
    c = Math.min(95, Math.max(20, c));

    let dom = 'I-D (Creative Leader)';
    if (i >= d && i >= c && i >= s) dom = 'I-D (Creative Promoter)';
    else if (d >= i && d >= s && d >= c) dom = 'D-C (Performance Driven)';
    else if (s >= d && s >= i && s >= c) dom = 'S-C (Reliable Specialist)';
    else if (c >= d && c >= i && c >= s) dom = 'C-S (Data Analyst)';

    // 2. MBTI Scoring
    let eCount = 0, iCount = 0;
    let sCount = 0, nCount = 0;
    let tCount = 0, fCount = 0;
    let jCount = 0, pCount = 0;

    Object.keys(answers).forEach(k => {
      if (k.startsWith('mbti_')) {
        const val = answers[k];
        if (val === 'E') eCount++;
        if (val === 'I') iCount++;
        if (val === 'S') sCount++;
        if (val === 'N') nCount++;
        if (val === 'T') tCount++;
        if (val === 'F') fCount++;
        if (val === 'J') jCount++;
        if (val === 'P') pCount++;
      }
    });

    const mbtiType = `${eCount >= iCount ? 'E' : 'I'}${nCount >= sCount ? 'N' : 'S'}${tCount >= fCount ? 'T' : 'F'}${pCount >= jCount ? 'P' : 'J'}`;

    const mbtiDict = {
      ENTP: { title: 'The Visionary / Innovator', desc: 'Sangat kreatif, cepat melihat peluang viral, tajam merumuskan hook, dan solutif.' },
      ENFP: { title: 'The Campaigner / Creative Storyteller', desc: 'Penuh imajinasi, pandai membangun hubungan emosional dengan audiens, dan ekspresif.' },
      ENTJ: { title: 'The Commander / Growth Lead', desc: 'Pemimpin strategis berorientasi ROI, tegas, dan berfokus pada skala pertumbuhan kampanye.' },
      INTJ: { title: 'The Architect / Marketing Strategist', desc: 'Pemikir mendalam, perancang funnel sistematis, dan ahli dalam analitik data.' },
      ESTJ: { title: 'The Executive', desc: 'Sangat disiplin mengeksekusi calendar plan dan menjaga konsistensi brand.' }
    };
    const mbtiMeta = mbtiDict[mbtiType] || { title: 'Creative Specialist', desc: 'Memiliki kombinasi karakter kreatif, adaptif terhadap tren, dan komunikatif.' };

    const isDigitalMarketing = currentApplicant.position.toLowerCase().includes('marketing') || currentApplicant.position.toLowerCase().includes('social media') || currentApplicant.position.toLowerCase().includes('creative');

    // 3. Modul Spesifik
    let marketingResult = null;
    let mathResult = null;
    let match = 70;

    if (isDigitalMarketing) {
      let mCorrect = 0;
      activeQuestions.forEach((q, idx) => {
        if (q.module === 'marketing' && answers[`q_${idx}`] === q.correct) {
          mCorrect++;
        }
      });
      const mScore = Math.round((mCorrect / 8) * 100);
      let mCat = 'Pemula (Basic)';
      if (mScore >= 85) mCat = 'Expert (Creative & Analytical)';
      else if (mScore >= 70) mCat = 'Kompeten (Good Knowledge)';
      else if (mScore >= 50) mCat = 'Menengah (Intermediate)';

      marketingResult = { score: mScore, correct: mCorrect, total: 8, cat: mCat };
      match += Math.round((mScore / 100) * 22);
      if (mbtiType.includes('N') || mbtiType.includes('P')) match += 5; // Fleksibel & Kreatif
    } else {
      let mathCorrect = 0;
      activeQuestions.forEach((q, idx) => {
        if (q.module === 'math' && answers[`q_${idx}`] === q.correct) {
          mathCorrect++;
        }
      });
      const mathScore = Math.round((mathCorrect / 2) * 100);
      mathResult = { score: mathScore, correct: mathCorrect, total: 2, cat: mathScore >= 100 ? 'Teliti' : 'Cukup' };
      match += Math.round((mathScore / 100) * 20);
    }

    match = Math.min(98, Math.max(50, match));

    const resultObj = {
      ...currentApplicant,
      isDigitalMarketing,
      disc: { d, i, s, c, dom },
      mbti: { type: mbtiType, title: mbtiMeta.title, desc: mbtiMeta.desc },
      marketing: marketingResult,
      math: mathResult,
      match,
      status: match >= 85 ? 'STRONGLY RECOMMENDED' : (match >= 70 ? 'RECOMMENDED' : 'CONSIDER')
    };

    const newDb = [resultObj, ...db];
    setDb(newDb);
    localStorage.setItem('tm_assessment_db_v6', JSON.stringify(newDb));

    setActiveReport(resultObj);
    setView('report');
  };

  const handleNext = () => {
    if (qIndex < activeQuestions.length - 1) {
      setQIndex(qIndex + 1);
    } else {
      calculateResults();
    }
  };

  const downloadPdf = () => {
    if (typeof window !== 'undefined') {
      import('html2pdf.js').then((html2pdf) => {
        const element = document.getElementById('printable-report');
        const opt = {
          margin: [10, 10, 10, 10],
          filename: `Laporan_Asesmen_${activeReport?.name.replace(/\\s+/g, '_')}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf.default().set(opt).from(element).save();
      });
    }
  };

  const q = activeQuestions[qIndex];

  return (
    <>
      {/* Top Navbar */}
      <header className="bg-slate-900 text-white sticky top-0 z-50 border-b border-slate-800 shadow-md no-print">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setView('applicant-form')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center font-black text-white text-base shadow-lg shadow-sky-500/30">
              TM
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-white via-slate-100 to-sky-400 bg-clip-text text-transparent">TalentMatrix AI</span>
              <span className="text-[10px] ml-2 px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-semibold border border-sky-500/30">Role-Adaptive Suite</span>
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-3">
            <button 
              onClick={() => setView('applicant-form')} 
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition ${view === 'applicant-form' || view === 'test-runner' ? 'bg-sky-600 text-white shadow' : 'text-slate-300 hover:text-white'}`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Tes Pelamar</span>
            </button>
            <button 
              onClick={navigateToHrPortal} 
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition ${view === 'hr-dashboard' || view === 'hr-login' ? 'bg-sky-600 text-white shadow' : 'text-slate-300 hover:text-white border border-slate-700'}`}
            >
              <Lock className="w-4 h-4" />
              <span>{isHrAuthenticated ? 'Portal HRD (Aktif)' : 'Login HRD'}</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-4xl mx-auto w-full px-4 py-8 flex-1 flex flex-col justify-center">

        {/* 1. FORM PENDAFTARAN PELAMAR */}
        {view === 'applicant-form' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 relative">
            <div className="max-w-xl mx-auto text-center space-y-2 mb-8">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold border border-sky-200">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Adaptive Competency Assessment</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Formulir Data Diri Pelamar</h1>
              <p className="text-xs sm:text-sm text-slate-500">Soal tes akan otomatis disesuaikan dengan posisi yang Anda pilih di bawah ini.</p>
            </div>

            <form onSubmit={handleStartTest} className="max-w-lg mx-auto space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Nama Lengkap *</label>
                <input 
                  type="text" 
                  required 
                  value={form.name} 
                  onChange={e => setForm({...form, name: e.target.value})} 
                  placeholder="Contoh: Yohanes Oktaviano Fernandez" 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none" 
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Email Aktif *</label>
                  <input 
                    type="email" 
                    required 
                    value={form.email} 
                    onChange={e => setForm({...form, email: e.target.value})} 
                    placeholder="pelamar@email.com" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">No. WhatsApp / HP *</label>
                  <input 
                    type="tel" 
                    required 
                    value={form.phone} 
                    onChange={e => setForm({...form, phone: e.target.value})} 
                    placeholder="081234567890" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none" 
                  />
                </div>
              </div>

              {/* Posisi Terkunci (Pilihan Resmi HR) */}
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Posisi yang Dilamar *</label>
                <select 
                  value={form.position} 
                  onChange={e => {
                    const selTitle = e.target.value;
                    const matched = positionsList.find(p => p.title === selTitle);
                    setForm({
                      ...form, 
                      position: selTitle, 
                      dept: matched ? matched.dept : 'General Operations'
                    });
                  }} 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  {positionsList.map((pos, idx) => (
                    <option key={idx} value={pos.title}>
                      {pos.title} ({pos.dept})
                    </option>
                  ))}
                </select>
              </div>

              {/* Banner Info Adaptif */}
              <div className="p-4 bg-purple-50/70 rounded-2xl border border-purple-100 text-xs text-purple-950 space-y-1.5">
                <div className="font-bold flex items-center space-x-1.5">
                  <Megaphone className="w-4 h-4 text-purple-600" />
                  <span>Struktur Tes Khusus Posisi Terpilih:</span>
                </div>
                {form.position.toLowerCase().includes('marketing') || form.position.toLowerCase().includes('social media') || form.position.toLowerCase().includes('creative') ? (
                  <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                    <li><strong>Modul 1 (DISC - 8 Soal):</strong> Gaya kerja kreatif, kepemimpinan & kolaborasi.</li>
                    <li><strong>Modul 2 (MBTI - 8 Soal):</strong> Pemetaan tipe kepribadian & intuisi tren.</li>
                    <li><strong>Modul 3 Khusus (Digital Marketing - 8 Soal):</strong> Formula Copywriting (Hook/AIDA), Metrik Ads (CTR/ROAS), Funnel & Strategi Konten Viral. <span className="text-emerald-700 font-bold">(Bebas dari tes hitung kasir)</span>.</li>
                  </ul>
                ) : (
                  <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                    <li><strong>Modul 1 (DISC):</strong> Gaya komunikasi & kerja tim.</li>
                    <li><strong>Modul 2 (MBTI):</strong> Kepribadian & kepatuhan SOP.</li>
                    <li><strong>Modul 3 (Logika & Kasir):</strong> Ketelitian berhitung operasional.</li>
                  </ul>
                )}
              </div>

              <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-sky-500/25 flex items-center justify-center space-x-2 transition">
                <span>Mulai Pengerjaan Tes Khusus</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* 2. HR LOGIN VIEW */}
        {view === 'hr-login' && (
          <div className="max-w-md mx-auto w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mx-auto font-bold shadow-inner">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-black text-slate-900">Login Portal HRD</h2>
              <p className="text-xs text-slate-500">Area terproteksi khusus tim HR. Pelamar tidak diizinkan masuk.</p>
            </div>

            <form onSubmit={handleHrLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Password / PIN Keamanan</label>
                <div className="relative">
                  <input 
                    type={showPassword ? 'text' : 'password'}
                    required 
                    value={hrPasswordInput} 
                    onChange={e => setHrPasswordInput(e.target.value)} 
                    placeholder="Masukkan password HR..." 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none pr-10"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowPassword(!showPassword)} 
                    className="absolute right-3 top-3 text-slate-400 hover:text-slate-600"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {loginError && (
                  <p className="text-[11px] text-rose-500 font-semibold mt-1.5">{loginError}</p>
                )}
                <p className="text-[10px] text-slate-400 mt-1">Default password bawaan: <code className="font-mono font-bold bg-slate-100 px-1 py-0.5 rounded text-slate-700">admin123</code></p>
              </div>

              <button type="submit" className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow flex items-center justify-center space-x-2 transition">
                <KeyRound className="w-4 h-4" />
                <span>Masuk ke Dashboard HR</span>
              </button>

              <button 
                type="button" 
                onClick={() => setView('applicant-form')} 
                className="w-full text-center text-xs font-semibold text-slate-400 hover:text-slate-600 pt-2"
              >
                Kembali ke Halaman Tes Pelamar
              </button>
            </form>
          </div>
        )}

        {/* 3. TEST RUNNER */}
        {view === 'test-runner' && q && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[11px] font-extrabold uppercase">{q.moduleBadge}</span>
                <h2 className="text-lg sm:text-xl font-black text-slate-900 mt-1">{q.moduleTitle}</h2>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-slate-400 block uppercase">Sisa Waktu</span>
                <div className="font-mono text-base font-black text-rose-500 flex items-center justify-end">
                  <Clock className="w-4 h-4 mr-1" />
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </div>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1">
              <div className="flex justify-between text-xs font-bold text-slate-500">
                <span>Soal {qIndex + 1} dari {activeQuestions.length}</span>
                <span>{Math.round(((qIndex + 1) / activeQuestions.length) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-sky-600 h-full transition-all duration-300" style={{ width: `${((qIndex + 1) / activeQuestions.length) * 100}%` }}></div>
              </div>
            </div>

            {/* Dynamic Question Container */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 min-h-[240px]">
              <p className="text-xs font-bold text-slate-700 mb-3">{q.instruction}</p>

              {/* DISC Options */}
              {q.module === 'disc' && (
                <div className="space-y-2">
                  {q.options.map((opt) => (
                    <div key={opt.key} className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200 hover:border-sky-300 transition">
                      <span className="text-xs font-medium text-slate-700 flex-1 pr-3">{opt.text}</span>
                      <div className="flex items-center space-x-3 text-xs font-bold">
                        <label className="flex items-center space-x-1 text-sky-600 cursor-pointer">
                          <input 
                            type="radio" 
                            name={`disc_m_${qIndex}`} 
                            checked={answers[`disc_${qIndex}_most`] === opt.key} 
                            onChange={() => setAnswers({...answers, [`disc_${qIndex}_most`]: opt.key})} 
                            className="accent-sky-600" 
                          />
                          <span>Most</span>
                        </label>
                        <label className="flex items-center space-x-1 text-rose-600 cursor-pointer">
                          <input 
                            type="radio" 
                            name={`disc_l_${qIndex}`} 
                            checked={answers[`disc_${qIndex}_least`] === opt.key} 
                            onChange={() => setAnswers({...answers, [`disc_${qIndex}_least`]: opt.key})} 
                            className="accent-rose-600" 
                          />
                          <span>Least</span>
                        </label>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* MBTI Options */}
              {q.module === 'mbti' && (
                <div className="space-y-2.5">
                  {q.options.map((opt) => (
                    <label key={opt.key} className="flex items-start space-x-3 p-4 bg-white rounded-xl border border-slate-200 hover:border-purple-300 cursor-pointer transition">
                      <input 
                        type="radio" 
                        name={`mbti_${qIndex}`} 
                        checked={answers[`mbti_${qIndex}`] === opt.key} 
                        onChange={() => setAnswers({...answers, [`mbti_${qIndex}`]: opt.key})} 
                        className="mt-0.5 accent-purple-600" 
                      />
                      <span className="text-xs font-medium text-slate-700 leading-relaxed">{opt.text}</span>
                    </label>
                  ))}
                </div>
              )}

              {/* Marketing / IQ / Math Options */}
              {(q.module === 'marketing' || q.module === 'iq' || q.module === 'math') && (
                <div className="space-y-2">
                  {q.options.map((opt) => (
                    <label key={opt.key} className="flex items-center space-x-3 p-3.5 bg-white rounded-xl border border-slate-200 hover:border-purple-400 cursor-pointer transition">
                      <input 
                        type="radio" 
                        name={`q_${qIndex}`} 
                        checked={answers[`q_${qIndex}`] === opt.key} 
                        onChange={() => setAnswers({...answers, [`q_${qIndex}`]: opt.key})} 
                        className="accent-purple-600" 
                      />
                      <span className="text-xs font-bold text-purple-700">{opt.key}.</span>
                      <span className="text-xs font-medium text-slate-800">{opt.text}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between pt-4 border-t border-slate-100">
              <button 
                disabled={qIndex === 0} 
                onClick={() => setQIndex(qIndex - 1)} 
                className="px-4 py-2 rounded-xl border border-slate-200 text-xs font-bold text-slate-600 disabled:opacity-40"
              >
                Kembali
              </button>
              <button 
                onClick={handleNext} 
                className="px-6 py-2.5 bg-sky-600 hover:bg-sky-700 text-white text-xs font-bold rounded-xl shadow transition"
              >
                {qIndex === activeQuestions.length - 1 ? 'Selesai & Terbitkan Laporan' : 'Lanjut Soal Berikutnya'}
              </button>
            </div>
          </div>
        )}

        {/* 4. LAPORAN HASIL ASESMEN INDIVIDU & PDF EXPORT */}
        {view === 'report' && activeReport && (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center no-print">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span className="text-xs font-extrabold text-slate-800">Laporan Asesmen Kompetensi Selesai Diterbitkan</span>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={downloadPdf} className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow">
                  <Download className="w-4 h-4" />
                  <span>Download PDF Resmi</span>
                </button>
                <button onClick={() => window.print()} className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center space-x-1">
                  <Printer className="w-4 h-4" />
                  <span>Cetak</span>
                </button>
              </div>
            </div>

            {/* DOCUMENT PRINT CONTAINER */}
            <div id="printable-report" className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-10 space-y-6">
              <div className="bg-slate-900 text-white p-6 rounded-2xl flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400">TALENT MATRIX ASSESSMENT REPORT</span>
                  <h1 className="text-xl sm:text-2xl font-black mt-0.5">LAPORAN HASIL EVALUASI PELAMAR</h1>
                  <p className="text-xs text-slate-400">Profil Gaya Kerja (DISC), Preferensi MBTI & Kompetensi Spesialisasi Jabatan</p>
                </div>
                <div className="px-4 py-2 rounded-xl bg-emerald-500 text-white font-extrabold text-xs text-center">
                  {activeReport.status}<br />
                  <span className="text-[11px] font-medium">Fit Index: {activeReport.match}%</span>
                </div>
              </div>

              {/* Applicant Meta */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-4 rounded-xl text-xs border border-slate-200">
                <div><span className="text-slate-400 block font-bold text-[10px]">Nama:</span><strong>{activeReport.name}</strong></div>
                <div><span className="text-slate-400 block font-bold text-[10px]">Token ID:</span><strong>{activeReport.id}</strong></div>
                <div><span className="text-slate-400 block font-bold text-[10px]">Posisi Dilamar:</span><strong>{activeReport.position}</strong></div>
                <div><span className="text-slate-400 block font-bold text-[10px]">Tanggal Tes:</span><strong>{activeReport.date}</strong></div>
              </div>

              {/* Charts & Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* DISC Card */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-black text-slate-800">A. Profil Gaya Kerja (DISC)</span>
                    <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 text-[10px] font-bold">Pola: {activeReport.disc.dom.split(' ')[0]}</span>
                  </div>
                  <div className="h-44 flex items-center justify-center">
                    <Radar 
                      data={{
                        labels: ['D', 'I', 'S', 'C'],
                        datasets: [{
                          data: [activeReport.disc.d, activeReport.disc.i, activeReport.disc.s, activeReport.disc.c],
                          backgroundColor: 'rgba(2, 132, 199, 0.2)',
                          borderColor: 'rgba(2, 132, 199, 1)',
                          borderWidth: 2
                        }]
                      }}
                      options={{
                        scales: { r: { min: 0, max: 100, ticks: { display: false } } },
                        plugins: { legend: { display: false } }
                      }}
                    />
                  </div>
                  <div className="grid grid-cols-4 text-center text-[10px] font-bold text-slate-600 mt-2">
                    <div>D: {activeReport.disc.d}%</div>
                    <div>I: {activeReport.disc.i}%</div>
                    <div>S: {activeReport.disc.s}%</div>
                    <div>C: {activeReport.disc.c}%</div>
                  </div>
                </div>

                {/* MBTI Card */}
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs font-black text-slate-800">B. Tipe Kepribadian (MBTI)</span>
                    <span className="px-2.5 py-0.5 rounded bg-purple-100 text-purple-800 text-xs font-black">{activeReport.mbti.type}</span>
                  </div>
                  <div className="text-xs font-bold text-purple-900">{activeReport.mbti.title}</div>
                  <p className="text-[11px] text-slate-600 leading-relaxed">{activeReport.mbti.desc}</p>
                </div>
              </div>

              {/* Modul Spesifik: Digital Marketing atau Kasir */}
              {activeReport.isDigitalMarketing && activeReport.marketing && (
                <div className="bg-purple-50/80 border border-purple-200 rounded-2xl p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Megaphone className="w-4 h-4 text-purple-700" />
                      <span className="text-xs font-black text-purple-900 uppercase">C. Hasil Evaluasi Khusus Digital Marketing & Kreativitas</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-purple-200 text-purple-900 text-xs font-black">
                      Skor: {activeReport.marketing.score}% ({activeReport.marketing.cat})
                    </span>
                  </div>
                  <div className="text-xs text-purple-950 leading-relaxed">
                    Pelamar berhasil menjawab benar <strong>{activeReport.marketing.correct} dari {activeReport.marketing.total} studi kasus pemasaran digital</strong> (Pemahaman Metrik Iklan CTR & ROAS, Formula Copywriting AIDA/Hook, Funneling TOFU/BOFU, serta Content Pillar & A/B Testing).
                  </div>
                </div>
              )}

              {!activeReport.isDigitalMarketing && activeReport.math && (
                <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Calculator className="w-4 h-4 text-emerald-700" />
                      <span className="text-xs font-black text-emerald-900 uppercase">C. Hasil Tes Kemampuan Berhitung Kasir</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-emerald-200 text-emerald-900 text-xs font-black">
                      Skor: {activeReport.math.score}%
                    </span>
                  </div>
                  <div className="text-xs text-emerald-900">
                    Pelamar menjawab benar {activeReport.math.correct} dari {activeReport.math.total} soal kalkulasi operasional.
                  </div>
                </div>
              )}

              {/* Recommendation Analysis */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1">
                <span className="text-xs font-bold text-slate-900">Analisis Rekomendasi Penempatan ({activeReport.match}% Match Index):</span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Profil MBTI {activeReport.mbti.type} ({activeReport.mbti.title}) dengan DISC {activeReport.disc.dom} serta skor keahlian bidang {activeReport.isDigitalMarketing ? activeReport.marketing?.score : activeReport.math?.score}% menunjukkan kesiapan kerja yang sangat baik untuk mengisi posisi <strong>{activeReport.position}</strong> di departemen <strong>{activeReport.dept}</strong>.
                </p>
              </div>

              {/* Signature Approval */}
              <div className="grid grid-cols-2 text-center text-xs text-slate-600 pt-6">
                <div>
                  <div className="h-12 flex items-end justify-center italic text-slate-400">Assessor Signature</div>
                  <div className="border-t border-slate-400 w-36 mx-auto pt-1 font-bold">Maya Safitri, S.Psi., M.M.</div>
                </div>
                <div>
                  <div className="h-12 flex items-end justify-center italic text-slate-400">HR Approval</div>
                  <div className="border-t border-slate-400 w-36 mx-auto pt-1 font-bold">Budi Santoso, S.E., MBA</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. PORTAL HRD */}
        {view === 'hr-dashboard' && isHrAuthenticated && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap justify-between items-center gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-black text-slate-900">Portal Manajemen & Rekap HRD</h2>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">Sesi Terverifikasi</span>
                  </div>
                  <p className="text-xs text-slate-500">Kelola posisi lowongan pekerjaan dan akses rekapitulasi data pelamar.</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={handleChangePin} className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold border border-slate-200">
                    Ganti Password HR
                  </button>
                  <button onClick={handleHrLogout} className="px-3 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl text-xs font-bold border border-rose-200 flex items-center space-x-1">
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </div>
              </div>

              {/* Manajemen Posisi (Khusus HR) */}
              <div className="bg-sky-50/60 border border-sky-100 rounded-2xl p-5 space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xs font-extrabold text-sky-950 uppercase tracking-wider flex items-center space-x-1.5">
                      <Briefcase className="w-4 h-4 text-sky-600" />
                      <span>Manajemen Posisi / Lowongan Aktif ({positionsList.length})</span>
                    </h3>
                    <p className="text-[11px] text-slate-500">Posisi di bawah ini yang akan tampil pada formulir pilihan pelamar.</p>
                  </div>
                  <button 
                    onClick={() => setShowAddPosModal(true)} 
                    className="px-3.5 py-1.5 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Tambah Posisi Baru</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
                  {positionsList.map((pos, idx) => (
                    <div key={idx} className="flex justify-between items-center p-3 bg-white rounded-xl border border-slate-200 shadow-sm">
                      <div className="truncate pr-2">
                        <div className="text-xs font-bold text-slate-800 truncate">{pos.title}</div>
                        <div className="text-[10px] text-slate-400 truncate">{pos.dept}</div>
                      </div>
                      <button 
                        onClick={() => handleDeletePosition(idx)} 
                        title="Hapus posisi ini" 
                        className="text-slate-300 hover:text-rose-600 p-1 rounded-lg transition"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tabel Rekap Pelamar */}
              <div className="space-y-3 pt-2">
                <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">Daftar Hasil Asesmen Pelamar</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-400 uppercase font-bold text-[10px]">
                      <tr>
                        <th className="p-3">Pelamar</th>
                        <th className="p-3">Posisi Dilamar</th>
                        <th className="p-3 text-center">MBTI</th>
                        <th className="p-3 text-center">DISC</th>
                        <th className="p-3 text-center">Skor Keahlian Bidang</th>
                        <th className="p-3 text-center">Fit Score</th>
                        <th className="p-3 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {db.map((c) => (
                        <tr key={c.id} className="hover:bg-slate-50">
                          <td className="p-3 font-bold">{c.name}<div className="text-[10px] text-slate-400 font-normal">{c.email}</div></td>
                          <td className="p-3">{c.position}</td>
                          <td className="p-3 text-center font-bold text-purple-700">{c.mbti.type}</td>
                          <td className="p-3 text-center font-bold">{c.disc.dom.split(' ')[0]}</td>
                          <td className="p-3 text-center">
                            {c.isDigitalMarketing ? (
                              <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold text-[10px]">
                                DM: {c.marketing?.score}%
                              </span>
                            ) : (
                              <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                                Kasir: {c.math?.score || 100}%
                              </span>
                            )}
                          </td>
                          <td className="p-3 text-center"><span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">{c.match}%</span></td>
                          <td className="p-3 text-right">
                            <button onClick={() => { setActiveReport(c); setView('report'); }} className="px-3 py-1 bg-sky-50 text-sky-700 rounded-lg text-xs font-bold border border-sky-200">
                              Buka PDF
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>

            {/* Modal Tambah Posisi */}
            {showAddPosModal && (
              <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
                  <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center">
                      <Briefcase className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-slate-900 text-sm">Tambah Lowongan Posisi Baru</h3>
                  </div>

                  <form onSubmit={handleAddNewPosition} className="space-y-3.5">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Nama Jabatan / Posisi *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Contoh: Performance Marketing Lead" 
                        value={newPosTitle} 
                        onChange={e => setNewPosTitle(e.target.value)} 
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Departemen Terkait</label>
                      <input 
                        type="text" 
                        placeholder="Contoh: Growth & Marketing" 
                        value={newPosDept} 
                        onChange={e => setNewPosDept(e.target.value)} 
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      />
                    </div>

                    <div className="flex justify-end space-x-2 pt-2">
                      <button 
                        type="button" 
                        onClick={() => setShowAddPosModal(false)} 
                        className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100"
                      >
                        Batal
                      </button>
                      <button 
                        type="submit" 
                        className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold shadow"
                      >
                        Simpan Posisi
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

          </div>
        )}

      </main>
    </>
  );
}
