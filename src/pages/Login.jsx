import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X } from "lucide-react";

import { loginUser } from "../services/api.js";
import { useAuth } from "../context/AuthContext.jsx";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();

  console.log(
  "VITE_API_BASE_URL:",
  import.meta.env.VITE_API_BASE_URL
);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      console.log("1. Starting login");

      const data = await loginUser({
        email,
        password,
      });

      console.log("2. API returned:", data);

      login(data);

      console.log("3. Context updated");

      navigate("/api-lab");

      console.log("4. Navigate called");
    } catch (err) {
      console.error("Login Error:", err);

      setError(err.message);
    } finally {
      console.log("5. Finally block");

      setLoading(false);
    }
  }

  return (
    <section className="min-h-[70vh] flex items-center justify-center px-6">
      <div className="relative w-full max-w-md rounded-2xl border border-slate-200 bg-white p-8 shadow-lg">
        <Link
          to="/"
          className="absolute right-4 top-4 rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-800"
        >
          <X size={20} />
        </Link>

        <h1 className="text-2xl font-semibold text-slate-900">
          Login
        </h1>

        <p className="mt-2 text-slate-600">
          Sign in to access protected ReactLab features.
        </p>

        {error && (
          <div className="mt-4 rounded-xl bg-red-50 p-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-slate-700">
              Email
            </label>

            <input
              type="email"
              className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="text-sm font-medium text-slate-700">
              Password
            </label>

            <input
              type="password"
              className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700 disabled:opacity-60"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>
      </div>
    </section>
  );
}