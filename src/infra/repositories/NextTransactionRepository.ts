import { Paginated } from "@/core/entities/Paginated";
import { UserTransaction } from "@/core/entities/UserTransactions";
import { TransactionError } from "@/core/errors/TransactionError";
import { ListTransactionsParams, TransactionRepository } from "@/core/ports/TransactionRepository";
import { useAuth } from '@/ui/context/AuthContext';

export class NextTransactionRepository implements TransactionRepository {
    getTransactionById(transactionId: string): Promise<UserTransaction | null> {
        throw new Error("Method not implemented.");
    }

    async listTransactions(params: ListTransactionsParams): Promise<Paginated<UserTransaction>> {
        const query = new URLSearchParams();
        
        if (params.userId) query.set("userId", String(params.userId));
        if (params.page) query.set("page", String(params.page));
        if (params.limit) query.set("limit", String(params.limit));
        if (params.sort) query.set("sort", String(params.sort));
        if (params.order) query.set("order", String(params.order));
        if (params.term) query.set("term", String(params.term));

        const response = await fetch(`/api/transactions?${query.toString()}`, {
            cache: "no-store"
        })    
        
        if (!response.ok) {
            const error = await response.json();
            throw new TransactionError(error.message || "Erro ao listar transações do usuário");
        }
        return response.json();
    }

    createTransactionForUser(userId: string, transactionData: Partial<UserTransaction>): Promise<UserTransaction> {
        throw new Error("Method not implemented.");
    }

    updateTransactionForUser(userId: string, transactionId: string, transactionData: Partial<UserTransaction>): Promise<UserTransaction> {
        throw new Error("Method not implemented.");
    }

    deleteTransactionForUser(userId: string, transactionId: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}