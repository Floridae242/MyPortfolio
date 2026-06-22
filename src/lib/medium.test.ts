import { describe, it, expect, vi, afterEach } from 'vitest';
import { fetchMediumPosts } from './medium';

const post = { title: 'T', link: 'https://medium.com/p/1', pubDate: '2026-01-01', thumbnail: null, excerpt: 'x' };

afterEach(() => vi.restoreAllMocks());

describe('fetchMediumPosts', () => {
  it('returns items on a successful payload', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ ok: true, items: [post] }),
    }));
    const posts = await fetchMediumPosts();
    expect(posts).toEqual([post]);
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
