import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { TerminalIntro } from './TerminalIntro';

beforeEach(() => {
  window.matchMedia = vi.fn().mockImplementation((q) => ({
    matches: true, media: q, onchange: null,
    addEventListener: vi.fn(), removeEventListener: vi.fn(), addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: vi.fn(),
  }));
});

describe('TerminalIntro', () => {
  it('renders the full name immediately under reduced motion', () => {
    render(<TerminalIntro />);
    expect(screen.getByText(/Naruephon Yotmao/)).toBeInTheDocument();
    expect(screen.getByText(/Business Analyst · Project Manager/)).toBeInTheDocument();
  });
});
