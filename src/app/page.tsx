import { Hero } from "@/components/sections/hero";
import { PlatformHub } from "@/components/sections/platform-hub";
import { Services } from "@/components/sections/services";
import { WhyUs } from "@/components/sections/why-us";
import { Process } from "@/components/sections/process";
import { CTA } from "@/components/sections/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <PlatformHub />
      <Services />
      <WhyUs />
      <Process />
      <CTA />
    </>
  );
}
