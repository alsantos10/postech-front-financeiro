import { AuthGuard } from "@/ui/components/dashboard/AuthGuard";
import { DashboardFooter } from "@/ui/components/dashboard/DashboardFooter";
import { DashboardProviders } from "@/ui/components/dashboard/DashboardProviders";

interface Props {
    children: React.ReactNode;
    updateTransaction: React.ReactNode;
}

export default function LayoutPanel({
    children,
    updateTransaction
}: Props) {
    return (
        <AuthGuard>
            <DashboardProviders children={children} updateTransaction={updateTransaction} />
            <DashboardFooter />
        </AuthGuard>
    )
}