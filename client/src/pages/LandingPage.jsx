import Navbar from "../components/Navbar";

// Temporary placeholder — we'll add sections one by one
export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#030712] text-white">
      <Navbar />

      {/* Hero placeholder */}
      <div className="flex items-center justify-center min-h-screen text-center px-6">
        <div>
          <div
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full
            border border-purple-500/30 bg-purple-500/[0.08] text-purple-400
            text-xs font-semibold mb-7"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
            Now with AI-powered planning
          </div>

          <h1 className="text-7xl font-extrabold tracking-[-3px] leading-none mb-6">
            <span className="block text-white">Plan smarter.</span>
            <span
              className="block bg-gradient-to-r from-purple-500 via-blue-500
              to-cyan-400 bg-clip-text text-transparent"
            >
              Execute faster.
            </span>
          </h1>

          <p className="text-lg text-slate-400 max-w-xl mx-auto mb-10 leading-relaxed">
            The premium productivity platform for ambitious teams.
          </p>

          <div className="flex gap-4 justify-center">
            <button
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-700
              to-blue-600 text-white font-bold text-base
              shadow-[0_0_30px_rgba(124,58,237,0.4)] hover:-translate-y-0.5 transition-all"
            >
              Start for free →
            </button>
            <button
              className="px-8 py-3.5 rounded-xl border border-white/[0.08]
              bg-white/[0.04] text-white font-semibold hover:-translate-y-0.5 transition-all"
            >
              Watch demo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
