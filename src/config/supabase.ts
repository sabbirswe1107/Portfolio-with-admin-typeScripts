// Supabase configuration
export const supabaseConfig = {
  url: import.meta.env.VITE_SUPABASE_URL || 'https://qypwpysajnvymkcymkhj.supabase.co',
  anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5cHdweXNham52eW1rY3lta2hqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE0OTg0MjcsImV4cCI6MjA3NzA3NDQyN30.A92A7D7pOq15z6aI8Qr56_Ji4hwZpxHRLr3ID6qjcqg',
  serviceRoleKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF5cHdweXNham52eW1rY3lta2hqIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc2MTQ5ODQyNywiZXhwIjoyMDc3MDc0NDI3fQ.JLbZNvbyWaxFVb23KuWmf69RAnqv0aF5gAO_NZQ_LkU'
};

// Admin credentials
export const adminCredentials = {
  email: 'ahsanursabbir@gmail.com',
  password: 'Ahs@nursabbir0'
};
