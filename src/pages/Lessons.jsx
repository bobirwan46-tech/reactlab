import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Search,
  Boxes,
  GitBranch,
  MousePointerClick,
  Route,
  RefreshCw,
  FileText,
  ShieldCheck,
  Database,
  Server,
  Upload,
  Settings,
  Code2,
} from "lucide-react";

import LessonCard from "../components/ui/LessonCard";
import { lessonsData } from "../data/lessonsData";

const MOBILE_ITEMS_PER_PAGE = 3;
const DESKTOP_ITEMS_PER_PAGE = 8;
const MAX_VISIBLE_PAGES = 8;

const filters = ["All", "Beginner", "Intermediate", "Advanced"];

const iconMap = {
  components: Boxes,
  props: GitBranch,
  state: MousePointerClick,
  "use-effect": RefreshCw,
  "react-router": Route,
  forms: FileText,
  authentication: ShieldCheck,
  postgresql: Database,
  "backend-express": Server,
  "file-uploads": Upload,
  middleware: Settings,
};

function getLessonIcon(lessonId) {
  return iconMap[lessonId] || Code2;
}

export default function Lessons() {
  const navigate = useNavigate();

  const [selectedFilter, setSelectedFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const [itemsPerPage, setItemsPerPage] = useState(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return MOBILE_ITEMS_PER_PAGE;
    }

    return DESKTOP_ITEMS_PER_PAGE;
  });

  const filteredLessons = lessonsData.filter((lesson) => {
    const matchesFilter =
      selectedFilter === "All" || lesson.level === selectedFilter;

    const searchText = search.toLowerCase();

    const matchesSearch =
      lesson.title.toLowerCase().includes(searchText) ||
      lesson.level.toLowerCase().includes(searchText) ||
      lesson.summary.toLowerCase().includes(searchText) ||
      lesson.explanation.toLowerCase().includes(searchText) ||
      lesson.challenge.toLowerCase().includes(searchText) ||
      String(lesson.lessonNumber).includes(searchText);

    return matchesFilter && matchesSearch;
  });

  const totalPages = Math.ceil(filteredLessons.length / itemsPerPage) || 1;

  const startIndex = (page - 1) * itemsPerPage;

  const currentLessons = filteredLessons.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const currentPageGroup = Math.floor(
    (page - 1) / MAX_VISIBLE_PAGES
  );

  const firstVisiblePage =
    currentPageGroup * MAX_VISIBLE_PAGES + 1;

  const lastVisiblePage = Math.min(
    firstVisiblePage + MAX_VISIBLE_PAGES - 1,
    totalPages
  );

  const visiblePageNumbers = Array.from(
    {
      length: lastVisiblePage - firstVisiblePage + 1,
    },
    (_, index) => firstVisiblePage + index
  );

  useEffect(() => {
    function handleResize() {
      const newItemsPerPage =
        window.innerWidth < 768
          ? MOBILE_ITEMS_PER_PAGE
          : DESKTOP_ITEMS_PER_PAGE;

      setItemsPerPage(newItemsPerPage);
      setPage(1);
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    setPage(1);
  }, [selectedFilter, search]);

  function handleFilterChange(filter) {
    setSelectedFilter(filter);
  }

  function handlePreviousPage() {
    setPage((currentPage) => Math.max(currentPage - 1, 1));
  }

  function handleNextPage() {
    setPage((currentPage) =>
      Math.min(currentPage + 1, totalPages)
    );
  }

  function handlePageChange(pageNumber) {
    setPage(pageNumber);
  }

  function handleOpenLesson(lessonId) {
    navigate(`/lessons/${lessonId}`);
  }

  return (
    <section className="bg-slate-100 py-6 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-5 sm:mb-10">
          <p className="mt-2 max-w-3xl text-base font-semibold leading-7 text-blue-600 sm:mt-3 sm:text-lg">
            Lessons
          </p>

          <h1 className="mt-2 text-3xl font-bold leading-snug text-slate-900 sm:mt-5 sm:text-5xl">
            Learn React step by step.
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:mt-3 sm:text-base">
            Browse practical ReactLab lessons covering React fundamentals,
            routing, backend APIs, authentication, uploads, database concepts
            and full-stack development.
          </p>
        </div>

        <div className="mb-5 sm:mb-8">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search lessons..."
              className="w-full rounded-2xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </div>
        </div>

        <div className="sticky top-[72px] z-20 mb-4 -mx-4 border-b border-slate-200 bg-slate-100/95 px-4 py-3 backdrop-blur sm:static sm:top-auto sm:mx-0 sm:mb-8 sm:border-b-0 sm:bg-transparent sm:px-0 sm:py-0">
          <div className="overflow-x-auto">
            <div className="flex gap-1.5 pb-1 sm:gap-2 sm:pb-2">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => handleFilterChange(filter)}
                  className={`shrink-0 rounded-full border px-3 py-1.5 text-xs font-semibold transition sm:px-4 sm:py-2 sm:text-sm ${
                    selectedFilter === filter
                      ? "border-blue-500 bg-blue-600 text-white"
                      : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-3 flex items-center justify-between text-xs font-semibold text-slate-500 sm:mb-5 sm:text-sm">
          <p>{filteredLessons.length} lessons</p>

          <p>
            Page {page} of {totalPages}
          </p>
        </div>

        {filteredLessons.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center">
            <p className="text-base font-semibold text-slate-900">
              No lessons found
            </p>

            <p className="mt-2 text-sm text-slate-500">
              Try another search keyword or difficulty filter.
            </p>
          </div>
        ) : (
          <div className="grid gap-3 pb-4 sm:min-h-[520px] sm:gap-6 sm:pb-0 md:grid-cols-2 xl:grid-cols-4">
            {currentLessons.map((lesson) => {
              const LessonIcon = getLessonIcon(lesson.id);

              return (
                <div
                  key={lesson.id}
                  onClick={() => handleOpenLesson(lesson.id)}
                  className="cursor-pointer"
                >
                  <LessonCard
                    lessonNumber={lesson.lessonNumber}
                    title={lesson.title}
                    description={lesson.summary}
                    difficulty={lesson.level}
                    time={lesson.time}
                    icon={LessonIcon}
                  />
                </div>
              );
            })}
          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-8 flex items-center justify-center gap-2">
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 sm:px-4 sm:text-sm"
            >
              Previous
            </button>

            <div className="flex items-center gap-1.5 sm:gap-2">
              {visiblePageNumbers.map((pageNumber) => (
                <button
                  key={pageNumber}
                  onClick={() => handlePageChange(pageNumber)}
                  className={`h-8 w-8 rounded-full text-xs font-semibold transition sm:h-9 sm:w-9 sm:text-sm ${
                    page === pageNumber
                      ? "bg-blue-600 text-white"
                      : "border border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {pageNumber}
                </button>
              ))}
            </div>

            <button
              onClick={handleNextPage}
              disabled={page === totalPages}
              className="rounded-full border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 sm:px-4 sm:text-sm"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}