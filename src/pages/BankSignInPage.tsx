import { useSearchParams } from 'react-router-dom';
import { BankSignIn } from '@/components/BankSignIn';

const bankData: Record<string, { name: string; logo: string }> = {
  chase: { name: 'Chase Bank', logo: '🏦' },
  bofa: { name: 'Bank of America', logo: '🏛️' },
  wells: { name: 'Wells Fargo', logo: '🏢' },
  citi: { name: 'Citibank', logo: '🏪' },
};

export default function BankSignInPage() {
  const [searchParams] = useSearchParams();
  const bankId = searchParams.get('bank') || 'chase';
  const bank = bankData[bankId] || bankData.chase;

  return <BankSignIn bankId={bankId} bankName={bank.name} bankLogo={bank.logo} />;
}
