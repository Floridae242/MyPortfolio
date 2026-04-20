# 🔌 Frontend API Integration Guide

## วิธีการเชื่อมต่อ Frontend ไปยัง Backend API

### ขั้นที่ 1: สร้างไฟล์ `api-config.js`

สร้างไฟล์นี้เพื่อจัดการ API endpoints:

```javascript
// api-config.js
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://your-domain.vercel.app'
  : 'http://localhost:3000';

export const API_ENDPOINTS = {
  PROJECTS: `${API_BASE_URL}/api/projects`,
  CERTIFICATES: `${API_BASE_URL}/api/certificates`,
  HEALTH: `${API_BASE_URL}/health`
};

export async function fetchProjects() {
  try {
    const response = await fetch(API_ENDPOINTS.PROJECTS);
    if (!response.ok) throw new Error('Failed to fetch projects');
    return await response.json();
  } catch (error) {
    console.error('Error fetching projects:', error);
    return [];
  }
}

export async function fetchCertificates() {
  try {
    const response = await fetch(API_ENDPOINTS.CERTIFICATES);
    if (!response.ok) throw new Error('Failed to fetch certificates');
    return await response.json();
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return [];
  }
}

export async function fetchProjectBySlug(slug) {
  try {
    const response = await fetch(`${API_ENDPOINTS.PROJECTS}/${slug}`);
    if (!response.ok) throw new Error('Failed to fetch project');
    return await response.json();
  } catch (error) {
    console.error('Error fetching project:', error);
    return null;
  }
}

export async function createProject(projectData) {
  try {
    const response = await fetch(API_ENDPOINTS.PROJECTS, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(projectData)
    });
    if (!response.ok) throw new Error('Failed to create project');
    return await response.json();
  } catch (error) {
    console.error('Error creating project:', error);
    return null;
  }
}
```

### ขั้นที่ 2: ใช้ใน HTML/JavaScript

#### ตัวอย่างที่ 1: ดึงข้อมูล Projects

```html
<!-- index.html -->
<div id="projects-container"></div>

<script type="module">
  import { fetchProjects } from './api-config.js';

  async function loadProjects() {
    const projects = await fetchProjects();
    const container = document.getElementById('projects-container');
    
    projects.forEach(project => {
      const card = document.createElement('div');
      card.className = 'project-card';
      card.innerHTML = `
        <h3>${project.title}</h3>
        <p>${project.shortDescription}</p>
        <a href="/project.html?slug=${project.slug}">View Project</a>
      `;
      container.appendChild(card);
    });
  }

  loadProjects();
</script>
```

#### ตัวอย่างที่ 2: ดึงข้อมูล Certificates

```html
<!-- certificates section -->
<div id="certificates-container"></div>

<script type="module">
  import { fetchCertificates } from './api-config.js';

  async function loadCertificates() {
    const certificates = await fetchCertificates();
    const container = document.getElementById('certificates-container');
    
    certificates.forEach(cert => {
      const certEl = document.createElement('div');
      certEl.className = 'certificate';
      certEl.innerHTML = `
        <img src="${cert.image}" alt="${cert.title}" />
        <h4>${cert.title}</h4>
        <p>${cert.issuer}</p>
        <a href="${cert.credentialUrl}" target="_blank">View Credential</a>
      `;
      container.appendChild(certEl);
    });
  }

  loadCertificates();
</script>
```

#### ตัวอย่างที่ 3: ดึง Project Detail

```javascript
// project-detail.js
import { fetchProjectBySlug } from './api-config.js';

async function loadProjectDetail() {
  const urlParams = new URLSearchParams(window.location.search);
  const slug = urlParams.get('slug');
  
  if (!slug) {
    console.error('No project slug provided');
    return;
  }

  const project = await fetchProjectBySlug(slug);
  
  if (project) {
    document.getElementById('title').textContent = project.title;
    document.getElementById('description').textContent = project.fullDescription;
    document.getElementById('tech-stack').textContent = project.techStack.join(', ');
    
    if (project.liveUrl) {
      document.getElementById('live-link').href = project.liveUrl;
    }
    if (project.githubUrl) {
      document.getElementById('github-link').href = project.githubUrl;
    }
  }
}

loadProjectDetail();
```

### ขั้นที่ 3: ตั้งค่า Environment Variables สำหรับ Production

ใน Vercel Dashboard ให้เพิ่ม:

```
VITE_API_BASE_URL = https://your-domain.vercel.app
```

หรือใน `.env.production`:

```
VITE_API_BASE_URL=https://your-domain.vercel.app
```

### ขั้นที่ 4: ตัวอย่างการสร้าง Project ใหม่ (Admin Panel)

```html
<!-- admin.html -->
<form id="project-form">
  <input type="text" id="slug" placeholder="Project slug" required />
  <input type="text" id="title" placeholder="Project title" required />
  <textarea id="description" placeholder="Short description" required></textarea>
  <button type="submit">Create Project</button>
</form>

<script type="module">
  import { createProject } from './api-config.js';

  document.getElementById('project-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const projectData = {
      slug: document.getElementById('slug').value,
      title: document.getElementById('title').value,
      shortDescription: document.getElementById('description').value,
      color: '#000000',
      fullDescription: '',
      techStack: ['JavaScript', 'HTML', 'CSS'],
      role: 'Developer',
      context: 'Personal Project',
      githubUrl: '',
      liveUrl: '',
      canvaUrl: ''
    };

    const result = await createProject(projectData);
    if (result) {
      alert('Project created successfully!');
      document.getElementById('project-form').reset();
    } else {
      alert('Failed to create project');
    }
  });
</script>
```

---

## 🧪 Testing API Calls

### Test ด้วย curl

```bash
# ดึงข้อมูล projects
curl https://your-domain.vercel.app/api/projects

# ดึง project ที่ specific
curl https://your-domain.vercel.app/api/projects/my-project

# ดึงข้อมูล certificates
curl https://your-domain.vercel.app/api/certificates
```

### Test ด้วย browser console

```javascript
// ใน Developer Console
fetch('https://your-domain.vercel.app/api/projects')
  .then(res => res.json())
  .then(data => console.log(data));
```

---

## 🔒 Security Considerations

1. **HTTPS Only**: ตัวอักษร HTTPS ในทุก API calls
2. **CORS**: ตั้งค่า CORS ให้ปลอดภัย ใน `api/index.js`
3. **Input Validation**: validate data ก่อน POST/PUT
4. **Error Handling**: handle errors ที่ responsive
5. **Rate Limiting**: พิจารณาเพิ่ม rate limiting

---

## 🚀 Performance Tips

1. **Caching**: cache API responses ในเวลา 5-10 นาที
2. **Lazy Loading**: load data เมื่อต้องการเท่านั้น
3. **Error Boundaries**: handle network errors gracefully
4. **Loading States**: แสดง loading indicator ขณะ fetching

### ตัวอย่าง Caching

```javascript
const CACHE_DURATION = 5 * 60 * 1000; // 5 minutes
let projectsCache = { data: null, timestamp: 0 };

export async function fetchProjects() {
  const now = Date.now();
  
  // Return cached data ถ้ายังไม่หมดอายุ
  if (projectsCache.data && now - projectsCache.timestamp < CACHE_DURATION) {
    return projectsCache.data;
  }

  try {
    const response = await fetch(API_ENDPOINTS.PROJECTS);
    const data = await response.json();
    
    // Update cache
    projectsCache = { data, timestamp: now };
    return data;
  } catch (error) {
    console.error('Error fetching projects:', error);
    return projectsCache.data || [];
  }
}
```

---

## 📱 สำหรับ Frontend Frameworks

### ถ้าใช้ React

```javascript
// hooks/useProjects.js
import { useState, useEffect } from 'react';
import { fetchProjects } from '../api-config';

export function useProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects().then(data => {
      setProjects(data);
      setLoading(false);
    });
  }, []);

  return { projects, loading };
}
```

### ถ้าใช้ Vue

```javascript
// composables/useProjects.js
import { ref } from 'vue';
import { fetchProjects } from '../api-config';

export function useProjects() {
  const projects = ref([]);
  const loading = ref(true);

  fetchProjects().then(data => {
    projects.value = data;
    loading.value = false;
  });

  return { projects, loading };
}
```

---

## 🔍 Debugging Tips

### Enable Verbose Logging

```javascript
export async function fetchProjects() {
  console.log('Fetching projects from:', API_ENDPOINTS.PROJECTS);
  
  try {
    const response = await fetch(API_ENDPOINTS.PROJECTS);
    console.log('Response status:', response.status);
    
    const data = await response.json();
    console.log('Fetched data:', data);
    
    return data;
  } catch (error) {
    console.error('Detailed error:', error);
    return [];
  }
}
```

### Check Network Tab
- เปิด DevTools (F12)
- ไปที่ Network tab
- ดู API requests และ responses

