import { Transaction, categoryLabels } from '@/data/mockTransactions';
import { format, isToday, isYesterday } from 'date-fns';

interface TransactionsListProps {
  transactions: Transaction[];
}

export function TransactionsList({ transactions }: TransactionsListProps) {
  const groupedTransactions = transactions.reduce((groups, transaction) => {
    let dateLabel = format(transaction.date, 'MMM d, yyyy');
    if (isToday(transaction.date)) {
      dateLabel = 'Today';
    } else if (isYesterday(transaction.date)) {
      dateLabel = 'Yesterday';
    }
    
    if (!groups[dateLabel]) {
      groups[dateLabel] = [];
    }
    groups[dateLabel].push(transaction);
    return groups;
  }, {} as Record<string, Transaction[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedTransactions).map(([date, txns]) => (
        <div key={date} className="space-y-3">
          <h3 className="text-sm font-semibold text-muted-foreground px-6">{date}</h3>
          <div className="space-y-2 px-6">
            {txns.map((transaction) => (
              <div
                key={transaction.id}
                className="glass-light rounded-2xl p-4 flex items-center gap-4 hover:bg-secondary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-2xl flex-shrink-0">
                  {transaction.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold">{transaction.merchant}</div>
                  <div className="text-sm text-muted-foreground">
                    {categoryLabels[transaction.category]} • •••• {transaction.cardLast4}
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  <div className={`font-bold ${transaction.amount < 0 ? 'text-foreground' : 'text-primary'}`}>
                    {transaction.amount < 0 ? '-' : '+'}${Math.abs(transaction.amount).toFixed(2)}
                  </div>
                  {transaction.status === 'pending' && (
                    <div className="text-xs text-muted-foreground">Pending</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
