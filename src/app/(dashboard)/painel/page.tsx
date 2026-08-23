"use client";

import { Transaction } from '@/core/entities/Transactions';
import { useUserTransactions } from "@/ui/hooks/useUserTransactions";
import { useAuth } from '@/ui/hooks/useAuth';
import { CardTransactionGrid } from '@/ui/components/shared/CardGrid';
import { FeatureNav } from "@/ui/components/dashboard/FeatureNav";

export default function PainelPage() {

    const {
            data, loading, error, page, limit, sort, order, term, 
            handlePageChange, handleLimitChange, handleSort, handleSearch
        } = useUserTransactions();

    const { user } = useAuth();
    const transactions = data?.items;
    
    // Regras de negócio locais de ação disparadas pelos botões injetados
    const handleEdit = (t: Transaction) => {
        alert(`Modo edição ativado para o ID: ${t.description}`)
    }
    
    const handleDelete = (id: string) => {
        alert(`Comando de exclusão enviado para o ID: ${id}`)
    }

    return (
        <div className="flex flex-row sm:flex-col sm:gap-2">
            <aside className="hidden w-84 border-r border-zinc-200 bg-white md:block">
                <FeatureNav />
            </aside>

            <main className="flex flex-1 flex-col bg-zinc-50 p-6">
                <div>
                    <h1 className='text-2x1 font-bold text-zinc-900'>Painel de Controle</h1>
                    <p className='mt-2 text-zinc-600'>
                        Bem-vindo, {user?.name || 'Usuário'} ao painel de controle.
                    </p>
                </div>
            </main>

            <section className="w-84 border-l border-zinc-50 bg-white">
                <CardTransactionGrid 
                    title='Diretito'
                    subtitle='Subtitulo bonitão'
                    transactions={data?.items || []}
                    loading={loading}
                    />
            </section>
            {/* {error && <span className='text-sm text-red-500'>{error}</span>} */}
        </div>
    );
}