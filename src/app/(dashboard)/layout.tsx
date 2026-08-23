import { AuthGuard } from "@/ui/components/dashboard/AuthGuard";
import { DashboardFooter } from "@/ui/components/dashboard/DashboardFooter";
import { DashboardHeader } from "@/ui/components/dashboard/DashboardHeader";
import { TransactionProvider } from "@/ui/context/TransactionContext";
import { formattedValue } from "@/shared/formatting/currency";

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
            <div className="flex min-h-screen flex-col">
                <DashboardHeader />
                <div className="flex flex-1 flex-row xl:flex-col">
                    
                    <TransactionProvider>
                        {children}
                        {createTransaction}
                        {updateTransaction}
                    </TransactionProvider>
                   
                </div>
                <DashboardFooter />
            </div>
        </AuthGuard>
    )
}