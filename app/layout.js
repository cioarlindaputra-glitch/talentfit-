import './globals.css'

export const metadata = {
  title: 'TalentMatrix AI - Pre-Employment Assessment System',
  description: 'Sistem asesmen psikometri & kognitif pelamar kerja otomatis berbasis cloud.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="id">
      <body className="bg-slate-50 text-slate-800 antialiased font-sans min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  )
}
