import { SB_URL, SB_KEY } from './supabase';

export interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  thumbnail: string | null;
  excerpt: string;
}

// The medium-feed Edge Function lives under /functions/v1 (not /rest/v1).
const FN_URL = `${SB_URL.replace(/\/rest\/v1$/, '')}/functions/v1/medium-feed`;

export async function fetchMediumPosts(): Promise<MediumPost[]> {
  const res = await fetch(FN_URL, { headers: { apikey: SB_KEY, Accept: 'application/json' } });
  if (!res.ok) throw new Error(`medium-feed responded ${res.status}`);
  const data: unknown = await res.json();
  if (
    !data ||
    typeof data !== 'object' ||
    (data as { ok?: unknown }).ok !== true ||
    !Array.isArray((data as { items?: unknown }).items)
  ) {
    throw new Error('medium-feed returned an unexpected payload');
  }
  return (data as { items: MediumPost[] }).items;
}
