import './globals.css';

import { Karla } from 'next/font/google';

import QueryProviders from '@/utils/QueryProviders';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const karla = Karla({
  subsets: ['latin-ext'],
  variable: '--font-karla',
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={`${karla.className} bg-slate-300 p-5`}>
        <QueryProviders>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryProviders>
      </body>
    </html>
  );
}
