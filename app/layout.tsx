import '@/app/ui/global.css';
import { inter } from '@/app/ui/fonts';
import { Metadata } from 'next';
import { cn } from "@/lib/utils";
import { ClerkProvider, SignInButton, SignUpButton, Show, UserButton } from "@clerk/nextjs";

export const metadata: Metadata = {
  title: {
    template: '%s | TuniBill',
    default: 'TuniBill | Invoicing Platform',
  },
  description: 'La plateforme de facturation tunisienne moderne et professionnelle.',
  metadataBase: new URL('https://tunibill.tn'),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", inter.variable)}>
      <body className={`${inter.className} antialiased bg-white transition-colors duration-300`}>
        <ClerkProvider>
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}