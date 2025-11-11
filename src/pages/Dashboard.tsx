import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Wallet as WalletIcon, LogOut } from 'lucide-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { BankConnectionFlow } from '@/components/BankConnectionFlow';
import { TransactionsList } from '@/components/TransactionsList';
import { SpendingChart } from '@/components/SpendingChart';
import { InsightsCard } from '@/components/InsightsCard';
import { mockTransactions } from '@/data/mockTransactions';
import { toast } from 'sonner';

interface BankConnection {
  bankId: string;
  bankName: string;
  bankLogo: string;
  connectedAt: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [bankConnection, setBankConnection] = useState<BankConnection | null>(null);
  const [selectedBank, setSelectedBank] = useState<{ id: string; name: string; logo: string } | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem('bank_connected');
    if (stored) {
      setBankConnection(JSON.parse(stored));
    }
  }, []);

  const handleDisconnect = () => {
    localStorage.removeItem('bank_connected');
    setBankConnection(null);
    toast.success('Bank disconnected');
  };

  if (!bankConnection) {
    return (
      <div className="h-screen bg-background flex flex-col">
        <div className="px-6 pt-14 pb-4 flex items-center gap-4 flex-shrink-0">
          <button
            onClick={() => navigate('/wallet')}
            className="p-2 hover:bg-secondary rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <h1 className="text-2xl font-bold">Financial Dashboard</h1>
        </div>

        <div className="flex-1 overflow-y-auto">
          <BankConnectionFlow onSelect={(id, name, logo) => setSelectedBank({ id, name, logo })} />
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="px-6 pt-14 pb-4 space-y-4 flex-shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/wallet')}
            className="p-2 hover:bg-secondary rounded-full transition-colors"
          >
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p className="text-sm text-muted-foreground">{bankConnection.bankName} •••• 4532</p>
          </div>
          <button
            onClick={handleDisconnect}
            className="p-2 hover:bg-destructive/10 rounded-full transition-colors group"
            title="Disconnect bank"
          >
            <LogOut className="w-5 h-5 text-muted-foreground group-hover:text-destructive" />
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex-1 overflow-hidden">
        <Tabs defaultValue="transactions" className="h-full flex flex-col">
          <TabsList className="w-full rounded-none border-b border-border bg-transparent p-0 h-auto">
            <TabsTrigger 
              value="transactions" 
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Transactions
            </TabsTrigger>
            <TabsTrigger 
              value="spending"
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Spending
            </TabsTrigger>
            <TabsTrigger 
              value="insights"
              className="flex-1 rounded-none border-b-2 border-transparent data-[state=active]:border-primary data-[state=active]:bg-transparent"
            >
              Insights
            </TabsTrigger>
          </TabsList>

          <div className="flex-1 overflow-y-auto">
            <TabsContent value="transactions" className="mt-6 m-0">
              <TransactionsList transactions={mockTransactions} />
            </TabsContent>

            <TabsContent value="spending" className="mt-6 m-0">
              <SpendingChart transactions={mockTransactions} />
            </TabsContent>

            <TabsContent value="insights" className="mt-6 m-0">
              <InsightsCard transactions={mockTransactions} />
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  );
}
