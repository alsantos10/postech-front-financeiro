'use client'

import { useUserTransactions } from "@/ui/hooks/useUserTransactions";
import { CardTransactionGrid } from "../shared/CardGrid";


export function SidebarTransactions() {
  const {
    data,
    loading,
    error,
    page,
    limit,
    term,
    handlePageChange,
    handleLimitChange,
    handleSearch
  } = useUserTransactions();

  return (
    <aside className="w-full md:w-auto xl:w-[282] items-center xl:min-w-[282] p-4 bg-[#F5F5F5] border-t md:border-t-0 md:border-l border-gray-200 flex flex-col gap-4">
      

      <h2 className="text-2xl font-bold">
        Extrato
      </h2>

      {/* 1. Componente Grid de Transações solicitado */}
      <CardTransactionGrid 
        transactions={data?.items || []}
        loading={loading}
        />

      {/* 2. Barra de Busca e Filtro por Termo */}
      <div className="flex flex-col gap-1 mt-2">
        <label className="text-[11px] font-semibold text-gray-500 uppercase">Buscar Transação</label>
        <input
          type="text"
          value={term}
          onChange={(e) => handleSearch(e.target.value)}
          placeholder="Ex: Mercado, Luz..."
          className="w-full p-2 text-xs border border-gray-300 rounded bg-white focus:outline-none focus:ring-1 focus:ring-black"
          />
      </div>

      {/* Exibição de Erro Amigável na UI se necessário */}
      {error && (
        <div className="text-xs text-red-500 text-center py-2 bg-red-50 rounded">
          Erro ao atualizar transações.
        </div>
      )}

      {/* 3. Controles Inferiores: Limite e Paginação */}
      <div className="border-t border-gray-200 pt-3 mt-auto flex flex-col gap-3">
        
        {/* Seletor de quantidade de itens */}
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500 font-medium">Itens por página:</span>
          <select
            value={limit}
            onChange={(e) => handleLimitChange(Number(e.target.value))}
            className="p-1 border border-gray-300 rounded bg-white text-xs focus:outline-none"
            >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
        </div>

        {/* Botões de Ação para mudar de página */}
        <div className="flex items-center justify-between gap-2">
          <button
            onClick={() => handlePageChange(page - 1)}
            disabled={page <= 1 || loading}
            className="flex-1 py-1.5 px-2 bg-white border border-gray-300 rounded text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
            Anterior
          </button>
          
          <span className="text-xs font-semibold text-gray-600 px-1">
            Pág. {page}
          </span>
          
          <button
            onClick={() => handlePageChange(page + 1)}
            disabled={loading || (data?.items && data.items.length < limit)}
            className="flex-1 py-1.5 px-2 bg-white border border-gray-300 rounded text-xs font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors"
            >
            Próxima
          </button>
        </div>

      </div>
    </aside>
  );
}