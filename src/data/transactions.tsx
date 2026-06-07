export enum TypeTransaction {
    DEPOSIT, TRANSFER, INVESTMENT
}

export class Transaction {
    id: number;
    type: TypeTransaction;
    amount: number;
    description: string;
    transactionDate: Date;

    constructor() {
        this.id = 0;
        this.type = TypeTransaction.DEPOSIT;
        this.amount = 0;
        this.description = "";
        this.transactionDate = new Date();
    }
}

export interface Account {
    balance: Number;
}

export interface ApiTransaction {
    transactions: Transaction[],
    account: Account
}

export const transactionResponse: ApiTransaction = {
    transactions: [
        {
            id: 1,
            type: TypeTransaction.DEPOSIT,
            amount: 20.20,
            description: "Depósito na conta",
            transactionDate: new Date("2026-06-06 11:22:22")
        },
        {
            id: 2,
            type: TypeTransaction.TRANSFER,
            amount: 150.50,
            description: "Transferência para amigo",
            transactionDate: new Date("2026-06-05 09:15:00")
        },
        {
            id: 3,
            type: TypeTransaction.INVESTMENT,
            amount: 200.00,
            description: "Aplicação financeira",
            transactionDate: new Date("2026-06-04 14:32:10")
        },
        {
            id: 4,
            type: TypeTransaction.DEPOSIT,
            amount: 500.00,
            description: "Depósito salário",
            transactionDate: new Date("2026-06-03 08:00:00")
        },
        {
            id: 5,
            type: TypeTransaction.TRANSFER,
            amount: 75.00,
            description: "Pagamento de conta",
            transactionDate: new Date("2026-06-02 18:45:00")
        },
        {
            id: 6,
            type: TypeTransaction.INVESTMENT,
            amount: 120.00,
            description: "Compra de CDB",
            transactionDate: new Date("2026-06-01 12:00:00")
        }
    ],
    account: {
        balance: 1000
    }
}

export function getTransactions(): Transaction[] {
    return transactionResponse.transactions;
}

export function getTransaction(id: string): Transaction | undefined {
    return transactionResponse.transactions.find(transaction => transaction.id.toString() === id) || new Transaction();
}