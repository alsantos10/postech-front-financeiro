import { useState, useEffect } from 'react'
import { PaginationState, SortingState } from '@tanstack/react-table'

// Definição abstrata do formato de resposta que o domínio espera
export interface PaginatedResult<T> {
  data: T[]
  total: number
}

// Parâmetros padronizados de busca
export interface TableFetchParams {
  pageIndex: number
  pageSize: number
  sorting: SortingState
  searchQuery: string
}

interface UseUserTableProps<T> {
  // Injeção de dependência do Use Case ou método de busca isolado da infraestrutura
  fetchDataService: (params: TableFetchParams) => Promise<PaginatedResult<T>>
}

export function useUserTable<T>({ fetchDataService }: UseUserTableProps<T>) {
  const [pagination, setPagination] = useState<PaginationState>({ pageIndex: 0, pageSize: 2 })
  const [sorting, setSorting] = useState<SortingState>([])
  const [inputValue, setInputValue] = useState('')
  const [globalFilter, setGlobalFilter] = useState('')
  const [data, setData] = useState<T[]>([])
  const [rowCount, setRowCount] = useState(0)
  const [loading, setLoading] = useState(false)

  // Tratamento isolado do Debounce
  useEffect(() => {
    const handler = setTimeout(() => setGlobalFilter(inputValue), 400)
    return () => clearTimeout(handler)
  }, [inputValue])

  // Orquestração da busca de dados baseada nos estados unificados
  useEffect(() => {
    async function load() {
      setLoading(true)
      try {
        const result = await fetchDataService({
          pageIndex: pagination.pageIndex,
          pageSize: pagination.pageSize,
          sorting,
          searchQuery: globalFilter
        })
        setData(result.data)
        setRowCount(result.total)
      } catch (error) {
        console.error('Erro na execução do Use Case de domínio:', error)
      } finally {
        setLoading(false)
      }
    }

    if (pagination.pageIndex !== 0 && globalFilter) {
      setPagination(prev => ({ ...prev, pageIndex: 0 }))
    } else {
      load()
    }
  }, [pagination.pageIndex, pagination.pageSize, sorting, globalFilter, fetchDataService])

  return {
    data,
    rowCount,
    loading,
    pagination,
    setPagination,
    sorting,
    setSorting,
    inputValue,
    setInputValue,
  }
}