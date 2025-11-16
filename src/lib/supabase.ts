import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rrxhhkttxgqsttfdqwzl.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJyeGhoa3R0eGdxc3R0ZmRxd3psIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjMyMDgwNDUsImV4cCI6MjA3ODc4NDA0NX0.d4ytYt7K8SlyPzmusAIrD7_f6LLrWlKei7oS0L6NQfs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true
  }
});
