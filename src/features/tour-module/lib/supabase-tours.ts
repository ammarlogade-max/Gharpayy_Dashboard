"use client";

export type SupabaseTour = {
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

export type NewSupabaseTour = Omit<SupabaseTour, "id" | "created_at">;

function getSupabaseEnv() {
  const base = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!base || !anon) {
    throw new Error("Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY");
  }
  return { base, anon };
}

function headers(anon: string) {
  return {
    apikey: anon,
    Authorization: `Bearer ${anon}`,
    "Content-Type": "application/json",
  };
}

export async function fetchTours(signal?: AbortSignal): Promise<SupabaseTour[]> {
  const { base, anon } = getSupabaseEnv();
  const res = await fetch(`${base}/rest/v1/tours?select=*&order=created_at.desc`, {
    headers: headers(anon),
    cache: "no-store",
    signal,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch tours: ${res.status} ${text}`);
  }
  return (await res.json()) as SupabaseTour[];
}

export async function fetchTourById(id: string, signal?: AbortSignal): Promise<SupabaseTour> {
  const { base, anon } = getSupabaseEnv();
  const res = await fetch(`${base}/rest/v1/tours?select=*&id=eq.${encodeURIComponent(id)}&limit=1`, {
    headers: headers(anon),
    cache: "no-store",
    signal,
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to fetch tour: ${res.status} ${text}`);
  }
  const rows = (await res.json()) as SupabaseTour[];
  if (!rows?.length) {
    throw new Error("Tour not found");
  }
  return rows[0];
}

export async function createTour(payload: NewSupabaseTour): Promise<SupabaseTour> {
  const { base, anon } = getSupabaseEnv();
  const res = await fetch(`${base}/rest/v1/tours?select=*`, {
    method: "POST",
    headers: {
      ...headers(anon),
      Prefer: "return=representation",
    },
    body: JSON.stringify([payload]),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Failed to create tour: ${res.status} ${text}`);
  }
  const rows = (await res.json()) as SupabaseTour[];
  return rows[0];
}
