import prisma from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";

type EditStudentPageProps = {
  params: Promise<{
    id: string;
  }>;
};

async function updateStudent(studentId: number, formData: FormData) {
  "use server";

  const studentCode = formData.get("studentCode") as string;
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const major = formData.get("major") as string;
  const year = Number(formData.get("year"));

  await prisma.student.update({
    where: {
      id: studentId,
    },
    data: {
      studentCode,
      name,
      email: email || null,
      major,
      year,
    },
  });

  redirect("/students");
}

export default async function EditStudentPage({
  params,
}: EditStudentPageProps) {
  const { id } = await params;
  const studentId = Number(id);

  const student = await prisma.student.findUnique({
    where: {
      id: studentId,
    },
  });

  if (!student) {
    return (
      <main className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 p-4 sm:p-6 md:p-10 flex items-center justify-center">
        <div className="w-full max-w-md rounded-2xl border border-slate-200/80 bg-white p-8 text-center shadow-xl shadow-slate-200/60">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-rose-50 text-rose-600">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-6 w-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0zm-9 3.75h.008v.008H12v-.008z"
              />
            </svg>
          </div>
          <h1 className="text-xl font-bold text-slate-900">ไม่พบข้อมูลนักศึกษา</h1>
          <p className="mt-2 text-sm text-slate-500">
            ไม่พบข้อมูลนักศึกษา ID: {id} ในระบบ หรือข้อมูลอาจถูกลบไปแล้ว
          </p>
          <div className="mt-6">
            <Link
              href="/students"
              className="inline-flex items-center justify-center rounded-lg bg-slate-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-slate-800 transition-all"
            >
              กลับหน้ารายชื่อนักศึกษา
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 p-4 sm:p-6 md:p-10">
      <div className="mx-auto max-w-2xl">
        {/* ปุ่มย้อนกลับ */}
        <div className="mb-6">
          <Link
            href="/students"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-4 w-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
            ย้อนกลับไปหน้ารายชื่อ
          </Link>
        </div>

        {/* การ์ดแบบฟอร์ม */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-6 shadow-xl shadow-slate-200/60 sm:p-8">
          <div className="mb-8 border-b border-slate-100 pb-5">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600 shadow-sm">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className="h-6 w-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  แก้ไขนักศึกษา
                </h1>
                <p className="text-sm text-slate-500">
                  แก้ไขข้อมูลนักศึกษา ID: {student.id}
                </p>
              </div>
            </div>
          </div>

          <form
            action={async (formData) => {
              "use server";
              await updateStudent(studentId, formData);
            }}
            className="space-y-5"
          >
            {/* รหัสนักศึกษา */}
            <div>
              <label
                htmlFor="studentCode"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                รหัสนักศึกษา <span className="text-red-500">*</span>
              </label>
              <input
                id="studentCode"
                type="text"
                name="studentCode"
                defaultValue={student.studentCode}
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* ชื่อ-นามสกุล */}
            <div>
              <label
                htmlFor="name"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                ชื่อ-นามสกุล <span className="text-red-500">*</span>
              </label>
              <input
                id="name"
                type="text"
                name="name"
                defaultValue={student.name}
                required
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                defaultValue={student.email ?? ""}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>

            {/* สาขาวิชา */}
            <div>
              <label
                htmlFor="major"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                สาขา <span className="text-red-500">*</span>
              </label>
              <select
                id="major"
                name="major"
                defaultValue={student.major}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="Computer and Information Science">Computer and Information Science</option>
                <option value="Artificial Intelligence and Data Science">Artificial Intelligence and Data Science</option>
                <option value="International Economics, Innovation and Sustainability">International Economics, Innovation and Sustainability</option>
                <option value="Sports and Exercise Science">Sports and Exercise Science</option>
                <option value="English for Business Communication">English for Business Communication</option>
                <option value="Tourism and Service Innovation">Tourism and Service Innovation</option>
                {/* ตัวเลือกสาขาเดิมในฐานข้อมูล (ใส่ไว้เพื่อไม่ให้ดึงค่าเก่าแล้วเด้งเพี้ยน) */}
                <option value="Information Technology">Information Technology</option>
                <option value="Digital Technology">Digital Technology</option>
              </select>
            </div>

            {/* ชั้นปี */}
            <div>
              <label
                htmlFor="year"
                className="mb-1.5 block text-sm font-medium text-slate-700"
              >
                ชั้นปี <span className="text-red-500">*</span>
              </label>
              <select
                id="year"
                name="year"
                defaultValue={student.year}
                className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              >
                <option value="1">ชั้นปีที่ 1</option>
                <option value="2">ชั้นปีที่ 2</option>
                <option value="3">ชั้นปีที่ 3</option>
                <option value="4">ชั้นปีที่ 4</option>
              </select>
            </div>

            {/* ปุ่มดำเนินการ */}
            <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
              <button
                type="submit"
                className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 active:scale-[0.99]"
              >
                บันทึกการแก้ไข
              </button>

              <Link
                href="/students"
                className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-[0.99]"
              >
                ยกเลิก
              </Link>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}