import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { caseStudies, getCaseStudy } from "@/lib/work";
import { CaseStudyHero } from "@/components/work/case-study-hero";
import { CaseStudyBody } from "@/components/work/case-study-body";
import { ServiceCTA } from "@/components/services/service-cta";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) return {};

  return {
    title: `${cs.name} — Case Study`,
    description: cs.summary,
    openGraph: {
      title: `${cs.name} · Nimbus`,
      description: cs.summary,
    },
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const cs = getCaseStudy(slug);
  if (!cs) notFound();

  return (
    <>
      <CaseStudyHero slug={slug} />
      <CaseStudyBody slug={slug} />
      <ServiceCTA title={cs.name} />
    </>
  );
}
