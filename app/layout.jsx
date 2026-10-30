import './globals.css';
import { GeistSans } from 'geist/font/sans';
import Header from '@/components/Header';
import Motion from '@/components/Motion';

export const metadata = {
  title: 'Lorraine Kim — Product Designer',
  description: 'Product designer for financial workflows and AI-assisted tools, with 15 years inside institutional finance.',
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
