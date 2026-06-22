import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { GlassCard } from './GlassCard';

describe('GlassCard', () => {
  it('renders children inside an article with the glass-card class', () => {
    render(<GlassCard>hello</GlassCard>);
    const el = screen.getByText('hello');
    expect(el).toBeInTheDocument();
    expect(el.closest('.glass-card')).not.toBeNull();
  });
});
