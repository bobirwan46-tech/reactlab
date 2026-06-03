import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
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

import LessonCard from "../ui/LessonCard";
import { lessonsData } from "../../data/lessonsData";

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

export default function FeaturedLessons() {
  const navigate = useNavigate();

  const [selectedFilter, setSelectedFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [showMobilePagination, setShowMobilePagination] =
    useState(false);

  const [itemsPerPage, setItemsPerPage] = useState(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return MOBILE_ITEMS_PER_PAGE;
    }

    return DESKTOP_ITEMS_PER_PAGE;
  });

  const filteredLessons =
    selectedFilter === "All"
      ? lessonsData
      : lessonsData.filter((lesson) => lesson.level === selectedFilter);

  const totalPages = Math.ceil(filteredLessons.length / itemsPerPage);

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
    function handleScroll() {
      const listSection = document.getElementById(
        "featured-lessons-list-section"
      );

      if (!listSection) return;

      const listTop = listSection.getBoundingClientRect().top;

      setShowMobilePagination(listTop < window.innerHeight - 160);
    }

    handleScroll();

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  function scrollToListOnMobile() {
    if (window.innerWidth < 768) {
      const listSection = document.getElementById(
        "featured-lessons-list-section"
      );

      if (listSection) {
        listSection.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  }

  function handleFilterChange(filter) {
    setSelectedFilter(filter);
    setPage(1);
    setTimeout(scrollToListOnMobile, 0);
  }

  function handlePreviousPage() {
    setPage((currentPage) => Math.max(currentPage - 1, 1));
    setTimeout(scrollToListOnMobile, 0);
  }

  function handleNextPage() {
    setPage((currentPage) =>
      Math.min(currentPage + 1, totalPages)
    );
    setTimeout(scrollToListOnMobile, 0);
  }

  function handlePageChange(pageNumber) {
    setPage(pageNumber);
    setTimeout(scrollToListOnMobile, 0);
  }

  function handleOpenLesson(lessonId) {
    navigate(`/lessons/${lessonId}`);
  }

  return (
    <section className="bg-slate-100 py-6 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-5 sm:mb-10">
          <p className="mt-2 max-w-3xl text-base font-semibold leading-7 text-blue-600 sm:mt-3 sm:text-lg">
            Featured Lessons
          </p>

          <h2 className="mt-2 text-3xl font-bold leading-snug text-slate-900 sm:mt-5 sm:text-5xl">
            Start with the most important React concepts.
          </h2>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:mt-3 sm:text-base">
            Explore practical lessons covering components, props, state,
            routing, forms, backend APIs, authentication, uploads, and
            advanced full-stack topics.
          </p>
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

        <div
          id="featured-lessons-list-section"
          className="scroll-mt-36 mb-3 flex items-center justify-between text-xs font-semibold text-slate-500 sm:scroll-mt-0 sm:mb-5 sm:text-sm"
        >
          <p>{filteredLessons.length} lessons</p>

          <p>
            Page {page} of {totalPages}
          </p>
        </div>

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

        {totalPages > 1 && (
          <div
            className={`sticky bottom-0 z-20 -mx-4 mt-auto items-center justify-center gap-2 border-t border-slate-200 bg-slate-100/95 px-4 py-3 backdrop-blur sm:static sm:mx-0 sm:mt-8 sm:flex sm:min-h-[44px] sm:border-t-0 sm:bg-transparent sm:px-0 sm:py-0 ${
              showMobilePagination ? "flex" : "hidden"
            }`}
          >
            <button
              onClick={handlePreviousPage}
              disabled={page === 1}
              className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 sm:px-4 sm:text-sm"
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
              className="rounded-full border border-slate-200 px-3 py-2 text-xs font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-40 sm:px-4 sm:text-sm"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </section>
  );
}