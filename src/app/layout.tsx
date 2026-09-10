import type { Metadata, Viewport } from 'next';
import { Inter, Outfit } from 'next/font/google';
import './globals.css';
import { LanguageProvider } from '@/context/LanguageContext';
import { KioskProvider } from '@/context/KioskContext';
import { PhysicianProvider } from '@/context/PhysicianContext';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ['latin'],
  variable: '--font-outfit',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'MediKiosk | AI-Powered Patient Case-Taking & OPD History Platform',
  description:
    'Smart India Hackathon SIH26047 (Ministry of Ayush) — AI-driven multilingual patient case-taking, prescription OCR digitization, and ABDM FHIR structured summaries for high-volume hospital OPDs.',
  keywords: [
    'MediKiosk',
    'SIH26047',
    'Ministry of Ayush',
    'Patient Case Taking',
    'ABDM FHIR',
    'Ayurveda Dashavidha Pariksha',
    'OPD Digitization',
    'Clinical History Kiosk',
  ],
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0d9488',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${outfit.variable} antialiased`}>
      <body className="min-h-screen font-sans bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100 transition-colors duration-200">
        <LanguageProvider>
          <KioskProvider>
            <PhysicianProvider>
              {children}
            </PhysicianProvider>
          </KioskProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
