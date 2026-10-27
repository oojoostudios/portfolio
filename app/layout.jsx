import './globals.css';
import Sidebar from '@/components/Sidebar';
import { SpeedInsights } from '@vercel/speed-insights/next';

export const metadata = {
  title: 'Lorraine Kim — Product Designer',
  description: 'Product designer for financial workflows and AI-assisted tools, with 15 years inside institutional finance.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <a href="#main" className="skip">Skip to content</a>
        <div className="shell">
          <Sidebar />
          <main id="main">{children}</main>
        </div>
        <SpeedInsights />
      </body>
    </html>
  );
}
