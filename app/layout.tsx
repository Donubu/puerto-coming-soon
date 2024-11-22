import type { Metadata } from 'next';
import { Montserrat } from 'next/font/google';
import './globals.css';
import { MouseFollower } from '@/components/MouseFollower';
import { Providers } from '@/components/Providers';
import { GoogleAnalytics } from '@/components/GoogleAnalytics';

const montserrat = Montserrat({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Agencia Puerto | Agencia de Publicidad',
  description: 'La mejor agencia de marketing en Chile. Especialistas en publicidad integrada, estrategia de marca y marketing digital.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body className={montserrat.className}>
        <Providers>
          <div>{children}</div>
          <MouseFollower />
        </Providers>
        <GoogleAnalytics />
      </body>
    </html>
  );
}