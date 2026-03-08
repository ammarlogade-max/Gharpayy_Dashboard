import AppLayout from '@/components/AppLayout';
import { History, Search, Upload } from 'lucide-react';

const Historical = () => (
  <AppLayout title="Historical Leads" subtitle="Import and re-engage past leads">
    <div className="flex items-center justify-center h-[60vh]">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mx-auto mb-4">
          <History size={28} className="text-primary" />
        </div>
        <h2 className="font-display font-semibold text-lg text-foreground mb-2">Historical Lead Database</h2>
        <p className="text-sm text-muted-foreground max-w-sm mb-6">
          Import past lead data to segment and re-engage customers. Filter by location, budget, and last interaction.
        </p>
        <div className="flex gap-3 justify-center">
          <button className="flex items-center gap-1.5 text-sm bg-primary text-primary-foreground px-4 py-2.5 rounded-lg hover:opacity-90 transition-opacity">
            <Upload size={15} /> Import CSV
          </button>
          <button className="flex items-center gap-1.5 text-sm bg-secondary text-secondary-foreground px-4 py-2.5 rounded-lg hover:bg-muted transition-colors">
            <Search size={15} /> Search Leads
          </button>
        </div>
      </div>
    </div>
  </AppLayout>
);

export default Historical;
