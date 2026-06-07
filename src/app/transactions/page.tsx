import { getTransactions } from "@/data/transactions";

const transactions = getTransactions();

const currencyFormatter = new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
});

export default function Transacoes() {
    return(
        <section>
            <h2 className="flex items-center text-lg font-semibold text-blue-900">Transações</h2>
            <section>
                {transactions.length > 0 ? (
                    transactions.map((transaction) => (
                        <div key={transaction.id}>
                            <p>{transaction.description}</p>
                            <p>{currencyFormatter.format(transaction.amount)}</p>
                        </div>
                    ))
                ) : (
                    <p>Nenhuma transação encontrada.</p>
                )}
            </section>
        </section>
    )
}