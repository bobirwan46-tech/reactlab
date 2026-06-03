export default function LessonCard({
  icon: Icon,
  lessonNumber,
  title,
  description,
  difficulty,
  time,
}) {
  const difficultyStyles = {
    Beginner: "bg-green-100 text-green-700",
    Intermediate: "bg-orange-100 text-orange-700",
    Advanced: "bg-red-100 text-red-700",
  };

  return (
    <div className="flex h-full flex-col rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:p-5">
      <div className="flex items-start justify-between">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-blue-50 text-blue-600 sm:h-11 sm:w-11 sm:rounded-xl">
          <Icon size={18} className="sm:hidden" />
          <Icon size={22} className="hidden sm:block" />
        </div>

        <div className="ml-3 flex-1 text-right">
          {lessonNumber && (
            <p className="text-[10px] font-semibold text-slate-500 sm:text-[11px]">
              Lesson {lessonNumber}
            </p>
          )}

          <div className="mt-1 flex items-center justify-end gap-1.5">
            {difficulty && (
              <span
                className={`rounded-full px-2 py-0.5 text-[9px] font-medium sm:text-[10px] ${difficultyStyles[difficulty]}`}
              >
                {difficulty}
              </span>
            )}

            {time && (
              <span className="text-[10px] text-slate-500 sm:text-[11px]">
                {time}
              </span>
            )}
          </div>
        </div>
      </div>

      <h3 className="mt-3 text-base font-semibold text-slate-900 sm:mt-4 sm:text-lg">
        {title}
      </h3>

      <p className="mt-1 line-clamp-2 text-xs leading-5 text-slate-600 sm:mt-2 sm:text-sm sm:leading-6">
        {description}
      </p>

      <div className="mt-auto pt-3 sm:pt-5">
        <span className="text-xs font-semibold text-blue-600 sm:text-sm">
          Start Lesson →
        </span>
      </div>
    </div>
  );
}