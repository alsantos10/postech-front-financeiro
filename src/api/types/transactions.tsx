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

export interface ApiTransactionResponse {
  success: boolean;
  data: ApiTransaction;
}