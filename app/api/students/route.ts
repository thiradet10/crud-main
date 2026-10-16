import prisma from "@/app/lib/prisma";
import { NextResponse } from "next/server";
import { studentSchema } from "@/app/students/validation";

// GET: ดึงข้อมูลนักศึกษาทั้งหมด
export async function GET() {
  try {
    const students = await prisma.student.findMany({
      orderBy: {
        id: "asc",
      },
    });

    return NextResponse.json(students);
  } catch {
    return NextResponse.json(
      { message: "ไม่สามารถดึงข้อมูลนักศึกษาได้" },
      { status: 500 }
    );
  }
}

// POST: เพิ่มข้อมูลนักศึกษาใหม่พร้อม Validation
export async function POST(request: Request) {
  try {
    const body = await request.json();

    const result = studentSchema.safeParse({
      studentCode: body.studentCode,
      name: body.name,
      email: body.email ?? "",
      major: body.major,
      year: Number(body.year),
    });

    if (!result.success) {
      return NextResponse.json(
        {
          message: "ข้อมูลไม่ถูกต้อง",
          errors: result.error.flatten().fieldErrors,
        },
        {
          status: 400,
        }
      );
    }

    const student = await prisma.student.create({
      data: result.data,
    });

    return NextResponse.json(student, {
      status: 201,
    });
  } catch {
    return NextResponse.json(
      {
        message: "ไม่สามารถสร้างข้อมูลนักศึกษาได้",
      },
      {
        status: 500,
      }
    );
  }
}