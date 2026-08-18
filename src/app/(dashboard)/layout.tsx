import { AuthGuard } from "@/ui/components/dashboard/AuthGuard";
import { DashboardFooter } from "@/ui/components/dashboard/DashboardFooter";
import { DashboardHeader } from "@/ui/components/dashboard/DashboardHeader";
import { FeatureNav } from "@/ui/components/dashboard/FeatureNav";
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
                    <aside className="hidden w-84 border-r border-zinc-200 bg-white md:block">
                        <FeatureNav />
                    </aside>
                    <main className="flex flex-1 flex-col bg-zinc-50 p-6">
                        <TransactionProvider>
                            {children}
                            {createTransaction}
                            {updateTransaction}
                        </TransactionProvider>
                    </main>
                    <section className="w-84 border-l border-zinc-50 bg-white">
                        <div className="p-6">
                            <h3>Right</h3>
                            <p>dasdas dad dsadsa dasda dsadsa dsadsa dsadsa dsadas dadas dsadsa dasdsa dadas</p>
                            <ul className="mb-6 mt-6 flex flex-col">
                            { transactions && transactions.map(t => (
                                <li key={t.id} className="bg-neutral-primary-soft block max-x-sm border border-default rounded-base shadow-sx hover:bg-neutral-secondary-medium p-6">
                                    <div className="flex flex-col gap-2">
                                        <span className="flex flex-row justify-between bg-red-100">
                                            <h4 className="text-md">{t.description}</h4>
                                            <p className="text-body">{t.transactionDate}</p>
                                        </span>
                                        <span className="text-md p-3 text-center bg-red-200">{t.type}</span>
                                        <div className="flex flex-row justify-between items-center">
                                            <span className="text-2xl font-semibold tracking-tight text-heading leading-8">{formattedValue(t.amount)}</span>
                                            <a href="#" className="inline-flex items-center text-white bg-blue-600 box-border border border-transparent hover:bg-blue-700 focus:ring-blue-600-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                                                Editar
                                            </a>
                                        </div>
                                    </div>
                                </li>
                            ))}
                            </ul>
                        </div>
                    </section>
                </div>
                <DashboardFooter />
            </div>
        </AuthGuard>
    )
}