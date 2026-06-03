import { ChevronDown } from "lucide-react";

export default function AccordionItem({
  concept,
  isOpen,
  onToggle,
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between gap-6 p-5 text-left"
      >
        <div>
          <p className="text-lg font-semibold text-slate-900">
            {concept.title}
          </p>

          <p className="mt-1 text-sm text-slate-500">
            {concept.summary}
          </p>
        </div>

        <ChevronDown
          size={20}
          className={`text-slate-500 transition ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="border-t border-slate-200 p-5">
          <p className="text-sm leading-6 text-slate-600">
            {concept.explanation}
          </p>

          <pre className="mt-4 overflow-x-auto rounded-xl bg-slate-900 p-4 text-sm text-slate-100">
            <code>{concept.example}</code>
          </pre>
        </div>
      )}
    </div>
  );
}