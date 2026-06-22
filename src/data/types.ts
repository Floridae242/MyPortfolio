export type ProjectCategory = 'Competition' | 'Production' | 'Academic' | 'Honor';

export interface Project {
  slug: string;
  categories: string[];
  title: string;
  color: string;
  imageUrl: string;
  shortDescription: string;
  fullDescription: string;
  problemSolved: string;
  keyLearnings: string[];
  techStack: string[];
  role: string;
  context: string;
  result: string;
  githubUrl: string;
  liveUrl: string;
  canvaUrl: string;
}

export interface Award {
  id: number;
  category: string;
  title: string;
  organization: string;
  date: string;
  description: string;
}

export interface Activity {
  id: number;
  activityName: string;
  role: string;
  period: string;
  description: string;
  imageUrl: string | null;
  softSkills: string[];
}

export interface SelfDev {
  id: number;
  type: string;
  title: string;
  institution: string;
  date: string;
  credentialUrl: string | null;
  imageUrl: string | null;
}
