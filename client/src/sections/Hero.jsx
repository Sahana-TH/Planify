import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../utils/animations";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section
      className="min-h-screen flex items-center justify-center
      px-10 pt-28 pb-20 text-center overflow-hidden"
    >
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        animate="visible"
        className="max-w-4xl w-full mx-auto"
      >
        {/* Badge */}
        <motion.div
          variants={fadeUp}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
            border border-purple-500/30 bg-purple-500/[0.08] text-purple-400
            text-xs font-semibold mb-7"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          Now with AI-powered planning
        </motion.div>

        {/* Heading */}
        <motion.h1
          variants={fadeUp}
          className="text-7xl font-extrabold tracking-[-3px] leading-none mb-6"
        >
          <span className="block text-white">Plan smarter.</span>
          <span
            className="block bg-gradient-to-r from-purple-500 via-blue-500
            to-cyan-400 bg-clip-text text-transparent"
          >
            Execute faster.
          </span>
        </motion.h1>

        {/* Subtext */}
        <motion.p
          variants={fadeUp}
          className="text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          The premium productivity platform built for ambitious teams. Track
          tasks, crush goals, and ship with confidence.
        </motion.p>

        {/* Buttons */}
        <motion.div
          variants={fadeUp}
          className="flex gap-4 justify-center mb-20"
        >
          <Link to="/signup">
            <motion.button
              whileHover={{ y: -2, boxShadow: "0 0 40px rgba(124,58,237,0.6)" }}
              whileTap={{ scale: 0.97 }}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-700
                to-blue-600 text-white font-bold text-base
                shadow-[0_0_30px_rgba(124,58,237,0.4)]"
            >
              Start for free →
            </motion.button>
          </Link>
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-3.5 rounded-xl border border-white/[0.08]
              bg-white/[0.04] text-white font-semibold backdrop-blur-sm
              hover:border-purple-500/50 transition-colors"
          >
            Watch demo
          </motion.button>
        </motion.div>

        {/* Dashboard mockup goes here */}
        <motion.div variants={scaleIn}>
          <DashboardMock />
        </motion.div>
      </motion.div>
    </section>
  );
}
