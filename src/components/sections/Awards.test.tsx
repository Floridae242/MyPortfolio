import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { Awards } from './Awards';
import type { Award } from '@/data/types';

const awards: Award[] = [{ id: 1, category: 'Competition', title: 'Gold Medalist', organization: 'X', date: '2023-01-20', description: 'desc' }];

describe('Awards', () => {
  it('renders award title and organization', () => {
    render(<Awards awards={awards} />);
    expect(screen.getByText('Gold Medalist')).toBeInTheDocument();
    expect(screen.getByText(/X/)).toBeInTheDocument();
  });
});
