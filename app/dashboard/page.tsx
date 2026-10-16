import { auth } from "@/app/auth";
import prisma from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

export default async function DashboardPage() {
  // 1. ตรวจสอบ Authentication
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const user = session.user as { name?: string | null; email?: string | null; role?: string };

  // 2. ดึงข้อมูลสถิติต่างๆ จากฐานข้อมูลผ่าน Prisma
  const totalStudents = await prisma.student.count();

  // ดึงรายชื่อสาขาที่ไม่ซ้ำเพื่อจัดกลุ่มนับจำนวนสาขา
  const majors = await prisma.student.groupBy({
    by: ["major"],
  });

  // ดึงนักศึกษาที่เพิ่มล่าสุด 5 รายการ
  const recentStudents = await prisma.student.findMany({
    take: 5,
    orderBy: {
      id: "desc",
    },
  });

  return (
    <main className="min-h-screen bg-gray-50 p-6 md:p-10">
      <div className="mx-auto max-w-7xl space-y-8">
        {/* Header ส่วนต้อนรับ */}
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between border-b border-gray-200 pb-5">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="mt-1 text-sm text-gray-600">
              ยินดีต้อนรับคุณ <span className="font-semibold text-gray-800">{user.name || user.email}</span> 
              {" "}(สิทธิ์ใช้งาน: <span className="font-semibold text-blue-600">{user.role || "USER"}</span>)
            </p>
          </div>

          <div className="flex gap-3">
            <Link
              href="/students/create"
              className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow hover:bg-blue-700 transition"
            >
              + เพิ่มนักศึกษา
            </Link>
            <Link
              href="/students"
              className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 transition"
            >
              รายชื่อนักศึกษาทั้งหมด
            </Link>
          </div>
        </div>

        {/* Stat Cards แสดงสถิติสรุป */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {/* Card 1: นักศึกษาทั้งหมด */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">นักศึกษาทั้งหมด</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{totalStudents}</p>
              </div>
              <div className="rounded-lg bg-blue-50 p-3 text-blue-600 font-bold">
                👥
              </div>
            </div>
            <p className="mt-4 text-xs text-gray-500">จำนวนนักศึกษาทั้งหมดที่บันทึกในระบบ</p>
          </div>

          {/* Card 2: จำนวนสาขาวิชา */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">สาขาวิชาเปิดสอน</p>
                <p className="mt-2 text-3xl font-bold text-gray-900">{majors.length}</p>
              </div>
              <div className="rounded-lg bg-green-50 p-3 text-green-600 font-bold">
                🎓
              </div>
            </div>
            <p className="mt-4 text-xs text-gray-500">จำนวนสาขาที่มีนักศึกษาสังกัดอยู่</p>
          </div>

          {/* Card 3: สิทธิ์การใช้งาน */}
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">สถานะผู้ดูแล</p>
                <p className="mt-2 text-xl font-bold text-gray-900">
                  {user.role === "ADMIN" ? "ผู้ดูแลระบบ (ADMIN)" : "ผู้ใช้งานทั่วไป"}
                </p>
              </div>
              <div className="rounded-lg bg-purple-50 p-3 text-purple-600 font-bold">
                🛡️
              </div>
            </div>
            <p className="mt-4 text-xs text-gray-500">{user.email}</p>
          </div>
        </div>

        {/* ตารางแสดงนักศึกษาเพิ่มล่าสุด */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">นักศึกษาที่เพิ่มล่าสุด</h2>
            <Link href="/students" className="text-sm font-medium text-blue-600 hover:underline">
              ดูทั้งหมด &rarr;
            </Link>
          </div>

          {recentStudents.length === 0 ? (
            <p className="py-6 text-center text-sm text-gray-500">ยังไม่มีข้อมูลนักศึกษาในระบบ</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm text-gray-600">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700">
                  <tr>
                    <th className="px-4 py-3">รหัสนักศึกษา</th>
                    <th className="px-4 py-3">ชื่อ-นามสกุล</th>
                    <th className="px-4 py-3">สาขาวิชา</th>
                    <th className="px-4 py-3">ชั้นปี</th>
                    <th className="px-4 py-3">อีเมล</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 border-t border-gray-200">
                  {recentStudents.map((student) => (
                    <tr key={student.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-medium text-gray-900">{student.studentCode}</td>
                      <td className="px-4 py-3">{student.name}</td>
                      <td className="px-4 py-3">{student.major}</td>
                      <td className="px-4 py-3">ชั้นปีที่ {student.year}</td>
                      <td className="px-4 py-3">{student.email || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}