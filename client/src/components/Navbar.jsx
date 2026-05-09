import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";
import { useAuth } from "../context/AuthContext";

// ↑ Notice: only ONE dot-dot (../context)
// because Navbar is in src/components/
// and context is in src/context/
// They are SIBLINGS inside src/

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { dark, toggle } = useTheme();
  const { user, logout } = useAuth();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 px-10 py-4 flex items-center 
      justify-between border-b border-white/[0.06] backdrop-blur-xl transition-all duration-300
      ${scrolled ? "bg-[#030712]/90 shadow-2xl" : "bg-[#030712]/60"}`}
    >
      {/* Logo */}
      <Link
        to="/"
        className="text-xl font-bold bg-gradient-to-r from-purple-500 to-blue-500
          bg-clip-text text-transparent"
      >
        Planipy
      </Link>

      {/* Nav links */}
      <ul className="hidden md:flex gap-8 list-none">
        {["Features", "Analytics", "Pricing"].map((link) => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase()}`}
              className="text-sm text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>

      {/* Right actions */}
      <div className="flex items-center gap-3">
        {/* Theme toggle */}
        <button
          onClick={toggle}
          className="w-9 h-9 rounded-lg border border-white/[0.08] bg-white/[0.04]
            flex items-center justify-center text-slate-400 hover:text-white
            hover:border-purple-500/50 transition-all text-sm"
        >
          {dark ? "☀️" : "🌙"}
        </button>

        {user ? (
          <>
            <Link
              to="/dashboard"
              className="text-sm font-medium text-slate-300 hover:text-white px-4 py-2
                rounded-lg border border-white/[0.08] hover:border-purple-500/50 transition-all"
            >
              Dashboard
            </Link>
            <button
              onClick={logout}
              className="text-sm font-semibold px-5 py-2 rounded-lg bg-gradient-to-r
                from-purple-700 to-blue-600 text-white transition-all
                shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:-translate-y-0.5"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="text-sm text-slate-400 hover:text-white px-4 py-2 rounded-lg
                border border-white/[0.08] hover:border-purple-500/50 transition-all"
            >
              Sign in
            </Link>
            <Link
              to="/signup"
              className="text-sm font-semibold px-5 py-2 rounded-lg bg-gradient-to-r
                from-purple-700 to-blue-600 text-white transition-all
                shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:-translate-y-0.5"
            >
              Get started
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
