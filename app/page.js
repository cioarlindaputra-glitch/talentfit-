'use client';

import React, { useState, useEffect } from 'react';
import { 
  Award, Brain, CheckCircle, Clock, Download, Plus, 
  Printer, ShieldCheck, Sparkles, UserPlus, ArrowRight, Info, Briefcase,
  Lock, KeyRound, LogOut, Eye, EyeOff
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
// BANK SOAL LENGKAP & BERAKURASI TINGGI (EXPANDED PSYCHOMETRIC & COGNITIVE)
// =========================================================================
const QUESTIONS = [
  // --- MODUL 1: DISC (6 SOAL FORCED-CHOICE) ---
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Profil Gaya Kerja (DISC)',
    moduleBadge: 'Modul 1 / 3 (DISC)',
    instruction: 'Pilih 1 opsi yang PALING sesuai (Most) dan 1 opsi yang PALING TIDAK sesuai (Least) dengan karakter Anda saat bekerja:',
    options: [
      { key: 'D', text: 'Tegas, cepat mengambil keputusan, dan berani menantang risiko demi hasil tinggi.' },
      { key: 'I', text: 'Antusias, ramah, persuasif, dan senang menginspirasi serta memotivasi tim.' },
      { key: 'S', text: 'Tenang, sabar, dapat diandalkan, setia kawan, dan menyukai stabilitas.' },
      { key: 'C', text: 'Teliti, analitis, taat prosedur, dan mengutamakan akurasi standar data.' }
    ]
  },
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Profil Gaya Kerja (DISC)',
    moduleBadge: 'Modul 1 / 3 (DISC)',
    instruction: 'Saat menghadapi deadline proyek yang sangat ketat, respon alami Anda:',
    options: [
      { key: 'D', text: 'Mengambil alih komando, memangkas proses birokrasi, langsung eksekusi target.' },
      { key: 'I', text: 'Membangun semangat tim agar tidak panik dan berdiskusi mencari ide kreatif bersama.' },
      { key: 'S', text: 'Bekerja dengan ritme stabil, memastikan seluruh rekan tim tetap sinkron.' },
      { key: 'C', text: 'Memverifikasi ulang seluruh checklist dan SOP agar tidak terjadi celah kesalahan fatal.' }
    ]
  },
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Profil Gaya Kerja (DISC)',
    moduleBadge: 'Modul 1 / 3 (DISC)',
    instruction: 'Dalam situasi konflik atau perbedaan pendapat dengan rekan kerja:',
    options: [
      { key: 'D', text: 'Menyampaikan argumen secara lugas, to-the-point, dan fokus pada solusi praktis.' },
      { key: 'I', text: 'Mencairkan suasana dengan humor atau diplomasi persuasif agar suasana tetap bersahabat.' },
      { key: 'S', text: 'Mendengarkan semua pihak dengan sabar demi menjaga keharmonisan tim.' },
      { key: 'C', text: 'Menyajikan data, fakta objektif, dan landasan aturan resmi yang berlaku.' }
    ]
  },
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Profil Gaya Kerja (DISC)',
    moduleBadge: 'Modul 1 / 3 (DISC)',
    instruction: 'Lingkungan kerja yang membuat Anda paling berkembang optimal:',
    options: [
      { key: 'D', text: 'Penuh tantangan kompetitif, memiliki wewenang luas, dan hasil diukur dari KPI nyata.' },
      { key: 'I', text: 'Dinamis, fleksibel, banyak kolaborasi lintas tim, dan menghargai ide-ide kreatif.' },
      { key: 'S', text: 'Suasana kerja yang harmonis, minim intrik, serta memiliki pembagian tugas yang jelas.' },
      { key: 'C', text: 'Terstruktur rapi, menghargai keahlian teknis spesifik, dan mengutamakan kualitas tinggi.' }
    ]
  },
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Profil Gaya Kerja (DISC)',
    moduleBadge: 'Modul 1 / 3 (DISC)',
    instruction: 'Kelemahan atau hal yang paling membuat Anda kurang nyaman:',
    options: [
      { key: 'D', text: 'Ritme kerja yang lambat, keraguan berlebihan, dan birokrasi bertele-tele.' },
      { key: 'I', text: 'Bekerja sendirian dalam keheningan total dan mengerjakan rutinitas administratif monoton.' },
      { key: 'S', text: 'Perubahan rencana mendadak yang tidak diiringi penjelasan dan instruksi jelas.' },
      { key: 'C', text: 'Keputusan impulsif tanpa didasari validasi data dan standar mutu yang memadai.' }
    ]
  },
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Profil Gaya Kerja (DISC)',
    moduleBadge: 'Modul 1 / 3 (DISC)',
    instruction: 'Bagaimana rekan kerja biasanya menggambarkan gaya komunikasi Anda:',
    options: [
      { key: 'D', text: 'Tegas, percaya diri, langsung ke inti masalah, dan dominan memimpin.' },
      { key: 'I', text: 'Hangat, ekspresif, mudah mencairkan suasana, dan komunikatif.' },
      { key: 'S', text: 'Pendengar yang suportif, empatik, tenang, dan tidak memotong pembicaraan.' },
      { key: 'C', text: 'Terstruktur, logis, menyertakan detail fakta, dan formal.' }
    ]
  },

  // --- MODUL 2: MBTI (8 SOAL DIKOTOMI) ---
  {
    module: 'mbti',
    dim: 'EI',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 / 3 (MBTI)',
    instruction: 'Pilih pernyataan yang paling mencerminkan cara Anda mengisi ulang energi:',
    options: [
      { key: 'E', text: 'Saya merasa bersemangat dan segar saat bertukar ide dalam forum interaktif atau kelompok kerja.' },
      { key: 'I', text: 'Saya merasa lebih fokus dan berenergi saat merenung serta berpikir mendalam secara mandiri.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'EI',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 / 3 (MBTI)',
    instruction: 'Kecenderungan Anda saat berada di lingkungan baru:',
    options: [
      { key: 'E', text: 'Mudah memulai percakapan lebih dulu dan cepat menjalin relasi baru dengan rekan kerja.' },
      { key: 'I', text: 'Cenderung mengamati situasi terlebih dahulu sebelum membuka komunikasi lebih intens.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'SN',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 / 3 (MBTI)',
    instruction: 'Pilih bagaimana Anda memproses data dan informasi baru:',
    options: [
      { key: 'S', text: 'Lebih mengutamakan fakta konkret, bukti nyata di lapangan, dan detail praktis saat ini.' },
      { key: 'N', text: 'Lebih tertarik pada visi gambaran besar, inovasi masa depan, dan menghubungkan pola-pola abstrak.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'SN',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 / 3 (MBTI)',
    instruction: 'Saat merancang strategi baru, Anda lebih memilih:',
    options: [
      { key: 'S', text: 'Menggunakan metode yang sudah terbukti sukses dan teruji efektivitasnya di masa lalu.' },
      { key: 'N', text: 'Menciptakan terobosan baru dan bereksperimen dengan pendekatan yang belum pernah dicoba.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'TF',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 / 3 (MBTI)',
    instruction: 'Prinsip utama Anda dalam mengambil keputusan profesional yang sulit:',
    options: [
      { key: 'T', text: 'Analisis logika objektif, kalkulasi sebab-akibat, dan keadilan rasional berbasis performa.' },
      { key: 'F', text: 'Pertimbangan dampak emosional, nilai kemanusiaan, serta keharmonisan hubungan tim.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'TF',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 / 3 (MBTI)',
    instruction: 'Ketika harus memberikan evaluasi atau feedback kepada rekan kerja:',
    options: [
      { key: 'T', text: 'Menyampaikan kebenaran dan kekurangan secara langsung agar efisiensi kerja cepat tercapai.' },
      { key: 'F', text: 'Memilih kata-kata dengan hati-hati agar tidak menyinggung perasaan dan tetap memotivasi mereka.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'JP',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 / 3 (MBTI)',
    instruction: 'Bagaimana Anda mengatur rencana kerja harian Anda:',
    options: [
      { key: 'J', text: 'Memiliki jadwal terstruktur rapi, to-do list terencana, dan target yang dipatok sejak awal.' },
      { key: 'P', text: 'Fleksibel, adaptif, dan siap menyesuaikan langkah ketika ada dinamika situasi baru.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'JP',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 / 3 (MBTI)',
    instruction: 'Respon Anda terhadap aturan atau prosedur operasional baku (SOP):',
    options: [
      { key: 'J', text: 'Merasa nyaman karena ada kepastian dan panduan kerja yang jelas untuk diikuti.' },
      { key: 'P', text: 'Merasa lebih suka jika diberikan ruang kebebasan bereksplorasi sesuai gaya kerja sendiri.' }
    ]
  },

  // --- MODUL 3: IQ & KOGNITIF (6 SOAL MULTIDIMENSI) ---
  {
    module: 'iq',
    moduleTitle: 'Modul 3: Tes Logika & Kemampuan Kognitif (IQ)',
    moduleBadge: 'Modul 3 / 3 (IQ)',
    instruction: 'Penalaran Silogisme: Semua insinyur perangkat lunak menguasai logika algoritma. Beberapa insinyur perangkat lunak menguasai arsitektur cloud. Manakah kesimpulan yang PASTI BENAR?',
    correct: 'B',
    options: [
      { key: 'A', text: 'Semua yang menguasai arsitektur cloud pasti menguasai logika algoritma.' },
      { key: 'B', text: 'Sebagian yang menguasai logika algoritma menguasai arsitektur cloud.' },
      { key: 'C', text: 'Tidak ada insinyur perangkat lunak yang hanya menguasai arsitektur cloud.' },
      { key: 'D', text: 'Semua insinyur perangkat lunak wajib menguasai arsitektur cloud.' }
    ]
  },
  {
    module: 'iq',
    moduleTitle: 'Modul 3: Tes Logika & Kemampuan Kognitif (IQ)',
    moduleBadge: 'Modul 3 / 3 (IQ)',
    instruction: 'Pola Deret Angka: Tentukan angka selanjutnya pada barisan: 3, 5, 9, 17, 33, ?',
    correct: 'C',
    options: [
      { key: 'A', text: '55' },
      { key: 'B', text: '61' },
      { key: 'C', text: '65 (Pola selisih: +2, +4, +8, +16, +32 -> 33 + 32 = 65)' },
      { key: 'D', text: '67' }
    ]
  },
  {
    module: 'iq',
    moduleTitle: 'Modul 3: Tes Logika & Kemampuan Kognitif (IQ)',
    moduleBadge: 'Modul 3 / 3 (IQ)',
    instruction: 'Analogi Verbal: HIPOTESIS : EKSPERIMEN = RENCANA BISNIS : ?',
    correct: 'A',
    options: [
      { key: 'A', text: 'EKSEKUSI PASAR' },
      { key: 'B', text: 'MODAL INVESTASI' },
      { key: 'C', text: 'LABA BERSIH' },
      { key: 'D', text: 'KOMPETITOR' }
    ]
  },
  {
    module: 'iq',
    moduleTitle: 'Modul 3: Tes Logika & Kemampuan Kognitif (IQ)',
    moduleBadge: 'Modul 3 / 3 (IQ)',
    instruction: 'Deret Angka Dua Tingkat: Tentukan nilai pengganti tanda tanya: 2, 4, 12, 48, 240, ?',
    correct: 'D',
    options: [
      { key: 'A', text: '720' },
      { key: 'B', text: '960' },
      { key: 'C', text: '1200' },
      { key: 'D', text: '1440 (Pola perkalian bertingkat: x2, x3, x4, x5, x6 -> 240 x 6 = 1440)' }
    ]
  },
  {
    module: 'iq',
    moduleTitle: 'Modul 3: Tes Logika & Kemampuan Kognitif (IQ)',
    moduleBadge: 'Modul 3 / 3 (IQ)',
    instruction: 'Logika Deduksi: Jika tidak ada laporan keuangan yang boleh ditandatangani tanpa audit, dan laporan divisi X telah ditandatangani oleh direksi, maka:',
    correct: 'B',
    options: [
      { key: 'A', text: 'Laporan divisi X belum diaudit sepenuhnya.' },
      { key: 'B', text: 'Laporan divisi X telah diaudit.' },
      { key: 'C', text: 'Direksi tidak memerlukan proses audit.' },
      { key: 'D', text: 'Semua divisi wajib membuat laporan baru.' }
    ]
  },
  {
    module: 'iq',
    moduleTitle: 'Modul 3: Tes Logika & Kemampuan Kognitif (IQ)',
    moduleBadge: 'Modul 3 / 3 (IQ)',
    instruction: 'Kemampuan Numerik Cepat: Sebuah tim menyelesaikan 40% proyek dalam 6 hari. Jika kecepatan kerja konstan, berapa hari total waktu yang dibutuhkan untuk menyelesaikan seluruh proyek (100%)?',
    correct: 'C',
    options: [
      { key: 'A', text: '12 Hari' },
      { key: 'B', text: '14 Hari' },
      { key: 'C', text: '15 Hari (6 / 0.40 = 15 Hari)' },
      { key: 'D', text: '18 Hari' }
    ]
  }
];

export default function Home() {
  const [view, setView] = useState('applicant-form'); // 'applicant-form', 'test-runner', 'report', 'hr-dashboard', 'hr-login'
  const [db, setDb] = useState([]);
  
  // HR Authentication State
  const [isHrAuthenticated, setIsHrAuthenticated] = useState(false);
  const [hrPasswordInput, setHrPasswordInput] = useState('');
  const [loginError, setLoginError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [hrPinCode, setHrPinCode] = useState('admin123'); // Default Password HRD

  // Daftar Posisi Default & Custom
  const [positionsList, setPositionsList] = useState([
    { title: 'Product Lead / Senior PM', dept: 'Product & Tech' },
    { title: 'Senior Software Engineer (Fullstack)', dept: 'Engineering' },
    { title: 'Business Development & Sales Lead', dept: 'Commercial & Sales' },
    { title: 'Digital Marketing & Content Specialist', dept: 'Marketing' },
    { title: 'Finance, Tax & Accounting Officer', dept: 'Finance & Legal' },
    { title: 'Human Resources & Talent Acquisition', dept: 'People & Culture' },
    { title: 'UI/UX & Product Designer', dept: 'Product & Design' },
    { title: 'Operations & Quality Assurance Lead', dept: 'Operations' }
  ]);

  // Modal Tambah Posisi
  const [showAddPosModal, setShowAddPosModal] = useState(false);
  const [newPosTitle, setNewPosTitle] = useState('');
  const [newPosDept, setNewPosDept] = useState('');

  // Form Pelamar State
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: 'Product Lead / Senior PM',
    dept: 'Product & Tech'
  });

  const [currentApplicant, setCurrentApplicant] = useState(null);
  const [qIndex, setQIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(900); // 15 Menit
  const [activeReport, setActiveReport] = useState(null);

  // Load Saved Database & PIN
  useEffect(() => {
    const savedDb = localStorage.getItem('tm_assessment_db_v3');
    const savedPos = localStorage.getItem('tm_custom_positions');
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
          id: 'APP-2026-9901',
          name: 'Aditya Pratama, S.Kom.',
          email: 'aditya.p@perusahaan.com',
          phone: '081234567890',
          position: 'Product Lead / Senior PM',
          dept: 'Product & Tech',
          date: '28 Ags 2026',
          disc: { d: 88, i: 54, s: 38, c: 78, dom: 'D-C' },
          mbti: { type: 'ENTJ', title: 'The Commander', desc: 'Pemimpin strategis dengan dorongan eksekusi target yang kuat.' },
          iq: { score: 128, cat: 'Superior', correct: 6, total: 6 },
          match: 95,
          status: 'STRONGLY RECOMMENDED'
        },
        {
          id: 'APP-2026-9902',
          name: 'Jessica Clarissa, B.A.',
          email: 'jessica.c@perusahaan.com',
          phone: '081122334455',
          position: 'Business Development & Sales Lead',
          dept: 'Commercial & Sales',
          date: '28 Ags 2026',
          disc: { d: 72, i: 92, s: 58, c: 42, dom: 'I-D' },
          mbti: { type: 'ENFP', title: 'The Campaigner', desc: 'Sangat komunikatif, ramah, dan piawai membangun kemitraan bisnis.' },
          iq: { score: 118, cat: 'Di Atas Rata-rata', correct: 4, total: 6 },
          match: 89,
          status: 'STRONGLY RECOMMENDED'
        }
      ];
      setDb(seed);
      localStorage.setItem('tm_assessment_db_v3', JSON.stringify(seed));
    }
  }, []);

  // Timer Countdown Effect
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

  // HR Login Handler
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

  // Navigasi ke Portal HRD dengan Proteksi
  const navigateToHrPortal = () => {
    if (isHrAuthenticated) {
      setView('hr-dashboard');
    } else {
      setLoginError('');
      setHrPasswordInput('');
      setView('hr-login');
    }
  };

  // Tambah Posisi Baru ke Daftar
  const handleAddNewPosition = (e) => {
    e.preventDefault();
    if (!newPosTitle.trim()) return;
    const newPos = {
      title: newPosTitle.trim(),
      dept: newPosDept.trim() || 'General Business'
    };
    const updated = [...positionsList, newPos];
    setPositionsList(updated);
    localStorage.setItem('tm_custom_positions', JSON.stringify(updated));
    setForm({ ...form, position: newPos.title, dept: newPos.dept });
    setNewPosTitle('');
    setNewPosDept('');
    setShowAddPosModal(false);
    alert(`Posisi "${newPos.title}" berhasil ditambahkan!`);
  };

  // Mulai Tes
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
    setTimeLeft(900);
    setView('test-runner');
  };

  // Kalkulasi Skor
  const calculateResults = () => {
    // 1. DISC Scoring
    let d = 40, i = 35, s = 30, c = 45;
    Object.keys(answers).forEach(k => {
      if (k.endsWith('_most')) {
        const val = answers[k];
        if (val === 'D') d += 10;
        if (val === 'I') i += 10;
        if (val === 'S') s += 10;
        if (val === 'C') c += 10;
      }
      if (k.endsWith('_least')) {
        const val = answers[k];
        if (val === 'D') d -= 4;
        if (val === 'I') i -= 4;
        if (val === 'S') s -= 4;
        if (val === 'C') c -= 4;
      }
    });
    d = Math.min(95, Math.max(20, d));
    i = Math.min(95, Math.max(20, i));
    s = Math.min(95, Math.max(20, s));
    c = Math.min(95, Math.max(20, c));

    let dom = 'D-C';
    if (i >= d && i >= c && i >= s) dom = 'I-D';
    else if (d >= i && d >= s && d >= c) dom = 'D-C';
    else if (s >= d && s >= i && s >= c) dom = 'S-C';
    else if (c >= d && c >= i && c >= s) dom = 'C-S';

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

    const mbtiType = `${eCount >= iCount ? 'E' : 'I'}${nCount >= sCount ? 'N' : 'S'}${tCount >= fCount ? 'T' : 'F'}${jCount >= pCount ? 'J' : 'P'}`;

    const mbtiDict = {
      ENTJ: { title: 'The Commander', desc: 'Pemimpin strategis, tegas mengambil keputusan, dan berorientasi hasil jangka panjang.' },
      INTJ: { title: 'The Architect', desc: 'Pemikir logis mendalam, perancang sistem yang terstruktur, dan visioner.' },
      ENTP: { title: 'The Visionary', desc: 'Cepat melihat peluang bisnis baru, fleksibel, dan pandai memecahkan masalah rumit.' },
      INTP: { title: 'The Logician', desc: 'Sangat analitis, independen, dan berorientasi pada ketepatan teori konseptual.' },
      ESTJ: { title: 'The Executive', desc: 'Disiplin operasional tinggi, terorganisir rapi, dan eksekutor yang sangat solid.' },
      ISTJ: { title: 'The Inspector', desc: 'Teliti, bertanggung jawab, taat SOP, dan dapat diandalkan dalam tugas berulang.' },
      ENFP: { title: 'The Campaigner', desc: 'Kreatif, energik, komunikator ulung, dan cepat membangun hubungan interpersonal.' },
      INFP: { title: 'The Mediator', desc: 'Idealis, penuh empati, memegang teguh integritas, dan berorientasi solusi harmonis.' },
      ESFJ: { title: 'The Provider', desc: 'Hangat, loyal, suportif, dan pandai mengelola kebutuhan tim serta klien.' },
      ISFJ: { title: 'The Protector', desc: 'Pekerja keras yang berdedikasi, telaten, dan selalu menjaga keteraturan kerja.' }
    };
    const mbtiMeta = mbtiDict[mbtiType] || { title: 'Strategic Specialist', desc: 'Memiliki kombinasi karakter analitis, fokus, dan adaptif.' };

    // 3. IQ Scoring
    let correct = 0;
    QUESTIONS.forEach((q, idx) => {
      if (q.module === 'iq' && answers[`iq_${idx}`] === q.correct) {
        correct++;
      }
    });

    const iqScore = 90 + Math.round((correct / 6) * 40);
    let iqCat = 'Rata-rata (Average)';
    if (iqScore >= 125) iqCat = 'Superior';
    else if (iqScore >= 115) iqCat = 'Di Atas Rata-rata';
    else if (iqScore < 95) iqCat = 'Di Bawah Rata-rata';

    // 4. Match Score
    let match = 70;
    if (iqScore >= 120) match += 14;
    else if (iqScore >= 110) match += 8;

    if (mbtiType.includes('T')) match += 6;
    if (mbtiType.includes('J')) match += 5;
    match = Math.min(97, Math.max(50, match));

    const resultObj = {
      ...currentApplicant,
      disc: { d, i, s, c, dom },
      mbti: { type: mbtiType, title: mbtiMeta.title, desc: mbtiMeta.desc },
      iq: { score: iqScore, cat: iqCat, correct, total: 6 },
      match,
      status: match >= 85 ? 'STRONGLY RECOMMENDED' : (match >= 70 ? 'RECOMMENDED' : 'CONSIDER')
    };

    const newDb = [resultObj, ...db];
    setDb(newDb);
    localStorage.setItem('tm_assessment_db_v3', JSON.stringify(newDb));

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
          filename: `Laporan_Asesmen_${activeReport?.name.replace(/\s+/g, '_')}.pdf`,
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
              <span className="text-[10px] ml-2 px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-semibold border border-sky-500/30">Secure Edition</span>
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
                <span>Standardized Pre-Employment Testing</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Formulir Data Diri Pelamar</h1>
              <p className="text-xs sm:text-sm text-slate-500">Pilih posisi yang dilamar dan mulai tes evaluasi psikometri & kognitif.</p>
            </div>

            <form onSubmit={handleStartTest} className="max-w-lg mx-auto space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">Nama Lengkap *</label>
                <input 
                  type="text" 
                  required 
                  value={form.name} 
                  onChange={e => setForm({...form, name: e.target.value})} 
                  placeholder="Contoh: Aditya Pratama, S.Kom." 
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

              {/* Posisi yang Dilamar */}
              <div>
                <div className="flex justify-between items-center mb-1.5">
                  <label className="block text-xs font-bold text-slate-700 uppercase">Posisi yang Dilamar *</label>
                  <button 
                    type="button" 
                    onClick={() => setShowAddPosModal(true)} 
                    className="text-[11px] font-bold text-sky-600 hover:text-sky-700 flex items-center space-x-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>+ Tambah Posisi Baru</span>
                  </button>
                </div>
                <select 
                  value={form.position} 
                  onChange={e => {
                    const selTitle = e.target.value;
                    const matched = positionsList.find(p => p.title === selTitle);
                    setForm({
                      ...form, 
                      position: selTitle, 
                      dept: matched ? matched.dept : 'General Department'
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
                  <span>Struktur Tes Akurasi Tinggi (20 Instrumen):</span>
                </div>
                <ul className="list-disc list-inside space-y-0.5 text-slate-600">
                  <li><strong>DISC (6 Instrumen):</strong> Analisis gaya kerja & dominasi komunikasi.</li>
                  <li><strong>MBTI (8 Instrumen):</strong> Pemetaan 16 tipe preferensi kepribadian.</li>
                  <li><strong>IQ Kognitif (6 Instrumen):</strong> Penalaran logika, silogisme, & numerik.</li>
                </ul>
              </div>

              <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-sky-500/25 flex items-center justify-center space-x-2 transition">
                <span>Mulai Pengerjaan Tes Lengkap</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* MODAL POPUP: TAMBAH POSISI BARU */}
        {showAddPosModal && (
          <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-slate-200">
              <div className="flex items-center space-x-2.5 pb-3 border-b border-slate-100">
                <div className="w-8 h-8 rounded-lg bg-sky-100 text-sky-600 flex items-center justify-center">
                  <Briefcase className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 text-sm">Tambah Lowongan / Posisi Baru</h3>
              </div>

              <form onSubmit={handleAddNewPosition} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Nama Jabatan / Posisi *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="Contoh: Digital Media Strategist" 
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

        {/* 2. HR LOGIN VIEW (PASSWORD / PIN PROTECTED) */}
        {view === 'hr-login' && (
          <div className="max-w-md mx-auto w-full bg-white rounded-3xl border border-slate-200 shadow-xl p-8 space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-sky-100 text-sky-600 flex items-center justify-center mx-auto font-bold shadow-inner">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-black text-slate-900">Login Portal HRD</h2>
              <p className="text-xs text-slate-500">Area terproteksi khusus tim HR & Recruiter. Pelamar tidak diizinkan masuk.</p>
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

        {/* 3. TEST RUNNER (RESPONSIVE QUESTIONNAIRE) */}
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

            {/* Dynamic Question Box */}
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

              {/* IQ Options */}
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
                <span className="text-xs font-extrabold text-slate-800">Laporan Asesmen Komprehensif Berhasil Diterbitkan</span>
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
                  <p className="text-xs text-slate-400">Evaluasi Terpadu: Profil DISC, Preferensi MBTI & Skor IQ Deviasi Baku</p>
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
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-black text-slate-800">A. Profil Gaya Kerja (DISC)</span>
                    <span className="px-2 py-0.5 rounded bg-sky-100 text-sky-800 text-[10px] font-bold">Pola: {activeReport.disc.dom}</span>
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

                <div className="space-y-4">
                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-slate-800">B. Tipe MBTI</span>
                      <span className="px-2.5 py-0.5 rounded bg-purple-100 text-purple-800 text-xs font-black">{activeReport.mbti.type}</span>
                    </div>
                    <div className="text-xs font-bold text-purple-900">{activeReport.mbti.title}</div>
                    <p className="text-[11px] text-slate-600 leading-relaxed">{activeReport.mbti.desc}</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-slate-800">C. Kemampuan Kognitif (IQ)</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">{activeReport.iq.cat}</span>
                    </div>
                    <div className="text-2xl font-black text-sky-600">{activeReport.iq.score} <span className="text-xs font-medium text-slate-500">Skala Baku SD 15</span></div>
                    <p className="text-[11px] text-slate-600">Menjawab benar {activeReport.iq.correct} dari {activeReport.iq.total} instrumen logika & silogisme.</p>
                  </div>
                </div>
              </div>

              {/* Recommendation */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-1">
                <span className="text-xs font-bold text-emerald-900">Analisis Kecocokan Posisi ({activeReport.match}% Match Index):</span>
                <p className="text-xs text-emerald-900 leading-relaxed">
                  Kombinasi kepribadian {activeReport.mbti.type} dengan profil DISC {activeReport.disc.dom} dan skor IQ {activeReport.iq.score} ({activeReport.iq.cat}) menunjukkan kesiapan kerja yang sangat baik untuk mengisi peranan <strong>{activeReport.position}</strong> di departemen <strong>{activeReport.dept}</strong>.
                </p>
              </div>

              {/* Signature */}
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

        {/* 5. REKAP PORTAL HRD (TERLINDUNGI PASSWORD) */}
        {view === 'hr-dashboard' && isHrAuthenticated && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-wrap justify-between items-center gap-4 pb-4 border-b border-slate-100">
              <div>
                <div className="flex items-center space-x-2">
                  <h2 className="text-xl font-black text-slate-900">Portal Rekap Pelamar HRD</h2>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">Sesi Terverifikasi</span>
                </div>
                <p className="text-xs text-slate-500">Akses privat data pelamar, skor tes, dan dokumen laporan.</p>
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

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-50 text-slate-400 uppercase font-bold text-[10px]">
                  <tr>
                    <th className="p-3">Pelamar</th>
                    <th className="p-3">Posisi</th>
                    <th className="p-3 text-center">MBTI</th>
                    <th className="p-3 text-center">DISC</th>
                    <th className="p-3 text-center">IQ</th>
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
                      <td className="p-3 text-center font-bold">{c.disc.dom}</td>
                      <td className="p-3 text-center font-mono font-bold text-sky-600">{c.iq.score}</td>
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
        )}

      </main>
    </>
  );
}
