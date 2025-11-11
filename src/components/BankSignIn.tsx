import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { IOSButton } from './IOSButton';
import { z } from 'zod';
import { toast } from 'sonner';

interface BankSignInProps {
  bankId: string;
  bankName: string;
  bankLogo: string;
}

const loginSchema = z.object({
  username: z.string().trim().min(3, 'Username must be at least 3 characters').max(50),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

export function BankSignIn({ bankId, bankName, bankLogo }: BankSignInProps) {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = loginSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: any = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0]] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsLoading(true);

    // Mock authentication
    setTimeout(() => {
      localStorage.setItem('bank_connected', JSON.stringify({
        bankId,
        bankName,
        bankLogo,
        connectedAt: new Date().toISOString(),
      }));
      setIsLoading(false);
      toast.success(`Connected to ${bankName}`);
      navigate('/dashboard');
    }, 1500);
  };

  return (
    <div className="h-screen bg-background flex flex-col">
      <div className="px-6 pt-14 pb-4 flex items-center gap-4 flex-shrink-0">
        <button
          onClick={() => navigate('/dashboard')}
          className="p-2 hover:bg-secondary rounded-full transition-colors"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold">Sign In</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-6 py-8">
        <div className="max-w-md mx-auto space-y-6">
          {/* Bank Logo */}
          <div className="text-center">
            <div className="w-20 h-20 rounded-2xl bg-secondary mx-auto mb-4 flex items-center justify-center text-5xl">
              {bankLogo}
            </div>
            <h2 className="text-xl font-bold mb-2">{bankName}</h2>
            <p className="text-sm text-muted-foreground">
              Sign in to connect your account
            </p>
          </div>

          {/* Sign In Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Username or Email</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors"
                placeholder="Enter your username"
                maxLength={50}
              />
              {errors.username && (
                <p className="text-sm text-destructive">{errors.username}</p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-secondary border border-border focus:border-primary focus:outline-none transition-colors pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 hover:bg-background rounded-lg transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-muted-foreground" />
                  ) : (
                    <Eye className="w-5 h-5 text-muted-foreground" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            <button
              type="button"
              className="text-sm text-primary hover:underline"
            >
              Forgot password?
            </button>

            <IOSButton
              variant="primary"
              type="submit"
              disabled={isLoading}
              className="w-full"
            >
              {isLoading ? 'Signing in...' : 'Sign In'}
            </IOSButton>
          </form>

          {/* Security Note */}
          <div className="glass-light rounded-xl p-4 text-center">
            <div className="text-2xl mb-2">🔒</div>
            <p className="text-xs text-muted-foreground">
              This is a secure mock connection. Your credentials are not stored or transmitted.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
