import TuniBillLogo from '@/app/ui/tunibill-logo';
import LoginForm from '@/app/ui/login-form';
import { Suspense } from 'react';
import { outfit } from '@/app/ui/fonts';
import Image from 'next/image';

export default function LoginPage() {
  return (
    <main className={`relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 ${outfit.className}`}>
      {/* Premium Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/home/moe/.gemini/antigravity/brain/b1b152a8-f248-4163-97b3-7b735a0f951a/premium_login_background_1775561386716.png"
          alt="Login Background"
          fill
          className="object-cover opacity-40 grayscale"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-[480px] px-6">
        <div className="mb-12 flex flex-col items-center justify-center text-center">
          <div className="mb-8 scale-[1.4] filter drop-shadow-2xl">
            <TuniBillLogo />
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight uppercase">TuniBill Access</h1>
          <p className="text-slate-400 text-sm font-bold mt-2 uppercase tracking-[0.2em] opacity-80">Facturation Intelligence Artificielle</p>
        </div>
        
        <div className="glass-dark rounded-[2.5rem] p-1 shadow-2xl shadow-black/80 ring-1 ring-white/10">
          <div className="rounded-[2.4rem] bg-slate-900/40 backdrop-blur-3xl p-8 md:p-12">
            <Suspense fallback={<div className="text-white text-center py-20 font-black animate-pulse uppercase tracking-widest">Initialisation...</div>}>
              <LoginForm />
            </Suspense>
          </div>
        </div>
        
        <p className="mt-12 text-center text-[10px] text-slate-500 font-black uppercase tracking-[0.5em] opacity-50">
          &copy; {new Date().getFullYear()} TuniBill International &bull; Premium Experience
        </p>
      </div>
    </main>
  );
}