import { Outlet } from "react-router-dom";

import Navbar from "../components/layout/Navbar.jsx";

import { useTheme } from "../context/ThemeContext.jsx";

export default function MainLayout() {
  const { darkMode } = useTheme();

  return (
    <div
      className={
        darkMode
          ? "min-h-screen bg-slate-950 text-white transition-colors duration-300"
          : "min-h-screen bg-white text-slate-900 transition-colors duration-300"
      }
    >
      <Navbar />

      <main className="pt-20">
        <Outlet />
      </main>
    </div>
  );
}