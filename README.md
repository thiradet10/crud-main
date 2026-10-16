# 🎓 Student Management System (ระบบจัดการข้อมูลนักศึกษา)

แอปพลิเคชันระบบจัดการข้อมูลนักศึกษา พัฒนาด้วย **Next.js (App Router)** พร้อมระบบพิสูจน์ตัวตน การกำหนดสิทธิ์ผู้ใช้งาน และบริการ REST API แบบเต็มรูปแบบ

👨‍💻 ผู้จัดทำ 
ชื่อ-นามสกุล: นาย ธีรเดช ประสารสุข
รหัสนักศึกษา: 673450195-4
---

## ✨ คุณสมบัติหลักของระบบ (Key Features)

### 1. 🔄 CRUD Operations (การจัดการข้อมูลครบวงจร)
- **Read (แสดงรายการ):** แสดงตารางรายชื่อนักศึกษาพร้อมข้อมูลรหัส ชื่อ อีเมล สาขาวิชา ชั้นปี (1–4) และสถานะ
- **Create (บันทึกข้อมูล):** แบบฟอร์มเพิ่มนักศึกษาใหม่ รองรับ Controlled Select สำหรับสาขาวิชาและชั้นปี
- **Update (แก้ไขข้อมูล):** แก้ไขข้อมูลนักศึกษารายบุคคล ดึงค่าเดิมมาแสดงในตัวเลือกอัตโนมัติ
- **Delete (ลบข้อมูล):** ลบข้อมูลนักศึกษาออกจากฐานข้อมูล (สงวนสิทธิ์เฉพาะผู้ใช้สิทธิ์ ADMIN)

### 2. ✅ Data Validation (การตรวจสอบความถูกต้องของข้อมูล)
- ตรวจสอบความถูกต้องของข้อมูลฝั่ง Server-side และ Client-side ด้วย **Zod**
- ตรวจสอบรูปแบบ Email, รหัสนักศึกษาซ้ำ, การจำกัดช่วงชั้นปี (เฉพาะปี 1–4) และการกรอกข้อมูลที่จำเป็น (*Required fields)
- แสดงข้อความแจ้งเตือน Error ที่เข้าใจง่ายใต้ช่องกรอกข้อมูลแต่ละช่อง

### 3. 🔐 Authentication & Authorization (ระบบยืนยันตัวตนและกำหนดสิทธิ์)
- **Authentication:**
  - รองรับการเข้าสู่ระบบด้วย **Credentials (Email & Password)**
  - รองรับการเข้าสู่ระบบด้วย **GitHub OAuth**
  - ระบบสมัครสมาชิก (Sign Up) พร้อมการ hashing รหัสผ่านเพื่อความปลอดภัย
- **Authorization (Role-Based Access Control - RBAC):**
  - **USER (ผู้ใช้ทั่วไป):** ดูรายการ ค้นหา เพิ่ม และแก้ไขข้อมูลนักศึกษาได้
  - **ADMIN (ผู้ดูแลระบบ):** ได้รับสิทธิ์ในการลบข้อมูลนักศึกษา (`DELETE`) ผ่าน UI และ API Route Gating

### 4. 🌐 REST API Services (บริการ API)
ให้บริการ Endpoints ครบถ้วนตามมาตรฐาน REST API บน `app/api/students/`:
- **`GET /api/students`** - ดึงรายการนักศึกษาทั้งหมด
- **`POST /api/students`** - เพิ่มข้อมูลนักศึกษาใหม่
- **`PUT /api/students/[id]`** - อัปเดตข้อมูลนักศึกษาตาม ID
- **`DELETE /api/students/[id]`** - ลบข้อมูลนักศึกษาตาม ID (มีการตรวจสอบ Session & Role ADMIN)

### 5. 🔍 Search & Filter (การค้นหาและกรองข้อมูล)
- **Search:** ค้นหาข้อมูลนักศึกษาแบบเรียลไทม์จาก **รหัสนักศึกษา** หรือ **ชื่อ-นามสกุล**
- **Filter:** กรองรายการนักศึกษาตาม **สาขาวิชา** และ **สถานะการศึกษา (กำลังศึกษา / พ้นสภาพ)**
- รองรับการค้นหาแบบผสมผสาน (Search + Filter) พร้อมปุ่มล้างคำค้นหา

---

## 🛠️ เทคโนโลยีที่ใช้ (Tech Stack)

- **Framework:** [Next.js 15+](https://nextjs.org/) (App Router)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Database ORM:** [Prisma ORM](https://www.prisma.io/)
- **Authentication:** [NextAuth.js v5](https://authjs.dev/)
- **Data Validation:** [Zod](https://zod.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)

---

## 🚀 การติดตั้งและการใช้งาน (Installation Guide)

### 1. ความต้องการของระบบ (Prerequisites)
- **Node.js:** v18.x ขึ้นไป
- **npm** / **yarn** / **pnpm**

### 2. การติดตั้งโปรเจกต์ (Clone & Install)

```bash
# Clone Repository
git clone <YOUR_GITHUB_REPO_URL>

# เข้าไปยังโฟลเดอร์โปรเจกต์
cd <PROJECT_FOLDER_NAME>

# ติดตั้ง Dependencies
npm install
