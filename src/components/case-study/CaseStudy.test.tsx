import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { CaseStudy } from './CaseStudy';

describe('CaseStudy', () => {
  it('renders the matching project by slug', () => {
    render(
      <MemoryRouter initialEntries={['/case/smart-flema']}>
        <Routes><Route path="/case/:slug" element={<CaseStudy />} /></Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText(/Smart Flema/)).toBeInTheDocument();
  });

  it('shows a not-found state for an unknown slug', () => {
    render(
      <MemoryRouter initialEntries={['/case/does-not-exist']}>
        <Routes><Route path="/case/:slug" element={<CaseStudy />} /></Routes>
      </MemoryRouter>,
    );
    expect(screen.getByText(/not found/i)).toBeInTheDocument();
  });
});
