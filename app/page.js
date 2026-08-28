'use client';

import React, { useState, useEffect } from 'react';
import { 
  Award, Brain, CheckCircle, Clock, Download, Plus, 
  Printer, ShieldCheck, Sparkles, UserPlus, ArrowRight, Info, Briefcase,
  Lock, KeyRound, LogOut, Eye, EyeOff, Calculator, Trash2
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
// BANK SOAL LENGKAP: 30 INSTRUMEN TERSTANDAR
// =========================================================================
const QUESTIONS = [
  // --- MODUL 1: DISC (8 SOAL) ---
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Gaya Kerja & Komunikasi (DISC)',
    moduleBadge: 'Modul 1 / 4 (DISC)',
    instruction: 'Pilih 1 opsi yang PALING sesuai (Most) dan 1 opsi yang PALING TIDAK sesuai (Least) dengan karakter Anda:',
    options: [
      { key: 'D', text: 'Tegas, cepat mengambil keputusan, dan berorientasi hasil nyata.' },
      { key: 'I', text: 'Antusias, ramah, persuasif, dan senang memotivasi tim.' },
      { key: 'S', text: 'Tenang, sabar, setia kawan, dan menyukai ritme kerja yang stabil.' },
      { key: 'C', text: 'Teliti, analitis, taat SOP, dan mengutamakan ketepatan data.' }
    ]
  },
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Gaya Kerja & Komunikasi (DISC)',
    moduleBadge: 'Modul 1 / 4 (DISC)',
    instruction: 'Saat antrean pelanggan outlet sedang sangat ramai atau deadline mendesak:',
    options: [
      { key: 'D', text: 'Mengambil alih kendali alur kerja dan mengeksekusi secepat mungkin.' },
      { key: 'I', text: 'Menyapa pelanggan dengan ramah agar mereka tetap sabar menunggu.' },
      { key: 'S', text: 'Bekerja dengan ritme stabil dan konsisten membantu rekan tim.' },
      { key: 'C', text: 'Memastikan pesanan dan nota kasir tetap akurat tanpa ada selisih.' }
    ]
  },
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Gaya Kerja & Komunikasi (DISC)',
    moduleBadge: 'Modul 1 / 4 (DISC)',
    instruction: 'Dalam situasi perbedaan pendapat dengan rekan kerja di outlet:',
    options: [
      { key: 'D', text: 'Menyampaikan poin masalah secara lugas dan to-the-point.' },
      { key: 'I', text: 'Mencairkan suasana dengan komunikasi santai agar tidak tegang.' },
      { key: 'S', text: 'Mendengarkan terlebih dahulu demi menjaga keharmonisan tim.' },
      { key: 'C', text: 'Mengacu pada aturan baku dan SOP resmi outlet yang berlaku.' }
    ]
  },
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Gaya Kerja & Komunikasi (DISC)',
    moduleBadge: 'Modul 1 / 4 (DISC)',
    instruction: 'Hal yang membuat Anda merasa paling puas setelah bekerja seharian:',
    options: [
      { key: 'D', text: 'Target omzet atau volume pekerjaan berhasil terlampaui maksimal.' },
      { key: 'I', text: 'Pelanggan puas, tersenyum, dan suasana kerja tim sangat seru.' },
      { key: 'S', text: 'Seluruh shift berjalan lancar, aman, tanpa ada konflik.' },
      { key: 'C', text: 'Laporan keuangan kasir dan stok barang 100% cocok tanpa selisih.' }
    ]
  },
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Gaya Kerja & Komunikasi (DISC)',
    moduleBadge: 'Modul 1 / 4 (DISC)',
    instruction: 'Hal yang paling membuat Anda kurang nyaman saat bekerja:',
    options: [
      { key: 'D', text: 'Rekan kerja yang lamban dan ragu-ragu mengambil tindakan.' },
      { key: 'I', text: 'Suasana kerja yang kaku, dingin, dan tidak boleh berbicara.' },
      { key: 'S', text: 'Perubahan jadwal shift mendadak tanpa pemberitahuan jelas.' },
      { key: 'C', text: 'Pekerjaan yang berantakan dan mengabaikan standar kebersihan/SOP.' }
    ]
  },
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Gaya Kerja & Komunikasi (DISC)',
    moduleBadge: 'Modul 1 / 4 (DISC)',
    instruction: 'Bagaimana rekan kerja biasanya menilai kepribadian Anda:',
    options: [
      { key: 'D', text: 'Percaya diri, berani memimpin, dan tegas.' },
      { key: 'I', text: 'Humoris, ramah, dan pintar berbicara.' },
      { key: 'S', text: 'Sabar, pendengar baik, dan suka menolong.' },
      { key: 'C', text: 'Rapi, disiplin, dan telaten menjaga kualitas.' }
    ]
  },
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Gaya Kerja & Komunikasi (DISC)',
    moduleBadge: 'Modul 1 / 4 (DISC)',
    instruction: 'Sikap Anda saat menerima komplain dari pelanggan yang kurang puas:',
    options: [
      { key: 'D', text: 'Segera memberikan solusi penggantian produk tanpa membuang waktu.' },
      { key: 'I', text: 'Meminta maaf dengan tulus dan mengajak pelanggan berkomunikasi hangat.' },
      { key: 'S', text: 'Tetap tenang, tidak terpancing emosi, dan mendengarkan keluhan pelanggan.' },
      { key: 'C', text: 'Mengecek bukti nota transaksi dan kronologi sesuai prosedur retur.' }
    ]
  },
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Gaya Kerja & Komunikasi (DISC)',
    moduleBadge: 'Modul 1 / 4 (DISC)',
    instruction: 'Gaya Anda saat menyelesaikan tugas persiapan outlet (opening/closing):',
    options: [
      { key: 'D', text: 'Membagi tugas dengan cepat dan memastikan selesai tepat waktu.' },
      { key: 'I', text: 'Mengerjakan sambil menyemangati tim agar tidak terasa melelahkan.' },
      { key: 'S', text: 'Menuntaskan bagian tugas saya dengan telaten dari awal sampai tuntas.' },
      { key: 'C', text: 'Memeriksa kebersihan detail sudut outlet dan checklist barang teliti.' }
    ]
  },

  // --- MODUL 2: MBTI (8 SOAL) ---
  {
    module: 'mbti',
    dim: 'EI',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 / 4 (MBTI)',
    instruction: 'Pilih pernyataan yang paling mencerminkan cara Anda mengisi ulang energi:',
    options: [
      { key: 'E', text: 'Saya merasa bersemangat dan segar saat berinteraksi dengan banyak orang.' },
      { key: 'I', text: 'Saya merasa lebih fokus dan tenang saat memiliki waktu sendiri untuk istirahat.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'EI',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 / 4 (MBTI)',
    instruction: 'Saat bertugas melayani pelanggan baru:',
    options: [
      { key: 'E', text: 'Spontan menyapa, menawarkan menu andalan, dan percaya diri menawarkan promo.' },
      { key: 'I', text: 'Menunggu pelanggan bertanya terlebih dahulu, lalu menjawab dengan sopan dan jelas.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'SN',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 / 4 (MBTI)',
    instruction: 'Pilih bagaimana Anda mempelajari resep atau prosedur operasional baru:',
    options: [
      { key: 'S', text: 'Melihat contoh langsung, praktek langkah demi langkah sesuai takaran nyata.' },
      { key: 'N', text: 'Memahami konsep dasar dan gambaran besarnya terlebih dahulu.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'SN',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 / 4 (MBTI)',
    instruction: 'Fokus perhatian Anda dalam bekerja sehari-hari:',
    options: [
      { key: 'S', text: 'Detail fisik di depan mata (kebersihan meja, stok display, ketersediaan cup/piring).' },
      { key: 'N', text: 'Ide-ide baru untuk meningkatkan daya tarik outlet dan promosi di masa depan.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'TF',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 / 4 (MBTI)',
    instruction: 'Prinsip utama Anda dalam mengambil keputusan kerja:',
    options: [
      { key: 'T', text: 'Berdasarkan aturan logika, efisiensi waktu, dan keadilan objektif.' },
      { key: 'F', text: 'Berdasarkan rasa empati, kenyamanan rekan kerja, dan kepuasan hati pelanggan.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'TF',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 / 4 (MBTI)',
    instruction: 'Ketika rekan tim melakukan kesalahan kecil dalam penyajian:',
    options: [
      { key: 'T', text: 'Langsung mengoreksi kesalahannya agar kualitas makanan/minuman tetap terjaga.' },
      { key: 'F', text: 'Memberitahu secara halus agar rekan kerja tidak merasa minder atau tersinggung.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'JP',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 / 4 (MBTI)',
    instruction: 'Bagaimana Anda mengatur barang-barang di area kerja / kitchen:',
    options: [
      { key: 'J', text: 'Selalu meletakkan kembali barang pada tempat resminya agar rapi dan teratur.' },
      { key: 'P', text: 'Menaruh di tempat yang mudah dijangkau saat itu juga agar fleksibel dan cepat.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'JP',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 / 4 (MBTI)',
    instruction: 'Respon Anda terhadap jadwal kerja (roster shift):',
    options: [
      { key: 'J', text: 'Menyukai jadwal yang sudah pasti dari jauh hari dan tidak berubah-ubah.' },
      { key: 'P', text: 'Siap dan santai jika sewaktu-waktu diminta menggantikan shift rekan lain.' }
    ]
  },

  // --- MODUL 3: IQ & LOGIKA UMUM (6 SOAL) ---
  {
    module: 'iq',
    moduleTitle: 'Modul 3: Logika & Penalaran Kognitif (IQ)',
    moduleBadge: 'Modul 3 / 4 (IQ)',
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
    moduleBadge: 'Modul 3 / 4 (IQ)',
    instruction: 'Deret Angka: Tentukan angka selanjutnya: 4, 8, 16, 32, ?',
    correct: 'C',
    options: [
      { key: 'A', text: '48' },
      { key: 'B', text: '56' },
      { key: 'C', text: '64 (Pola perkalian 2: 32 x 2 = 64)' },
      { key: 'D', text: '72' }
    ]
  },
  {
    module: 'iq',
    moduleTitle: 'Modul 3: Logika & Penalaran Kognitif (IQ)',
    moduleBadge: 'Modul 3 / 4 (IQ)',
    instruction: 'Analogi Kata: GELAS : AIR = PIRING : ?',
    correct: 'A',
    options: [
      { key: 'A', text: 'MAKANAN' },
      { key: 'B', text: 'SENDOK' },
      { key: 'C', text: 'DAPUR' },
      { key: 'D', text: 'MEJA' }
    ]
  },
  {
    module: 'iq',
    moduleTitle: 'Modul 3: Logika & Penalaran Kognitif (IQ)',
    moduleBadge: 'Modul 3 / 4 (IQ)',
    instruction: 'Deret Selisih: Tentukan angka berikutnya: 5, 9, 14, 20, 27, ?',
    correct: 'B',
    options: [
      { key: 'A', text: '34' },
      { key: 'B', text: '35 (Pola bertingkat: +4, +5, +6, +7, +8 -> 27 + 8 = 35)' },
      { key: 'C', text: '36' },
      { key: 'D', text: '37' }
    ]
  },
  {
    module: 'iq',
    moduleTitle: 'Modul 3: Logika & Penalaran Kognitif (IQ)',
    moduleBadge: 'Modul 3 / 4 (IQ)',
    instruction: 'Logika Waktu: Sebuah outlet buka pukul 09.30 dan tutup pukul 21.45. Berapa lama outlet tersebut beroperasi dalam sehari?',
    correct: 'C',
    options: [
      { key: 'A', text: '11 Jam 45 Menit' },
      { key: 'B', text: '12 Jam' },
      { key: 'C', text: '12 Jam 15 Menit' },
      { key: 'D', text: '12 Jam 30 Menit' }
    ]
  },
  {
    module: 'iq',
    moduleTitle: 'Modul 3: Logika & Penalaran Kognitif (IQ)',
    moduleBadge: 'Modul 3 / 4 (IQ)',
    instruction: 'Penalaran Posisi: Gula lebih berat dari Kopi. Susu lebih berat dari Gula. Maka kesimpulannya:',
    correct: 'A',
    options: [
      { key: 'A', text: 'Susu adalah bahan yang paling berat di antara ketiganya.' },
      { key: 'B', text: 'Kopi adalah bahan yang paling berat.' },
      { key: 'C', text: 'Gula adalah bahan yang paling berat.' },
      { key: 'D', text: 'Semua bahan memiliki berat yang sama.' }
    ]
  },

  // --- MODUL 4: BERHITUNG OUTLET (8 SOAL) ---
  {
    module: 'math',
    moduleTitle: 'Modul 4: Tes Berhitung Cepat & Kasir Crew Outlet',
    moduleBadge: 'Modul 4 / 4 (Berhitung Outlet)',
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
    moduleTitle: 'Modul 4: Tes Berhitung Cepat & Kasir Crew Outlet',
    moduleBadge: 'Modul 4 / 4 (Berhitung Outlet)',
    instruction: 'Penjumlahan Pesanan: Pelanggan membeli: 3 Minuman @Rp12.000, 2 Snack @Rp8.500, dan 1 Paket Hemat Rp25.000. Berapa total belanjaan yang harus dibayar?',
    correct: 'C',
    options: [
      { key: 'A', text: 'Rp72.000' },
      { key: 'B', text: 'Rp76.000' },
      { key: 'C', text: 'Rp78.000 (3x12rb = 36rb + 2x8.5rb = 17rb + 25rb = 78rb)' },
      { key: 'D', text: 'Rp80.500' }
    ]
  },
  {
    module: 'math',
    moduleTitle: 'Modul 4: Tes Berhitung Cepat & Kasir Crew Outlet',
    moduleBadge: 'Modul 4 / 4 (Berhitung Outlet)',
    instruction: 'Hitung Diskon Promo: Menu Paket Family seharga Rp150.000 mendapat potongan diskon promo 20%. Berapa harga yang harus dibayar pelanggan?',
    correct: 'A',
    options: [
      { key: 'A', text: 'Rp120.000 (Diskon 20% x 150rb = 30rb -> 150rb - 30rb = 120rb)' },
      { key: 'B', text: 'Rp130.000' },
      { key: 'C', text: 'Rp125.000' },
      { key: 'D', text: 'Rp115.000' }
    ]
  },
  {
    module: 'math',
    moduleTitle: 'Modul 4: Tes Berhitung Cepat & Kasir Crew Outlet',
    moduleBadge: 'Modul 4 / 4 (Berhitung Outlet)',
    instruction: 'Stok Bahan Baku: Stok awal cup minuman adalah 150 pcs. Selama shift Anda terjual 87 porsi minuman dan ada 3 cup yang rusak. Berapa sisa stok cup yang benar?',
    correct: 'B',
    options: [
      { key: 'A', text: '63 Pcs' },
      { key: 'B', text: '60 Pcs (150 - 87 - 3 = 60 Pcs)' },
      { key: 'C', text: '58 Pcs' },
      { key: 'D', text: '62 Pcs' }
    ]
  },
  {
    module: 'math',
    moduleTitle: 'Modul 4: Tes Berhitung Cepat & Kasir Crew Outlet',
    moduleBadge: 'Modul 4 / 4 (Berhitung Outlet)',
    instruction: 'Perhitungan Porsi Resep: Untuk membuat 1 porsi menu dibutuhkan 40 gram saus. Jika tersedia saus sebanyak 1,2 kg (1.200 gram), berapa porsi menu yang dapat dibuat?',
    correct: 'C',
    options: [
      { key: 'A', text: '25 Porsi' },
      { key: 'B', text: '28 Porsi' },
      { key: 'C', text: '30 Porsi (1.200 gram / 40 gram = 30 Porsi)' },
      { key: 'D', text: '35 Porsi' }
    ]
  },
  {
    module: 'math',
    moduleTitle: 'Modul 4: Tes Berhitung Cepat & Kasir Crew Outlet',
    moduleBadge: 'Modul 4 / 4 (Berhitung Outlet)',
    instruction: 'Perhitungan Uang Pecahan Kasir: Di laci kasir terdapat: 7 lembar uang Rp50.000, 12 lembar Rp20.000, dan 15 lembar Rp10.000. Berapa total nominal uang tersebut?',
    correct: 'D',
    options: [
      { key: 'A', text: 'Rp680.000' },
      { key: 'B', text: 'Rp710.000' },
      { key: 'C', text: 'Rp720.000' },
      { key: 'D', text: 'Rp740.000 (350rb + 240rb + 150rb = Rp740.000)' }
    ]
  },
  {
    module: 'math',
    moduleTitle: 'Modul 4: Tes Berhitung Cepat & Kasir Crew Outlet',
    moduleBadge: 'Modul 4 / 4 (Berhitung Outlet)',
    instruction: 'Target Penjualan Shift: Target penjualan shift adalah Rp2.000.000. Hingga jam 3 sore kasir mencatat Rp1.425.000. Berapa kekurangan omzet untuk mencapai target?',
    correct: 'A',
    options: [
      { key: 'A', text: 'Rp575.000 (Rp2.000.000 - Rp1.425.000 = Rp575.000)' },
      { key: 'B', text: 'Rp625.000' },
      { key: 'C', text: 'Rp550.000' },
      { key: 'D', text: 'Rp675.000' }
    ]
  },
  {
    module: 'math',
    moduleTitle: 'Modul 4: Tes Berhitung Cepat & Kasir Crew Outlet',
    moduleBadge: 'Modul 4 / 4 (Berhitung Outlet)',
    instruction: 'Promo Beli 2 Gratis 1: Harga normal 1 burger adalah Rp18.000. Sedang ada promo "Beli 2 Gratis 1". Jika seorang pembeli membawa pulang 6 burger, berapa total uang yang harus ia bayar?',
    correct: 'C',
    options: [
      { key: 'A', text: 'Rp54.000' },
      { key: 'B', text: 'Rp64.000' },
      { key: 'C', text: 'Rp72.000 (Hanya bayar 4 burger: 4 x 18.000 = Rp72.000, 2 gratis)' },
      { key: 'D', text: 'Rp90.000' }
    ]
  }
];

export default function Home() {
  const [view, setView] = useState('applicant-form'); 
  const [db, setDb] = useState([]);
  
  // HR Authentication State
  const [isHrAuthenticated, setIsHrAuthenticated] = useState(false);
  const [hrPasswordInput, setHrPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [hrPinCode, setHrPinCode] = useState('admin123');

  // Daftar Posisi (Hanya bisa ditambah/dihapus oleh HR)
  const [positionsList, setPositionsList] = useState([
    { title: 'Crew Outlet / Kasir / Server', dept: 'Outlet Operations' },
    { title: 'Cook / Kitchen Crew', dept: 'Kitchen Operations' },
    { title: 'Leader / Supervisor Outlet', dept: 'Outlet Operations' },
    { title: 'Product Lead / Senior PM', dept: 'Product & Tech' },
    { title: 'Senior Software Engineer (Fullstack)', dept: 'Engineering' },
    { title: 'Business Development & Sales Lead', dept: 'Commercial & Sales' },
    { title: 'Digital Marketing & Content Specialist', dept: 'Marketing' },
    { title: 'Finance, Tax & Accounting Officer', dept: 'Finance & Legal' },
    { title: 'Human Resources & Talent Acquisition', dept: 'People & Culture' }
  ]);

  // State Form Tambah Posisi di Dashboard HR
  const [showAddPosModal, setShowAddPosModal] = useState(false);
  const [newPosTitle, setNewPosTitle] = useState('');
  const [newPosDept, setNewPosDept] = useState('');

  // Form Pelamar State
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: 'Crew Outlet / Kasir / Server',
    dept: 'Outlet Operations'
  });

  const [currentApplicant, setCurrentApplicant] = useState(null);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1200);
  const [activeReport, setActiveReport] = useState(null);

  // Load Saved Database & Positions
  useEffect(() => {
    const savedDb = localStorage.getItem('tm_assessment_db_v5');
    const savedPos = localStorage.getItem('tm_custom_positions_v5');
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
          id: 'APP-2026-001',
          name: 'Siti Rahmawati',
          email: 'siti.rahma@gmail.com',
          phone: '081298765432',
          position: 'Crew Outlet / Kasir / Server',
          dept: 'Outlet Operations',
          date: '28 Ags 2026',
          disc: { d: 55, i: 85, s: 75, c: 80, dom: 'I-C' },
          mbti: { type: 'ESFJ', title: 'The Provider', desc: 'Sangat ramah, telaten melayani pelanggan, dan taat SOP kebersihan.' },
          iq: { score: 115, cat: 'Di Atas Rata-rata', correct: 5, total: 6 },
          math: { score: 100, correct: 8, total: 8, cat: 'Sangat Mahir & Teliti (Kasir Ready)' },
          match: 96,
          status: 'STRONGLY RECOMMENDED'
        }
      ];
      setDb(seed);
      localStorage.setItem('tm_assessment_db_v5', JSON.stringify(seed));
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

  // HR Auth Handlers
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
    if (isHrAuthenticated) {
      setView('hr-dashboard');
    } else {
      setLoginError('');
      setHrPasswordInput('');
      setView('hr-login');
    }
  };

  // Tambah & Hapus Posisi (Khusus HRD)
  const handleAddNewPosition = (e) => {
    e.preventDefault();
    if (!newPosTitle.trim()) return;
    const newPos = {
      title: newPosTitle.trim(),
      dept: newPosDept.trim() || 'General Operations'
    };
    const updated = [...positionsList, newPos];
    setPositionsList(updated);
    localStorage.setItem('tm_custom_positions_v5', JSON.stringify(updated));
    setNewPosTitle('');
    setNewPosDept('');
    setShowAddPosModal(false);
    alert(`Posisi "${newPos.title}" berhasil ditambahkan ke sistem!`);
  };

  const handleDeletePosition = (idxToDelete) => {
    if (positionsList.length <= 1) {
      alert('Minimal harus ada 1 posisi aktif di sistem!');
      return;
    }
    if (confirm(`Hapus posisi "${positionsList[idxToDelete].title}" dari daftar lowongan?`)) {
      const updated = positionsList.filter((_, idx) => idx !== idxToDelete);
      setPositionsList(updated);
      localStorage.setItem('tm_custom_positions_v5', JSON.stringify(updated));
    }
  };

  const handleStartTest = (e) => {
    e.preventDefault();
    const applicant = {
      ...form,
      id: 'APP-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    setCurrentApplicant(applicant);
    setAnswers({});
    setQIndex(0);
    setTimeLeft(1200);
    setView('test-runner');
  };

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

    let dom = 'S-C';
    if (i >= d && i >= c && i >= s) dom = 'I-S (Customer Oriented)';
    else if (d >= i && d >= s && d >= c) dom = 'D-C (Fast & Structured)';
    else if (s >= d && s >= i && s >= c) dom = 'S-C (Reliable & Calm)';
    else if (c >= d && c >= i && c >= s) dom = 'C-S (Accurate & Compliant)';

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

    const mbtiType = `${eCount >= iCount ? 'E' : 'I'}${sCount >= nCount ? 'S' : 'N'}${tCount >= fCount ? 'T' : 'F'}${jCount >= pCount ? 'J' : 'P'}`;

    const mbtiDict = {
      ESFJ: { title: 'The Provider / Host', desc: 'Sangat ramah, tanggap melayani orang lain, dan pandai menjaga keharmonisan tim.' },
      ISFJ: { title: 'The Protector / Support', desc: 'Pekerja tekun, telaten, berhati-hati, dan sangat setia pada standar SOP.' },
      ESTJ: { title: 'The Executive / Supervisor', desc: 'Tegas, disiplin operasional tinggi, teratur, dan berorientasi efisiensi kerja.' },
      ISTJ: { title: 'The Logistician / Inspector', desc: 'Sangat teliti, akurat menghitung stok & uang, serta konsisten.' },
      ENFP: { title: 'The Campaigner', desc: 'Kreatif, energik, komunikator ulung, dan cepat membangun hubungan interpersonal.' },
      ENTJ: { title: 'The Commander', desc: 'Pemimpin strategis, berani mengambil keputusan, dan berorientasi target.' }
    };
    const mbtiMeta = mbtiDict[mbtiType] || { title: 'Reliable Specialist', desc: 'Memiliki kombinasi karakter fokus, disiplin, dan bertanggung jawab.' };

    // 3. IQ Scoring
    let iqCorrect = 0;
    QUESTIONS.forEach((q, idx) => {
      if (q.module === 'iq' && answers[`iq_${idx}`] === q.correct) {
        iqCorrect++;
      }
    });
    const iqScore = 90 + Math.round((iqCorrect / 6) * 35);
    let iqCat = 'Rata-rata (Average)';
    if (iqScore >= 120) iqCat = 'Superior';
    else if (iqScore >= 110) iqCat = 'Di Atas Rata-rata';

    // 4. Math Scoring
    let mathCorrect = 0;
    QUESTIONS.forEach((q, idx) => {
      if (q.module === 'math' && answers[`math_${idx}`] === q.correct) {
        mathCorrect++;
      }
    });
    const mathPercentage = Math.round((mathCorrect / 8) * 100);
    let mathCat = 'Cukup Teliti';
    if (mathPercentage >= 85) mathCat = 'Sangat Mahir & Teliti (Kasir Ready)';
    else if (mathPercentage >= 70) mathCat = 'Baik & Teliti';
    else if (mathPercentage < 60) mathCat = 'Perlu Pelatihan Tambahan';

    // 5. Match Score
    let match = 65;
    match += Math.round((mathPercentage / 100) * 20);
    if (iqScore >= 105) match += 8;
    if (mbtiType.includes('S') && mbtiType.includes('J')) match += 5;
    match = Math.min(98, Math.max(50, match));

    const resultObj = {
      ...currentApplicant,
      disc: { d, i, s, c, dom },
      mbti: { type: mbtiType, title: mbtiMeta.title, desc: mbtiMeta.desc },
      iq: { score: iqScore, cat: iqCat, correct: iqCorrect, total: 6 },
      math: { score: mathPercentage, correct: mathCorrect, total: 8, cat: mathCat },
      match,
      status: match >= 85 ? 'STRONGLY RECOMMENDED' : (match >= 70 ? 'RECOMMENDED' : 'CONSIDER')
    };

    const newDb = [resultObj, ...db];
    setDb(newDb);
    localStorage.setItem('tm_assessment_db_v5', JSON.stringify(newDb));

    setActiveReport(resultObj);
    setView('report');
  };

  const handleNext = () => {
    if (qIndex < QUESTIONS.length - 1) {
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

  const q = QUESTIONS[qIndex];

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
              <span className="text-[10px] ml-2 px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-semibold border border-sky-500/30">Enterprise v5.0</span>
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

        {/* 1. FORM PENDAFTARAN PELAMAR (BERSIH - HANYA DROPDOWN) */}
        {view === 'applicant-form' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 relative">
            <div className="max-w-xl mx-auto text-center space-y-2 mb-8">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold border border-sky-200">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Standardized 30-Question Assessment</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Formulir Data Diri Pelamar</h1>
              <p className="text-xs sm:text-sm text-slate-500">Pilih lowongan pekerjaan yang dilamar dan mulai tes evaluasi online.</p>
            </div>

            <form onSubmit={handleStartTest} className="max-w-lg mx-auto space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Nama Lengkap *</label>
                <input 
                  type="text" 
                  required 
                  value={form.name} 
                  onChange={e => setForm({...form, name: e.target.value})} 
                  placeholder="Contoh: Siti Rahmawati" 
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

              {/* Posisi yang Dilamar (Terkunci, hanya pilih dari daftar resmi HR) */}
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

              <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100 text-xs text-sky-900 space-y-1.5">
                <div className="font-bold flex items-center space-x-1.5">
                  <Info className="w-4 h-4 text-sky-600" />
                  <span>Struktur 30 Soal Tes Lengkap:</span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                  <li><strong>Modul 1 (DISC - 8 Soal):</strong> Gaya komunikasi & kerja sama tim.</li>
                  <li><strong>Modul 2 (MBTI - 8 Soal):</strong> Kepribadian & respon terhadap SOP.</li>
                  <li><strong>Modul 3 (IQ - 6 Soal):</strong> Logika deduksi & penalaran masalah.</li>
                  <li><strong>Modul 4 (Berhitung - 8 Soal):</strong> Aritmatika kasir, kembalian uang, stok bahan & promo.</li>
                </ul>
              </div>

              <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-sky-500/25 flex items-center justify-center space-x-2 transition">
                <span>Mulai Pengerjaan 30 Soal Tes</span>
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
                <span>Soal {qIndex + 1} dari {QUESTIONS.length}</span>
                <span>{Math.round(((qIndex + 1) / QUESTIONS.length) * 100)}%</span>
              </div>
              <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                <div className="bg-sky-600 h-full transition-all duration-300" style={{ width: `${((qIndex + 1) / QUESTIONS.length) * 100}%` }}></div>
              </div>
            </div>

            {/* Question Container */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 min-h-[240px]">
              <p className="text-xs font-bold text-slate-700 mb-3">{q.instruction}</p>

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

              {q.module === 'iq' && (
                <div className="space-y-2">
                  {q.options.map((opt) => (
                    <label key={opt.key} className="flex items-center space-x-3 p-3.5 bg-white rounded-xl border border-slate-200 hover:border-sky-400 cursor-pointer transition">
                      <input 
                        type="radio" 
                        name={`iq_${qIndex}`} 
                        checked={answers[`iq_${qIndex}`] === opt.key} 
                        onChange={() => setAnswers({...answers, [`iq_${qIndex}`]: opt.key})} 
                        className="accent-sky-600" 
                      />
                      <span className="text-xs font-bold text-slate-500">{opt.key}.</span>
                      <span className="text-xs font-medium text-slate-700">{opt.text}</span>
                    </label>
                  ))}
                </div>
              )}

              {q.module === 'math' && (
                <div className="space-y-2">
                  {q.options.map((opt) => (
                    <label key={opt.key} className="flex items-center space-x-3 p-3.5 bg-white rounded-xl border border-slate-200 hover:border-emerald-400 cursor-pointer transition">
                      <input 
                        type="radio" 
                        name={`math_${qIndex}`} 
                        checked={answers[`math_${qIndex}`] === opt.key} 
                        onChange={() => setAnswers({...answers, [`math_${qIndex}`]: opt.key})} 
                        className="accent-emerald-600" 
                      />
                      <span className="text-xs font-bold text-emerald-700">{opt.key}.</span>
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
                {qIndex === QUESTIONS.length - 1 ? 'Selesai & Komputasi Laporan' : 'Lanjut Soal Berikutnya'}
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
                <span className="text-xs font-extrabold text-slate-800">Laporan Asesmen Komprehensif (30 Instrumen) Terbit</span>
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
                  <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400">STANDARDIZED TALENT ASSESSMENT REPORT</span>
                  <h1 className="text-xl sm:text-2xl font-black mt-0.5">LAPORAN HASIL ASESMEN PELAMAR</h1>
                  <p className="text-xs text-slate-400">Evaluasi Terpadu: Profil DISC, Preferensi MBTI, Skor IQ & Kemampuan Berhitung Kasir</p>
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
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-slate-800">B. Tipe Kepribadian (MBTI)</span>
                      <span className="px-2.5 py-0.5 rounded bg-purple-100 text-purple-800 text-xs font-black">{activeReport.mbti.type}</span>
                    </div>
                    <div className="text-xs font-bold text-purple-900">{activeReport.mbti.title}</div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{activeReport.mbti.desc}</p>
                  </div>

                  {/* IQ & Logika */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-slate-800">C. Kemampuan Kognitif (IQ)</span>
                      <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 text-[10px] font-bold">{activeReport.iq.cat}</span>
                    </div>
                    <div className="text-2xl font-black text-sky-600">{activeReport.iq.score} <span className="text-xs font-medium text-slate-500">Skala Deviasi SD 15</span></div>
                    <p className="text-[11px] text-slate-600">Benar {activeReport.iq.correct} dari {activeReport.iq.total} instrumen logika deduktif.</p>
                  </div>
                </div>
              </div>

              {/* Modul 4: Kemampuan Berhitung Outlet Card */}
              <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-2">
                <div className="flex justify-between items-center">
                  <div className="flex items-center space-x-2">
                    <Calculator className="w-4 h-4 text-emerald-700" />
                    <span className="text-xs font-black text-emerald-900 uppercase">D. Hasil Tes Kemampuan Berhitung & Kasir Outlet</span>
                  </div>
                  <span className="px-3 py-1 rounded-full bg-emerald-200 text-emerald-900 text-xs font-black">
                    Skor: {activeReport.math.score}% ({activeReport.math.cat})
                  </span>
                </div>
                <div className="text-xs text-emerald-900">
                  Pelamar berhasil menjawab benar <strong>{activeReport.math.correct} dari {activeReport.math.total} soal aritmatika praktis</strong> (perhitungan kembalian uang pecahan, diskon promo, porsi resep bahan, dan rekonsiliasi kasir).
                </div>
              </div>

              {/* Recommendation Analysis */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1">
                <span className="text-xs font-bold text-slate-900">Analisis Rekomendasi Penempatan ({activeReport.match}% Match Index):</span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Kombinasi kepribadian {activeReport.mbti.type} dengan profil DISC {activeReport.disc.dom.split(' ')[0]} serta skor berhitung kasir {activeReport.math.score}% ({activeReport.math.cat}) menunjukkan kesiapan kerja yang sangat baik untuk mengisi posisi <strong>{activeReport.position}</strong> di departemen <strong>{activeReport.dept}</strong>.
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

        {/* 5. PORTAL HRD (MANAJEMEN POSISI + REKAP PELAMAR) */}
        {view === 'hr-dashboard' && isHrAuthenticated && (
          <div className="space-y-6">
            
            {/* Header Dashboard & Logout */}
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

              {/* SEKSI 1: MANAJEMEN LOWONGAN / POSISI PEKERJAAN (KHUSUS HR) */}
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

              {/* SEKSI 2: TABEL REKAP PELAMAR */}
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
                        <th className="p-3 text-center">IQ</th>
                        <th className="p-3 text-center">Berhitung Kasir</th>
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
                          <td className="p-3 text-center font-mono font-bold text-sky-600">{c.iq.score}</td>
                          <td className="p-3 text-center">
                            <span className="px-2 py-0.5 rounded bg-emerald-50 text-emerald-800 font-bold border border-emerald-200">
                              {c.math ? `${c.math.score}%` : '100%'}
                            </span>
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

            {/* MODAL POPUP: TAMBAH POSISI BARU (HANYA MUNCUL DI DALAM HR DASHBOARD) */}
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
                        placeholder="Contoh: Barista & Kasir" 
                        value={newPosTitle} 
                        onChange={e => setNewPosTitle(e.target.value)} 
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Departemen Terkait</label>
                      <input 
                        type="text" 
                        placeholder="Contoh: F&B Operations" 
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
