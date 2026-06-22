import { describe, it, expect, vi, afterEach } from 'vitest';
import { fetchMediumPosts, cleanExcerpt } from './medium';

const post = { title: 'T', link: 'https://medium.com/p/1', pubDate: '2026-01-01', thumbnail: null, excerpt: 'x' };

afterEach(() => vi.restoreAllMocks());

describe('cleanExcerpt', () => {
  it('strips stray Medium media URLs and collapses whitespace', () => {
    expect(cleanExcerpt('https://medium.com/media/4d6d4bcbb1e  real text here')).toBe('real text here');
  });
  it('leaves clean text untouched', () => {
    expect(cleanExcerpt('a clean excerpt')).toBe('a clean excerpt');
  });
});

describe('fetchMediumPosts', () => {
  it('returns items on a successful payload', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ ok: true, items: [post] }),
    }));
    const posts = await fetchMediumPosts();
    expect(posts).toEqual([post]);
  });

  it('sanitizes excerpts containing embedded URLs', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ ok: true, items: [{ ...post, excerpt: 'https://medium.com/media/abc Intro text' }] }),
    }));
    const posts = await fetchMediumPosts();
    expect(posts[0].excerpt).toBe('Intro text');
  });

  it('throws on a non-ok HTTP response', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: false, status: 401, json: () => Promise.resolve({}) }));
    await expect(fetchMediumPosts()).rejects.toThrow(/401/);
  });

  it('throws when payload shape is unexpected', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, json: () => Promise.resolve({ ok: false }) }));
    await expect(fetchMediumPosts()).rejects.toThrow(/unexpected payload/);
  });
});
