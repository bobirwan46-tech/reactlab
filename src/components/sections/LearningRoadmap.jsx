import { useEffect, useState } from "react";
import RoadmapCard from "../ui/RoadmapCard";

const MOBILE_ITEMS_PER_PAGE = 3;
const DESKTOP_ITEMS_PER_PAGE = 8;
const MAX_VISIBLE_PAGES = 8;

const filters = [
  "All",
  "Frontend",
  "React Concepts",
  "Backend",
  "Auth & Security",
  "Database",
  "File Uploads",
  "Development Tools",
  "Mobile & Testing",
];

const roadmapItems = [
  {
    step: "⚛️ 01",
    title: "React",
    category: "Frontend",
    description:
      "Component-based frontend library used to build the ReactLab user interface.",
    detail:
      "React is a JavaScript library used to build modern user interfaces. It allows developers to break a page into smaller reusable parts called components. Instead of creating one large page manually, React encourages you to build smaller pieces such as buttons, cards, forms, modals, navigation bars and pages.",
    example:
      "A lesson card, login form, modal window and navigation bar can each be created as separate React components and reused across different pages.",
    usedFor:
      "We used React to build the main ReactLab user interface, including pages, cards, filters, forms, lesson screens, modals and interactive frontend behaviour.",
  },
  {
    step: "⚡ 02",
    title: "Vite",
    category: "Frontend",
    description:
      "Fast development server and build tool powering the ReactLab frontend.",
    detail:
      "Vite is a modern development tool that helps React projects run quickly during development. It starts the local development server, updates the browser instantly when code changes and prepares the project for production builds.",
    example:
      "When you run npm run dev, Vite starts the ReactLab frontend and makes it available at localhost:5173.",
    usedFor:
      "We used Vite to create, run and test the ReactLab frontend project quickly during development.",
  },
  {
    step: "🎨 03",
    title: "Tailwind CSS",
    category: "Frontend",
    description:
      "Utility-first CSS framework used for responsive layouts and styling.",
    detail:
      "Tailwind CSS lets developers style pages directly using ready-made utility classes. Instead of writing many separate CSS rules, you apply classes directly inside JSX to control spacing, colours, borders, layouts, shadows and responsiveness.",
    example:
      "Classes like rounded-xl, bg-blue-600, px-6, py-4 and grid-cols-4 are used to style elements quickly.",
    usedFor:
      "We used Tailwind CSS to design cards, buttons, forms, drawers, responsive layouts, page spacing, mobile screens and visual styling across ReactLab.",
  },
  {
    step: "🧭 04",
    title: "React Router",
    category: "Frontend",
    description:
      "Client-side routing for layouts, navigation and protected pages.",
    detail:
      "React Router allows a React application to have multiple pages without fully reloading the website. It connects URLs to specific components, so each route displays the correct page inside the app.",
    example:
      "When the user visits /lessons, React Router displays the Lessons page. When the user visits /login, it displays the Login page.",
    usedFor:
      "We used React Router for Home, Lessons, Concepts, Lab, API Lab, Login, shared layouts and protected routes.",
  },
  {
    step: "🎬 05",
    title: "Framer Motion",
    category: "Frontend",
    description:
      "Animation library used for transitions, modals and interactive effects.",
    detail:
      "Framer Motion is an animation library for React. It makes it easier to add smooth transitions, entrance effects, exit effects and interactive animations without writing complex CSS animation code.",
    example:
      "A modal can fade in and slide upward when opened, then fade out smoothly when closed.",
    usedFor:
      "We used Framer Motion to make ReactLab feel smoother through animated modals, page transitions, cards and interactive UI effects.",
  },
  {
    step: "🎯 06",
    title: "Lucide React",
    category: "Frontend",
    description:
      "Modern SVG icon library used throughout the application.",
    detail:
      "Lucide React provides clean and lightweight icons that can be imported and used as React components. Icons help make the interface easier to understand by giving visual meaning to actions.",
    example:
      "A Search icon can be placed inside a search input, while a Menu icon can be used for mobile navigation.",
    usedFor:
      "We used Lucide React for search icons, menu icons, close icons, action buttons and visual indicators across ReactLab.",
  },
  {
    step: "🧠 07",
    title: "Context API",
    category: "React Concepts",
    description:
      "React state-sharing feature used for authentication and theme management.",
    detail:
      "Context API allows data to be shared across many components without manually passing props through every level. It is useful when the same information is needed in different parts of the application, such as login status, user details or dark mode preference.",
    example:
      "The Navbar can know whether the user is logged in without receiving the user data manually from every parent component.",
    usedFor:
      "We used Context API for AuthContext and ThemeContext, allowing ReactLab to manage login state, user data, tokens and dark mode across the app.",
  },
  {
    step: "🪝 08",
    title: "Custom Hooks",
    category: "React Concepts",
    description:
      "Reusable React logic created for cleaner components and better structure.",
    detail:
      "A Custom Hook is a normal JavaScript function that contains reusable React logic. Instead of copying the same useState, useEffect and helper functions into many components, you place the repeated logic inside one hook and reuse it wherever needed.",
    example:
      "If five pages need to save data into Local Storage, each page does not need to repeat the same localStorage code. A useLocalStorage hook can handle saving and loading automatically.",
    usedFor:
      "We created a useLocalStorage custom hook in ReactLab to keep ThemeContext and AuthContext cleaner and easier to maintain.",
  },
  {
    step: "💾 09",
    title: "Local Storage",
    category: "React Concepts",
    description:
      "Browser storage used to remember login sessions, tokens and user preferences.",
    detail:
      "Local Storage is a small storage area inside the browser. Data saved there remains available even after refreshing the page or closing and reopening the browser. It is useful for simple client-side persistence.",
    example:
      "A login token can be saved in Local Storage so the user remains logged in after refreshing the page.",
    usedFor:
      "We used Local Storage to store login tokens, user details and dark mode preference in ReactLab.",
  },
  {
    step: "🟢 10",
    title: "Node.js",
    category: "Backend",
    description:
      "JavaScript runtime used to run the backend server outside the browser.",
    detail:
      "Node.js allows JavaScript to run on the server, not just inside the browser. This means developers can use JavaScript for both frontend and backend development. It is commonly used to build APIs, servers, command-line tools and backend services.",
    example:
      "When the frontend sends a login request, the backend server running on Node.js receives the request and processes it.",
    usedFor:
      "We used Node.js to run the ReactLab backend server, including Express routes, authentication, database access and file upload handling.",
  },
  {
    step: "🌐 11",
    title: "Express.js",
    category: "Backend",
    description:
      "Backend framework powering APIs, authentication and file handling.",
    detail:
      "Express.js is a backend framework built on top of Node.js. It simplifies server development by providing routing, middleware support, request handling and response management.",
    example:
      "When the frontend requests GET /posts, Express receives the request, runs the relevant controller and sends posts back as JSON.",
    usedFor:
      "We used Express.js for posts, login, registration, protected APIs, middleware, error handling and uploads.",
  },
  {
    step: "🔁 12",
    title: "REST APIs",
    category: "Backend",
    description:
      "API structure used for creating, reading, updating and deleting resources.",
    detail:
      "REST APIs are structured endpoints that allow the frontend and backend to communicate. The frontend sends HTTP requests, and the backend responds with data or confirmation that an action was completed.",
    example:
      "GET /posts gets posts, POST /posts creates a post, PUT /posts/:id updates a post and DELETE /posts/:id deletes a post.",
    usedFor:
      "We used REST APIs for CRUD operations, authentication, protected resources and file upload flows in ReactLab.",
  },
  {
    step: "🛡️ 13",
    title: "CORS",
    category: "Backend",
    description:
      "Middleware used to allow the frontend and backend to communicate safely.",
    detail:
      "CORS stands for Cross-Origin Resource Sharing. It controls whether a frontend running on one address is allowed to call a backend running on another address.",
    example:
      "Your frontend may run on localhost:5173 while your backend runs on localhost:5001. CORS allows these two servers to communicate.",
    usedFor:
      "We used CORS so the ReactLab frontend could safely call the Express backend during development.",
  },
  {
    step: "⚙️ 14",
    title: "dotenv",
    category: "Backend",
    description:
      "Environment variable tool used to manage server configuration securely.",
    detail:
      "dotenv allows backend configuration values to be stored in a .env file instead of hardcoding them directly inside source code. This is useful for values that may change between environments or should not be exposed publicly.",
    example:
      "PORT=5001, DB_NAME=reactlab and JWT_SECRET can be stored inside the .env file.",
    usedFor:
      "We used dotenv for backend port configuration, database settings and JWT secret management.",
  },
  {
    step: "🔐 15",
    title: "JWT Authentication",
    category: "Auth & Security",
    description:
      "Secure login system using JSON Web Tokens and protected routes.",
    detail:
      "JWT stands for JSON Web Token. After a user logs in successfully, the backend creates a signed token. The frontend stores the token and sends it with protected requests so the backend can verify who the user is.",
    example:
      "After login, the backend gives the frontend a token. The frontend sends this token in the Authorization header when creating, editing or deleting posts.",
    usedFor:
      "We used JWT for login sessions, protected API routes, ownership checks and authenticated actions in ReactLab.",
  },
  {
    step: "🔑 16",
    title: "bcryptjs",
    category: "Auth & Security",
    description:
      "Password hashing library used to securely store user credentials.",
    detail:
      "bcryptjs converts plain passwords into secure hashed values before they are saved in the database. This helps protect users because the actual password is not stored directly.",
    example:
      "Instead of storing password123, the database stores a long unreadable hash generated by bcryptjs.",
    usedFor:
      "We used bcryptjs during user registration to hash passwords and during login to compare submitted passwords with stored hashes.",
  },
  {
    step: "📧 17",
    title: "OTP Generator",
    category: "Auth & Security",
    description:
      "Library used to generate one-time passwords for verification flows.",
    detail:
      "OTP Generator creates temporary codes that can be used for verification. These codes are usually valid for a short period or for one verification attempt.",
    example:
      "A user may receive a 6-digit verification code such as 482913 during an authentication process.",
    usedFor:
      "We used OTP Generator to understand how one-time verification codes can be created for future authentication flows.",
  },
  {
    step: "⏱️ 18",
    title: "Speakeasy",
    category: "Auth & Security",
    description:
      "OTP authentication library used to support time-based verification.",
    detail:
      "Speakeasy is commonly used to generate and verify time-based one-time passwords. These are codes that change after a fixed time interval, often used in authenticator apps.",
    example:
      "An authenticator app can show a 6-digit code that changes every 30 seconds.",
    usedFor:
      "We used Speakeasy to understand OTP verification, two-factor authentication and time-based security flows.",
  },
  {
    step: "🧩 19",
    title: "RBAC",
    category: "Auth & Security",
    description:
      "Role-Based Access Control used to manage user permissions.",
    detail:
      "RBAC means users are assigned roles, and each role has different permissions. This allows the application to control what each type of user is allowed to see or do.",
    example:
      "An admin may be allowed to delete any post, while a normal user may only edit or delete their own posts.",
    usedFor:
      "We used RBAC concepts to understand admin access, normal user access and permission-based controls in ReactLab.",
  },
  {
    step: "🗄️ 20",
    title: "PostgreSQL",
    category: "Database",
    description:
      "Relational database used for users, posts and application data.",
    detail:
      "PostgreSQL is a powerful relational database that stores data in tables made up of rows and columns. Unlike React state or Local Storage, data stored in PostgreSQL remains permanently available even after the server restarts.",
    example:
      "A users table stores registered users, while a posts table stores posts created by those users.",
    usedFor:
      "We used PostgreSQL to store users, posts, hashed passwords, ownership details and persistent ReactLab data.",
  },
  {
    step: "🐘 21",
    title: "pg",
    category: "Database",
    description:
      "Node PostgreSQL library used to connect Express.js to the database.",
    detail:
      "pg is a Node.js library that allows the backend server to connect to PostgreSQL and run SQL queries. It acts as the bridge between Express.js and the database.",
    example:
      "The backend can use pg to run SELECT * FROM posts or INSERT INTO users queries.",
    usedFor:
      "We used pg in the database pool connection and backend controllers to create, read, update and delete PostgreSQL records.",
  },
  {
    step: "📊 22",
    title: "TablePlus",
    category: "Database",
    description:
      "Database GUI tool used to view tables, run SQL and inspect records.",
    detail:
      "TablePlus is a visual database tool that helps developers inspect tables, view records and run SQL queries without relying only on the terminal.",
    example:
      "You can open the users table in TablePlus and see registered users stored in PostgreSQL.",
    usedFor:
      "We used TablePlus to inspect PostgreSQL tables, check inserted records and run SQL queries during development.",
  },
  {
    step: "📁 23",
    title: "Multer",
    category: "File Uploads",
    description:
      "Express middleware used for handling image, PDF and file uploads.",
    detail:
      "Multer is middleware for Express that handles files uploaded from the frontend. Normal JSON parsing cannot process file uploads properly, so Multer helps receive, validate and save uploaded files.",
    example:
      "When a user uploads an image, Multer receives the file and saves it inside the server uploads folder.",
    usedFor:
      "We used Multer for image uploads, PDF uploads and general file upload handling in ReactLab.",
  },
  {
    step: "🖼️ 24",
    title: "Image Uploads",
    category: "File Uploads",
    description:
      "Feature used to upload and display image files from the server.",
    detail:
      "Image upload allows users to select picture files from their device and send them to the backend. The backend stores the image and provides a file path or URL that the frontend can use to display it.",
    example:
      "A user uploads a PNG file, and the frontend displays it using the image URL returned by the backend.",
    usedFor:
      "We used image uploads in the upload lab to understand file selection, backend storage and static file display.",
  },
  {
    step: "📄 25",
    title: "PDF Uploads",
    category: "File Uploads",
    description:
      "File handling flow used to upload and serve PDF documents.",
    detail:
      "PDF upload allows users to send document files to the backend. The server stores the file and makes it available through a public or protected URL.",
    example:
      "A user uploads a PDF file and later opens it from the uploads URL in the browser.",
    usedFor:
      "We used PDF uploads to understand document storage, file serving and upload validation.",
  },
  {
    step: "🧰 26",
    title: "VS Code",
    category: "Development Tools",
    description:
      "Code editor used to build and manage the ReactLab project.",
    detail:
      "VS Code is a code editor used to write, organise and manage project files. It supports extensions, terminals, file navigation, syntax highlighting and debugging tools.",
    example:
      "You open files like Lessons.jsx, APILab.jsx, index.js, api.js and pool.js in VS Code.",
    usedFor:
      "We used VS Code to write frontend React code, backend Express code, database connection files and project configuration.",
  },
  {
    step: "📬 27",
    title: "Postman",
    category: "Development Tools",
    description:
      "API testing tool used to test authentication, CRUD and protected routes.",
    detail:
      "Postman allows developers to test backend APIs without using the frontend. It is useful for sending requests, checking responses, testing tokens and confirming that endpoints work correctly.",
    example:
      "You can send a POST request to /auth/login in Postman and check whether the backend returns a valid JWT.",
    usedFor:
      "We used Postman to test registration, login, posts, protected endpoints and backend responses before connecting everything to the frontend.",
  },
  {
    step: "🌱 28",
    title: "Git",
    category: "Development Tools",
    description:
      "Version control tool used to track project changes.",
    detail:
      "Git tracks changes in a project over time. It allows developers to save progress, review changes, create branches and restore earlier versions if something goes wrong.",
    example:
      "After completing a feature, you can commit the changes so the project has a saved checkpoint.",
    usedFor:
      "We discussed Git as part of proper development workflow, code management and project version control.",
  },
  {
    step: "📦 29",
    title: "npm",
    category: "Development Tools",
    description:
      "Package manager used to install frontend and backend dependencies.",
    detail:
      "npm is the package manager for Node.js. It installs libraries, manages dependencies and runs scripts defined in package.json.",
    example:
      "npm install express installs Express.js, while npm run dev starts the Vite development server.",
    usedFor:
      "We used npm to install React, Express, pg, bcryptjs, multer, framer-motion, lucide-react and other project packages.",
  },
  {
    step: "🔍 30",
    title: "Chrome DevTools",
    category: "Development Tools",
    description:
      "Browser tool used to inspect errors, network requests and local storage.",
    detail:
      "Chrome DevTools helps developers inspect what is happening inside the browser. It can show console errors, network requests, page elements, local storage values and performance information.",
    example:
      "The Network tab shows whether an API request succeeded or failed, while the Application tab can show saved Local Storage values.",
    usedFor:
      "We used Chrome DevTools to debug frontend errors, inspect API calls, check tokens and review Local Storage values.",
  },
  {
    step: "📱 31",
    title: "iPhone Testing",
    category: "Mobile & Testing",
    description:
      "Real device testing used to check ReactLab on a mobile screen.",
    detail:
      "iPhone testing means opening the application on a real mobile device instead of only testing in a desktop browser. This helps confirm whether the layout, spacing and interactions work properly on smaller screens.",
    example:
      "You opened the local ReactLab app on your iPhone using your MacBook network address.",
    usedFor:
      "We used iPhone testing to check mobile responsiveness, local network access and real-device usability.",
  },
  {
    step: "📡 32",
    title: "Local Network Testing",
    category: "Mobile & Testing",
    description:
      "Testing setup used to access the local app from another device.",
    detail:
      "Local network testing allows another device on the same Wi-Fi network to access an app running on your development machine. This is useful for testing mobile behaviour while the app is still running locally.",
    example:
      "Your iPhone connects to your MacBook IP address instead of using localhost.",
    usedFor:
      "We used local network testing to access ReactLab from your iPhone while the app was running on your MacBook.",
  },
  {
    step: "📐 33",
    title: "Responsive Design",
    category: "Mobile & Testing",
    description:
      "Layout approach used to make pages work on desktop and mobile screens.",
    detail:
      "Responsive design means the layout adjusts based on screen size. A page should be easy to read and use on desktops, tablets and mobile phones without breaking or requiring awkward scrolling.",
    example:
      "A four-column desktop layout can become a single-column mobile layout, while filters can become horizontally scrollable on smaller screens.",
    usedFor:
      "We used responsive design in Lessons, cards, filters, containers, drawers, mobile pages and spacing throughout ReactLab.",
  },
];

export default function LearningRoadmap() {
  const [selectedFilter, setSelectedFilter] = useState("All");
  const [page, setPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState(null);
  const [showMobilePagination, setShowMobilePagination] =
    useState(false);

  const [itemsPerPage, setItemsPerPage] = useState(() => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      return MOBILE_ITEMS_PER_PAGE;
    }

    return DESKTOP_ITEMS_PER_PAGE;
  });

  const filteredItems =
    selectedFilter === "All"
      ? roadmapItems
      : roadmapItems.filter((item) => item.category === selectedFilter);

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

  const startIndex = (page - 1) * itemsPerPage;

  const currentItems = filteredItems.slice(
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
      const listSection = document.getElementById("roadmap-list-section");

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
      const listSection = document.getElementById("roadmap-list-section");

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

  function closeDrawer() {
    setSelectedItem(null);
  }

  return (
    <section className="mx-auto flex min-h-screen max-w-6xl flex-col px-4 py-6 sm:block sm:px-6 sm:py-16">
      <div className="mb-5 sm:mb-10">
        <p className="mt-2 max-w-3xl text-base leading-7 text-slate-600 sm:mt-3 sm:text-lg">
          ReactLab Technology Stack
        </p>

        <h2 className="mt-2 text-3xl font-bold leading-snug text-slate-900 sm:mt-5 sm:text-5xl">
          Libraries, frameworks and tools.
        </h2>

        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-600 sm:mt-3 sm:text-base">
          A quick guide to the frontend, backend, authentication, database,
          upload and testing tools used in ReactLab.
        </p>
      </div>

      <div className="sticky top-[72px] z-20 mb-4 -mx-4 border-b border-slate-100 bg-white/95 px-4 py-3 backdrop-blur sm:static sm:top-auto sm:mx-0 sm:mb-8 sm:border-b-0 sm:bg-transparent sm:px-0 sm:py-0">
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
        id="roadmap-list-section"
        className="scroll-mt-36 mb-3 flex items-center justify-between text-xs font-semibold text-slate-500 sm:scroll-mt-0 sm:mb-5 sm:flex-row sm:text-sm"
      >
        <p>{filteredItems.length} items</p>

        <p>
          Page {page} of {totalPages}
        </p>
      </div>

      <div className="grid flex-1 gap-3 pb-4 sm:min-h-[520px] sm:gap-6 sm:pb-0 md:grid-cols-2 xl:grid-cols-4">
        {currentItems.map((item) => (
          <RoadmapCard
            key={item.step}
            step={item.step}
            title={item.title}
            category={item.category}
            description={item.description}
            onOpen={() => setSelectedItem(item)}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div
          className={`sticky bottom-0 z-20 -mx-4 mt-auto items-center justify-center gap-2 border-t border-slate-100 bg-white/95 px-4 py-3 backdrop-blur sm:static sm:mx-0 sm:mt-8 sm:flex sm:min-h-[44px] sm:border-t-0 sm:bg-transparent sm:px-0 sm:py-0 ${
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

      {selectedItem && (
        <div className="fixed inset-0 z-50">
          <div
            onClick={closeDrawer}
            className="absolute inset-0 bg-slate-900/50"
          />

          <div className="absolute right-0 top-0 h-full w-full max-w-md overflow-y-auto bg-white p-6 shadow-2xl">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex flex-nowrap items-center gap-2 md:block">
                  <p className="shrink-0 whitespace-nowrap text-sm font-bold text-blue-600">
                    {selectedItem.step}
                  </p>

                  <h3 className="min-w-0 truncate whitespace-nowrap text-base font-bold text-slate-900 md:mt-2 md:text-2xl md:whitespace-normal">
                    {selectedItem.title}
                  </h3>

                  <span className="shrink-0 whitespace-nowrap rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-semibold text-blue-700 md:mt-3 md:inline-flex md:px-3 md:text-xs">
                    {selectedItem.category}
                  </span>
                </div>
              </div>

              <button
                onClick={closeDrawer}
                className="shrink-0 rounded-full border border-slate-200 px-3 py-1 text-sm font-semibold text-slate-600 hover:bg-slate-50"
              >
                Close
              </button>
            </div>

            <div className="mt-8 space-y-6">
              <div>
                <p className="text-sm font-semibold text-slate-900">
                  What is it?
                </p>
                <p className="mt-2 leading-7 text-slate-600">
                  {selectedItem.detail}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  Simple example
                </p>
                <p className="mt-2 leading-7 text-slate-600">
                  {selectedItem.example}
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold text-slate-900">
                  How we used it in ReactLab
                </p>
                <p className="mt-2 leading-7 text-slate-600">
                  {selectedItem.usedFor}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}