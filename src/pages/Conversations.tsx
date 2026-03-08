import AppLayout from '@/components/AppLayout';
import { MessageCircle } from 'lucide-react';

const Conversations = () => (
  <AppLayout title="Conversations" subtitle="WhatsApp & messaging hub">
    <div className="flex items-center justify-center h-[60vh]">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
          <MessageCircle size={28} className="text-primary" />
        </div>
        <h2 className="font-display font-semibold text-lg text-foreground mb-2">Conversations Coming Soon</h2>
        <p className="text-sm text-muted-foreground max-w-sm">
          WhatsApp integration will enable direct messaging with leads from within the CRM. Connect your WhatsApp Business API to get started.
        </p>
      </div>
    </div>
  </AppLayout>
);

export default Conversations;
