import SideNav from '@/app/ui/dashboard/sidenav';
import { fetchBusinessProfile } from '@/app/lib/data';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function Layout({ children }: { children: React.ReactNode }) {
    const profile = await fetchBusinessProfile();

    if (!profile) {
        redirect('/onboarding');
    }

    return (
        <div className="flex h-screen flex-col md:flex-row md:overflow-hidden bg-slate-50  text-slate-900  transition-colors duration-500 selection:bg-tunisia-red selection:text-white">
            {/* Global Atmospheric Glows */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden no-print">
                <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-tunisia-red/5  blur-[120px] rounded-full opacity-50"></div>
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-tunisia-blue/10  blur-[120px] rounded-full opacity-30"></div>
            </div>

            <div className="relative z-10 w-full flex-none md:w-72 no-print">
                <SideNav />
            </div>
            <div className="relative z-10 grow p-6 md:overflow-y-auto md:p-12 print:p-0 print:m-0 print:overflow-visible">
                {children}
            </div>
        </div>
    );
}