import * as React from "react";
import type { Session } from "@supabase/supabase-js";

import { supabase } from "@/lib/supabase";

/** undefined = checking, null = signed out, Session = signed in. */
export function useSupabaseSession() {
  const [session, setSession] = React.useState<Session | null | undefined>(undefined);

  React.useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setSession(data.session));

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => subscription.unsubscribe();
  }, []);

  return session;
}
