import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Force reduced-motion=true so TerminalIntro renders the full name immediately
// (without this, the typing animation starts at shown=0 and the name is hidden).
beforeEach(() => {
  window.matchMedia = vi.fn().mockImplementation((q: string) => ({
    matches: true,
    media: q,
    onchange: null,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    addListener: vi.fn(),
    removeListener: vi.fn(),
    dispatchEvent: vi.fn(),
  }));
});

describe('App routing', () => {
  it('renders the home hero at /', () => {
    render(<MemoryRouter initialEntries={['/']}><App /></MemoryRouter>);
    // Hero CTA is a <button>; nav "Projects" is an <a>, so this targets the hero.
    expect(screen.getByRole('button', { name: /Projects/i })).toBeInTheDocument();
  });
  it('renders the admin gateway at /admin', () => {
    render(<MemoryRouter initialEntries={['/admin']}><App /></MemoryRouter>);
    expect(screen.getByRole('link', { name: /enter cms/i })).toBeInTheDocument();
  });
});
