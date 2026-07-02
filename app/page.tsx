import { cookies } from "next/headers";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AgeGate } from "@/components/layout/AgeGate";
import { Hero } from "@/components/sections/Hero";
import { TrustStrip } from "@/components/sections/TrustStrip";
import { RakijeCarousel } from "@/components/sections/RakijeCarousel";
import { B2BSection } from "@/components/sections/B2BSection";
import { BentoCrossroads } from "@/components/sections/BentoCrossroads";
import { About } from "@/components/sections/About";
import { Proof } from "@/components/sections/Proof";
import { HowToOrder } from "@/components/sections/HowToOrder";
import { BlogTeaser } from "@/components/sections/BlogTeaser";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { StructuredData } from "@/components/seo/StructuredData";
import { getRakije, getFaqs } from "@/sanity/queries";

export default async function Home() {
  const cookieStore = await cookies();
  const ageOk = cookieStore.get("maodus_age_ok")?.value === "1";

  const [rakije, faqs] = await Promise.all([getRakije(), getFaqs()]);

  return (
    <>
      <StructuredData rakije={rakije} faqs={faqs} />
      <AgeGate defaultOpen={!ageOk} />
      <Header />
      <main>
        <Hero />
        <TrustStrip />
        <RakijeCarousel items={rakije} />
        <B2BSection />
        <BentoCrossroads />
        <About />
        <Proof />
        <HowToOrder />
        <BlogTeaser />
        <Faq items={faqs} />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
