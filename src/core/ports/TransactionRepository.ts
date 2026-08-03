import { OrderType } from "../entities/DataGrid";
import { Paginated } from './../entities/Paginated';
import { UserTransaction } from "../entities/UserTransactions";
import { User } from "../entities/User";

export interface ListTransactionsParams {
    page?: number;
    limit?: number;
    sort?: string;
    order?: OrderType;
    term?: string;
    user?: User | null;
    userId?: string;
}

export interface TransactionRepository {
    getTransactionById(transactionId: string): Promise<UserTransaction | null>;
    listTransactions(params: ListTransactionsParams): Promise<Paginated<UserTransaction>>;
    createTransactionForUser(userId: string, transactionData: Partial<UserTransaction>): Promise<UserTransaction>;
    updateTransactionForUser(userId: string, transactionId: string, transactionData: Partial<UserTransaction>): Promise<UserTransaction>;
    deleteTransactionForUser(userId: string, transactionId: string): Promise<void>;
}