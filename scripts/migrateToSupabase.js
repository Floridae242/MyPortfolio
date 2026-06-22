const projectsData = require('../data/projects.js');
const selfDevelopmentData = require('../data/self-development.js');
const awardsData = require('../data/awards.js');
const activitiesData = require('../data/activities.js');

const SUPABASE_URL = "https://rngeogahhatybnlhmgbz.supabase.co/rest/v1";
// service_role key MUST come from the environment — never hardcode it.
// Run with: SUPABASE_SERVICE_ROLE_KEY=... node scripts/migrateToSupabase.js
const SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!SERVICE_KEY) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY not set. Export the service_role key before running this migration.');
}

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
