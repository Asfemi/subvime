import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

export const Hero = () => {
  return (
    <div className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden pt-20">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(131,103,199,0.15),_transparent_50%)]" />

      <div className="relative z-10 mx-auto flex w-full max-w-4xl flex-col items-center gap-8 px-6">
        <div className="mt-20 flex flex-col items-center gap-6">
          <motion.h1
            className="text-center text-5xl font-bold md:text-7xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Break complex tasks into{" "}
            <span className="text-accent">simple subsets</span>
          </motion.h1>

          <motion.p
            className="max-w-2xl text-center text-xl leading-relaxed text-white/60 md:text-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Turn big goals like YouTube automation into nested checklists you can import,
            export, share, and track.
          </motion.p>
        </div>

        <motion.div
          className="flex w-full flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Link
            to="/app"
            className="group flex w-full items-center justify-center gap-2 rounded-full bg-white px-8 py-4 text-lg font-bold text-black transition-all hover:bg-gray-200 sm:w-auto"
          >
            Start a checklist
            <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
          </Link>
          <Link
            to="/app"
            className="w-full rounded-full border border-white/10 bg-white/5 px-8 py-4 text-center font-medium text-white/80 transition-all hover:border-accent/40 hover:bg-white/10 hover:text-white sm:w-auto"
          >
            Import JSON outline
          </Link>
        </motion.div>
      </div>
    </div>
  );
};
