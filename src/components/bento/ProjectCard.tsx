import { Link } from 'react-router-dom';
import { GlassCard } from '@/components/ui/GlassCard';
import { useTilt } from '@/hooks/useTilt';
import type { Project } from '@/data/types';
import './project-card.css';

export function ProjectCard({ project, featured = false, index = 0 }: { project: Project; featured?: boolean; index?: number }) {
  const tilt = useTilt();
  return (
    <div className="card-reveal" style={{ ['--i' as string]: index } as React.CSSProperties}>
      <GlassCard
        ref={tilt.ref}
        className={`project-card ${featured ? 'featured' : ''}`}
        onMouseMove={tilt.onMove}
        onMouseLeave={tilt.reset}
      >
        <Link to={`/case/${project.slug}`} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem', height: '100%' }}>
          <span className="cats">// {project.categories.join(' · ')}</span>
          <h3>{featured ? <span aria-hidden="true">★ </span> : null}<span>{project.title}</span></h3>
          <p className="desc">{project.shortDescription}</p>
          <div className="tags">
            {project.techStack.slice(0, featured ? 6 : 3).map((t) => <span key={t} className="tag">{t}</span>)}
          </div>
        </Link>
      </GlassCard>
    </div>
  );
}
