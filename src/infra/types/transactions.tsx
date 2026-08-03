import { Transaction } from "@/core/entities/Transactions";

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