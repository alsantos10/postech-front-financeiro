import { GET } from '@/api/transactions/routes';
import { ApiTransactionResponse } from '@/api/types/transactions';

export async function fetchTransactions(): Promise<ApiTransactionResponse['data']> {
    try {
        const response = await GET('/transactions');
        const result: ApiTransactionResponse = await response.json();

        if (!result.success) {
            throw new Error('Erro na resposta da API');
        }

        return result.data;
    } catch (error) {
        console.error('Erro ao buscar transações:', error);
        const { transactionResponse } = await import('@/data/transactions');
        return transactionResponse;
        // throw error;
    }
}