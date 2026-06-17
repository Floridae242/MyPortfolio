import { describe, it, expect } from 'vitest';
import { renderHook, waitFor } from '@testing-library/react';
import { useSupabaseData } from './useSupabaseData';

describe('useSupabaseData', () => {
  it('returns fetched data on success', async () => {
    const fetcher = () => Promise.resolve([{ id: 1 }]);
    const { result } = renderHook(() => useSupabaseData(fetcher, [{ id: 99 }]));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual([{ id: 1 }]);
    expect(result.current.usedFallback).toBe(false);
  });

  it('falls back to bundled data on fetch error', async () => {
    const fetcher = () => Promise.reject(new Error('network'));
    const { result } = renderHook(() => useSupabaseData(fetcher, [{ id: 99 }]));
    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.data).toEqual([{ id: 99 }]);
    expect(result.current.usedFallback).toBe(true);
  });
});
