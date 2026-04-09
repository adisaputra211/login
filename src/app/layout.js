import { ThemeProvider } from '@/context/ThemeContext';
import ThemeToggle from '@/components/ThemeToggle';
import './globals.css';

export const metadata = {
  title: 'Next.js Login App',
  description: 'A beautiful login app built with Next.js',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <div className="gradient-bg"></div>
          <ThemeToggle />
          <main>
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
