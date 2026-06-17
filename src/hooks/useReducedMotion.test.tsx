import { describe, it, expect, vi, beforeEach } from 'vitest';
import { renderHook } from '@testing-library/react';
import { useReducedMotion } from './useReducedMotion';

beforeEach(() => {
  window.matchMedia = vi.fn().mockImplementation((q) => ({
    matches: true, media: q, onchange: null,
    addEventListener: vi.fn(), removeEventListener: vi.fn(), addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: vi.fn(),
  }));
});

describe('useReducedMotion', () => {
  it('returns true when the media query matches', () => {
    const { result } = renderHook(() => useReducedMotion());
    expect(result.current).toBe(true);
  });
});
