import { AuthGuard } from "@/ui/components/dashboard/AuthGuard";
import { DashboardFooter } from "@/ui/components/dashboard/DashboardFooter";
import { DashboardHeader } from "@/ui/components/dashboard/DashboardHeader";
import { TransactionProvider } from "@/ui/context/TransactionContext";
import { formatCurrency } from "@/shared/formatting/currency";
import MainDashboard from "@/ui/components/dashboard/MainDashboard";

interface Props {
    children: React.ReactNode;
    createTransaction: React.ReactNode;
    updateTransaction: React.ReactNode;
}

export default function LayoutPanel({
    children,
    createTransaction,
    updateTransaction
}: Props) {
    const transactions = [
        {
            "id": "1",
            "userId": "4Th8p27K-Bc",
            "type": "DEPOSITO",
            "amount": 100,
            "transactionDate": "2023-11-11",
            "description": "Transaction 1"
        }
    ]
    transactions.map(t => {
        const formattedDate = new Date(t.transactionDate).toLocaleDateString("pt-BR");
        t.transactionDate = formattedDate;

        return t;
    })

    return (
        <AuthGuard>
            <TransactionProvider>
                <MainDashboard>
                    {children}
                    {createTransaction}
                    {updateTransaction}
                </MainDashboard>
            </TransactionProvider>

            <DashboardFooter />
        </AuthGuard>
    )
}