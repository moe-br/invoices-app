import { Inter, Outfit } from 'next/font/google';

export const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const outfit = Outfit({ 
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800', '900']
});

export const lusitana = outfit; // Alias for compatibility with existing code