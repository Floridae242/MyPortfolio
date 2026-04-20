-- ============================================
-- Portfolio Database Schema
-- Run this in Supabase SQL Editor
-- ============================================

-- Projects Table (matches data/projects.js schema)
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug VARCHAR(100) UNIQUE NOT NULL,
  title VARCHAR(255) NOT NULL,
  categories TEXT[] DEFAULT '{}',
  color VARCHAR(50),
  image_url VARCHAR(500),
  short_description TEXT NOT NULL,
  full_description TEXT NOT NULL,
  problem_solved TEXT,
  key_learnings TEXT[] DEFAULT '{}',
  result TEXT,
  tech_stack TEXT[] DEFAULT '{}',
  role VARCHAR(255),
  context TEXT,
  github_url VARCHAR(500),
  live_url VARCHAR(500),
  canva_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Certificates / Self-Development Table (matches data/self-development.js)
CREATE TABLE IF NOT EXISTS certificates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  type VARCHAR(50) NOT NULL DEFAULT 'Certification',
  title VARCHAR(255) NOT NULL,
  institution VARCHAR(255) NOT NULL,
  date_issued DATE NOT NULL,
  credential_url VARCHAR(500),
  image_url VARCHAR(500),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Awards Table (matches data/awards.js)
CREATE TABLE IF NOT EXISTS awards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category VARCHAR(50) NOT NULL DEFAULT 'Competition',
  title VARCHAR(255) NOT NULL,
  organization VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activities Table (matches data/activities.js)
CREATE TABLE IF NOT EXISTS activities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  activity_name VARCHAR(255) NOT NULL,
  role VARCHAR(255) NOT NULL,
  period VARCHAR(100),
  description TEXT,
  image_url VARCHAR(500),
  soft_skills TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_categories ON projects USING GIN(categories);
CREATE INDEX IF NOT EXISTS idx_certificates_type ON certificates(type);
CREATE INDEX IF NOT EXISTS idx_awards_category ON awards(category);
