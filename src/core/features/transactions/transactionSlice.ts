import { Transaction } from "@/core/entities/Transactions";
import { TypeTransaction } from "@/core/entities/Transactions";
import { Account } from "@/core/entities/Account";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { fetchTransactions } from "@/infra/api/JsonTransactionService";
import { IListDatagridFilters, OrderType } from "@/core/entities/DataGrid";
import { User } from "@/core/entities/User";
import { Paginated } from "@/core/entities/Paginated";
import { UserTransaction } from "@/core/entities/UserTransactions";
import { NextTransactionRepository } from "@/infra/repositories/NextTransactionRepository";

interface TransactionsState {
    items: Transaction[];
    loading: boolean;
    error: string | null;
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    account: Account | null;
}

interface FetchTransactionsParams extends IListDatagridFilters {
    user: User;
}

interface CreateTransactionParams {
    user: User;
    description: string;
    amount: number;
    type: TypeTransaction;
    page?: number;
    limit?: number;
}

export const fetchTransactionsAsync = createAsyncThunk(
    "transactions/fetchTransactions",
    async (params: FetchTransactionsParams) => {
        const result = await fetchTransactions(params);
        return result;
    }
);

export const createTransactionAsync = createAsyncThunk(
    "transactions/createTransaction",
    async (params: CreateTransactionParams, { dispatch }) => {
        const repository = new NextTransactionRepository();
        const transaction: UserTransaction = new UserTransaction(params.user);
        transaction.description = params.description;
        transaction.amount = params.amount;
        transaction.type = params.type;
        
        // Cria a transação na API
        await repository.createTransactionForUser(transaction);
        
        // Recarrega a lista de transações no Redux
        await dispatch(fetchTransactionsAsync({
            user: params.user,
            page: params.page || 1,
            limit: params.limit || 10,
            sort: "",
            order: OrderType.ASC,
            term: ""
        }));
        
        // Retorna void - não precisamos da transação pois a lista já foi recarregada
        return undefined;
    }
);

const initialState: TransactionsState = {
    items: [],
    loading: false,
    error: null,
    total: 0,
    page: 1,
    limit: 10,
    totalPages: 0,
    account: null
};

const transactionsSlice = createSlice({
    name: "transactions",
    initialState,
    reducers: {
        addTransaction: (state, action: PayloadAction<Transaction>) => {
            state.items.push(action.payload);
        },
        setPage: (state, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setLimit: (state, action: PayloadAction<number>) => {
            state.limit = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTransactionsAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTransactionsAsync.fulfilled, (state, action: PayloadAction<Paginated<Transaction>>) => {
                state.loading = false;
                state.items = action.payload.items;
                state.total = action.payload.total;
                state.page = action.payload.page;
                state.limit = action.payload.limit;
                state.totalPages = action.payload.totalPages;
                state.account = action.payload.account || null;
            })
            .addCase(fetchTransactionsAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Erro ao carregar transações";
            })
            .addCase(createTransactionAsync.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createTransactionAsync.fulfilled, (state) => {
                state.loading = false;
                // As transações são recarregadas automaticamente pelo dispatch interno
            })
            .addCase(createTransactionAsync.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Erro ao criar transação";
            });
    }
});

export const { addTransaction, setPage, setLimit, clearError } = transactionsSlice.actions;

export default transactionsSlice.reducer;