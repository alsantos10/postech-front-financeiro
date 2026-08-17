import { redirect } from "next/navigation";

export default async function UpdateTransactionPage() {
    redirect(`/painel/transactions`);
}