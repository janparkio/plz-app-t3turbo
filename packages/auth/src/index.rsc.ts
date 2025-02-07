import { cache } from "react";
import { supabase } from "./config";

export type { Session } from "./config";

const auth = cache(async () => {
  const { data: { session } } = await supabase.auth.getSession();
  if (!session) return null;
  
  return {
    user: {
      id: session.user.id,
      email: session.user.email,
      name: session.user.user_metadata?.name,
      image: session.user.user_metadata?.avatar_url,
    }
  };
});

export { auth, supabase };

export {
  invalidateSessionToken,
  validateToken,
  isSecureContext,
} from "./config";