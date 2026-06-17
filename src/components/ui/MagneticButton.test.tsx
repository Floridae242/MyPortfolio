import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MagneticButton } from './MagneticButton';

beforeEach(() => {
  window.matchMedia = vi.fn().mockImplementation((q) => ({
    matches: false, media: q, onchange: null,
    addEventListener: vi.fn(), removeEventListener: vi.fn(), addListener: vi.fn(), removeListener: vi.fn(), dispatchEvent: vi.fn(),
  }));
});

describe('MagneticButton', () => {
  it('renders label and fires onClick', () => {
    const onClick = vi.fn();
    render(<MagneticButton onClick={onClick}>Projects</MagneticButton>);
    fireEvent.click(screen.getByText('Projects'));
    expect(onClick).toHaveBeenCalled();
  });
});
