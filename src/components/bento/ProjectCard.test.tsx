import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ProjectCard } from './ProjectCard';
import type { Project } from '@/data/types';

const p: Project = {
  slug: 'smart-flema', categories: ['Competition'], title: 'Smart Flema', color: 'emerald',
  imageUrl: 'pic/1.png', shortDescription: 'CV heatmaps', fullDescription: '', problemSolved: '',
  keyLearnings: [], techStack: ['AI', 'CV'], role: '', context: '', result: '',
  githubUrl: '', liveUrl: '', canvaUrl: '',
};

describe('ProjectCard', () => {
  it('renders title, short description, tech tags, and links to the case route', () => {
    render(<MemoryRouter><ProjectCard project={p} /></MemoryRouter>);
    expect(screen.getByText('Smart Flema')).toBeInTheDocument();
    expect(screen.getByText('CV heatmaps')).toBeInTheDocument();
    expect(screen.getByText('AI')).toBeInTheDocument();
    expect(screen.getByRole('link')).toHaveAttribute('href', '/case/smart-flema');
  });
});
