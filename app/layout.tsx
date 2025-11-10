import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Profiler - AI-Powered Personality Wiki',
  description: 'Generate detailed personality profiles about people using AI and web search',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
