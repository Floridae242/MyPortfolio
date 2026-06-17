import { Link, useParams } from 'react-router-dom';
import { projects } from '@/data/projects';
import { ProblemSolution } from './ProblemSolution';
import { TechTags } from './TechTags';
import { MediaBlock } from './MediaBlock';
import { MagneticButton } from '@/components/ui/MagneticButton';
import './case-study.css';

export function CaseStudy() {
  const { slug } = useParams();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    return (
      <div className="case">
        <h1>404 — case not found</h1>
        <p className="context">No case study exists for "{slug}".</p>
        <Link to="/"><MagneticButton>← Back home</MagneticButton></Link>
      </div>
    );
  }

  return (
    <article className="case">
      <Link to="/" className="context">← index</Link>
      <h1>{project.title}</h1>
      <div className="context">{project.context} · {project.role}</div>
      <MediaBlock src={project.imageUrl} alt={project.title} />
      <ProblemSolution problem={project.problemSolved} solution={project.shortDescription} />
      <h3 style={{ margin: '1.5rem 0 0.5rem' }}>Tech stack</h3>
      <TechTags tags={project.techStack} />
      {project.keyLearnings.length > 0 && (
        <>
          <h3 style={{ margin: '1.5rem 0 0.5rem' }}>Key learnings</h3>
          <ul style={{ color: 'var(--color-text-dim)', lineHeight: 1.7, paddingLeft: '1.1rem' }}>
            {project.keyLearnings.map((k) => <li key={k}>{k}</li>)}
          </ul>
        </>
      )}
      {project.result && (
        <>
          <h3 style={{ margin: '1.5rem 0 0.5rem' }}>Result</h3>
          <p style={{ color: 'var(--color-text-dim)', lineHeight: 1.7 }}>{project.result}</p>
        </>
      )}
      <div style={{ display: 'flex', gap: '0.7rem', marginTop: '2rem', flexWrap: 'wrap' }}>
        {project.githubUrl && <a href={project.githubUrl} target="_blank" rel="noreferrer"><MagneticButton variant="ghost">GitHub</MagneticButton></a>}
        {project.liveUrl && <a href={project.liveUrl} target="_blank" rel="noreferrer"><MagneticButton variant="ghost">Live</MagneticButton></a>}
        {project.canvaUrl && <a href={project.canvaUrl} target="_blank" rel="noreferrer"><MagneticButton variant="ghost">Deck</MagneticButton></a>}
      </div>
    </article>
  );
}
