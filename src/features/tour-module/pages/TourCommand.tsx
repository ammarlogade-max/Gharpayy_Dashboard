"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, CalendarClock, MapPin, Phone, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { fetchTourById, type SupabaseTour } from "@/features/tour-module/lib/supabase-tours";

export default function TourCommand() {
  const params = useParams<{ id: string }>();
  const id = params?.id;
  const [tour, setTour] = useState<SupabaseTour | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setError("Missing tour id");
      setIsLoading(false);
      return;
    }

    const controller = new AbortController();
    const run = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const row = await fetchTourById(id, controller.signal);
        setTour(row);
      } catch (e) {
        if (!controller.signal.aborted) {
          setError(e instanceof Error ? e.message : "Failed to fetch tour");
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    run();
    return () => controller.abort();
  }, [id]);

  if (isLoading) {
    return (
      <div className="glass-card p-8 text-center text-sm text-muted-foreground">
        <span className="inline-block h-5 w-5 rounded-full border-2 border-primary border-r-transparent animate-spin mr-2 align-middle" />
        Loading tour...
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <Link href="/myt/tours" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Back to tours
        </Link>
        <div className="glass-card p-4 text-sm text-destructive">{error}</div>
      </div>
    );
  }

  if (!tour) {
    return (
      <div className="space-y-4">
        <Link href="/myt/tours" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
          <ArrowLeft className="h-4 w-4" /> Back to tours
        </Link>
        <div className="glass-card p-4 text-sm text-muted-foreground">Tour not found.</div>
      </div>
    );
  }

  return (
    <div className="space-y-4 max-w-5xl mx-auto">
      <Link href="/myt/tours" className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1">
        <ArrowLeft className="h-4 w-4" /> Back to tours
      </Link>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-4 flex-wrap">
            <div className="space-y-1">
              <CardTitle className="text-xl">{tour.name || "-"}</CardTitle>
              <div className="text-sm text-muted-foreground flex flex-wrap gap-x-3 gap-y-1">
                <span className="inline-flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {tour.phone || "-"}
                </span>
                <span className="inline-flex items-center gap-1">
                  <User className="h-3 w-3" />
                  {tour.tcm_name || "-"}
                </span>
                <span className="inline-flex items-center gap-1">
                  <MapPin className="h-3 w-3" />
                  {tour.area || "-"} · {tour.property || "-"}
                </span>
                <span className="inline-flex items-center gap-1">
                  <CalendarClock className="h-3 w-3" />
                  {tour.date || "-"} {tour.time || "-"}
                </span>
                <span>Rs {tour.budget?.toLocaleString("en-IN") || "-"}</span>
              </div>
            </div>
            <div className="flex flex-col items-end gap-1">
              <Badge variant={tour.status === "completed" ? "default" : "secondary"} className="capitalize">
                {tour.status || "scheduled"}
              </Badge>
              <div className="text-xs text-muted-foreground">Score</div>
              <div className="text-2xl font-bold tabular-nums">{tour.live_score ?? tour.score ?? 0}</div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground">Source:</span> {tour.source || "-"}
            </p>
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground">Tour Type:</span> {tour.tour_type || "-"}
            </p>
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground">Intent:</span> {tour.intent || "-"}
            </p>
            <p className="text-muted-foreground">
              <span className="font-medium text-foreground">Outcome:</span> {tour.outcome || "-"}
            </p>
            <p className="text-muted-foreground md:col-span-2">
              <span className="font-medium text-foreground">Remarks:</span> {tour.remarks || "-"}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
