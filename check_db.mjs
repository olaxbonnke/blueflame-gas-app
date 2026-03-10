import fs from 'fs';
import { createClient } from '@supabase/supabase-js';

const envFile = fs.readFileSync('.env.local', 'utf8');
let url = '', key = '';
envFile.split('\n').forEach(line => {
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_URL=')) url = line.split('=')[1].replace(/"/g, '').trim();
  if (line.startsWith('NEXT_PUBLIC_SUPABASE_ANON_KEY=')) key = line.split('=')[1].replace(/"/g, '').trim();
});

const supabase = createClient(url, key);

async function check() {
  const { data, error } = await supabase.from('profiles').upsert({ id: '00000000-0000-0000-0000-000000000000', role: 'main_admin' });
  console.log('UPSERT ERROR MESSAGE:', error?.message);
  console.log('UPSERT ERROR CODE:', error?.code);
  console.log('UPSERT ERROR DETAILS:', error?.details);
  process.exit(0);
}
check();
