import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { IOSButton } from '@/components/IOSButton';
import { MapPin, Bell, Shield, CreditCard } from 'lucide-react';

export default function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState<'welcome' | 'location' | 'notifications'>('welcome');

  const handleLocationPermission = () => {
    // Mock permission request
    console.log('Location permission requested');
    setStep('notifications');
  };

  const handleNotificationPermission = () => {
    // Mock permission request
    console.log('Notification permission requested');
    navigate('/wallet');
  };

  if (step === 'welcome') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full space-y-8 text-center animate-spring">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-[28px] bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center shadow-elevated">
              <CreditCard className="w-12 h-12 text-white" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-3">
            <h1 className="text-4xl font-bold tracking-tight">CardChooser</h1>
            <p className="text-lg text-muted-foreground">
              The smart way to maximize your cashback rewards
            </p>
          </div>

          {/* Features */}
          <div className="space-y-4 pt-4">
            <div className="flex items-start gap-3 text-left">
              <Shield className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Privacy First</h3>
                <p className="text-sm text-muted-foreground">
                  No card numbers stored. Ever. We only save card metadata like brand and bank name.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left">
              <MapPin className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Location-Aware</h3>
                <p className="text-sm text-muted-foreground">
                  Get automatic card recommendations when you're at a store.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3 text-left">
              <Bell className="w-6 h-6 text-primary mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold mb-1">Smart Alerts</h3>
                <p className="text-sm text-muted-foreground">
                  Timely notifications help you never miss a cashback opportunity.
                </p>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4">
            <IOSButton
              variant="primary"
              fullWidth
              onClick={() => setStep('location')}
            >
              Get Started
            </IOSButton>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'location') {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
        <div className="max-w-md w-full space-y-8 text-center animate-spring">
          {/* Icon */}
          <div className="flex justify-center">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
              <MapPin className="w-12 h-12 text-primary" />
            </div>
          </div>

          {/* Title */}
          <div className="space-y-3">
            <h2 className="text-3xl font-bold">Enable Location</h2>
            <p className="text-base text-muted-foreground">
              CardChooser needs your location to recommend the best card when you're at a store.
            </p>
          </div>

          {/* Details */}
          <div className="glass rounded-2xl p-6 text-left space-y-3">
            <h3 className="font-semibold text-sm">How we use location:</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <span>•</span>
                <span>Match your location with nearby merchant categories</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Send timely card recommendations</span>
              </li>
              <li className="flex gap-2">
                <span>•</span>
                <span>Location data is not stored permanently</span>
              </li>
            </ul>
          </div>

          {/* CTAs */}
          <div className="space-y-3 pt-4">
            <IOSButton
              variant="primary"
              fullWidth
              onClick={handleLocationPermission}
            >
              Allow Location Access
            </IOSButton>
            <button
              onClick={() => setStep('notifications')}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              Skip for now
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full space-y-8 text-center animate-spring">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
            <Bell className="w-12 h-12 text-primary" />
          </div>
        </div>

        {/* Title */}
        <div className="space-y-3">
          <h2 className="text-3xl font-bold">Enable Notifications</h2>
          <p className="text-base text-muted-foreground">
            Get notified when you're near a store where one of your cards offers better rewards.
          </p>
        </div>

        {/* Details */}
        <div className="glass rounded-2xl p-6 text-left space-y-3">
          <h3 className="font-semibold text-sm">You'll receive alerts for:</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span>•</span>
              <span>Best card recommendations at nearby merchants</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Bonus category reminders</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>New cashback opportunities</span>
            </li>
          </ul>
        </div>

        {/* CTAs */}
        <div className="space-y-3 pt-4">
          <IOSButton
            variant="primary"
            fullWidth
            onClick={handleNotificationPermission}
          >
            Enable Notifications
          </IOSButton>
          <button
            onClick={() => navigate('/wallet')}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Maybe later
          </button>
        </div>
      </div>
    </div>
  );
}
