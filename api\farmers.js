import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  
  if (req.method === 'OPTIONS') return res.status(200).end();
  
  if (req.method === 'POST') {
    const { ag_key, full_name, phone, village } = req.body;
    const { data, error } = await supabase.from('farmers').insert([{ ag_key, full_name, phone, village }]).select();
    if (error) return res.status(400).json({ error: error.message });
    return res.status(200).json({ success: true, data });
  }
  
  if (req.method === 'GET') {
    const { data } = await supabase.from('farmers').select('*').order('created_at', { ascending: false });
    return res.status(200).json(data);
  }
}
