import { Navbar } from "./navbar";
import { Footer } from "./shared";
import { Hero } from "./hero";
import { SubVimeFeatures } from "./subvime-features";

export const Landing = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-accent/30">
      <Navbar />
      <Hero />
      <SubVimeFeatures />
      <Footer />
    </div>
  );
};
