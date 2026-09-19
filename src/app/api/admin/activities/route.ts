import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const activities = await prisma.activity.findMany({
    orderBy: { at: "desc" },
    take: 20,
  });
  return NextResponse.json({ activities });
}
