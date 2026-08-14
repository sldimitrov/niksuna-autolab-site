import * as React from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";

import { useSupabaseSession } from "@/hooks/use-supabase-session";
import { AdminDashboard } from "@/components/admin/AdminDashboard";

export const Route = createFileRoute("/admin/")({
  component: AdminIndex,
});

function AdminIndex() {
  const navigate = useNavigate();
  const session = useSupabaseSession();

  React.useEffect(() => {
    if (session === null) {
      navigate({ to: "/admin/login" });
    }
  }, [session, navigate]);

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <p className="text-sm text-muted-foreground">Зареждане…</p>
      </div>
    );
  }

  return <AdminDashboard />;
}
