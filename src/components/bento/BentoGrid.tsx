import { useMemo, useState } from 'react';
import { ProjectCard } from './ProjectCard';
import { FilterPills } from './FilterPills';
import { filterByCategory, deriveCategories } from '@/lib/filter';
import type { Project } from '@/data/types';
import './bento-grid.css';

export function BentoGrid({ projects }: { projects: Project[] }) {
  const [active, setActive] = useState('All');
  const categories = useMemo(() => deriveCategories(projects), [projects]);
  const visible = useMemo(() => filterByCategory(projects, active), [projects, active]);

  return (
    <div>
      <FilterPills categories={categories} active={active} onChange={setActive} />
      <div className="bento">
        {visible.map((p, i) => <ProjectCard key={p.slug} project={p} featured={i === 0} index={i} />)}
      </div>
    </div>
  );
}
