import { Transaction, categoryColors, categoryLabels } from '@/data/mockTransactions';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend } from 'recharts';

interface SpendingChartProps {
  transactions: Transaction[];
}

export function SpendingChart({ transactions }: SpendingChartProps) {
  const categoryTotals = transactions.reduce((acc, transaction) => {
    if (transaction.amount < 0) {
      const category = transaction.category;
      acc[category] = (acc[category] || 0) + Math.abs(transaction.amount);
    }
    return acc;
  }, {} as Record<string, number>);

  const data = Object.entries(categoryTotals).map(([category, value]) => ({
    name: categoryLabels[category],
    value: Math.round(value),
    color: categoryColors[category],
  }));

  const totalSpent = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="space-y-4">
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Legend 
              verticalAlign="bottom" 
              height={36}
              iconType="circle"
              formatter={(value, entry: any) => (
                <span className="text-sm">
                  {value} (${entry.payload.value})
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-3 px-6">
        {data.slice(0, 4).map((item) => (
          <div key={item.name} className="glass-light rounded-xl p-3">
            <div className="flex items-center gap-2 mb-1">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              />
              <span className="text-xs text-muted-foreground">{item.name}</span>
            </div>
            <div className="text-lg font-bold">${item.value}</div>
            <div className="text-xs text-muted-foreground">
              {Math.round((item.value / totalSpent) * 100)}% of spending
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
