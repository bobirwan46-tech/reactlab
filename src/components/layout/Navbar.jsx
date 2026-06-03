import { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  Moon,
  Sun,
  UserCircle,
  LogIn,
} from "lucide-react";

import { useTheme } from "../../context/ThemeContext";
import { useAuth } from "../../context/AuthContext";

import { API_BASE_URL } from "../../services/api";

export default function Navbar() {
  const { darkMode, setDarkMode } = useTheme();
  const { token, user, logout } = useAuth();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigate = useNavigate();

  const avatarUrl = user?.avatar_path
    ? `${API_BASE_URL}${user.avatar_path}`
    : "";

  function handleLogout() {
    logout();
    setMobileMenuOpen(false);
    navigate("/");
  }

  function closeMobileMenu() {
    setMobileMenuOpen(false);
  }

  const navClass = ({ isActive }) =>
    isActive
      ? darkMode
        ? "text-blue-400 font-semibold"
        : "text-blue-600 font-semibold"
      : darkMode
      ? "text-slate-300 hover:text-white transition-colors duration-300"
      : "text-slate-700 hover:text-black transition-colors duration-300";

  const mobileNavClass = ({ isActive }) =>
    isActive
      ? darkMode
        ? "block rounded-xl bg-slate-800 px-4 py-3 text-blue-400 font-semibold"
        : "block rounded-xl bg-slate-100 px-4 py-3 text-blue-600 font-semibold"
      : darkMode
      ? "block rounded-xl px-4 py-3 text-slate-300 hover:bg-slate-800 hover:text-white transition"
      : "block rounded-xl px-4 py-3 text-slate-700 hover:bg-slate-100 hover:text-black transition";

  const buttonClass = darkMode
    ? "rounded-xl border border-slate-700 px-3 py-2 text-slate-300 hover:bg-slate-800"
    : "rounded-xl border border-slate-300 px-3 py-2 text-slate-700 hover:bg-slate-100";

  const mobileButtonClass = darkMode
    ? "flex w-full items-center gap-3 rounded-xl border border-slate-700 px-4 py-3 text-left text-slate-300 hover:bg-slate-800"
    : "flex w-full items-center gap-3 rounded-xl border border-slate-300 px-4 py-3 text-left text-slate-700 hover:bg-slate-100";

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={
        darkMode
          ? "fixed top-0 left-0 right-0 z-50 border-b border-slate-800 bg-slate-950/90 backdrop-blur"
          : "fixed top-0 left-0 right-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur"
      }
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-10">
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="text-xl font-bold tracking-tight"
          >
            ReactLab
          </Link>

          <nav className="hidden items-center gap-6 text-sm lg:flex">
            <NavLink to="/" className={navClass}>
              Home
            </NavLink>

            <NavLink to="/lessons" className={navClass}>
              Lessons
            </NavLink>

            <NavLink to="/concepts" className={navClass}>
              Concepts
            </NavLink>

            <NavLink to="/lab" className={navClass}>
              Lab
            </NavLink>

            <NavLink to="/api-lab" className={navClass}>
              API Lab
            </NavLink>

            <NavLink to="/upload-lab" className={navClass}>
              Upload Lab
            </NavLink>
          </nav>
        </div>

        <div className="hidden items-center gap-4 lg:flex">
          {token ? (
            <div
              className={
                darkMode
                  ? "flex items-center gap-3 border-l border-slate-700 pl-4"
                  : "flex items-center gap-3 border-l border-slate-300 pl-4"
              }
            >
              <div className="flex items-center gap-2">
                {avatarUrl ? (
                  <img
                    src={avatarUrl}
                    alt={user?.name || "User avatar"}
                    className={
                      darkMode
                        ? "h-8 w-8 rounded-full border border-slate-700 object-cover"
                        : "h-8 w-8 rounded-full border border-slate-300 object-cover"
                    }
                  />
                ) : (
                  <UserCircle size={22} />
                )}

                <span
                  className={
                    darkMode ? "text-slate-300" : "text-slate-700"
                  }
                >
                  {user?.name || user?.email || "User"}
                </span>
              </div>

              <button onClick={handleLogout} className={buttonClass}>
                Logout
              </button>
            </div>
          ) : (
            <NavLink to="/login" className={buttonClass}>
              Login
            </NavLink>
          )}

          <motion.button
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.05 }}
            onClick={() => setDarkMode(!darkMode)}
            className={
              darkMode
                ? "flex items-center gap-2 rounded-xl border border-slate-700 px-3 py-2 text-slate-300 hover:bg-slate-800"
                : "flex items-center gap-2 rounded-xl border border-slate-300 px-3 py-2 text-slate-700 hover:bg-slate-100"
            }
          >
            {darkMode ? (
              <>
                <Sun size={16} />
                Light
              </>
            ) : (
              <>
                <Moon size={16} />
                Dark
              </>
            )}
          </motion.button>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          {token && (
            <div className="flex items-center">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt={user?.name || "User avatar"}
                  className={
                    darkMode
                      ? "h-8 w-8 rounded-full border border-slate-700 object-cover"
                      : "h-8 w-8 rounded-full border border-slate-300 object-cover"
                  }
                />
              ) : (
                <UserCircle size={24} />
              )}
            </div>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={
              darkMode
                ? "rounded-xl border border-slate-700 p-2 text-slate-300 hover:bg-slate-800"
                : "rounded-xl border border-slate-300 p-2 text-slate-700 hover:bg-slate-100"
            }
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className={
              darkMode
                ? "border-t border-slate-800 bg-slate-950 px-4 pb-5 pt-3 lg:hidden"
                : "border-t border-slate-200 bg-white px-4 pb-5 pt-3 lg:hidden"
            }
          >
            <nav className="space-y-2 text-sm">
              <NavLink
                to="/"
                onClick={closeMobileMenu}
                className={mobileNavClass}
              >
                Home
              </NavLink>

              <NavLink
                to="/lessons"
                onClick={closeMobileMenu}
                className={mobileNavClass}
              >
                Lessons
              </NavLink>

              <NavLink
                to="/concepts"
                onClick={closeMobileMenu}
                className={mobileNavClass}
              >
                Concepts
              </NavLink>

              <NavLink
                to="/lab"
                onClick={closeMobileMenu}
                className={mobileNavClass}
              >
                Lab
              </NavLink>

              <NavLink
                to="/api-lab"
                onClick={closeMobileMenu}
                className={mobileNavClass}
              >
                API Lab
              </NavLink>

              <NavLink
                to="/upload-lab"
                onClick={closeMobileMenu}
                className={mobileNavClass}
              >
                Upload Lab
              </NavLink>
            </nav>

            <div
              className={
                darkMode
                  ? "mt-4 border-t border-slate-800 pt-4"
                  : "mt-4 border-t border-slate-200 pt-4"
              }
            >
              {token ? (
                <div className="space-y-3">
                  <div className="flex items-center gap-3 px-1">
                    {avatarUrl ? (
                      <img
                        src={avatarUrl}
                        alt={user?.name || "User avatar"}
                        className={
                          darkMode
                            ? "h-9 w-9 rounded-full border border-slate-700 object-cover"
                            : "h-9 w-9 rounded-full border border-slate-300 object-cover"
                        }
                      />
                    ) : (
                      <UserCircle size={28} />
                    )}

                    <div>
                      <p
                        className={
                          darkMode
                            ? "font-medium text-slate-200"
                            : "font-medium text-slate-800"
                        }
                      >
                        {user?.name || "User"}
                      </p>
                      <p className="text-xs text-slate-500">
                        {user?.email}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className={mobileButtonClass}
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <NavLink
                  to="/login"
                  onClick={closeMobileMenu}
                  className={`${mobileButtonClass} justify-start`}
                >
                  <LogIn size={18} />
                  Login
                </NavLink>
              )}

              <button
                type="button"
                onClick={() => setDarkMode(!darkMode)}
                className={`${mobileButtonClass} mt-3 justify-start`}
              >
                {darkMode ? (
                  <>
                    <Sun size={18} />
                    Light Mode
                  </>
                ) : (
                  <>
                    <Moon size={18} />
                    Dark Mode
                  </>
                )}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}