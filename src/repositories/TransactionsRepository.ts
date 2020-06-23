import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  type: 'income' | 'outcome';
  value: number;
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const allTransactions = this.transactions;

    const allIncomeTransactions = allTransactions
      .filter(transaction => transaction.type === 'income')
      .reduce((previousValue, currentValue) => {
        return previousValue + currentValue.value;
      }, 0);

    const allOutcomeTransactions = allTransactions
      .filter(transaction => transaction.type === 'outcome')
      .reduce((previousValue, currentValue) => {
        return previousValue + currentValue.value;
      }, 0);

    const balance = {
      income: allIncomeTransactions,
      outcome: allOutcomeTransactions,
      total: allIncomeTransactions - allOutcomeTransactions,
    };

    return balance;
  }

  public create({ title, type, value }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, type, value });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
