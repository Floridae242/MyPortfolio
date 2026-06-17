import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProblemSolution } from './ProblemSolution';

describe('ProblemSolution', () => {
  it('renders problem and solution text with headings', () => {
    render(<ProblemSolution problem="the problem" solution="the solution" />);
    expect(screen.getByText('the problem')).toBeInTheDocument();
    expect(screen.getByText('the solution')).toBeInTheDocument();
    expect(screen.getByText(/Problem/i)).toBeInTheDocument();
    expect(screen.getByText(/Solution/i)).toBeInTheDocument();
  });
});
