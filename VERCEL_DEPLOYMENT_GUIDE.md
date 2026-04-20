# 🚀 คู่มือการ Deploy Portfolio บน Vercel + Supabase (ฉบับละเอียด)

> คู่มือนี้เขียนแบบ step-by-step สำหรับมือใหม่ ทำตามทีละขั้นตอนได้เลยครับ

---

## 📌 สารบัญ

1. [เตรียมตัว: สิ่งที่ต้องมีก่อนเริ่ม](#-ขั้นตอนที่-0-เตรียมตัว)
2. [ตั้งค่า Supabase (Database + Storage)](#-ขั้นตอนที่-1-ตั้งค่า-supabase)
3. [เตรียมโค้ดและ Push ไป GitHub](#-ขั้นตอนที่-2-เตรียมโค้ดบน-github)
4. [Deploy บน Vercel](#-ขั้นตอนที่-3-deploy-บน-vercel)
5. [เชื่อมต่อ Supabase กับ Vercel](#-ขั้นตอนที่-4-เชื่อมต่อ-supabase-กับ-vercel)
6. [ทดสอบหลัง Deploy](#-ขั้นตอนที่-5-ทดสอบ)
7. [ตั้ง Custom Domain (Optional)](#-ขั้นตอนที่-6-custom-domain)
8. [Troubleshooting](#-troubleshooting)

---

## 📦 ขั้นตอนที่ 0: เตรียมตัว

### สิ่งที่ต้องมี (ฟรีทั้งหมด)

| เครื่องมือ | ลิงก์สมัคร | ใช้ทำอะไร |
|-----------|-----------|----------|
| **GitHub Account** | https://github.com/signup | เก็บโค้ด + เชื่อม Vercel |
| **Vercel Account** | https://vercel.com/signup | Host เว็บไซต์ (ใช้ GitHub login ได้) |
| **Supabase Account** | https://supabase.com | Database + Storage สำหรับเก็บรูป |
| **Git** (ในเครื่อง) | ติดตั้งมากับ macOS แล้ว | Push โค้ดไป GitHub |

### ตรวจสอบว่ามี Git หรือยัง
```bash
git --version
# ควรเห็น: git version 2.x.x
```

---

## 🗄️ ขั้นตอนที่ 1: ตั้งค่า Supabase

### 1.1 สร้างบัญชี Supabase

1. เปิด https://supabase.com
2. คลิก **"Start your project"**
3. เลือก **"Sign in with GitHub"** (สะดวกที่สุด)
4. Grant permission ให้ Supabase เข้าถึง GitHub

### 1.2 สร้าง Project ใหม่

1. คลิก **"New Project"**
2. กรอกข้อมูล:
   - **Organization**: เลือก org ที่มีอยู่ หรือสร้างใหม่
   - **Name**: `portfolio-db`
   - **Database Password**: สร้างรหัสที่จำได้ → **จดไว้! ใช้ทีหลัง**
   - **Region**: เลือก `Southeast Asia (Singapore)` เพราะใกล้ไทยสุด
3. คลิก **"Create new project"**
4. ⏳ รอประมาณ 1-2 นาทีจนโปรเจกต์พร้อม

### 1.3 สร้าง Database Tables

1. ที่ด้านซ้าย คลิก **"SQL Editor"** (ไอคอนรูป `<>`)
2. คลิก **"New query"**
3. คัดลอก SQL ด้านล่างทั้งหมด แล้ววางลงไป:

```sql
-- ============================================
-- Portfolio Database Schema
-- ============================================

-- Projects Table
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

-- Certificates / Self-Development Table
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

-- Awards Table
CREATE TABLE IF NOT EXISTS awards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  category VARCHAR(50) NOT NULL DEFAULT 'Competition',
  title VARCHAR(255) NOT NULL,
  organization VARCHAR(255) NOT NULL,
  date DATE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Activities Table
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
```

4. คลิก **"Run"** (หรือกด `Cmd + Enter`)
5. ✅ ควรเห็นข้อความ `Success. No rows returned` — แปลว่าสร้าง tables สำเร็จ

### 1.4 สร้าง Storage Bucket (สำหรับเก็บรูปภาพ)

1. ที่ด้านซ้าย คลิก **"Storage"** (ไอคอนรูปถัง)
2. คลิก **"New bucket"**
3. กรอกข้อมูล:
   - **Name**: `portfolio-assets`
   - **Public bucket**: ✅ เปิด (ติ๊กถูก) — เพื่อให้รูปแสดงบนเว็บได้
4. คลิก **"Create bucket"**

#### ตั้ง Policy ให้อ่านรูปได้
1. คลิกที่ bucket `portfolio-assets`
2. คลิกแท็บ **"Policies"**
3. คลิก **"New Policy"** → เลือก **"For full customization"**
4. ตั้งค่า:
   - **Policy Name**: `Allow public read`
   - **Allowed operation**: `SELECT`
   - **Target roles**: `anon` (ทุกคนอ่านได้)
   - **Policy definition**: `true`
5. คลิก **"Review"** → **"Save policy"**

### 1.5 บันทึก Credentials (จดไว้ให้ดี!)

1. ไปที่ **Settings** (ไอคอนเฟือง ด้านล่างซ้าย)
2. คลิก **"API"**
3. จดค่าเหล่านี้:

```
NEXT_PUBLIC_SUPABASE_URL = https://xxxxxxxx.supabase.co    ← "Project URL"
SUPABASE_ANON_KEY        = eyJhbGci...                     ← "anon public" key
SUPABASE_SERVICE_ROLE_KEY = eyJhbGci...                     ← "service_role" key (เก็บเป็นความลับ!)
```

> ⚠️ **คำเตือน**: `SERVICE_ROLE_KEY` ต้องเก็บเป็นความลับเสมอ ห้าม commit ลง GitHub!

---

## 📂 ขั้นตอนที่ 2: เตรียมโค้ดบน GitHub

### 2.1 ตรวจสอบ .gitignore

ตรวจสอบว่าไฟล์ `.gitignore` ในโปรเจกต์มีบรรทัดเหล่านี้:
```
node_modules/
.env
.env.local
.DS_Store
```

### 2.2 สร้าง Repository บน GitHub

1. เปิด https://github.com/new
2. กรอกข้อมูล:
   - **Repository name**: `my-portfolio` (หรือชื่อที่ต้องการ)
   - **Visibility**: `Public` (Vercel ฟรีรองรับทั้ง public/private)
3. คลิก **"Create repository"**
4. **อย่ากดอะไรอื่น** — จะมีคำสั่งให้ copy ไปรันในเครื่อง

### 2.3 Push โค้ดจากเครื่องขึ้น GitHub

เปิด Terminal แล้วรันทีละคำสั่ง:

```bash
# 1. เข้าไปในโฟลเดอร์โปรเจกต์
cd "/Users/floridae/Portfolio(Tle)/MyPortfolio"

# 2. เริ่มต้น Git (ถ้ายังไม่ได้ทำ)
git init

# 3. เพิ่มไฟล์ทั้งหมด
git add .

# 4. Commit ครั้งแรก
git commit -m "Portfolio with interview-based copywriting & structured project details"

# 5. ตั้งชื่อ branch หลัก
git branch -M main

# 6. เชื่อม remote (เปลี่ยน URL เป็นของคุณเอง)
git remote add origin https://github.com/Floridae242/my-portfolio.git

# 7. Push ขึ้นไป
git push -u origin main
```

> 💡 **หาก push ไม่ได้**: GitHub อาจขอ Personal Access Token แทน password
> → ไปที่ GitHub > Settings > Developer Settings > Personal Access Tokens > Generate new token

---

## ☁️ ขั้นตอนที่ 3: Deploy บน Vercel

### 3.1 สมัคร Vercel

1. เปิด https://vercel.com/signup
2. คลิก **"Continue with GitHub"**
3. Grant permission

### 3.2 Import Project

1. คลิก **"Add New..."** → **"Project"**
2. จะเห็นรายการ repository จาก GitHub ของคุณ
3. หา **"my-portfolio"** แล้วคลิก **"Import"**

### 3.3 ตั้งค่า Build Configuration

| ค่า | กรอก |
|-----|------|
| **Framework Preset** | `Other` |
| **Root Directory** | `./` (ค่าเริ่มต้น) |
| **Build Command** | ปล่อยว่าง หรือใส่ `echo "Static site"` |
| **Output Directory** | `./` |

> ⚠️ **สำคัญ**: เนื่องจากเว็บเราเป็น Static HTML ไม่ใช่ Next.js — ให้เลือก Framework Preset เป็น `Other`

### 3.4 ตั้ง Environment Variables (ถ้าจะใช้ Supabase)

คลิก **"Environment Variables"** แล้วเพิ่ม:

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_SUPABASE_URL` | `https://xxxxxxxx.supabase.co` |
| `SUPABASE_ANON_KEY` | `eyJhbGci...` (ค่าจาก step 1.5) |
| `SUPABASE_SERVICE_ROLE_KEY` | `eyJhbGci...` (ค่าจาก step 1.5) |

### 3.5 คลิก Deploy!

1. คลิก **"Deploy"**
2. ⏳ รอประมาณ 30-60 วินาที
3. ✅ เมื่อเห็น **"Congratulations!"** = Deploy สำเร็จ!
4. คลิก URL ที่ได้ (เช่น `my-portfolio-xxx.vercel.app`) เพื่อดูเว็บ

---

## 🔗 ขั้นตอนที่ 4: เชื่อมต่อ Supabase กับ Vercel

### สถานะปัจจุบันของ Portfolio

ตอนนี้เว็บของคุณทำงานได้ 2 แบบ:

| แบบ | วิธีเพิ่มข้อมูล | เหมาะกับ |
|-----|---------------|---------|
| **แบบ A: Static (ปัจจุบัน)** | แก้ไฟล์ `data/*.js` แล้ว push ใหม่ | ง่าย, ไม่ต้องตั้ง database |
| **แบบ B: Dynamic (อนาคต)** | เพิ่มผ่าน Admin panel → บันทึกลง Supabase | เพิ่มข้อมูลง่ายกว่า, รองรับ upload รูป |

> 💡 **แนะนำ**: ใช้แบบ A ไปก่อน — เวลาอยากเพิ่มโปรเจกต์ ก็แก้ `data/projects.js` แล้ว `git push` ก็อัปเดตเว็บเลย!

### ถ้าจะเปลี่ยนมาใช้ Supabase เต็มตัว (อนาคต)

จะต้อง:
1. สร้าง API route files ที่ดึงข้อมูลจาก Supabase แทน JS files
2. สร้าง Admin page สำหรับ CRUD + upload รูป
3. เปลี่ยน rendering logic จากอ่าน JS variable เป็น `fetch()` จาก API

---

## 🧪 ขั้นตอนที่ 5: ทดสอบ

### Checklist หลัง Deploy

- [ ] เปิดเว็บ → เห็นรูป Avatar และ Banner
- [ ] อ่าน About Me → เนื้อหาเป็นภาษาอังกฤษ Conversational
- [ ] Skill icons แสดงถูกต้อง (มี logo สี)
- [ ] คลิก filter tabs (All / Production / Competition / ...) → การ์ดเปลี่ยน
- [ ] คลิกเข้าโปรเจกต์ → เห็น "The Problem" / "What I Built" / "Key Learnings" / "Result"
- [ ] ส่วน Self-Development แสดงรายการ certificates
- [ ] ส่วน Awards แสดงรายการรางวัล
- [ ] Footer แสดง "Handcrafted by Naruephon Yotmao"

---

## 🌐 ขั้นตอนที่ 6: Custom Domain (ถ้าต้องการ)

### 6.1 ซื้อ Domain

แนะนำผู้ให้บริการ:
- **Namecheap** — ราคาถูก, UI ง่าย
- **Cloudflare** — ราคาทุน, DNS เร็วมาก  
- **Google Domains** → ย้ายไป Squarespace แล้ว

### 6.2 เชื่อม Domain กับ Vercel

1. ไปที่ Vercel Dashboard → Project → **Settings** → **Domains**
2. พิมพ์ domain ที่ซื้อมา (เช่น `tle-dev.com`)
3. คลิก **"Add"**
4. Vercel จะแสดงค่า DNS records ที่ต้องตั้ง:

```
Type: A       Name: @    Value: 76.76.21.21
Type: CNAME   Name: www  Value: cname.vercel-dns.com
```

5. ไปที่เว็บผู้ขาย domain → ตั้ง DNS records ตามค่าด้านบน
6. ⏳ รอ 15 นาที - 48 ชั่วโมง (ปกติ ~15 นาที)
7. ✅ Vercel ออก SSL certificate ให้อัตโนมัติ (HTTPS ฟรี)

---

## 🔧 Troubleshooting

### ❌ เปิดเว็บแล้วเห็น 404

**สาเหตุ**: Vercel ไม่เจอ `index.html`
**วิธีแก้**:
1. ตรวจสอบว่า `index.html` อยู่ที่ root ของ repo (ไม่ได้อยู่ใน subfolder)
2. ตรวจ `vercel.json` ว่าค่า `Output Directory` ถูกต้อง
3. ถ้าไฟล์อยู่ใน subfolder → ตั้ง **Root Directory** ใน Vercel Dashboard ให้ตรงกับ path

### ❌ รูปภาพไม่แสดง

**สาเหตุ**: ชื่อไฟล์มี space หรือตัวพิมพ์เล็ก/ใหญ่ไม่ตรง
**วิธีแก้**:
1. เปลี่ยนชื่อรูปไม่ให้มี space (เช่น `IMG 3880.jpg` → `IMG_3880.jpg`)
2. ตรวจสอบ path ในโค้ดให้ตรงกับชื่อไฟล์จริง (case-sensitive)

### ❌ Project detail page ขึ้น "Project not found"

**สาเหตุ**: URL parameter `?slug=xxx` ไม่ตรงกับค่าใน `projects.js`
**วิธีแก้**:
1. ตรวจสอบค่า `slug` ในไฟล์ `data/projects.js`
2. ดู URL ว่า slug ตรงกันหรือไม่

### ❌ Git push ไม่ได้ / ขอ password

**วิธีแก้**:
1. ไปที่ GitHub → Settings → Developer Settings → Personal Access Tokens
2. คลิก **"Generate new token (classic)"**
3. เลือก scope: `repo` (ติ๊กถูก)
4. Copy token ที่ได้ → ใช้แทน password ตอน push

### ❌ Vercel build ล้มเหลว

**วิธีแก้**:
1. ดู Build Logs ใน Vercel Dashboard
2. สำหรับ Static site: ตรวจว่า **Build Command** ปล่อยว่าง หรือเป็น `echo "static"`
3. ตรวจว่า **Framework Preset** ตั้งเป็น `Other`

---

## 🔐 Security Checklist

- [ ] ไม่เคย commit ไฟล์ `.env` ขึ้น GitHub
- [ ] `SUPABASE_SERVICE_ROLE_KEY` ตั้งใน Vercel Dashboard เท่านั้น
- [ ] Storage Bucket ตั้ง policy เฉพาะ `SELECT` (อ่านอย่างเดียง) สำหรับ public
- [ ] ตรวจสอบว่า `.gitignore` ไม่ให้ push ไฟล์ sensitive

---

## 📋 Quick Reference: คำสั่งที่ใช้บ่อย

```bash
# อัปเดตเว็บหลังจากแก้ไขข้อมูล
cd "/Users/floridae/Portfolio(Tle)/MyPortfolio"
git add .
git commit -m "Update: เพิ่มโปรเจกต์ใหม่"
git push

# Vercel จะ deploy อัตโนมัติทุกครั้งที่ push! 🎉
```

---

## 📊 วิธีเพิ่มข้อมูลใหม่ (ไม่ต้องแตะ HTML)

| ต้องการเพิ่ม | แก้ไฟล์ | ทำอะไร |
|-------------|--------|-------|
| โปรเจกต์ใหม่ | `data/projects.js` | Copy โปรเจกต์ที่มี → เปลี่ยนข้อมูล |
| Certificate/Workshop | `data/self-development.js` | Copy template ด้านล่างไฟล์ → ใส่ข้อมูล + path รูป |
| รางวัล | `data/awards.js` | เพิ่ม object ใหม่ด้วย title, organization, date |
| กิจกรรม | `data/activities.js` | Copy template ด้านล่างไฟล์ → ใส่ข้อมูล |

แล้วรัน:
```bash
git add . && git commit -m "เพิ่มข้อมูล" && git push
```

---

> 📝 **สรุป**: เว็บของคุณตอนนี้พร้อม deploy ได้เลย! แค่ push ขึ้น GitHub → Vercel จัดการให้อัตโนมัติ ส่วน Supabase เก็บไว้สำหรับเมื่อจะอัปเกรดเป็นระบบ dynamic ในอนาคตครับ
