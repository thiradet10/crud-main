import prisma from "@/app/lib/prisma";
import { redirect } from "next/navigation";
import Link from "next/link";
import { studentSchema } from "../validation";
import CreateStudentForm from "./create-student-form";

type FormState = {
  success: boolean;
  errors?: {
    studentCode?: string[];
    name?: string[];
    email?: string[];
    major?: string[];
    year?: string[];
  };
};

async function createStudent(
  state: FormState,
  formData: FormData
): Promise<FormState> {
  "use server";

  const result = studentSchema.safeParse({
    studentCode: formData.get("studentCode"),
    name: formData.get("name"),
    email: formData.get("email") ?? "",
    major: formData.get("major"),
    year: Number(formData.get("year")),
  });

  if (!result.success) {
    return {
      success: false,
      errors: result.error.flatten().fieldErrors,
    };
  }

  try {
    await prisma.student.create({
      data: result.data,
    });
  } catch {
    return {
      success: false,
      errors: {
        studentCode: ["รหัสนักศึกษานี้มีอยู่แล้วในระบบ"],
      },
    };
  }

  redirect("/students");
}

export default function CreateStudentPage() {
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
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600 shadow-sm">
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
                    d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  เพิ่มนักศึกษาใหม่
                </h1>
                <p className="text-sm text-slate-500">
                  กรอกข้อมูลนักศึกษาเพื่อบันทึกลงในระบบ
                </p>
              </div>
            </div>
          </div>

          <CreateStudentForm action={createStudent} />
        </div>
      </div>
    </main>
  );
}