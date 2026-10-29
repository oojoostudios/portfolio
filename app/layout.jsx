import './globals.css';
import Header from '@/components/Header';

export const metadata = {
  title: 'Lorraine Kim — Product Designer',
  description: 'Product designer for financial workflows and AI-assisted tools, with 15 years inside institutional finance.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
