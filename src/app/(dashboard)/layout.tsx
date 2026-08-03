import { AuthGuard } from "@/ui/components/dashboard/AuthGuard";
import { DashboardFooter } from "@/ui/components/dashboard/DashboardFooter";
import { DashboardHeader } from "@/ui/components/dashboard/DashboardHeader";
import { FeatureNav } from "@/ui/components/dashboard/FeatureNav";

interface Props {
    children: React.ReactNode;
}

export default function LayoutPanel({ children }: Props) {
    return (
        <AuthGuard>
            <div className="flex min-h-screen flex-col">
                <DashboardHeader />
                <div className="flex flex-1 flex-col">
                    <aside className="hidden w-84 border-r border-zinc-200 bg-white md:block">
                        <FeatureNav />
                    </aside>
                    <main className="flex flex-1 flex-col bg-zinc-50 p-6">
                        {children}
                    </main>
                </div>
                <DashboardFooter />
            </div>
        </AuthGuard>
    )
}