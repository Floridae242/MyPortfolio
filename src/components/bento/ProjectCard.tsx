import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/ui/GlassCard';
import type { Project } from '@/data/types';
import './project-card.css';

export function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <GlassCard className={`project-card ${featured ? 'featured' : ''}`}>
      <Link to={`/case/${project.slug}`} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', height: '100%' }}>
        <span className="cats">{project.categories.join(' · ')}</span>
        <h3>{featured ? '★ ' : ''}{project.title}</h3>
        <p className="desc">{project.shortDescription}</p>
        <div className="tags">
          {project.techStack.slice(0, featured ? 6 : 3).map((t) => <span key={t} className="tag">{t}</span>)}
        </div>
      </Link>
    </GlassCard>
  );
}
