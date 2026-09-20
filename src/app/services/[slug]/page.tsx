import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, getService } from "@/lib/site";
import { ServiceHero } from "@/components/services/service-hero";
import { ServiceDeliverables } from "@/components/services/service-deliverables";
import { ServiceApproach } from "@/components/services/service-approach";
import { ServiceTech } from "@/components/services/service-tech";
import { ServiceOutcomes } from "@/components/services/service-outcomes";
import { ServiceFaq } from "@/components/services/service-faq";
import { ServiceCTA } from "@/components/services/service-cta";

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};

  const description = `${service.tagline} ${service.blurb}`;
  return {
    title: service.title,
    description,
    openGraph: {
      title: `${service.title} · Sinvonix`,
      description,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <ServiceHero slug={slug} />
      <ServiceDeliverables slug={slug} />
      <ServiceApproach slug={slug} />
      <ServiceTech slug={slug} />
      <ServiceOutcomes slug={slug} />
      <ServiceFaq slug={slug} />
      <ServiceCTA title={service.title} />
    </>
  );
}
