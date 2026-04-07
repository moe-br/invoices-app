import { SignIn } from "@clerk/nextjs";
import TuniBillLogo from '@/app/ui/tunibill-logo';
import { outfit } from '@/app/ui/fonts';
import Image from 'next/image';

export default function SignInPage() {
  return (
    <main className={`relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-950 ${outfit.className}`}>
      {/* Premium Background Image */}
      <div className="absolute inset-0 z-0">

        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
      </div>

      <div className="relative z-10 w-full max-w-[480px] px-6">
        <div className="mb-8 flex flex-col items-center justify-center text-center">
          <div className="mb-4 scale-[1.1] filter drop-shadow-2xl">
            <TuniBillLogo />
          </div>

        </div>

        <div className="flex justify-center">
          <SignIn
            appearance={{
              elements: {
                rootBox: "shadow-2xl rounded-[2.5rem] overflow-hidden border border-white/5",
                card: "bg-slate-900/60 backdrop-blur-3xl border-none shadow-none",
                headerTitle: "text-white font-black tracking-tight",
                headerSubtitle: "text-slate-400 font-bold",
                socialButtonsBlockButton: "bg-white/5 border-white/10 text-white hover:bg-white/10",
                formButtonPrimary: "bg-tunisia-red hover:bg-rose-600 font-black tracking-widest uppercase",
                footerActionLink: "text-tunisia-red hover:text-rose-400",
                formFieldInput: "bg-white/5 border-white/10 text-white focus:border-tunisia-red",
                formFieldLabel: "text-slate-300 font-bold uppercase tracking-wider text-[10px]"
              }
            }}
            routing="path"
            path="/sign-in"
          />
        </div>

        <p className="mt-8 text-center text-[8px] text-slate-500 font-black uppercase tracking-[0.5em] opacity-40">
          &copy; {new Date().getFullYear()} TuniBill International
        </p>
      </div>
    </main>
  );
}
