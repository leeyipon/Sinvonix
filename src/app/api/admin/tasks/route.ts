import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const tasks = await prisma.task.findMany({ orderBy: { id: "asc" } });
  return NextResponse.json({ tasks });
}
