import { createClient } from "@supabase/supabase-js";

export const supabaseAdmin = createClient(
  "https://szcjrfuerbvwgvzoisyv.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN6Y2pyZnVlcmJ2d2d2em9pc3l2Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczMDcwNDc4MCwiZXhwIjoyMDQ2MjgwNzgwfQ.YjkNHvVHA8ecmWKngSFSxbVrw0SD4eeEirsr6ZEGyDw"
);
