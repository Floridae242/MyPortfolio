import { Hero } from './hero/Hero';
import { Projects } from './Projects';
import { Awards } from './sections/Awards';
import { Activities } from './sections/Activities';
import { SelfDevelopment } from './sections/SelfDevelopment';
import { PromptBox } from './sections/PromptBox';
import { Journal } from './sections/Journal';
import { About } from './sections/About';
import { Contact } from './sections/Contact';
import { useSupabaseData } from '@/hooks/useSupabaseData';
import { fetchAwards, fetchActivities, fetchSelfDev } from '@/lib/supabase';
import { awards as awardsFallback } from '@/data/awards';
import { activities as activitiesFallback } from '@/data/activities';
import { selfDevelopment as sdFallback } from '@/data/selfDevelopment';
import { useScrollReveal } from '@/hooks/useScrollProgress';

export function Home() {
  const { data: awards } = useSupabaseData(fetchAwards, awardsFallback);
  const { data: activities } = useSupabaseData(fetchActivities, activitiesFallback);
  const { data: sd } = useSupabaseData(fetchSelfDev, sdFallback);
  useScrollReveal();
  return (
    <main>
      <Hero />
      <PromptBox />
      <Projects />
      <Awards awards={awards} />
      <Activities activities={activities} />
      <SelfDevelopment items={sd} />
      <Journal />
      <About />
      <Contact />
    </main>
  );
}
