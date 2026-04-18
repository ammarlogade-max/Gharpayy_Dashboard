"use client";

import { useEffect, useMemo, useState } from "react";
import AppLayout from "@/components/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";

type TourRow = {
  id: string;
  name: string | null;
  phone: string | null;
  property: string | null;
  area: string | null;
  date: string | null;
  time: string | null;
  status: string | null;
  source: string | null;
  tcm_name: string | null;
  show_up: boolean | null;
  outcome: string | null;
  remarks: string | null;
  score: number | null;
  intent: string | null;
  budget: number | null;
  move_in_date: string | null;
  tour_type: string | null;
  zone: string | null;
  work_college: string | null;
  work_location: string | null;
  decision_maker: string | null;
  ready_48h: boolean | null;
  exploring: boolean | null;
  comparing: boolean | null;
  needs_family: boolean | null;
  key_concern: string | null;
  slot: string | null;
  live_score: number | null;
  created_at: string | null;
};

type TourEventFallbackRow = {
  tour_id: string;
  occurred_at: string;
  metadata: {
    snapshot?: Partial<TourRow>;
    tour?: any;
  } | null;
};

const SYNC_NOTE = "TOUR_SYNC";

function getTodayIstYmd() {
  const d = new Date();
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
    .formatToParts(d)
    .reduce<Record<string, string>>((acc, p) => {
      if (p.type !== "literal") acc[p.type] = p.value;
      return acc;
    }, {});
  return `${parts.year}-${parts.month}-${parts.day}`;
}

function normalizeYmd(value: string | null | undefined): string | null {
  if (!value) return null;
  const v = String(value).trim();

  // Already YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(v)) return v;

  // DD-MM-YYYY -> YYYY-MM-DD
  const dmy = v.match(/^(\d{2})-(\d{2})-(\d{4})$/);
  if (dmy) return `${dmy[3]}-${dmy[2]}-${dmy[1]}`;

  const parsed = new Date(v);
  if (!Number.isNaN(parsed.getTime())) {
    const y = parsed.getFullYear();
    const m = String(parsed.getMonth() + 1).padStart(2, "0");
    const d = String(parsed.getDate()).padStart(2, "0");
    return `${y}-${m}-${d}`;
  }

  return null;
}

export default function ToursLivePage() {
  const [rows, setRows] = useState<TourRow[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const tourToRow = (tour: any, createdAt?: string): TourRow => ({
    id: tour?.id ?? "",
    name: tour?.leadName ?? null,
    phone: tour?.phone ?? null,
    property: tour?.propertyName ?? null,
    area: tour?.area ?? null,
    date: tour?.tourDate ?? null,
    time: tour?.tourTime ?? null,
    status: tour?.status ?? null,
    source: tour?.bookingSource ?? null,
    tcm_name: tour?.assignedToName ?? null,
    show_up: tour?.showUp ?? null,
    outcome: tour?.outcome ?? null,
    remarks: tour?.remarks ?? null,
    score: tour?.confidenceScore ?? null,
    intent: tour?.intent ?? null,
    budget: tour?.budget ?? null,
    move_in_date: tour?.qualification?.moveInDate ?? null,
    tour_type: tour?.tourType ?? null,
    zone: tour?.zoneId ?? null,
    work_college: tour?.qualification?.occupation ?? null,
    work_location: tour?.qualification?.workLocation ?? null,
    decision_maker: tour?.qualification?.decisionMaker ?? null,
    ready_48h: !!tour?.qualification?.readyIn48h,
    exploring: !!tour?.qualification?.exploring,
    comparing: !!tour?.qualification?.comparing,
    needs_family: !!tour?.qualification?.needsFamily,
    key_concern: tour?.qualification?.keyConcern ?? null,
    slot: tour?.tourTime ?? null,
    live_score: tour?.confidenceScore ?? null,
    created_at: createdAt ?? null,
  });

  const fetchFromEventsFallback = async (base: string, anon: string): Promise<TourRow[]> => {
    const fallbackRes = await fetch(
      `${base}/rest/v1/tour_events?select=tour_id,occurred_at,metadata&notes=eq.${SYNC_NOTE}&order=occurred_at.desc`,
      {
        headers: {
          apikey: anon,
          Authorization: `Bearer ${anon}`,
        },
        cache: "no-store",
      }
    );
    if (!fallbackRes.ok) {
      const detail = await fallbackRes.text();
      throw new Error(`Fallback fetch failed: ${fallbackRes.status} ${detail}`);
    }

    const events = (await fallbackRes.json()) as TourEventFallbackRow[];
    const dedup = new Map<string, TourRow>();

    for (const e of events || []) {
      const snapshot = e?.metadata?.snapshot;
      if (snapshot?.id && !dedup.has(snapshot.id)) {
        dedup.set(snapshot.id, {
          ...({
            id: "",
            name: null,
            phone: null,
            property: null,
            area: null,
            date: null,
            time: null,
            status: null,
            source: null,
            tcm_name: null,
            show_up: null,
            outcome: null,
            remarks: null,
            score: null,
            intent: null,
            budget: null,
            move_in_date: null,
            tour_type: null,
            zone: null,
            work_college: null,
            work_location: null,
            decision_maker: null,
            ready_48h: null,
            exploring: null,
            comparing: null,
            needs_family: null,
            key_concern: null,
            slot: null,
            live_score: null,
            created_at: null,
          } as TourRow),
          ...snapshot,
          created_at: snapshot.created_at ?? e.occurred_at,
        });
      }

      if (!snapshot?.id && e?.metadata?.tour) {
        const mapped = tourToRow(e.metadata.tour, e.occurred_at);
        if (mapped.id && !dedup.has(mapped.id)) dedup.set(mapped.id, mapped);
      }
    }

    return Array.from(dedup.values());
  };

  const fetchRows = async () => {
    const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    if (!base || !anon) {
      setError("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
      return;
    }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(
        `${base}/rest/v1/tours?select=*&order=created_at.desc`,
        {
          headers: {
            apikey: anon,
            Authorization: `Bearer ${anon}`,
          },
          cache: "no-store",
        }
      );
      if (!res.ok) {
        const detail = await res.text();
        let parsed: any = null;
        try {
          parsed = JSON.parse(detail);
        } catch {}

        const tableMissing =
          res.status === 404 &&
          (parsed?.code === "PGRST205" ||
            String(parsed?.message || "").includes("public.tours"));

        if (tableMissing) {
          const fallbackRows = await fetchFromEventsFallback(base, anon);
          setRows(fallbackRows);
          return;
        }

        throw new Error(`Supabase fetch failed: ${res.status} ${detail}`);
      }
      const data = (await res.json()) as TourRow[];
      setRows(data || []);
    } catch (e: any) {
      setError(e?.message || "Failed to fetch tours");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRows();
  }, []);

  const today = getTodayIstYmd();
  const todaysTours = useMemo(
    () => rows.filter((r) => normalizeYmd(r.date) === today),
    [rows, today]
  );

  const latestDateMeta = useMemo(() => {
    const dated = rows
      .map((r) => ({ row: r, ymd: normalizeYmd(r.date) }))
      .filter((x): x is { row: TourRow; ymd: string } => !!x.ymd);

    if (!dated.length) return { latestDate: null as string | null, rows: [] as TourRow[] };

    const latestDate = dated.reduce((max, cur) => (cur.ymd > max ? cur.ymd : max), dated[0].ymd);
    return {
      latestDate,
      rows: dated.filter((x) => x.ymd === latestDate).map((x) => x.row),
    };
  }, [rows]);

  const tcmToursToShow = todaysTours.length ? todaysTours : latestDateMeta.rows;

  return (
    <AppLayout
      title="Tours Live"
      subtitle="Live shared Supabase tour feed (HR + Flow Ops + TCM)"
      actions={
        <Button size="sm" variant="outline" onClick={fetchRows} disabled={loading}>
          <RefreshCw size={14} className={loading ? "animate-spin mr-1" : "mr-1"} />
          Refresh
        </Button>
      }
      showQuickAddLead={false}
    >
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-xs">
          <Badge variant="secondary">Total: {rows.length}</Badge>
          <Badge variant="secondary">Today (IST): {todaysTours.length}</Badge>
          {todaysTours.length === 0 && latestDateMeta.latestDate && (
            <Badge variant="secondary">Showing latest date: {latestDateMeta.latestDate}</Badge>
          )}
          {error && <Badge variant="destructive">Error: {error}</Badge>}
        </div>
        {!loading && !error && rows.length === 0 && (
          <p className="text-xs text-muted-foreground">
            No synced rows yet. Create or update a tour in the tour system, then click Refresh.
          </p>
        )}

        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Tours (HR)</TabsTrigger>
            <TabsTrigger value="schedule">Schedule Data (Flow Ops)</TabsTrigger>
            <TabsTrigger value="tcm">Today's Tours (TCM)</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="kpi-card p-0 overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="px-3 py-2 text-left">Time</th>
                    <th className="px-3 py-2 text-left">Lead</th>
                    <th className="px-3 py-2 text-left">Property</th>
                    <th className="px-3 py-2 text-left">Area</th>
                    <th className="px-3 py-2 text-left">TCM</th>
                    <th className="px-3 py-2 text-left">Source</th>
                    <th className="px-3 py-2 text-left">Status</th>
                    <th className="px-3 py-2 text-left">Show</th>
                    <th className="px-3 py-2 text-left">Outcome</th>
                    <th className="px-3 py-2 text-left">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className="border-t border-border/60">
                      <td className="px-3 py-2">{r.time || "-"}</td>
                      <td className="px-3 py-2">{r.name || "-"}</td>
                      <td className="px-3 py-2">{r.property || "-"}</td>
                      <td className="px-3 py-2">{r.area || "-"}</td>
                      <td className="px-3 py-2">{r.tcm_name || "-"}</td>
                      <td className="px-3 py-2">{r.source || "-"}</td>
                      <td className="px-3 py-2">{r.status || "-"}</td>
                      <td className="px-3 py-2">{r.show_up === null ? "-" : r.show_up ? "Yes" : "No"}</td>
                      <td className="px-3 py-2">{r.outcome || "-"}</td>
                      <td className="px-3 py-2">{r.remarks || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            <div className="kpi-card p-0 overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="px-3 py-2 text-left">Name</th>
                    <th className="px-3 py-2 text-left">Phone</th>
                    <th className="px-3 py-2 text-left">Source</th>
                    <th className="px-3 py-2 text-left">Move-In</th>
                    <th className="px-3 py-2 text-left">Budget</th>
                    <th className="px-3 py-2 text-left">Work/College</th>
                    <th className="px-3 py-2 text-left">Work Location</th>
                    <th className="px-3 py-2 text-left">Decision Maker</th>
                    <th className="px-3 py-2 text-left">Ready 48h</th>
                    <th className="px-3 py-2 text-left">Exploring</th>
                    <th className="px-3 py-2 text-left">Comparing</th>
                    <th className="px-3 py-2 text-left">Needs Family</th>
                    <th className="px-3 py-2 text-left">Concern</th>
                    <th className="px-3 py-2 text-left">Tour Type</th>
                    <th className="px-3 py-2 text-left">Zone</th>
                    <th className="px-3 py-2 text-left">Date</th>
                    <th className="px-3 py-2 text-left">Slot</th>
                    <th className="px-3 py-2 text-left">Assigned TCM</th>
                    <th className="px-3 py-2 text-left">Live Score</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.id} className="border-t border-border/60">
                      <td className="px-3 py-2">{r.name || "-"}</td>
                      <td className="px-3 py-2">{r.phone || "-"}</td>
                      <td className="px-3 py-2">{r.source || "-"}</td>
                      <td className="px-3 py-2">{r.move_in_date || "-"}</td>
                      <td className="px-3 py-2">{r.budget ? `₹${Number(r.budget).toLocaleString()}` : "-"}</td>
                      <td className="px-3 py-2">{r.work_college || "-"}</td>
                      <td className="px-3 py-2">{r.work_location || "-"}</td>
                      <td className="px-3 py-2">{r.decision_maker || "-"}</td>
                      <td className="px-3 py-2">{r.ready_48h ? "Yes" : "No"}</td>
                      <td className="px-3 py-2">{r.exploring ? "Yes" : "No"}</td>
                      <td className="px-3 py-2">{r.comparing ? "Yes" : "No"}</td>
                      <td className="px-3 py-2">{r.needs_family ? "Yes" : "No"}</td>
                      <td className="px-3 py-2">{r.key_concern || "-"}</td>
                      <td className="px-3 py-2">{r.tour_type || "-"}</td>
                      <td className="px-3 py-2">{r.zone || "-"}</td>
                      <td className="px-3 py-2">{r.date || "-"}</td>
                      <td className="px-3 py-2">{r.slot || r.time || "-"}</td>
                      <td className="px-3 py-2">{r.tcm_name || "-"}</td>
                      <td className="px-3 py-2">{r.live_score ?? r.score ?? "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          <TabsContent value="tcm">
            <div className="kpi-card p-0 overflow-x-auto">
              <table className="w-full text-xs">
                <thead className="bg-secondary/50">
                  <tr>
                    <th className="px-3 py-2 text-left">Lead</th>
                    <th className="px-3 py-2 text-left">Phone</th>
                    <th className="px-3 py-2 text-left">Intent</th>
                    <th className="px-3 py-2 text-left">Score</th>
                    <th className="px-3 py-2 text-left">Status</th>
                    <th className="px-3 py-2 text-left">Tour Type</th>
                    <th className="px-3 py-2 text-left">Time</th>
                    <th className="px-3 py-2 text-left">Property</th>
                    <th className="px-3 py-2 text-left">Area</th>
                    <th className="px-3 py-2 text-left">Budget</th>
                    <th className="px-3 py-2 text-left">Outcome</th>
                    <th className="px-3 py-2 text-left">Remarks</th>
                  </tr>
                </thead>
                <tbody>
                  {tcmToursToShow.map((r) => (
                    <tr key={r.id} className="border-t border-border/60">
                      <td className="px-3 py-2">{r.name || "-"}</td>
                      <td className="px-3 py-2">{r.phone || "-"}</td>
                      <td className="px-3 py-2 uppercase">{r.intent || "-"}</td>
                      <td className="px-3 py-2">{r.score ?? "-"}</td>
                      <td className="px-3 py-2">{r.status || "-"}</td>
                      <td className="px-3 py-2">{r.tour_type || "-"}</td>
                      <td className="px-3 py-2">{r.time || "-"}</td>
                      <td className="px-3 py-2">{r.property || "-"}</td>
                      <td className="px-3 py-2">{r.area || "-"}</td>
                      <td className="px-3 py-2">{r.budget ? `₹${Number(r.budget).toLocaleString()}` : "-"}</td>
                      <td className="px-3 py-2">{r.outcome || "-"}</td>
                      <td className="px-3 py-2">{r.remarks || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
}
