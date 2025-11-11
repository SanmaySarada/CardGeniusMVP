import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Check, Building2 } from 'lucide-react';

interface BankConnectionFlowProps {
  onSelect: (bankId: string, bankName: string, bankLogo: string) => void;
}

const mockBanks = [
  { id: 'chase', name: 'Chase Bank', logo: '🏦' },
  { id: 'bofa', name: 'Bank of America', logo: '🏛️' },
  { id: 'wells', name: 'Wells Fargo', logo: '🏢' },
  { id: 'citi', name: 'Citibank', logo: '🏪' },
];

export function BankConnectionFlow({ onSelect }: BankConnectionFlowProps) {
  const navigate = useNavigate();
  const [selectedBank, setSelectedBank] = useState<string | null>(null);

  return (
    <div className="space-y-6 py-6">
      <div className="text-center px-6">
        <div className="w-16 h-16 rounded-full bg-primary/10 mx-auto mb-4 flex items-center justify-center">
          <Building2 className="w-8 h-8 text-primary" />
        </div>
        <h3 className="text-xl font-bold mb-2">Connect your bank</h3>
        <p className="text-sm text-muted-foreground">
          Select your bank to securely link your accounts
        </p>
      </div>

      <div className="space-y-3 px-6">
        {mockBanks.map((bank) => (
          <button
            key={bank.id}
            onClick={() => {
              onSelect(bank.id, bank.name, bank.logo);
              navigate(`/bank-signin?bank=${bank.id}`);
            }}
            className="w-full glass-light rounded-2xl p-4 flex items-center gap-4 transition-all hover:bg-secondary/50 active:scale-98"
          >
            <div className="w-12 h-12 rounded-xl bg-secondary flex items-center justify-center text-3xl">
              {bank.logo}
            </div>
            <div className="flex-1 text-left">
              <div className="font-semibold">{bank.name}</div>
              <div className="text-sm text-muted-foreground">Tap to connect</div>
            </div>
          </button>
        ))}
      </div>

      <div className="px-6 text-xs text-muted-foreground text-center">
        🔒 Your data is encrypted and secure. We use bank-level security.
      </div>
    </div>
  );
}
