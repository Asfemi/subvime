import { Navbar } from "./navbar";
import { Footer } from "./shared";
import { Hero } from "./hero";
import { SubVimeFeatures } from "./subvime-features";
import { FeaturedChecklistsSection } from "@/components/subvime/featured-checklists-section";

export const Landing = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-accent/30">
      <Navbar />
      <Hero />
      <section className="mx-auto max-w-7xl px-6 pb-6">
        <FeaturedChecklistsSection className="mb-0" />
      </section>
      <SubVimeFeatures />
      <Footer />
    </div>
  );
};
