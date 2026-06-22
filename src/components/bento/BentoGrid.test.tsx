import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { BentoGrid } from './BentoGrid';
import type { Project } from '@/data/types';

const mk = (slug: string, cat: string): Project => ({
  slug, categories: [cat], title: slug, color: 'sky', imageUrl: '', shortDescription: 's',
  fullDescription: '', problemSolved: '', keyLearnings: [], techStack: [], role: '', context: '', result: '',
  githubUrl: '', liveUrl: '', canvaUrl: '',
});

describe('BentoGrid', () => {
  it('renders all projects and filters by category', () => {
    const projects = [mk('a', 'Production'), mk('b', 'Competition')];
    render(<MemoryRouter><BentoGrid projects={projects} /></MemoryRouter>);
    expect(screen.getByText('a')).toBeInTheDocument();
    expect(screen.getByText('b')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Competition'));
    expect(screen.queryByText('a')).toBeNull();
    expect(screen.getByText('b')).toBeInTheDocument();
  });
});
