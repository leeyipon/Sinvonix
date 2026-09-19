import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const application = await prisma.jobApplication.findUnique({
    where: { id },
    select: { resumeName: true, resumeType: true, resumeData: true },
  });

  if (!application?.resumeData) {
    return NextResponse.json({ error: "No resume on file" }, { status: 404 });
  }

  return new NextResponse(Buffer.from(application.resumeData), {
    headers: {
      "Content-Type": application.resumeType || "application/octet-stream",
      "Content-Disposition": `attachment; filename="${(application.resumeName || "resume").replace(/"/g, "")}"`,
    },
  });
}
