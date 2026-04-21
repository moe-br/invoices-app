import OnboardingForm from '@/app/ui/onboarding/onboarding-form';
import { outfit } from '@/app/ui/fonts';
import clsx from 'clsx';
import { fetchBusinessProfile } from '@/app/lib/data';
import { redirect } from 'next/navigation';
import Footer from '@/app/ui/footer';
import TuniBillLogo from '@/app/ui/tunibill-logo';

export default async function OnboardingPage(props: { searchParams: Promise<{ edit?: string }> }) {
  const searchParams = await props.searchParams;
  const isEdit = searchParams.edit === 'true';
  const profile = await fetchBusinessProfile();

  if (profile && !isEdit) {
    redirect('/dashboard');
  }

  return (
    <main className={clsx("min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 md:p-12", outfit.className)}>
      {/* Background Blobs */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[40%] h-[40%] bg-tunisia-red/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-[40%] h-[40%] bg-red-900/5 blur-[120px] rounded-full" />
      </div>

      <div className="w-full max-w-4xl space-y-12">
        <div className="flex flex-col items-center space-y-8">
          <TuniBillLogo showRed={true} />
          <div className="pt-4 text-center">
            <h1 className="text-4xl md:text-5xl font-black tracking-tight text-slate-900 uppercase mb-2">
              Configuration de votre Profil
            </h1>
            <p className="text-slate-500 text-lg">
              Terminez la configuration de votre compte pour commencer à facturer.
            </p>
          </div>
        </div>

        <OnboardingForm />

        <Footer className="border-none !py-0" />
      </div>
    </main>
  );
}
