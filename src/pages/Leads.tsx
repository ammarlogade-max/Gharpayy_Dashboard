import { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { mockLeads } from '@/data/mockData';
import { PIPELINE_STAGES, SOURCE_LABELS, Lead } from '@/types/crm';
import { Phone, MapPin, IndianRupee, Clock, Filter, Download, Plus } from 'lucide-react';

const statusBadge = (status: string) => {
  const stage = PIPELINE_STAGES.find(s => s.key === status);
  if (!stage) return null;
  return (
    <span className={`badge-pipeline text-[10px] text-primary-foreground ${stage.color}`}>
      {stage.label}
    </span>
  );
};

const Leads = () => {
  const [filterSource, setFilterSource] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filtered = mockLeads.filter(l => {
    if (filterSource !== 'all' && l.source !== filterSource) return false;
    if (filterStatus !== 'all' && l.status !== filterStatus) return false;
    return true;
  });

  return (
    <AppLayout title="All Leads" subtitle={`${filtered.length} leads found`}>
      {/* Filters */}
      <div className="flex items-center gap-3 mb-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Filter size={14} className="text-muted-foreground" />
          <select
            value={filterSource}
            onChange={e => setFilterSource(e.target.value)}
            className="text-xs bg-card border border-border rounded-lg px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="all">All Sources</option>
            {Object.entries(SOURCE_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value)}
            className="text-xs bg-card border border-border rounded-lg px-3 py-2 text-foreground outline-none focus:ring-2 focus:ring-primary/30"
          >
            <option value="all">All Stages</option>
            {PIPELINE_STAGES.map(s => (
              <option key={s.key} value={s.key}>{s.label}</option>
            ))}
          </select>
        </div>
        <div className="ml-auto flex gap-2">
          <button className="flex items-center gap-1.5 text-xs bg-secondary text-secondary-foreground px-3 py-2 rounded-lg hover:bg-muted transition-colors">
            <Download size={13} /> Export
          </button>
          <button className="flex items-center gap-1.5 text-xs bg-primary text-primary-foreground px-3 py-2 rounded-lg hover:opacity-90 transition-opacity">
            <Plus size={13} /> Add Lead
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="kpi-card overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-secondary/50">
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Name</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Contact</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Source</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Status</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Agent</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Location</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Budget</th>
                <th className="text-left px-4 py-3 text-xs font-medium text-muted-foreground">Response</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(lead => (
                <tr key={lead.id} className="border-b border-border last:border-0 hover:bg-secondary/30 transition-colors cursor-pointer">
                  <td className="px-4 py-3">
                    <p className="font-medium text-foreground">{lead.name}</p>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{lead.phone}</td>
                  <td className="px-4 py-3">{statusBadge(lead.status) && <span className="text-xs text-muted-foreground">{SOURCE_LABELS[lead.source]}</span>}</td>
                  <td className="px-4 py-3">{statusBadge(lead.status)}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{lead.assignedAgent}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{lead.preferredLocation || '—'}</td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">{lead.budget || '—'}</td>
                  <td className="px-4 py-3">
                    {lead.firstResponseTime !== undefined ? (
                      <span className={`text-xs font-medium ${lead.firstResponseTime <= 5 ? 'text-emerald-600' : 'text-red-600'}`}>
                        {lead.firstResponseTime}m
                      </span>
                    ) : (
                      <span className="text-xs text-destructive font-medium">Pending</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppLayout>
  );
};

export default Leads;
