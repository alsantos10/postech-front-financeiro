import { Footer } from "@/components/footer";
import { Header } from "@/components/header";

export default function Home() {
  return (
      <main className="flex flex-1">
        <h2>Conteudo da página</h2>
       
        <hr />
       <div className="box-content">
          <p>Uma página inicial simples que dá boas-vindas aos usuários.</p>
          <p>✓ Exibir informações sobre o saldo da conta corrente e um extrato das
          últimas transações.</p>
          <p>✓ Incluir uma seção para iniciar uma nova transação, com opções para
          selecionar o tipo de transação e inserir o valor</p>
       </div>
      </main>
  );
}
