import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();

  try {
    const url = process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL;
    const key = process.env.SUPABASE_ANON_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
    
    if(!url || !key) return res.status(500).json({ error: "Missing Supabase env vars" });
    
    const supabase = createClient(url, key);

    if (req.method === 'POST') {
      const { ag_key, full_name, phone, village } = req.body;
      const { data, error } = await supabase.from('farmers').insert([{ ag_key, full_name, phone, village }]).select();
      if (error) return res.status(400).json({ error: error.message });
      return res.status(200).json({ success: true, data });
    }
    
    const { data, error } = await supabase.from('farmers').select('*').order('created_at', { ascending: false });
    if(error) return res.status(400).json({ error: error.message });
    return res.status(200).json(data);
    
  } catch(e){
    return res.status(500).json({ error: e.message });
  }
}
