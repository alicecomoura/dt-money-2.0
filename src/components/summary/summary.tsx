import { useContext } from "react";
import { TransactionsContext } from "../../contexts/transactionsContext";
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from "phosphor-react";

import { SummaryContainer, SummaryCard } from "./styles";

export function Summary() {
  const { transactions } = useContext(TransactionsContext);

  // o reduce neste caso transaforma o array de transactions em um objeto
  // com os os totais => { income: 0, outcome: 0: total: 0 }
  // dessa forma, é possível fazer a soma ou a subtração dos valores registrado

  const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === "income") {
        acc.income += transaction.price;
        acc.total += transaction.price;
      } else {
        acc.outcome += transaction.price;
        acc.total -= transaction.price;
      }

      return acc;
    },
    {
      income: 0,
      outcome: 0,
      total: 0,
    }
  );

  return (
    <SummaryContainer>
      <SummaryCard>
        <header>
          <span>Entradas</span>
          <ArrowCircleUp size={32} color="#00b37e" />
        </header>

        <strong>{summary.income}</strong>
      </SummaryCard>

      <SummaryCard>
        <header>
          <span>Saídas</span>
          <ArrowCircleDown size={32} color="#f57a68" />
        </header>

        <strong>{summary.outcome}</strong>
      </SummaryCard>

      <SummaryCard variant="green">
        <header>
          <span>Total</span>
          <CurrencyDollar size={32} color="#fff" />
        </header>

        <strong>{summary.total}</strong>
      </SummaryCard>
    </SummaryContainer>
  );
}
