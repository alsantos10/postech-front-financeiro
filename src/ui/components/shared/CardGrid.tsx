import { Transaction } from "@/core/entities/Transactions"
import { formattedValue } from "@/shared/formatting/currency";
import { convertDate, getDateName } from '@/shared/formatting/convertDate';
import { capitalize } from "@/shared/formatting/capitalize";

export interface CardTransactionGridProps {
    transactions: Transaction[],
    loading: boolean;
}

export function CardTransactionGrid({
    transactions, loading,
}: CardTransactionGridProps) {

    return (
            
        <ul className="grid grid-cols-1 gap-y-4 mt-4 mb-4">
            { loading ? (
                <li className="px-4 py-8 text-center text-zinc-500">
                        Carregando...
                    </li>
                ) : transactions.length < 1 ? (
                    <li className="px-4 py-8 text-center text-zinc-500">
                        Nenhum registro encontrado.
                    </li>
                ) : ( transactions && transactions.map((item, index) => (
                    <li key={item.id} className="grid grid-cols-1 justify-items-center">
            
                        {/* Container do Item (Coluna 1 e Coluna 2) */}
                        <div className="grid grid-cols-[1fr_auto] items-center w-full">
                        
                        {/* Coluna 1: 3 linhas de informação */}
                        <div className="flex flex-col gap-1">
                            <span className="font-sans pb-1 font-semibold text-sm text-green-500">
                                {capitalize(getDateName(item.transactionDate))}
                            </span>
                            <span className="text-[18px]">
                                {capitalize(item.type)}
                            </span>
                            <span className="font-semibold text-[16px] mt-1">
                                {formattedValue(item.amount)}
                            </span>
                        </div>

                        {/* Coluna 2: 1 linha centralizada verticalmente */}
                        <div className="flex items-center text-[#8B8B8B] text-xs font-normal">
                            {convertDate(item.transactionDate || '')}
                        </div>
                        </div>

                        {/* Linha divisória: renderiza apenas entre os itens (não exibe após o último) */}
                        {index < transactions.length - 1 && (
                        <hr className="w-[180] h-[1] border-none bg-[#47A138]/50 mt-4" />
                        )}
                    </li>
                    // <li key={t.id} className="bg-neutral-primary-soft block max-x-sm border border-default rounded-base shadow-sx hover:bg-neutral-secondary-medium p-6">
                    //     <div className="flex flex-col gap-2">
                    //         <span className="flex flex-row justify-between bg-red-100">
                    //             <h4 className="text-md">{t.description}</h4>
                    //             <p className="text-body">{convertDate(t.transactionDate || '')}</p>
                    //         </span>
                    //         <span className="text-md p-3 text-center bg-red-200">{t.type}</span>
                    //         <div className="flex flex-row justify-between items-center">
                    //             <span className="text-2xl font-semibold tracking-tight text-heading leading-8">{formattedValue(t.amount)}</span>
                    //             <a href="#" className="inline-flex items-center text-white bg-blue-600 box-border border border-transparent hover:bg-blue-700 focus:ring-blue-600-medium shadow-xs font-medium leading-5 rounded-base text-sm px-4 py-2.5 focus:outline-none">
                    //                 Editar
                    //             </a>
                    //         </div>
                    //     </div>
                    // </li>
                ))
            )}
            </ul>
    )
}