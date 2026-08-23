import { Transaction } from "@/core/entities/Transactions"
import { formattedValue } from "@/shared/formatting/currency";
import { convertDate } from '@/shared/formatting/convertDate';
import { useState } from "react";

export interface CardTransactionGridProps {
    transactions: Transaction[],
    title: string;
    subtitle: string;
    loading: boolean;
}

export function CardTransactionGrid({
    transactions, title, subtitle, loading,
}: CardTransactionGridProps) {

    return (
        <div className="p-6">
            <h3>{title || 'Title'}</h3>
            <p>{subtitle || 'Subtitle'}</p>
            <ul className="mb-6 mt-2 flex flex-col gap-4">

            { loading ? (
                    <li className="px-4 py-8 text-center text-zinc-500">
                        carregando...
                    </li>
                ) : transactions.length < 1 ? (
                    <li className="px-4 py-8 text-center text-zinc-500">
                        Nenhum registro encontrado.
                    </li>
                ) : ( transactions && transactions.map(t => (
                    <li key={t.id} className="bg-neutral-primary-soft block max-x-sm border border-default rounded-base shadow-sx hover:bg-neutral-secondary-medium p-6">
                        <div className="flex flex-col gap-2">
                            <span className="flex flex-row justify-between bg-red-100">
                                <h4 className="text-md">{t.description}</h4>
                                <p className="text-body">{convertDate(t.transactionDate || '')}</p>
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
                ))
            )}
            </ul>
        </div>
    )
}