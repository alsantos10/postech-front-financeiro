"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/core/stores";
import { fetchTransactionsAsync } from "@/core/features/transactions/transactionSlice";
import { useAuth } from "./useAuth";
import { OrderType } from "@/core/entities/DataGrid";

/**
 * Hook que fornece o saldo e loading status do Redux
 * Carrega as transações (e saldo) ao montar se o usuário estiver autenticado
 */
export function useBalance() {
    const dispatch = useDispatch<AppDispatch>();
    const { user } = useAuth();
    const { account, loading } = useSelector((state: RootState) => state.transactions);

    useEffect(() => {
        if (user) {
            dispatch(fetchTransactionsAsync({
                user,
                page: 1,
                limit: 10,
                sort: "",
                order: OrderType.ASC,
                term: ""
            }));
        }
    }, [dispatch, user]);

    return {
        balance: account?.balance ?? 0,
        accountType: account?.type ?? "corrente",
        loading
    };
}
