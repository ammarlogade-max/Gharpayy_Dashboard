import AppLayout from '@/components/AppLayout';
import { Settings as SettingsIcon } from 'lucide-react';

const SettingsPage = () => (
  <AppLayout title="Settings" subtitle="System configuration">
    <div className="flex items-center justify-center h-[60vh]">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
          <SettingsIcon size={28} className="text-primary" />
        </div>
        <h2 className="font-display font-semibold text-lg text-foreground mb-2">Settings</h2>
        <p className="text-sm text-muted-foreground max-w-sm">
          Configure lead assignment rules, SLA thresholds, notification preferences, and team management.
        </p>
      </div>
    </div>
  </AppLayout>
);

export default SettingsPage;
