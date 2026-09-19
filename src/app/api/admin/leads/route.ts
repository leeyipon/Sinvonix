import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const leads = await prisma.lead.findMany({ orderBy: { createdAt: "desc" } });
  return NextResponse.json({ leads });
}
