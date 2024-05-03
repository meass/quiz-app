import { Rubik } from 'next/font/google';
import './globals.css';
import Header from './components/Header';
import { ScoreProvider } from './scores/ScoreContext';

const rubik = Rubik({ subsets: ['latin'] });
// const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <ScoreProvider>
        <body className={rubik.className}>
          <Header />
          {children}
        </body>
      </ScoreProvider>
    </html>
  );
}
