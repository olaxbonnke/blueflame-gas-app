import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // We use a separate local layout for Admin to avoid Lenis and global Nav interference 
  // if desired. For now, it just passes through.
  return <div className="min-h-screen bg-black">{children}</div>;
}
