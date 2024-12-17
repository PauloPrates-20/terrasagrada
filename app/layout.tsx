import type { Metadata } from 'next';
import { Quantico } from 'next/font/google';
import './globals.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const quantico = Quantico({
	subsets: ['latin'],
	weight: ['400', '700']
});

export const metadata: Metadata = {
	title: {
		template: 'Terra Sagrada - %s',
		default: 'Terra Sagrada'
	}
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${quantico.className} antialiased bg-fixed bg-cover text-textColor min-h-dvh w-full`}
      >
				<Navbar />
				<main className='min-h-screen mt-60 mb-40 bg-bgColor text-center p-4 shadow-[0_0_30px_50px_#0b0a13]'>
        	{children}
				</main>
				<Footer />
      </body>
    </html>
  );
}
