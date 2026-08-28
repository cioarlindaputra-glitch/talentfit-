'use client';

import React, { useState, useEffect, useRef } from 'react';
import { 
  Award, Brain, CheckCircle, Clock, Download, FileSpreadsheet, 
  LayoutDashboard, Plus, Printer, RotateCcw, ShieldCheck, Sparkles, 
  Trash2, TrendingUp, UserPlus, Users, ArrowLeft, ArrowRight, Info 
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

const QUESTIONS = [
  // DISC
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Profil Gaya Kerja (DISC)',
    moduleBadge: 'Modul 1 / 3 (DISC)',
    instruction: 'Pilih 1 opsi yang PALING menggambarkan diri Anda (Most) dan 1 yang PALING TIDAK menggambarkan (Least):',
    options: [
      { key: 'D', text: 'Tegas, cepat mengambil keputusan, berani mengambil risiko demi hasil tinggi.' },
      { key: 'I', text: 'Antusias, supel, pandai memotivasi tim dan senang berinteraksi aktif.' },
      { key: 'S', text: 'Tenang, sabar, dapat diandalkan, dan menyukai keteraturan yang konsisten.' },
      { key: 'C', text: 'Teliti, analitis, sistematis, dan mengutamakan ketepatan standar data.' }
    ]
  },
  {
    module: 'disc',
    moduleTitle: 'Modul 1: Profil Gaya Kerja (DISC)',
    moduleBadge: 'Modul 1 / 3 (DISC)',
    instruction: 'Saat menghadapi deadline ketat, kecenderungan respon alami Anda:',
    options: [
      { key: 'D', text: 'Mengambil kendali alur kerja, memangkas proses berbelit, langsung eksekusi.' },
      { key: 'I', text: 'Membangun optimisme rekan tim agar tidak stres dan memicu ide-ide segar.' },
      { key: 'S', text: 'Bekerja dengan ritme stabil dan konsisten membantu rekan tim.' },
      { key: 'C', text: 'Memverifikasi ulang seluruh data dan checklist agar nol toleransi kesalahan.' }
    ]
  },
  // MBTI
  {
    module: 'mbti',
    dim: 'EI',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 / 3 (MBTI)',
    instruction: 'Pilih pernyataan yang paling mencerminkan cara Anda mengisi ulang energi:',
    options: [
      { key: 'E', text: 'Saya merasa berenergi saat bertukar pikiran dan aktif dalam kelompok besar.' },
      { key: 'I', text: 'Saya merasa lebih produktif saat merenung dan fokus berpikir mendalam mandiri.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'SN',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 / 3 (MBTI)',
    instruction: 'Pilih kecenderungan cara Anda memproses data & fakta baru:',
    options: [
      { key: 'S', text: 'Fokus pada fakta nyata, pengalaman masa lalu, dan penerapan praktis di lapangan.' },
      { key: 'N', text: 'Fokus pada visi jangka panjang, inovasi baru, dan pola-pola konseptual masa depan.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'TF',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 / 3 (MBTI)',
    instruction: 'Pilih dasar utama Anda dalam mengambil keputusan penting:',
    options: [
      { key: 'T', text: 'Prinsip objektivitas, analisis logika sebab-akibat, dan keadilan rasional.' },
      { key: 'F', text: 'Nilai empati kemanusiaan, dampak emosional, dan keharmonisan hubungan tim.' }
    ]
  },
  {
    module: 'mbti',
    dim: 'JP',
    moduleTitle: 'Modul 2: Preferensi Kepribadian (MBTI)',
    moduleBadge: 'Modul 2 / 3 (MBTI)',
    instruction: 'Pilih bagaimana Anda mengelola rencana kerja harian:',
    options: [
      { key: 'J', text: 'Jadwal kerja tertata rapi, terstruktur, dan target yang jelas sejak awal.' },
      { key: 'P', text: 'Fleksibel, adaptif, dan siap menyesuaikan langkah saat situasi mendadak berubah.' }
    ]
  },
  // IQ
  {
    module: 'iq',
    moduleTitle: 'Modul 3: Logika & Kognitif (IQ Test)',
    moduleBadge: 'Modul 3 / 3 (IQ)',
    instruction: 'Silogisme Logika: Semua Manajer Proyek menguasai metodologi Agile. Sebagian Manajer Proyek memiliki sertifikasi PMP. Manakah kesimpulan yang PASTI BENAR?',
    correct: 'B',
    options: [
      { key: 'A', text: 'Semua pemegang sertifikasi PMP pasti otomatis menguasai Agile.' },
      { key: 'B', text: 'Sebagian orang yang menguasai metodologi Agile memiliki sertifikasi PMP.' },
      { key: 'C', text: 'Tidak ada Manajer Proyek yang tidak memiliki sertifikasi PMP.' },
      { key: 'D', text: 'Semua yang menguasai Agile adalah Manajer Proyek.' }
    ]
  },
  {
    module: 'iq',
    moduleTitle: 'Modul 3: Logika & Kognitif (IQ Test)',
    moduleBadge: 'Modul 3 / 3 (IQ)',
    instruction: 'Deret Angka: Tentukan angka berikutnya dari deret: 4, 7, 12, 19, 28, ?',
    correct: 'C',
    options: [
      { key: 'A', text: '35' },
      { key: 'B', text: '37' },
      { key: 'C', text: '39 (Pola penambahan ganjil: +3, +5, +7, +9, +11)' },
      { key: 'D', text: '41' }
    ]
  },
  {
    module: 'iq',
    moduleTitle: 'Modul 3: Logika & Kognitif (IQ Test)',
    moduleBadge: 'Modul 3 / 3 (IQ)',
    instruction: 'Analogi Verbal: DATA : KEPUTUSAN = BAHAN BAKU : ?',
    correct: 'A',
    options: [
      { key: 'A', text: 'PRODUK JADI' },
      { key: 'B', text: 'GUDANG' },
      { key: 'C', text: 'SUPPLIER' },
      { key: 'D', text: 'MESIN' }
    ]
  }
];

export default function Home() {
  const [view, setView] = useState('applicant-form'); // 'applicant-form', 'test-runner', 'report', 'hr-dashboard'
  const [db, setDb] = useState([]);
  
  // Applicant State
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
  const [timeLeft, setTimeLeft] = useState(600);
  const [activeReport, setActiveReport] = useState(null);

  // Load Seed Database
  useEffect(() => {
    const local = localStorage.getItem('tm_assessment_db');
    if (local) {
      setDb(JSON.parse(local));
    } else {
      const seed = [
        {
          id: 'APP-2026-8801',
          name: 'Aditya Pratama, S.Kom.',
          email: 'aditya.p@gmail.com',
          phone: '081234567890',
          position: 'Product Lead / Senior PM',
          dept: 'Product & Tech',
          date: '28 Ags 2026',
          disc: { d: 85, i: 50, s: 35, c: 75, dom: 'D-C' },
          mbti: { type: 'ENTJ', title: 'The Commander', desc: 'Pemimpin visioner dan pengambil keputusan tegas.' },
          iq: { score: 126, cat: 'Superior', correct: 3, total: 3 },
          match: 94,
          status: 'STRONGLY RECOMMENDED'
        },
        {
          id: 'APP-2026-8802',
          name: 'Jessica Clarissa, B.A.',
          email: 'jessica.c@gmail.com',
          phone: '081122334455',
          position: 'Business Development / Sales Lead',
          dept: 'Commercial',
          date: '28 Ags 2026',
          disc: { d: 70, i: 90, s: 60, c: 40, dom: 'I-D' },
          mbti: { type: 'ENFP', title: 'The Campaigner', desc: 'Sangat komunikatif, kreatif, dan inspiratif.' },
          iq: { score: 118, cat: 'High Average', correct: 2, total: 3 },
          match: 88,
          status: 'STRONGLY RECOMMENDED'
        }
      ];
      setDb(seed);
      localStorage.setItem('tm_assessment_db', JSON.stringify(seed));
    }
  }, []);

  // Timer Countdown
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
    setTimeLeft(600);
    setView('test-runner');
  };

  const calculateResults = () => {
    // 1. DISC Scoring
    let d = 50, i = 45, s = 40, c = 55;
    Object.keys(answers).forEach(k => {
      if (k.endsWith('_most')) {
        const val = answers[k];
        if (val === 'D') d += 18;
        if (val === 'I') i += 18;
        if (val === 'S') s += 18;
        if (val === 'C') c += 18;
      }
    });
    d = Math.min(95, d);
    i = Math.min(95, i);
    s = Math.min(95, s);
    c = Math.min(95, c);

    let dom = 'D-C';
    if (i > d && i > c) dom = 'I-D';
    if (s > d && s > c) dom = 'S-C';

    // 2. MBTI
    const e_i = answers['mbti_EI'] || 'E';
    const s_n = answers['mbti_SN'] || 'N';
    const t_f = answers['mbti_TF'] || 'T';
    const j_p = answers['mbti_JP'] || 'J';
    const mbtiType = `${e_i}${s_n}${t_f}${j_p}`;

    const mbtiDict = {
      ENTJ: { title: 'The Commander', desc: 'Pemimpin strategis dengan orientasi eksekusi target yang kuat.' },
      INTJ: { title: 'The Architect', desc: 'Pemikir logis mendalam, perancang sistem yang sistematis.' },
      ENTP: { title: 'The Visionary', desc: 'Inovatif, adaptif, dan pandai menyelesaikan masalah kompleks.' },
      ESTJ: { title: 'The Executive', desc: 'Sangat terstruktur, disiplin operasional, dan berorientasi hasil.' },
      ENFP: { title: 'The Campaigner', desc: 'Kreatif, supel, dan pandai memotivasi semangat tim.' }
    };
    const mbtiMeta = mbtiDict[mbtiType] || { title: 'Strategic Thinker', desc: 'Memiliki kombinasi karakter analitis dan adaptif.' };

    // 3. IQ Scoring
    let correct = 0;
    QUESTIONS.forEach((q, idx) => {
      if (q.module === 'iq' && answers[`iq_${idx}`] === q.correct) {
        correct++;
      }
    });
    const iqScore = 100 + (correct * 9);
    let iqCat = 'Rata-rata';
    if (iqScore >= 125) iqCat = 'Superior';
    else if (iqScore >= 115) iqCat = 'Di Atas Rata-rata';

    // 4. Match Score
    let match = 78;
    if (iqScore >= 118) match += 10;
    if (mbtiType.includes('T') && mbtiType.includes('J')) match += 6;
    match = Math.min(95, match);

    const resultObj = {
      ...currentApplicant,
      disc: { d, i, s, c, dom },
      mbti: { type: mbtiType, title: mbtiMeta.title, desc: mbtiMeta.desc },
      iq: { score: iqScore, cat: iqCat, correct, total: 3 },
      match,
      status: match >= 80 ? 'STRONGLY RECOMMENDED' : 'CONSIDER'
    };

    const newDb = [resultObj, ...db];
    setDb(newDb);
    localStorage.setItem('tm_assessment_db', JSON.stringify(newDb));

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
      {/* Top Navigation */}
      <header className="bg-slate-900 text-white sticky top-0 z-50 border-b border-slate-800 shadow-md no-print">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => setView('applicant-form')}>
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center font-black text-white text-base shadow-lg shadow-sky-500/30">
              TM
            </div>
            <div>
              <span className="font-extrabold text-base tracking-tight bg-gradient-to-r from-white via-slate-100 to-sky-400 bg-clip-text text-transparent">TalentMatrix AI</span>
              <span className="text-[10px] ml-2 px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 font-semibold border border-sky-500/30">Vercel Ready</span>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button 
              onClick={() => setView('applicant-form')} 
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition ${view === 'applicant-form' || view === 'test-runner' ? 'bg-sky-600 text-white shadow' : 'text-slate-300 hover:text-white'}`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Tes Pelamar</span>
            </button>
            <button 
              onClick={() => setView('hr-dashboard')} 
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold flex items-center space-x-1.5 transition ${view === 'hr-dashboard' ? 'bg-sky-600 text-white shadow' : 'text-slate-300 hover:text-white border border-slate-700'}`}
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Portal HRD ({db.length})</span>
            </button>
          </div>
        </div>
      </header>

      {/* MAIN CONTAINER */}
      <main className="max-w-4xl mx-auto w-full px-4 py-8 flex-1 flex flex-col justify-center">

        {/* 1. FORM DATA DIRI */}
        {view === 'applicant-form' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-10 relative">
            <div className="max-w-xl mx-auto text-center space-y-2 mb-8">
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-sky-50 text-sky-700 text-xs font-bold border border-sky-200">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Online Pre-Employment Screening</span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Formulir Pendaftaran Tes</h1>
              <p className="text-xs sm:text-sm text-slate-500">Lengkapi data diri di bawah ini untuk memulai asesmen psikometri & kognitif.</p>
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
                    placeholder="nama@email.com" 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium focus:ring-2 focus:ring-sky-500 focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 uppercase mb-1.5">No. WhatsApp *</label>
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
                    const pos = e.target.value;
                    let dept = 'General';
                    if (pos.includes('Product')) dept = 'Product & Tech';
                    if (pos.includes('Software')) dept = 'Engineering';
                    if (pos.includes('Sales')) dept = 'Commercial';
                    setForm({...form, position: pos, dept});
                  }} 
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-700 focus:ring-2 focus:ring-sky-500 focus:outline-none"
                >
                  <option value="Product Lead / Senior PM">Product Lead / Senior PM</option>
                  <option value="Senior Software Engineer">Senior Software Engineer</option>
                  <option value="Business Development / Sales Lead">Business Development / Sales Lead</option>
                  <option value="Finance & Accounting Specialist">Finance & Accounting Specialist</option>
                </select>
              </div>

              <div className="p-4 bg-sky-50 rounded-2xl border border-sky-100 text-xs text-sky-900 space-y-1">
                <div className="font-bold flex items-center space-x-1.5"><Info className="w-4 h-4 text-sky-600" /><span>Tahapan Tes:</span></div>
                <p>1. DISC (Gaya Kerja) • 2. MBTI (Kepribadian) • 3. Tes IQ (Logika & Deret)</p>
              </div>

              <button type="submit" className="w-full py-3.5 bg-gradient-to-r from-sky-600 to-indigo-600 hover:from-sky-700 hover:to-indigo-700 text-white rounded-xl text-xs font-bold shadow-lg shadow-sky-500/25 flex items-center justify-center space-x-2 transition">
                <span>Mulai Tes Sekarang</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        )}

        {/* 2. TEST RUNNER */}
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

            {/* Question Card */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5 min-h-[220px]">
              <p className="text-xs font-bold text-slate-700 mb-3">{q.instruction}</p>

              {q.module === 'disc' && (
                <div className="space-y-2">
                  {q.options.map((opt) => (
                    <div key={opt.key} className="flex items-center justify-between p-3.5 bg-white rounded-xl border border-slate-200">
                      <span className="text-xs font-medium text-slate-700 flex-1 pr-2">{opt.text}</span>
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
                        name={`mbti_${q.dim}`} 
                        checked={answers[`mbti_${q.dim}`] === opt.key} 
                        onChange={() => setAnswers({...answers, [`mbti_${q.dim}`]: opt.key})} 
                        className="mt-0.5 accent-purple-600" 
                      />
                      <span className="text-xs font-medium text-slate-700">{opt.text}</span>
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
            </div>

            {/* Actions */}
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
                {qIndex === QUESTIONS.length - 1 ? 'Selesai & Lihat Hasil' : 'Lanjut Soal Berikutnya'}
              </button>
            </div>
          </div>
        )}

        {/* 3. REPORT & PDF VIEW */}
        {view === 'report' && activeReport && (
          <div className="space-y-6">
            <div className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center no-print">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                <span className="text-xs font-extrabold text-slate-800">Laporan Asesmen Telah Terbit</span>
              </div>
              <div className="flex items-center space-x-2">
                <button onClick={downloadPdf} className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-xl text-xs font-bold flex items-center space-x-2 shadow">
                  <Download className="w-4 h-4" />
                  <span>Download PDF</span>
                </button>
                <button onClick={() => window.print()} className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center space-x-1">
                  <Printer className="w-4 h-4" />
                  <span>Cetak</span>
                </button>
              </div>
            </div>

            {/* PRINTABLE AREA */}
            <div id="printable-report" className="bg-white rounded-3xl border border-slate-200 shadow-2xl p-6 sm:p-10 space-y-6">
              <div className="bg-slate-900 text-white p-6 rounded-2xl flex justify-between items-center">
                <div>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-sky-400">HR ASSESSMENT REPORT</span>
                  <h1 className="text-xl sm:text-2xl font-black mt-0.5">HASIL ASESMEN PELAMAR</h1>
                  <p className="text-xs text-slate-400">Evaluasi Terpadu: Profil DISC, MBTI & Skor IQ Terstandar</p>
                </div>
                <div className="px-4 py-2 rounded-xl bg-emerald-500 text-white font-extrabold text-xs text-center">
                  {activeReport.status}<br />
                  <span className="text-[11px] font-medium">Fit: {activeReport.match}%</span>
                </div>
              </div>

              {/* Applicant Meta */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-slate-50 p-4 rounded-xl text-xs border border-slate-200">
                <div><span className="text-slate-400 block font-bold text-[10px]">Nama:</span><strong>{activeReport.name}</strong></div>
                <div><span className="text-slate-400 block font-bold text-[10px]">Token ID:</span><strong>{activeReport.id}</strong></div>
                <div><span className="text-slate-400 block font-bold text-[10px]">Posisi:</span><strong>{activeReport.position}</strong></div>
                <div><span className="text-slate-400 block font-bold text-[10px]">Tanggal:</span><strong>{activeReport.date}</strong></div>
              </div>

              {/* Charts & Breakdown */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-black text-slate-800">A. Profil DISC</span>
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
                      <span className="px-2 py-0.5 rounded bg-purple-100 text-purple-800 text-xs font-black">{activeReport.mbti.type}</span>
                    </div>
                    <div className="text-xs font-bold text-purple-900">{activeReport.mbti.title}</div>
                    <p className="text-[11px] text-slate-600">{activeReport.mbti.desc}</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-black text-slate-800">C. Kemampuan Kognitif (IQ)</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold">{activeReport.iq.cat}</span>
                    </div>
                    <div className="text-2xl font-black text-sky-600">{activeReport.iq.score} <span className="text-xs font-medium text-slate-500">Skala Baku SD 15</span></div>
                    <p className="text-[11px] text-slate-600">Benar {activeReport.iq.correct} dari {activeReport.iq.total} instrumen logika.</p>
                  </div>
                </div>
              </div>

              {/* Recommendation */}
              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 space-y-1">
                <span className="text-xs font-bold text-emerald-900">Kesimpulan Kesesuaian Posisi ({activeReport.match}% Fit):</span>
                <p className="text-xs text-emerald-900">Kandidat memiliki kapasitas analitis tinggi dengan kepemimpinan berbasis data. Sangat direkomendasikan untuk posisi <strong>{activeReport.position}</strong>.</p>
              </div>

              {/* Signature */}
              <div className="grid grid-cols-2 text-center text-xs text-slate-600 pt-6">
                <div>
                  <div className="h-12 flex items-end justify-center italic text-slate-400">Assessor Signature</div>
                  <div className="border-t border-slate-400 w-36 mx-auto pt-1 font-bold">Maya Safitri, S.Psi.</div>
                </div>
                <div>
                  <div className="h-12 flex items-end justify-center italic text-slate-400">HR Approval</div>
                  <div className="border-t border-slate-400 w-36 mx-auto pt-1 font-bold">Budi Santoso, MBA</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 4. HR DASHBOARD */}
        {view === 'hr-dashboard' && (
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl p-6 sm:p-8 space-y-6">
            <div className="flex justify-between items-center pb-4 border-b border-slate-100">
              <div>
                <h2 className="text-xl font-black text-slate-900">Portal Rekap Pelamar HRD</h2>
                <p className="text-xs text-slate-500">Tersimpan otomatis di cloud/local storage.</p>
              </div>
              <button onClick={() => setView('applicant-form')} className="px-4 py-2 bg-sky-600 text-white rounded-xl text-xs font-bold">
                + Tes Baru
              </button>
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
