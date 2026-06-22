import type { Project, Award, Activity, SelfDev } from '@/data/types';

export const SB_URL = 'https://rngeogahhatybnlhmgbz.supabase.co/rest/v1';
// Supabase publishable key — read-only, RLS-enforced, safe for the browser.
// (Replaces the legacy anon JWT; never put the secret/service_role key here.)
export const SB_KEY = 'sb_publishable_3Vet8w3zGsdQzRmEnASQeg_AdXLvlER';

const headers = { apikey: SB_KEY, Authorization: `Bearer ${SB_KEY}`, Accept: 'application/json' };

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapProject(r: any): Project {
  return {
    slug: r.slug, categories: r.categories ?? [], title: r.title, color: r.color ?? 'sky',
    imageUrl: r.image_url ?? '', shortDescription: r.short_description ?? '',
    fullDescription: r.full_description ?? '', problemSolved: r.problem_solved ?? '',
    keyLearnings: r.key_learnings ?? [], techStack: r.tech_stack ?? [],
    role: r.role ?? '', context: r.context ?? '', result: r.result ?? '',
    githubUrl: r.github_url ?? '', liveUrl: r.live_url ?? '', canvaUrl: r.canva_url ?? '',
  };
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapAward(r: any): Award {
  return { id: r.id, category: r.category, title: r.title, organization: r.organization, date: r.date, description: r.description };
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapActivity(r: any): Activity {
  return { id: r.id, activityName: r.activity_name, role: r.role, period: r.period, description: r.description, imageUrl: r.image_url ?? null, softSkills: r.soft_skills ?? [] };
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function mapSelfDev(r: any): SelfDev {
  return { id: r.id, type: r.type, title: r.title, institution: r.institution, date: r.date_issued, credentialUrl: r.credential_url ?? null, imageUrl: r.image_url ?? null };
}

async function getJson(path: string): Promise<unknown[]> {
  const res = await fetch(`${SB_URL}/${path}`, { headers });
  if (!res.ok) throw new Error(`Supabase ${path} -> ${res.status}`);
  return res.json() as Promise<unknown[]>;
}

export const fetchProjects = () => getJson('projects?select=*&order=created_at.asc').then((d) => d.map(mapProject));
export const fetchAwards = () => getJson('awards?select=*&order=date.desc').then((d) => d.map(mapAward));
export const fetchActivities = () => getJson('activities?select=*&order=created_at.asc').then((d) => d.map(mapActivity));
export const fetchSelfDev = () => getJson('certificates?select=*&order=date_issued.desc').then((d) => d.map(mapSelfDev));
