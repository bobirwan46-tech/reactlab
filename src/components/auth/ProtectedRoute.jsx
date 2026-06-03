import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { token } = useAuth();

  if (!token) {
    return (
      <div className="min-h-[70vh] flex items-center justify-center px-6">
        <div className="max-w-md w-full rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-lg">
          <h2 className="text-2xl font-semibold text-slate-900">
            Login required
          </h2>

          <p className="mt-3 text-slate-600">
            Please log in first before accessing the API Lab.
          </p>

          <div className="mt-6 flex justify-center gap-3">
            <Link
              to="/login"
              className="rounded-xl bg-blue-600 px-5 py-3 text-white hover:bg-blue-700"
            >
              Go to login
            </Link>

            <Link
              to="/lessons"
              className="rounded-xl border border-slate-300 px-5 py-3 text-slate-700 hover:bg-slate-50"
            >
              Back to lessons
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return children;
}