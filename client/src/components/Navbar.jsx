import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import toast from "react-hot-toast";

const Navbar = () => {
  const { user, logout } = useAuth();
  const { darkMode, setDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/dashboard" className="text-2xl font-bold text-blue-600">
          📋 Planify
        </Link>

        {/* Right side */}
        <div className="flex items-center gap-3">
          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-xl bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600 transition text-xl"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>

          <span className="text-gray-600 dark:text-gray-300 font-medium">
            👋 Hi, {user?.name}
          </span>

          <Link
            to="/profile"
            className="text-gray-600 dark:text-gray-300 hover:text-blue-600 font-medium transition"
          >
            Profile
          </Link>

          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl font-medium transition"
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
