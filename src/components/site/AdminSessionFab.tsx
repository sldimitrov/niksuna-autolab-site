import { Link, useRouterState } from "@tanstack/react-router";
import { LayoutDashboard } from "lucide-react";

import { useSupabaseSession } from "@/hooks/use-supabase-session";

export function AdminSessionFab() {
  const session = useSupabaseSession();
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  if (!session || pathname.startsWith("/admin")) return null;

  return (
    <Link
      to="/admin"
      className="fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-lg transition-colors hover:bg-primary/90"
    >
      <LayoutDashboard className="size-4" />
      Админ панел
    </Link>
  );
}
