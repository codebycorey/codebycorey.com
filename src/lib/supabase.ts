import { createClient, type SupabaseClient } from '@supabase/supabase-js';

let _supabase: SupabaseClient | null = null;

function getSupabase(): SupabaseClient {
  if (!_supabase) {
    const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL || '';
    const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY || '';
    _supabase = createClient(supabaseUrl, supabaseAnonKey);
  }
  return _supabase;
}

export async function fetchAndIncrementViewCount(
  slug: string
): Promise<number | null> {
  await getSupabase().rpc('increment_page_view', { page_slug: slug });
  return fetchViewCount(slug);
}

export async function fetchViewCount(slug: string): Promise<number | null> {
  const { data } = await getSupabase()
    .from('pages')
    .select('view_count')
    .eq('slug', slug);

  if (data && data.length > 0) {
    return data[0].view_count;
  }

  return null;
}

export async function fetchAllViewCounts(): Promise<Record<string, number>> {
  const { data } = await getSupabase().from('pages').select('*');
  const viewCounts: Record<string, number> = {};
  if (data) {
    data.forEach((page: { slug: string; view_count: number }) => {
      viewCounts[page.slug] = page.view_count;
    });
  }
  return viewCounts;
}
