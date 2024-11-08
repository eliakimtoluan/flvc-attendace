import { supabase } from "@/App";

export function useStoragePublicUrl(bucket: string, path: string) {
  return supabase.storage.from(bucket).getPublicUrl(path);
}
