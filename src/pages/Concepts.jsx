import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { conceptsData } from "../data/conceptsData";

export default function Concepts() {
  const [openConceptId, setOpenConceptId] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const filteredConcepts = conceptsData.filter((concept) =>
    concept.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <h1 className="text-4xl font-bold text-slate-900">
        Concepts.
      </h1>

      <p className="mt-4 text-slate-600">
        Understand how React works internally.
      </p>

      <input
        type="text"
        placeholder="Search concepts..."
        value={searchTerm}
        onChange={(event) => setSearchTerm(event.target.value)}
        className="mt-8 w-full rounded-2xl border border-slate-300 bg-white px-5 py-4 text-sm outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
      />

      <div className="mt-10 space-y-4">
        {filteredConcepts.map((concept) => (
          <div
            key={concept.id}
            className="overflow-hidden rounded-2xl border border-slate-200 bg-white"
          >
            <button
              onClick={() =>
                setOpenConceptId(
                  openConceptId === concept.id ? null : concept.id
                )
              }
              className="flex w-full items-center justify-between p-5 text-left"
            >
              <div>
                <h2 className="text-xl font-semibold text-slate-900">
                  {concept.title}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {concept.summary}
                </p>
              </div>

              <span className="text-2xl text-slate-400">
                {openConceptId === concept.id ? "−" : "+"}
              </span>
            </button>

            <AnimatePresence>
              {openConceptId === concept.id && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  className="overflow-hidden border-t border-slate-200"
                >
                  <div className="p-5">
                    <p className="text-sm leading-7 text-slate-600">
                      {concept.explanation}
                    </p>

                    <pre className="mt-5 overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm text-slate-100">
                      <code>{concept.example}</code>
                    </pre>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}