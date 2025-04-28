import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import ThemeProvider from '@/theme';
import { ThemeContextProvider } from '@/theme/ThemeContext';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeContextProvider>
      <ThemeProvider>
        <html lang='en'>
          <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
          >
            {children}
          </body>
        </html>
      </ThemeProvider>
    </ThemeContextProvider>
  );
}
