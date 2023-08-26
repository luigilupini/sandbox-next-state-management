'use client';

import './globals.css';
import type { Metadata } from 'next';
import { Karla } from 'next/font/google';
import { QueryClient, QueryClientProvider } from 'react-query';

const karla = Karla({
  subsets: ['latin-ext'],
  variable: '--font-karla',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <html lang='en'>
      <body className={`${karla.className} bg-slate-300 p-5`}>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  );
}
