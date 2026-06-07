import { getTransaction, Transaction } from "@/data/transactions";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditTransaction ({params}: PageProps) {

    const { id } = await params;
    const isCreateMode = id === 'create';
    
    const transaction: Transaction | undefined = isCreateMode ? new Transaction() : getTransaction(id);

    return (
        <section>
            <h2>{isCreateMode ? 'Cadastro' : 'Alteração'} de Transação</h2>
            <div>{transaction?.id} - {transaction?.description}</div>

            <div><a href="/transactions">Voltar</a></div>
        </section>
    )
}