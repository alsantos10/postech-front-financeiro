import { OrderType } from "@/core/entities/DataGrid";
import { Paginated } from "@/core/entities/Paginated";
import { UserTransaction } from "@/core/entities/UserTransactions";
import { ListUserTransactionsUseCase } from "@/core/usecases/GetUserTransactionsUseCase";
import { NextTransactionRepository } from "@/infra/repositories/NextTransactionRepository";
import { useCallback, useEffect, useState } from "react";
import { useAuth } from "./useAuth";

const transactionRepository = new NextTransactionRepository();
const listUserTransactionsUseCase = new ListUserTransactionsUseCase(transactionRepository);

export function useUserTransactions(defaultLimit = 10) {
    const [data, setData] = useState<Paginated<UserTransaction> | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [limit, setLimit] = useState(defaultLimit);
    const [sort, setSort] = useState("");
    const [order, setOrder] = useState<OrderType>(OrderType.ASC);
    const [term, setTerm] = useState("");

    const { user } = useAuth();

    const fetchTransactions = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const result = await listUserTransactionsUseCase.execute({
                user,
                page,
                limit,
                sort,
                order,
                term: term || undefined
            });
            setData(result);
        } catch(error) {
            setError(error instanceof Error ? error.message : "Erro ao carregar transações do usuário");
        } finally {
            setLoading(false);
        }
    }, [page, limit, sort, order, term, user]);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);


    function handlePageChange(newPage: number) {
        setPage(newPage);
    }

    function handleLimitChange(newLimit: number) {
        setLimit(newLimit);
        setPage(1);
    }

    function handleSort(newSort: string, newOrder: OrderType) {
        setSort(newSort);
        setOrder(newOrder);
        setPage(1);
    }

    function handleSearch(newTerm: string) {
        setTerm(newTerm);
        setPage(1);
    }

    return {
        user,
        data,
        loading,
        error,
        page,
        limit,
        sort,
        order,
        term,
        handlePageChange,
        handleLimitChange,
        handleSort,
        handleSearch,
        refetch: fetchTransactions
    }
}