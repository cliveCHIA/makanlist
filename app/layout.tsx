import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

// app/layout.tsx
export const metadata = {
  title: 'MakanList · Find great eats across Singapore, fast.',
  description: 'Singapore food & drinks listicles, curated picks, and deals.',
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
