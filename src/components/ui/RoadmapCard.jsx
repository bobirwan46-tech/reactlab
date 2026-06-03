export default function RoadmapCard({
  step,
  title,
  category,
  description,
  onOpen,
}) {
  return (
    <button
      onClick={onOpen}
      className="
        rounded-2xl
        border
        border-slate-200
        bg-white
        p-4
        text-left
        shadow-sm
        transition
        hover:-translate-y-1
        hover:shadow-md
        sm:p-7
      "
    >
      <div className="flex items-start justify-between gap-3">
        <p className="text-xs font-bold text-blue-600 sm:text-sm">
          {step}
        </p>

        <span
          className="
            shrink-0
            rounded-full
            bg-blue-50
            px-2.5
            py-1
            text-[11px]
            font-semibold
            text-blue-700
            sm:px-3
            sm:text-xs
          "
        >
          {category}
        </span>
      </div>

      <h3
        className="
          mt-3
          text-lg
          font-bold
          text-slate-900
          sm:text-xl
        "
      >
        {title}
      </h3>

      <p
        className="
          mt-2
          line-clamp-2
          text-sm
          leading-5
          text-slate-600
          sm:mt-4
          sm:line-clamp-none
          sm:text-base
          sm:leading-6
        "
      >
        {description}
      </p>

      <p
        className="
          mt-3
          text-sm
          font-semibold
          text-blue-600
          sm:mt-5
        "
      >
        Learn more →
      </p>
    </button>
  );
}