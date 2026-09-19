import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET() {
  const deals = await prisma.deal.findMany({ orderBy: { closeDate: "asc" } });
  return NextResponse.json({ deals });
}
