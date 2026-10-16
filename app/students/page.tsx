import prisma from "@/app/lib/prisma";
import SearchForm from "./search-form";
import DeleteButton from "./delete-button";
import Link from "next/link";

type StudentsPageProps = {
  searchParams: Promise<{
    search?: string;
    major?: string;
    status?: string;
  }>;
};

export default async function StudentsPage({
  searchParams,
}: StudentsPageProps) {
  const params = await searchParams;

  const search = params.search ?? "";
  const major = params.major ?? "";
  const status = params.status ?? "";

  const students = await prisma.student.findMany({
    where: {
      AND: [
        search
          ? {
              OR: [
                {
                  studentCode: {
                    contains: search,
                  },
                },
                {
                  name: {
                    contains: search,
                  },
                },
              ],
            }
          : {},

        major
          ? {
              major: major,
            }
          : {},

        status
          ? {
              status: status === "active",
            }
          : {},
      ],
    },

    orderBy: {
      id: "asc",
    },
  });

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-gray-50 to-slate-100 p-4 sm:p-6 md:p-10">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Header ส่วนหัว */}
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-200/80 pb-5">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">
              Student Management
            </h1>
            <p className="mt-1 text-sm text-slate-500">
              จัดการข้อมูลนักศึกษา ค้นหา และแก้ไขรายการ
            </p>
          </div>
        </div>

        {/* ฟอร์มค้นหาข้อมูล */}
        <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-xl shadow-slate-200/50">
          <SearchForm search={search} major={major} status={status} />
        </div>

        {/* แถบสรุปจำนวนข้อมูล และ ปุ่มเพิ่มนักศึกษา */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-sm font-medium text-slate-600">
            พบข้อมูลทั้งหมด{" "}
            <span className="font-bold text-blue-600">{students.length}</span>{" "}
            รายการ
          </div>

          <div>
            <Link
              href="/students/create"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 active:scale-[0.99]"
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
                  d="M12 4.5v15m7.5-7.5h-15"
                />
              </svg>
              เพิ่มนักศึกษา
            </Link>
          </div>
        </div>

        {/* ตารางแสดงข้อมูลนักศึกษา */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-xl shadow-slate-200/50">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-slate-600">
              <thead className="border-b border-slate-200/80 bg-slate-50/80 text-xs uppercase tracking-wider font-semibold text-slate-700">
                <tr>
                  <th className="px-5 py-4">รหัส</th>
                  <th className="px-5 py-4">ชื่อ</th>
                  <th className="px-5 py-4">Email</th>
                  <th className="px-5 py-4">สาขา</th>
                  <th className="px-5 py-4">ชั้นปี</th>
                  <th className="px-5 py-4">สถานะ</th>
                  <th className="px-5 py-4 text-center">จัดการ</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {students.map((student) => (
                  <tr
                    key={student.id}
                    className="transition-colors hover:bg-slate-50/80"
                  >
                    <td className="px-5 py-4 font-semibold text-slate-900 whitespace-nowrap">
                      {student.studentCode}
                    </td>

                    <td className="px-5 py-4 font-medium text-slate-800 whitespace-nowrap">
                      {student.name}
                    </td>

                    <td className="px-5 py-4 text-slate-500 whitespace-nowrap">
                      {student.email ?? "-"}
                    </td>

                    <td className="px-5 py-4 text-slate-700 whitespace-nowrap">
                      {student.major}
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-700">
                        ชั้นปีที่ {student.year}
                      </span>
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      {student.status ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700 border border-emerald-200/60">
                          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500"></span>
                          กำลังศึกษา
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-rose-50 px-2.5 py-1 text-xs font-medium text-rose-700 border border-rose-200/60">
                          <span className="h-1.5 w-1.5 rounded-full bg-rose-500"></span>
                          พ้นสภาพ
                        </span>
                      )}
                    </td>

                    <td className="px-5 py-4 whitespace-nowrap">
                      <div className="flex items-center justify-center gap-2">
                        <Link
                          href={`/students/edit/${student.id}`}
                          className="inline-flex items-center rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm shadow-amber-500/20 hover:bg-amber-600 transition-all active:scale-95"
                        >
                          แก้ไข
                        </Link>

                        <DeleteButton id={student.id} />
                      </div>
                    </td>
                  </tr>
                ))}

                {students.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="px-5 py-12 text-center text-slate-400"
                    >
                      <div className="flex flex-col items-center justify-center gap-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="h-8 w-8 text-slate-300"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                          />
                        </svg>
                        <p className="text-sm font-medium">ไม่พบข้อมูลนักศึกษา</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </main>
  );
}