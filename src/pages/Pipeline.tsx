import AppLayout from '@/components/AppLayout';
import LeadCard from '@/components/LeadCard';
import { mockLeads } from '@/data/mockData';
import { PIPELINE_STAGES } from '@/types/crm';

const Pipeline = () => {
  return (
    <AppLayout title="Lead Pipeline" subtitle="Track leads through every stage">
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-3 min-w-max">
          {PIPELINE_STAGES.map(stage => {
            const leads = mockLeads.filter(l => l.status === stage.key);
            return (
              <div key={stage.key} className="pipeline-column bg-secondary/50 w-[290px]">
                <div className="flex items-center justify-between mb-2 px-1">
                  <div className="flex items-center gap-2">
                    <div className={`w-2.5 h-2.5 rounded-full ${stage.color}`} />
                    <h3 className="font-display font-semibold text-xs text-foreground">{stage.label}</h3>
                  </div>
                  <span className="text-[10px] font-medium bg-card px-2 py-0.5 rounded-full text-muted-foreground border border-border">
                    {leads.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {leads.map(lead => (
                    <LeadCard key={lead.id} lead={lead} />
                  ))}
                  {leads.length === 0 && (
                    <div className="text-center py-8 text-xs text-muted-foreground">No leads</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </AppLayout>
  );
};

export default Pipeline;
