'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { 
  Award, Brain, CheckCircle, Clock, Download, Plus, 
  Printer, ShieldCheck, Sparkles, UserPlus, ArrowRight, Info, Briefcase,
  Lock, KeyRound, LogOut, Eye, EyeOff, Calculator, Megaphone, Trash2, HeartHandshake, Search, FileDown, Building2, FileText, CreditCard, ShieldAlert, FileCheck
} from 'lucide-react';

// Dynamic import Radar Chart agar tidak bentrok dengan SSR Next.js di Vercel
const DynamicRadar = dynamic(
  () => import('react-chartjs-2').then((mod) => {
    const { Chart: ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } = require('chart.js');
    ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);
    return mod.Radar;
  }),
  { ssr: false, loading: () => <div className="h-44 flex items-center justify-center text-xs text-slate-400">Memuat Grafik...</div> }
);

// =========================================================================
// 1. BANK SOAL UMUM (DISC, MBTI & IQ KOGNITIF)
// =========================================================================
const BASE_QUESTIONS = [
  // --- DISC (8 Soal) ---
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Gaya Kerja & Komunikasi (DISC)',
    moduleBadge: 'Modul 1 (DISC)',
    instruction: 'Pilih 1 opsi yang PALING sesuai (Most) dan 1 opsi yang PALING TIDAK sesuai (Least) dengan karakter kerja Anda:',
    options: [
      { key: 'D', text: 'Tegas, cepat mengambil keputusan, dan berani mengejar target tinggi.' },
      { key: 'I', text: 'Ramah, antusias, persuasif, dan pandai menjalin hubungan dengan orang baru.' },
      { key: 'S', text: 'Sabar, tenang, setia kawan, dan menyukai ritme kerja yang stabil.' },
      { key: 'C', text: 'Teliti, disiplin, taat SOP, dan mengutamakan akurasi data serta kerapian.' }
    ]
  },
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Gaya Kerja & Komunikasi (DISC)',
    moduleBadge: 'Modul 1 (DISC)',
    instruction: 'Saat menghadapi deadline ketat, antrean ramai, atau target closing mendesak:',
    options: [
      { key: 'D', text: 'Mengambil kendali alur kerja dan mengeksekusi tindakan secepat mungkin.' },
      { key: 'I', text: 'Membangun optimisme rekan tim atau menyapa prospek dengan ramah.' },
      { key: 'S', text: 'Bekerja dengan ritme stabil, tidak panik, dan konsisten membantu tim.' },
      { key: 'C', text: 'Memverifikasi ulang dokumen, nota, dan checklist agar nol toleransi kesalahan.' }
    ]
  },
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Gaya Kerja & Komunikasi (DISC)',
    moduleBadge: 'Modul 1 (DISC)',
    instruction: 'Dalam situasi perbedaan pendapat dengan rekan kerja atau tim cabang:',
    options: [
      { key: 'D', text: 'Menyampaikan langsung to-the-point dan fokus pada solusi tercepat.' },
      { key: 'I', text: 'Mencairkan suasana dengan komunikasi diplomatis agar tidak tegang.' },
      { key: 'S', text: 'Mendengarkan semua pihak dengan sabar demi keharmonisan bersama.' },
      { key: 'C', text: 'Mengacu pada aturan baku, SOP perusahaan, dan bukti data tertulis.' }
    ]
  },
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Gaya Kerja & Komunikasi (DISC)',
    moduleBadge: 'Modul 1 (DISC)',
    instruction: 'Hal yang membuat Anda merasa paling puas setelah bekerja seharian:',
    options: [
      { key: 'D', text: 'Target omzet closing, KPI cabang, atau volume kerja terlampaui maksimal.' },
      { key: 'I', text: 'Banyak konsumen/klien puas dan suasana kerja tim menyenangkan.' },
      { key: 'S', text: 'Seluruh operasional harian berlangsung aman, lancar, dan tanpa kendala.' },
      { key: 'C', text: 'Laporan keuangan, stok barang, atau berkas KPR 100% rapi dan cocok.' }
    ]
  },
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Gaya Kerja & Komunikasi (DISC)',
    moduleBadge: 'Modul 1 (DISC)',
    instruction: 'Hal yang paling membuat Anda kurang nyaman saat bekerja:',
    options: [
      { key: 'D', text: 'Ritme kerja yang lambat dan keraguan bertele-tele dalam bertindak.' },
      { key: 'I', text: 'Suasana kerja kaku, monoton, dan tidak ada ruang komunikasi terbuka.' },
      { key: 'S', text: 'Perubahan instruksi atau jadwal mendadak tanpa koordinasi jelas.' },
      { key: 'C', text: 'Pekerjaan yang berantakan dan mengabaikan standar kualitas / SOP.' }
    ]
  },
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Gaya Kerja & Komunikasi (DISC)',
    moduleBadge: 'Modul 1 (DISC)',
    instruction: 'Bagaimana rekan kerja biasanya menilai kepribadian Anda:',
    options: [
      { key: 'D', text: 'Percaya diri, lugas, tegas, dan berani memimpin.' },
      { key: 'I', text: 'Hangat, ceria, komunikatif, dan pandai mencairkan suasana.' },
      { key: 'S', text: 'Sabar, setia kawan, dan dapat diandalkan saat situasi sulit.' },
      { key: 'C', text: 'Rapi, disiplin tinggi, dan sangat teliti menjaga detail pekerjaan.' }
    ]
  },
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Gaya Kerja & Komunikasi (DISC)',
    moduleBadge: 'Modul 1 (DISC)',
    instruction: 'Sikap Anda saat menerima komplain dari konsumen atau kendala operasional:',
    options: [
      { key: 'D', text: 'Segera memberikan solusi praktis dan mengambil langkah penggantian cepat.' },
      { key: 'I', text: 'Meminta maaf dengan tulus dan mendengarkan keluhan dengan empati.' },
      { key: 'S', text: 'Tetap tenang, tidak terpancing emosi, dan meredakan situasi.' },
      { key: 'C', text: 'Mengecek data transaksi / bukti fisik dan memproses sesuai prosedur resmi.' }
    ]
  },
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Gaya Kerja & Komunikasi (DISC)',
    moduleBadge: 'Modul 1 (DISC)',
    instruction: 'Gaya Anda saat menyelesaikan tugas persiapan harian atau opening/closing:',
    options: [
      { key: 'D', text: 'Membagi tugas dengan cepat dan memastikan target selesai tepat waktu.' },
      { key: 'I', text: 'Mengerjakan tugas sambil menyemangati tim agar tidak terasa jenuh.' },
      { key: 'S', text: 'Menuntaskan bagian tugas saya dengan telaten dari awal hingga tuntas.' },
      { key: 'C', text: 'Memeriksa detail kebersihan sudut area kerja dan checklist kelengkapan barang.' }
    ]
  },

  // --- MODUL 2: MBTI (8 Soal) ---
  {
    module: 'mbti',
    dim: 'EI',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 (MBTI)',
    instruction: 'Pilih pernyataan yang paling mencerminkan cara Anda mengisi ulang energi:',
    options: [
      { key: 'E', text: 'Saya merasa segar dan bersemangat saat bertemu dan berinteraksi aktif dengan banyak orang.' },
      { key: 'I', text: 'Saya merasa lebih fokus dan tenang saat memiliki ruang mandiri untuk konsentrasi.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'EI',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 (MBTI)',
    instruction: 'Saat bertugas melayani calon pembeli atau pelanggan baru:',
    options: [
      { key: 'E', text: 'Spontan menyapa, tersenyum, dan percaya diri membuka percakapan penawaran.' },
      { key: 'I', text: 'Menunggu pelanggan bertanya terlebih dahulu, lalu merespon dengan sopan dan jelas.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'SN',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 (MBTI)',
    instruction: 'Pilih bagaimana Anda mempelajari alur kerja atau prosedur baru:',
    options: [
      { key: 'S', text: 'Melihat contoh langsung, praktek langkah demi langkah sesuai fakta di lapangan.' },
      { key: 'N', text: 'Memahami konsep dasar, visi tujuan, dan gambaran besarnya terlebih dahulu.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'SN',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 (MBTI)',
    instruction: 'Fokus perhatian utama Anda dalam bekerja harian:',
    options: [
      { key: 'S', text: 'Detail fisik nyata (ketersediaan stok, kelengkapan berkas, kebersihan area kerja).' },
      { key: 'N', text: 'Ide-ide baru, inovasi promosi, dan strategi pengembangan ke depan.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'TF',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 (MBTI)',
    instruction: 'Prinsip utama Anda dalam mengambil keputusan kerja yang sulit:',
    options: [
      { key: 'T', text: 'Berdasarkan aturan logika objektif, efisiensi waktu, data angka, dan keadilan.' },
      { key: 'F', text: 'Berdasarkan rasa empati, kenyamanan hubungan tim, dan kepuasan konsumen.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'TF',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 (MBTI)',
    instruction: 'Ketika rekan kerja melakukan kesalahan kecil dalam bertugas:',
    options: [
      { key: 'T', text: 'Langsung mengoreksi kesalahannya secara to-the-point agar kualitas kerja terjaga.' },
      { key: 'F', text: 'Memberitahu secara halus dan personal agar rekan kerja tidak merasa minder.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'JP',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 (MBTI)',
    instruction: 'Bagaimana Anda mengatur berkas, file, atau perlengkapan kerja Anda:',
    options: [
      { key: 'J', text: 'Selalu meletakkan kembali barang pada tempat resminya agar terstruktur dan rapi.' },
      { key: 'P', text: 'Menaruh di tempat yang mudah dijangkau saat itu juga agar fleksibel dan cepat.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'JP',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 (MBTI)',
    instruction: 'Respon Anda terhadap jadwal kerja atau prosedur operasional baku (SOP):',
    options: [
      { key: 'J', text: 'Merasa nyaman karena ada kepastian aturan dan panduan kerja yang jelas.' },
      { key: 'P', text: 'Lebih menyukai kebebasan berimprovisasi sesuai dinamika situasi lapangan.' }
    ]
  },

  // --- MODUL 3: IQ & PENALARAN KOGNITIF (6 Soal) ---
  {
    module: 'iq',
    moduleTitle: 'Modul 3: Logika & Kemampuan Kognitif (IQ)',
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
    moduleTitle: 'Modul 3: Logika & Kemampuan Kognitif (IQ)',
    moduleBadge: 'Modul 3 (IQ)',
    instruction: 'Pola Deret Angka: Tentukan angka selanjutnya: 4, 8, 16, 32, ?',
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
    moduleTitle: 'Modul 3: Logika & Kemampuan Kognitif (IQ)',
    moduleBadge: 'Modul 3 (IQ)',
    instruction: 'Analogi Kata: PROYEK : SITE PLAN = RESTORAN : ?',
    correct: 'A',
    options: [
      { key: 'A', text: 'BUKU MENU' },
      { key: 'B', text: 'KASIR' },
      { key: 'C', text: 'DAPUR' },
      { key: 'D', text: 'MEJA' }
    ]
  },
  {
    module: 'iq',
    moduleTitle: 'Modul 3: Logika & Kemampuan Kognitif (IQ)',
    moduleBadge: 'Modul 3 (IQ)',
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
    moduleTitle: 'Modul 3: Logika & Kemampuan Kognitif (IQ)',
    moduleBadge: 'Modul 3 (IQ)',
    instruction: 'Logika Waktu Operasional: Cabang outlet buka pukul 09.30 dan tutup pukul 21.45. Berapa lama cabang tersebut beroperasi dalam sehari?',
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
    moduleTitle: 'Modul 3: Logika & Kemampuan Kognitif (IQ)',
    moduleBadge: 'Modul 3 (IQ)',
    instruction: 'Penalaran Deduksi: Bahan A lebih berat dari Bahan B. Bahan C lebih berat dari Bahan A. Maka kesimpulannya:',
    correct: 'A',
    options: [
      { key: 'A', text: 'Bahan C adalah bahan yang paling berat di antara ketiganya.' },
      { key: 'B', text: 'Bahan B adalah bahan yang paling berat.' },
      { key: 'C', text: 'Bahan A adalah bahan yang paling berat.' },
      { key: 'D', text: 'Semua bahan memiliki bobot yang sama.' }
    ]
  }
];

// =========================================================================
// 2. MODUL KHUSUS SALES OUTLET / CREW OUTLET
// =========================================================================
const OUTLET_QUESTIONS = [
  {
    module: 'outlet_service',
    moduleTitle: 'Modul 4: Uji Pelayanan Hospitality & Kasir Outlet',
    moduleBadge: 'Uji Kasir & Hospitality Outlet',
    instruction: 'Skenario Komplain Pesanan: Pelanggan mendatangi kasir dengan nada marah karena pesanan tidak sesuai nota. Tindakan terbaik yang wajib Anda lakukan:',
    correct: 'B',
    options: [
      { key: 'A', text: 'Menjelaskan bahwa tadi pelanggan yang salah sebut saat memesan di kasir.' },
      { key: 'B', text: 'Tersenyum sopan, tulus meminta maaf atas ketidaknyamanan, dan segera mengganti menu yang benar tanpa berdebat.' },
      { key: 'C', text: 'Menyuruh pelanggan menunggu lama dan memanggil atasan untuk berdebat.' },
      { key: 'D', text: 'Diam saja dan membuatkan pesanan baru dengan ekspresi kesal.' }
    ]
  },
  {
    module: 'outlet_service',
    moduleTitle: 'Modul 4: Uji Pelayanan Hospitality & Kasir Outlet',
    moduleBadge: 'Uji Kasir & Hospitality Outlet',
    instruction: 'Inisiatif Upselling Menu: Saat pembeli memesan 1 menu kebab/steak, cara menawarkan menu tambahan yang paling ramah dan efektif adalah:',
    correct: 'C',
    options: [
      { key: 'A', text: 'Langsung menambahkan minuman ke struk pembayaran tanpa bertanya.' },
      { key: 'B', text: 'Tidak perlu menawarkan apa-apa agar transaksi cepat selesai.' },
      { key: 'C', text: '"Baik Kak, untuk minumannya mau sekalian coba Es Jeruk Segar kami? Hari ini sedang ada promo tambah Rp5.000 saja Kak."' },
      { key: 'D', text: '"Kakak harus beli minumnya juga ya, karena menunya pedas."' }
    ]
  },
  {
    module: 'outlet_cashier',
    moduleTitle: 'Modul 4: Uji Pelayanan Hospitality & Kasir Outlet',
    moduleBadge: 'Uji Kasir & Hospitality Outlet',
    instruction: 'Hitung Uang Kembalian: Pembeli memesan makanan seharga total Rp46.500 dan membayar dengan uang tunai Rp100.000. Berapa uang kembalian yang harus diserahkan?',
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
    moduleTitle: 'Modul 4: Uji Pelayanan Hospitality & Kasir Outlet',
    moduleBadge: 'Uji Kasir & Hospitality Outlet',
    instruction: 'Hitung Diskon Promo: Paket Hemat seharga Rp150.000 mendapatkan potongan promo 20%. Berapa total nominal yang harus dibayar pelanggan?',
    correct: 'A',
    options: [
      { key: 'A', text: 'Rp120.000 (Diskon 20% x 150rb = 30rb -> 150rb - 30rb = 120rb)' },
      { key: 'B', text: 'Rp130.000' },
      { key: 'C', text: 'Rp125.000' },
      { key: 'D', text: 'Rp115.000' }
    ]
  }
];

// =========================================================================
// 3. MODUL KHUSUS MARKETING STRATEGIC & ONLINE SALES
// =========================================================================
const MARKETING_QUESTIONS = [
  {
    module: 'marketing',
    moduleTitle: 'Modul 4: Uji Strategi Digital Marketing & Ads',
    moduleBadge: 'Uji Digital Marketing',
    instruction: 'Analisis Metrik Iklan: Iklan Meta Ads properti/F&B Anda mendapatkan Impressions 10.000 kali dan Link Clicks sebanyak 300 kali. Berapakah nilai Click-Through Rate (CTR)?',
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
    moduleTitle: 'Modul 4: Uji Strategi Digital Marketing & Ads',
    moduleBadge: 'Uji Digital Marketing',
    instruction: 'Formula Copywriting: Dalam formula AIDA (Attention, Interest, Desire, Action), elemen manakah yang bertindak sebagai "Hook" 3 detik awal pada video promosi?',
    correct: 'A',
    options: [
      { key: 'A', text: 'Attention (Menangkap fokus audiens agar berhenti scrolling)' },
      { key: 'B', text: 'Interest (Menjelaskan fitur produk secara detail)' },
      { key: 'C', text: 'Desire (Memberikan testimoni dan promo diskon)' },
      { key: 'D', text: 'Action (Mengajak klik tombol WhatsApp di bio)' }
    ]
  },
  {
    module: 'marketing',
    moduleTitle: 'Modul 4: Uji Strategi Digital Marketing & Ads',
    moduleBadge: 'Uji Digital Marketing',
    instruction: 'Evaluasi ROAS: Biaya iklan yang dikeluarkan adalah Rp2.000.000 dan menghasilkan omzet penjualan langsung sebesar Rp8.000.000. Berapa nilai ROAS kampanye tersebut?',
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
    moduleTitle: 'Modul 4: Uji Strategi Digital Marketing & Ads',
    moduleBadge: 'Uji Digital Marketing',
    instruction: 'Kreativitas Judul: Manakah judul konten yang memiliki potensi Click-Through Rate (CTR) tertinggi untuk promosi perumahan/properti?',
    correct: 'C',
    options: [
      { key: 'A', text: 'Dijual Rumah Murah dan Nyaman di Lokasi Strategis' },
      { key: 'B', text: 'Informasi Brosur dan Denah Rumah Tipe Terbaru' },
      { key: 'C', text: 'Punya Gaji 5 Juta Tapi Mau Punya Rumah 2 Lantai Dekat Stasiun? Jangan Beli Sebelum Cek Ini!' },
      { key: 'D', text: 'Hubungi Marketing Kami untuk Info Perumahan' }
    ]
  }
];

// =========================================================================
// 4. MODUL KHUSUS INHOUSE SALES (PROPERTI / PROJECT)
// =========================================================================
const INHOUSE_SALES_QUESTIONS = [
  {
    module: 'property_sales',
    moduleTitle: 'Modul 4: Uji Negosiasi & Closing Sales Properti',
    moduleBadge: 'Uji Sales Properti',
    instruction: 'Handling Keberatan Konsumen: Prospek berkata: "Lokasinya bagus, tapi cicilan per bulannya terasa agak berat buat saya." Respon closing terbaik Anda:',
    correct: 'B',
    options: [
      { key: 'A', text: 'Mengatakan bahwa kalau tidak sanggup cicil sebaiknya cari perumahan lain.' },
      { key: 'B', text: 'Menggali budget riil konsumen, lalu memberikan opsi simulasi tenor KPR lebih panjang atau skema promo subsidi DP.' },
      { key: 'C', text: 'Langsung membiarkan prospek pergi tanpa memberikan alternatif pembiayaan.' },
      { key: 'D', text: 'Menyalahkan suku bunga bank yang sedang naik.' }
    ]
  },
  {
    module: 'property_sales',
    moduleTitle: 'Modul 4: Uji Negosiasi & Closing Sales Properti',
    moduleBadge: 'Uji Sales Properti',
    instruction: 'Follow-Up Prospek: Setelah prospek melakukan kunjungan survei lokasi (site visit), waktu paling ideal untuk melakukan follow-up komitmen booking fee adalah:',
    correct: 'A',
    options: [
      { key: 'A', text: 'Dalam waktu 1x24 jam selagi emosi dan impresi positif terhadap unit masih hangat.' },
      { key: 'B', text: 'Menunggu 1 bulan kemudian agar konsumen tidak merasa terganggu.' },
      { key: 'C', text: 'Tidak perlu di-follow up sampai konsumen menelepon kembali.' },
      { key: 'D', text: 'Menelepon setiap 30 menit terus-menerus.' }
    ]
  }
];

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [view, setView] = useState('applicant-form');
  const [db, setDb] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  
  // HR Auth State
  const [isHrAuthenticated, setIsHrAuthenticated] = useState(false);
  const [hrPasswordInput, setHrPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [hrPinCode, setHrPinCode] = useState('admin123');
  
  // Cloud & WhatsApp Sync
  const [hrWaNumber, setHrWaNumber] = useState('6281234567890');
  const [supabaseUrl, setSupabaseUrl] = useState('');
  const [supabaseKey, setSupabaseKey] = useState('');
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  // DAFTAR POSISI
  const [positionsList, setPositionsList] = useState([
    { title: 'Marketing Strategic', dept: 'Marketing & Growth' },
    { title: 'Online Sales / Digital Sales', dept: 'Marketing & Growth' },
    { title: 'Sales Supervisor', dept: 'Sales Division' },
    { title: 'Inhouse Sales (Properti)', dept: 'Property Sales' },
    { title: 'Sales Outlet / Crew (Corner Kebab & Dagos)', dept: 'F&B Operations' },
    { title: 'HC Supervisor', dept: 'Human Capital' },
    { title: 'KPR & Recruitment Staff', dept: 'Human Capital' },
    { title: 'General Affairs / Maintenance & Kebersihan', dept: 'General Affairs' },
    { title: 'Finance Supervisor', dept: 'Finance & Accounting' },
    { title: 'Finance & Accounting Staff', dept: 'Finance & Accounting' },
    { title: 'Operational Supervisor', dept: 'Operations & Logistics' },
    { title: 'Operator / Admin Cabang', dept: 'Operations & Logistics' },
    { title: 'Staff Gudang, Driver & TO', dept: 'Logistics & Supply' }
  ]);

  const [showAddPosModal, setShowAddPosModal] = useState(false);
  const [newPosTitle, setNewPosTitle] = useState('');
  const [newPosDept, setNewPosDept] = useState('');

  // Form Pelamar & File Upload State (CV, KTP, SKCK, NPWP)
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: 'Online Sales / Digital Sales',
    dept: 'Marketing & Growth'
  });

  const [cvFile, setCvFile] = useState({ name: '', dataUrl: '' });
  const [ktpFile, setKtpFile] = useState({ name: '', dataUrl: '' });
  const [skckFile, setSkckFile] = useState({ name: '', dataUrl: '' });
  const [npwpFile, setNpwpFile] = useState({ name: '', dataUrl: '' });

  const [currentApplicant, setCurrentApplicant] = useState(null);
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(1200);
  const [activeReport, setActiveReport] = useState(null);

  // Mencegah Hydration Mismatch & Load Database Aman
  useEffect(() => {
    setMounted(true);
    try {
      const savedPin = localStorage.getItem('tm_hr_pin');
      const savedPos = localStorage.getItem('tm_company_positions_v3');
      const savedWa = localStorage.getItem('tm_hr_wa');
      const savedUrl = localStorage.getItem('tm_supabase_url');
      const savedKey = localStorage.getItem('tm_supabase_key');
      
      if (savedPin) setHrPinCode(savedPin);
      if (savedWa) setHrWaNumber(savedWa);
      if (savedUrl) setSupabaseUrl(savedUrl);
      if (savedKey) setSupabaseKey(savedKey);
      if (savedPos) {
        try { setPositionsList(JSON.parse(savedPos)); } catch (e) {}
      }

      fetchApplicants(savedUrl, savedKey);
    } catch (e) {
      console.warn('LocalStorage error:', e);
    }
  }, []);

  const fetchApplicants = async (sUrl, sKey) => {
    const url = sUrl || supabaseUrl;
    const key = sKey || supabaseKey;

    if (url && key) {
      try {
        const res = await fetch(`${url}/rest/v1/applicants?select=*&order=created_at.desc`, {
          headers: {
            'apikey': key,
            'Authorization': `Bearer ${key}`
          }
        });
        if (res.ok) {
          const cloudData = await res.json();
          const formatted = cloudData.map(item => ({
            id: item.token_id || item.id,
            name: item.name,
            email: item.email,
            phone: item.phone,
            position: item.position,
            dept: item.dept,
            roleType: item.role_type,
            date: item.test_date,
            cv: item.cv_data || null,
            ktp: item.ktp_data || null,
            skck: item.skck_data || null,
            npwp: item.npwp_data || null,
            disc: item.disc_summary,
            mbti: item.mbti_summary,
            iq: item.iq_summary,
            outletScore: item.outlet_score,
            marketing: item.marketing_score,
            propertySales: item.property_sales_score,
            match: item.match_score,
            status: item.recommendation_status
          }));
          setDb(formatted);
          localStorage.setItem('talentmatrix_persistent_db', JSON.stringify(formatted));
          return;
        }
      } catch (err) {}
    }

    try {
      const savedDb = localStorage.getItem('talentmatrix_persistent_db');
      if (savedDb) {
        setDb(JSON.parse(savedDb));
      }
    } catch (e) {}
  };

  // Convert File ke Base64 Data URL (CV, KTP, SKCK, NPWP)
  const handleFileUpload = (e, type) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert(`Ukuran berkas ${file.name} melebihi 2 MB. Harap gunakan berkas di bawah 2 MB!`);
      e.target.value = null;
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'cv') setCvFile({ name: file.name, dataUrl: reader.result });
      else if (type === 'ktp') setKtpFile({ name: file.name, dataUrl: reader.result });
      else if (type === 'skck') setSkckFile({ name: file.name, dataUrl: reader.result });
      else if (type === 'npwp') setNpwpFile({ name: file.name, dataUrl: reader.result });
    };
    reader.readAsDataURL(file);
  };

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
      fetchApplicants();
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
      fetchApplicants();
    } else {
      setLoginError('');
      setHrPasswordInput('');
      setView('hr-login');
    }
  };

  const handleSaveSettings = (e) => {
    e.preventDefault();
    localStorage.setItem('tm_hr_wa', hrWaNumber);
    localStorage.setItem('tm_supabase_url', supabaseUrl);
    localStorage.setItem('tm_supabase_key', supabaseKey);
    setShowSettingsModal(false);
    alert('Pengaturan Database Cloud & Nomor WA HRD berhasil disimpan!');
    fetchApplicants(supabaseUrl, supabaseKey);
  };

  const handleAddNewPosition = (e) => {
    e.preventDefault();
    if (!newPosTitle.trim()) return;
    const newPos = {
      title: newPosTitle.trim(),
      dept: newPosDept.trim() || 'General Operations'
    };
    const updated = [...positionsList, newPos];
    setPositionsList(updated);
    localStorage.setItem('tm_company_positions_v3', JSON.stringify(updated));
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
      localStorage.setItem('tm_company_positions_v3', JSON.stringify(updated));
    }
  };

  const handleDeleteApplicant = async (applicantId, applicantName) => {
    if (confirm(`Hapus data pelamar "${applicantName}" dari database?`)) {
      if (supabaseUrl && supabaseKey) {
        try {
          await fetch(`${supabaseUrl}/rest/v1/applicants?token_id=eq.${applicantId}`, {
            method: 'DELETE',
            headers: {
              'apikey': supabaseKey,
              'Authorization': `Bearer ${supabaseKey}`
            }
          });
        } catch (e) {}
      }
      const currentStored = JSON.parse(localStorage.getItem('talentmatrix_persistent_db') || '[]');
      const updated = currentStored.filter(item => item.id !== applicantId);
      setDb(updated);
      localStorage.setItem('talentmatrix_persistent_db', JSON.stringify(updated));
    }
  };

  const handleExportBackup = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(db, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `Backup_Pelamar_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  // Mulai Tes Dinamis
  const handleStartTest = (e) => {
    e.preventDefault();
    const applicant = {
      ...form,
      cv: cvFile.dataUrl ? cvFile : null,
      ktp: ktpFile.dataUrl ? ktpFile : null,
      skck: skckFile.dataUrl ? skckFile : null,
      npwp: npwpFile.dataUrl ? npwpFile : null,
      id: 'APP-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    setCurrentApplicant(applicant);

    const posLower = applicant.position.toLowerCase();
    const isOutlet = posLower.includes('outlet') || posLower.includes('kebab') || posLower.includes('dagos') || posLower.includes('kasir') || posLower.includes('server') || posLower.includes('cook');
    const isMarketing = posLower.includes('marketing') || posLower.includes('online sales') || posLower.includes('digital');
    const isPropertySales = posLower.includes('inhouse') || posLower.includes('properti') || posLower.includes('sales supervisor');

    let questions = [...BASE_QUESTIONS];
    if (isOutlet) {
      questions = [...questions, ...OUTLET_QUESTIONS];
    } else if (isMarketing) {
      questions = [...questions, ...MARKETING_QUESTIONS];
    } else if (isPropertySales) {
      questions = [...questions, ...INHOUSE_SALES_QUESTIONS];
    }

    setActiveQuestions(questions);
    setAnswers({});
    setQIndex(0);
    setTimeLeft(1200);
    setView('test-runner');
  };

  // Kalkulasi Skor
  const calculateResults = async () => {
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

    let dom = 'I-D (Action Driver)';
    if (i >= d && i >= c && i >= s) dom = 'I-D (Persuasive Communicator)';
    else if (d >= i && d >= s && d >= c) dom = 'D-C (Target Driven Leader)';
    else if (s >= d && s >= i && s >= c) dom = 'S-C (Reliable & Stable)';
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
      ENFP: { title: 'The Campaigner / Top Seller', desc: 'Sangat komunikatif, energik, cepat membangun hubungan baik dengan calon pembeli.' },
      ENTP: { title: 'The Visionary / Strategist', desc: 'Cepat melihat peluang baru, tajam merumuskan strategi penawaran, dan inovatif.' },
      ESTJ: { title: 'The Executive / Supervisor', desc: 'Tegas, disiplin operasional tinggi, teratur, dan memastikan target tim tercapai.' },
      ESFJ: { title: 'The Provider / Host', desc: 'Sangat ramah, tanggap melayani konsumen, dan menjaga keharmonisan tim kerja.' },
      ISTJ: { title: 'The Inspector / Admin Master', desc: 'Sangat teliti, akurat mengelola berkas & data, serta taat prosedur perusahaan.' },
      ENTJ: { title: 'The Commander', desc: 'Pemimpin strategis dengan fokus eksekusi target dan skala pertumbuhan bisnis.' }
    };
    const mbtiMeta = mbtiDict[mbtiType] || { title: 'Reliable Professional', desc: 'Memiliki karakter bertanggung jawab, fokus, dan disiplin.' };

    // 3. IQ Scoring
    let iqCorrect = 0;
    activeQuestions.forEach((q, idx) => {
      if (q.module === 'iq' && answers[`q_${idx}`] === q.correct) iqCorrect++;
    });
    const iqScore = 90 + Math.round((iqCorrect / 6) * 35);
    let iqCat = 'Rata-rata (Average)';
    if (iqScore >= 120) iqCat = 'Superior';
    else if (iqScore >= 110) iqCat = 'Di Atas Rata-rata';

    const posLower = currentApplicant.position.toLowerCase();
    const isOutlet = posLower.includes('outlet') || posLower.includes('kebab') || posLower.includes('dagos') || posLower.includes('kasir') || posLower.includes('server') || posLower.includes('cook');
    const isMarketing = posLower.includes('marketing') || posLower.includes('online sales') || posLower.includes('digital');
    const isPropertySales = posLower.includes('inhouse') || posLower.includes('properti') || posLower.includes('sales supervisor');

    let outletResult = null;
    let marketingResult = null;
    let propertySalesResult = null;
    let match = 65;

    if (isOutlet) {
      let servCorrect = 0, cashCorrect = 0;
      activeQuestions.forEach((q, idx) => {
        if (q.module === 'outlet_service' && answers[`q_${idx}`] === q.correct) servCorrect++;
        if (q.module === 'outlet_cashier' && answers[`q_${idx}`] === q.correct) cashCorrect++;
      });
      outletResult = {
        serviceScore: Math.round((servCorrect / 2) * 100),
        cashierScore: Math.round((cashCorrect / 2) * 100)
      };
      match += Math.round((outletResult.serviceScore / 100) * 15) + Math.round((outletResult.cashierScore / 100) * 15);
    } else if (isMarketing) {
      let mCorrect = 0;
      activeQuestions.forEach((q, idx) => {
        if (q.module === 'marketing' && answers[`q_${idx}`] === q.correct) mCorrect++;
      });
      marketingResult = {
        score: Math.round((mCorrect / 4) * 100),
        cat: mCorrect >= 3 ? 'Expert (Creative & Analytical)' : 'Intermediate'
      };
      match += Math.round((marketingResult.score / 100) * 25);
    } else if (isPropertySales) {
      let psCorrect = 0;
      activeQuestions.forEach((q, idx) => {
        if (q.module === 'property_sales' && answers[`q_${idx}`] === q.correct) psCorrect++;
      });
      propertySalesResult = {
        score: Math.round((psCorrect / 2) * 100),
        cat: psCorrect >= 2 ? 'Expert (Top Closing Skill)' : 'Good'
      };
      match += Math.round((propertySalesResult.score / 100) * 25);
    }

    if (iqScore >= 110) match += 8;
    match = Math.min(98, Math.max(50, match));

    const resultObj = {
      ...currentApplicant,
      roleType: isOutlet ? 'outlet' : (isMarketing ? 'marketing' : (isPropertySales ? 'property_sales' : 'general')),
      disc: { d, i, s, c, dom },
      mbti: { type: mbtiType, title: mbtiMeta.title, desc: mbtiMeta.desc },
      iq: { score: iqScore, cat: iqCat, correct: iqCorrect, total: 6 },
      outletScore: outletResult,
      marketing: marketingResult,
      propertySales: propertySalesResult,
      match,
      status: match >= 85 ? 'STRONGLY RECOMMENDED' : (match >= 70 ? 'RECOMMENDED' : 'CONSIDER')
    };

    // Simpan ke Supabase Cloud jika aktif
    const sUrl = localStorage.getItem('tm_supabase_url') || supabaseUrl;
    const sKey = localStorage.getItem('tm_supabase_key') || supabaseKey;
    if (sUrl && sKey) {
      try {
        await fetch(`${sUrl}/rest/v1/applicants`, {
          method: 'POST',
          headers: {
            'apikey': sKey,
            'Authorization': `Bearer ${sKey}`,
            'Content-Type': 'application/json',
            'Prefer': 'return=minimal'
          },
          body: JSON.stringify({
            token_id: resultObj.id,
            name: resultObj.name,
            email: resultObj.email,
            phone: resultObj.phone,
            position: resultObj.position,
            dept: resultObj.dept,
            role_type: resultObj.roleType,
            test_date: resultObj.date,
            cv_data: resultObj.cv,
            ktp_data: resultObj.ktp,
            skck_data: resultObj.skck,
            npwp_data: resultObj.npwp,
            disc_summary: resultObj.disc,
            mbti_summary: resultObj.mbti,
            iq_summary: resultObj.iq,
            outlet_score: resultObj.outletScore,
            marketing_score: resultObj.marketing,
            property_sales_score: resultObj.propertySales,
            match_score: resultObj.match,
            recommendation_status: resultObj.status
          })
        });
      } catch (err) {}
    }

    // Simpan ke LocalStorage Persisten
    try {
      const existingRaw = localStorage.getItem('talentmatrix_persistent_db');
      let existingList = [];
      if (existingRaw) {
        existingList = JSON.parse(existingRaw);
      }
      const updatedList = [resultObj, ...existingList];
      setDb(updatedList);
      localStorage.setItem('talentmatrix_persistent_db', JSON.stringify(updatedList));
    } catch (e) {}

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
          filename: `Laporan_${activeReport?.name.replace(/\s+/g, '_')}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true },
          jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
        };
        html2pdf.default().set(opt).from(element).save();
      });
    }
  };

  const sendResultToWhatsApp = () => {
    if (!activeReport) return;
    const wa = hrWaNumber.replace(/[^0-9]/g, '');
    let specificInfo = `*Skor IQ Kognitif:* ${activeReport.iq?.score} (${activeReport.iq?.cat})`;

    if (activeReport.roleType === 'outlet' && activeReport.outletScore) {
      specificInfo += `\n*Hospitality CS:* ${activeReport.outletScore.serviceScore}%\n*Ketelitian Kasir:* ${activeReport.outletScore.cashierScore}%`;
    } else if (activeReport.roleType === 'marketing' && activeReport.marketing) {
      specificInfo += `\n*Skor Digital Marketing:* ${activeReport.marketing.score}% (${activeReport.marketing.cat})`;
    } else if (activeReport.roleType === 'property_sales' && activeReport.propertySales) {
      specificInfo += `\n*Skor Sales Properti:* ${activeReport.propertySales.score}% (${activeReport.propertySales.cat})`;
    }

    const docs = [];
    if (activeReport.cv) docs.push('CV');
    if (activeReport.ktp) docs.push('KTP');
    if (activeReport.skck) docs.push('SKCK');
    if (activeReport.npwp) docs.push('NPWP');

    const text = `Halo Tim HRD, saya telah menyelesaikan Tes Asesmen Online:\n\n` +
      `*Nama Pelamar:* ${activeReport.name}\n` +
      `*ID Token:* ${activeReport.id}\n` +
      `*Posisi Dilamar:* ${activeReport.position} (${activeReport.dept})\n` +
      `*No. WA:* ${activeReport.phone}\n` +
      `*Berkas Upload:* ${docs.length > 0 ? docs.join(', ') : 'Belum Melampirkan'}\n` +
      `*Tipe MBTI:* ${activeReport.mbti.type} (${activeReport.mbti.title})\n` +
      `*DISC Dominan:* ${activeReport.disc.dom}\n` +
      `${specificInfo}\n\n` +
      `*Hasil Akhir:* ${activeReport.status} (Fit Index: ${activeReport.match}%)\n` +
      `*Tanggal:* ${activeReport.date}\n\n` +
      `Mohon verifikasi dan arahan untuk tahapan selanjutnya. Terima kasih!`;

    const waUrl = `https://api.whatsapp.com/send?phone=${wa}&text=${encodeURIComponent(text)}`;
    window.open(waUrl, '_blank');
  };

  const openFilePreview = (dataUrl) => {
    if (!dataUrl) return;
    const win = window.open();
    win.document.write(`<iframe src="${dataUrl}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`);
  };

  // Jangan render sebelum browser siap (mencegah error hydration)
  if (!mounted) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-white text-xs font-semibold">
        Memuat Sistem Asesmen...
      </div>
    );
  }

  const q = activeQuestions[qIndex];

  const filteredApplicants = db.filter(item => {
    const qLower = searchQuery.toLowerCase();
    return (
      item.name?.toLowerCase().includes(qLower) ||
      item.position?.toLowerCase().includes(qLower) ||
      item.id?.toLowerCase().includes(qLower) ||
      item.email?.toLowerCase().includes(qLower)
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
              <span className="text-[10px] ml-2 px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-semibold border border-emerald-500/30">Enterprise Multi-Brand</span>
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
                <span>Online Recruitment Screening</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Formulir Data Diri Pelamar</h1>
              <p className="text-xs sm:text-sm text-slate-500">Lengkapi data identitas dan unggah berkas kelengkapan (CV, KTP, SKCK & NPWP) sebelum memulai tes evaluasi.</p>
            </div>

            <form onSubmit={handleStartTest} className="max-w-lg mx-auto space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Nama Lengkap *</label>
                <input 
                  type="text" 
                  required 
                  value={form.name} 
                  onChange={e => setForm({...form, name: e.target.value})} 
                  placeholder="Contoh: Khairul Anam" 
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
                      dept: matched ? matched.dept : 'Operations'
                    });
                  }} 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  {positionsList.map((pos, idx) => (
                    <option key={idx} value={pos.title}>
                      {pos.title} — [{pos.dept}]
                    </option>
                  ))}
                </select>
              </div>

              {/* UPLOAD BERKAS CV, KTP, SKCK, NPWP */}
              <div className="pt-2">
                <label className="block text-xs font-extrabold text-slate-800 uppercase tracking-wider mb-2">Berkas Lamaran & Identitas Diri:</label>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* Upload CV */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5">
                    <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700">
                      <FileText className="w-3.5 h-3.5 text-sky-600" />
                      <span>Curriculum Vitae (CV) *</span>
                    </div>
                    <input 
                      type="file" 
                      required
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => handleFileUpload(e, 'cv')}
                      className="block w-full text-[11px] text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-sky-50 file:text-sky-700 hover:file:bg-sky-100 cursor-pointer"
                    />
                    {cvFile.name && (
                      <div className="text-[10px] font-semibold text-emerald-600 flex items-center space-x-1 truncate">
                        <CheckCircle className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{cvFile.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Upload KTP */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5">
                    <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700">
                      <CreditCard className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Foto KTP Asli *</span>
                    </div>
                    <input 
                      type="file" 
                      required
                      accept="image/*"
                      onChange={(e) => handleFileUpload(e, 'ktp')}
                      className="block w-full text-[11px] text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-emerald-50 file:text-emerald-700 hover:file:bg-emerald-100 cursor-pointer"
                    />
                    {ktpFile.name && (
                      <div className="text-[10px] font-semibold text-emerald-600 flex items-center space-x-1 truncate">
                        <CheckCircle className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{ktpFile.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Upload SKCK */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5">
                    <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700">
                      <ShieldAlert className="w-3.5 h-3.5 text-amber-600" />
                      <span>Berkas SKCK Aktif *</span>
                    </div>
                    <input 
                      type="file" 
                      required
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload(e, 'skck')}
                      className="block w-full text-[11px] text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-amber-50 file:text-amber-700 hover:file:bg-amber-100 cursor-pointer"
                    />
                    {skckFile.name && (
                      <div className="text-[10px] font-semibold text-emerald-600 flex items-center space-x-1 truncate">
                        <CheckCircle className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{skckFile.name}</span>
                      </div>
                    )}
                  </div>

                  {/* Upload NPWP (Opsional) */}
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-2xl space-y-1.5">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-1.5 text-xs font-bold text-slate-700">
                        <FileCheck className="w-3.5 h-3.5 text-purple-600" />
                        <span>Foto NPWP</span>
                      </div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase bg-slate-200/60 px-1.5 py-0.5 rounded">Opsional</span>
                    </div>
                    <input 
                      type="file" 
                      accept="image/*,.pdf"
                      onChange={(e) => handleFileUpload(e, 'npwp')}
                      className="block w-full text-[11px] text-slate-500 file:mr-2 file:py-1 file:px-2.5 file:rounded-lg file:border-0 file:text-[10px] file:font-bold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100 cursor-pointer"
                    />
                    {npwpFile.name && (
                      <div className="text-[10px] font-semibold text-emerald-600 flex items-center space-x-1 truncate">
                        <CheckCircle className="w-3 h-3 flex-shrink-0" />
                        <span className="truncate">{npwpFile.name}</span>
                      </div>
                    )}
                  </div>
                </div>
                <p className="text-[10px] text-slate-400 mt-1.5">* Format berkas: PDF / JPG / PNG (Maksimal 2 MB per berkas).</p>
              </div>

              {/* Banner Info Modul */}
              <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100 text-xs text-sky-950 space-y-1.5">
                <div className="font-bold flex items-center space-x-1.5">
                  <Building2 className="w-4 h-4 text-sky-600" />
                  <span>Struktur Evaluasi {form.position}:</span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                  <li><strong>Modul 1:</strong> Gaya Kerja & Komunikasi (DISC Profile)</li>
                  <li><strong>Modul 2:</strong> Preferensi Kepribadian (MBTI Indicator)</li>
                  <li><strong>Modul 3:</strong> Kemampuan Logika Kognitif (IQ Engine)</li>
                  {form.position.toLowerCase().includes('outlet') || form.position.toLowerCase().includes('kebab') || form.position.toLowerCase().includes('dagos') ? (
                    <li><strong>Modul 4 Khusus Outlet:</strong> Pelayanan Hospitality CS & Aritmatika Kasir</li>
                  ) : form.position.toLowerCase().includes('marketing') || form.position.toLowerCase().includes('online sales') ? (
                    <li><strong>Modul 4 Khusus Marketing:</strong> Metrik Iklan (CTR/ROAS) & Copywriting AIDA</li>
                  ) : form.position.toLowerCase().includes('inhouse') || form.position.toLowerCase().includes('properti') ? (
                    <li><strong>Modul 4 Khusus Property Sales:</strong> Negosiasi, Handling Keberatan & Closing KPR</li>
                  ) : null}
                </ul>
              </div>

              <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-sky-500/25 flex items-center justify-center space-x-2 transition">
                <span>Mulai Pengerjaan Tes Lengkap</span>
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
              <p className="text-xs text-slate-500">Area terproteksi tim HR. Pelamar tidak diizinkan mengakses.</p>
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

            {/* Question Box */}
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
              {(q.module === 'iq' || q.module === 'outlet_service' || q.module === 'outlet_cashier' || q.module === 'marketing' || q.module === 'property_sales') && (
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

        {/* 4. LAPORAN HASIL ASESMEN INDIVIDU & ACTION BAR */}
        {view === 'report' && activeReport && (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex flex-wrap justify-between items-center gap-3 no-print">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span className="text-xs font-extrabold text-slate-800">Laporan Asesmen Telah Terbit & Tersimpan</span>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={sendResultToWhatsApp} 
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow-md transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Kirim Hasil ke HRD (WhatsApp)</span>
                </button>
                <button onClick={downloadPdf} className="px-3.5 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 shadow">
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
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
                  <p className="text-xs text-slate-400">Evaluasi Karakter (DISC & MBTI), Skor IQ Kognitif, serta Berkas Lamaran</p>
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
                <div><span className="text-slate-400 block font-bold text-[10px]">Posisi:</span><strong>{activeReport.position}</strong></div>
                <div><span className="text-slate-400 block font-bold text-[10px]">Departemen:</span><strong>{activeReport.dept}</strong></div>
              </div>

              {/* Status Berkas Terlampir (CV, KTP, SKCK, NPWP) */}
              <div className="p-3 bg-sky-50/70 border border-sky-200 rounded-xl text-xs space-y-1">
                <span className="font-bold text-sky-900 block mb-1">Status Berkas Terlampir Pelamar:</span>
                <div className="flex flex-wrap items-center gap-3">
                  <span className={`flex items-center space-x-1 font-semibold ${activeReport.cv ? 'text-emerald-700' : 'text-slate-400'}`}>
                    <FileText className="w-3.5 h-3.5" />
                    <span>{activeReport.cv ? 'CV Ada' : 'Tanpa CV'}</span>
                  </span>
                  <span className={`flex items-center space-x-1 font-semibold ${activeReport.ktp ? 'text-emerald-700' : 'text-slate-400'}`}>
                    <CreditCard className="w-3.5 h-3.5" />
                    <span>{activeReport.ktp ? 'KTP Ada' : 'Tanpa KTP'}</span>
                  </span>
                  <span className={`flex items-center space-x-1 font-semibold ${activeReport.skck ? 'text-emerald-700' : 'text-slate-400'}`}>
                    <ShieldAlert className="w-3.5 h-3.5" />
                    <span>{activeReport.skck ? 'SKCK Ada' : 'Tanpa SKCK'}</span>
                  </span>
                  <span className={`flex items-center space-x-1 font-semibold ${activeReport.npwp ? 'text-emerald-700' : 'text-slate-400'}`}>
                    <FileCheck className="w-3.5 h-3.5" />
                    <span>{activeReport.npwp ? 'NPWP Ada' : 'Tanpa NPWP'}</span>
                  </span>
                </div>
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
                    <DynamicRadar 
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

                {/* MBTI & IQ Card */}
                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-slate-800">B. Tipe Kepribadian (MBTI)</span>
                      <span className="px-2.5 py-0.5 rounded bg-purple-100 text-purple-800 text-xs font-black">{activeReport.mbti.type}</span>
                    </div>
                    <div className="text-xs font-bold text-purple-900">{activeReport.mbti.title}</div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{activeReport.mbti.desc}</p>
                  </div>

                  {/* KARTU SKOR IQ */}
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-slate-800">C. Kemampuan Kognitif (IQ)</span>
                      <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 text-[10px] font-bold">{activeReport.iq?.cat}</span>
                    </div>
                    <div className="text-2xl font-black text-sky-600">{activeReport.iq?.score} <span className="text-xs font-medium text-slate-500">Skala Baku SD 15</span></div>
                    <p className="text-[11px] text-slate-600">Menjawab benar {activeReport.iq?.correct} dari {activeReport.iq?.total} instrumen logika & silogisme.</p>
                  </div>
                </div>
              </div>

              {/* Modul Spesifik OUTLET */}
              {activeReport.roleType === 'outlet' && activeReport.outletScore && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  <div className="bg-emerald-50/70 border border-emerald-200 rounded-2xl p-4 space-y-1.5">
                    <div className="flex items-center space-x-1.5 text-emerald-800 font-extrabold text-xs">
                      <HeartHandshake className="w-4 h-4 text-emerald-600" />
                      <span>Pelayanan CS & Hospitality Outlet</span>
                    </div>
                    <div className="text-2xl font-black text-emerald-800">{activeReport.outletScore.serviceScore}%</div>
                    <p className="text-[10px] text-slate-600">Evaluasi respon penanganan komplain pelanggan dan kesigapan melayani.</p>
                  </div>

                  <div className="bg-sky-50/70 border border-sky-200 rounded-2xl p-4 space-y-1.5">
                    <div className="flex items-center space-x-1.5 text-sky-800 font-extrabold text-xs">
                      <Calculator className="w-4 h-4 text-sky-600" />
                      <span>Ketelitian Berhitung Kasir</span>
                    </div>
                    <div className="text-2xl font-black text-sky-800">{activeReport.outletScore.cashierScore}%</div>
                    <p className="text-[10px] text-slate-600">Evaluasi perhitungan uang kembalian pecahan dan diskon promo outlet.</p>
                  </div>
                </div>
              )}

              {/* Modul Spesifik MARKETING */}
              {activeReport.roleType === 'marketing' && activeReport.marketing && (
                <div className="bg-purple-50/80 border border-purple-200 rounded-2xl p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Megaphone className="w-4 h-4 text-purple-700" />
                      <span className="text-xs font-black text-purple-900 uppercase">D. Evaluasi Digital Marketing & Kreativitas</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-purple-200 text-purple-900 text-xs font-black">
                      Skor: {activeReport.marketing.score}% ({activeReport.marketing.cat})
                    </span>
                  </div>
                  <div className="text-xs text-purple-950 leading-relaxed">
                    Evaluasi mencakup pemahaman Metrik Iklan (CTR/ROAS) dan Formula Copywriting Hook AIDA.
                  </div>
                </div>
              )}

              {/* Modul Spesifik PROPERTY SALES */}
              {activeReport.roleType === 'property_sales' && activeReport.propertySales && (
                <div className="bg-amber-50/80 border border-amber-200 rounded-2xl p-4 space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <Building2 className="w-4 h-4 text-amber-700" />
                      <span className="text-xs font-black text-amber-900 uppercase">D. Evaluasi Negosiasi & Closing Sales Properti</span>
                    </div>
                    <span className="px-3 py-1 rounded-full bg-amber-200 text-amber-900 text-xs font-black">
                      Skor: {activeReport.propertySales.score}% ({activeReport.propertySales.cat})
                    </span>
                  </div>
                  <div className="text-xs text-amber-950 leading-relaxed">
                    Evaluasi kemampuan handling objection cicilan konsumen dan kecepatan follow-up prospek site visit.
                  </div>
                </div>
              )}

              {/* Recommendation Analysis */}
              <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 space-y-1">
                <span className="text-xs font-bold text-slate-900">Analisis Rekomendasi Penempatan ({activeReport.match}% Match Index):</span>
                <p className="text-xs text-slate-700 leading-relaxed">
                  Kombinasi kepribadian {activeReport.mbti.type} ({activeReport.mbti.title}), profil DISC {activeReport.disc.dom.split(' ')[0]}, dan skor IQ {activeReport.iq?.score} ({activeReport.iq?.cat}) menunjukkan kesiapan kerja yang sangat solid untuk mengisi peranan <strong>{activeReport.position}</strong> di departemen <strong>{activeReport.dept}</strong>.
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
                  <div className="border-t border-slate-400 w-36 mx-auto pt-1 font-bold">Ardiansyah (Director)</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 5. PORTAL HRD PERSISTEN (DENGAN AKSES CV, KTP, SKCK & NPWP) */}
        {view === 'hr-dashboard' && isHrAuthenticated && (
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
              <div className="flex flex-wrap justify-between items-center gap-4 pb-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center space-x-2">
                    <h2 className="text-xl font-black text-slate-900">Portal Manajemen & Rekap HRD</h2>
                    {supabaseUrl ? (
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold flex items-center space-x-1">
                        <Database className="w-3 h-3 text-emerald-600" />
                        <span>Cloud Database Aktif</span>
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 text-[10px] font-bold">LocalStorage Mode</span>
                    )}
                  </div>
                  <p className="text-xs text-slate-500">Seluruh data pelamar, skor tes, serta berkas CV, KTP, SKCK, dan NPWP tersimpan aman.</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button onClick={() => setShowSettingsModal(true)} className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold border border-slate-200 flex items-center space-x-1">
                    <Settings className="w-3.5 h-3.5" />
                    <span>Setup Cloud & WA</span>
                  </button>
                  <button onClick={handleExportBackup} className="px-3 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-xl text-xs font-bold border border-emerald-200 flex items-center space-x-1">
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

              {/* Tabel Rekap Pelamar */}
              <div className="space-y-3 pt-2">
                <div className="flex flex-wrap justify-between items-center gap-3">
                  <div>
                    <h3 className="text-xs font-extrabold text-slate-900 uppercase tracking-wider">
                      Daftar Rekap Hasil Seluruh Pelamar ({filteredApplicants.length} Data)
                    </h3>
                    <p className="text-[11px] text-slate-400">Seluruh data hasil tes, skor IQ, serta kelengkapan berkas pelamar.</p>
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
                        <th className="p-3">Pelamar & Kontak</th>
                        <th className="p-3">Posisi Dilamar</th>
                        <th className="p-3 text-center">Berkas Lampiran</th>
                        <th className="p-3 text-center">MBTI</th>
                        <th className="p-3 text-center">DISC</th>
                        <th className="p-3 text-center">Skor IQ</th>
                        <th className="p-3 text-center">Fit Score</th>
                        <th className="p-3 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredApplicants.length === 0 ? (
                        <tr>
                          <td colSpan="8" className="p-6 text-center text-slate-400">
                            Tidak ada data pelamar yang cocok.
                          </td>
                        </tr>
                      ) : (
                        filteredApplicants.map((c) => (
                          <tr key={c.id} className="hover:bg-slate-50">
                            <td className="p-3 font-bold">
                              <div>{c.name}</div>
                              <div className="text-[10px] text-slate-400 font-normal">{c.email} • {c.phone}</div>
                            </td>
                            <td className="p-3">
                              <div className="font-semibold text-slate-700">{c.position}</div>
                              <div className="text-[10px] text-slate-400">{c.date}</div>
                            </td>
                            
                            {/* Tombol Akses Berkas CV, KTP, SKCK & NPWP */}
                            <td className="p-3 text-center">
                              <div className="flex items-center justify-center space-x-1">
                                {c.cv?.dataUrl ? (
                                  <button 
                                    onClick={() => openFilePreview(c.cv.dataUrl)}
                                    className="px-1.5 py-0.5 bg-sky-50 text-sky-700 hover:bg-sky-100 rounded text-[9px] font-bold border border-sky-200 inline-flex items-center"
                                    title={`Buka CV: ${c.cv.name}`}
                                  >
                                    CV
                                  </button>
                                ) : (
                                  <span className="text-[9px] text-slate-300">-</span>
                                )}

                                {c.ktp?.dataUrl ? (
                                  <button 
                                    onClick={() => openFilePreview(c.ktp.dataUrl)}
                                    className="px-1.5 py-0.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded text-[9px] font-bold border border-emerald-200 inline-flex items-center"
                                    title={`Buka KTP: ${c.ktp.name}`}
                                  >
                                    KTP
                                  </button>
                                ) : (
                                  <span className="text-[9px] text-slate-300">-</span>
                                )}

                                {c.skck?.dataUrl ? (
                                  <button 
                                    onClick={() => openFilePreview(c.skck.dataUrl)}
                                    className="px-1.5 py-0.5 bg-amber-50 text-amber-700 hover:bg-amber-100 rounded text-[9px] font-bold border border-amber-200 inline-flex items-center"
                                    title={`Buka SKCK: ${c.skck.name}`}
                                  >
                                    SKCK
                                  </button>
                                ) : (
                                  <span className="text-[9px] text-slate-300">-</span>
                                )}

                                {c.npwp?.dataUrl ? (
                                  <button 
                                    onClick={() => openFilePreview(c.npwp.dataUrl)}
                                    className="px-1.5 py-0.5 bg-purple-50 text-purple-700 hover:bg-purple-100 rounded text-[9px] font-bold border border-purple-200 inline-flex items-center"
                                    title={`Buka NPWP: ${c.npwp.name}`}
                                  >
                                    NPWP
                                  </button>
                                ) : null}
                              </div>
                            </td>

                            <td className="p-3 text-center font-bold text-purple-700">{c.mbti.type}</td>
                            <td className="p-3 text-center font-bold">{c.disc.dom.split(' ')[0]}</td>
                            <td className="p-3 text-center">
                              <span className="font-mono font-bold text-sky-600">{c.iq?.score || 115}</span>
                              <div className="text-[9px] text-slate-400">{c.iq?.cat || 'Rata-rata'}</div>
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

            {/* Modal Setup */}
            {showSettingsModal && (
              <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-slate-200">
                  <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-100">
                    <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <Settings className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">Setup Cloud & WhatsApp HRD</h3>
                      <p className="text-[11px] text-slate-400">Sinkronisasi hasil tes pelamar secara realtime.</p>
                    </div>
                  </div>

                  <form onSubmit={handleSaveSettings} className="space-y-3.5 text-xs">
                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Nomor WhatsApp HRD (Gunakan kode 62) *</label>
                      <input 
                        type="text" 
                        required 
                        placeholder="Contoh: 6281234567890" 
                        value={hrWaNumber} 
                        onChange={e => setHrWaNumber(e.target.value)} 
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div className="pt-2 border-t border-slate-100">
                      <label className="block font-bold text-slate-700 mb-1">Supabase Project URL (Opsional)</label>
                      <input 
                        type="text" 
                        placeholder="https://xyzcompany.supabase.co" 
                        value={supabaseUrl} 
                        onChange={e => setSupabaseUrl(e.target.value)} 
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 mb-1">Supabase Anon Public API Key (Opsional)</label>
                      <input 
                        type="password" 
                        placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6..." 
                        value={supabaseKey} 
                        onChange={e => setSupabaseKey(e.target.value)} 
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl font-medium focus:ring-2 focus:ring-emerald-500 focus:outline-none"
                      />
                    </div>

                    <div className="flex justify-end space-x-2 pt-3">
                      <button 
                        type="button" 
                        onClick={() => setShowSettingsModal(false)} 
                        className="px-4 py-2 rounded-xl text-xs font-bold text-slate-500 hover:bg-slate-100"
                      >
                        Tutup
                      </button>
                      <button 
                        type="submit" 
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold shadow"
                      >
                        Simpan Pengaturan
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}

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
                        placeholder="Contoh: Staff Legal & KPR" 
                        value={newPosTitle} 
                        onChange={e => setNewPosTitle(e.target.value)} 
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-slate-700 mb-1">Departemen Terkait</label>
                      <input 
                        type="text" 
                        placeholder="Contoh: Human Capital" 
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
