import { AboutSection } from "./_lib/components/AboutSection";
import { AddressSection } from "./_lib/components/AddressSection";
import { ContactSection } from "./_lib/components/ContactSection";
import { FooterSection } from "./_lib/components/FooterSection";
import { PartnersSection } from "./_lib/components/PartnersSection";
import { RequestContainer } from "./_lib/components/RequestContainer";

export default function Home() {
  return (
    <div className="flex w-full h-full bg-[#F4F4F5] flex-col">
      <RequestContainer />

      <AboutSection />

      <ContactSection />

      <PartnersSection />

      <AddressSection />

      <FooterSection />
    </div>
  );
}
