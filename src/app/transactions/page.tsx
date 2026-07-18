import { fetchTransactions } from "../services/transactions";

const { transactions } = await fetchTransactions();

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

export default async function Transacoes() {
    return(
        <section>
            <h2 className="flex items-center text-lg font-semibold text-blue-900">Transações</h2>
            <section>
                <ul>
                {transactions.length > 0 ? (

                    transactions.map((transaction) => (
                        <li key={transaction.id} className="flex justify-between border-b py-2">
                            <span>{transaction.description} - {currencyFormatter.format(transaction.amount)}</span>
                            <a href={`/transactions/${transaction.id}`} className="text-blue-500 hover:underline">Ver Detalhes</a>
                        </li>
                    ))

                ) : (
                    <li>Nenhuma transação encontrada.</li>
                )}
                </ul>
            </section>
        </section>
    )
}