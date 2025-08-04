import "./globals.css";
import { Orbitron, Plus_Jakarta_Sans, DM_Sans, JetBrains_Mono } from 'next/font/google';

const orbitron = Orbitron({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-orbitron',
  display: 'swap',
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['200', '400', '600', '700'],
  variable: '--font-jakarta',
  display: 'swap',
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '600', '700'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata = {
  title: "VinnovateIT",
  description: "Innovative Technical Club at VIT Vellore",
  other: {
    'preconnect': [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ]
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${orbitron.variable} ${plusJakarta.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}
