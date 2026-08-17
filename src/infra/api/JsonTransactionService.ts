import { IListDatagridFilters, OrderType } from "@/core/entities/DataGrid";
import { User } from "@/core/entities/User";
import { Paginated } from "@/core/entities/Paginated";
import { Transaction, TypeTransaction } from "@/core/entities/Transactions";
import { TransactionError } from "@/core/errors/TransactionError";

const JSON_SERVER_URL = process.env.JSON_SERVER_URL || "http://localhost:3001";

export interface JsonTransaction {
    id: string;
    type: TypeTransaction;
    amount: number;
    description: string;
    transactionDate: Date;
    userId: string;
    user: User | null;
}

interface IListTransactionsDatagridFilters extends IListDatagridFilters {
    user: User
}

function compareValues(a: string, b: string, order?: OrderType) {
    const comparizon = a.localeCompare(b, undefined, {sensitivity: "base"});
    return order === OrderType.ASC ? comparizon : -comparizon;
} 

export async function fetchTransactions(filters: IListTransactionsDatagridFilters): Promise<Paginated<Transaction>> {
    const { page, limit, sort, order, term, user } = filters;

    const response = await fetch(`${JSON_SERVER_URL}/transactions`);
    if (!response.ok) {
        throw new TransactionError("Erro ao consultar transações do usuário");
    }

    const body = await response.json();
        const allTransactions: JsonTransaction[] = Array.isArray(body) ? body : body.value || [];
        const userTransactions: JsonTransaction[] = allTransactions
            .filter(t => t.userId === user.id)
            .map(transaction => ({ ...transaction }));
            const normalizedTerm = term?.trim().toLowerCase();
            console.log("Aqui", normalizedTerm, userTransactions);
    const filtered = normalizedTerm ?
    userTransactions.filter(
        (transaction) => 
            transaction.description?.toLowerCase().includes(normalizedTerm) || 
            transaction.type?.toString().toLowerCase().includes(normalizedTerm)
        ) : userTransactions;

    const sorted = [...filtered].sort((a, b) => {
        const valueA = String(a[sort as keyof JsonTransaction] ?? "").toLowerCase();
        const valueB = String(b[sort as keyof JsonTransaction] ?? "").toLowerCase();
        return compareValues(valueA, valueB, order)
    })
    
    // Read the total count to calculate total pages
    const total = sorted.length; 
    const startIndex = (page - 1) * limit; 
    const paginated = sorted.slice(startIndex, startIndex + limit);

    return { 
        items: paginated.map((transaction) => ({id: transaction.id, type: transaction.type, amount: transaction.amount, description: transaction.description, transactionDate: transaction.transactionDate, user: transaction.user, userId: transaction.userId})),
        total, page, limit, totalPages: Math.ceil(total/limit) || 1
    };
}

export async function findTransactionsByUserId(userId: string): Promise<JsonTransaction[] | null> {
    const response = await fetch(`${JSON_SERVER_URL}/transactions?userId=${encodeURIComponent(userId)}`);
    if (!response.ok) {
        throw new TransactionError("Erro ao consultar transações do usuário");
    }
    const transactions: JsonTransaction[] = await response.json();
    return transactions || null;
}

export async function findTransactionId(transactionId: string | null): Promise<JsonTransaction | null> {
    const response = await fetch(`${JSON_SERVER_URL}/transactions/${encodeURIComponent(transactionId || "")}`);
    if (!response.ok) {
        throw new TransactionError("Erro ao consultar transação");
    }
    const transaction: JsonTransaction = await response.json();
    return transaction || null;
}

export async function createTransaction(description: string, amount: number, type: TypeTransaction, user: User): Promise<Transaction> {
    const transactionDate = new Date();
    const response = await fetch(`${JSON_SERVER_URL}/transactions`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({description, amount, type, transactionDate, userId: user.id}),
    });

    if(!response.ok) {
        throw new TransactionError("Erro ao criar transação");
    }
    const transaction: JsonTransaction = await response.json();
    return { id: transaction.id, type: transaction.type, amount: transaction.amount, description: transaction.description, transactionDate: transaction.transactionDate, user: user };
}

export async function updateTransaction(id: string, description: string, amount: number, type: TypeTransaction, user: User): Promise<Transaction> {
    const transactionDate = new Date();
    const response = await fetch(`${JSON_SERVER_URL}/transactions/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({description, amount, type, transactionDate}),
    });

    if(!response.ok) {
        throw new TransactionError("Erro ao atualizar transação");
    }
    const transaction: JsonTransaction = await response.json();
    return { id: transaction.id, type: transaction.type, amount: transaction.amount, description: transaction.description, transactionDate: transaction.transactionDate, user: user };
}