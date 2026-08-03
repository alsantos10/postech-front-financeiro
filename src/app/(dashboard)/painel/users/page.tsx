"use client";

import { User } from "@/core/entities/User";
import { DataGridColumn } from '@/core/entities/DataGrid';
import { useUsers } from '@/ui/hooks/useUsers';
import { DataGrid } from '@/ui/components/shared/DataGrid';

const columnsGrid: DataGridColumn<User>[] = [
  {key: "id", header: "ID", sortable: false},
  {key: "name", header: "Nome", sortable: true},
  {key: "email", header: "E-mail", sortable: true},
];

// Regras de negócio locais de ação disparadas pelos botões injetados
const handleEdit = (user: User) => {
    alert(`Modo edição ativado para o ID: ${user.name}`)
}

const handleDelete = (id: string) => {
    alert(`Comando de exclusão enviado para o ID: ${id}`)
}


export default function UsersPage() {

  const {
    data, loading, error, page, limit, sort, order, term, 
    handlePageChange, handleLimitChange, handleSort, handleSearch
  } = useUsers();

  return (
    <div className='flex flex-col gap-6'>
      <div>
        <h1 className='text-2xl font-bold text-zinc-900'>
          Usuários
        </h1>
        <p className='mt-1 text-zinc-600'>
          Gerencie os usuários cadastrados no sistema
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
  )

  // const columns = [
  //   columnHelper.display({
  //     id: 'actions',
  //     header: 'Ações',
  //     cell: (props) => {
  //       const user = props.row.original // Acessa o objeto tipado inteiro da linha
  //       return (
  //         <div className="flex gap-2">
  //           <button
  //             onClick={() => handleEdit(user)}
  //             className="bg-slate-800 text-white px-2 py-1 rounded text-xs hover:bg-slate-700 transition"
  //           >
  //             Editar
  //           </button>
  //           <button
  //             onClick={() => handleDelete(user.id)}
  //             className="bg-rose-600 text-white px-2 py-1 rounded text-xs hover:bg-rose-500 transition"
  //           >
  //             Excluir
  //           </button>
  //         </div>
  //       )
  //     }
  //   })
  // ]


}