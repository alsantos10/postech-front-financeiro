"use client";

import { useUserTransactions } from "@/ui/hooks/useUserTransactions";
import { useAuth } from '@/ui/hooks/useAuth';
import { BalanceCard } from '@/ui/components/dashboard/BalanceCard';

export default function PainelPage() {

    const { user } = useAuth();
    const { data, loading } = useUserTransactions();
    
    return (
        <div className="flex flex-row sm:flex-col sm:gap-2">
            <main className="flex flex-1 flex-col bg-zinc-50 p-6">
                <BalanceCard userName={user?.name} balance={data?.account?.balance ?? 0} loading={loading} />
            </main>
        </div>
    );
}