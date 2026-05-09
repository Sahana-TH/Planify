import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import LandingPage from "./pages/LandingPage";

// We'll add more pages here as we build them
// import LoginPage   from './pages/LoginPage';
// import SignupPage  from './pages/SignupPage';
// import Dashboard   from './pages/Dashboard';

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* Uncomment these as you build each page: */}
            {/* <Route path="/login"   element={<LoginPage />} /> */}
            {/* <Route path="/signup"  element={<SignupPage />} /> */}
            {/* <Route path="/dashboard" element={<Dashboard />} /> */}
          </Routes>

          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: "#0f172a",
                color: "#f1f5f9",
                border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "12px",
              },
            }}
          />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}
