'use client';

import React, { useState, useEffect } from 'react';
import { 
  Award, Brain, CheckCircle, Clock, Download, Plus, 
  Printer, ShieldCheck, Sparkles, UserPlus, ArrowRight, Info, Briefcase,
  Lock, KeyRound, LogOut, Eye, EyeOff, Calculator, Megaphone, Trash2, HeartHandshake, Search, FileDown
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
      { key: 'D', text: 'Tegas, cepat mengambil keputusan, dan berani mengambil risiko.' },
      { key: 'I', text: 'Ramah, antusias, mudah tersenyum, dan senang berinteraksi dengan orang baru.' },
      { key: 'S', text: 'Sabar, tenang, setia kawan, dan menyukai ritme kerja yang stabil.' },
      { key: 'C', text: 'Teliti, disiplin, taat SOP, dan mengutamakan kerapian serta ketepatan data.' }
    ]
  },
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Gaya Kerja & Komunikasi (DISC)',
    moduleBadge: 'Modul 1 (DISC)',
    instruction: 'Saat outlet/ruang kerja sedang sangat padat dan antrean membeludak:',
    options: [
      { key: 'D', text: 'Mengambil kendali kecepatan pelayanan agar antrean cepat terurai.' },
      { key: 'I', text: 'Menyapa pelanggan dengan senyum hangat agar mereka tidak jenuh menunggu.' },
      { key: 'S', text: 'Bekerja dengan ritme stabil, tidak panik, dan konsisten membantu rekan.' },
      { key: 'C', text: 'Memastikan pesanan dan transaksi tetap akurat tanpa ada kesalahan nota.' }
    ]
  },
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Gaya Kerja & Komunikasi (DISC)',
    moduleBadge: 'Modul 1 (DISC)',
    instruction: 'Dalam situasi perbedaan pendapat dengan rekan kerja saat bertugas:',
    options: [
      { key: 'D', text: 'Menyampaikan langsung to-the-point dan mencari solusi tercepat.' },
      { key: 'I', text: 'Mencairkan suasana dengan komunikasi santai agar tidak tegang.' },
      { key: 'S', text: 'Mendengarkan semua pihak dengan sabar demi keharmonisan tim.' },
      { key: 'C', text: 'Mengacu pada aturan baku dan SOP resmi yang berlaku.' }
    ]
  },
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Gaya Kerja & Komunikasi (DISC)',
    moduleBadge: 'Modul 1 (DISC)',
    instruction: 'Hal yang membuat Anda merasa paling puas setelah shift kerja selesai:',
    options: [
      { key: 'D', text: 'Target omzet dan kecepatan pelayanan mencapai rekor tertinggi.' },
      { key: 'I', text: 'Banyak pelanggan tersenyum puas dan memuji keramahan pelayanan.' },
      { key: 'S', text: 'Seluruh shift berlangsung damai, lancar, dan tanpa kendala.' },
      { key: 'C', text: 'Laporan kasir, rekonsiliasi uang, dan kebersihan outlet 100% sempurna.' }
    ]
  },
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Gaya Kerja & Komunikasi (DISC)',
    moduleBadge: 'Modul 1 (DISC)',
    instruction: 'Hal yang paling membuat Anda kurang nyaman saat bekerja:',
    options: [
      { key: 'D', text: 'Rekan kerja yang lamban dan ragu-ragu mengambil tindakan.' },
      { key: 'I', text: 'Suasana kerja yang kaku, dingin, dan tidak boleh berbicara ramah.' },
      { key: 'S', text: 'Perubahan jadwal mendadak tanpa pemberitahuan yang jelas.' },
      { key: 'C', text: 'Area kerja yang berantakan dan mengabaikan standar kebersihan/SOP.' }
    ]
  },
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Gaya Kerja & Komunikasi (DISC)',
    moduleBadge: 'Modul 1 (DISC)',
    instruction: 'Bagaimana rekan kerja biasanya menilai kepribadian Anda:',
    options: [
      { key: 'D', text: 'Percaya diri, lugas, dan berani memimpin.' },
      { key: 'I', text: 'Hangat, ceria, ramah, dan pandai mencairkan suasana.' },
      { key: 'S', text: 'Sabar, setia kawan, dan dapat diandalkan saat situasi sulit.' },
      { key: 'C', text: 'Rapi, disiplin tinggi, dan sangat teliti menjaga detail.' }
    ]
  },
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Gaya Kerja & Komunikasi (DISC)',
    moduleBadge: 'Modul 1 (DISC)',
    instruction: 'Sikap Anda saat menerima komplain atau keluhan dari orang lain:',
    options: [
      { key: 'D', text: 'Segera memberikan solusi penggantian tanpa banyak berdebat.' },
      { key: 'I', text: 'Meminta maaf dengan tulus dan mendengarkan dengan penuh perhatian.' },
      { key: 'S', text: 'Tetap tenang, tidak terpancing emosi, dan meredakan situasi.' },
      { key: 'C', text: 'Mengecek bukti kronologi dan mencocokkan dengan prosedur resmi.' }
    ]
  },
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Gaya Kerja & Komunikasi (DISC)',
    moduleBadge: 'Modul 1 (DISC)',
    instruction: 'Gaya Anda saat menyelesaikan tugas persiapan outlet (opening/closing):',
    options: [
      { key: 'D', text: 'Membagi tugas dengan cepat dan memastikan selesai tepat waktu.' },
      { key: 'I', text: 'Mengerjakan tugas sambil menyemangati rekan agar suasana tetap seru.' },
      { key: 'S', text: 'Menuntaskan bagian tugas saya dengan telaten dari awal sampai akhir.' },
      { key: 'C', text: 'Memeriksa kebersihan detail sudut outlet dan checklist barang teliti.' }
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
      { key: 'E', text: 'Saya merasa segar dan bersemangat saat bertemu dan berinteraksi dengan banyak orang.' },
      { key: 'I', text: 'Saya merasa lebih fokus dan tenang saat memiliki waktu sendiri untuk istirahat.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'EI',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 (MBTI)',
    instruction: 'Saat bertugas melayani pelanggan baru:',
    options: [
      { key: 'E', text: 'Spontan menyapa, tersenyum, dan percaya diri menawarkan menu andalan.' },
      { key: 'I', text: 'Menunggu pelanggan mendekat, lalu merespon dengan sopan dan tenang.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'SN',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 (MBTI)',
    instruction: 'Pilih bagaimana Anda mempelajari prosedur atau resep kerja baru:',
    options: [
      { key: 'S', text: 'Melihat contoh langsung, praktek langkah demi langkah sesuai takaran nyata.' },
      { key: 'N', text: 'Memahami konsep dasar dan gambaran besarnya terlebih dahulu.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'SN',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 (MBTI)',
    instruction: 'Fokus perhatian Anda dalam bekerja sehari-hari:',
    options: [
      { key: 'S', text: 'Detail fisik di depan mata (kebersihan meja, stok display, ketersediaan alat).' },
      { key: 'N', text: 'Ide-ide baru untuk meningkatkan daya tarik tempat kerja di masa depan.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'TF',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 (MBTI)',
    instruction: 'Prinsip utama Anda dalam mengambil keputusan kerja:',
    options: [
      { key: 'T', text: 'Berdasarkan aturan logika objektif, efisiensi waktu, dan keadilan.' },
      { key: 'F', text: 'Berdasarkan rasa empati, kenyamanan rekan kerja, dan kepuasan hati pelanggan.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'TF',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 (MBTI)',
    instruction: 'Ketika rekan kerja melakukan kesalahan kecil dalam pelayanan:',
    options: [
      { key: 'T', text: 'Langsung mengoreksi kesalahannya agar kualitas kerja tetap terjaga.' },
      { key: 'F', text: 'Memberitahu secara halus dan privat agar rekan kerja tidak merasa malu.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'JP',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 (MBTI)',
    instruction: 'Bagaimana Anda mengatur barang-barang di area kerja / kasir:',
    options: [
      { key: 'J', text: 'Selalu meletakkan kembali barang pada tempat resminya agar rapi dan teratur.' },
      { key: 'P', text: 'Menaruh di tempat yang mudah dijangkau saat itu juga agar fleksibel dan cepat.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'JP',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 (MBTI)',
    instruction: 'Respon Anda terhadap aturan atau prosedur operasional baku (SOP):',
    options: [
      { key: 'J', text: 'Merasa nyaman karena ada kepastian dan panduan kerja yang jelas untuk diikuti.' },
      { key: 'P', text: 'Lebih suka jika diberikan ruang kebebasan sesuai gaya kerja sendiri.' }
    ]
  }
];

// =========================================================================
// 2. BANK SOAL KHUSUS CREW OUTLET (PELAYANAN CS & BERHITUNG KASIR)
// =========================================================================
const CREW_OUTLET_QUESTIONS = [
  // --- SUB-MODUL 3A: TES PELAYANAN CUSTOMER & HOSPITALITY (4 SOAL) ---
  {
    module: 'outlet_service',
    moduleTitle: 'Modul Khusus 3A: Pelayanan Pelanggan & Hospitality Outlet',
    moduleBadge: 'Tes Khusus Hospitality Outlet',
    instruction: 'Skenario Komplain Pesanan Salah: Pelanggan mendatangi kasir dengan nada marah karena saus makanannya tidak sesuai pesanan. Respon terbaik yang wajib Anda lakukan:',
    correct: 'B',
    options: [
      { key: 'A', text: 'Menjelaskan bahwa tadi pelanggan salah sebut saat memesan di kasir.' },
      { key: 'B', text: 'Tersenyum sopan, tulus meminta maaf atas ketidaknyamanan, dan segera mengganti menu dengan yang benar tanpa berdebat.' },
      { key: 'C', text: 'Menyuruh pelanggan menunggu dan memanggil manager outlet untuk mengurusnya.' },
      { key: 'D', text: 'Diam saja dan membuatkan saus baru dengan wajah datar.' }
    ]
  },
  {
    module: 'outlet_service',
    moduleTitle: 'Modul Khusus 3A: Pelayanan Pelanggan & Hospitality Outlet',
    moduleBadge: 'Tes Khusus Hospitality Outlet',
    instruction: 'Inisiatif Upselling / Penawaran Promo: Saat pelanggan memesan 1 makanan utama, teknik komunikasi paling ramah dan efektif untuk menawarkan menu tambahan (upsell) adalah:',
    correct: 'C',
    options: [
      { key: 'A', text: 'Langsung menambahkan minuman mahal ke nota tanpa bertanya.' },
      { key: 'B', text: 'Tidak perlu menawarkan apapun agar transaksi cepat selesai.' },
      { key: 'C', text: '"Baik Kak, untuk minumannya mau sekalian coba Es Jeruk Segar kami? Hari ini sedang ada promo tambah Rp5.000 saja Kak."' },
      { key: 'D', text: '"Kakak harus beli minumnya juga ya, soalnya menu ini pedas."' }
    ]
  },
  {
    module: 'outlet_service',
    moduleTitle: 'Modul Khusus 3A: Pelayanan Pelanggan & Hospitality Outlet',
    moduleBadge: 'Tes Khusus Hospitality Outlet',
    instruction: 'Kerapian & Kebersihan Outlet (Cleanliness): Saat melihat meja pelanggan yang baru saja selesai makan dan meninggalkan remah makanan, tindakan Anda saat outlet sedang senggang adalah:',
    correct: 'A',
    options: [
      { key: 'A', text: 'Segera membawa lap bersih dan sanitizer untuk membersihkan meja agar siap digunakan pelanggan berikutnya.' },
      { key: 'B', text: 'Menunggu sampai ada pelanggan baru yang meminta meja tersebut dibersihkan.' },
      { key: 'C', text: 'Membiarkannya karena itu adalah tugas shift cleaning di akhir jam kerja.' },
      { key: 'D', text: 'Duduk beristirahat sambil bermain handphone.' }
    ]
  },
  {
    module: 'outlet_service',
    moduleTitle: 'Modul Khusus 3A: Pelayanan Pelanggan & Hospitality Outlet',
    moduleBadge: 'Tes Khusus Hospitality Outlet',
    instruction: 'Handling Antrean Panjang: Antrean pemesanan mencapai 10 orang dan proses memasak butuh waktu 8 menit. Bagaimana Anda mengomunikasikan estimasi waktu ke pelanggan?',
    correct: 'B',
    options: [
      { key: 'A', text: 'Mengatakan makanan akan siap dalam 1 menit agar pelanggan tidak pergi.' },
      { key: 'B', text: 'Menginformasikan dengan ramah sejak awal: "Mohon maaf Kak, saat ini antrean sedang ramai, estimasi penyajian sekitar 8-10 menit ya Kak, mohon kesediaannya menunggu."' },
      { key: 'C', text: 'Tidak perlu menginfokan apapun, biarkan pelanggan menunggu sendiri.' },
      { key: 'D', text: 'Menolak pelanggan berikutnya karena dapur sudah terlalu sibuk.' }
    ]
  },

  // --- SUB-MODUL 3B: TES BERHITUNG KASIR PRAKTIS (4 SOAL) ---
  {
    module: 'outlet_cashier',
    moduleTitle: 'Modul Khusus 3B: Tes Berhitung Cepat Kasir Outlet',
    moduleBadge: 'Tes Khusus Berhitung Kasir',
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
    module: 'outlet_cashier',
    moduleTitle: 'Modul Khusus 3B: Tes Berhitung Cepat Kasir Outlet',
    moduleBadge: 'Tes Khusus Berhitung Kasir',
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
    module: 'outlet_cashier',
    moduleTitle: 'Modul Khusus 3B: Tes Berhitung Cepat Kasir Outlet',
    moduleBadge: 'Tes Khusus Berhitung Kasir',
    instruction: 'Perhitungan Uang Pecahan Kasir (Cash Count): Di laci kasir terdapat: 7 lembar uang Rp50.000, 12 lembar Rp20.000, dan 15 lembar Rp10.000. Berapa total nominal uang tersebut?',
    correct: 'D',
    options: [
      { key: 'A', text: 'Rp680.000' },
      { key: 'B', text: 'Rp710.000' },
      { key: 'C', text: 'Rp720.000' },
      { key: 'D', text: 'Rp740.000 (350rb + 240rb + 150rb = Rp740.000)' }
    ]
  },
  {
    module: 'outlet_cashier',
    moduleTitle: 'Modul Khusus 3B: Tes Berhitung Cepat Kasir Outlet',
    moduleBadge: 'Tes Khusus Berhitung Kasir',
    instruction: 'Promo Beli 2 Gratis 1: Harga normal 1 porsi menu adalah Rp18.000. Sedang ada promo "Beli 2 Gratis 1". Jika seorang pembeli membawa pulang 6 porsi, berapa total uang yang harus ia bayar?',
    correct: 'C',
    options: [
      { key: 'A', text: 'Rp54.000' },
      { key: 'B', text: 'Rp64.000' },
      { key: 'C', text: 'Rp72.000 (Hanya bayar 4 porsi: 4 x 18.000 = Rp72.000, 2 porsi gratis)' },
      { key: 'D', text: 'Rp90.000' }
    ]
  }
];

// =========================================================================
// 3. BANK SOAL KHUSUS DIGITAL MARKETING (8 SOAL)
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
// 4. BANK SOAL POSISI UMUM / KOGNITIF IQ LAINNYA
// =========================================================================
const GENERAL_COGNITIVE_QUESTIONS = [
  {
    module: 'iq',
    moduleTitle: 'Modul 3: Logika & Kemampuan Kognitif (IQ)',
    moduleBadge: 'Modul 3 (IQ)',
    instruction: 'Silogisme Logika: Semua analis data menguasai statistik. Sebagian analis data menguasai Python. Manakah kesimpulan yang PASTI BENAR?',
    correct: 'B',
    options: [
      { key: 'A', text: 'Semua yang menguasai Python pasti menguasai statistik.' },
      { key: 'B', text: 'Sebagian yang menguasai statistik menguasai Python.' },
      { key: 'C', text: 'Semua analis data menguasai Python dan statistik.' },
      { key: 'D', text: 'Tidak ada analis data yang hanya menguasai statistik.' }
    ]
  },
  {
    module: 'iq',
    moduleTitle: 'Modul 3: Logika & Kemampuan Kognitif (IQ)',
    moduleBadge: 'Modul 3 (IQ)',
    instruction: 'Pola Deret Angka: Tentukan angka berikutnya: 3, 6, 11, 18, 27, ?',
    correct: 'C',
    options: [
      { key: 'A', text: '35' },
      { key: 'B', text: '36' },
      { key: 'C', text: '38 (Pola: +3, +5, +7, +9, +11 -> 27 + 11 = 38)' },
      { key: 'D', text: '40' }
    ]
  }
];

export default function Home() {
  const [view, setView] = useState('applicant-form');
  const [db, setDb] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // HR Auth State
  const [isHrAuthenticated, setIsHrAuthenticated] = useState(false);
  const [hrPasswordInput, setHrPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [hrPinCode, setHrPinCode] = useState('admin123');

  // Posisi Resmi
  const [positionsList, setPositionsList] = useState([
    { title: 'Crew Outlet / Kasir / Server', dept: 'Outlet Operations' },
    { title: 'Cook / Kitchen Crew', dept: 'Kitchen Operations' },
    { title: 'Leader / Supervisor Outlet', dept: 'Outlet Operations' },
    { title: 'Digital Marketing & Content Specialist', dept: 'Growth & Marketing' },
    { title: 'Social Media & Creative Copywriter', dept: 'Creative & Branding' },
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
    position: 'Crew Outlet / Kasir / Server',
    dept: 'Outlet Operations'
  });

  const [currentApplicant, setCurrentApplicant] = useState(null);
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1200);
  const [activeReport, setActiveReport] = useState(null);

  // PERSISTENT STORAGE: Load Database without Overwriting
  useEffect(() => {
    // 1. Load Database Pelamar Persisten
    const savedDb = localStorage.getItem('talentmatrix_persistent_db');
    const savedPos = localStorage.getItem('tm_custom_positions_v8');
    const savedPin = localStorage.getItem('tm_hr_pin');
    
    if (savedPin) setHrPinCode(savedPin);
    if (savedPos) {
      try { setPositionsList(JSON.parse(savedPos)); } catch (e) {}
    }

    if (savedDb) {
      try {
        const parsed = JSON.parse(savedDb);
        if (Array.isArray(parsed)) {
          setDb(parsed);
        }
      } catch (e) {}
    } else {
      // Hanya inisialisasi jika benar-benar kosong pertama kali
      const initialSeed = [
        {
          id: 'APP-2026-CR01',
          name: 'Siti Rahmawati',
          email: 'siti.rahma@gmail.com',
          phone: '081298765432',
          position: 'Crew Outlet / Kasir / Server',
          dept: 'Outlet Operations',
          roleType: 'crew_outlet',
          date: '28 Ags 2026',
          disc: { d: 55, i: 88, s: 78, c: 75, dom: 'I-S (Hospitality Leader)' },
          mbti: { type: 'ESFJ', title: 'The Host / Provider', desc: 'Sangat ramah, cepat tanggap melayani komplain pelanggan, dan telaten menjaga kebersihan outlet.' },
          outletScore: {
            serviceScore: 100,
            serviceCat: 'Sangat Ramah & Tanggap (Hospitality Star)',
            cashierScore: 100,
            cashierCat: '100% Akurat Tanpa Selisih'
          },
          match: 97,
          status: 'STRONGLY RECOMMENDED'
        },
        {
          id: 'APP-2026-DM01',
          name: 'Yohanes Oktaviano Fernandez',
          email: 'yohanes.fernandez@email.com',
          phone: '081234567890',
          position: 'Digital Marketing & Content Specialist',
          dept: 'Growth & Marketing',
          roleType: 'digital_marketing',
          date: '28 Ags 2026',
          disc: { d: 82, i: 90, s: 45, c: 68, dom: 'I-D (Creative Promoter)' },
          mbti: { type: 'ENTP', title: 'The Visionary / Campaigner', desc: 'Sangat kreatif, berani bereksperimen dengan konten viral, dan tajam merumuskan hook iklan.' },
          marketing: { score: 100, correct: 8, total: 8, cat: 'Expert (Creative & Analytical)' },
          match: 96,
          status: 'STRONGLY RECOMMENDED'
        }
      ];
      setDb(initialSeed);
      localStorage.setItem('talentmatrix_persistent_db', JSON.stringify(initialSeed));
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

  // HR Auth
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
      dept: newPosDept.trim() || 'General Operations'
    };
    const updated = [...positionsList, newPos];
    setPositionsList(updated);
    localStorage.setItem('tm_custom_positions_v8', JSON.stringify(updated));
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
      localStorage.setItem('tm_custom_positions_v8', JSON.stringify(updated));
    }
  };

  // Hapus Data Pelamar Tunggal oleh HR
  const handleDeleteApplicant = (applicantId, applicantName) => {
    if (confirm(`Hapus data pelamar "${applicantName}" dari database?`)) {
      const currentStored = JSON.parse(localStorage.getItem('talentmatrix_persistent_db') || '[]');
      const updated = currentStored.filter(item => item.id !== applicantId);
      setDb(updated);
      localStorage.setItem('talentmatrix_persistent_db', JSON.stringify(updated));
    }
  };

  // Ekspor Seluruh Database Pelamar ke File JSON Backup
  const handleExportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(db, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Backup_Data_Pelamar_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Mulai Tes Dinamis Sesuai Posisi Pelamar
  const handleStartTest = (e) => {
    e.preventDefault();
    const applicant = {
      ...form,
      id: 'APP-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    setCurrentApplicant(applicant);

    const posLower = applicant.position.toLowerCase();
    const isCrewOutlet = posLower.includes('outlet') || posLower.includes('kasir') || posLower.includes('server') || posLower.includes('cook') || posLower.includes('kitchen') || posLower.includes('waiter');
    const isDigitalMarketing = posLower.includes('marketing') || posLower.includes('social media') || posLower.includes('creative');

    let questions = [];
    if (isCrewOutlet) {
      questions = [...BASE_QUESTIONS, ...CREW_OUTLET_QUESTIONS];
    } else if (isDigitalMarketing) {
      questions = [...BASE_QUESTIONS, ...DIGITAL_MARKETING_QUESTIONS];
    } else {
      questions = [...BASE_QUESTIONS, ...GENERAL_COGNITIVE_QUESTIONS];
    }

    setActiveQuestions(questions);
    setAnswers({});
    setQIndex(0);
    setTimeLeft(1200);
    setView('test-runner');
  };

  // Kalkulasi Skor & SIMPAN PERSISTEN (APPEND KE DATABASE LAMA)
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

    let dom = 'I-S (Customer Oriented)';
    if (i >= d && i >= c && i >= s) dom = 'I-S (Hospitality & Friendly)';
    else if (d >= i && d >= s && d >= c) dom = 'D-C (Fast & Action Driven)';
    else if (s >= d && s >= i && s >= c) dom = 'S-C (Calm & Reliable)';
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
      ESFJ: { title: 'The Host / Provider', desc: 'Sangat ramah, tanggap terhadap kebutuhan pelanggan, dan pandai mencairkan suasana outlet.' },
      ISFJ: { title: 'The Protector / Support', desc: 'Pekerja tekun, sabar, telaten melayani, dan sangat disiplin mematuhi SOP kebersihan.' },
      ESTJ: { title: 'The Executive / Supervisor', desc: 'Tegas, disiplin operasional tinggi, teratur, dan memastikan target shift tercapai.' },
      ISTJ: { title: 'The Logistician / Inspector', desc: 'Sangat teliti, akurat menghitung kasir & stok bahan baku, serta konsisten.' },
      ENFP: { title: 'The Campaigner', desc: 'Kreatif, energik, komunikator ulung, dan cepat membangun hubungan interpersonal.' },
      ENTP: { title: 'The Visionary', desc: 'Sangat kreatif, cepat melihat peluang baru, dan adaptif terhadap dinamika.' }
    };
    const mbtiMeta = mbtiDict[mbtiType] || { title: 'Reliable Specialist', desc: 'Memiliki karakter fokus, disiplin, dan bertanggung jawab terhadap tugas.' };

    const posLower = currentApplicant.position.toLowerCase();
    const isCrewOutlet = posLower.includes('outlet') || posLower.includes('kasir') || posLower.includes('server') || posLower.includes('cook') || posLower.includes('kitchen') || posLower.includes('waiter');
    const isDigitalMarketing = posLower.includes('marketing') || posLower.includes('social media') || posLower.includes('creative');

    let outletResult = null;
    let marketingResult = null;
    let match = 68;

    if (isCrewOutlet) {
      let servCorrect = 0;
      activeQuestions.forEach((q, idx) => {
        if (q.module === 'outlet_service' && answers[`q_${idx}`] === q.correct) servCorrect++;
      });
      const servScore = Math.round((servCorrect / 4) * 100);
      let servCat = 'Cukup Ramah';
      if (servScore >= 100) servCat = 'Hospitality Star (Sangat Ramah & Solutif)';
      else if (servScore >= 75) servCat = 'Baik & Sopan';

      let cashCorrect = 0;
      activeQuestions.forEach((q, idx) => {
        if (q.module === 'outlet_cashier' && answers[`q_${idx}`] === q.correct) cashCorrect++;
      });
      const cashScore = Math.round((cashCorrect / 4) * 100);
      let cashCat = 'Perlu Pendampingan';
      if (cashScore >= 100) cashCat = '100% Akurat Tanpa Selisih (Kasir Ready)';
      else if (cashScore >= 75) cashCat = 'Teliti';

      outletResult = {
        serviceScore: servScore,
        serviceCat: servCat,
        cashierScore: cashScore,
        cashierCat: cashCat
      };

      match += Math.round((servScore / 100) * 15) + Math.round((cashScore / 100) * 15);
      if (mbtiType.includes('E') || mbtiType.includes('F')) match += 4;
    } else if (isDigitalMarketing) {
      let mCorrect = 0;
      activeQuestions.forEach((q, idx) => {
        if (q.module === 'marketing' && answers[`q_${idx}`] === q.correct) mCorrect++;
      });
      const mScore = Math.round((mCorrect / 8) * 100);
      marketingResult = {
        score: mScore,
        correct: mCorrect,
        total: 8,
        cat: mScore >= 85 ? 'Expert (Creative & Analytical)' : (mScore >= 70 ? 'Kompeten' : 'Intermediate')
      };
      match += Math.round((mScore / 100) * 26);
    } else {
      match += 20;
    }

    match = Math.min(98, Math.max(50, match));

    const resultObj = {
      ...currentApplicant,
      roleType: isCrewOutlet ? 'crew_outlet' : (isDigitalMarketing ? 'digital_marketing' : 'general'),
      disc: { d, i, s, c, dom },
      mbti: { type: mbtiType, title: mbtiMeta.title, desc: mbtiMeta.desc },
      outletScore: outletResult,
      marketing: marketingResult,
      match,
      status: match >= 85 ? 'STRONGLY RECOMMENDED' : (match >= 70 ? 'RECOMMENDED' : 'CONSIDER')
    };

    // BACA DATABASE LOKAL YANG SUDAH ADA, LALU GABUNGKAN (TIDAK PERNAH MENIMPA)
    const existingRaw = localStorage.getItem('talentmatrix_persistent_db');
    let existingList = [];
    if (existingRaw) {
      try { existingList = JSON.parse(existingRaw); } catch (e) {}
    }
    
    // Taruh data pelamar baru di urutan paling atas
    const updatedList = [resultObj, ...existingList];
    setDb(updatedList);
    localStorage.setItem('talentmatrix_persistent_db', JSON.stringify(updatedList));

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
          filename: `Laporan_Asesmen_${activeReport?.name.replace(/\s+/g, '_')}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf.default().set(opt).from(element).save();
      });
    }
  };

  const q = activeQuestions[qIndex];

  // Filter List Pelamar di Dashboard HR
  const filteredApplicants = db.filter(item => {
    const qLower = searchQuery.toLowerCase();
    return (
      item.name.toLowerCase().includes(qLower) ||
      item.position.toLowerCase().includes(qLower) ||
      item.id.toLowerCase().includes(qLower) ||
      item.email.toLowerCase().includes(qLower)
    );
  });

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
              <span className="text-[10px] ml-2 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">Persistent DB</span>
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
              <span>{isHrAuthenticated ? `Portal HRD (${db.length})` : 'Login HRD'}</span>
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
                <span>Smart Role-Adaptive Assessment</span>
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

              {/* Banner Info Modul Sesuai Posisi */}
              <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100 text-xs text-sky-950 space-y-1.5">
                <div className="font-bold flex items-center space-x-1.5">
                  <Info className="w-4 h-4 text-sky-600" />
                  <span>Materi Evaluasi Posisi {form.position}:</span>
                </div>
                {form.position.toLowerCase().includes('outlet') || form.position.toLowerCase().includes('kasir') || form.position.toLowerCase().includes('server') || form.position.toLowerCase().includes('cook') ? (
                  <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                    <li><strong>Modul 1 (DISC):</strong> Gaya kerja di bawah tekanan & kolaborasi shift.</li>
                    <li><strong>Modul 2 (MBTI):</strong> Kepribadian & kepatuhan terhadap SOP operasional.</li>
                    <li><strong>Modul 3A Khusus Pelayanan:</strong> Penanganan komplain pelanggan, keramahan hospitality, upsell, & kebersihan meja.</li>
                    <li><strong>Modul 3B Khusus Kasir:</strong> Perhitungan uang kembalian, diskon promo, & hitung kasir.</li>
                  </ul>
                ) : form.position.toLowerCase().includes('marketing') ? (
                  <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                    <li><strong>Modul 1 & 2 (DISC + MBTI):</strong> Gaya kerja kreatif & pemikiran konseptual.</li>
                    <li><strong>Modul 3 Khusus Digital Marketing:</strong> Metrik Ads (CTR/ROAS), Formula Hook AIDA, Funneling & Kalender Konten.</li>
                  </ul>
                ) : (
                  <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                    <li><strong>Modul 1 & 2:</strong> DISC & MBTI Profiling.</li>
                    <li><strong>Modul 3:</strong> Kemampuan Logika & Penalaran Masalah.</li>
                  </ul>
                )}
              </div>

              <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-sky-500/25 flex items-center justify-center space-x-2 transition">
                <span>Mulai Pengerjaan Tes Sekarang</span>
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

              {/* Specific Options */}
              {(q.module === 'outlet_service' || q.module === 'outlet_cashier' || q.module === 'marketing' || q.module === 'iq') && (
                <div className="space-y-2">
                  {q.options.map((opt) => (
                    <label key={opt.key} className="flex items-center space-x-3 p-3.5 bg-white rounded-xl border border-slate-200 hover:border-sky-400 cursor-pointer transition">
                      <input 
                        type="radio" 
                        name={`q_${qIndex}`} 
                        checked={answers[`q_${qIndex}`] === opt.key} 
                        onChange={() => setAnswers({...answers, [`q_${qIndex}`]: opt.key})} 
                        className="accent-sky-600" 
                      />
                      <span className="text-xs font-bold text-sky-700">{opt.key}.</span>
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
                <span className="text-xs font-extrabold text-slate-800">Laporan Asesmen Disimpan Persisten</span>
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
                  <p className="text-xs text-slate-400">Evaluasi Karakter (DISC & MBTI) serta Uji Kompetensi Spesifik Jabatan</p>
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

              {/* Modul Spesifik CREW OUTLET */}
              {activeReport.roleType === 'crew_outlet' && activeReport.outletScore && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-1.5">
                    <div className="flex items-center space-x-1.5 text-emerald-800 font-extrabold text-xs">
                      <HeartHandshake className="w-4 h-4 text-emerald-600" />
                      <span>Pelayanan CS & Hospitality Outlet</span>
                    </div>
                    <div className="text-2xl font-black text-emerald-800">{activeReport.outletScore.serviceScore}%</div>
                    <div className="text-[11px] text-emerald-900 font-semibold">{activeReport.outletScore.serviceCat}</div>
                    <p className="text-[10px] text-slate-600">Evaluasi respon saat komplain pelanggan, keramahan menyapa, dan inisiatif kebersihan meja.</p>
                  </div>

                  <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-4 space-y-1.5">
                    <div className="flex items-center space-x-1.5 text-sky-800 font-extrabold text-xs">
                      <Calculator className="w-4 h-4 text-sky-600" />
                      <span>Ketelitian Berhitung & Kasir</span>
                    </div>
                    <div className="text-2xl font-black text-sky-800">{activeReport.outletScore.cashierScore}%</div>
                    <div className="text-[11px] text-sky-900 font-semibold">{activeReport.outletScore.cashierCat}</div>
                    <p className="text-[10px] text-slate-600">Evaluasi perhitungan uang kembalian pecahan, diskon promo, dan hitung kas kasir.</p>
                  </div>
                </div>
              )}

              {/* Modul Spesifik DIGITAL MARKETING */}
              {activeReport.roleType === 'digital_marketing' && activeReport.marketing && (
                <div className="bg-purple-50/80 border border-purple-200 rounded-2xl p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Megaphone className="w-4 h-4 text-purple-700" />
                      <span className="text-xs font-black text-purple-900 uppercase">C. Hasil Evaluasi Digital Marketing & Kreativitas</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-purple-200 text-purple-900 text-xs font-black">
                      Skor: {activeReport.marketing.score}% ({activeReport.marketing.cat})
                    </span>
                  </div>
                  <div className="text-xs text-purple-950 leading-relaxed">
                    Pelamar berhasil menjawab benar {activeReport.marketing.correct} dari {activeReport.marketing.total} studi kasus (Metrik Iklan CTR & ROAS, Formula Copywriting AIDA/Hook, dan Kalender Konten).
                  </div>
                </div>
              )}

              {/* Recommendation Analysis */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1">
                <span className="text-xs font-bold text-slate-900">Analisis Rekomendasi Penempatan ({activeReport.match}% Match Index):</span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Kombinasi kepribadian {activeReport.mbti.type} ({activeReport.mbti.title}) dengan profil DISC {activeReport.disc.dom.split(' ')[0]} dan hasil uji kecakapan praktis menunjukkan kandidat memiliki kesesuaian yang sangat solid untuk mengisi peranan <strong>{activeReport.position}</strong> di departemen <strong>{activeReport.dept}</strong>.
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

        {/* 5. PORTAL HRD PERSISTEN LENGKAP */}
        {view === 'hr-dashboard' && isHrAuthenticated && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap justify-between items-center gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-black text-slate-900">Portal Manajemen & Rekap HRD</h2>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">Database Tersimpan Permanen</span>
                  </div>
                  <p className="text-xs text-slate-500">Seluruh data pelamar tersimpan secara persisten dan tidak akan hilang saat ada tes baru.</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={handleExportBackup} title="Unduh file backup JSON" className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold border border-emerald-200 flex items-center space-x-1">
                    <FileDown className="w-3.5 h-3.5" />
                    <span>Backup Data</span>
                  </button>
                  <button onClick={handleChangePin} className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold border border-slate-200">
                    Ganti Password
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

              {/* Tabel Rekap Pelamar dengan Search & Filter */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap justify-between items-center gap-3">
                  <div>
                    <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                      Daftar Rekap Hasil Seluruh Pelamar ({filteredApplicants.length} Data)
                    </h3>
                    <p className="text-[11px] text-slate-400">Semua data pelamar yang pernah mengerjakan tes tersimpan rapi di sini.</p>
                  </div>
                  <div className="relative w-full sm:w-64">
                    <Search className="w-3.5 h-3.5 absolute left-3 top-3 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Cari nama, token, atau posisi..." 
                      value={searchQuery} 
                      onChange={e => setSearchQuery(e.target.value)} 
                      className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs focus:ring-2 focus:ring-sky-500 focus:outline-none"
                    />
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-50 text-slate-400 uppercase font-bold text-[10px]">
                      <tr>
                        <th className="p-3">Pelamar</th>
                        <th className="p-3">Posisi Dilamar</th>
                        <th className="p-3 text-center">MBTI</th>
                        <th className="p-3 text-center">DISC</th>
                        <th className="p-3 text-center">Hasil Uji Spesifik</th>
                        <th className="p-3 text-center">Fit Score</th>
                        <th className="p-3 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredApplicants.length === 0 ? (
                        <tr>
                          <td colSpan="7" className="p-6 text-center text-slate-400">
                            Tidak ada data pelamar yang cocok dengan pencarian.
                          </td>
                        </tr>
                      ) : (
                        filteredApplicants.map((c) => (
                          <tr key={c.id} className="hover:bg-slate-50">
                            <td className="p-3 font-bold">
                              <div>{c.name}</div>
                              <div className="text-[10px] text-slate-400 font-normal">{c.email} • {c.id}</div>
                            </td>
                            <td className="p-3">
                              <div className="font-semibold text-slate-700">{c.position}</div>
                              <div className="text-[10px] text-slate-400">{c.date}</div>
                            </td>
                            <td className="p-3 text-center font-bold text-purple-700">{c.mbti.type}</td>
                            <td className="p-3 text-center font-bold">{c.disc.dom.split(' ')[0]}</td>
                            <td className="p-3 text-center">
                              {c.roleType === 'crew_outlet' && c.outletScore ? (
                                <div className="space-y-0.5">
                                  <span className="inline-block px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[9px] mr-1">
                                    CS: {c.outletScore.serviceScore}%
                                  </span>
                                  <span className="inline-block px-1.5 py-0.5 rounded bg-sky-100 text-sky-800 font-bold text-[9px]">
                                    Kasir: {c.outletScore.cashierScore}%
                                  </span>
                                </div>
                              ) : c.roleType === 'digital_marketing' && c.marketing ? (
                                <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 font-bold text-[10px]">
                                  DM: {c.marketing.score}%
                                </span>
                              ) : (
                                <span className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-bold text-[10px]">
                                  Standar Fit
                                </span>
                              )}
                            </td>
                            <td className="p-3 text-center">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-100 text-emerald-800">
                                {c.match}%
                              </span>
                            </td>
                            <td className="p-3 text-right space-x-1">
                              <button 
                                onClick={() => { setActiveReport(c); setView('report'); }} 
                                className="px-2.5 py-1 bg-sky-50 hover:bg-sky-100 text-sky-700 rounded-lg text-xs font-bold border border-sky-200"
                              >
                                PDF
                              </button>
                              <button 
                                onClick={() => handleDeleteApplicant(c.id, c.name)} 
                                title="Hapus data pelamar ini"
                                className="p-1 text-slate-300 hover:text-rose-600 rounded-lg transition"
                              >
                                <Trash2 className="w-3.5 h-3.5 inline" />
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
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
                        placeholder="Contoh: Barista & Waiter" 
                        value={newPosTitle} 
                        onChange={e => setNewPosTitle(e.target.value)} 
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Departemen Terkait</label>
                      <input 
                        type="text" 
                        placeholder="Contoh: Outlet Operations" 
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
