import { Link } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";

export default function HeroSection() {
  const { darkMode } = useTheme();

  return (
    <section
      className={`min-h-[calc(100vh-72px)] px-5 py-8 transition-colors sm:px-6 sm:py-16 lg:py-0 ${
        darkMode
          ? "bg-slate-950 text-slate-100"
          : "bg-slate-50 text-slate-900"
      }`}
    >
      <div className="mx-auto flex min-h-[calc(100vh-72px)] max-w-6xl flex-col justify-start pt-2 sm:justify-center sm:pt-0">
        <div>
          <p
            className={`text-sm font-semibold sm:text-base ${
              darkMode ? "text-blue-400" : "text-blue-600"
            }`}
          >
            Welcome to ReactLab
          </p>
        </div>

        <div className="mt-6 sm:mt-8">
          <h1
            className={`max-w-5xl text-4xl leading-tight font-bold tracking-tight sm:text-5xl lg:text-7xl ${
              darkMode ? "text-white" : "text-slate-950"
            }`}
          >
            Learn React by building one concept at a time.
          </h1>
        </div>

        <div className="mt-6 max-w-4xl sm:mt-8">
          <p
            className={`text-base leading-7 sm:text-lg sm:leading-8 lg:text-xl lg:leading-9 ${
              darkMode ? "text-slate-300" : "text-slate-600"
            }`}
          >
            ReactLab is my personal project for learning modern web
            development through practical lessons, real-world examples and
            hands-on coding labs.
          </p>

          <p
            className={`mt-3 text-base leading-7 sm:mt-4 sm:text-lg sm:leading-8 ${
              darkMode ? "text-slate-400" : "text-slate-500"
            }`}
          >
            Follow my journey from React fundamentals to full-stack
            application development.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:gap-4">
            <Link
              to="/lessons"
              className="rounded-2xl bg-blue-600 px-7 py-3.5 text-center text-base font-semibold text-white transition hover:bg-blue-700 sm:px-8 sm:py-4"
            >
              Start Learning
            </Link>

            <Link
              to="/lab"
              className={`rounded-2xl border px-7 py-3.5 text-center text-base font-semibold transition sm:px-8 sm:py-4 ${
                darkMode
                  ? "border-slate-500 bg-slate-900 text-slate-100 hover:bg-slate-800"
                  : "border-slate-300 bg-white text-slate-800 hover:bg-slate-50"
              }`}
            >
              Open Lab
            </Link>
          </div>

          <div className="mt-10 sm:mt-14">
            <p
              className={`text-xs leading-6 ${
                darkMode ? "text-slate-500" : "text-slate-400"
              }`}
            >
              <span
                className={`font-semibold ${
                  darkMode ? "text-slate-300" : "text-slate-500"
                }`}
              >
                Disclaimer:
              </span>{" "}
              Educational project • Content is shared for learning purposes
              only.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}