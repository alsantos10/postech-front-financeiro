"use client";

import { DataGridColumn } from "@/core/entities/DataGrid";
import { Transaction, TypeTransaction } from "@/core/entities/Transactions";
import { User } from "@/core/entities/User";
import { DataGrid } from "@/ui/components/shared/DataGrid";
import { useUserTransactions } from "@/ui/hooks/useUserTransactions";

export default function TransactionsPage() {
    const {
        data, loading, error, page, limit, sort, order, term, 
        handlePageChange, handleLimitChange, handleSort, handleSearch
    } = useUserTransactions();

    const columnsGrid: DataGridColumn<Transaction>[] = [
      {key: "id", header: "ID", sortable: false},
      {key: "description", header: "Descrição", sortable: true},
      {key: "amount", header: "Valor", sortable: true, 
        render: (item) => item.amount.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
      },
      {key: "type", header: "Tipo", sortable: true},
      {key: "transactionDate", header: "Data", sortable: true,
        render: (item) => new Date(item.transactionDate).toLocaleDateString("pt-BR")
      }
    ];
    
    // Regras de negócio locais de ação disparadas pelos botões injetados
    const handleEdit = (user: Transaction) => {
        alert(`Modo edição ativado para o ID: ${user.description}`)
    }
    
    const handleDelete = (id: string) => {
        alert(`Comando de exclusão enviado para o ID: ${id}`)
    }
    
    return (
      <div className='flex flex-col gap-6'>
        <div>
          <h1 className='text-2xl font-bold text-zinc-900'>
            Transações
          </h1>
          <p className='mt-1 text-zinc-600'>
            Gerencie as transações cadastradas no sistema
          </p>
        </div>
  
        {error && <span className='text-sm text-red-500'>{error}</span>}
  
        <DataGrid
          columns={columnsGrid}
          data={data?.items || []}
          pagination={{
            page: data?.page || 1,
            limit: data?.limit || limit,
            total: data?.total || 0,
            totalPages: data?.totalPages || 1,
          }}
          loading={loading}
          sort={sort}
          order={order}
          term={term}
          onPageChange={handlePageChange}
          onLimitChange={handleLimitChange}
          onSort={handleSort}
          onSearch={handleSearch}
          searchPlaceholder="Buscar por nome ou e-mail..."
          keyExtractor={(item) => item.id}
        />
      </div>
  );
}