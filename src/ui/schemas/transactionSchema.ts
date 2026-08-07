import { TRANSACTION_OPTIONS, TypeTransaction } from "@/core/entities/Transactions";
import { z } from "zod";

export const transactionSchema = z.object({
    description: z.string().min(2, "Descrição deve conter no mínimo 2 caracteres"),
    amount: z.number().positive("O valor deve ser positivo"),
    type: z.enum(TRANSACTION_OPTIONS),
    
});

export type TransactionFormData = z.infer<typeof transactionSchema>;