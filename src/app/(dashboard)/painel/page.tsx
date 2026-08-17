"use client";

import { Transaction } from '@/core/entities/Transactions';
import { useUserTransactions } from "@/ui/hooks/useUserTransactions";
import { formattedValue } from "@shared/utils";
import { useAuth } from '@/ui/hooks/useAuth';

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
        <>
            <div>
                <h1 className='text-2x1 font-bold text-zinc-900'>Painel de Controle</h1>
                <p className='mt-2 text-zinc-600'>
                    Bem-vindo, {user?.name || 'Usuário'} ao painel de controle.</p>
            </div>

            {error && <span className='text-sm text-red-500'>{error}</span>}

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
                                    <p className="text-body">{t.transactionDate.toLocaleDateString("pt-BR")}</p>
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
        </>
    );
}