import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { NavBar } from './NavBar';

describe('NavBar', () => {
  it('renders the main section links', () => {
    render(<MemoryRouter><NavBar /></MemoryRouter>);
    expect(screen.getByText(/Projects/i)).toBeInTheDocument();
    expect(screen.getByText(/Awards/i)).toBeInTheDocument();
  });
});
