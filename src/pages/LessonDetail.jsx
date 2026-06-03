import { useParams, Link } from "react-router-dom";
import { lessonsData } from "../data/lessonsData";

export default function LessonDetail() {
  const { id } = useParams();

  const currentIndex = lessonsData.findIndex((item) => item.id === id);
  const lesson = lessonsData[currentIndex];

  const previousLesson =
    currentIndex > 0 ? lessonsData[currentIndex - 1] : null;

  const nextLesson =
    currentIndex < lessonsData.length - 1
      ? lessonsData[currentIndex + 1]
      : null;

  if (!lesson) {
    return (
      <section className="min-h-screen bg-slate-100 px-4 py-10">
        <div className="mx-auto max-w-4xl rounded-2xl bg-white p-6 shadow-sm">
          <h1 className="text-2xl font-bold text-slate-900">
            Lesson not found
          </h1>

          <p className="mt-3 text-slate-600">
            The lesson you are looking for does not exist.
          </p>

          <Link
            to="/lessons"
            className="mt-6 inline-block rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Back to Lessons
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-slate-100 px-4 py-8 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-4xl">
        <Link
          to="/lessons"
          className="text-sm font-semibold text-blue-600 hover:text-blue-700"
        >
          ← Back to Lessons
        </Link>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-8">
          <div className="flex flex-wrap items-center gap-2 text-xs font-semibold text-slate-500">
            <span>Lesson {lesson.lessonNumber}</span>
            <span>•</span>
            <span>{lesson.level}</span>
            <span>•</span>
            <span>{lesson.time}</span>
          </div>

          <h1 className="mt-4 text-3xl font-bold leading-tight text-slate-900 sm:text-5xl">
            {lesson.title}
          </h1>

          <p className="mt-4 text-base leading-7 text-slate-600">
            {lesson.summary}
          </p>

          {lesson.learningGoal && (
            <div className="mt-8 rounded-2xl bg-blue-50 p-5">
              <p className="text-sm font-semibold uppercase tracking-wide text-blue-700">
                Learning Goal
              </p>

              <p className="mt-3 text-sm leading-7 text-slate-700 sm:text-base">
                {lesson.learningGoal}
              </p>
            </div>
          )}

          {lesson.explanation && (
            <div className="mt-8 border-t border-slate-200 pt-6">
              <h2 className="text-xl font-semibold text-slate-900">
                Explanation
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                {lesson.explanation}
              </p>
            </div>
          )}

          {lesson.realWorldUse && (
            <div className="mt-8 border-t border-slate-200 pt-6">
              <h2 className="text-xl font-semibold text-slate-900">
                Real World Use
              </h2>

              <p className="mt-3 text-sm leading-7 text-slate-600 sm:text-base">
                {lesson.realWorldUse}
              </p>
            </div>
          )}

          {lesson.keyPoints && lesson.keyPoints.length > 0 && (
            <div className="mt-8 border-t border-slate-200 pt-6">
              <h2 className="text-xl font-semibold text-slate-900">
                Key Points
              </h2>

              <ul className="mt-4 space-y-3">
                {lesson.keyPoints.map((point) => (
                  <li
                    key={point}
                    className="flex gap-3 text-sm leading-7 text-slate-600 sm:text-base"
                  >
                    <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {lesson.commonMistake && (
            <div className="mt-8 rounded-2xl border border-orange-200 bg-orange-50 p-5">
              <h2 className="text-lg font-semibold text-slate-900">
                Common Mistake
              </h2>

              <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
                {lesson.commonMistake}
              </p>
            </div>
          )}

          {lesson.code && (
            <div className="mt-8 border-t border-slate-200 pt-6">
              <h2 className="text-xl font-semibold text-slate-900">
                Code Example
              </h2>

              <pre className="mt-4 overflow-x-auto rounded-2xl bg-slate-950 p-4 text-sm leading-6 text-slate-100">
                <code>{lesson.code}</code>
              </pre>
            </div>
          )}

          {lesson.practiceSteps && lesson.practiceSteps.length > 0 && (
            <div className="mt-8 border-t border-slate-200 pt-6">
              <h2 className="text-xl font-semibold text-slate-900">
                Practice Steps
              </h2>

              <ol className="mt-4 space-y-3">
                {lesson.practiceSteps.map((step, index) => (
                  <li
                    key={step}
                    className="flex gap-3 text-sm leading-7 text-slate-600 sm:text-base"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">
                      {index + 1}
                    </span>

                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          {lesson.challenge && (
            <div className="mt-8 rounded-2xl bg-green-50 p-5">
              <h2 className="text-lg font-semibold text-slate-900">
                Challenge
              </h2>

              <p className="mt-2 text-sm leading-7 text-slate-700 sm:text-base">
                {lesson.challenge}
              </p>
            </div>
          )}

          <div className="mt-10 border-t border-slate-200 pt-6">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              {previousLesson ? (
                <Link
                  to={`/lessons/${previousLesson.id}`}
                  className="rounded-2xl border border-slate-200 bg-white p-4 text-left transition hover:border-blue-200 hover:bg-slate-50 sm:w-1/2"
                >
                  <p className="text-xs font-semibold text-slate-500">
                    ← Previous Lesson
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    Lesson {previousLesson.lessonNumber}:{" "}
                    {previousLesson.title}
                  </p>
                </Link>
              ) : (
                <div className="hidden sm:block sm:w-1/2" />
              )}

              {nextLesson ? (
                <Link
                  to={`/lessons/${nextLesson.id}`}
                  className="rounded-2xl border border-blue-200 bg-blue-50 p-4 text-left transition hover:border-blue-300 hover:bg-blue-100 sm:w-1/2"
                >
                  <p className="text-xs font-semibold text-blue-600">
                    Next Lesson →
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    Lesson {nextLesson.lessonNumber}: {nextLesson.title}
                  </p>
                </Link>
              ) : (
                <Link
                  to="/lessons"
                  className="rounded-2xl border border-green-200 bg-green-50 p-4 text-left transition hover:border-green-300 hover:bg-green-100 sm:w-1/2"
                >
                  <p className="text-xs font-semibold text-green-700">
                    Completed
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-900">
                    Back to all lessons
                  </p>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}