"use client";

import dynamic from "next/dynamic";
import { useAuth } from '@/ui/hooks/useAuth';
import { useCreateTransactionWithRedux } from "@/ui/hooks/useCreateTransactionWithRedux";

const BalanceCard = dynamic(() => import("@/ui/components/dashboard/BalanceCard").then(mod => ({ default: mod.BalanceCard })), {
    ssr: false,
    loading: () => <div className="h-40 rounded-2xl bg-gray-200 animate-pulse" />
});

const NewTransactionCard = dynamic(() => import("@/ui/components/dashboard/NewTransactionCard").then(mod => ({ default: mod.NewTransactionCard })), {
    ssr: false,
    loading: () => <div className="h-64 rounded-2xl bg-gray-200 animate-pulse" />
});

export default function PainelPage() {

    const { user } = useAuth();
    const { createTransaction } = useCreateTransactionWithRedux();
    
    return (
        <div className="flex flex-row sm:flex-col sm:gap-2">
            <main className="flex flex-1 flex-col sm:p-6">
                <BalanceCard userName={user?.name} />
                <NewTransactionCard onCreateTransaction={createTransaction} />
            </main>
        </div>
    );
}