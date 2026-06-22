import { BentoGrid } from './bento/BentoGrid';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { fetchProjects } from '@/lib/supabase';
import { projects as fallback } from '@/data/projects';
import './sections/sections.css';

export function Projects() {
  const { data } = useSupabaseData(fetchProjects, fallback);
  return (
    <section id="projects" className="section container" aria-labelledby="proj-h">
      <div className="section-head"><div className="kicker">// projects</div><h2 id="proj-h">Selected Work</h2></div>
      <BentoGrid projects={data} />
    </section>
  );
}
