import { describe, it, expect } from 'vitest';
import { mapProject, mapActivity, mapSelfDev, SB_URL } from './supabase';

describe('supabase mappers', () => {
  it('maps snake_case project row to camelCase Project', () => {
    const row = {
      slug: 'x', categories: ['Production'], title: 'X', color: 'emerald',
      image_url: 'pic/x.png', short_description: 'short', full_description: 'full',
      problem_solved: 'prob', key_learnings: ['a'], tech_stack: ['React'],
      role: 'Dev', context: 'ctx', result: 'res',
      github_url: 'g', live_url: 'l', canva_url: 'c',
    };
    const p = mapProject(row);
    expect(p.shortDescription).toBe('short');
    expect(p.techStack).toEqual(['React']);
    expect(p.imageUrl).toBe('pic/x.png');
    expect(p.githubUrl).toBe('g');
  });

  it('maps activity row, defaulting missing arrays', () => {
    const a = mapActivity({ id: 1, activity_name: 'Club', role: 'Dev', period: '2025', description: 'd', image_url: null, soft_skills: null });
    expect(a.activityName).toBe('Club');
    expect(a.softSkills).toEqual([]);
  });

  it('maps certificate row to SelfDev with date_issued', () => {
    const s = mapSelfDev({ id: 1, type: 'Hackathon', title: 'T', institution: 'I', date_issued: '2023-11-11', credential_url: null, image_url: 'pic/c.jpg' });
    expect(s.date).toBe('2023-11-11');
    expect(s.imageUrl).toBe('pic/c.jpg');
  });

  it('exposes the rest endpoint', () => {
    expect(SB_URL).toContain('supabase.co/rest/v1');
  });
});
