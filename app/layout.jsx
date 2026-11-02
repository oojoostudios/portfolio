import './globals.css';
import { GeistSans } from 'geist/font/sans';
import Header from '@/components/Header';
import Motion from '@/components/Motion';

const description = 'Product designer for complex financial workflows and AI-assisted tools, with fifteen years inside institutional finance.';

export const metadata = {
  metadataBase: new URL(process.env.SITE_URL || 'https://portfolio-three-iota-33.vercel.app'),
  title: 'Lorraine Kim — Product Designer',
  description,
  openGraph: {
    title: 'Lorraine Kim — Product Designer',
    description,
    url: '/',
    siteName: 'Lorraine Kim',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'Lorraine Kim, product designer for complex financial workflows' }],
    type: 'website',
  },
  twitter: { card: 'summary_large_image', title: 'Lorraine Kim — Product Designer', description, images: ['/og.png'] },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Motion />
      </body>
    </html>
  );
}
