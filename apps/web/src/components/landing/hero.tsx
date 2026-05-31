import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { Canvas } from "@react-three/fiber";
import { BeamGroup } from "./beam-group";

export const Hero = () => {
  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden pt-20">
      <div className="absolute inset-0 z-0 md:-translate-x-[10%]">
        <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
          <color attach="background" args={["#000000"]} />
          <BeamGroup />
        </Canvas>
      </div>

      <div className="flex flex-col gap-8 max-w-4xl mx-auto px-6 relative z-10 w-full items-center">
        <div className="flex flex-col gap-6 items-center mt-20">
          <motion.p
            className="text-sm uppercase tracking-[0.25em] text-accent"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Sub + vime (a set of things)
          </motion.p>

          <motion.h1
            className="text-5xl md:text-7xl font-bold text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Break complex tasks into{" "}
            <span className="text-accent">simple subsets</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-center text-white/60 max-w-2xl leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            SubVime helps you turn big goals like &quot;YouTube automation&quot; into nested
            checklists you can reorder, annotate, import, export, and sync in real time.
          </motion.p>
        </div>

        <motion.div
          className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            to="/app"
            className="group w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-gray-200 rounded-full font-bold text-lg transition-all flex items-center justify-center gap-2"
          >
            Start a checklist
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
          <Link
            to="/app"
            className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 rounded-full border border-white/10 hover:border-accent/40 text-white/80 hover:text-white font-medium transition-all text-center"
          >
            Import JSON outline
          </Link>
        </motion.div>
      </div>

      {/* --- Original tunnel / ngrok hero (commented out) ---
      <Terminal />
      Vercel OSS badge, "Expose your local server", npm install -g Subvima, streaming HTTP logs, etc.
      --- end original hero --- */}
    </div>
  );
};
