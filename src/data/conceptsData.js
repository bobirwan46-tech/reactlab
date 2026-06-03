export const conceptsData = [
  {
    id: "components",
    title: "Components",
    category: "React Basics",
    difficulty: "Beginner",
    summary: "Reusable pieces of UI.",
    explanation:
      "Components are the building blocks of React. A component can be a button, card, navbar, page section, form, or full screen.",
    example: `<LessonCard title="Components" difficulty="Beginner" />`,
  },
  {
    id: "props",
    title: "Props",
    category: "React Basics",
    difficulty: "Beginner",
    summary: "Data passed into components.",
    explanation:
      "Props allow parent components to send data into child components. This makes components reusable and dynamic.",
    example: `<RoadmapCard
  step="01"
  title="React Basics"
  description="Learn JSX and components."
/>`,
  },
  {
    id: "state",
    title: "State",
    category: "React Logic",
    difficulty: "Beginner",
    summary: "Data that changes over time.",
    explanation:
      "State allows React components to remember values. When state changes, React updates the UI automatically.",
    example: `const [selectedFilter, setSelectedFilter] = useState("All");`,
  },
  {
    id: "router",
    title: "React Router",
    category: "Architecture",
    difficulty: "Intermediate",
    summary: "Navigation between pages.",
    explanation:
      "React Router lets you create multiple pages in a single-page application without full browser reloads.",
    example: `<NavLink to="/lessons">Lessons</NavLink>`,
  },
  {
    id: "shared-layout",
    title: "Shared Layout",
    category: "Architecture",
    difficulty: "Intermediate",
    summary: "Reusable page wrapper.",
    explanation:
      "A shared layout lets multiple pages use the same navbar, footer, and page structure while changing only the main content.",
    example: `<Navbar />
<Outlet />`,
  },
];