import type { Metadata } from 'next';
import { Bebas_Neue, Source_Sans_3 } from 'next/font/google';
import './globals.css';

const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'], variable: '--font-bebas' });
const source = Source_Sans_3({ subsets: ['latin'], weight: ['400', '500', '600', '700'], variable: '--font-source' });

export const metadata: Metadata = {
  title: 'Hot Wash',
  description: 'RenUSA staff Hot Wash board: vote, comment, move and assign engagement tools.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${bebas.variable} ${source.variable}`}>
      <body>
        {children}
        <div className="foot-stripe" />
        <footer className="foot"><span>RenUSA · East Team · Internal</span><span>Hot Wash</span></footer>
      </body>
    </html>
  );
}
