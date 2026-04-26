import { SignIn } from "@clerk/nextjs";
import TuniBillLogo from '@/app/ui/tunibill-logo';
import { outfit } from '@/app/ui/fonts';
import Image from 'next/image';

export default function SignInPage() {
  return (
    <main className={`relative flex min-h-screen items-center justify-center overflow-hidden bg-slate-50 ${outfit.className}`}>
      {/* Premium Decorative Glows */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-[500px] h-[500px] bg-tunisia-red opacity-[0.03] blur-[120px] animate-pulse-slow"></div>
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-[500px] h-[500px] bg-tunisia-blue opacity-[0.03] blur-[120px] animate-pulse-slow"></div>
      
      <div className="relative z-10 w-full max-w-[480px] px-6">
        <div className="mb-8 flex flex-col items-center justify-center text-center">
          <div className="mb-4 scale-[1.1] filter drop-shadow-xl">
            <TuniBillLogo />
          </div>
        </div>

        <div className="flex justify-center">
          <SignIn
            appearance={{
              elements: {
                rootBox: "shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem] overflow-hidden border border-white",
                card: "bg-white/70 backdrop-blur-3xl border-none shadow-none",
                headerTitle: "text-slate-900 font-black tracking-tight",
                headerSubtitle: "text-slate-500 font-bold",
                socialButtonsBlockButton: "bg-slate-50 border-slate-200 text-slate-700 hover:bg-slate-100",
                formButtonPrimary: "bg-tunisia-red hover:bg-rose-600 font-black tracking-widest uppercase shadow-lg shadow-rose-500/20",
                footerActionLink: "text-tunisia-red hover:text-rose-400",
                formFieldInput: "bg-slate-50 border-slate-200 text-slate-900 focus:border-tunisia-red focus:ring-0",
                formFieldLabel: "text-slate-600 font-bold uppercase tracking-wider text-[10px]",
                dividerRow: "text-slate-400",
                dividerLine: "bg-slate-200"
              }
            }}
            routing="path"
            path="/sign-in"
          />
        </div>

        <p className="mt-12 text-center text-[8px] text-slate-400 font-black uppercase tracking-[0.5em] opacity-60">
          &copy; {new Date().getFullYear()} TuniBill International
        </p>
      </div>
    </main>
  );
}
