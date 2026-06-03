import { motion, AnimatePresence } from "framer-motion";

export default function Drawer({
  isOpen,
  onClose,
  title,
  children,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 bg-slate-900/60"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="ml-auto h-full w-full max-w-md bg-white p-6 shadow-2xl"
          >
            <div className="flex items-start justify-between gap-6">
              <h3 className="text-xl font-bold text-slate-900">
                {title}
              </h3>

              <button
                type="button"
                onClick={onClose}
                className="rounded-full bg-slate-100 px-3 py-1 text-sm font-semibold text-slate-600 hover:bg-slate-200"
              >
                ✕
              </button>
            </div>

            <div className="mt-6 text-sm leading-6 text-slate-600">
              {children}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}