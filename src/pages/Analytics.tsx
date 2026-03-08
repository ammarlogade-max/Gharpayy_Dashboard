import AppLayout from '@/components/AppLayout';
import { mockAgents, dashboardStats, mockLeads } from '@/data/mockData';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, CartesianGrid } from 'recharts';

const weeklyData = [
  { day: 'Mon', leads: 12, visits: 4, bookings: 2 },
  { day: 'Tue', leads: 18, visits: 6, bookings: 3 },
  { day: 'Wed', leads: 15, visits: 5, bookings: 1 },
  { day: 'Thu', leads: 22, visits: 8, bookings: 4 },
  { day: 'Fri', leads: 20, visits: 7, bookings: 3 },
  { day: 'Sat', leads: 28, visits: 10, bookings: 5 },
  { day: 'Sun', leads: 10, visits: 3, bookings: 1 },
];

const Analytics = () => (
  <AppLayout title="Analytics" subtitle="Performance metrics and insights">
    {/* Weekly Trend */}
    <div className="kpi-card mb-6">
      <h3 className="font-display font-semibold text-sm text-foreground mb-4">Weekly Trend</h3>
      <ResponsiveContainer width="100%" height={280}>
        <LineChart data={weeklyData}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(220, 15%, 90%)" />
          <XAxis dataKey="day" tick={{ fontSize: 11, fill: 'hsl(220, 10%, 46%)' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: 'hsl(220, 10%, 46%)' }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }} />
          <Line type="monotone" dataKey="leads" stroke="hsl(24, 95%, 53%)" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="visits" stroke="hsl(173, 80%, 40%)" strokeWidth={2} dot={{ r: 4 }} />
          <Line type="monotone" dataKey="bookings" stroke="hsl(142, 71%, 45%)" strokeWidth={2} dot={{ r: 4 }} />
        </LineChart>
      </ResponsiveContainer>
      <div className="flex gap-6 mt-3 justify-center">
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><div className="w-3 h-0.5 bg-primary rounded" /> Leads</span>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><div className="w-3 h-0.5 rounded" style={{ background: 'hsl(173, 80%, 40%)' }} /> Visits</span>
        <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><div className="w-3 h-0.5 rounded" style={{ background: 'hsl(142, 71%, 45%)' }} /> Bookings</span>
      </div>
    </div>

    {/* Agent Comparison */}
    <div className="kpi-card">
      <h3 className="font-display font-semibold text-sm text-foreground mb-4">Agent Comparison</h3>
      <ResponsiveContainer width="100%" height={240}>
        <BarChart data={mockAgents.map(a => ({ name: a.name.split(' ')[0], leads: a.totalLeads, conversions: a.conversions, response: a.avgResponseTime }))}>
          <XAxis dataKey="name" tick={{ fontSize: 11, fill: 'hsl(220, 10%, 46%)' }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 11, fill: 'hsl(220, 10%, 46%)' }} axisLine={false} tickLine={false} />
          <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)', fontSize: '12px' }} />
          <Bar dataKey="leads" fill="hsl(24, 95%, 53%)" radius={[4, 4, 0, 0]} />
          <Bar dataKey="conversions" fill="hsl(142, 71%, 45%)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  </AppLayout>
);

export default Analytics;
