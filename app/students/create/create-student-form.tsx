"use client";

import { useActionState } from "react";
import Link from "next/link";

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

type CreateStudentFormProps = {
  action: (state: FormState, formData: FormData) => Promise<FormState>;
};

const initialState: FormState = {
  success: false,
  errors: {},
};

export default function CreateStudentForm({ action }: CreateStudentFormProps) {
  const [state, formAction, isPending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-5">
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
          placeholder="เช่น 66010001"
          required
          className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
        {state.errors?.studentCode && (
          <p className="mt-1.5 text-xs font-medium text-red-500">
            {state.errors.studentCode[0]}
          </p>
        )}
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
          placeholder="เช่น สมชาย ใจดี"
          required
          className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
        {state.errors?.name && (
          <p className="mt-1.5 text-xs font-medium text-red-500">
            {state.errors.name[0]}
          </p>
        )}
      </div>

      {/* อีเมล */}
      <div>
        <label
          htmlFor="email"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          อีเมล (Email)
        </label>
        <input
          id="email"
          type="email"
          name="email"
          placeholder="student@example.com"
          className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
        {state.errors?.email && (
          <p className="mt-1.5 text-xs font-medium text-red-500">
            {state.errors.email[0]}
          </p>
        )}
      </div>

      {/* สาขาวิชา Dropdown */}
      <div>
        <label
          htmlFor="major"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          สาขาวิชา <span className="text-red-500">*</span>
        </label>
        <select
          id="major"
          name="major"
          className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        >
          <option value="Computer and Information Science">Computer and Information Science</option>
          <option value="Artificial Intelligence and Data Science">Artificial Intelligence and Data Science</option>
          <option value="International Economics, Innovation and Sustainability">International Economics, Innovation and Sustainability</option>
          <option value="Sports and Exercise Science">Sports and Exercise Science</option>
          <option value="English for Business Communication">English for Business Communication</option>
          <option value="Tourism and Service Innovation">Tourism and Service Innovation</option>
        </select>
        {state.errors?.major && (
          <p className="mt-1.5 text-xs font-medium text-red-500">
            {state.errors.major[0]}
          </p>
        )}
      </div>

      {/* ชั้นปี */}
      <div>
        <label
          htmlFor="year"
          className="mb-1.5 block text-sm font-medium text-slate-700"
        >
          ชั้นปี <span className="text-red-500">*</span>
        </label>
        <input
          id="year"
          type="number"
          name="year"
          min="1"
          max="4"
          placeholder="1-4"
          required
          className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder-slate-400 shadow-sm transition-all focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
        />
        {state.errors?.year && (
          <p className="mt-1.5 text-xs font-medium text-red-500">
            {state.errors.year[0]}
          </p>
        )}
      </div>

      {/* ปุ่มบันทึกข้อมูล และ ปุ่มยกเลิก */}
      <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
        <button
          type="submit"
          disabled={isPending}
          className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-500/20 transition-all hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 active:scale-[0.99] disabled:bg-blue-300 disabled:cursor-not-allowed"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <svg
                className="h-4 w-4 animate-spin text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              กำลังบันทึก...
            </span>
          ) : (
            "บันทึกข้อมูล"
          )}
        </button>

        <Link
          href="/students"
          className="rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition-all hover:bg-slate-50 active:scale-[0.99]"
        >
          ยกเลิก
        </Link>
      </div>
    </form>
  );
}