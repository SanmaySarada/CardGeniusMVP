import { useNavigate } from 'react-router-dom';
import { ArrowLeft, MapPin, Bell, Shield, HelpCircle, ChevronRight } from 'lucide-react';

export default function Settings() {
  const navigate = useNavigate();

  const settingsItems = [
    {
      icon: MapPin,
      title: 'Location Services',
      description: 'Always allowed',
      action: () => console.log('Location settings'),
    },
    {
      icon: Bell,
      title: 'Notifications',
      description: 'Enabled',
      action: () => console.log('Notification settings'),
    },
    {
      icon: Shield,
      title: 'Privacy & Security',
      description: 'Manage your data',
      action: () => console.log('Privacy settings'),
    },
    {
      icon: HelpCircle,
      title: 'Help & Feedback',
      description: 'Get support',
      action: () => console.log('Help'),
    },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="px-6 pt-14 pb-6 flex items-center gap-4">
        <button
          onClick={() => navigate('/wallet')}
          className="p-2 hover:bg-secondary rounded-full transition-colors -ml-2"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-2xl font-bold">Settings</h1>
      </div>

      {/* Content */}
      <div className="px-6 space-y-6">
        {/* Privacy Notice */}
        <div className="glass rounded-2xl p-6 space-y-3">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <h3 className="font-semibold">Privacy First</h3>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            CardChooser never stores your card numbers. We only save:
          </p>
          <ul className="space-y-1 text-sm text-muted-foreground">
            <li className="flex gap-2">
              <span>•</span>
              <span>Card brand (Visa, Mastercard, etc.)</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Issuing bank name</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>Card artwork and custom name</span>
            </li>
            <li className="flex gap-2">
              <span>•</span>
              <span>A secure reference token</span>
            </li>
          </ul>
        </div>

        {/* Settings List */}
        <div className="space-y-2">
          {settingsItems.map((item, index) => (
            <button
              key={index}
              onClick={item.action}
              className="w-full glass rounded-2xl p-4 flex items-center gap-4 hover:scale-[1.02] transition-transform active:scale-95"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <div className="flex-1 text-left">
                <div className="font-semibold mb-0.5">{item.title}</div>
                <div className="text-sm text-muted-foreground">{item.description}</div>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </button>
          ))}
        </div>

        {/* App Info */}
        <div className="text-center text-sm text-muted-foreground pt-4">
          <p>CardChooser v1.0.0</p>
          <p className="mt-1">Made with privacy in mind</p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 inset-x-0 glass border-t border-border">
        <div className="flex justify-around items-center h-20 px-6">
          <button
            onClick={() => navigate('/wallet')}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="6" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
                <path d="M3 10h18" stroke="currentColor" strokeWidth="2" />
              </svg>
            </div>
            <span className="text-xs">Wallet</span>
          </button>

          <button
            onClick={() => navigate('/map')}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <MapPin className="w-6 h-6" />
            <span className="text-xs">Map</span>
          </button>

          <button
            onClick={() => navigate('/notifications')}
            className="flex flex-col items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <Bell className="w-6 h-6" />
            <span className="text-xs">Alerts</span>
          </button>
        </div>
      </div>
    </div>
  );
}
