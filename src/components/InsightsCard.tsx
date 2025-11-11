import { Transaction } from '@/data/mockTransactions';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle } from 'lucide-react';

interface InsightsCardProps {
  transactions: Transaction[];
}

export function InsightsCard({ transactions }: InsightsCardProps) {
  const totalSpent = transactions
    .filter(t => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const avgTransaction = totalSpent / transactions.filter(t => t.amount < 0).length;
  
  const lastWeekSpent = 850; // Mock data for comparison
  const percentChange = ((totalSpent - lastWeekSpent) / lastWeekSpent) * 100;
  const isIncrease = percentChange > 0;

  const insights = [
    {
      icon: isIncrease ? TrendingUp : TrendingDown,
      color: isIncrease ? 'text-destructive' : 'text-primary',
      bgColor: isIncrease ? 'bg-destructive/10' : 'bg-primary/10',
      title: `Spending ${isIncrease ? 'up' : 'down'} ${Math.abs(percentChange).toFixed(0)}%`,
      description: `Compared to last week`,
    },
    {
      icon: AlertCircle,
      color: 'text-orange-500',
      bgColor: 'bg-orange-500/10',
      title: 'Highest spending: Food',
      description: 'Try cooking at home to save money',
    },
    {
      icon: CheckCircle,
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      title: 'Bills paid on time',
      description: 'All recurring payments processed',
    },
  ];

  return (
    <div className="space-y-4 px-6">
      <div className="glass-light rounded-2xl p-6 text-center">
        <div className="text-sm text-muted-foreground mb-2">This Week's Spending</div>
        <div className="text-4xl font-bold mb-1">${totalSpent.toFixed(2)}</div>
        <div className="text-sm text-muted-foreground">
          Avg transaction: ${avgTransaction.toFixed(2)}
        </div>
      </div>

      <div className="space-y-3">
        {insights.map((insight, index) => {
          const Icon = insight.icon;
          return (
            <div key={index} className="glass-light rounded-2xl p-4 flex items-start gap-4">
              <div className={`w-10 h-10 rounded-full ${insight.bgColor} flex items-center justify-center flex-shrink-0`}>
                <Icon className={`w-5 h-5 ${insight.color}`} />
              </div>
              <div className="flex-1">
                <div className="font-semibold mb-1">{insight.title}</div>
                <div className="text-sm text-muted-foreground">{insight.description}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
