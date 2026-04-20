# ✅ Deployment Checklist สำหรับ Vercel

## 🎯 ขั้นตอนการ Deploy ทีละขั้น

### ขั้นที่ 1: เตรียม Git Repository ✅

```bash
# ไปที่โฟลเดอร์ project
cd "/Users/floridae/Portfolio(Tle)/MyPortfolio"

# เริ่ม git
git init

# เพิ่มไฟล์ทั้งหมด
git add .

# Commit
git commit -m "Initial commit - Portfolio ready for Vercel deployment"
```

### ขั้นที่ 2: สร้าง Database บน Supabase ✅

1. ไปที่ https://supabase.com
2. Sign Up / Log In
3. Create New Project
   - Project Name: `portfolio-db`
   - Database Password: (สร้างรหัสผ่านที่แข็งแรง)
   - Region: Select region ที่ใกล้ที่สุด
4. รอให้ Project สร้างเสร็จ (ประมาณ 2-3 นาที)

### ขั้นที่ 3: เพิ่ม Database Tables ✅

1. ไปที่ Supabase Dashboard > SQL Editor
2. Click "New Query"
3. Copy-Paste เนื้อหาจาก `init-db.sql`
4. Click "Run"
5. ต้องเห็น "Success" message

### ขั้นที่ 4: ได้รับ Connection String ✅

1. ไปที่ Supabase Dashboard > Settings > Database
2. ค้นหา "Connection string"
3. เลือก "URI" format
4. Copy Connection String (จะมีลักษณะประมาณนี้):
   ```
   postgresql://postgres:YOUR_PASSWORD@db.YOUR_REFERENCE_ID.supabase.co:5432/postgres
   ```

### ขั้นที่ 5: Push Code ไป GitHub ✅

```bash
# Create repository บน GitHub
# ไปที่ https://github.com/new
# ชื่อ: portfolio
# Description: My Developer Portfolio

# Add remote
git remote add origin https://github.com/YOUR_USERNAME/portfolio.git

# Rename branch ถ้าจำเป็น
git branch -M main

# Push code
git push -u origin main
```

### ขั้นที่ 6: Setup Vercel Project ✅

**วิธีที่ 1: ผ่าน Web Dashboard (ง่ายที่สุด)**
1. ไปที่ https://vercel.com
2. Sign Up / Log In ด้วย GitHub account
3. Click "New Project"
4. Import repository จาก GitHub
5. เลือก `portfolio` repository
6. Click "Import"

**วิธีที่ 2: ผ่าน CLI (สำหรับผู้ชำนาญ)**
```bash
npm install -g vercel  # ถ้ายังไม่ติดตั้ง
vercel
```

### ขั้นที่ 7: ตั้งค่า Environment Variables ✅

1. ไปที่ Vercel Dashboard > Settings > Environment Variables
2. เพิ่ม Environment Variables ตามข้อมูล Connection String:

| Variable | Value | หมายเหตุ |
|----------|-------|---------|
| `DB_HOST` | `db.YOUR_ID.supabase.co` | ดึงจาก Connection String |
| `DB_PORT` | `5432` | Standard PostgreSQL port |
| `DB_USER` | `postgres` | Default user |
| `DB_PASSWORD` | `YOUR_PASSWORD` | Password ที่สร้างใน Supabase |
| `DB_NAME` | `postgres` | Default database |
| `NODE_ENV` | `production` | ตั้งไว้ให้ production |

**วิธีแยก Connection String:**
```
postgresql://postgres:YOUR_PASSWORD@db.YOUR_ID.supabase.co:5432/postgres
             └─────────────────────────────────────────────────────┘
             ของ Environment Variables ด้านบน
```

3. Save Environment Variables

### ขั้นที่ 8: ตั้งค่า Firewall (Supabase) ✅

1. ไปที่ Supabase > Settings > Database
2. ค้นหา "Firewall" section
3. ตัวเลือก:
   - **ปลอดภัยสูง**: เพิ่ม Vercel IP addresses
   - **ปกติ**: ปิด Firewall ชั่วคราว (ทีหลังเปิดอีก)
4. ถ้ากำลังพัฒนา: สามารถปิด Firewall ได้

### ขั้นที่ 9: Deploy! ✅

**ผ่าน Web Dashboard:**
1. ไปที่ Vercel Dashboard
2. Select Project
3. Click "Deployments" tab
4. ควรจะเห็น automatic deployment จาก git push

**หรือผ่าน CLI:**
```bash
vercel --prod
```

### ขั้นที่ 10: ทดสอบ Deployment ✅

รอให้ deployment เสร็จ (ประมาณ 1-2 นาที)

```bash
# ทดสอบ Health Check
curl https://your-vercel-url.vercel.app/health

# ดึงข้อมูล Projects
curl https://your-vercel-url.vercel.app/api/projects

# ดึงข้อมูล Certificates  
curl https://your-vercel-url.vercel.app/api/certificates
```

---

## 🔍 Troubleshooting

### ❌ Error: "Cannot connect to database"
**วิธีแก้:**
- ✓ ตรวจสอบ Environment Variables ใน Vercel Dashboard
- ✓ ยืนยัน Connection String จาก Supabase เป็นตัวอักษร
- ✓ ตรวจสอบ Supabase Firewall settings
- ✓ ลอง disable Firewall ชั่วคราว

### ❌ Error: "503 Service Unavailable"
**วิธีแก้:**
- ✓ ดู Vercel Logs > Functions
- ✓ เพิ่ม timeout ใน `vercel.json`
- ✓ ตรวจสอบ Database connection pool

### ❌ Error: "CORS error"
**วิธีแก้:**
- ✓ CORS middleware อยู่ใน `api/index.js` แล้ว
- ✓ ตรวจสอบ frontend requests origin

### ❌ Static files (HTML/CSS) ไม่ load
**วิธีแก้:**
- ✓ ตรวจสอบ `vercel.json` rewrites section
- ✓ ยืนยันว่า `public` directory มี `index.html`

---

## 📊 Verifying Everything Works

### Health Check
```bash
curl https://your-domain.vercel.app/health
# ควรได้ response: {"status": "Server is running", "timestamp": "..."}
```

### API Endpoints
```bash
# Projects
curl https://your-domain.vercel.app/api/projects

# Certificates
curl https://your-domain.vercel.app/api/certificates
```

### Frontend
- เปิด https://your-domain.vercel.app
- ตรวจสอบว่า page loads correctly
- ตรวจสอบ Console สำหรับ errors

---

## 🔄 Continuous Deployment

**Auto Deploy จาก GitHub:**
- Vercel จะ auto deploy ทุกครั้งที่ push code ไป main branch
- ดู Deployments tab ใน Vercel Dashboard เพื่อติดตามสถานะ

**Manual Deploy:**
```bash
git push origin main
# Vercel จะ auto deploy
```

---

## 🎊 ยินดีด้วย!

Portfolio ของคุณ deploy สำเร็จแล้ว! 🚀

**URL ของคุณ:**
```
https://your-project-name.vercel.app
```

---

## �� เอกสารอ้างอิง

- Vercel Docs: https://vercel.com/docs
- Supabase Docs: https://supabase.com/docs
- Express API: https://expressjs.com/api.html
- PostgreSQL: https://www.postgresql.org/docs/

