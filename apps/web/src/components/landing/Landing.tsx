import { Navbar } from "./navbar";
import { Footer } from "./shared";
import { Hero } from "./hero";
import { SubVimeFeatures } from "./subvime-features";

// Original tunnel marketing sections — kept for reference, not shown on SubVime landing.
// import { DeveloperExperience } from "./developer-experience";
// import { NetworkDiagram } from "./network-diagram";
// import { BringYourOwnDomain } from "./bring-your-own-domain";
// import { MultipleProtocols } from "./multiple-protocols";
// import { OpenSource } from "./opensource";
// import { LocalAccess } from "./local-access";

export const Landing = () => {
  return (
    <>
      <div className="min-h-screen bg-black text-white selection:bg-accent/30">
        <Navbar />

        <Hero />

        <SubVimeFeatures />

        {/* --- Original OutRay / tunnel landing sections (commented out) ---
        <div className="py-24 border-white/5">
          <DeveloperExperience />
        </div>
        <NetworkDiagram />
        <BringYourOwnDomain />
        <LocalAccess />
        <MultipleProtocols />
        <OpenSource />
        --- end original sections --- */}

        <Footer />
      </div>
    </>
  );
};
