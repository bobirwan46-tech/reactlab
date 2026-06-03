import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FormInput from "../ui/FormInput";

export default function ContactFormSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    goal: "",
  });

  const [submitted, setSubmitted] = useState(false);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setSubmitted(true);
  }

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          <div>
            <p className="text-sm font-semibold text-blue-600">
              Practice Form
            </p>

            <h2 className="mt-3 text-3xl font-bold text-slate-900">
              Tell ReactLab what you want to learn.
            </h2>

            <p className="mt-4 text-slate-600">
              This form teaches controlled inputs, state updates,
              event handling, conditional rendering, and animated UI states.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!submitted ? (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -24, scale: 0.98 }}
                transition={{ duration: 0.3 }}
                className="rounded-2xl border border-slate-200 bg-slate-50 p-6 shadow-sm"
              >
                <div className="grid gap-5">
                  <FormInput
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                  />

                  <FormInput
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Enter your email"
                  />

                  <div>
                    <label
                      htmlFor="goal"
                      className="mb-2 block text-sm font-medium text-slate-700"
                    >
                      Learning Goal
                    </label>

                    <textarea
                      id="goal"
                      name="goal"
                      value={formData.goal}
                      onChange={handleChange}
                      placeholder="Example: I want to learn React Router and forms."
                      rows="4"
                      className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                    />
                  </div>

                  <button
                    type="submit"
                    className="rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
                  >
                    Submit Goal →
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                key="confirmation"
                initial={{ opacity: 0, y: 24, scale: 0.96 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -24, scale: 0.96 }}
                transition={{ duration: 0.35 }}
                className="rounded-2xl border border-green-200 bg-green-50 p-6 shadow-sm"
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 text-2xl">
                  ✅
                </div>

                <p className="text-sm font-semibold text-green-700">
                  Submission Confirmed
                </p>

                <h3 className="mt-3 text-2xl font-bold text-slate-900">
                  Thank you, {formData.name || "learner"}.
                </h3>

                <div className="mt-6 space-y-4 rounded-xl bg-white p-5">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Name
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-800">
                        {formData.name || "Not provided"}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                        Email
                      </p>

                      <p className="mt-1 text-sm font-medium text-slate-800">
                        {formData.email || "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                      Learning Goal
                    </p>

                    <p className="mt-1 text-sm leading-6 text-slate-700">
                      {formData.goal || "Not provided"}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setSubmitted(false)}
                  className="mt-6 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-green-700"
                >
                  Edit Submission
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}