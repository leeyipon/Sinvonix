import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const applications = await prisma.jobApplication.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      portfolio: true,
      message: true,
      resumeName: true,
      createdAt: true,
    },
  });
  return NextResponse.json({ applications });
}
