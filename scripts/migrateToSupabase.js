const projectsData = require('../data/projects.js');
const selfDevelopmentData = require('../data/self-development.js');
const awardsData = require('../data/awards.js');
const activitiesData = require('../data/activities.js');

const SUPABASE_URL = "https://rngeogahhatybnlhmgbz.supabase.co/rest/v1";
// Using the service_role key provided by the user for the migration
const SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJuZ2VvZ2FoaGF0eWJubGhtZ2J6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjY5NTE0OCwiZXhwIjoyMDkyMjcxMTQ4fQ.tOap3UMeUzmpy--Gwa_AJ7ZiYc96JoidQ6mOztYETDw";

async function upsertData(table, data) {
  const response = await fetch(`${SUPABASE_URL}/${table}`, {
    method: 'POST',
    headers: {
      'apikey': SERVICE_KEY,
      'Authorization': `Bearer ${SERVICE_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': 'resolution=merge-duplicates'
    },
    body: JSON.stringify(data)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to insert into ${table}: ${response.status} ${response.statusText} - ${errorText}`);
  }
}

async function migrate() {
  console.log("🚀 Starting Supabase Database Migration...");

  try {
    // 1. Projects Migration
    console.log(`Migrating ${projectsData.length} projects...`);
    const formattedProjects = projectsData.map(p => ({
      slug: p.slug,
      title: p.title,
      categories: p.categories || [],
      color: p.color,
      image_url: p.imageUrl || null,
      short_description: p.shortDescription || "",
      full_description: p.fullDescription || "",
      problem_solved: p.problemSolved || null,
      key_learnings: p.keyLearnings || [],
      result: p.result || null,
      tech_stack: p.techStack || [],
      role: p.role,
      context: p.context,
      github_url: p.githubUrl || null,
      live_url: p.liveUrl || null,
      canva_url: p.canvaUrl || null
    }));
    await upsertData('projects', formattedProjects);
    console.log("✅ Projects migrated successfully.");

    // 2. Certificates (Self-Development) Migration
    console.log(`Migrating ${selfDevelopmentData.length} certificates & workshops...`);
    const formattedCerts = selfDevelopmentData.map(c => ({
      type: c.type,
      title: c.title,
      institution: c.institution,
      date_issued: c.date,
      credential_url: c.credentialUrl || null,
      image_url: c.imageUrl || null
    }));
    await upsertData('certificates', formattedCerts);
    console.log("✅ Certificates migrated successfully.");

    // 3. Awards Migration
    console.log(`Migrating ${awardsData.length} awards...`);
    const formattedAwards = awardsData.map(a => ({
      category: a.category,
      title: a.title,
      organization: a.organization,
      date: a.date,
      description: a.description || null
    }));
    await upsertData('awards', formattedAwards);
    console.log("✅ Awards migrated successfully.");

    // 4. Activities Migration
    console.log(`Migrating ${activitiesData.length} activities...`);
    const formattedActivities = activitiesData.map(a => ({
      activity_name: a.activityName,
      role: a.role,
      period: a.period || null,
      description: a.description || null,
      image_url: a.imageUrl || null,
      soft_skills: a.softSkills || []
    }));
    await upsertData('activities', formattedActivities);
    console.log("✅ Activities migrated successfully.");

    console.log("\n🎉 All data migrated fully and successfully to Supabase Database!");

  } catch (err) {
    console.error("\n❌ Migration Error:", err.message);
  }
}

migrate();
