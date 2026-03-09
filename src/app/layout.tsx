import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { LenisProvider } from '@/components/providers/LenisProvider';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'BlueFlame Gas | Premium LPG Supplier',
  description: 'Fast, reliable and safe delivery of cooking gas and accessories.',
  openGraph: {
    title: 'BlueFlame Gas',
    description: 'Fast, reliable and safe delivery of cooking gas and accessories.',
    type: 'website',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased text-white bg-black`}>
        <LenisProvider>
          <Navbar />
          <main className="min-h-screen relative flex flex-col">
            {children}
          </main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}
