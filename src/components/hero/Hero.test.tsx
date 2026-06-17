import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Hero } from './Hero';

beforeEach(() => {
  window.matchMedia = vi.fn().mockImplementation((q) => ({
    matches: true, media: q, onchange: null,
    addEventListener: vi.fn(), removeEventListener: vi.fn(), addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: vi.fn(),
  }));
});

describe('Hero', () => {
  it('renders terminal intro, backend graph, and CTAs', () => {
    const { container } = render(<MemoryRouter><Hero /></MemoryRouter>);
    expect(screen.getByText(/Naruephon Yotmao/)).toBeInTheDocument();
    expect(container.querySelector('svg.backend-graph')).not.toBeNull();
    expect(screen.getByText(/Projects/i)).toBeInTheDocument();
  });
});
